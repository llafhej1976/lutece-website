"use client";

import { useState } from "react";
import { Mail, Phone, Linkedin, Github, MapPin, Clock } from "lucide-react";
import CommandButton from "@/components/ui/terminal/CommandButton";
import TerminalBox from "@/components/ui/terminal/TerminalBox";

const SUBJECT_OPTIONS = [
  "Architecture IA agentique",
  "LLMOps & Quorum Multi-LLM",
  "Conformité EU AI Act / DORA",
  "Audit système IA existant",
  "Autre / Question générale",
];

const BUDGET_OPTIONS = [
  "< 20k€",
  "20k – 50k€",
  "50k – 150k€",
  "> 150k€",
  "À définir ensemble",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;

    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value;
    if (honeypot) {
      setSubmitted(true);
      setLoading(false);
      return;
    }

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: [
        `Fonction: ${(form.elements.namedItem("role") as HTMLInputElement).value}`,
        `Sujet: ${(form.elements.namedItem("subject") as HTMLSelectElement).value}`,
        `Budget: ${(form.elements.namedItem("budget") as HTMLSelectElement).value}`,
        `Démarrage souhaité: ${(form.elements.namedItem("start_date") as HTMLInputElement).value}`,
        `---`,
        (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      ]
        .filter(Boolean)
        .join("\n"),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/contacts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error("Erreur réseau");
      setSubmitted(true);
    } catch {
      setError(
        "Une erreur est survenue. Contactez directement loic.lafhej@lutece-consulting.com"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-[56px]">

      {/* ── Header ──────────────────────────────────── */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-2xl animate-fade-up">
            <p className="kicker mb-3">Contact</p>
            <h1 className="font-black mb-6" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", color: "var(--text-primary)" }}>
              Démarrons la{" "}
              <span className="gradient-text">conversation</span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Disponible à partir du 2 juin 2026. Pour toute opportunité de mission ou question,
              décrivez votre projet — je réponds sous 24–48h.
            </p>
          </div>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────── */}
      <section className="section-spacing border-t" style={{ borderColor: "var(--border-faint)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 max-w-5xl">

            {/* Form */}
            <div>
              {submitted ? (
                <div
                  className="p-10 text-center animate-fade-up border"
                  style={{ borderColor: "var(--accent-success)", background: "var(--bg-elevated)" }}
                >
                  <div
                    className="w-12 h-12 border flex items-center justify-center mx-auto mb-5"
                    style={{ borderColor: "var(--accent-success)", background: "rgba(74,222,128,0.06)" }}
                  >
                    <span className="font-mono font-black text-lg" style={{ color: "var(--accent-success)" }}>✓</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Message reçu</h2>
                  <p style={{ color: "var(--text-secondary)" }}>Je vous réponds sous 24–48h.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 animate-fade-up">

                  {/* Honeypot */}
                  <input
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 1, height: 1 }}
                    aria-hidden="true"
                  />

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }} htmlFor="name">
                        Nom complet <span style={{ color: "#F87171" }}>*</span>
                      </label>
                      <input id="name" name="name" required placeholder="Prénom Nom" className="form-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }} htmlFor="email">
                        Email professionnel <span style={{ color: "#F87171" }}>*</span>
                      </label>
                      <input id="email" name="email" type="email" required placeholder="vous@societe.com" className="form-input" />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }} htmlFor="company">
                        Société
                      </label>
                      <input id="company" name="company" placeholder="Votre entreprise" className="form-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }} htmlFor="role">
                        Fonction
                      </label>
                      <input id="role" name="role" placeholder="CTO, DSI, VP Engineering…" className="form-input" />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }} htmlFor="subject">
                      Sujet de la demande <span style={{ color: "#F87171" }}>*</span>
                    </label>
                    <select id="subject" name="subject" required defaultValue="" className="form-input">
                      <option value="" disabled>Sélectionner…</option>
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }} htmlFor="budget">
                        Budget estimé
                      </label>
                      <select id="budget" name="budget" defaultValue="" className="form-input">
                        <option value="">Non défini</option>
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }} htmlFor="start_date">
                        Démarrage souhaité
                      </label>
                      <input id="start_date" name="start_date" type="date" min="2026-06-02" className="form-input" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }} htmlFor="message">
                      Description du projet <span style={{ color: "#F87171" }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Contexte, objectifs, contraintes techniques, stack existante…"
                      className="form-input resize-none"
                    />
                  </div>

                  {/* RGPD */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rgpd"
                      required
                      className="mt-0.5 shrink-0"
                      style={{ accentColor: "var(--accent-violet)" }}
                    />
                    <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      J&apos;accepte que ces informations soient utilisées pour traiter ma demande.
                      Elles ne seront pas partagées avec des tiers. Conformément au RGPD, vous
                      pouvez exercer vos droits à{" "}
                      <a
                        href="mailto:loic.lafhej@lutece-consulting.com"
                        style={{ color: "var(--accent-cyan)" }}
                      >
                        loic.lafhej@lutece-consulting.com
                      </a>
                      .{" "}
                      <span style={{ color: "#F87171" }}>*</span>
                    </span>
                  </label>

                  {error && (
                    <p
                      className="text-sm p-3 border"
                      style={{ color: "#F87171", background: "rgba(248,113,113,0.06)", borderColor: "rgba(248,113,113,0.25)" }}
                    >
                      {error}
                    </p>
                  )}

                  <CommandButton
                    as="button"
                    variant="primary"
                    size="lg"
                    className={`w-full ${loading ? "opacity-60 pointer-events-none" : ""}`}
                  >
                    {loading ? "Envoi en cours…" : "Envoyer le message →"}
                  </CommandButton>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-4 animate-fade-up delay-2">

              {/* Availability */}
              <TerminalBox title="status" accent>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="pulse-dot" aria-hidden="true" />
                    <span className="font-mono text-xs" style={{ color: "var(--accent-success)" }}>Disponible · juin 2026</span>
                  </div>
                  <div className="space-y-2.5 font-mono text-xs">
                    {[
                      ["TJM", "850–1100 €/j"],
                      ["Mode", "Paris / Hybride"],
                      ["Contrat", "SAS · Freelance"],
                      ["Réponse", "24–48h"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center">
                        <span style={{ color: "var(--text-muted)" }}>{k}</span>
                        <span style={{ color: "var(--text-primary)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TerminalBox>

              {/* Contact details */}
              <TerminalBox title="contact">
                <div className="p-5 space-y-3.5">
                  <a href="mailto:loic.lafhej@lutece-consulting.com" className="flex items-start gap-3 group">
                    <Mail size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent-cyan)" }} />
                    <span className="text-xs leading-relaxed break-all transition-colors" style={{ color: "var(--text-secondary)" }}>
                      loic.lafhej@lutece-consulting.com
                    </span>
                  </a>
                  <a href="tel:+33652561133" className="flex items-center gap-3 group">
                    <Phone size={14} className="shrink-0" style={{ color: "var(--accent-cyan)" }} />
                    <span className="font-mono text-xs transition-colors" style={{ color: "var(--text-secondary)" }}>
                      +33 6 52 56 11 33
                    </span>
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="shrink-0" style={{ color: "var(--accent-cyan)" }} />
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Paris, Île-de-France</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={14} className="shrink-0" style={{ color: "var(--accent-cyan)" }} />
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Réponse sous 24–48h</span>
                  </div>
                </div>
              </TerminalBox>

              {/* Profiles */}
              <TerminalBox title="profiles">
                <div className="p-5 space-y-3">
                  <a
                    href="https://www.linkedin.com/in/lafhej-loic-15a79a3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <Linkedin size={14} className="shrink-0" style={{ color: "var(--accent-violet)" }} />
                    <span className="text-xs transition-colors" style={{ color: "var(--text-secondary)" }}>
                      linkedin.com/in/lafhej-loic
                    </span>
                  </a>
                  <a
                    href="https://github.com/llafhej1976"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <Github size={14} className="shrink-0" style={{ color: "var(--accent-violet)" }} />
                    <span className="text-xs transition-colors" style={{ color: "var(--text-secondary)" }}>
                      github.com/llafhej1976
                    </span>
                  </a>
                </div>
              </TerminalBox>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
