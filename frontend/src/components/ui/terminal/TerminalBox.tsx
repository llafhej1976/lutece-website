import type { ReactNode } from "react";

type TerminalBoxProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  accent?: boolean;
};

export default function TerminalBox({
  title,
  children,
  className = "",
  accent = false,
}: TerminalBoxProps) {
  const borderColor = accent ? "var(--border-accent)" : "var(--border-default)";

  return (
    <div
      className={`relative ${className}`}
      style={{ border: `1px solid ${borderColor}`, background: "var(--bg-elevated)" }}
    >
      {title && (
        <span
          className="absolute -top-[0.6em] left-4 px-2 font-mono text-[0.6875rem] font-medium tracking-widest uppercase"
          style={{
            background: "var(--bg-base)",
            color: accent ? "var(--accent-violet)" : "var(--text-muted)",
          }}
        >
          {title}
        </span>
      )}
      {children}
    </div>
  );
}
