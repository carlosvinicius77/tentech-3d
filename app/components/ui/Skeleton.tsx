import React from "react";

type SkeletonVariant = "text" | "card" | "circle" | "product";

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const shimmerStyle = `
  @keyframes ui-shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }
  .ui-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 37%, #f0f0f0 63%);
    background-size: 1200px 100%;
    animation: ui-shimmer 1.4s ease infinite;
    border-radius: 6px;
  }
`;

function Base({ width, height, style }: { width?: string | number; height?: string | number; style?: React.CSSProperties }) {
  return (
    <>
      <style>{shimmerStyle}</style>
      <div
        className="ui-skeleton"
        style={{ width, height, ...style }}
      />
    </>
  );
}

export function Skeleton({ variant = "text", width, height, className }: SkeletonProps) {
  if (variant === "text") {
    return (
      <Base width={width ?? "100%"} height={height ?? 14} style={{ borderRadius: 4 }} />
    );
  }

  if (variant === "circle") {
    const s = width ?? height ?? 40;
    return <Base width={s} height={s} style={{ borderRadius: "50%", flexShrink: 0 }} />;
  }

  if (variant === "card") {
    return (
      <Base width={width ?? "100%"} height={height ?? 180} style={{ borderRadius: 8 }} />
    );
  }

  // product card skeleton
  return (
    <>
      <style>{shimmerStyle}</style>
      <div
        className={className}
        style={{
          background: "var(--white)",
          border: "1px solid var(--cultured)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div className="ui-skeleton" style={{ width: "100%", paddingTop: "80%", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0 }} />
        </div>
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          <Base height={10} width="50%" />
          <Base height={13} width="90%" />
          <Base height={13} width="70%" />
          <Base height={10} width="40%" />
          <Base height={32} />
        </div>
      </div>
    </>
  );
}
