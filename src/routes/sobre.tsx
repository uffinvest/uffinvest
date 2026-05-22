import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeUp, FadeUpStagger, fadeUpItem } from "@/components/FadeUp";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre Nós — UFFinvest" },
      { name: "description", content: "Missão, visão, valores e história da UFFinvest, liga de mercado financeiro da UFF." },
      { property: "og:title", content: "Sobre Nós — UFFinvest" },
      { property: "og:description", content: "Missão, visão e história da liga de mercado financeiro da UFF." },
    ],
  }),
  component: SobrePage,
});

const pillars = [
  {
    label: "Missão",
    text: "Formar estudantes da UFF com excelência técnica e ética para os desafios do mercado financeiro, conectando teoria acadêmica e prática institucional.",
  },
  {
    label: "Visão",
    text: "Ser reconhecida como a principal liga de mercado financeiro do estado do Rio de Janeiro e referência nacional em produção intelectual estudantil.",
  },
  {
    label: "Valores",
    text: "Rigor analítico, integridade intelectual, meritocracia, colaboração e compromisso com a formação contínua dos membros e da comunidade.",
  },
];

const timeline = [
  { year: "2018", title: "Fundação", text: "A UFFinvest nasce no campus Gragoatá com 12 membros fundadores e o primeiro comitê de macroeconomia." },
  { year: "2019", title: "Primeira Carta Macro", text: "Publicação do primeiro relatório macroeconômico mensal, ainda distribuído por e-mail." },
  { year: "2020", title: "Modelo Remoto", text: "Adaptação completa para o formato online durante a pandemia, com expansão do número de inscritos." },
  { year: "2022", title: "Parcerias Institucionais", text: "Acordos com casas de análise e gestoras para mentorias e processos de recrutamento direto." },
  { year: "2024", title: "Setor de Equity Research", text: "Criação formal do setor fundamentalista e publicação das primeiras teses de investimento." },
  { year: "2026", title: "Nova Diretoria", text: "Liga atinge 60 membros ativos e amplia atuação em Niterói com eventos abertos ao público." },
];

function SobrePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-navy pt-40 pb-24">
        <div className="ds-container">
          <FadeUp immediate>
            <SectionLabel>Sobre a Liga</SectionLabel>
            <h1 className="ds-h1 max-w-4xl">
              Uma liga construída <br />
              <em className="ds-em">por estudantes,</em> para o mercado.
            </h1>
            <p className="ds-body mt-8 max-w-2xl">
              Desde 2018, a UFFinvest reúne estudantes da Universidade Federal Fluminense em torno
              de um propósito comum: dominar o mercado financeiro com rigor técnico e responsabilidade.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Pillars */}
      <section className="ds-section bg-surface">
        <div className="ds-container">
          <FadeUp>
            <SectionLabel>Princípios</SectionLabel>
            <h2 className="ds-h2 mb-12">
              Missão, visão e <em className="ds-em">valores.</em>
            </h2>
          </FadeUp>
          <FadeUpStagger className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div key={p.label} variants={fadeUpItem} className="ds-card">
                <span className="font-mono text-gold block mb-4 text-[11px] uppercase tracking-[0.12em]">
                  0{i + 1} / {p.label}
                </span>
                <h3 className="font-serif italic text-3xl mb-4 text-cream">{p.label}.</h3>
                <p className="text-mute leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </FadeUpStagger>
        </div>
      </section>

      {/* History */}
      <section className="ds-section bg-navy">
        <div className="ds-container">
          <FadeUp className="mb-16">
            <SectionLabel>Nossa História</SectionLabel>
            <h2 className="ds-h2">
              Oito anos formando <em className="ds-em">analistas.</em>
            </h2>
          </FadeUp>
          <ol className="relative border-l border-gold-line ml-2 space-y-12">
            {timeline.map((t, i) => (
              <FadeUp key={t.year} delay={i * 0.05}>
                <li className="pl-8 relative">
                  <div className="absolute -left-[7px] top-2 size-3 bg-gold rounded-full ring-4 ring-navy" />
                  <p className="font-mono text-gold text-sm mb-2">{t.year}</p>
                  <h3 className="ds-h3 mb-2">{t.title}</h3>
                  <p className="text-mute max-w-2xl leading-relaxed">{t.text}</p>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>
    </SiteLayout>
  );
}
