import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const SITE_URL = "https://lutece-consulting.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Loïc Lafhej — Architecte IA Agentique Senior | LUTECE Consulting Paris",
    template: "%s | LUTECE Consulting — Architecte IA Paris",
  },
  description:
    "Loïc Lafhej, Architecte IA Agentique Senior à Paris. LUTECE Consulting SAS. Spécialiste systèmes multi-agents, LLMOps, conformité EU AI Act, DORA. DEA IA Paris 13. 23 ans d'expérience IT. Disponible juin 2026. TJM 850–1100€.",
  keywords: [
    "architecte IA Paris",
    "architecte IA agentique",
    "consultant IA agentique",
    "LLMOps consultant Paris",
    "EU AI Act conformité",
    "systèmes multi-agents",
    "LUTECE Consulting",
    "Loïc Lafhej",
    "IA générative régulée",
    "conformité DORA IA",
    "architecte IA senior freelance",
    "consultant intelligence artificielle Paris",
    "agentic AI architect",
    "multi-LLM architecture",
  ],
  authors: [{ name: "Loïc Lafhej", url: SITE_URL }],
  creator: "Loïc Lafhej",
  publisher: "LUTECE Consulting SAS",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "LUTECE Consulting",
    title: "Loïc Lafhej — Architecte IA Agentique Senior | Paris",
    description:
      "Architecte IA agentique pour environnements régulés (banque, assurance, santé). LLMOps, EU AI Act Art. 9-15, Multi-LLM. Disponible juin 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loïc Lafhej — Architecte IA Agentique | LUTECE Consulting",
    description:
      "IA agentique en production, LLMOps, EU AI Act. 23 ans IT, DEA IA Paris 13. Disponible juin 2026.",
    creator: "@lutece_consulting",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: "xgZq4y5wFOyM62xflloHvE40SZca1NkR62CN4XLQNTs",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Loïc Lafhej",
      givenName: "Loïc",
      familyName: "Lafhej",
      jobTitle: "Architecte IA Agentique Senior",
      description:
        "Architecte IA Agentique Senior spécialisé dans les systèmes multi-agents en environnements régulés, LLMOps, conformité EU AI Act. 23 ans d'expérience IT, DEA IA Paris 13.",
      url: SITE_URL,
      email: "loic.lafhej@lutece-consulting.com",
      telephone: "+33652561133",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressRegion: "Île-de-France",
        addressCountry: "FR",
      },
      sameAs: [
        "https://www.linkedin.com/in/lafhej-loic-15a79a3",
        "https://github.com/llafhej1976",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Université Paris 13",
        description: "DEA Intelligence Artificielle & Optimisation Combinatoire — 2003",
      },
      knowsAbout: [
        "Agentic AI", "Multi-LLM Architecture", "LLMOps", "EU AI Act",
        "DORA", "RGPD", "Python", "FastAPI", "Anthropic Claude",
        "Multi-agent systems", "AI Governance", "PII Guard",
      ],
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: "LUTECE Consulting SAS",
      alternateName: "LUTECE Consulting",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      description:
        "Cabinet de conseil spécialisé en architecture IA agentique pour environnements régulés. LLMOps, conformité EU AI Act, systèmes multi-agents.",
      founder: { "@id": `${SITE_URL}/#person` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressRegion: "Île-de-France",
        addressCountry: "FR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "loic.lafhej@lutece-consulting.com",
        telephone: "+33652561133",
        contactType: "customer service",
        availableLanguage: ["French", "English"],
      },
      areaServed: ["FR", "EU"],
      serviceType: [
        "Architecture IA Agentique",
        "LLMOps",
        "Conformité EU AI Act",
        "Conseil Intelligence Artificielle",
      ],
      sameAs: ["https://github.com/llafhej1976"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "LUTECE Consulting — Architecte IA Senior Paris",
      description: "Site officiel de Loïc Lafhej, Architecte IA Agentique Senior à Paris.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
