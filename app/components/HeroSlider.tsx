"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    subtitle: "Impressão 3D Sob Demanda",
    title: <>Traga Seu Projeto, <span>Nós Imprimimos!</span></>,
    text: "Envie seu arquivo STL ou nos conte sua ideia. Peças técnicas, decoração, protótipos e miniaturas — entregamos em todo o Brasil.",
    btnText: "Solicitar Orçamento",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    icon: "🎨",
    iconBg: "linear-gradient(135deg, #FF9A9A, #FF6B6B)",
  },
  {
    subtitle: "Miniaturas Exclusivas",
    title: <>Miniaturas RPG <span>Personalizadas</span></>,
    text: "Guerreiros, dragões, cenários e personagens únicos. Impressão em alta resolução, pintadas ou em resina natural.",
    btnText: "Ver Miniaturas",
    bg: "linear-gradient(135deg, #0d1b2a 0%, #1b2838 100%)",
    icon: "🎭",
    iconBg: "linear-gradient(135deg, #9333ea, #7c3aed)",
  },
  {
    subtitle: "Decoração & Arte 3D",
    title: <>Peças Únicas para <span>seu Espaço</span></>,
    text: "Vasos, luminárias, porta-retratos e esculturas decorativas feitas sob medida. Design exclusivo para a sua casa.",
    btnText: "Ver Decoração",
    bg: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    icon: "🏠",
    iconBg: "linear-gradient(135deg, #0284c7, #0369a1)",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <div className="hero" style={{ background: slides[current].bg, transition: "background 0.5s ease" }}>
      {slides.map((slide, i) => (
        <div key={i} className={`hero-slide ${i === current ? "active" : ""}`}>
          <div className="hero-content">
            <p className="hero-subtitle">{slide.subtitle}</p>
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-text">{slide.text}</p>
            <a href="#impressao" className="hero-btn">{slide.btnText} →</a>
          </div>
          <div className="hero-visual">
            <div className="hero-3d-mockup" style={{ background: slide.iconBg }}>
              {slide.icon}
            </div>
          </div>
        </div>
      ))}

      <button className="hero-arrow prev" onClick={prev} aria-label="Anterior">‹</button>
      <button className="hero-arrow next" onClick={next} aria-label="Próximo">›</button>

      <div className="hero-controls">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
