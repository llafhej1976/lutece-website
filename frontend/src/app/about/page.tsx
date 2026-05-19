import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos — Loïc Lafhej · LUTECE Consulting",
  description: "Architecte IA Senior, 23 ans d'expérience, DEA IA Paris 13. Spécialiste IA agentique régulée.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        <span className="gradient-text">Loïc Lafhej</span>
      </h1>
      <p className="text-lg text-[#00d9ff] font-mono mb-12">
        Architecte IA Senior · Président LUTECE Consulting SAS
      </p>

      <div className="space-y-8 text-[#a3a3a3] leading-relaxed">
        <p className="text-white text-lg">
          23 ans d&apos;expérience IT. DEA Intelligence Artificielle &amp; Optimisation
          Combinatoire (Université Paris 13, 2003). 2,5 ans d&apos;IA agentique en production
          dans des environnements régulés.
        </p>

        <p>
          Je construis et opère des plateformes IA agentiques pour des clients en banque,
          assurance, et infrastructures critiques. Pas de conseil théorique : j&apos;architecture,
          je code, je déploie, je mesure.
        </p>

        <div className="glass-card rounded-xl p-6">
          <h2 className="text-white font-semibold text-lg mb-4">3 piliers d&apos;expertise</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <span className="text-[#00d9ff] font-semibold">IA Agentique Régulée (50%)</span>
              {" "}— Architecture de systèmes agentiques pour banque, assurance, santé.
              Gouvernance EU AI Act, DORA, RGPD by design. PII Guard, audit chains.
            </li>
            <li>
              <span className="text-[#6b00ff] font-semibold">Quorum Multi-LLM &amp; LLMOps (30%)</span>
              {" "}— Orchestration quorum N-LLM spécialisé par rôle. Observabilité (latence p95/p99,
              coût, qualité). Versioning prompts, frameworks d&apos;évaluation.
            </li>
            <li>
              <span className="text-[#ff00c8] font-semibold">AI Governance &amp; Conformité (20%)</span>
              {" "}— EU AI Act 2026 Articles 9-15. DORA, AAOIFI, MiCA. Model cards,
              AI risk register, audit chain SHA-256.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-white font-semibold text-lg mb-4">Disponibilité</h2>
          <p>
            Disponible à partir du <strong className="text-white">2 juin 2026</strong>.
            Basé à Paris / Île-de-France. Mode hybride accepté.
            TJM cible : <strong className="text-white">850–1100€/jour</strong> selon contexte.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:loic.lafhej@lutece-consulting.com"
            className="px-6 py-3 rounded-lg bg-[#00d9ff] text-black font-semibold text-center hover:bg-[#00d9ff]/90 transition"
          >
            loic.lafhej@lutece-consulting.com
          </a>
          <a
            href="tel:+33652561133"
            className="px-6 py-3 rounded-lg border border-[#00d9ff]/40 text-[#00d9ff] text-center hover:border-[#00d9ff] transition"
          >
            +33 6 52 56 11 33
          </a>
        </div>
      </div>
    </div>
  );
}
