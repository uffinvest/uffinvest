import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Pencil, Check, Plus, Trash2, X } from "lucide-react";
import { FadeUp, FadeUpStagger, fadeUpItem } from "@/components/FadeUp";
import { SectionLabel } from "@/components/SectionLabel";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { toast } from "sonner";
import { getSectorIcon, SECTOR_ICON_NAMES } from "@/lib/sectorIcons";

type Sector = {
  slug: string;
  tag: string;
  title: string;
  description: string;
  icon: string;
  bullets: string[];
  position: number;
};

function slugify(s: string) {
  return s
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function PublicationsSection() {
  const { isAdmin } = useIsAdmin();
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({
    slug: "", tag: "", title: "", description: "", icon: "FileText", bullets: "",
  });

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("sectors").select("*").order("position", { ascending: true });
    if (error) toast.error("Erro ao carregar setores");
    else setSectors((data ?? []) as Sector[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startEdit = (s: Sector) => {
    setAdding(false);
    setEditingSlug(s.slug);
    setDraft({
      slug: s.slug, tag: s.tag, title: s.title, description: s.description,
      icon: s.icon, bullets: (s.bullets ?? []).join("\n"),
    });
  };
  const startAdd = () => {
    setEditingSlug(null);
    setAdding(true);
    setDraft({ slug: "", tag: "", title: "", description: "", icon: "FileText", bullets: "" });
  };
  const cancel = () => { setAdding(false); setEditingSlug(null); };

  const save = async () => {
    if (!draft.title.trim() || !draft.tag.trim() || !draft.description.trim()) {
      toast.error("Tag, título e descrição são obrigatórios");
      return;
    }
    const bullets = draft.bullets.split("\n").map((b) => b.trim()).filter(Boolean);
    if (adding) {
      const slug = slugify(draft.slug.trim() || draft.title);
      if (!slug) return toast.error("Slug inválido");
      const nextPos = (sectors[sectors.length - 1]?.position ?? 0) + 1;
      const { error } = await (supabase as any).from("sectors").insert({
        slug, tag: draft.tag.trim(), title: draft.title.trim(),
        description: draft.description.trim(), icon: draft.icon, bullets, position: nextPos,
      });
      if (error) return toast.error(error.message);
      toast.success("Setor criado");
    } else if (editingSlug) {
      const { error } = await (supabase as any).from("sectors").update({
        tag: draft.tag.trim(), title: draft.title.trim(),
        description: draft.description.trim(), icon: draft.icon, bullets,
      }).eq("slug", editingSlug);
      if (error) return toast.error(error.message);
      toast.success("Atualizado");
    }
    cancel();
    load();
  };

  const remove = async (s: Sector) => {
    if (!confirm(`Excluir "${s.title}"? As publicações deste setor permanecerão no banco mas a página deixará de existir.`)) return;
    const { error } = await (supabase as any).from("sectors").delete().eq("slug", s.slug);
    if (error) return toast.error(error.message);
    toast.success("Setor removido");
    load();
  };

  const Form = () => (
    <div className="flex flex-col gap-2 text-cream">
      <input value={draft.tag} onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
        placeholder="Tag (Ex.: Research)" className="bg-navy border border-line rounded px-2 py-1.5 text-sm outline-none focus:border-gold" />
      <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        placeholder="Título" className="bg-navy border border-line rounded px-2 py-1.5 text-sm outline-none focus:border-gold" />
      {adding && (
        <input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
          placeholder="slug-url (opcional)" className="bg-navy border border-line rounded px-2 py-1.5 text-sm outline-none focus:border-gold" />
      )}
      <textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        placeholder="Descrição" rows={3}
        className="bg-navy border border-line rounded px-2 py-1.5 text-sm outline-none focus:border-gold resize-y" />
      <select value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
        className="bg-navy border border-line rounded px-2 py-1.5 text-sm outline-none focus:border-gold">
        {SECTOR_ICON_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <textarea value={draft.bullets} onChange={(e) => setDraft({ ...draft, bullets: e.target.value })}
        placeholder="Tópicos (1 por linha)" rows={3}
        className="bg-navy border border-line rounded px-2 py-1.5 text-sm outline-none focus:border-gold resize-y" />
      <div className="flex gap-2">
        <button onClick={save} className="flex-1 btn-primary !py-1.5 !text-[10px]">Salvar</button>
        <button onClick={cancel} className="size-8 inline-flex items-center justify-center border border-line rounded text-cream">
          <X size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <section id="projetos" className="ds-section bg-surface scroll-mt-24">
      <div className="ds-container mb-12">
        <FadeUp>
          <SectionLabel>Produção Intelectual</SectionLabel>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="ds-h2 max-w-3xl">
              Nossas <em className="ds-em">publicações.</em>
            </h2>
            {isAdmin && (
              <button
                type="button"
                onClick={() => setEditing((v) => !v)}
                aria-label={editing ? "Concluir edição" : "Editar publicações"}
                className="inline-flex items-center justify-center size-10 rounded-full border border-line text-cream hover:border-gold hover:text-gold transition-colors"
              >
                {editing ? <Check size={16} /> : <Pencil size={16} />}
              </button>
            )}
          </div>
          <p className="ds-body mt-6 max-w-2xl">
            Todo material publicado pela UFFinvest passa por revisão de diretores e tem caráter
            estritamente educacional. Não constitui recomendação de investimento.
          </p>
        </FadeUp>
      </div>

      {loading ? (
        <div className="ds-container text-mute">Carregando...</div>
      ) : (
        <FadeUpStagger className="ds-container grid gap-6 lg:grid-cols-3">
          {sectors.map((p, i) => {
            const Icon = getSectorIcon(p.icon);
            const isAccent = i === 1;
            const isEditingThis = editingSlug === p.slug;
            return (
              <motion.div key={p.slug} variants={fadeUpItem} className="relative">
                {isEditingThis ? (
                  <div className="ds-card bg-cream border-line">
                    <Form />
                  </div>
                ) : (
                  <>
                    <Link
                      to="/projetos/$slug"
                      params={{ slug: p.slug }}
                      className="ds-card group flex flex-col min-h-[360px] lg:min-h-[440px] h-full transition-colors duration-300 bg-cream border-cream hover:bg-navy hover:border-line cursor-pointer no-underline"
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[10px] text-navy group-hover:text-cream uppercase tracking-[0.16em] transition-colors duration-300">
                          {p.tag}
                        </span>
                        <Icon className="hidden md:block size-4 text-navy/60 transition-colors duration-300 group-hover:text-faint" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 flex items-center justify-center py-10">
                        <h2 className={(isAccent ? "italic " : "") + "font-serif text-navy text-3xl md:text-4xl text-center leading-tight transition-colors duration-300 group-hover:text-cream"}>
                          {p.title}.
                        </h2>
                      </div>
                      <ul className="space-y-2.5">
                        {p.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-sm">
                            <span className="size-1.5 bg-navy rounded-full mt-2 shrink-0 transition-colors duration-300 group-hover:bg-gold" />
                            <span className="text-navy/80 transition-colors duration-300 group-hover:text-cream/80">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </Link>
                    {isAdmin && editing && (
                      <div className="absolute top-3 right-3 flex gap-1.5 z-10">
                        <button onClick={() => startEdit(p)} aria-label="Editar"
                          className="size-8 inline-flex items-center justify-center rounded-full bg-navy/80 text-cream hover:text-gold">
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => remove(p)} aria-label="Excluir"
                          className="size-8 inline-flex items-center justify-center rounded-full bg-navy/80 text-cream hover:text-red-400">
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
            <button onClick={startAdd}
              className="ds-card bg-cream/50 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-navy/30 text-navy/60 hover:text-gold hover:border-gold transition-colors min-h-[360px]">
              <Plus size={32} />
              <span className="text-xs uppercase tracking-[0.12em]">Novo setor</span>
            </button>
          )}
          {isAdmin && adding && (
            <div className="ds-card bg-cream border-gold">
              <Form />
            </div>
          )}
        </FadeUpStagger>
      )}
    </section>
  );
}
