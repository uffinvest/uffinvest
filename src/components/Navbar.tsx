import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoUFFinvest from "@/assets/logo-uffinvest.svg";

const links = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/projetos", label: "Projetos" },
  { to: "/processo-seletivo", label: "Processo Seletivo" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const opaque = scrolled || open;

  return (
    <nav
      className="fixed top-0 w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-all duration-300"
      style={{
        backgroundColor: opaque ? "rgba(8, 15, 30, 0.88)" : "transparent",
        backdropFilter: opaque ? "blur(20px)" : "none",
        WebkitBackdropFilter: opaque ? "blur(20px)" : "none",
        borderBottom: opaque ? "1px solid var(--color-line)" : "1px solid transparent",
      }}
    >
      <Link to="/" className="flex items-center" aria-label="UFFinvest — Início" onClick={() => setOpen(false)}>
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

      <div className="md:hidden flex items-center gap-3">
        <Link
          to="/login"
          onClick={() => setOpen(false)}
          className="btn-primary !py-2 !px-4 !text-[11px] uppercase tracking-[0.12em]"
        >
          Login
        </Link>
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center w-10 h-10 -mr-2 text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-x-0 top-[64px] bottom-0 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: "rgba(8, 15, 30, 0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex flex-col gap-3 px-6 pt-8 pb-10 text-mute items-end">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="w-full py-4 px-5 text-sm font-semibold uppercase tracking-[0.16em] rounded-lg border border-[var(--color-line)] transition-colors hover:text-gold text-right"
              style={{
                backgroundColor: "rgba(8, 15, 30, 0.5)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
              activeProps={{ style: { color: "var(--color-gold)", backgroundColor: "rgba(8, 15, 30, 0.5)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" } }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

    </nav>
  );
}
