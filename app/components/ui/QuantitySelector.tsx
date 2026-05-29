"use client";
import React from "react";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
}

export function QuantitySelector({
  value,
  min = 1,
  max,
  onChange,
  size = "md",
}: QuantitySelectorProps) {
  const btnSize = size === "sm" ? 28 : 34;
  const fontSize = size === "sm" ? 12 : 14;

  const decrement = () => value > min && onChange(value - 1);
  const increment = () => (!max || value < max) && onChange(value + 1);

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    width: btnSize,
    height: btnSize,
    borderRadius: 8,
    border: `1.5px solid ${disabled ? "#ddd" : "var(--salmon-pink)"}`,
    background: "var(--white)",
    color: disabled ? "#bbb" : "var(--salmon-pink)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 18,
    fontWeight: 600,
    transition: "all 0.2s ease",
    flexShrink: 0,
    lineHeight: 1,
  });

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <button
        onClick={decrement}
        disabled={value <= min}
        style={btnStyle(value <= min)}
        aria-label="Diminuir quantidade"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        readOnly
        style={{
          width: btnSize + 8,
          height: btnSize,
          textAlign: "center",
          border: "1.5px solid #ddd",
          borderRadius: 8,
          fontSize,
          fontFamily: "var(--font-poppins)",
          fontWeight: 600,
          color: "var(--eerie-black)",
          background: "var(--white)",
          outline: "none",
          MozAppearance: "textfield",
        }}
      />
      <button
        onClick={increment}
        disabled={!!max && value >= max}
        style={btnStyle(!!max && value >= max)}
        aria-label="Aumentar quantidade"
      >
        +
      </button>
    </div>
  );
}
