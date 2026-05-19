"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#262626] bg-black/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm font-bold">
          <span className="text-[#00d9ff]">LUTECE</span>
          <span className="text-[#a3a3a3]">.consulting</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#a3a3a3] hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden md:block px-4 py-2 text-sm rounded-lg bg-[#00d9ff] text-black font-semibold hover:bg-[#00d9ff]/90 transition"
        >
          Disponible juin 2026
        </Link>

        <button
          className="md:hidden text-[#a3a3a3]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#262626] bg-black px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#a3a3a3] hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
