import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import heroImg from "@/assets/hero-financial.jpg";
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

function Index() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-screen w-full flex items-center px-6 md:px-8 overflow-hidden bg-navy">
        <img
          src={heroImg}
          alt="Distrito financeiro ao entardecer"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent" />
        <div className="relative z-10 max-w-5xl animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="h-px w-12 bg-accent" />
            <span className="font-mono text-accent text-xs tracking-widest uppercase italic">
              Formando a elite do mercado
            </span>
          </div>
          <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-10">
            A excelência no <br />
            <span className="font-serif italic font-bold text-accent">Coração da UFF.</span>
          </h1>
          <div className="flex flex-wrap gap-6 items-stretch">
            <Link
              to="/projetos"
              className="bg-primary text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-accent hover:text-navy transition-all group inline-flex items-center"
            >
              Conheça nossa liga
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
            <div className="flex flex-col justify-center border-l border-white/20 pl-6">
              <span className="text-white/50 text-[10px] uppercase tracking-widest mb-1">
                Próximo Recrutamento
              </span>
              <span className="text-white font-mono text-sm">Março 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="py-24 px-6 md:px-8 border-b border-navy/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">
              Sobre Nós
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-none mb-6">
              Nossa Missão no Mercado Financeiro.
            </h2>
            <p className="text-navy/70 leading-relaxed text-lg">
              A UFFinvest não é apenas uma liga acadêmica. Somos um centro de excelência
              focado na formação prática de profissionais para os maiores players do
              mercado financeiro global.
            </p>
            <Link
              to="/sobre"
              className="inline-block mt-8 text-primary font-bold text-xs uppercase tracking-widest border-b-2 border-accent pb-1 hover:text-accent transition-colors"
            >
              Conheça nossa história →
            </Link>
          </div>
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { n: "01", t: "RIGOR", h: "Análise Crítica", d: "Metodologia própria baseada nos fundamentos de grandes gestoras." },
              { n: "02", t: "REDE", h: "Networking Ativo", d: "Conexão direta com ex-membros nas maiores casas de análise do país." },
              { n: "03", t: "PRÁTICA", h: "Comitês Reais", d: "Discussões semanais de teses com gestão de portfólio simulado." },
              { n: "04", t: "ENSINO", h: "Trilha Estruturada", d: "Currículo próprio cobrindo macro, valuation e M&A." },
            ].map((c) => (
              <div key={c.n} className="p-8 border border-navy/5 bg-white hover:border-primary/30 transition-colors">
                <span className="font-mono text-primary block mb-4 text-xs">
                  {c.n} / {c.t}
                </span>
                <h3 className="font-bold mb-2">{c.h}</h3>
                <p className="text-sm text-navy/60">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALUMNI TESTIMONIALS */}
      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 flex-wrap gap-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Onde estão nossos egressos.</h2>
            <span className="font-mono text-[10px] text-navy/40 uppercase mb-2">Alumni Network</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-navy/5">
            {alumni.map((a) => (
              <article key={a.name} className="bg-white p-10 flex flex-col gap-6">
                <p className="font-serif italic text-xl leading-snug text-navy/90">
                  “{a.quote}”
                </p>
                <div className="mt-auto pt-6 border-t border-navy/10">
                  <p className="font-bold">{a.name}</p>
                  <p className="text-sm text-navy/60">{a.role}</p>
                  <p className="font-mono text-[10px] text-accent uppercase tracking-widest mt-2">
                    {a.year}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-5">
              <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">
                Diretoria 2026
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Nossa Equipe.</h2>
            </div>
            <p className="md:col-span-6 md:col-start-7 text-navy/70 self-end leading-relaxed">
              Estudantes da UFF eleitos pelos próprios membros a cada ciclo. Conduzem
              comitês, mentoram analistas júnior e representam a liga junto ao mercado.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-navy/5">
            {team.map((m, i) => (
              <div key={m.name} className="bg-white aspect-[3/4] relative group overflow-hidden">
                <img
                  src={teamImg}
                  alt=""
                  loading="lazy"
                  width={400}
                  height={533}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  style={{ objectPosition: `${(i * 17) % 100}% center` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-1">
                    0{i + 1}
                  </p>
                  <p className="font-bold text-lg leading-tight">{m.name}</p>
                  <p className="text-sm text-white/70">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTION CTA */}
      <section className="bg-accent py-12 px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="size-3 bg-navy rounded-full animate-pulse" />
            <h4 className="text-xl md:text-2xl font-bold tracking-tight text-navy text-center md:text-left">
              Nossos processos seletivos estão abertos.
            </h4>
          </div>
          <Link
            to="/processo-seletivo"
            className="px-10 py-4 border-2 border-navy text-navy font-black uppercase text-xs tracking-widest hover:bg-navy hover:text-white transition-all"
          >
            Inscrever-se Agora
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
