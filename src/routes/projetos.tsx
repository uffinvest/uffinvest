import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeUp, FadeUpStagger, fadeUpItem } from "@/components/FadeUp";
import { SectionLabel } from "@/components/SectionLabel";

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
    tag: "Relatório Mensal",
    title: "Carta Macro",
    description:
      "Publicação mensal com a leitura da liga sobre o cenário macroeconômico doméstico e global. Análise de inflação, juros, câmbio, atividade e fluxos.",
    bullets: ["Indicadores BR e globais", "Cenário fiscal e monetário", "Calls de posicionamento"],
    edition: "Volume 26.05",
  },
  {
    tag: "Research",
    title: "Análise Macroeconômica",
    description:
      "Estudos aprofundados sobre temas estruturais: política fiscal, reformas, commodities e geopolítica. Material usado nos comitês internos.",
    bullets: ["Deep-dives temáticos", "Modelagem de cenários", "Comitê macro semanal"],
    edition: "Série 2026",
  },
  {
    tag: "Equity Research",
    title: "Análise Fundamentalista",
    description:
      "Teses de investimento sobre empresas listadas na B3, com modelagem por DCF e múltiplos, análise setorial e recomendação documentada.",
    bullets: ["Valuation por DCF", "Modelagem operacional", "Teses long e short"],
    edition: "12 teses ativas",
  },
];

function ProjetosPage() {
  return (
    <SiteLayout>
      <section className="bg-navy pt-40 pb-20">
        <div className="ds-container">
          <FadeUp immediate>
            <SectionLabel>Produção Intelectual</SectionLabel>
            <h1 className="ds-h1 max-w-4xl">
              Nossas <em className="ds-em">publicações.</em>
            </h1>
            <p className="ds-body mt-8 max-w-2xl">
              Todo material publicado pela UFFinvest passa por revisão de diretores e tem caráter
              estritamente educacional. Não constitui recomendação de investimento.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="ds-section bg-navy">
        <FadeUpStagger className="ds-container flex flex-col gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              variants={fadeUpItem}
              className="ds-card grid md:grid-cols-12 gap-8"
            >
              <div className="md:col-span-2">
                <span className="font-mono text-[11px] text-gold uppercase tracking-[0.12em]">
                  0{i + 1} / {p.tag}
                </span>
              </div>
              <div className="md:col-span-6">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">
                  {p.title}.
                </h2>
                <p className="text-mute leading-relaxed max-w-xl">{p.description}</p>
              </div>
              <div className="md:col-span-4 flex flex-col gap-4">
                <ul className="space-y-3">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <span className="size-1.5 bg-gold rounded-full mt-2 shrink-0" />
                      <span className="text-cream/85">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-line flex items-center justify-between">
                  <span className="font-mono text-[10px] text-faint uppercase tracking-[0.12em]">
                    {p.edition}
                  </span>
                  <a
                    href="#"
                    className="text-gold font-semibold text-xs uppercase tracking-[0.12em] hover:text-gold-hover transition-colors"
                  >
                    ↓ Download PDF
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </FadeUpStagger>
      </section>

      <section className="py-20 bg-surface border-t border-line">
        <FadeUp className="ds-container max-w-3xl text-center">
          <p className="font-serif italic text-mute text-lg leading-relaxed">
            “Este material possui caráter meramente educacional e não constitui recomendação de
            investimento. As opiniões expressas são dos autores e não refletem necessariamente a
            posição da Universidade Federal Fluminense.”
          </p>
        </FadeUp>
      </section>
    </SiteLayout>
  );
}
