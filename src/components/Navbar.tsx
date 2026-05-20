import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/projetos", label: "Projetos" },
  { to: "/processo-seletivo", label: "Processo Seletivo" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 md:px-8 py-5 flex justify-between items-center transition-colors duration-300 ${
        scrolled ? "bg-navy/95 backdrop-blur-md text-white" : "bg-transparent text-white"
      }`}
    >
      <Link to="/" className="font-black tracking-tighter text-2xl uppercase">
        UFFinvest
      </Link>
      <div className="hidden md:flex gap-8 lg:gap-10 text-[11px] font-medium uppercase tracking-[0.2em] items-center">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="hover:text-accent transition-colors"
            activeProps={{ className: "text-accent" }}
            activeOptions={{ exact: l.to === "/" }}
          >
            {l.label}
          </Link>
        ))}
        <Link
          to="/login"
          className="border border-white/30 px-6 py-2 hover:bg-white hover:text-navy transition-all"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
