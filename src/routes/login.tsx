import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FadeUp } from "@/components/FadeUp";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate({ to: "/", hash: "capa" });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Conta criada com sucesso!");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao autenticar");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    const { lovable } = await import("@/integrations/lovable");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Falha no login com Google");
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-navy text-cream">
      <aside className="hidden md:flex flex-col justify-between bg-surface p-12 relative overflow-hidden border-r border-line">
        <Link to="/" hash="capa" className="relative z-10 inline-flex items-center" aria-label="UFFinvest — Início">
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

      <section className="flex flex-col justify-center p-8 md:p-16 bg-navy">
        <div className="md:hidden mb-12">
          <Link to="/" hash="capa" className="inline-flex items-center" aria-label="UFFinvest — Início">
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

          <button
            type="button"
            onClick={google}
            disabled={busy}
            className="w-full mb-6 inline-flex items-center justify-center gap-3 border border-line bg-surface hover:border-gold transition-colors rounded-md py-3 text-cream disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2C41.2 35.6 44 30.3 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
            Continuar com Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-line" />
            <span className="text-[10px] uppercase tracking-[0.12em] text-faint">ou</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <form className="space-y-5" onSubmit={submit}>
            {mode === "signup" && (
              <Field label="Nome completo" type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required />
            )}
            <Field label="E-mail" type="email" placeholder="voce@id.uff.br" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Field label="Senha" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />

            <button type="submit" disabled={busy} className="btn-primary w-full mt-2 disabled:opacity-50">
              {busy ? "Aguarde..." : mode === "login" ? "Entrar" : "Cadastrar"}
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

          <Link to="/" hash="capa" className="btn-ghost mt-10">
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
