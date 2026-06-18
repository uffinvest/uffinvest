import { Link } from "@tanstack/react-router";
import logoUFFinvest from "@/assets/logo-uffinvest.svg";

export function Footer() {
  return (
    <footer className="bg-navy text-cream pt-24 pb-12 px-6 border-t border-line">
      <div className="ds-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="sm:col-span-2">
          <img src={logoUFFinvest} alt="UFFinvest" className="h-7 w-auto mb-6" />
          <p className="text-mute max-w-sm mb-8 leading-relaxed">
            Liga de mercado financeiro da Universidade Federal Fluminense de Campos dos Goytacazes.
          </p>
          <div className="flex gap-3">
            {["in", "ig", "yt"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="size-10 rounded-full border border-line flex items-center justify-center text-xs text-mute hover:border-gold hover:text-gold transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h5 className="ds-label mb-6">Navegação</h5>
          <ul className="flex flex-col gap-4 text-sm text-mute">
            <li><Link to="/" hash="sobre" className="hover:text-cream transition-colors">Sobre a Liga</Link></li>
            <li><Link to="/" hash="projetos" className="hover:text-cream transition-colors">Projetos</Link></li>
            <li><Link to="/" hash="equipe" className="hover:text-cream transition-colors">Equipe</Link></li>
            <li><Link to="/login" className="hover:text-cream transition-colors">Área do Membro</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="ds-label mb-6">Contato</h5>
          <p className="text-sm text-mute mb-4">Campos dos Goytacazes - RJ</p>
          <p className="text-sm font-mono text-cream">uffinvest@gmail.com</p>
        </div>
      </div>
      <div className="ds-container pt-8 border-t border-line flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center text-[10px] text-faint uppercase tracking-[0.12em] font-mono">
        <span>© 2026 UFFinvest Market League</span>
        <span>Universidade Federal Fluminense</span>
      </div>
    </footer>
  );
}
