"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type AspectRatio = "square" | "video" | "portrait" | "auto";

const aspectRatioMap: Record<Exclude<AspectRatio, "auto">, string> = {
  square: "1 / 1",
  video: "16 / 9",
  portrait: "3 / 4",
};

type OptimizedImageProps = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  aspectRatio?: AspectRatio;
};

export function OptimizedImage({
  aspectRatio = "auto",
  style,
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    aspectRatio:
      aspectRatio !== "auto" ? aspectRatioMap[aspectRatio] : undefined,
    ...style,
  };

  return (
    <div style={containerStyle}>
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #fce4ec 0%, #f8bbd0 50%, #fce4ec 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      )}
      <Image
        {...props}
        onLoad={() => setLoaded(true)}
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
          objectFit: "cover",
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0 }
          100% { background-position: 200% 0 }
        }
      `}</style>
    </div>
  );
}
