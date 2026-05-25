import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoUFFinvest from "@/assets/logo-uffinvest.svg";

const links = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/projetos", label: "Projetos" },
  { to: "/processo-seletivo", label: "Processo Seletivo" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(8, 15, 30, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-line)" : "1px solid transparent",
      }}
    >
      <Link to="/" className="flex items-center" aria-label="UFFinvest — Início">
        <img src={logoUFFinvest} alt="UFFinvest" className="h-5 md:h-6 w-auto" />
      </Link>
      <div className="hidden md:flex gap-10 text-[11px] font-semibold uppercase tracking-[0.12em] items-center text-mute">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="transition-colors hover:text-gold"
            activeProps={{ style: { color: "var(--color-gold)" } }}
            activeOptions={{ exact: l.to === "/" }}
          >
            {l.label}
          </Link>
        ))}
        <Link to="/login" className="btn-primary !py-2.5 !px-6 !text-[11px] uppercase tracking-[0.12em]">
          Login
        </Link>
      </div>
    </nav>
  );
}
