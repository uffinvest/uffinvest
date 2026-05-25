import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FadeUp } from "@/components/FadeUp";
import logoUFFinvest from "@/assets/logo-uffinvest.svg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — UFFinvest" },
      { name: "description", content: "Área restrita para membros da UFFinvest." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-navy text-cream">
      {/* Left panel — brand */}
      <aside className="hidden md:flex flex-col justify-between bg-surface p-12 relative overflow-hidden border-r border-line">
        <Link to="/" className="relative z-10 inline-flex items-center" aria-label="UFFinvest — Início">
          <img src={logoUFFinvest} alt="UFFinvest" className="h-6 w-auto" />
        </Link>
        <FadeUp immediate className="relative z-10">
          <h2 className="font-serif italic text-5xl text-gold leading-tight mb-6">
            Bem-vindo, <br /> analista.
          </h2>
          <p className="text-mute max-w-sm leading-relaxed">
            Área restrita aos membros da liga. Acesse comitês, relatórios internos e a base de
            estudos da UFFinvest.
          </p>
        </FadeUp>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint relative z-10">
          © 2026 — UFFinvest Market League
        </p>
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute top-1/3 -left-20 size-72 rounded-full bg-gold/5 blur-3xl" />
      </aside>

      {/* Right panel — form */}
      <section className="flex flex-col justify-center p-8 md:p-16 bg-navy">
        <div className="md:hidden mb-12">
          <Link to="/" className="inline-flex items-center" aria-label="UFFinvest — Início">
            <img src={logoUFFinvest} alt="UFFinvest" className="h-6 w-auto" />
          </Link>
        </div>
        <FadeUp immediate className="max-w-md w-full">
          <span className="ds-label">
            {mode === "login" ? "Acesso de Membro" : "Novo Cadastro"}
          </span>
          <h1 className="font-serif italic text-4xl md:text-5xl text-cream mt-3 mb-10">
            {mode === "login" ? "Entre na sua conta." : "Crie sua conta."}
          </h1>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {mode === "signup" && (
              <Field label="Nome completo" type="text" placeholder="Seu nome" />
            )}
            <Field label="E-mail institucional" type="email" placeholder="voce@id.uff.br" />
            <Field label="Senha" type="password" placeholder="••••••••" />

            <button type="submit" className="btn-primary w-full mt-2">
              {mode === "login" ? "Entrar" : "Cadastrar"}
            </button>
          </form>

          <p className="mt-8 text-sm text-mute">
            {mode === "login" ? "Ainda não é membro?" : "Já tem cadastro?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-gold font-semibold hover:text-gold-hover transition-colors"
            >
              {mode === "login" ? "Criar conta" : "Fazer login"}
            </button>
          </p>

          <Link to="/" className="btn-ghost mt-10">
            ← Voltar ao site
          </Link>
        </FadeUp>
      </section>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-mute block mb-2">
        {label}
      </span>
      <input
        {...props}
        className="w-full bg-surface border border-line rounded-md px-4 py-3 text-cream placeholder:text-faint focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
      />
    </label>
  );
}
