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
    <footer
      role="contentinfo"
      className="border-t"
      style={{ borderColor: "var(--border-faint)", background: "var(--bg-base)" }}
    >
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr_1fr] gap-10">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 mb-5"
              aria-label="LUTECE Consulting — Retour à l'accueil"
            >
              <div
                className="w-7 h-7 flex items-center justify-center shrink-0"
                style={{ background: "var(--gradient-primary)" }}
                aria-hidden="true"
              >
                <span className="font-black text-[15px] leading-none font-mono" style={{ color: "var(--bg-base)" }}>L</span>
              </div>
              <span className="font-mono text-[12px] font-bold leading-none tracking-[0.06em] uppercase" style={{ color: "var(--text-primary)" }}>
                LUTECE<span style={{ color: "var(--text-muted)" }}>.consulting</span>
              </span>
            </Link>
            <p className="font-mono text-[11px] leading-relaxed mb-4" style={{ color: "var(--text-dim)" }}>
              LUTECE Consulting SAS<br />
              60 rue François Ier<br />
              75008 Paris<br />
              SIREN 882&nbsp;573&nbsp;215
            </p>
            <div className="flex items-center gap-2">
              <span className="pulse-dot" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.06em] uppercase" style={{ color: "var(--accent-success)" }}>
                Disponible · juin 2026
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--text-dim)" }}>
              Navigation
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--text-dim)" }}>
              Services
            </p>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm leading-tight block transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--text-dim)" }}>
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:loic.lafhej@lutece-consulting.com"
                  className="text-sm transition-colors break-all"
                  style={{ color: "var(--text-muted)" }}
                >
                  loic.lafhej@lutece-consulting.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33652561133"
                  className="text-sm transition-colors font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  +33 6 52 56 11 33
                </a>
              </li>
              <li className="pt-2 border-t" style={{ borderColor: "var(--border-faint)" }} />
              {EXTERNAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderColor: "var(--border-faint)" }}
        >
          <p className="font-mono text-[11px]" style={{ color: "var(--text-dim)" }}>
            © {year} LUTECE Consulting SAS · SAS au capital de 1 000 € · SIREN 882&nbsp;573&nbsp;215 · TVA FR91882573215
          </p>
          <p className="font-mono text-[10px] tracking-[0.06em]" style={{ color: "var(--border-bright)" }} aria-hidden="true">
            TJM 850–1100 €/j · Paris / Hybride · Disponible juin 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
