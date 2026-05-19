"use client";

import { useState } from "react";
import { Mail, Phone, Linkedin, Github, MapPin, Clock, CheckCircle } from "lucide-react";

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

    // Honeypot — if filled, silently succeed
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
    <div className="pt-[72px]">

      {/* ── Header ──────────────────────────────────── */}
      <section className="section-spacing dot-grid">
        <div className="container">
          <div className="max-w-2xl animate-fade-up">
            <p className="kicker mb-3">Contact</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-[#F5F6F8]">
              Démarrons la{" "}
              <span className="gradient-text">conversation</span>
            </h1>
            <p className="text-lg text-[#B4B7C1] leading-relaxed">
              Disponible à partir du 2 juin 2026. Pour toute opportunité de mission ou question,
              décrivez votre projet — je réponds sous 24–48h.
            </p>
          </div>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────── */}
      <section className="section-spacing border-t border-white/[0.06]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 max-w-5xl">

            {/* Form */}
            <div>
              {submitted ? (
                <div className="card rounded-2xl p-10 text-center animate-fade-up">
                  <div className="w-14 h-14 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/25 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={28} className="text-[#4ADE80]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#F5F6F8] mb-2">Message reçu</h2>
                  <p className="text-[#B4B7C1]">Je vous réponds sous 24–48h.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 animate-fade-up">

                  {/* Honeypot — hidden from users */}
                  <input
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 1, height: 1 }}
                    aria-hidden="true"
                  />

                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#B4B7C1] mb-2" htmlFor="name">
                        Nom complet <span className="text-[#F87171]">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        placeholder="Prénom Nom"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#B4B7C1] mb-2" htmlFor="email">
                        Email professionnel <span className="text-[#F87171]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="vous@societe.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company + Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#B4B7C1] mb-2" htmlFor="company">
                        Société
                      </label>
                      <input
                        id="company"
                        name="company"
                        placeholder="Votre entreprise"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#B4B7C1] mb-2" htmlFor="role">
                        Fonction
                      </label>
                      <input
                        id="role"
                        name="role"
                        placeholder="CTO, DSI, VP Engineering…"
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Row 3: Subject */}
                  <div>
                    <label className="block text-sm font-medium text-[#B4B7C1] mb-2" htmlFor="subject">
                      Sujet de la demande <span className="text-[#F87171]">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      defaultValue=""
                      className="form-input"
                    >
                      <option value="" disabled>Sélectionner…</option>
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4: Budget + Start date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#B4B7C1] mb-2" htmlFor="budget">
                        Budget estimé
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        defaultValue=""
                        className="form-input"
                      >
                        <option value="">Non défini</option>
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#B4B7C1] mb-2" htmlFor="start_date">
                        Démarrage souhaité
                      </label>
                      <input
                        id="start_date"
                        name="start_date"
                        type="date"
                        min="2026-06-02"
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-[#B4B7C1] mb-2" htmlFor="message">
                      Description du projet <span className="text-[#F87171]">*</span>
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
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="rgpd"
                      required
                      className="mt-0.5 shrink-0 accent-[#7C5CFF]"
                    />
                    <span className="text-xs text-[#7A7E8C] leading-relaxed">
                      J&apos;accepte que ces informations soient utilisées pour traiter ma demande.
                      Elles ne seront pas partagées avec des tiers. Conformément au RGPD, vous
                      pouvez exercer vos droits à{" "}
                      <a
                        href="mailto:loic.lafhej@lutece-consulting.com"
                        className="text-[#4DD0FF] hover:underline"
                      >
                        loic.lafhej@lutece-consulting.com
                      </a>
                      .{" "}
                      <span className="text-[#F87171]">*</span>
                    </span>
                  </label>

                  {error && (
                    <p className="text-sm text-[#F87171] p-3 rounded-lg bg-[#F87171]/10 border border-[#F87171]/20">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-lg w-full"
                  >
                    {loading ? "Envoi en cours…" : "Envoyer le message →"}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 animate-fade-up delay-2">

              {/* Availability card */}
              <div className="card rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="pulse-dot" aria-hidden="true" />
                  <span className="text-sm font-mono text-[#4ADE80]">Disponible · juin 2026</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[#7A7E8C]">TJM</span>
                    <span className="text-[#F5F6F8] font-mono font-semibold">850–1100 €/j</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#7A7E8C]">Mode</span>
                    <span className="text-[#F5F6F8] font-mono">Paris / Hybride</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#7A7E8C]">Contrat</span>
                    <span className="text-[#F5F6F8] font-mono">SAS · Freelance</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#7A7E8C]">Réponse</span>
                    <span className="text-[#F5F6F8] font-mono flex items-center gap-1">
                      <Clock size={12} /> 24–48h
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact details */}
              <div className="card rounded-2xl p-5 space-y-4">
                <p className="text-xs font-mono text-[#5A5E6B] uppercase tracking-widest">
                  Contact direct
                </p>
                <a
                  href="mailto:loic.lafhej@lutece-consulting.com"
                  className="flex items-start gap-3 group"
                >
                  <Mail size={16} className="text-[#4DD0FF] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#B4B7C1] group-hover:text-[#F5F6F8] transition-colors break-all">
                    loic.lafhej@lutece-consulting.com
                  </span>
                </a>
                <a
                  href="tel:+33652561133"
                  className="flex items-center gap-3 group"
                >
                  <Phone size={16} className="text-[#4DD0FF] shrink-0" />
                  <span className="text-sm text-[#B4B7C1] group-hover:text-[#F5F6F8] transition-colors font-mono">
                    +33 6 52 56 11 33
                  </span>
                </a>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#4DD0FF] shrink-0" />
                  <span className="text-sm text-[#B4B7C1]">Paris, Île-de-France</span>
                </div>
              </div>

              {/* External links */}
              <div className="card rounded-2xl p-5 space-y-3">
                <p className="text-xs font-mono text-[#5A5E6B] uppercase tracking-widest mb-2">
                  Profils
                </p>
                <a
                  href="https://www.linkedin.com/in/lafhej-loic-15a79a3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <Linkedin size={16} className="text-[#7C5CFF] shrink-0" />
                  <span className="text-sm text-[#B4B7C1] group-hover:text-[#F5F6F8] transition-colors">
                    linkedin.com/in/lafhej-loic
                  </span>
                </a>
                <a
                  href="https://github.com/llafhej1976"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <Github size={16} className="text-[#7C5CFF] shrink-0" />
                  <span className="text-sm text-[#B4B7C1] group-hover:text-[#F5F6F8] transition-colors">
                    github.com/llafhej1976
                  </span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
