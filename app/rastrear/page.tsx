"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const MOCK_ORDER = {
  id: "#TT-2025-00123",
  product: "Miniatura RPG — Guerreiro Élfico",
  trackingCode: "BR123456789SP",
  status: "Em trânsito",
  timeline: [
    { label: "Pedido confirmado", date: "20/05/2025 09:12", done: true, icon: "✅" },
    { label: "Pagamento aprovado", date: "20/05/2025 09:30", done: true, icon: "💳" },
    { label: "Em produção", date: "21/05/2025 10:00", done: true, icon: "🖨️" },
    { label: "Enviado pelos Correios", date: "22/05/2025 14:20", done: true, icon: "📦" },
    { label: "Em trânsito", date: "23/05/2025 08:00", done: true, icon: "🚚" },
    { label: "Saiu para entrega", date: "Previsão: 24/05/2025", done: false, icon: "🏠" },
    { label: "Entregue", date: "—", done: false, icon: "🎉" },
  ],
};

export default function RastrearPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<typeof MOCK_ORDER | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    setNotFound(false);
    setTimeout(() => {
      setLoading(false);
      if (query.includes("123") || query.toUpperCase().includes("TT")) {
        setResult(MOCK_ORDER);
      } else {
        setNotFound(true);
      }
    }, 1200);
  }

  return (
    <>
      <Header />
      <main className="rastrear-page">
        <div className="rastrear-hero">
          <div className="container">
            <div className="rastrear-logo">TenTech <span>3D</span></div>
            <h1 className="rastrear-title">Rastreamento de Pedido</h1>
            <p className="rastrear-subtitle">Acompanhe seu pedido sem precisar fazer login</p>
          </div>
        </div>

        <div className="container rastrear-body">
          <div className="rastrear-card">
            <form onSubmit={handleSearch} className="rastrear-form">
              <input
                type="text"
                className="ff-input rastrear-input"
                placeholder="Número do pedido (ex: #TT-2025-00123) ou código de rastreio"
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="auth-btn-primary rastrear-btn" disabled={loading}>
                {loading ? <span className="auth-btn-spinner" /> : "Rastrear"}
              </button>
            </form>

            {notFound && (
              <div className="rastrear-not-found">
                <span style={{ fontSize: 40 }}>🔍</span>
                <p>Nenhum pedido encontrado com este número.<br />Verifique se digitou corretamente.</p>
              </div>
            )}

            {result && (
              <div className="rastrear-result">
                <div className="rastrear-result-header">
                  <div>
                    <span className="rastrear-order-id">{result.id}</span>
                    <p className="rastrear-product">{result.product}</p>
                  </div>
                  <span className="rastrear-status-badge">{result.status}</span>
                </div>
                <p className="rastrear-tracking-code">
                  Código de rastreio: <strong>{result.trackingCode}</strong>
                  <a
                    href={`https://www.correios.com.br/rastreamento/resultado/${result.trackingCode}`}
                    target="_blank"
                    rel="noreferrer"
                    className="auth-link-pink"
                    style={{ marginLeft: 8 }}
                  >
                    Rastrear nos Correios →
                  </a>
                </p>

                <div className="rastrear-timeline">
                  {result.timeline.map((step, i) => (
                    <div key={i} className={`rastrear-step${step.done ? " done" : ""}`}>
                      <div className="rastrear-step-icon">{step.icon}</div>
                      <div className="rastrear-step-body">
                        <strong>{step.label}</strong>
                        <span>{step.date}</span>
                      </div>
                      {i < result.timeline.length - 1 && <div className="rastrear-step-connector" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="rastrear-cta-text">
            Ainda não tem conta?{" "}
            <Link href="/auth/register" className="auth-link-pink">
              Crie uma conta grátis
            </Link>{" "}
            e acompanhe todos seus pedidos em um só lugar.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
