import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-24 pb-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
        <div className="md:col-span-2">
          <div className="text-3xl font-black mb-8">UFFinvest.</div>
          <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
            Referência acadêmica em gestão e análise de ativos no Rio de Janeiro.
            Filiada à Universidade Federal Fluminense.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="LinkedIn"
              className="size-9 rounded-full border border-white/20 flex items-center justify-center text-xs hover:bg-accent hover:text-navy hover:border-accent transition-colors"
            >
              in
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="size-9 rounded-full border border-white/20 flex items-center justify-center text-xs hover:bg-accent hover:text-navy hover:border-accent transition-colors"
            >
              ig
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="size-9 rounded-full border border-white/20 flex items-center justify-center text-xs hover:bg-accent hover:text-navy hover:border-accent transition-colors"
            >
              yt
            </a>
          </div>
        </div>
        <div>
          <h5 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-6">
            Navegação
          </h5>
          <ul className="flex flex-col gap-4 text-sm text-white/70">
            <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre a Liga</Link></li>
            <li><Link to="/projetos" className="hover:text-white transition-colors">Projetos</Link></li>
            <li><Link to="/processo-seletivo" className="hover:text-white transition-colors">Processo Seletivo</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">Área do Membro</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-6">
            Contato
          </h5>
          <p className="text-sm text-white/70 mb-4">Niterói, RJ — Campus Gragoatá</p>
          <p className="text-sm font-mono">contato@uffinvest.com</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center text-[10px] text-white/30 uppercase tracking-widest font-mono">
        <span>© 2026 UFFinvest Market League</span>
        <span>Universidade Federal Fluminense</span>
      </div>
    </footer>
  );
}
