import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Trash2, ShieldCheck, ShieldOff, FileText, FileX } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionLabel } from "@/components/SectionLabel";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { deleteUserAccount } from "@/lib/admin.functions";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/usuarios")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Usuários — UFFinvest" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminUsersPage,
});

type ProfileRow = {
  id: string;
  display_name: string | null;
  email: string | null;
  can_publish: boolean;
  created_at: string;
};

type RoleRow = { user_id: string; role: string };

function AdminUsersPage() {
  const { user, loading } = useAuth();
  const { isAdmin, checking } = useIsAdmin();
  const navigate = useNavigate();
  const deleteFn = useServerFn(deleteUserAccount);

  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [adminIds, setAdminIds] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const load = async () => {
    setLoadingData(true);
    const [{ data: pdata }, { data: rdata }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role").eq("role", "admin"),
    ]);
    setProfiles((pdata ?? []) as ProfileRow[]);
    setAdminIds(new Set(((rdata ?? []) as RoleRow[]).map((r) => r.user_id)));
    setLoadingData(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  if (loading || checking) {
    return (
      <SiteLayout>
        <section className="ds-section bg-navy pt-32">
          <div className="ds-container text-mute">Carregando...</div>
        </section>
      </SiteLayout>
    );
  }

  if (!isAdmin) {
    return (
      <SiteLayout>
        <section className="ds-section bg-navy pt-32">
          <div className="ds-container text-center">
            <h1 className="ds-h2 mb-4">Acesso restrito.</h1>
            <p className="ds-body mb-8">Esta área é exclusiva para administradores.</p>
            <Link to="/" hash="capa" className="btn-primary">Voltar</Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const togglePublish = async (p: ProfileRow) => {
    setBusy(p.id);
    const { error } = await supabase
      .from("profiles")
      .update({ can_publish: !p.can_publish })
      .eq("id", p.id);
    setBusy(null);
    if (error) toast.error(error.message);
    else {
      toast.success(!p.can_publish ? "Permissão concedida" : "Permissão removida");
      load();
    }
  };

  const toggleAdmin = async (p: ProfileRow) => {
    setBusy(p.id);
    const isCurrentlyAdmin = adminIds.has(p.id);
    const op = isCurrentlyAdmin
      ? supabase.from("user_roles").delete().eq("user_id", p.id).eq("role", "admin")
      : supabase.from("user_roles").insert({ user_id: p.id, role: "admin" as const });
    const { error } = await op;
    setBusy(null);
    if (error) toast.error(error.message);
    else {
      toast.success(isCurrentlyAdmin ? "Administrador removido" : "Administrador definido");
      load();
    }
  };

  const removeUser = async (p: ProfileRow) => {
    if (p.id === user?.id) {
      toast.error("Você não pode excluir sua própria conta");
      return;
    }
    if (!confirm(`Excluir definitivamente ${p.email || p.display_name || "este usuário"}?`)) return;
    setBusy(p.id);
    try {
      await deleteFn({ data: { userId: p.id } });
      toast.success("Usuário excluído");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao excluir");
    } finally {
      setBusy(null);
    }
  };

  return (
    <SiteLayout>
      <section className="ds-section bg-navy pt-32 scroll-mt-24">
        <div className="ds-container">
          <Link
            to="/"
            hash="equipe"
            className="inline-flex items-center gap-2 text-mute hover:text-gold text-sm mb-10 transition-colors"
          >
            <ArrowLeft size={16} /> Voltar
          </Link>

          <SectionLabel>Administração</SectionLabel>
          <h1 className="ds-h1 mb-6">
            Usuários<em className="ds-em">.</em>
          </h1>
          <p className="ds-body max-w-2xl mb-12">
            Gerencie permissões de publicação, defina administradores ou exclua contas.
          </p>

          {loadingData ? (
            <div className="text-mute">Carregando usuários...</div>
          ) : profiles.length === 0 ? (
            <div className="text-mute">Nenhum usuário cadastrado.</div>
          ) : (
            <div className="grid gap-4">
              {profiles.map((p) => {
                const isUserAdmin = adminIds.has(p.id);
                const isSelf = p.id === user?.id;
                return (
                  <div
                    key={p.id}
                    className="ds-card bg-surface border-line flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-cream truncate">
                          {p.display_name || "Sem nome"}
                        </p>
                        {isUserAdmin && (
                          <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-gold border border-gold/40 rounded px-2 py-0.5">
                            Admin
                          </span>
                        )}
                        {p.can_publish && (
                          <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-cream/80 border border-line rounded px-2 py-0.5">
                            Publica
                          </span>
                        )}
                        {isSelf && (
                          <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-mute">
                            (você)
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-mute truncate">{p.email || "—"}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        disabled={busy === p.id}
                        onClick={() => togglePublish(p)}
                        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] border border-line hover:border-gold rounded-md px-3 py-2 text-cream transition-colors disabled:opacity-50"
                      >
                        {p.can_publish ? <FileX size={14} /> : <FileText size={14} />}
                        {p.can_publish ? "Remover publicação" : "Permitir publicar"}
                      </button>
                      <button
                        type="button"
                        disabled={busy === p.id || isSelf}
                        onClick={() => toggleAdmin(p)}
                        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] border border-line hover:border-gold rounded-md px-3 py-2 text-cream transition-colors disabled:opacity-50"
                      >
                        {isUserAdmin ? <ShieldOff size={14} /> : <ShieldCheck size={14} />}
                        {isUserAdmin ? "Tirar admin" : "Tornar admin"}
                      </button>
                      <button
                        type="button"
                        disabled={busy === p.id || isSelf}
                        onClick={() => removeUser(p)}
                        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] border border-line hover:border-red-400 hover:text-red-400 rounded-md px-3 py-2 text-cream transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={14} /> Excluir
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
