import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos — Loïc Lafhej",
  description: "Architecte IA Senior, 23 ans d'expérience, DEA IA Paris 13. Spécialiste IA agentique régulée.",
};

const TIMELINE = [
  { year: "2003", label: "DEA Intelligence Artificielle & Optimisation Combinatoire", place: "Université Paris 13" },
  { year: "2001", label: "Début carrière IT", place: "Systèmes & Développement" },
  { year: "2022", label: "Spécialisation IA Générative", place: "Environnements régulés" },
  { year: "2023", label: "IA Agentique en production", place: "Banque · Assurance · Santé" },
  { year: "2024", label: "Fondation LUTECE Consulting SAS", place: "Paris" },
  { year: "2026", label: "Disponible · TJM 850–1100 €/j", place: "Paris / Hybride — à partir du 2 juin" },
];

const EXPERTISE = [
  { pct: 50, color: "#00d9ff", label: "IA Agentique Régulée", items: ["Systèmes multi-agents", "PII Guard", "Audit chains SHA-256", "Gouvernance EU AI Act by design"] },
  { pct: 30, color: "#6b00ff", label: "Quorum Multi-LLM & LLMOps", items: ["QuorumDispatcher asyncio", "Observabilité p95/p99", "Registry prompts versionné", "Benchmark multi-provider"] },
  { pct: 20, color: "#ff00c8", label: "AI Governance & Conformité", items: ["EU AI Act Art. 9-15", "DORA · RGPD · AAOIFI", "Model cards & risk register", "Policy engine pre-LLM"] },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 px-6 max-w-5xl mx-auto">

      {/* ── Hero row ────────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
        {/* Avatar placeholder */}
        <div className="shrink-0">
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/20 via-[#6b00ff]/20 to-[#ff00c8]/20" />
            <div className="absolute inset-0 flex items-center justify-center text-7xl font-black gradient-text select-none">
              L
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="pulse-dot" />
            <span className="text-xs font-mono text-[#00ffaa]">Disponible juin 2026</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-mono text-[#00d9ff] tracking-widest uppercase mb-3">LUTECE Consulting SAS · Paris</p>
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            <span className="gradient-text">Loïc Lafhej</span>
          </h1>
          <p className="text-xl text-[#a3a3a3] mb-6">Architecte IA Senior · Président</p>
          <p className="text-white leading-relaxed mb-4 max-w-xl">
            23 ans d&apos;expérience IT. DEA Intelligence Artificielle &amp; Optimisation
            Combinatoire (Paris 13, 2003). 2,5 ans d&apos;IA agentique en production dans des
            environnements régulés.
          </p>
          <p className="text-[#a3a3a3] leading-relaxed max-w-xl">
            Je construis et opère des plateformes IA agentiques pour des clients en banque,
            assurance et infrastructures critiques. Pas de conseil théorique — j&apos;architecture,
            je code, je déploie, je mesure.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="mailto:loic.lafhej@lutece-consulting.com"
              className="px-5 py-2.5 rounded-xl bg-[#00d9ff] text-black text-sm font-bold hover:bg-white hover:scale-105 transition-all"
            >
              ✉ loic.lafhej@lutece-consulting.com
            </a>
            <a
              href="https://www.linkedin.com/in/lafhej-loic-15a79a3"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl border border-[#6b00ff]/50 text-[#a3a3a3] text-sm font-semibold hover:border-[#6b00ff] hover:text-white transition"
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </div>

      {/* ── Expertise breakdown ──────────────────────── */}
      <section className="mb-20">
        <p className="text-xs font-mono text-[#00d9ff] tracking-widest uppercase mb-3">Répartition</p>
        <h2 className="text-2xl font-bold mb-10">3 piliers d&apos;expertise</h2>

        <div className="space-y-6">
          {EXPERTISE.map((ex) => (
            <div key={ex.label} className="gradient-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{ex.label}</h3>
                <span className="text-2xl font-black" style={{ color: ex.color }}>{ex.pct}%</span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 rounded-full bg-[#262626] mb-4 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${ex.pct}%`, background: ex.color, boxShadow: `0 0 12px ${ex.color}80` }}
                />
              </div>
              <ul className="grid grid-cols-2 gap-1.5">
                {ex.items.map((item) => (
                  <li key={item} className="text-xs text-[#a3a3a3] flex items-center gap-1.5">
                    <span style={{ color: ex.color }}>›</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────── */}
      <section className="mb-20">
        <p className="text-xs font-mono text-[#6b00ff] tracking-widest uppercase mb-3">Parcours</p>
        <h2 className="text-2xl font-bold mb-10">Chronologie</h2>

        <div className="relative border-l border-[#262626] pl-8 space-y-8">
          {TIMELINE.map((item, i) => (
            <div key={i} className="relative">
              <div
                className="absolute -left-[33px] w-4 h-4 rounded-full border-2 border-[#000] flex items-center justify-center"
                style={{ background: i === TIMELINE.length - 1 ? "#00ffaa" : "#262626" }}
              >
                {i === TIMELINE.length - 1 && <span className="pulse-dot scale-50" />}
              </div>
              <div className="text-xs font-mono text-[#00d9ff] mb-1">{item.year}</div>
              <div className="text-white font-semibold">{item.label}</div>
              <div className="text-sm text-[#a3a3a3]">{item.place}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <div className="gradient-border p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Discutons de votre projet</h2>
        <p className="text-[#a3a3a3] mb-6 max-w-md mx-auto text-sm">
          TJM <strong className="text-white">850–1100€/jour</strong> selon contexte.
          Disponible à partir du <strong className="text-white">2 juin 2026</strong>.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-4 rounded-xl bg-[#00d9ff] text-black font-bold hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,217,255,0.3)]"
        >
          Me contacter →
        </Link>
      </div>

    </div>
  );
}
