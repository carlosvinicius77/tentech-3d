"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ITEMS = [
  { name: "Filamento PLA Premium 1kg", qty: 2, price: 179.80, emoji: "🧵" },
  { name: "Impressora Ender 3 V3 SE",  qty: 1, price: 1299.00, emoji: "🖨️" },
];

export default function CheckoutSuccessPage() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 80); return () => clearTimeout(t); }, []);

  const total = ITEMS.reduce((s, i) => s + i.price, 0);
  const R = (n: number) => "R$" + n.toFixed(2).replace(".", ",");

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f8", fontFamily: "var(--font-poppins)" }}>
      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0.3); opacity: 0; }
          70%  { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes drawCircle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .suc-pop  { animation: popIn    0.65s cubic-bezier(0.175,0.885,0.32,1.275) both; }
        .suc-su1  { animation: slideUp  0.55s ease 0.5s  both; }
        .suc-su2  { animation: slideUp  0.55s ease 0.65s both; }
        .suc-su3  { animation: slideUp  0.55s ease 0.8s  both; }
        .suc-su4  { animation: slideUp  0.55s ease 0.95s both; }
        .suc-su5  { animation: slideUp  0.55s ease 1.05s both; }
        .suc-btn-pink:hover { background: hsl(353,100%,68%) !important; transform: translateY(-2px); box-shadow: 0 8px 22px rgba(255,100,100,0.3); }
        .suc-btn-gray:hover { background: #f5f5f5 !important; border-color: #bbb !important; }
        @media (max-width: 640px) {
          .suc-info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "14px 20px", marginBottom: 36 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 22, fontWeight: 700, color: "#222", textDecoration: "none", letterSpacing: -0.5 }}>
            Ten<span style={{ color: "hsl(353,100%,78%)" }}>Tech</span> 3D
          </Link>
          <span style={{ fontSize: 12, color: "#888" }}>🔒 Pedido Confirmado</span>
        </div>
      </header>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px 64px" }}>

        {/* ── Checkmark animation ── */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div className={show ? "suc-pop" : ""} style={{
            width: 104, height: 104, borderRadius: "50%",
            background: "hsl(152,51%,92%)", margin: "0 auto 18px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle
                cx="30" cy="30" r="27"
                stroke="hsl(152,51%,52%)" strokeWidth="3"
                strokeDasharray="170" strokeDashoffset={show ? 0 : 170}
                style={{ transition: "stroke-dashoffset 0.7s ease 0.4s" }}
              />
              <path
                d="M18 30 L26 38 L42 22"
                stroke="hsl(152,51%,42%)" strokeWidth="3.5"
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="44" strokeDashoffset={show ? 0 : 44}
                style={{ transition: "stroke-dashoffset 0.5s ease 0.9s" }}
              />
            </svg>
          </div>

          <h1 className="suc-su1" style={{ fontSize: 26, fontWeight: 700, color: "#222", marginBottom: 8 }}>
            Pedido confirmado! 🎉
          </h1>
          <p className="suc-su2" style={{ fontSize: 14, color: "#777" }}>
            Seu pedido <strong style={{ color: "hsl(353,100%,68%)" }}>#TT-2024-1847</strong> foi recebido e está sendo processado.
          </p>
        </div>

        {/* ── Order items ── */}
        <div className="suc-su3" style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 14px rgba(0,0,0,0.07)", marginBottom: 14 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "#222", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #f5f5f5" }}>
            📦 Itens do Pedido
          </h2>
          {ITEMS.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i < ITEMS.length - 1 ? 12 : 0 }}>
              <div style={{ width: 46, height: 46, borderRadius: 9, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                {item.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#333" }}>{item.name}</div>
                <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>Qtd: {item.qty}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "hsl(353,100%,60%)" }}>{R(item.price)}</div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #f5f5f5", paddingTop: 14, marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "#888" }}>Frete (SEDEX)</span>
              <span style={{ fontSize: 13, color: "#888" }}>R$34,50</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#222" }}>Total pago</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "hsl(353,100%,60%)" }}>{R(total + 34.50)}</span>
            </div>
          </div>
        </div>

        {/* ── Delivery + Payment info ── */}
        <div className="suc-info-grid suc-su3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#222", marginBottom: 10 }}>📍 Entrega</div>
            <div style={{ fontSize: 12, color: "#777", lineHeight: 1.7 }}>
              Rua das Flores, 123<br />
              Jardim Primavera<br />
              São Paulo, SP — 01310-000
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: "#4caf50", fontWeight: 500 }}>⚡ Previsão: 3 dias úteis</div>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#222", marginBottom: 10 }}>💳 Pagamento</div>
            <div style={{ fontSize: 12, color: "#777", lineHeight: 1.7 }}>
              Cartão de Crédito<br />
              3x de R$511,23 sem juros<br />
              •••• •••• •••• 4242
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: "#4caf50", fontWeight: 500 }}>✓ Aprovado</div>
          </div>
        </div>

        {/* ── Status timeline ── */}
        <div className="suc-su4" style={{ background: "#fff", borderRadius: 12, padding: "18px 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#222", marginBottom: 16 }}>📋 Acompanhamento</div>
          {[
            { label: "Pedido recebido",       done: true,  time: "agora"       },
            { label: "Pagamento confirmado",   done: false, time: "em até 1h"   },
            { label: "Em separação",           done: false, time: ""            },
            { label: "Enviado",                done: false, time: ""            },
            { label: "Entregue",               done: false, time: ""            },
          ].map((s, i, arr) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: i < arr.length - 1 ? 4 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: s.done ? "hsl(353,100%,78%)" : "#eee",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, color: s.done ? "#fff" : "#bbb", fontWeight: 700,
                }}>
                  {s.done ? "✓" : ""}
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: 2, height: 22, background: s.done ? "hsl(353,100%,88%)" : "#eee", margin: "4px 0" }} />
                )}
              </div>
              <div style={{ paddingTop: 3, flex: 1, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: s.done ? "#333" : "#bbb", fontWeight: s.done ? 500 : 400 }}>{s.label}</span>
                {s.time && <span style={{ fontSize: 11, color: "#ccc" }}>{s.time}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA buttons ── */}
        <div className="suc-su5" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="suc-btn-pink" style={{
            background: "hsl(353,100%,78%)", color: "#fff", border: "none",
            borderRadius: 10, padding: "14px 28px", fontSize: 14, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8,
            transition: "all 0.25s",
          }}>
            📦 Acompanhar Pedido
          </button>
          <Link href="/" className="suc-btn-gray" style={{
            background: "#fff", color: "#555", border: "1.5px solid #ddd",
            borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 500,
            display: "inline-flex", alignItems: "center", gap: 8,
            textDecoration: "none", transition: "all 0.25s",
          }}>
            🛍️ Continuar Comprando
          </Link>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#bbb", marginTop: 28 }}>
          Confirmação enviada para <strong style={{ color: "#aaa" }}>carlinhos12332100@gmail.com</strong>
        </p>
      </div>
    </div>
  );
}
