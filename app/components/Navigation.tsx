"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Início",                href: "/" },
  { label: "Impressão Sob Demanda", href: "#impressao",   badge: "Popular" },
  { label: "Miniaturas",            href: "#miniaturas" },
  { label: "Decoração",             href: "#decoracao" },
  { label: "Personalizados",        href: "#personalizados" },
  { label: "Protótipos",            href: "#prototipos" },
  { label: "Promoções",             href: "#promocoes",   badge: "Hot" },
  { label: "Blog",                  href: "#blog" },
];

export default function Navigation() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 10) {
        setVisible(true);
      } else if (y < lastY) {
        setVisible(true);   // scrolling up
      } else {
        setVisible(false);  // scrolling down
      }
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <nav className="navbar" style={{ transform: visible ? "translateY(0)" : "translateY(-100%)", transition: "transform 0.3s ease" }}>
      <div className="container">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.href} className="nav-item">
              <a href={item.href} className="nav-link">
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
