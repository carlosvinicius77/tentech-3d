"use client";
import React, { useState } from "react";

interface StarRatingProps {
  rating?: number;
  count?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
  size?: number;
}

export function StarRating({
  rating = 0,
  count,
  interactive = false,
  onChange,
  size = 14,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const display = interactive ? (hovered || rating) : rating;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <span style={{ display: "inline-flex", gap: 1 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            onClick={() => interactive && onChange?.(i)}
            onMouseEnter={() => interactive && setHovered(i)}
            onMouseLeave={() => interactive && setHovered(0)}
            style={{
              fontSize: size,
              color: i <= display ? "var(--sandy-brown)" : "hsl(0,0%,80%)",
              cursor: interactive ? "pointer" : "default",
              transition: "color 0.15s ease",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            ★
          </span>
        ))}
      </span>
      {count !== undefined && (
        <span
          style={{
            fontSize: size - 2,
            color: "var(--sonic-silver)",
            fontFamily: "var(--font-poppins)",
          }}
        >
          ({count})
        </span>
      )}
    </span>
  );
}
