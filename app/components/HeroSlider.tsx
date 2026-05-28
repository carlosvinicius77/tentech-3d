"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    subtitle: "Novidade da Semana",
    title: <>Filamento PLA Premium <span>Alta Resistência</span></>,
    text: "Imprima com qualidade profissional. PLA com 1,75mm de precisão, cores vibrantes e sem empenos.",
    btnText: "Ver Filamentos",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    icon: "🧵",
    iconBg: "linear-gradient(135deg, #FF9A9A, #FF6B6B)",
  },
  {
    subtitle: "Impressão Sob Demanda",
    title: <>Traga seu Projeto, <span>Nós Imprimimos!</span></>,
    text: "Envie seu arquivo STL ou nos conte sua ideia. Peças técnicas, decoração, protótipos e muito mais.",
    btnText: "Solicitar Orçamento",
    bg: "linear-gradient(135deg, #0d1b2a 0%, #1b2838 100%)",
    icon: "🖨️",
    iconBg: "linear-gradient(135deg, #f5a623, #e67e22)",
  },
  {
    subtitle: "Equipamentos Pro",
    title: <>Impressoras 3D <span>para Todo Nível</span></>,
    text: "Do iniciante ao profissional, temos a impressora certa para você. Suporte técnico especializado incluído.",
    btnText: "Ver Impressoras",
    bg: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    icon: "⚙️",
    iconBg: "linear-gradient(135deg, #57bb75, #27ae60)",
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
            <a href="#" className="hero-btn">
              {slide.btnText} →
            </a>
          </div>

          <div className="hero-visual">
            <div
              className="hero-3d-mockup"
              style={{ background: slide.iconBg }}
            >
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
