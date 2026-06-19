import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Check, Plus, Trash2, X } from "lucide-react";
import { FadeUp, FadeUpStagger, fadeUpItem } from "@/components/FadeUp";
import { SectionLabel } from "@/components/SectionLabel";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { toast } from "sonner";

type Alum = {
  id: string;
  name: string;
  role: string;
  year: string;
  quote: string;
  position: number;
};

export function AlumniSection() {
  const { isAdmin } = useIsAdmin();
  const [items, setItems] = useState<Alum[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ name: "", role: "", year: "", quote: "" });

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("alumni")
      .select("*")
      .order("position", { ascending: true });
    if (error) toast.error("Erro ao carregar egressos");
    else setItems((data ?? []) as Alum[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startEdit = (a: Alum) => {
    setAdding(false);
    setEditingId(a.id);
    setDraft({ name: a.name, role: a.role, year: a.year, quote: a.quote });
  };
  const startAdd = () => {
    setEditingId(null);
    setAdding(true);
    setDraft({ name: "", role: "", year: "", quote: "" });
  };
  const cancel = () => { setAdding(false); setEditingId(null); };

  const save = async () => {
    if (!draft.name.trim() || !draft.role.trim() || !draft.quote.trim()) {
      toast.error("Preencha nome, cargo e depoimento");
      return;
    }
    if (adding) {
      const nextPos = (items[items.length - 1]?.position ?? 0) + 1;
      const { error } = await (supabase as any).from("alumni").insert({
        name: draft.name.trim(),
        role: draft.role.trim(),
        year: draft.year.trim(),
        quote: draft.quote.trim(),
        position: nextPos,
      });
      if (error) return toast.error(error.message);
      toast.success("Egresso adicionado");
    } else if (editingId) {
      const { error } = await (supabase as any)
        .from("alumni")
        .update({
          name: draft.name.trim(),
          role: draft.role.trim(),
          year: draft.year.trim(),
          quote: draft.quote.trim(),
        })
        .eq("id", editingId);
      if (error) return toast.error(error.message);
      toast.success("Atualizado");
    }
    cancel();
    load();
  };

  const remove = async (a: Alum) => {
    if (!confirm(`Remover ${a.name}?`)) return;
    const { error } = await (supabase as any).from("alumni").delete().eq("id", a.id);
    if (error) return toast.error(error.message);
    toast.success("Removido");
    load();
  };

  const Form = () => (
    <div className="flex flex-col gap-2">
      <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        placeholder="Nome"
        className="bg-navy border border-line rounded px-2 py-1.5 text-sm text-cream outline-none focus:border-gold" />
      <input value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })}
        placeholder="Cargo / Empresa"
        className="bg-navy border border-line rounded px-2 py-1.5 text-sm text-cream outline-none focus:border-gold" />
      <input value={draft.year} onChange={(e) => setDraft({ ...draft, year: e.target.value })}
        placeholder="Ex.: Egresso 2023"
        className="bg-navy border border-line rounded px-2 py-1.5 text-sm text-cream outline-none focus:border-gold" />
      <textarea value={draft.quote} onChange={(e) => setDraft({ ...draft, quote: e.target.value })}
        placeholder="Depoimento" rows={4}
        className="bg-navy border border-line rounded px-2 py-1.5 text-sm text-cream outline-none focus:border-gold resize-y" />
      <div className="flex gap-2">
        <button onClick={save} className="flex-1 btn-primary !py-1.5 !text-[10px]">Salvar</button>
        <button onClick={cancel} className="size-8 inline-flex items-center justify-center border border-line rounded text-cream">
          <X size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <section id="alumni" className="ds-section bg-navy scroll-mt-24">
      <div className="ds-container">
        <FadeUp className="flex justify-between items-end mb-16 flex-wrap gap-4">
          <div>
            <SectionLabel>Alumni Network</SectionLabel>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="ds-h2">
                Onde estão nossos <em className="ds-em">egressos.</em>
              </h2>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setEditing((v) => !v)}
                  aria-label={editing ? "Concluir edição" : "Editar egressos"}
                  className="inline-flex items-center justify-center size-10 rounded-full border border-line text-cream hover:border-gold hover:text-gold transition-colors"
                >
                  {editing ? <Check size={16} /> : <Pencil size={16} />}
                </button>
              )}
            </div>
          </div>
        </FadeUp>

        {loading ? (
          <div className="text-mute">Carregando...</div>
        ) : (
          <FadeUpStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((a) => {
              const isEditingThis = editingId === a.id;
              return (
                <motion.article key={a.id} variants={fadeUpItem} className="ds-card flex flex-col gap-6 relative">
                  {isEditingThis ? <Form /> : (
                    <>
                      <p className="font-serif italic text-xl leading-snug text-cream">“{a.quote}”</p>
                      <div className="mt-auto pt-6 border-t border-line">
                        <p className="font-semibold text-cream">{a.name}</p>
                        <p className="text-sm text-mute">{a.role}</p>
                        <p className="font-mono text-[10px] text-gold uppercase tracking-[0.12em] mt-2">{a.year}</p>
                      </div>
                      {isAdmin && editing && (
                        <div className="absolute top-3 right-3 flex gap-1.5">
                          <button onClick={() => startEdit(a)} aria-label="Editar"
                            className="size-8 inline-flex items-center justify-center rounded-full bg-navy/80 text-cream hover:text-gold">
                            <Pencil size={13} />
                          </button>
                          <button onClick={() => remove(a)} aria-label="Remover"
                            className="size-8 inline-flex items-center justify-center rounded-full bg-navy/80 text-cream hover:text-red-400">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </motion.article>
              );
            })}
            {isAdmin && editing && !adding && (
              <button onClick={startAdd}
                className="ds-card flex flex-col items-center justify-center gap-2 border-2 border-dashed border-line text-mute hover:text-gold hover:border-gold transition-colors min-h-[200px]">
                <Plus size={28} />
                <span className="text-xs uppercase tracking-[0.12em]">Adicionar</span>
              </button>
            )}
            {isAdmin && adding && (
              <div className="ds-card border border-gold">
                <Form />
              </div>
            )}
          </FadeUpStagger>
        )}
      </div>
    </section>
  );
}
