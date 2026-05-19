import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Linkedin, MapPin, Calendar, GraduationCap, Briefcase, CheckCircle } from "lucide-react";

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
    year: "2020",
    icon: Briefcase,
    label: "Fondation LUTECE Consulting SAS",
    place: "Paris — SIREN 882 573 215",
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
    color: "#4DD0FF",
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
    color: "#7C5CFF",
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
    <div className="pt-[72px]">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="section-spacing dot-grid">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">

            {/* Avatar */}
            <div className="shrink-0 animate-fade-up">
              <div className="relative w-44 h-44 rounded-2xl overflow-hidden card">
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(124,92,255,0.15) 0%, rgba(77,208,255,0.15) 100%)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-8xl font-black leading-none select-none"
                    style={{
                      background: "linear-gradient(135deg, #7C5CFF 0%, #4DD0FF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    L
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="pulse-dot" aria-hidden="true" />
                <span className="text-xs font-mono text-[#4ADE80]">Disponible · juin 2026</span>
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 animate-fade-up delay-1">
              <p className="kicker mb-3">LUTECE Consulting SAS · Paris</p>
              <h1 className="text-4xl md:text-5xl font-black mb-2 text-[#F5F6F8]">
                Loïc{" "}
                <span className="gradient-text">Lafhej</span>
              </h1>
              <p className="text-xl text-[#7A7E8C] mb-6 font-mono">
                Architecte IA Agentique Senior
              </p>
              <p className="text-[#B4B7C1] leading-relaxed mb-4 max-w-xl">
                23 ans d&apos;expérience IT. DEA Intelligence Artificielle &amp;
                Optimisation Combinatoire (Paris 13, 2003). 2,5 ans d&apos;IA
                agentique en production dans des environnements régulés.
              </p>
              <p className="text-[#7A7E8C] leading-relaxed max-w-xl mb-8">
                Je construis et opère des plateformes IA agentiques pour des clients
                en banque, assurance et infrastructures critiques. Architecture,
                code, déploiement, mesure — pas de conseil théorique.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:loic.lafhej@lutece-consulting.com"
                  className="btn btn-primary"
                >
                  <Mail size={15} />
                  Me contacter
                </a>
                <a
                  href="https://www.linkedin.com/in/lafhej-loic-15a79a3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <Linkedin size={15} />
                  LinkedIn
                </a>
              </div>

              <div className="flex flex-wrap gap-4 mt-6 text-xs font-mono text-[#5A5E6B]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-[#7A7E8C]" />
                  75008 Paris / Île-de-France
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase size={12} className="text-[#7A7E8C]" />
                  TJM 850–1100 €/j
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof points ──────────────────────────────── */}
      <section className="section-spacing border-t border-white/[0.06]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="kicker mb-3 text-center">Pourquoi travailler avec moi</p>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#F5F6F8]">
              Ce qui me différencie
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROOF.map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 card rounded-xl">
                  <CheckCircle size={16} className="text-[#4DD0FF] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#B4B7C1] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Expertise breakdown ──────────────────────── */}
      <section className="section-spacing border-t border-white/[0.06]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="kicker mb-3 text-center">Répartition du temps mission</p>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#F5F6F8]">
              3 piliers d&apos;expertise
            </h2>

            <div className="space-y-6">
              {EXPERTISE.map((ex) => (
                <div key={ex.label} className="card-gradient-border p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-[#F5F6F8]">{ex.label}</h3>
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
                      style={{
                        width: `${ex.pct}%`,
                        background: ex.color,
                        boxShadow: `0 0 10px ${ex.color}60`,
                      }}
                    />
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ex.items.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-[#7A7E8C] flex items-center gap-2"
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
      <section className="section-spacing border-t border-white/[0.06]">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <p className="kicker mb-3 text-center">Parcours</p>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#F5F6F8]">
              Chronologie
            </h2>

            <div className="relative pl-10">
              {/* Vertical line */}
              <div className="absolute left-3 top-2 bottom-2 w-px bg-white/[0.06]" />

              <div className="space-y-8">
                {TIMELINE.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="relative">
                      {/* Node */}
                      <div
                        className="absolute -left-[28px] w-6 h-6 rounded-full border flex items-center justify-center"
                        style={{
                          background: item.current ? "rgba(74,222,128,0.1)" : "var(--bg-elevated)",
                          borderColor: item.current ? "#4ADE80" : "rgba(255,255,255,0.1)",
                        }}
                      >
                        <Icon
                          size={11}
                          style={{ color: item.current ? "#4ADE80" : "#5A5E6B" }}
                        />
                      </div>

                      <div className="card rounded-xl p-4">
                        <span
                          className="inline-block text-xs font-mono mb-1"
                          style={{ color: item.current ? "#4ADE80" : "#4DD0FF" }}
                        >
                          {item.year}
                        </span>
                        <p className="font-semibold text-[#F5F6F8] leading-snug">
                          {item.label}
                        </p>
                        <p className="text-sm text-[#7A7E8C] mt-0.5">{item.place}</p>
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
      <section className="section-spacing border-t border-white/[0.06]">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#F5F6F8]">
              Discutons de votre projet
            </h2>
            <p className="text-[#7A7E8C] mb-8 leading-relaxed">
              TJM{" "}
              <span className="text-[#F5F6F8] font-semibold">850–1100 €/jour</span>{" "}
              selon contexte. Disponible à partir du{" "}
              <span className="text-[#F5F6F8] font-semibold">2 juin 2026</span>.
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
