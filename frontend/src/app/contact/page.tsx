"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
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
      setError("Une erreur est survenue. Contactez directement loic.lafhej@lutece-consulting.com");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-24 pb-24 px-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Contact</h1>
      <p className="text-[#a3a3a3] mb-12">
        Disponible à partir du 2 juin 2026. Pour toute opportunité de mission ou question,
        envoyez-moi un message.
      </p>

      {submitted ? (
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">✓</div>
          <h2 className="text-xl font-semibold mb-2">Message reçu</h2>
          <p className="text-[#a3a3a3]">Je vous réponds sous 24-48h.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Nom *
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#262626] text-white focus:border-[#00d9ff] focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#262626] text-white focus:border-[#00d9ff] focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="company">
              Société
            </label>
            <input
              id="company"
              name="company"
              className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#262626] text-white focus:border-[#00d9ff] focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="message">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#262626] text-white focus:border-[#00d9ff] focus:outline-none transition resize-none"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-lg bg-[#00d9ff] text-black font-semibold hover:bg-[#00d9ff]/90 transition disabled:opacity-50"
          >
            {loading ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      )}

      <div className="mt-12 pt-8 border-t border-[#262626] text-sm text-[#a3a3a3] space-y-2">
        <p>
          <span className="text-white">Email :</span>{" "}
          <a href="mailto:loic.lafhej@lutece-consulting.com" className="text-[#00d9ff]">
            loic.lafhej@lutece-consulting.com
          </a>
        </p>
        <p>
          <span className="text-white">Téléphone :</span> +33 6 52 56 11 33
        </p>
        <p>
          <span className="text-white">LinkedIn :</span>{" "}
          <a
            href="https://www.linkedin.com/in/lafhej-loic-15a79a3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00d9ff]"
          >
            linkedin.com/in/lafhej-loic-15a79a3
          </a>
        </p>
      </div>
    </div>
  );
}
