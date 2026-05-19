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
        <Link href="/" className="flex items-center gap-3 group" aria-label="LUTECE Consulting — Accueil">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="url(#hg)" />
            <path d="M8 7h5v14h9v4H8V7z" fill="white" />
            <defs>
              <linearGradient id="hg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00d9ff" />
                <stop offset="0.5" stopColor="#6b00ff" />
                <stop offset="1" stopColor="#ff00c8" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-mono text-sm font-bold leading-none">
            <span className="text-[#00d9ff]">LUTECE</span>
            <span className="text-[#a3a3a3]">.consulting</span>
          </span>
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
