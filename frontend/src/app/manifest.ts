import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LUTECE Consulting — Architecte IA Agentique Paris",
    short_name: "LUTECE Consulting",
    description:
      "Loïc Lafhej — Architecte IA Agentique Senior à Paris. LLMOps, EU AI Act, Multi-LLM.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#00d9ff",
    icons: [
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
