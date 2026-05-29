"use client";

import { useState, useRef } from "react";
import { getPasswordStrength } from "@/app/hooks/useAuth";

const STAR_LABELS = ["", "Terrível", "Ruim", "Regular", "Bom", "Excelente! ⭐"];

interface ReviewFormProps {
  productId: string;
  material?: string;
  acabamento?: string;
  onSubmit?: () => void;
}

export default function ReviewForm({ productId, material, acabamento, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleStarClick(s: number) {
    setRating(s);
    setWiggle(true);
    setTimeout(() => setWiggle(false), 350);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const remaining = 5 - photos.length;
    files.slice(0, remaining).forEach(file => {
      if (file.size > 5 * 1024 * 1024) return;
      const reader = new FileReader();
      reader.onload = ev => {
        if (ev.target?.result) setPhotos(p => [...p, ev.target!.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }

  function removePhoto(i: number) {
    setPhotos(p => p.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating || body.length < 30) return;
    setLoading(true);
    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating, title, body, photos, material, acabamento }),
    });
    setLoading(false);
    setSuccess(true);
    onSubmit?.();
  }

  if (success) {
    return (
      <div className="rv-form-success">
        <span style={{ fontSize: 48 }}>🌟</span>
        <h3>Avaliação publicada!</h3>
        <p>Obrigado pelo seu feedback. Ele ajuda outros clientes.</p>
      </div>
    );
  }

  const active = hovered || rating;

  return (
    <div className="rv-form-card">
      <h2 className="rv-form-title">Escrever Avaliação</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="rv-star-selector">
          {[1,2,3,4,5].map(s => (
            <button
              key={s}
              type="button"
              className={`rv-star-btn${s <= active ? " active" : ""}${wiggle && s === rating ? " wiggle" : ""}`}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => handleStarClick(s)}
              aria-label={`${s} estrelas`}
            >
              ★
            </button>
          ))}
        </div>
        {active > 0 && (
          <p className="rv-star-label">{STAR_LABELS[active]}</p>
        )}

        <div className="ff-group">
          <label className="ff-label">Título da avaliação</label>
          <input
            type="text"
            className="ff-input"
            placeholder="Resuma sua experiência"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="ff-group">
          <label className="ff-label">Sua avaliação <span style={{ color: "#999", fontWeight: 400 }}>(mínimo 30 caracteres)</span></label>
          <textarea
            className="ff-input ff-textarea"
            rows={4}
            placeholder="Conta tudo sobre sua experiência com o produto…"
            value={body}
            onChange={e => setBody(e.target.value)}
            minLength={30}
          />
          <span className="rv-char-count" style={{ color: body.length < 30 ? "#ef4444" : "#999" }}>
            {body.length} / 30 mínimo
          </span>
        </div>

        <div className="rv-photo-upload">
          <label className="ff-label">Fotos do produto <span style={{ color: "#999", fontWeight: 400 }}>(até 5)</span></label>
          <div className="rv-photo-grid">
            {photos.map((src, i) => (
              <div key={i} className="rv-photo-preview">
                <img src={src} alt="" />
                <button type="button" className="rv-photo-remove" onClick={() => removePhoto(i)}>×</button>
              </div>
            ))}
            {photos.length < 5 && (
              <button type="button" className="rv-photo-add" onClick={() => fileRef.current?.click()}>
                <span>+</span>
                <span>Foto</span>
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            style={{ display: "none" }}
            onChange={handleFile}
          />
        </div>

        {(material || acabamento) && (
          <div className="rv-prefilled">
            <span>Material: <strong>{material || "—"}</strong></span>
            {acabamento && <span> · Acabamento: <strong>{acabamento}</strong></span>}
          </div>
        )}

        <button
          type="submit"
          className="auth-btn-primary"
          disabled={loading || !rating || body.length < 30}
          style={{ marginTop: 16 }}
        >
          {loading ? <span className="auth-btn-spinner" /> : null}
          {loading ? "Publicando…" : "Publicar Avaliação"}
        </button>
      </form>
    </div>
  );
}
