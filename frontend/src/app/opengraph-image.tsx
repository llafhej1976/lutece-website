import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top brand row */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 48 }}>
          <div
            style={{
              background: "linear-gradient(135deg, #00d9ff 0%, #6b00ff 50%, #ff00c8 100%)",
              width: 64,
              height: 64,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 20,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 20 20" fill="none">
              <path d="M4 3h4v11h8v4H4V3z" fill="white" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#fafafa", fontSize: 20, fontWeight: 700, letterSpacing: 3 }}>
              LUTECE Consulting SAS
            </span>
            <span style={{ color: "#a3a3a3", fontSize: 14, letterSpacing: 2, marginTop: 4 }}>
              PARIS · IA AGENTIQUE · ENVIRONNEMENTS RÉGULÉS
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          style={{
            color: "#fafafa",
            fontSize: 54,
            fontWeight: 900,
            lineHeight: 1.15,
            margin: 0,
            marginBottom: 28,
            maxWidth: 950,
          }}
        >
          L&apos;architecte qui met de l&apos;IA agentique
          <br />
          en production dans des environnements régulés.
        </h1>

        {/* Sub */}
        <p style={{ color: "#a3a3a3", fontSize: 22, margin: 0, marginBottom: 48 }}>
          23 ans d&apos;expérience IT · DEA IA Paris 13 (2003) · TJM 850–1100 €/j
        </p>

        {/* Tags */}
        <div style={{ display: "flex", gap: 12 }}>
          {["IA Agentique", "LLMOps", "EU AI Act", "Multi-LLM"].map((tag) => (
            <span
              key={tag}
              style={{
                border: "1px solid rgba(0,217,255,0.4)",
                color: "#00d9ff",
                borderRadius: 6,
                padding: "6px 16px",
                fontSize: 16,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    size
  );
}
