type AsciiSeparatorProps = {
  char?: string;
  label?: string;
  className?: string;
};

export default function AsciiSeparator({
  char = "─",
  label,
  className = "",
}: AsciiSeparatorProps) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-xs ${className}`}
      style={{ color: "var(--border-bright)" }}
      aria-hidden="true"
    >
      <span className="flex-1 overflow-hidden leading-none">{char.repeat(40)}</span>
      {label && (
        <>
          <span style={{ color: "var(--text-muted)" }}>{label}</span>
          <span className="flex-1 overflow-hidden leading-none">{char.repeat(40)}</span>
        </>
      )}
    </div>
  );
}
