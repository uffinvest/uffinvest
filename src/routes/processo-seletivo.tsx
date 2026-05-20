import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/processo-seletivo")({
  head: () => ({
    meta: [
      { title: "Processo Seletivo — UFFinvest" },
      { name: "description", content: "Informações sobre o processo seletivo da UFFinvest, liga de mercado financeiro da UFF." },
      { property: "og:title", content: "Processo Seletivo — UFFinvest" },
      { property: "og:description", content: "Como ingressar na UFFinvest: etapas, prazos e requisitos." },
    ],
  }),
  component: ProcessoPage,
});

// Toggle this to switch between open/closed states.
const RECRUITMENT_OPEN = true;

const stages = [
  { n: "01", title: "Inscrição", text: "Preenchimento do formulário online com dados acadêmicos e carta de motivação." },
  { n: "02", title: "Prova Técnica", text: "Avaliação objetiva sobre macroeconomia, contabilidade básica e atualidades do mercado." },
  { n: "03", title: "Dinâmica em Grupo", text: "Estudo de caso real conduzido em comitê, avaliando raciocínio analítico e comunicação." },
  { n: "04", title: "Entrevista Final", text: "Conversa com a diretoria executiva para alinhamento de perfil, fit cultural e expectativas." },
];

function ProcessoPage() {
  return (
    <SiteLayout>
      <section className="bg-navy text-white pt-40 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-accent text-xs uppercase tracking-widest">
            Junte-se à liga
          </span>
          <h1 className="font-black text-5xl md:text-7xl tracking-tight mt-4 leading-none">
            Processo <span className="font-serif italic text-accent">Seletivo.</span>
          </h1>
          <p className="max-w-2xl mt-8 text-white/70 text-lg leading-relaxed">
            Selecionamos novos membros uma vez por semestre. Estudantes de qualquer curso da UFF
            podem se candidatar — buscamos curiosidade, comprometimento e vontade de aprender.
          </p>
        </div>
      </section>

      {/* Status */}
      <section
        className={`py-16 px-6 md:px-8 ${
          RECRUITMENT_OPEN ? "bg-accent text-navy" : "bg-secondary text-navy"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {RECRUITMENT_OPEN ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="size-4 bg-navy rounded-full animate-pulse" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1">
                    Status atual
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Nossos processos seletivos estão abertos.
                  </h2>
                  <p className="text-sm mt-2 text-navy/70">
                    Inscrições até <span className="font-mono">31 / 03 / 2026</span>
                  </p>
                </div>
              </div>
              <a
                href="#"
                className="px-12 py-5 border-2 border-navy bg-navy text-white font-black uppercase text-xs tracking-widest hover:bg-transparent hover:text-navy transition-all"
              >
                Inscrever-se Agora
              </a>
            </div>
          ) : (
            <div className="text-center max-w-2xl mx-auto py-8">
              <div className="size-4 bg-navy/40 rounded-full mx-auto mb-6" />
              <p className="font-mono text-[10px] uppercase tracking-widest mb-2 text-navy/60">
                Status atual
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                No momento não estamos recrutando novos membros.
              </h2>
              <p className="text-navy/70">
                Aguarde até o próximo processo seletivo. Para ser notificado, deixe seu e-mail
                em nossas redes ou entre em contato.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stages */}
      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">Etapas</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-4">
              Quatro etapas até a liga.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-navy/5">
            {stages.map((s) => (
              <div key={s.n} className="bg-white p-8 flex flex-col gap-4 min-h-[260px]">
                <span className="font-serif text-5xl italic text-accent">{s.n}</span>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-sm text-navy/60 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ-ish */}
      <section className="py-24 px-6 md:px-8 bg-secondary">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold tracking-tighter mb-4">Quem pode participar?</h3>
            <p className="text-navy/70 leading-relaxed">
              Estudantes de graduação de qualquer curso da UFF, em qualquer período. Não é
              necessário conhecimento prévio em finanças — o que importa é a disposição para
              aprender.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold tracking-tighter mb-4">Qual a carga horária?</h3>
            <p className="text-navy/70 leading-relaxed">
              Em média 6 horas semanais entre reuniões de comitê, mentorias e produção de
              conteúdo. A participação é voluntária e não remunerada.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold tracking-tighter mb-4">Como me preparo?</h3>
            <p className="text-navy/70 leading-relaxed">
              Acompanhar a Carta Macro e nossas publicações já é um ótimo começo. Indicamos
              também noções básicas de microeconomia, contabilidade e atualidades de mercado.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold tracking-tighter mb-4">Dúvidas?</h3>
            <p className="text-navy/70 leading-relaxed">
              Escreva para{" "}
              <span className="font-mono text-primary">processo@uffinvest.com</span> ou acesse a{" "}
              <Link to="/" className="text-primary underline underline-offset-4">
                página inicial
              </Link>{" "}
              para conhecer nossos canais.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
