import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeUp, FadeUpStagger, fadeUpItem } from "@/components/FadeUp";
import { SectionLabel } from "@/components/SectionLabel";
import heroImg from "@/assets/touro-capa.png";
import teamImg from "@/assets/team-collab.jpg";
import { alumni, team } from "@/data/mock";

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
  { n: "01", t: "Rigor", h: "Análise Crítica", d: "Metodologia própria baseada nos fundamentos de grandes gestoras." },
  { n: "02", t: "Rede", h: "Networking Ativo", d: "Conexão direta com ex-membros nas maiores casas de análise do país." },
  { n: "03", t: "Prática", h: "Comitês Reais", d: "Discussões semanais de teses com gestão de portfólio simulado." },
  { n: "04", t: "Ensino", h: "Trilha Estruturada", d: "Currículo próprio cobrindo macro, valuation e M&A." },
];

function Index() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden bg-navy">
        <img
          src={heroImg}
          alt="Touro em fundo azul — símbolo do mercado em alta"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy to-transparent" />
      </section>

      {/* ABOUT SNIPPET */}
      <section className="ds-section bg-navy">
        <div className="ds-container grid grid-cols-1 lg:grid-cols-12 gap-12">
          <FadeUp className="lg:col-span-5">
            <SectionLabel>Sobre Nós</SectionLabel>
            <h2 className="ds-h2 mb-6">
              Nossa missão no <em className="ds-em">mercado financeiro.</em>
            </h2>
            <p className="ds-body">
              A UFFinvest não é apenas uma liga acadêmica. Somos um centro de excelência
              focado na formação prática de profissionais para os maiores players do
              mercado financeiro global.
            </p>
            <Link to="/sobre" className="btn-ghost mt-8">
              Conheça nossa história <span>→</span>
            </Link>
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

      {/* ALUMNI TESTIMONIALS */}
      <section className="ds-section bg-surface">
        <div className="ds-container">
          <FadeUp className="flex justify-between items-end mb-16 flex-wrap gap-4">
            <div>
              <SectionLabel>Alumni Network</SectionLabel>
              <h2 className="ds-h2">
                Onde estão nossos <em className="ds-em">egressos.</em>
              </h2>
            </div>
          </FadeUp>
          <FadeUpStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alumni.map((a) => (
              <motion.article key={a.name} variants={fadeUpItem} className="ds-card flex flex-col gap-6">
                <p className="font-serif italic text-xl leading-snug text-cream">
                  “{a.quote}”
                </p>
                <div className="mt-auto pt-6 border-t border-line">
                  <p className="font-semibold text-cream">{a.name}</p>
                  <p className="text-sm text-mute">{a.role}</p>
                  <p className="font-mono text-[10px] text-gold uppercase tracking-[0.12em] mt-2">
                    {a.year}
                  </p>
                </div>
              </motion.article>
            ))}
          </FadeUpStagger>
        </div>
      </section>

      {/* TEAM */}
      <section className="ds-section bg-navy">
        <div className="ds-container">
          <FadeUp className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-5">
              <SectionLabel>Diretoria 2026</SectionLabel>
              <h2 className="ds-h2">
                Nossa <em className="ds-em">equipe.</em>
              </h2>
            </div>
            <p className="lg:col-span-6 lg:col-start-7 ds-body self-end">
              Estudantes da UFF eleitos pelos próprios membros a cada ciclo. Conduzem
              comitês, mentoram analistas júnior e representam a liga junto ao mercado.
            </p>
          </FadeUp>
          <FadeUpStagger className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                variants={fadeUpItem}
                className="aspect-[3/4] relative group overflow-hidden rounded-xl border border-line hover:border-gold-line transition-all"
              >
                <img
                  src={teamImg}
                  alt=""
                  loading="lazy"
                  width={400}
                  height={533}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  style={{ objectPosition: `${(i * 17) % 100}% center` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 text-cream">
                  <p className="font-mono text-[10px] text-gold uppercase tracking-[0.12em] mb-1">
                    0{i + 1}
                  </p>
                  <p className="font-semibold text-base leading-tight">{m.name}</p>
                  <p className="text-sm text-mute">{m.role}</p>
                </div>
              </motion.div>
            ))}
          </FadeUpStagger>
        </div>
      </section>

      {/* SELECTION CTA */}
      <section className="bg-surface border-y border-line">
        <FadeUp className="ds-container py-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="size-3 bg-gold rounded-full animate-pulse" />
            <h4 className="text-xl md:text-2xl font-serif italic text-cream text-center md:text-left">
              Nossos processos seletivos estão <em className="ds-em">abertos.</em>
            </h4>
          </div>
          <Link to="/processo-seletivo" className="btn-primary">
            Inscrever-se agora <span>→</span>
          </Link>
        </FadeUp>
      </section>
    </SiteLayout>
  );
}
