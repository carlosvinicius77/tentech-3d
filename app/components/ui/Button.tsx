"use client";
import React from "react";

type Variant = "primary" | "dark" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: `
    background: var(--salmon-pink);
    color: var(--white);
    border: 2px solid var(--salmon-pink);
  `,
  dark: `
    background: var(--eerie-black);
    color: var(--white);
    border: 2px solid var(--eerie-black);
  `,
  outline: `
    background: transparent;
    color: var(--salmon-pink);
    border: 2px solid var(--salmon-pink);
  `,
  ghost: `
    background: transparent;
    color: var(--salmon-pink);
    border: 2px solid transparent;
  `,
  danger: `
    background: var(--bittersweet);
    color: var(--white);
    border: 2px solid var(--bittersweet);
  `,
};

const sizeStyles: Record<Size, string> = {
  sm: "height:32px; padding:0 12px; font-size:12px;",
  md: "height:40px; padding:0 18px; font-size:13px;",
  lg: "height:48px; padding:0 24px; font-size:14px;",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <>
      <style>{`
        .ui-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 8px;
          font-family: var(--font-poppins);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
          text-decoration: none;
          outline: none;
          position: relative;
          line-height: 1;
        }
        .ui-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
        .ui-btn:active:not(:disabled) { transform: translateY(0); }
        .ui-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; box-shadow: none; }
        .ui-btn-primary:hover:not(:disabled) { filter: brightness(0.88); }
        .ui-btn-dark:hover:not(:disabled) { background: var(--onyx) !important; border-color: var(--onyx) !important; }
        .ui-btn-outline:hover:not(:disabled) { background: hsl(353,100%,95%) !important; }
        .ui-btn-ghost:hover:not(:disabled) { background: hsl(353,100%,95%) !important; }
        .ui-btn-danger:hover:not(:disabled) { filter: brightness(0.88); }
        .ui-btn-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: var(--salmon-pink);
          border-radius: 50%;
          animation: ui-spin 0.65s linear infinite;
          flex-shrink: 0;
        }
        .ui-btn-spinner-dark { border-top-color: #fff; }
        @keyframes ui-spin { to { transform: rotate(360deg); } }
      `}</style>
      <button
        className={`ui-btn ui-btn-${variant}`}
        disabled={isDisabled}
        style={{
          width: fullWidth ? "100%" : undefined,
          ...Object.fromEntries(
            variantStyles[variant]
              .split(";")
              .filter(Boolean)
              .map((s) => {
                const [k, ...v] = s.split(":");
                const key = k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                return [key, v.join(":").trim()];
              })
          ),
          ...Object.fromEntries(
            sizeStyles[size]
              .split(";")
              .filter(Boolean)
              .map((s) => {
                const [k, ...v] = s.split(":");
                const key = k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                return [key, v.join(":").trim()];
              })
          ),
          ...style,
        }}
        {...props}
      >
        {loading ? (
          <span
            className={`ui-btn-spinner ${variant !== "outline" && variant !== "ghost" ? "ui-btn-spinner-dark" : ""}`}
          />
        ) : leftIcon ? (
          <span style={{ display: "flex", alignItems: "center" }}>{leftIcon}</span>
        ) : null}
        {children}
        {!loading && rightIcon && (
          <span style={{ display: "flex", alignItems: "center" }}>{rightIcon}</span>
        )}
      </button>
    </>
  );
}
