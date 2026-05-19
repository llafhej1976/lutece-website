import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

async function getRecentArticles() {
  try {
    const res = await fetch(`${API_BASE}/api/articles?per_page=3`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const articles = await getRecentArticles();
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

      {/* Media / Publications */}
      <section className="py-24 px-6 border-t border-[#262626]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl font-bold">Publications</h2>
            <Link href="/blog" className="text-sm text-[#00d9ff] hover:underline">
              Voir tout →
            </Link>
          </div>

          {articles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article: { slug: string; pillar: number; title_fr: string; excerpt_fr: string; reading_time_minutes: number }) => {
                const pillarColor = article.pillar === 1 ? "#00d9ff" : article.pillar === 2 ? "#6b00ff" : "#ff00c8";
                return (
                  <Link key={article.slug} href={`/blog/${article.slug}`} className="glass-card rounded-xl p-6 hover:border-white/20 transition group block">
                    <div className="w-2 h-2 rounded-full mb-4" style={{ backgroundColor: pillarColor }} />
                    <h3 className="font-semibold mb-2 group-hover:text-[#00d9ff] transition line-clamp-2">
                      {article.title_fr}
                    </h3>
                    <p className="text-sm text-[#a3a3a3] line-clamp-3 mb-4">{article.excerpt_fr}</p>
                    <span className="text-xs text-[#a3a3a3]">{article.reading_time_minutes} min de lecture</span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="glass-card rounded-xl p-8 text-center text-[#a3a3a3]">
              <p className="mb-2 text-white font-semibold">Articles à venir</p>
              <p className="text-sm">Architectures agentiques, LLMOps, EU AI Act — suivez sur LinkedIn pour les publications.</p>
              <a
                href="https://www.linkedin.com/in/lafhej-loic-15a79a3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-[#00d9ff] hover:underline"
              >
                LinkedIn →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Connect */}
      <section className="py-24 px-6 border-t border-[#262626]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Me contacter</h2>
          <p className="text-[#a3a3a3] text-center mb-12 max-w-xl mx-auto">
            Disponible à partir du <strong className="text-white">2 juin 2026</strong> pour des missions d&apos;architecture IA en environnements régulés.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Email",
                value: "loic.lafhej@lutece-consulting.com",
                href: "mailto:loic.lafhej@lutece-consulting.com",
                color: "#00d9ff",
                icon: "✉",
              },
              {
                label: "Téléphone",
                value: "+33 6 52 56 11 33",
                href: "tel:+33652561133",
                color: "#00ffaa",
                icon: "☎",
              },
              {
                label: "LinkedIn",
                value: "lafhej-loic-15a79a3",
                href: "https://www.linkedin.com/in/lafhej-loic-15a79a3",
                color: "#6b00ff",
                icon: "in",
              },
              {
                label: "GitHub",
                value: "llafhej1976",
                href: "https://github.com/llafhej1976",
                color: "#ff00c8",
                icon: "⌥",
              },
            ].map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass-card rounded-xl p-6 hover:border-white/20 transition group"
              >
                <div className="text-2xl font-bold mb-3" style={{ color: channel.color }}>
                  {channel.icon}
                </div>
                <div className="text-xs text-[#a3a3a3] mb-1">{channel.label}</div>
                <div className="text-sm font-medium text-white group-hover:text-[#00d9ff] transition break-all">
                  {channel.value}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-lg bg-[#00d9ff] text-black font-semibold hover:bg-[#00d9ff]/90 transition"
            >
              Envoyer un message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
