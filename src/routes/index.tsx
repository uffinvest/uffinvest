import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileText, LineChart, Building2 } from "lucide-react";
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
  { n: "01", t: "Rigor", h: "Análise Crítica", d: "Aprendemos e aplicamos os frameworks usados pelo mercado: valuation, análise macro e leitura de balanços." },
  { n: "02", t: "Rede", h: "Networking", d: "Contato com membros e visibilidade para aqueles que trabalham no mercado financeiro." },
  { n: "03", t: "Prática", h: "Comitês de Teses", d: "Encontros semanais para debater teses de investimento e acompanhar carteiras simuladas." },
  { n: "04", t: "Ensino", h: "Trilha de Estudos", d: "Uma trilha que cobre do básico ao avançado: macro, valuation, renda fixa e crédito." },
];

const principles = [
  {
    label: "Missão",
    title: "Nossa missão",
    text: "Criar um espaço onde estudantes da UFF desenvolvem capacidade técnica real para entrar no mercado financeiro bem preparados.",
  },
  {
    label: "Visão",
    title: "Nossa visão",
    text: "Ser reconhecida como uma liga séria, com membros que chegam ao mercado prontos, que olham para trás e valorizam o que aprenderam aqui.",
  },
  {
    label: "Valores",
    title: "Nossos valores",
    text: "Rigor nas análises, honestidade intelectual, colaboração entre membros e melhoria a cada semestre.",
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

const projects = [
  {
    slug: "carta-macro",
    tag: "Relatório Mensal",
    title: "Carta Macro",
    icon: FileText,
    description:
      "Publicação mensal com a leitura da liga sobre o cenário macroeconômico doméstico e global.",
    bullets: ["Indicadores BR e globais", "Cenário fiscal e monetário", "Calls de posicionamento"],
  },
  {
    slug: "analise-macroeconomica",
    tag: "Research",
    title: "Análise Macroeconômica",
    icon: LineChart,
    description:
      "Estudos aprofundados sobre temas estruturais: política fiscal, reformas, commodities e geopolítica.",
    bullets: ["Deep-dives temáticos", "Modelagem de cenários", "Comitê macro semanal"],
  },
  {
    slug: "analise-fundamentalista",
    tag: "Equity Research",
    title: "Análise Fundamentalista",
    icon: Building2,
    description:
      "Teses de investimento sobre empresas listadas na B3, com modelagem por DCF e múltiplos.",
    bullets: ["Valuation por DCF", "Modelagem operacional", "Teses long e short"],
  },
];

function Index() {
  return (
    <SiteLayout>
      {/* CAPA */}
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
      </section>

      {/* SOBRE NÓS */}
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

      {/* Princípios */}
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



      {/* PROJETOS */}
      <section id="projetos" className="ds-section bg-surface scroll-mt-24">
        <div className="ds-container mb-12">
          <FadeUp>
            <SectionLabel>Produção Intelectual</SectionLabel>
            <h2 className="ds-h2 max-w-3xl">
              Nossas <em className="ds-em">publicações.</em>
            </h2>
            <p className="ds-body mt-6 max-w-2xl">
              Todo material publicado pela UFFinvest passa por revisão de diretores e tem caráter
              estritamente educacional. Não constitui recomendação de investimento.
            </p>
          </FadeUp>
        </div>
        <FadeUpStagger className="ds-container grid gap-6 lg:grid-cols-3">
          {projects.map((p, i) => {
            const isAccent = i === 1;
            return (
              <motion.div
                key={p.title}
                variants={fadeUpItem}
              >
                <Link
                  to="/projetos/$slug"
                  params={{ slug: p.slug }}
                  className="ds-card group flex flex-col min-h-[360px] lg:min-h-[440px] h-full transition-colors duration-300 bg-cream border-cream hover:bg-navy hover:border-line cursor-pointer no-underline"
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
                </Link>
              </motion.div>
            );
          })}
        </FadeUpStagger>
      </section>

      {/* ALUMNI */}
      <section id="alumni" className="ds-section bg-navy scroll-mt-24">
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

      {/* EQUIPE */}
      <section id="equipe" className="ds-section bg-cream scroll-mt-24">
        <div className="ds-container">
          <FadeUp className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-5">
              <SectionLabel>Diretoria 2026</SectionLabel>
              <h2 className="ds-h2 text-navy">
                Nossa <em className="ds-em">equipe.</em>
              </h2>
            </div>
            <p className="lg:col-span-6 lg:col-start-7 ds-body text-navy/75 self-end">
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

    </SiteLayout>
  );
}
