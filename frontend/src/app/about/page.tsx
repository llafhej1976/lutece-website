import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Linkedin, MapPin, Calendar, GraduationCap, Briefcase, CheckCircle } from "lucide-react";
import CommandButton from "@/components/ui/terminal/CommandButton";
import AsciiSeparator from "@/components/ui/terminal/AsciiSeparator";

export const metadata: Metadata = {
  title: "À propos — Loïc Lafhej, Architecte IA Agentique Senior",
  description:
    "Loïc Lafhej, 23 ans IT, DEA IA Paris 13. Architecte IA agentique en production. Multi-agents, LLMOps, EU AI Act. Disponible juin 2026.",
  keywords: [
    "Loïc Lafhej architecte IA",
    "DEA intelligence artificielle Paris 13",
    "architecte IA senior Paris",
    "LLMOps expert France",
    "EU AI Act consultant",
    "IA agentique expérience",
  ],
  alternates: { canonical: "https://lutece-consulting.com/about" },
  openGraph: {
    title: "Loïc Lafhej — Architecte IA Agentique Senior | À propos",
    description:
      "23 ans IT, DEA IA Paris 13, 2,5 ans IA agentique en production pour banque, assurance, santé. LUTECE Consulting SAS, Paris.",
    url: "https://lutece-consulting.com/about",
  },
};

const TIMELINE = [
  {
    year: "2001",
    icon: Briefcase,
    label: "Début de carrière IT",
    place: "Développement & Systèmes d'information",
    current: false,
  },
  {
    year: "2003",
    icon: GraduationCap,
    label: "DEA Intelligence Artificielle & Optimisation Combinatoire",
    place: "Université Paris 13",
    current: false,
  },
  {
    year: "2020",
    icon: Briefcase,
    label: "Fondation LUTECE Consulting SAS",
    place: "Paris — SIREN 882 573 215",
    current: false,
  },
  {
    year: "2022",
    icon: Briefcase,
    label: "Spécialisation IA Générative",
    place: "Environnements régulés — banque · assurance",
    current: false,
  },
  {
    year: "2023",
    icon: Briefcase,
    label: "IA Agentique en production",
    place: "Systèmes multi-agents · LLMOps · EU AI Act by design",
    current: false,
  },
  {
    year: "2026",
    icon: Calendar,
    label: "Disponible · TJM 850–1100 €/j",
    place: "Paris / Hybride — à partir du 2 juin 2026",
    current: true,
  },
];

const EXPERTISE = [
  {
    pct: 50,
    color: "var(--accent-cyan)",
    label: "IA Agentique Régulée",
    items: [
      "Systèmes multi-agents production-ready",
      "PII Guard & détection d'entités",
      "Audit chain SHA-256 (rétention 7 ans)",
      "Gouvernance EU AI Act by design",
    ],
  },
  {
    pct: 30,
    color: "var(--accent-violet)",
    label: "Quorum Multi-LLM & LLMOps",
    items: [
      "QuorumDispatcher asyncio + consensus",
      "Observabilité p95/p99 par provider",
      "Registry prompts versionné",
      "Benchmark data-driven multi-provider",
    ],
  },
  {
    pct: 20,
    color: "#E879F9",
    label: "AI Governance & Conformité",
    items: [
      "EU AI Act Articles 9-15",
      "DORA · RGPD · AAOIFI",
      "Model cards & AI risk register",
      "Policy engine pre-LLM",
    ],
  },
];

const PROOF = [
  "2,5 ans d'IA agentique en production (pas du prototypage)",
  "Environnements régulés : banque, assurance, santé",
  "DEA IA & Optimisation Combinatoire — Paris 13, 2003",
  "23 ans d'expérience IT de bout en bout",
  "Architecture, code, déploiement, mesure — pas de conseil théorique",
  "LUTECE Consulting SAS — structure juridique dédiée",
];

export default function AboutPage() {
  return (
    <div className="pt-[56px]">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="section-spacing">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">

            {/* Avatar */}
            <div className="shrink-0 animate-fade-up">
              <div
                className="relative w-40 h-40 overflow-hidden"
                style={{ border: "1px solid var(--border-default)", background: "var(--bg-elevated)" }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.08) 0%, rgba(0,229,255,0.08) 100%)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-8xl font-black leading-none select-none gradient-text"
                  >
                    L
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="pulse-dot" aria-hidden="true" />
                <span className="font-mono text-xs" style={{ color: "var(--accent-success)" }}>Disponible · juin 2026</span>
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 animate-fade-up delay-1">
              <p className="kicker mb-3">LUTECE Consulting SAS · Paris</p>
              <h1 className="font-black mb-2" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", color: "var(--text-primary)" }}>
                Loïc{" "}
                <span className="gradient-text">Lafhej</span>
              </h1>
              <p className="text-xl mb-6 font-mono" style={{ color: "var(--text-muted)" }}>
                Architecte IA Agentique Senior
              </p>
              <p className="leading-relaxed mb-4 max-w-xl" style={{ color: "var(--text-secondary)" }}>
                23 ans d&apos;expérience IT. DEA Intelligence Artificielle &amp;
                Optimisation Combinatoire (Paris 13, 2003). 2,5 ans d&apos;IA
                agentique en production dans des environnements régulés.
              </p>
              <p className="leading-relaxed max-w-xl mb-8" style={{ color: "var(--text-tertiary)" }}>
                Je construis et opère des plateformes IA agentiques pour des clients
                en banque, assurance et infrastructures critiques. Architecture,
                code, déploiement, mesure — pas de conseil théorique.
              </p>

              <div className="flex flex-wrap gap-3">
                <CommandButton href="mailto:loic.lafhej@lutece-consulting.com" variant="primary" as="a">
                  <Mail size={13} aria-hidden="true" />
                  Me contacter
                </CommandButton>
                <CommandButton
                  href="https://www.linkedin.com/in/lafhej-loic-15a79a3"
                  variant="ghost"
                  as="a"
                >
                  <Linkedin size={13} aria-hidden="true" />
                  LinkedIn
                </CommandButton>
              </div>

              <div className="flex flex-wrap gap-4 mt-6 font-mono text-xs" style={{ color: "var(--text-dim)" }}>
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} />
                  75008 Paris / Île-de-France
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase size={11} />
                  TJM 850–1100 €/j
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AsciiSeparator className="container" />

      {/* ── Proof points ──────────────────────────────── */}
      <section className="section-spacing border-t" style={{ borderColor: "var(--border-faint)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="kicker mb-3 text-center">Pourquoi travailler avec moi</p>
            <h2 className="font-bold text-center mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", color: "var(--text-primary)" }}>
              Ce qui me différencie
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "var(--border-default)" }}>
              {PROOF.map((item) => (
                <div key={item} className="flex items-start gap-3 p-5" style={{ background: "var(--bg-elevated)" }}>
                  <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent-cyan)" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Expertise breakdown ──────────────────────── */}
      <section className="section-spacing border-t" style={{ borderColor: "var(--border-faint)", background: "var(--bg-elevated)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="kicker mb-3 text-center">Répartition du temps mission</p>
            <h2 className="font-bold text-center mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", color: "var(--text-primary)" }}>
              3 piliers d&apos;expertise
            </h2>

            <div className="space-y-px" style={{ background: "var(--border-default)" }}>
              {EXPERTISE.map((ex) => (
                <div key={ex.label} className="p-6" style={{ background: "var(--bg-elevated)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>{ex.label}</h3>
                    <span
                      className="text-2xl font-black font-mono"
                      style={{ color: ex.color }}
                    >
                      {ex.pct}%
                    </span>
                  </div>
                  <div className="progress-track mb-4">
                    <div
                      className="progress-bar"
                      style={{ width: `${ex.pct}%`, background: ex.color }}
                    />
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ex.items.map((item) => (
                      <li
                        key={item}
                        className="text-xs flex items-center gap-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <span style={{ color: ex.color }}>›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────── */}
      <section className="section-spacing border-t" style={{ borderColor: "var(--border-faint)" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <p className="kicker mb-3 text-center">Parcours</p>
            <h2 className="font-bold text-center mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", color: "var(--text-primary)" }}>
              Chronologie
            </h2>

            <div className="relative pl-10">
              <div className="absolute left-3 top-2 bottom-2 w-px" style={{ background: "var(--border-default)" }} />

              <div className="space-y-6">
                {TIMELINE.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="relative">
                      <div
                        className="absolute -left-[28px] w-6 h-6 border flex items-center justify-center"
                        style={{
                          background: item.current ? "rgba(74,222,128,0.08)" : "var(--bg-base)",
                          borderColor: item.current ? "var(--accent-success)" : "var(--border-default)",
                        }}
                      >
                        <Icon
                          size={11}
                          style={{ color: item.current ? "var(--accent-success)" : "var(--text-dim)" }}
                        />
                      </div>

                      <div className="p-4 border" style={{ borderColor: "var(--border-default)", background: "var(--bg-elevated)" }}>
                        <span
                          className="inline-block font-mono text-xs mb-1"
                          style={{ color: item.current ? "var(--accent-success)" : "var(--accent-cyan)" }}
                        >
                          {item.year}
                        </span>
                        <p className="font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                          {item.label}
                        </p>
                        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{item.place}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="section-spacing border-t" style={{ borderColor: "var(--border-faint)", background: "var(--bg-elevated)" }}>
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-bold mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", color: "var(--text-primary)" }}>
              Discutons de votre projet
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
              TJM{" "}
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>850–1100 €/jour</span>{" "}
              selon contexte. Disponible à partir du{" "}
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>2 juin 2026</span>.
              Paris &amp; hybride Île-de-France.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Me contacter →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
