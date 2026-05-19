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
    default: "LUTECE Consulting — Architecte IA Senior",
    template: "%s — LUTECE Consulting",
  },
  description:
    "Loïc Lafhej — Architecte IA Senior, LUTECE Consulting SAS. Spécialiste IA agentique en environnements régulés, LLMOps, EU AI Act. 23 ans d'expérience IT.",
  keywords: [
    "architecte IA",
    "agentic AI",
    "LLMOps",
    "EU AI Act",
    "LUTECE Consulting",
    "Loïc Lafhej",
  ],
  authors: [{ name: "Loïc Lafhej", url: SITE_URL }],
  creator: "Loïc Lafhej",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "LUTECE Consulting",
    title: "LUTECE Consulting — Architecte IA Senior",
    description:
      "Loïc Lafhej — Architecte IA agentique pour environnements régulés. LLMOps, EU AI Act, Multi-LLM. Disponible juin 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUTECE Consulting — Architecte IA Senior",
    description:
      "Loïc Lafhej — IA agentique en production pour banque, assurance, santé. 23 ans IT, DEA IA Paris 13.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
