import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Pencil, Plus, Trash2, X, Check, Users } from "lucide-react";
import { FadeUp, FadeUpStagger, fadeUpItem } from "@/components/FadeUp";
import { SectionLabel } from "@/components/SectionLabel";
import teamImg from "@/assets/team-collab.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { toast } from "sonner";

type Member = {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  position: number;
};

export function TeamSection() {
  const { isAdmin } = useIsAdmin();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ name: "", role: "", image_url: "" });
  const [adding, setAdding] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("position", { ascending: true });
    if (error) toast.error("Erro ao carregar equipe");
    else setMembers((data ?? []) as Member[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (m: Member) => {
    setEditingId(m.id);
    setAdding(false);
    setDraft({ name: m.name, role: m.role, image_url: m.image_url ?? "" });
  };

  const startAdd = () => {
    setAdding(true);
    setEditingId(null);
    setDraft({ name: "", role: "", image_url: "" });
  };

  const cancel = () => {
    setEditingId(null);
    setAdding(false);
  };

  const save = async () => {
    if (!draft.name.trim() || !draft.role.trim()) {
      toast.error("Nome e cargo são obrigatórios");
      return;
    }
    if (adding) {
      const nextPos = (members[members.length - 1]?.position ?? 0) + 1;
      const { error } = await supabase.from("team_members").insert({
        name: draft.name.trim(),
        role: draft.role.trim(),
        image_url: draft.image_url.trim() || null,
        position: nextPos,
      });
      if (error) return toast.error(error.message);
      toast.success("Membro adicionado");
    } else if (editingId) {
      const { error } = await supabase
        .from("team_members")
        .update({
          name: draft.name.trim(),
          role: draft.role.trim(),
          image_url: draft.image_url.trim() || null,
        })
        .eq("id", editingId);
      if (error) return toast.error(error.message);
      toast.success("Atualizado");
    }
    cancel();
    load();
  };

  const remove = async (m: Member) => {
    if (!confirm(`Remover ${m.name} da equipe?`)) return;
    const { error } = await supabase.from("team_members").delete().eq("id", m.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Removido");
      load();
    }
  };

  return (
    <section id="equipe" className="ds-section bg-cream scroll-mt-24">
      <div className="ds-container">
        <FadeUp className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5">
            <SectionLabel>Diretoria 2026</SectionLabel>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="ds-h2 text-navy">
                Nossa <em className="ds-em">equipe.</em>
              </h2>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setEditing((v) => !v)}
                  aria-label={editing ? "Concluir edição" : "Editar equipe"}
                  className="inline-flex items-center justify-center size-10 rounded-full border border-navy/20 text-navy hover:border-gold hover:text-gold-hover transition-colors"
                >
                  {editing ? <Check size={16} /> : <Pencil size={16} />}
                </button>
              )}
            </div>
          </div>
          <p className="lg:col-span-6 lg:col-start-7 ds-body text-navy/75 self-end">
            Estudantes da UFF eleitos pelos próprios membros a cada ciclo. Conduzem
            comitês, mentoram analistas júnior e representam a liga junto ao mercado.
          </p>
        </FadeUp>

        {loading ? (
          <div className="text-navy/60">Carregando equipe...</div>
        ) : (
          <FadeUpStagger className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((m, i) => {
              const isEditingThis = editingId === m.id;
              const img = m.image_url || teamImg;
              return (
                <motion.div
                  key={m.id}
                  variants={fadeUpItem}
                  className="aspect-[3/4] relative group overflow-hidden rounded-xl border border-line hover:border-gold-line transition-all"
                >
                  <img
                    src={img}
                    alt={m.name}
                    loading="lazy"
                    width={400}
                    height={533}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    style={!m.image_url ? { objectPosition: `${(i * 17) % 100}% center` } : undefined}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />

                  {isEditingThis ? (
                    <div className="absolute inset-0 p-3 flex flex-col gap-2 bg-navy/85 backdrop-blur-sm">
                      <input
                        value={draft.name}
                        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                        placeholder="Nome"
                        className="bg-surface border border-line rounded px-2 py-1.5 text-sm text-cream outline-none focus:border-gold"
                      />
                      <input
                        value={draft.role}
                        onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                        placeholder="Cargo"
                        className="bg-surface border border-line rounded px-2 py-1.5 text-sm text-cream outline-none focus:border-gold"
                      />
                      <input
                        value={draft.image_url}
                        onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
                        placeholder="URL da foto (opcional)"
                        className="bg-surface border border-line rounded px-2 py-1.5 text-xs text-cream outline-none focus:border-gold"
                      />
                      <div className="mt-auto flex gap-2">
                        <button onClick={save} className="flex-1 btn-primary !py-1.5 !px-2 !text-[10px]">
                          Salvar
                        </button>
                        <button
                          onClick={cancel}
                          className="size-8 inline-flex items-center justify-center border border-line rounded text-cream"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="absolute bottom-0 left-0 p-5 text-cream">
                        <p className="font-mono text-[10px] text-gold uppercase tracking-[0.12em] mb-1">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <p className="font-semibold text-base leading-tight">{m.name}</p>
                        <p className="text-sm text-mute">{m.role}</p>
                      </div>
                      {isAdmin && editing && (
                        <div className="absolute top-2 right-2 flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => startEdit(m)}
                            aria-label="Editar membro"
                            className="size-8 inline-flex items-center justify-center rounded-full bg-navy/80 text-cream hover:text-gold transition-colors"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(m)}
                            aria-label="Remover membro"
                            className="size-8 inline-flex items-center justify-center rounded-full bg-navy/80 text-cream hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              );
            })}

            {isAdmin && editing && !adding && (
              <button
                type="button"
                onClick={startAdd}
                className="aspect-[3/4] flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy/30 text-navy/60 hover:border-gold hover:text-gold-hover transition-colors"
              >
                <Plus size={28} />
                <span className="text-xs uppercase tracking-[0.12em]">Adicionar</span>
              </button>
            )}

            {isAdmin && adding && (
              <div className="aspect-[3/4] rounded-xl border border-gold p-3 flex flex-col gap-2 bg-navy/90">
                <input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  placeholder="Nome"
                  className="bg-surface border border-line rounded px-2 py-1.5 text-sm text-cream outline-none focus:border-gold"
                />
                <input
                  value={draft.role}
                  onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                  placeholder="Cargo"
                  className="bg-surface border border-line rounded px-2 py-1.5 text-sm text-cream outline-none focus:border-gold"
                />
                <input
                  value={draft.image_url}
                  onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
                  placeholder="URL da foto (opcional)"
                  className="bg-surface border border-line rounded px-2 py-1.5 text-xs text-cream outline-none focus:border-gold"
                />
                <div className="mt-auto flex gap-2">
                  <button onClick={save} className="flex-1 btn-primary !py-1.5 !px-2 !text-[10px]">
                    Adicionar
                  </button>
                  <button
                    onClick={cancel}
                    className="size-8 inline-flex items-center justify-center border border-line rounded text-cream"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}
          </FadeUpStagger>
        )}

        {isAdmin && (
          <div className="mt-12 flex justify-center">
            <Link
              to="/admin/usuarios"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Users size={16} /> Usuários
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
