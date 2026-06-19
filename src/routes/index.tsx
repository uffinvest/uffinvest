import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeUp, FadeUpStagger, fadeUpItem } from "@/components/FadeUp";
import { SectionLabel } from "@/components/SectionLabel";
import heroImg from "@/assets/touro-capa.png";
import { TeamSection } from "@/components/TeamSection";
import { B3Ticker } from "@/components/B3Ticker";
import { AlumniSection } from "@/components/AlumniSection";
import { PublicationsSection } from "@/components/PublicationsSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UFFinvest — Liga de Mercado Financeiro da UFF" },
      {
        name: "description",
        content:
          "Liga acadêmica de mercado financeiro da Universidade Federal Fluminense. Formação técnica em macroeconomia, equity research e análise fundamentalista.",
      },
      { property: "og:title", content: "UFFinvest — Liga de Mercado Financeiro da UFF" },
      {
        property: "og:description",
        content: "Excelência acadêmica em análise de ativos no coração da UFF.",
      },
    ],
  }),
  component: Index,
});

const pillars = [
  { n: "01", t: "Rigor", h: "Análise Crítica", d: "Aprendemos e aplicamos os frameworks usados pelo mercado: valuation, análise macro e leitura de balanços." },
  { n: "02", t: "Rede", h: "Networking", d: "Contato com membros e visibilidade para aqueles que trabalham no mercado financeiro." },
  { n: "03", t: "Prática", h: "Comitês de Teses", d: "Encontros semanais para debater teses de investimento e acompanhar carteiras simuladas." },
  { n: "04", t: "Ensino", h: "Trilha de Estudos", d: "Uma trilha que cobre do básico ao avançado: macro, valuation, renda fixa e crédito." },
];

const principles = [
  { label: "Missão", title: "Nossa missão", text: "Criar um espaço onde estudantes da UFF desenvolvem capacidade técnica real para entrar no mercado financeiro bem preparados." },
  { label: "Visão", title: "Nossa visão", text: "Ser reconhecida como uma liga séria, com membros que chegam ao mercado prontos, que olham para trás e valorizam o que aprenderam aqui." },
  { label: "Valores", title: "Nossos valores", text: "Rigor nas análises, honestidade intelectual, colaboração entre membros e melhoria a cada semestre." },
];

function Index() {
  return (
    <SiteLayout>
      <section id="capa" className="relative min-h-screen w-full overflow-hidden bg-navy scroll-mt-24">
        <img
          src={heroImg}
          alt="Touro em fundo azul — símbolo do mercado em alta"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy to-transparent" />
        <B3Ticker />
      </section>

      <section id="sobre" className="ds-section bg-navy scroll-mt-24">
        <div className="ds-container grid grid-cols-1 lg:grid-cols-12 gap-12">
          <FadeUp className="lg:col-span-5">
            <SectionLabel>Sobre Nós</SectionLabel>
            <h2 className="ds-h2 mb-6">
              Nossa missão no <em className="ds-em">mercado financeiro.</em>
            </h2>
            <p className="ds-body">
              Desde 2018, a UFFinvest reúne estudantes da Universidade Federal Fluminense que
              querem entender o mercado financeiro de verdade, não só na teoria, mas
              desenvolvendo análises, debatendo teses e se preparando para o setor.
            </p>
          </FadeUp>

          <FadeUpStagger className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((c) => (
              <motion.div key={c.n} variants={fadeUpItem} className="ds-card">
                <span className="font-mono text-gold block mb-4 text-[11px] uppercase tracking-[0.12em]">
                  {c.n} / {c.t}
                </span>
                <h3 className="ds-h3 mb-3">{c.h}</h3>
                <p className="text-sm text-mute leading-relaxed">{c.d}</p>
              </motion.div>
            ))}
          </FadeUpStagger>
        </div>
      </section>

      <section className="ds-section bg-cream">
        <div className="ds-container">
          <FadeUp>
            <SectionLabel>Princípios</SectionLabel>
            <h2 className="ds-h2 mb-12 text-navy">
              Missão, visão e <em className="ds-em">valores.</em>
            </h2>
          </FadeUp>
          <FadeUpStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <motion.div
                key={p.label}
                variants={fadeUpItem}
                className="ds-card bg-cream border border-gold shadow-none hover:shadow-none hover:border-gold"
              >
                <span className="font-mono text-navy/70 block mb-4 text-[11px] uppercase tracking-[0.12em]">
                  0{i + 1} / {p.label}
                </span>
                <h3 className="font-serif italic text-3xl mb-4 text-navy">{p.title}.</h3>
                <p className="text-navy/80 leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </FadeUpStagger>
        </div>
      </section>

      <PublicationsSection />
      <AlumniSection />
      <TeamSection />
    </SiteLayout>
  );
}
