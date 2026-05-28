import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileText, LineChart, Building2 } from "lucide-react";
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
    icon: FileText,
    description:
      "Publicação mensal com a leitura da liga sobre o cenário macroeconômico doméstico e global. Análise de inflação, juros, câmbio, atividade e fluxos.",
    bullets: ["Indicadores BR e globais", "Cenário fiscal e monetário", "Calls de posicionamento"],
    edition: "Volume 26.05",
  },
  {
    tag: "Research",
    title: "Análise Macroeconômica",
    icon: LineChart,
    description:
      "Estudos aprofundados sobre temas estruturais: política fiscal, reformas, commodities e geopolítica. Material usado nos comitês internos.",
    bullets: ["Deep-dives temáticos", "Modelagem de cenários", "Comitê macro semanal"],
    edition: "Série 2026",
  },
  {
    tag: "Equity Research",
    title: "Análise Fundamentalista",
    icon: Building2,
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

      <section className="ds-section bg-navy pt-0">
        <FadeUpStagger className="ds-container grid gap-6 md:grid-cols-3">
          {projects.map((p, i) => {
            const isAccent = i === 1;
            return (
              <motion.article
                key={p.title}
                variants={fadeUpItem}
                className="ds-card group flex flex-col min-h-[400px] md:min-h-[440px] transition-colors duration-300 bg-cream border-cream hover:bg-navy hover:border-line cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] text-navy group-hover:text-cream uppercase tracking-[0.16em] transition-colors duration-300">
                    {p.tag}
                  </span>
                  <p.icon className="size-4 text-navy/60 transition-colors duration-300 group-hover:text-faint" strokeWidth={1.5} />
                </div>

                <div className="flex-1 flex items-center justify-center py-10">
                  <h2
                    className={
                      (isAccent ? "italic " : "") +
                      "font-serif text-navy text-3xl md:text-4xl text-center leading-tight transition-colors duration-300 group-hover:text-cream"
                    }
                  >
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
              </motion.article>
            );
          })}
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
