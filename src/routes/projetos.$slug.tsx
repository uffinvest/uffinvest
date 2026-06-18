import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, FileText, LineChart, Building2, Plus } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionLabel } from "@/components/SectionLabel";
import { FadeUp } from "@/components/FadeUp";

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
  summary: string;
  author: string;
  date: string;
};

function SectorPage() {
  const { slug } = Route.useParams();
  const sector = sectors[slug as SectorSlug];
  const Icon = sector.icon;

  const [items, setItems] = useState<Publication[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", summary: "", author: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setItems((prev) => [
      {
        id: crypto.randomUUID(),
        title: form.title.trim(),
        summary: form.summary.trim(),
        author: form.author.trim() || "Anônimo",
        date: new Date().toLocaleDateString("pt-BR"),
      },
      ...prev,
    ]);
    setForm({ title: "", summary: "", author: "" });
    setOpen(false);
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
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="btn-primary inline-flex items-center gap-2 !py-2.5 !px-5 !text-[11px] uppercase tracking-[0.12em]"
            >
              <Plus size={14} />
              {open ? "Cancelar" : "Nova publicação"}
            </button>
          </div>

          {open && (
            <form
              onSubmit={submit}
              className="ds-card mb-10 grid gap-4 bg-surface border-line"
            >
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
                  rows={4}
                  className="w-full bg-navy border border-line rounded-lg px-4 py-3 text-cream outline-none focus:border-gold transition-colors resize-y"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.12em] text-mute mb-2">
                  Autor(es)
                </label>
                <input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full bg-navy border border-line rounded-lg px-4 py-3 text-cream outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Publicar
                </button>
              </div>
            </form>
          )}

          {items.length === 0 ? (
            <div className="ds-card bg-surface border-line text-center py-16">
              <p className="text-mute">
                Nenhuma publicação ainda. Use o botão acima para adicionar a primeira.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((p) => (
                <article key={p.id} className="ds-card bg-surface border-line">
                  <p className="font-mono text-[10px] text-gold uppercase tracking-[0.16em] mb-3">
                    {p.date} · {p.author}
                  </p>
                  <h3 className="font-serif text-2xl text-cream mb-3">{p.title}</h3>
                  {p.summary && (
                    <p className="text-sm text-mute leading-relaxed whitespace-pre-line">
                      {p.summary}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}

          <p className="text-xs text-faint mt-10">
            Layout de demonstração — as publicações ficam salvas apenas nesta sessão.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
