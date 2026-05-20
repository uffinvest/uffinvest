import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos — UFFinvest" },
      { name: "description", content: "Carta Macro, Análise Macroeconômica e Análise Fundamentalista produzidas pelos membros da UFFinvest." },
      { property: "og:title", content: "Projetos — UFFinvest" },
      { property: "og:description", content: "Produção intelectual da liga: macroeconomia, equity research e fundamentalista." },
    ],
  }),
  component: ProjetosPage,
});

const projects = [
  {
    tag: "RELATÓRIO MENSAL",
    title: "Carta Macro",
    italic: false,
    description:
      "Publicação mensal com a leitura da liga sobre o cenário macroeconômico doméstico e global. Análise de inflação, juros, câmbio, atividade e fluxos.",
    bullets: ["Indicadores BR e globais", "Cenário fiscal e monetário", "Calls de posicionamento"],
    edition: "Volume 26.05",
  },
  {
    tag: "RESEARCH",
    title: "Análise Macroeconômica",
    italic: true,
    description:
      "Estudos aprofundados sobre temas estruturais: política fiscal, reformas, commodities e geopolítica. Material usado nos comitês internos.",
    bullets: ["Deep-dives temáticos", "Modelagem de cenários", "Comitê macro semanal"],
    edition: "Série 2026",
  },
  {
    tag: "EQUITY RESEARCH",
    title: "Análise Fundamentalista",
    italic: false,
    description:
      "Teses de investimento sobre empresas listadas na B3, com modelagem por DCF e múltiplos, análise setorial e recomendação documentada.",
    bullets: ["Valuation por DCF", "Modelagem operacional", "Teses long e short"],
    edition: "12 teses ativas",
  },
];

function ProjetosPage() {
  return (
    <SiteLayout>
      <section className="bg-navy text-white pt-40 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-accent text-xs uppercase tracking-widest">Produção Intelectual</span>
          <h1 className="font-black text-5xl md:text-7xl tracking-tight mt-4 leading-none">
            Nossas <span className="font-serif italic text-accent">publicações.</span>
          </h1>
          <p className="max-w-2xl mt-8 text-white/70 text-lg leading-relaxed">
            Todo material publicado pela UFFinvest passa por revisão de diretores e tem caráter
            estritamente educacional. Não constitui recomendação de investimento.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-px bg-navy/5">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className="bg-white grid md:grid-cols-12 gap-8 p-10 md:p-14 group hover:bg-secondary transition-colors"
            >
              <div className="md:col-span-2">
                <span className="font-mono text-[10px] text-primary tracking-widest">
                  0{i + 1} / {p.tag}
                </span>
              </div>
              <div className="md:col-span-6">
                <h2
                  className={`text-4xl md:text-5xl font-bold tracking-tighter mb-4 ${
                    p.italic ? "font-serif italic" : ""
                  }`}
                >
                  {p.title}.
                </h2>
                <p className="text-navy/70 leading-relaxed max-w-xl">{p.description}</p>
              </div>
              <div className="md:col-span-4 flex flex-col gap-4">
                <ul className="space-y-3">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <span className="size-1.5 bg-accent rounded-full mt-2 shrink-0" />
                      <span className="text-navy/80">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-navy/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-navy/40 uppercase tracking-widest">
                    {p.edition}
                  </span>
                  <a
                    href="#"
                    className="text-accent font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors"
                  >
                    ↓ Download PDF
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 md:px-8 bg-secondary border-t border-navy/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif italic text-navy/60 text-lg leading-relaxed">
            “Este material possui caráter meramente educacional e não constitui recomendação de
            investimento. As opiniões expressas são dos autores e não refletem necessariamente a
            posição da Universidade Federal Fluminense.”
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
