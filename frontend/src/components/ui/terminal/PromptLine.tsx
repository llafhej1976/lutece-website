type PromptLineProps = {
  command: string;
  prefix?: string;
  className?: string;
};

export default function PromptLine({
  command,
  prefix = "$",
  className = "",
}: PromptLineProps) {
  return (
    <div
      className={`flex items-baseline gap-2 font-mono text-sm leading-relaxed ${className}`}
      aria-label={`Command: ${command}`}
    >
      <span
        style={{ color: "var(--accent-cyan)", userSelect: "none" }}
        aria-hidden="true"
      >
        {prefix}
      </span>
      <span style={{ color: "var(--text-secondary)" }}>{command}</span>
    </div>
  );
}
