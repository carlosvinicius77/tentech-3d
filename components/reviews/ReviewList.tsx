"use client";

import { useState } from "react";
import type { Review } from "./types";

const FILTERS = ["Mais recentes", "Maior nota", "Menor nota", "Com fotos"];

function getInitialsBg(name: string) {
  const colors = ["#FF6B9D", "#6C63FF", "#00C9A7", "#FF9500", "#5856D6", "#34C759"];
  let hash = 0;
  for (const c of name) hash = (hash << 5) - hash + c.charCodeAt(0);
  return colors[Math.abs(hash) % colors.length];
}

function initials(name: string) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

interface ReviewListProps {
  reviews: Review[];
  productId: string;
}

export default function ReviewList({ reviews }: ReviewListProps) {
  const [filter, setFilter] = useState("Mais recentes");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [helpful, setHelpful] = useState<Record<string, number>>({});
  const [visibleCount, setVisibleCount] = useState(5);

  const sorted = [...reviews].sort((a, b) => {
    if (filter === "Maior nota") return b.rating - a.rating;
    if (filter === "Menor nota") return a.rating - b.rating;
    if (filter === "Com fotos") return b.photos.length - a.photos.length;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const visible = sorted.slice(0, visibleCount);

  function toggleExpand(id: string) {
    setExpanded(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function markHelpful(id: string) {
    setHelpful(h => ({ ...h, [id]: (h[id] || 0) + 1 }));
  }

  return (
    <div className="rv-list">
      <div className="rv-list-header">
        <h2 className="rv-list-title">Avaliações dos Clientes</h2>
        <div className="rv-filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`rv-filter-btn${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="rv-cards">
        {visible.map(r => {
          const isExp = expanded.has(r.id);
          const body = r.body;
          const shouldTruncate = body.length > 200 && !isExp;
          const extraHelpful = helpful[r.id] || 0;

          return (
            <div key={r.id} className="rv-card">
              <div className="rv-card-top">
                <div className="rv-avatar" style={{ background: getInitialsBg(r.user.name) }}>
                  {r.user.avatar
                    ? <img src={r.user.avatar} alt={r.user.name} />
                    : initials(r.user.name)
                  }
                </div>
                <div className="rv-author-info">
                  <div className="rv-author-row">
                    <span className="rv-author-name">{r.user.name.split(" ")[0]} {r.user.name.split(" ").pop()?.charAt(0)}.</span>
                    {r.verified && <span className="rv-verified-badge">Compra Verificada</span>}
                  </div>
                  <div className="rv-stars-row rv-stars-sm">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className={`rv-star${s <= r.rating ? " filled" : ""}`}>★</span>
                    ))}
                  </div>
                </div>
                <span className="rv-date">
                  {new Date(r.createdAt).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>

              {r.title && <h3 className="rv-card-title">{r.title}</h3>}
              <p className="rv-card-body">
                {shouldTruncate ? body.slice(0, 200) + "…" : body}
                {body.length > 200 && (
                  <button className="rv-read-more" onClick={() => toggleExpand(r.id)}>
                    {isExp ? " Ler menos" : " Ler mais"}
                  </button>
                )}
              </p>

              {r.photos.length > 0 && (
                <div className="rv-photos">
                  {r.photos.map((photo, i) => (
                    <div key={i} className="rv-photo-thumb">
                      <img src={photo} alt={`Foto ${i + 1}`} />
                    </div>
                  ))}
                </div>
              )}

              {(r.material || r.acabamento) && (
                <p className="rv-attrs">
                  {r.material && `Material: ${r.material}`}
                  {r.material && r.acabamento && " · "}
                  {r.acabamento && `Acabamento: ${r.acabamento}`}
                </p>
              )}

              <div className="rv-helpful">
                <span>Útil?</span>
                <button className="rv-helpful-btn" onClick={() => markHelpful(r.id)}>
                  👍 {r.helpful + extraHelpful}
                </button>
                <button className="rv-helpful-btn">👎 {r.notHelpful}</button>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < sorted.length && (
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button
            className="rv-load-more"
            onClick={() => setVisibleCount(c => c + 5)}
          >
            Ver mais avaliações ({sorted.length - visibleCount} restantes)
          </button>
        </div>
      )}
    </div>
  );
}
