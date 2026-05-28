"use client";

import { useState, useEffect } from "react";

function getTimeLeft() {
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const diff = end.getTime() - now.getTime();
  return {
    h: String(Math.floor((diff / 1000 / 60 / 60) % 24)).padStart(2, "0"),
    m: String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0"),
    s: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
  };
}

export default function DealOfDay() {
  const [time, setTime] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section" style={{ background: "var(--white)" }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">⚡ Oferta do Dia</h2>
          <a href="#" className="section-link">Ver todas as ofertas →</a>
        </div>

        <div className="deal-section">
          <div className="deal-content">
            <span className="deal-badge">Oferta Relâmpago</span>
            <h3 className="deal-title">
              Impressora Creality Ender 3 V3 SE
            </h3>
            <p className="deal-description">
              Impressora 3D FDM com nivelamento automático CR Touch, velocidade de até 250mm/s e tela touchscreen. Perfeita para iniciantes e makers.
            </p>

            <div className="countdown">
              <div className="countdown-item">
                <span className="countdown-value">{time.h}</span>
                <span className="countdown-label">Horas</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{time.m}</span>
                <span className="countdown-label">Min</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{time.s}</span>
                <span className="countdown-label">Seg</span>
              </div>
            </div>

            <div className="deal-price">
              <span className="deal-price-now">R$999,00</span>
              <span className="deal-price-old">R$1.499,00</span>
              <span
                style={{
                  background: "var(--bittersweet)",
                  color: "white",
                  padding: "2px 10px",
                  borderRadius: "999px",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                -33%
              </span>
            </div>

            <div className="deal-stock">
              <p className="deal-stock-text">
                <strong style={{ color: "var(--salmon-pink)" }}>23 vendidos</strong> — Restam 7 unidades!
              </p>
              <div className="stock-bar">
                <div className="stock-fill" style={{ width: "77%" }} />
              </div>
            </div>

            <a href="#" className="deal-btn">
              🛒 Comprar Agora
            </a>
          </div>

          <div className="deal-image">🖨️</div>
        </div>
      </div>
    </section>
  );
}
