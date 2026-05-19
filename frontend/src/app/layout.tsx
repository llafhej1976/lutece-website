import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "LUTECE Consulting — Architecte IA Senior",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
