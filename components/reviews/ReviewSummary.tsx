"use client";

import { useEffect, useRef } from "react";

interface ReviewSummaryProps {
  average: number;
  total: number;
  distribution: { stars: number; count: number }[];
}

export default function ReviewSummary({ average, total, distribution }: ReviewSummaryProps) {
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>(".rv-bar-fill").forEach(el => {
              el.style.width = el.dataset.width || "0%";
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    if (barsRef.current) observer.observe(barsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="rv-summary" ref={barsRef}>
      <div className="rv-summary-score">
        <span className="rv-big-score">{average.toFixed(1)}</span>
        <div className="rv-stars-row">
          {[1, 2, 3, 4, 5].map(s => (
            <span key={s} className={`rv-star-lg${s <= Math.round(average) ? " filled" : ""}`}>★</span>
          ))}
        </div>
        <p className="rv-total">Baseado em {total} avaliações</p>
      </div>

      <div className="rv-distribution">
        {distribution.slice().reverse().map(row => {
          const pct = total > 0 ? Math.round((row.count / total) * 100) : 0;
          return (
            <div key={row.stars} className="rv-dist-row">
              <span className="rv-dist-label">{row.stars}★</span>
              <div className="rv-bar-track">
                <div
                  className="rv-bar-fill"
                  data-width={`${pct}%`}
                  style={{ width: 0, transition: "width 0.8s ease" }}
                />
              </div>
              <span className="rv-dist-count">{row.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
