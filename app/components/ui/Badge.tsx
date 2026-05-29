import React from "react";

type BadgeVariant = "novo" | "desconto" | "hot" | "popular" | "emAlta";

interface BadgeProps {
  variant?: BadgeVariant;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

const variantMap: Record<BadgeVariant, { bg: string; color: string; default: string }> = {
  novo:     { bg: "hsl(152,51%,88%)", color: "hsl(152,51%,30%)", default: "Novo" },
  desconto: { bg: "var(--salmon-pink)", color: "var(--white)", default: "Sale" },
  hot:      { bg: "var(--bittersweet)", color: "var(--white)", default: "Hot" },
  popular:  { bg: "hsl(353,100%,92%)", color: "var(--salmon-pink)", default: "Popular" },
  emAlta:   { bg: "hsl(29,90%,88%)", color: "hsl(29,70%,35%)", default: "Em Alta" },
};

export function Badge({ variant = "novo", label, className = "", style }: BadgeProps) {
  const v = variantMap[variant];
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        background: v.bg,
        color: v.color,
        fontSize: 10,
        fontWeight: 700,
        padding: "3px 9px",
        borderRadius: 20,
        letterSpacing: "0.3px",
        lineHeight: 1.5,
        fontFamily: "var(--font-poppins)",
        ...style,
      }}
    >
      {label ?? v.default}
    </span>
  );
}
