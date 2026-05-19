"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 h-[56px] border-b transition-all duration-300"
        style={{
          background: scrolled ? "rgba(8,8,12,0.96)" : "var(--bg-base)",
          borderColor: "var(--border-faint)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="container h-full flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="LUTECE Consulting — Retour à l'accueil"
          >
            <div
              className="w-7 h-7 flex items-center justify-center shrink-0"
              style={{ background: "var(--gradient-primary)" }}
              aria-hidden="true"
            >
              <span className="font-black text-[16px] leading-none font-mono" style={{ color: "var(--bg-base)" }}>L</span>
            </div>
            <span className="font-mono text-[12px] font-bold leading-none tracking-[0.06em] uppercase" style={{ color: "var(--text-primary)" }}>
              LUTECE<span style={{ color: "var(--text-muted)" }}>.consulting</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Navigation principale"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-150"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: availability + burger */}
          <div className="flex items-center gap-3">
            <div
              className="hidden md:flex items-center gap-2 px-2.5 py-1 border"
              style={{ borderColor: "rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.04)" }}
              aria-label="Statut : disponible à partir de juin 2026"
            >
              <span className="pulse-dot" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-[0.08em] uppercase whitespace-nowrap" style={{ color: "var(--accent-success)" }}>
                Dispo · juin&nbsp;2026
              </span>
            </div>

            <button
              className="md:hidden flex items-center justify-center w-8 h-8 transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-black/70"
          onClick={() => setOpen(false)}
        />

        <nav
          className={`absolute top-0 right-0 h-full w-[260px] flex flex-col transition-transform duration-300 border-l ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "var(--bg-base)", borderColor: "var(--border-default)" }}
          aria-label="Navigation mobile"
        >
          <div className="h-[56px] flex items-center justify-end px-4 border-b" style={{ borderColor: "var(--border-faint)" }}>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-8 h-8 transition-colors"
              style={{ color: "var(--text-muted)" }}
              aria-label="Fermer le menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col px-6 pt-4 flex-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3.5 font-mono text-xs tracking-[0.1em] uppercase border-b transition-colors"
                style={{ color: "var(--text-secondary)", borderColor: "var(--border-faint)" }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="px-6 pb-8 pt-4">
            <div
              className="flex items-center gap-2 px-3 py-2 border w-fit"
              style={{ borderColor: "rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.04)" }}
            >
              <span className="pulse-dot" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--accent-success)" }}>
                Disponible · juin 2026
              </span>
            </div>
            <p className="mt-3 font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--text-dim)" }}>
              TJM 850–1100 €/j · Paris
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
