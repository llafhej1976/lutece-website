import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00d9ff]/5 via-transparent to-transparent pointer-events-none" />

        <p className="text-sm font-mono text-[#00d9ff] mb-4 tracking-widest uppercase">
          LUTECE Consulting SAS — Paris
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-4xl">
          <span className="gradient-text">L&apos;architecte</span> qui met de l&apos;IA agentique
          <br />en production dans des environnements régulés.
        </h1>

        <p className="text-lg md:text-xl text-[#a3a3a3] mb-4 max-w-2xl">
          23 ans d&apos;expérience IT · DEA IA &amp; Optimisation Combinatoire (Paris 13, 2003)
          · 2,5 ans d&apos;IA agentique en production
        </p>

        <p className="text-base text-[#a3a3a3] mb-10">
          Disponible à partir du <strong className="text-white">2 juin 2026</strong> ·
          TJM <strong className="text-white">850–1100€</strong> · Paris / Hybride
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/services"
            className="px-8 py-3 rounded-lg bg-[#00d9ff] text-black font-semibold hover:bg-[#00d9ff]/90 transition"
          >
            Voir mes services
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-lg border border-[#00d9ff]/40 text-[#00d9ff] hover:border-[#00d9ff] transition"
          >
            Me contacter
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-t border-[#262626]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "23 ans", label: "Expérience IT" },
            { value: "2,5 ans", label: "IA agentique prod" },
            { value: "3 ans", label: "IA Générative régulée" },
            { value: "850–1100€", label: "TJM cible" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-[#a3a3a3]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">3 piliers d&apos;expertise</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                title: "IA Agentique Régulée",
                desc: "Architectures agentiques pour banque, assurance, santé. Patterns auditabilité, gouvernance agents, PII Guard.",
                color: "#00d9ff",
              },
              {
                number: "02",
                title: "Quorum Multi-LLM & LLMOps",
                desc: "Architecture quorum N-LLM spécialisé. Observabilité IA (latence, coût, qualité). LLMOps custom.",
                color: "#6b00ff",
              },
              {
                number: "03",
                title: "AI Governance & Conformité",
                desc: "EU AI Act 2026 (Art. 9-15), DORA, AAOIFI, MiCA. Model cards, AI risk register, audit chain.",
                color: "#ff00c8",
              },
            ].map((pillar) => (
              <div key={pillar.number} className="glass-card rounded-xl p-6">
                <div className="text-4xl font-mono font-bold mb-4" style={{ color: pillar.color }}>
                  {pillar.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
                <p className="text-[#a3a3a3] text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
