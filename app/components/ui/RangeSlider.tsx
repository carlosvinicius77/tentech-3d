"use client";
import React, { useState, useRef, useCallback } from "react";

interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultMin?: number;
  defaultMax?: number;
  onChange?: (range: [number, number]) => void;
  prefix?: string;
}

const rangeSliderCss = `
  .ui-range { font-family: var(--font-poppins); user-select: none; }
  .ui-range-track-wrap { position: relative; height: 6px; border-radius: 3px; background: #e5e5e5; margin: 16px 0 8px; }
  .ui-range-track-fill { position: absolute; height: 100%; background: var(--salmon-pink); border-radius: 3px; }
  .ui-range-thumb {
    position: absolute; top: 50%; transform: translate(-50%, -50%);
    width: 18px; height: 18px; border-radius: 50%;
    background: var(--white); border: 2.5px solid var(--salmon-pink);
    cursor: grab; box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    transition: box-shadow 0.15s ease;
    touch-action: none;
  }
  .ui-range-thumb:active { cursor: grabbing; box-shadow: 0 0 0 5px hsl(353,100%,92%); }
  .ui-range-labels { display: flex; justify-content: space-between; font-size: 12px; color: var(--sonic-silver); margin-top: 4px; }
  .ui-range-label-val { font-weight: 600; color: var(--salmon-pink); }
`;

export function RangeSlider({
  min = 0,
  max = 1000,
  step = 1,
  defaultMin,
  defaultMax,
  onChange,
  prefix = "R$ ",
}: RangeSliderProps) {
  const [low, setLow] = useState(defaultMin ?? min);
  const [high, setHigh] = useState(defaultMax ?? max);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"low" | "high" | null>(null);

  const snap = (v: number) => Math.round(v / step) * step;
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const getValueFromX = useCallback((clientX: number): number => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return min;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return snap(min + ratio * (max - min));
  }, [min, max, step]);

  const onMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const val = getValueFromX(clientX);
    if (dragging.current === "low") {
      const newLow = Math.min(val, high - step);
      setLow(newLow);
      onChange?.([newLow, high]);
    } else if (dragging.current === "high") {
      const newHigh = Math.max(val, low + step);
      setHigh(newHigh);
      onChange?.([low, newHigh]);
    }
  }, [low, high, step, getValueFromX, onChange]);

  const onMouseUp = useCallback(() => {
    dragging.current = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("touchmove", onMouseMove);
    window.removeEventListener("touchend", onMouseUp);
  }, [onMouseMove]);

  const startDrag = (thumb: "low" | "high") => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    dragging.current = thumb;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onMouseMove);
    window.addEventListener("touchend", onMouseUp);
  };

  const fmt = (v: number) => `${prefix}${v.toLocaleString("pt-BR")}`;

  return (
    <>
      <style>{rangeSliderCss}</style>
      <div className="ui-range">
        <div className="ui-range-track-wrap" ref={trackRef}>
          <div
            className="ui-range-track-fill"
            style={{ left: `${pct(low)}%`, width: `${pct(high) - pct(low)}%` }}
          />
          <div
            className="ui-range-thumb"
            style={{ left: `${pct(low)}%` }}
            onMouseDown={startDrag("low")}
            onTouchStart={startDrag("low")}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={high}
            aria-valuenow={low}
          />
          <div
            className="ui-range-thumb"
            style={{ left: `${pct(high)}%` }}
            onMouseDown={startDrag("high")}
            onTouchStart={startDrag("high")}
            role="slider"
            aria-valuemin={low}
            aria-valuemax={max}
            aria-valuenow={high}
          />
        </div>
        <div className="ui-range-labels">
          <span><span className="ui-range-label-val">{fmt(low)}</span></span>
          <span><span className="ui-range-label-val">{fmt(high)}</span></span>
        </div>
      </div>
    </>
  );
}
