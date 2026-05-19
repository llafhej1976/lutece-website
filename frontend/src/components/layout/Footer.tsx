import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const EXTERNAL_LINKS = [
  { href: "https://www.linkedin.com/in/lafhej-loic-15a79a3", label: "LinkedIn" },
  { href: "https://github.com/llafhej1976", label: "GitHub" },
];

const SERVICES_LINKS = [
  { href: "/services#ai-platform-architecture", label: "Architecture Plateforme IA" },
  { href: "/services#llmops-multi-llm", label: "LLMOps & Quorum Multi-LLM" },
  { href: "/services#ai-act-compliance", label: "Conformité EU AI Act" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="border-t border-white/[0.06] bg-[#0A0B10]">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_1fr_1fr] gap-10">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-4"
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
            <p className="text-xs text-[#5A5E6B] leading-relaxed mb-3">
              LUTECE Consulting SAS<br />
              60 rue François Ier, 75008 Paris<br />
              SIREN 882&nbsp;573&nbsp;215
            </p>
            <div className="flex items-center gap-1.5">
              <span className="pulse-dot" aria-hidden="true" />
              <span className="text-xs font-mono text-[#4ADE80]">Disponible · juin 2026</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-mono text-[#5A5E6B] uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7A7E8C] hover:text-[#F5F6F8] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-mono text-[#5A5E6B] uppercase tracking-widest mb-4">
              Services
            </p>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7A7E8C] hover:text-[#F5F6F8] transition-colors leading-tight block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-mono text-[#5A5E6B] uppercase tracking-widest mb-4">
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:loic.lafhej@lutece-consulting.com"
                  className="text-sm text-[#7A7E8C] hover:text-[#F5F6F8] transition-colors break-all"
                >
                  loic.lafhej@lutece-consulting.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33652561133"
                  className="text-sm text-[#7A7E8C] hover:text-[#F5F6F8] transition-colors font-mono"
                >
                  +33 6 52 56 11 33
                </a>
              </li>
              <li className="pt-2 border-t border-white/[0.04]" />
              {EXTERNAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#7A7E8C] hover:text-[#F5F6F8] transition-colors"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-[#5A5E6B]">
            © {year} LUTECE Consulting SAS · SAS au capital de 1 000 € · SIREN 882&nbsp;573&nbsp;215 · TVA FR91882573215
          </p>
          <p className="text-xs font-mono text-[#3A3E4C]">
            TJM 850–1100 €/j · Paris / Hybride · Disponible juin 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
