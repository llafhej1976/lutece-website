export default function BlinkCursor({ className = "" }: { className?: string }) {
  return (
    <span
      className={`cursor-blink inline-block w-[0.55em] h-[1.1em] align-text-bottom ${className}`}
      style={{ background: "var(--accent-cyan)" }}
      aria-hidden="true"
    />
  );
}
