import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, FileText, LineChart, Building2, Plus, Trash2, Pencil, X } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionLabel } from "@/components/SectionLabel";
import { FadeUp } from "@/components/FadeUp";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { toast } from "sonner";

const sectors = {
  "carta-macro": {
    tag: "Relatório Mensal",
    title: "Carta Macro",
    icon: FileText,
    description:
      "Publicação mensal com a leitura da liga sobre o cenário macroeconômico doméstico e global.",
  },
  "analise-macroeconomica": {
    tag: "Research",
    title: "Análise Macroeconômica",
    icon: LineChart,
    description:
      "Estudos aprofundados sobre temas estruturais: política fiscal, reformas, commodities e geopolítica.",
  },
  "analise-fundamentalista": {
    tag: "Equity Research",
    title: "Análise Fundamentalista",
    icon: Building2,
    description:
      "Teses de investimento sobre empresas listadas na B3, com modelagem por DCF e múltiplos.",
  },
} as const;

type SectorSlug = keyof typeof sectors;

export const Route = createFileRoute("/projetos/$slug")({
  ssr: false,
  beforeLoad: ({ params }) => {
    if (!(params.slug in sectors)) throw notFound();
  },
  head: ({ params }) => {
    const s = sectors[params.slug as SectorSlug];
    return {
      meta: [
        { title: `${s?.title ?? "Projeto"} — UFFinvest` },
        { name: "description", content: s?.description ?? "" },
      ],
    };
  },
  component: SectorPage,
  notFoundComponent: () => (
    <SiteLayout>
      <section className="ds-section bg-navy">
        <div className="ds-container text-center">
          <h1 className="ds-h2 mb-6">Setor não encontrado.</h1>
          <Link to="/" hash="projetos" className="btn-primary">Voltar</Link>
        </div>
      </section>
    </SiteLayout>
  ),
});

type Publication = {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  author_id: string;
  author_name: string;
  created_at: string;
};

function SectorPage() {
  const { slug } = Route.useParams();
  const sector = sectors[slug as SectorSlug];
  const Icon = sector.icon;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", summary: "", content: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .eq("sector", slug)
      .order("created_at", { ascending: false });
    if (error) toast.error("Erro ao carregar publicações");
    else setItems((data ?? []) as Publication[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Faça login para publicar");
      return;
    }
    if (!form.title.trim()) return;
    setSaving(true);

    // get profile name
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .maybeSingle();
    const authorName =
      profile?.display_name ||
      (user.user_metadata?.display_name as string | undefined) ||
      (user.user_metadata?.full_name as string | undefined) ||
      user.email?.split("@")[0] ||
      "Membro";

    const { error } = await supabase.from("publications").insert({
      sector: slug,
      title: form.title.trim(),
      summary: form.summary.trim() || null,
      content: form.content.trim() || null,
      author_id: user.id,
      author_name: authorName,
    });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Publicação criada!");
    setForm({ title: "", summary: "", content: "" });
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir esta publicação?")) return;
    const { error } = await supabase.from("publications").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Publicação excluída");
      load();
    }
  };

  return (
    <SiteLayout>
      <section className="ds-section bg-navy pt-32 scroll-mt-24">
        <div className="ds-container">
          <Link
            to="/"
            hash="projetos"
            className="inline-flex items-center gap-2 text-mute hover:text-gold text-sm mb-10 transition-colors"
          >
            <ArrowLeft size={16} /> Voltar para projetos
          </Link>

          <FadeUp className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-8">
              <SectionLabel>{sector.tag}</SectionLabel>
              <h1 className="ds-h1 mb-6">
                {sector.title}
                <em className="ds-em">.</em>
              </h1>
              <p className="ds-body max-w-2xl">{sector.description}</p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end items-start">
              <Icon className="size-16 text-gold/60" strokeWidth={1.25} />
            </div>
          </FadeUp>

          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="font-serif text-2xl md:text-3xl text-cream">
              Publicações<em className="ds-em">.</em>
            </h2>
            {user ? (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="btn-primary inline-flex items-center gap-2 !py-2.5 !px-5 !text-[11px] uppercase tracking-[0.12em]"
              >
                <Plus size={14} />
                {open ? "Cancelar" : "Nova publicação"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate({ to: "/login" })}
                className="btn-primary !py-2.5 !px-5 !text-[11px] uppercase tracking-[0.12em]"
              >
                Entrar para publicar
              </button>
            )}
          </div>

          {open && user && (
            <form onSubmit={submit} className="ds-card mb-10 grid gap-4 bg-surface border-line">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.12em] text-mute mb-2">
                  Título
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-navy border border-line rounded-lg px-4 py-3 text-cream outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.12em] text-mute mb-2">
                  Resumo
                </label>
                <textarea
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  rows={3}
                  className="w-full bg-navy border border-line rounded-lg px-4 py-3 text-cream outline-none focus:border-gold transition-colors resize-y"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.12em] text-mute mb-2">
                  Conteúdo completo (opcional)
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={8}
                  className="w-full bg-navy border border-line rounded-lg px-4 py-3 text-cream outline-none focus:border-gold transition-colors resize-y"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                  {saving ? "Publicando..." : "Publicar"}
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="text-center py-16 text-mute">Carregando publicações...</div>
          ) : items.length === 0 ? (
            <div className="ds-card bg-surface border-line text-center py-16">
              <p className="text-mute">
                Nenhuma publicação ainda{user ? ". Use o botão acima para adicionar a primeira." : "."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((p) => (
                <article key={p.id} className="ds-card bg-surface border-line relative">
                  <p className="font-mono text-[10px] text-gold uppercase tracking-[0.16em] mb-3">
                    {new Date(p.created_at).toLocaleDateString("pt-BR")} · {p.author_name}
                  </p>
                  <h3 className="font-serif text-2xl text-cream mb-3">{p.title}</h3>
                  {p.summary && (
                    <p className="text-sm text-mute leading-relaxed whitespace-pre-line mb-3">
                      {p.summary}
                    </p>
                  )}
                  {p.content && (
                    <details className="mt-3">
                      <summary className="text-xs text-gold cursor-pointer hover:text-gold-hover">
                        Ler conteúdo completo
                      </summary>
                      <p className="text-sm text-mute leading-relaxed whitespace-pre-line mt-3">
                        {p.content}
                      </p>
                    </details>
                  )}
                  {user?.id === p.author_id && (
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      aria-label="Excluir"
                      className="absolute top-4 right-4 text-mute hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
