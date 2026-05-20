import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

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
    <div className="min-h-screen grid md:grid-cols-2 bg-secondary">
      {/* Left panel — brand */}
      <aside className="hidden md:flex flex-col justify-between bg-navy text-white p-12 relative overflow-hidden">
        <Link to="/" className="font-black tracking-tighter text-2xl uppercase relative z-10">
          UFFinvest
        </Link>
        <div className="relative z-10">
          <h2 className="font-serif italic text-5xl text-accent leading-tight mb-6">
            Bem-vindo, <br /> analista.
          </h2>
          <p className="text-white/60 max-w-sm leading-relaxed">
            Área restrita aos membros da liga. Acesse comitês, relatórios internos e a base de
            estudos da UFFinvest.
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 relative z-10">
          © 2026 — UFFinvest Market League
        </p>
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute top-1/3 -left-20 size-72 rounded-full bg-accent/20 blur-3xl" />
      </aside>

      {/* Right panel — form */}
      <section className="flex flex-col justify-center p-8 md:p-16">
        <div className="md:hidden mb-12">
          <Link to="/" className="font-black tracking-tighter text-2xl uppercase text-navy">
            UFFinvest
          </Link>
        </div>
        <div className="max-w-md w-full">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            {mode === "login" ? "Acesso de Membro" : "Novo Cadastro"}
          </span>
          <h1 className="text-4xl font-black tracking-tighter mt-3 mb-10 text-navy">
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

            <button
              type="submit"
              className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-accent hover:text-navy transition-all"
            >
              {mode === "login" ? "Entrar" : "Cadastrar"}
            </button>
          </form>

          <p className="mt-8 text-sm text-navy/60">
            {mode === "login" ? "Ainda não é membro?" : "Já tem cadastro?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-primary font-bold border-b border-accent hover:text-accent transition-colors"
            >
              {mode === "login" ? "Criar conta" : "Fazer login"}
            </button>
          </p>

          <Link
            to="/"
            className="inline-block mt-10 font-mono text-[10px] uppercase tracking-widest text-navy/50 hover:text-navy"
          >
            ← Voltar ao site
          </Link>
        </div>
      </section>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-widest text-navy/60 block mb-2">
        {label}
      </span>
      <input
        {...props}
        className="w-full border border-navy/15 bg-white px-4 py-3 text-navy focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
      />
    </label>
  );
}
