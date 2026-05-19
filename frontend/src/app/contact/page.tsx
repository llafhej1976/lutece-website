import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Loïc Lafhej, Architecte IA Agentique",
  description:
    "Contactez Loïc Lafhej, Architecte IA Agentique Senior à Paris. Disponible juin 2026. TJM 850–1100 €/j. Paris / hybride. LUTECE Consulting SAS.",
  alternates: { canonical: "https://lutece-consulting.com/contact" },
  openGraph: {
    title: "Contact | LUTECE Consulting — Architecte IA Paris",
    description:
      "Discutons de votre projet IA agentique. Disponible juin 2026. TJM 850–1100 €/j.",
    url: "https://lutece-consulting.com/contact",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
