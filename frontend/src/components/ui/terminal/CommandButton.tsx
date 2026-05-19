import type { ReactNode } from "react";

type CommandButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "md" | "lg";
  as?: "a" | "button";
};

export default function CommandButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  size = "md",
  as,
}: CommandButtonProps) {
  const padding = size === "lg" ? "13px 28px" : "10px 20px";
  const fontSize = size === "lg" ? "0.8125rem" : "0.75rem";

  const style =
    variant === "primary"
      ? {
          border: "1px solid var(--accent-violet)",
          color: "var(--accent-violet)",
          background: "transparent",
        }
      : {
          border: "1px solid var(--border-default)",
          color: "var(--text-secondary)",
          background: "transparent",
        };

  const hoverClass =
    variant === "primary"
      ? "hover:bg-[rgba(167,139,250,0.08)] hover:shadow-[0_0_20px_rgba(167,139,250,0.2)]"
      : "hover:border-[var(--border-bright)] hover:text-[var(--text-primary)]";

  const baseClass = [
    "inline-flex items-center justify-center gap-2",
    "font-mono font-semibold tracking-[0.08em] uppercase",
    "transition-all duration-150 cursor-pointer no-underline whitespace-nowrap",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-cyan)] focus-visible:outline-offset-2",
    hoverClass,
    className,
  ].join(" ");

  const inlineStyle = { ...style, padding, fontSize, borderRadius: "0px" };

  const Tag = as ?? (href ? "a" : "button");

  return (
    <Tag
      href={href as string}
      onClick={onClick}
      className={baseClass}
      style={inlineStyle}
    >
      {children}
    </Tag>
  );
}
