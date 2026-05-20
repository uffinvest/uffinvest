import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

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
      <section className="bg-navy text-white pt-40 pb-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-accent text-xs uppercase tracking-widest">Sobre a Liga</span>
          <h1 className="font-black text-5xl md:text-7xl tracking-tight mt-4 leading-none">
            Uma liga construída <br />
            <span className="font-serif italic text-accent">por estudantes,</span> para o mercado.
          </h1>
          <p className="max-w-2xl mt-8 text-white/70 text-lg leading-relaxed">
            Desde 2018, a UFFinvest reúne estudantes da Universidade Federal Fluminense em torno
            de um propósito comum: dominar o mercado financeiro com rigor técnico e responsabilidade.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-px bg-navy/5">
          {pillars.map((p, i) => (
            <div key={p.label} className="bg-white p-10">
              <span className="font-mono text-xs text-primary block mb-6">
                0{i + 1} / {p.label.toUpperCase()}
              </span>
              <h3 className="font-serif text-3xl italic mb-4 text-navy">{p.label}.</h3>
              <p className="text-navy/70 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* History */}
      <section className="py-24 px-6 md:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">Nossa História</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-4">
              Oito anos formando analistas.
            </h2>
          </div>
          <ol className="relative border-l-2 border-accent/40 ml-2 space-y-12">
            {timeline.map((t) => (
              <li key={t.year} className="pl-8 relative">
                <div className="absolute -left-[9px] top-2 size-4 bg-accent rounded-full ring-4 ring-secondary" />
                <p className="font-mono text-primary text-sm mb-2">{t.year}</p>
                <h3 className="font-bold text-2xl mb-2">{t.title}</h3>
                <p className="text-navy/70 max-w-2xl leading-relaxed">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SiteLayout>
  );
}
