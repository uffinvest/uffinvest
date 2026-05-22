import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeUp, FadeUpStagger, fadeUpItem } from "@/components/FadeUp";
import { SectionLabel } from "@/components/SectionLabel";

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

const RECRUITMENT_OPEN = true;

const stages = [
  { n: "01", title: "Inscrição", text: "Preenchimento do formulário online com dados acadêmicos e carta de motivação." },
  { n: "02", title: "Prova Técnica", text: "Avaliação objetiva sobre macroeconomia, contabilidade básica e atualidades do mercado." },
  { n: "03", title: "Dinâmica em Grupo", text: "Estudo de caso real conduzido em comitê, avaliando raciocínio analítico e comunicação." },
  { n: "04", title: "Entrevista Final", text: "Conversa com a diretoria executiva para alinhamento de perfil, fit cultural e expectativas." },
];

const faqs = [
  { q: "Quem pode participar?", a: "Estudantes de graduação de qualquer curso da UFF, em qualquer período. Não é necessário conhecimento prévio em finanças — o que importa é a disposição para aprender." },
  { q: "Qual a carga horária?", a: "Em média 6 horas semanais entre reuniões de comitê, mentorias e produção de conteúdo. A participação é voluntária e não remunerada." },
  { q: "Como me preparo?", a: "Acompanhar a Carta Macro e nossas publicações já é um ótimo começo. Indicamos também noções básicas de microeconomia, contabilidade e atualidades de mercado." },
  { q: "Dúvidas?", a: "Escreva para processo@uffinvest.com ou acesse nossos canais na página inicial." },
];

function ProcessoPage() {
  return (
    <SiteLayout>
      <section className="bg-navy pt-40 pb-20">
        <div className="ds-container">
          <FadeUp immediate>
            <SectionLabel>Junte-se à liga</SectionLabel>
            <h1 className="ds-h1 max-w-4xl">
              Processo <em className="ds-em">seletivo.</em>
            </h1>
            <p className="ds-body mt-8 max-w-2xl">
              Selecionamos novos membros uma vez por semestre. Estudantes de qualquer curso da UFF
              podem se candidatar — buscamos curiosidade, comprometimento e vontade de aprender.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Status */}
      <section className="py-16 bg-surface border-y border-line">
        <FadeUp className="ds-container max-w-5xl">
          {RECRUITMENT_OPEN ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="size-3 bg-gold rounded-full animate-pulse" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-2 text-gold">
                    Status atual
                  </p>
                  <h2 className="font-serif italic text-2xl md:text-3xl text-cream">
                    Nossos processos seletivos estão <em className="ds-em">abertos.</em>
                  </h2>
                  <p className="text-sm mt-2 text-mute">
                    Inscrições até <span className="font-mono text-cream">31 / 03 / 2026</span>
                  </p>
                </div>
              </div>
              <a href="#" className="btn-primary">Inscrever-se agora <span>→</span></a>
            </div>
          ) : (
            <div className="text-center max-w-2xl mx-auto py-8">
              <div className="size-3 bg-mute rounded-full mx-auto mb-6" />
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-2 text-mute">
                Status atual
              </p>
              <h2 className="font-serif italic text-2xl md:text-3xl text-cream mb-4">
                No momento não estamos recrutando novos membros.
              </h2>
              <p className="text-mute">
                Aguarde até o próximo processo seletivo. Para ser notificado, deixe seu e-mail
                em nossas redes ou entre em contato.
              </p>
            </div>
          )}
        </FadeUp>
      </section>

      {/* Stages */}
      <section className="ds-section bg-navy">
        <div className="ds-container">
          <FadeUp className="mb-12">
            <SectionLabel>Etapas</SectionLabel>
            <h2 className="ds-h2">
              Quatro etapas até a <em className="ds-em">liga.</em>
            </h2>
          </FadeUp>
          <FadeUpStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((s) => (
              <motion.div key={s.n} variants={fadeUpItem} className="ds-card flex flex-col gap-4 min-h-[240px]">
                <span className="font-serif italic text-5xl text-gold">{s.n}</span>
                <h3 className="ds-h3">{s.title}</h3>
                <p className="text-sm text-mute leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </FadeUpStagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="ds-section bg-surface">
        <div className="ds-container">
          <FadeUp className="mb-12">
            <SectionLabel>Perguntas Frequentes</SectionLabel>
            <h2 className="ds-h2">Antes de se <em className="ds-em">inscrever.</em></h2>
          </FadeUp>
          <FadeUpStagger className="grid md:grid-cols-2 gap-6">
            {faqs.map((f) => (
              <motion.div key={f.q} variants={fadeUpItem} className="ds-card">
                <h3 className="ds-h3 mb-3">{f.q}</h3>
                <p className="text-mute leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </FadeUpStagger>
          <p className="text-center text-mute mt-12 text-sm">
            Mais informações em{" "}
            <Link to="/" className="text-gold underline underline-offset-4 hover:text-gold-hover">
              nossa página inicial
            </Link>.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
