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
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0B10]/85 backdrop-blur-[12px] border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="container h-full flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="LUTECE Consulting — Retour à l'accueil"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #7C5CFF 0%, #4DD0FF 100%)" }}
              aria-hidden="true"
            >
              <span className="text-white font-black text-[18px] leading-none font-mono">L</span>
            </div>
            <span className="font-mono text-[13px] font-bold text-[#F5F6F8] leading-none">
              LUTECE<span className="text-[#7A7E8C]">.consulting</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Navigation principale"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#7A7E8C] hover:text-[#F5F6F8] transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Availability badge */}
            <div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/5"
              aria-label="Statut : disponible à partir de juin 2026"
            >
              <span className="pulse-dot" aria-hidden="true" />
              <span className="text-[11px] font-mono text-[#4ADE80] tracking-[0.05em] whitespace-nowrap">
                Disponible · juin&nbsp;2026
              </span>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-[#B4B7C1] hover:text-white hover:bg-white/[0.05] transition-colors"
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
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Drawer panel */}
        <nav
          className={`absolute top-0 right-0 h-full w-[280px] bg-[#0A0B10] border-l border-white/[0.06] flex flex-col transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Navigation mobile"
        >
          <div className="h-[72px] flex items-center justify-end px-5">
            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-[#7A7E8C] hover:text-white hover:bg-white/[0.05] transition-colors"
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
                className="py-4 text-base font-medium text-[#B4B7C1] hover:text-white border-b border-white/[0.06] last:border-none transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="px-6 pb-8">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-[#4ADE80]/25 bg-[#4ADE80]/5 w-fit">
              <span className="pulse-dot" aria-hidden="true" />
              <span className="text-xs font-mono text-[#4ADE80]">Disponible · juin 2026</span>
            </div>
            <p className="mt-3 text-xs font-mono text-[#5A5E6B]">
              TJM 850–1100 €/j · Paris / Hybride
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
