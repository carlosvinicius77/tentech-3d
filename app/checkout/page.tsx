"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ── Static cart data (replace with CartContext when ready) ── */
const CART = [
  { id: 1, name: "Filamento PLA Premium 1kg", qty: 2, price: 89.90, emoji: "🧵" },
  { id: 2, name: "Impressora Ender 3 V3 SE", qty: 1, price: 1299.00, emoji: "🖨️" },
];

const SHIPPING_OPTIONS = [
  { id: "pac",    emoji: "📦", name: "PAC Correios", days: "8 dias úteis", price: 18.90 },
  { id: "sedex",  emoji: "⚡", name: "SEDEX",         days: "3 dias úteis", price: 34.50 },
  { id: "jadlog", emoji: "🚚", name: "Jadlog",        days: "5 dias úteis", price: 22.00 },
];

/* ── Float label input ── */
function FloatInput({
  label, value, onChange, type = "text", onFocus, onBlur,
}: {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || (!!value && value.length > 0);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type={type}
        value={value ?? ""}
        onChange={onChange}
        onFocus={() => { setFocused(true); onFocus?.(); }}
        onBlur={() => { setFocused(false); onBlur?.(); }}
        style={{
          width: "100%",
          padding: lifted ? "22px 14px 8px" : "15px 14px",
          border: `1.5px solid ${focused ? "hsl(353,100%,78%)" : "#ddd"}`,
          borderRadius: 8,
          fontSize: 14,
          color: "#333",
          background: "#fff",
          outline: "none",
          fontFamily: "inherit",
          boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        placeholder=" "
      />
      <label style={{
        position: "absolute",
        left: 14,
        top: lifted ? 7 : "50%",
        transform: lifted ? "none" : "translateY(-50%)",
        fontSize: lifted ? 10 : 14,
        color: focused ? "hsl(353,100%,68%)" : "#aaa",
        pointerEvents: "none",
        transition: "all 0.2s ease",
        lineHeight: 1,
        fontWeight: lifted ? 500 : 400,
      }}>
        {label}
      </label>
    </div>
  );
}

/* ── Main checkout page ── */
export default function CheckoutPage() {
  const [step, setStep]           = useState(1);
  const [authMode, setAuthMode]   = useState<"login" | "guest">("guest");
  const [payTab, setPayTab]       = useState<"card" | "pix" | "boleto">("card");
  const [shipping, setShipping]   = useState<string | null>(null);
  const [cardFlipped, setFlip]    = useState(false);
  const [summaryOpen, setSummary] = useState(false);

  // Step 2 — address
  const [cep,  setCep]   = useState("");
  const [addr, setAddr]  = useState({ rua: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "" });

  // Step 4 — card
  const [cardNum,  setCardNum]  = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp,  setCardExp]  = useState("");
  const [cardCvv,  setCardCvv]  = useState("");

  // PIX countdown
  const [pixSec, setPixSec] = useState(14 * 60 + 32);
  useEffect(() => {
    if (payTab !== "pix" || step !== 4) return;
    const t = setInterval(() => setPixSec(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, [payTab, step]);

  /* helpers */
  const subtotal    = CART.reduce((s, i) => s + i.price * i.qty, 0);
  const freeShip    = subtotal >= 200;
  const shipCost    = shipping === "pac" ? 18.90 : shipping === "sedex" ? 34.50 : shipping === "jadlog" ? 22.00 : shipping === "free" ? 0 : 0;
  const total       = subtotal + (shipping ? shipCost : 0);
  const R           = (n: number) => "R$" + n.toFixed(2).replace(".", ",");
  const fmtTimer    = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const fmtCard     = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const fmtExp      = (v: string) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; };

  const lookupCep = async () => {
    const c = cep.replace(/\D/g, "");
    if (c.length !== 8) return;
    try {
      const r = await fetch(`https://viacep.com.br/ws/${c}/json/`);
      const d = await r.json();
      if (!d.erro) setAddr(a => ({ ...a, rua: d.logradouro, bairro: d.bairro, cidade: d.localidade, estado: d.uf }));
    } catch {}
  };

  /* shared styles */
  const btnPink: React.CSSProperties = {
    background: "hsl(353,100%,78%)", color: "#fff", border: "none",
    borderRadius: 8, padding: "13px 28px", fontSize: 14, fontWeight: 600,
    cursor: "pointer", fontFamily: "inherit", display: "inline-flex",
    alignItems: "center", gap: 8, transition: "all 0.25s",
  };
  const btnGray: React.CSSProperties = {
    background: "#fff", color: "#555", border: "1.5px solid #ddd",
    borderRadius: 8, padding: "12px 24px", fontSize: 14, fontWeight: 500,
    cursor: "pointer", fontFamily: "inherit", display: "inline-flex",
    alignItems: "center", gap: 8, transition: "all 0.25s",
  };

  /* ── Order Summary (reused desktop+mobile) ── */
  const Summary = () => (
    <>
      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#222" }}>Resumo do Pedido</h3>
      {CART.map(item => (
        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
            {item.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#333", lineHeight: 1.3 }}>{item.name}</div>
            <div style={{ fontSize: 11, color: "#999" }}>Qtd: {item.qty}</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "hsl(353,100%,60%)", flexShrink: 0 }}>{R(item.price * item.qty)}</div>
        </div>
      ))}
      <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#666" }}>
          <span>Subtotal</span><span>{R(subtotal)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#666" }}>
          <span>Frete</span>
          <span>{shipping ? (shipCost === 0 ? <span style={{ color: "#4caf50", fontWeight: 600 }}>Grátis</span> : R(shipCost)) : "—"}</span>
        </div>
        {freeShip && !shipping && (
          <div style={{ fontSize: 11, color: "#4caf50", fontWeight: 500 }}>🎁 Frete grátis disponível!</div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, paddingTop: 10, borderTop: "1px solid #f0f0f0", marginTop: 4 }}>
          <span>Total</span>
          <span style={{ color: "hsl(353,100%,60%)" }}>{R(total)}</span>
        </div>
      </div>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #f0f0f0", display: "flex", flexDirection: "column", gap: 7 }}>
        {["🔒 Pagamento 100% seguro", "🛡️ Dados criptografados SSL", "✅ Compra garantida TenTech"].map((t, i) => (
          <div key={i} style={{ fontSize: 11, color: "#888" }}>{t}</div>
        ))}
      </div>
    </>
  );

  const STEPS = ["Identificação", "Endereço", "Frete", "Pagamento"];

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f8", fontFamily: "var(--font-poppins)" }}>
      <style>{`
        .ck-btn-pink:hover  { background: hsl(353,100%,68%) !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,120,120,0.35); }
        .ck-btn-gray:hover  { background: #f5f5f5 !important; border-color: #bbb !important; }
        .ck-ship:hover      { border-color: hsl(353,100%,78%) !important; background: hsl(353,100%,97%) !important; }
        .ck-pay-tab:hover   { color: hsl(353,100%,60%) !important; }
        @media (max-width: 768px) {
          .ck-layout   { grid-template-columns: 1fr !important; }
          .ck-sidebar  { display: none !important; }
          .ck-mob-sum  { display: block !important; }
          .ck-step-lbl { display: none !important; }
          .ck-card-preview { max-width: 100% !important; }
          .ck-grid-2   { grid-template-columns: 1fr !important; }
          .ck-info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "14px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 22, fontWeight: 700, color: "#222", textDecoration: "none", letterSpacing: -0.5 }}>
            Ten<span style={{ color: "hsl(353,100%,78%)" }}>Tech</span> 3D
          </Link>
          <span style={{ fontSize: 12, color: "#888", display: "flex", alignItems: "center", gap: 5 }}>
            🔒 Compra 100% Segura
          </span>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px 56px" }}>

        {/* ── Progress bar ── */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "22px 24px 18px", marginBottom: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
            {/* track */}
            <div style={{ position: "absolute", top: 19, left: "calc(12.5% + 20px)", right: "calc(12.5% + 20px)", height: 2, background: "#eee", zIndex: 0 }} />
            {/* fill */}
            <div style={{ position: "absolute", top: 19, left: "calc(12.5% + 20px)", width: `${((step - 1) / 3) * 75}%`, height: 2, background: "hsl(353,100%,78%)", zIndex: 1, transition: "width 0.4s ease" }} />

            {STEPS.map((lbl, i) => {
              const n = i + 1;
              const done   = step > n;
              const active = step === n;
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2, flex: 1 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: done || active ? "hsl(353,100%,78%)" : "#e8e8e8",
                    color: done || active ? "#fff" : "#aaa",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: done ? 18 : 14, fontWeight: 700,
                    boxShadow: active ? "0 0 0 5px hsl(353,100%,92%)" : "none",
                    transform: active ? "scale(1.12)" : "scale(1)",
                    transition: "all 0.3s ease",
                  }}>
                    {done ? "✓" : n}
                  </div>
                  <span className="ck-step-lbl" style={{ fontSize: 11, fontWeight: active ? 600 : 400, color: active ? "hsl(353,100%,60%)" : "#bbb", whiteSpace: "nowrap" }}>
                    {lbl}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: summary accordion ── */}
        <div className="ck-mob-sum" style={{ display: "none", background: "#fff", borderRadius: 12, marginBottom: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <button onClick={() => setSummary(o => !o)} style={{ width: "100%", padding: "15px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>🛒 Ver resumo do pedido</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "hsl(353,100%,60%)" }}>{R(total)}</span>
              <span style={{ fontSize: 12, color: "#aaa", display: "inline-block", transform: summaryOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}>▼</span>
            </div>
          </button>
          {summaryOpen && (
            <div style={{ padding: "0 18px 18px", borderTop: "1px solid #f5f5f5" }}>
              <div style={{ paddingTop: 14 }}><Summary /></div>
            </div>
          )}
        </div>

        {/* ── Main layout ── */}
        <div className="ck-layout" style={{ display: "grid", gridTemplateColumns: "1fr 296px", gap: 14, alignItems: "start" }}>

          {/* Step card */}
          <div style={{ background: "#fff", borderRadius: 12, padding: "28px 28px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

            {/* ────────────────── STEP 1 ────────────────── */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 22, color: "#222" }}>Identificação</h2>

                {/* Auth toggle */}
                <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: "1.5px solid #e8e8e8", marginBottom: 24 }}>
                  {(["login", "guest"] as const).map(m => (
                    <button key={m} onClick={() => setAuthMode(m)} style={{
                      flex: 1, padding: "13px 10px", fontSize: 13, fontWeight: 500,
                      background: authMode === m ? "hsl(353,100%,78%)" : "#fff",
                      color: authMode === m ? "#fff" : "#666",
                      border: "none", cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s",
                    }}>
                      {m === "login" ? "🔑 Já tenho conta" : "👤 Continuar como visitante"}
                    </button>
                  ))}
                </div>

                {authMode === "login" ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <FloatInput label="E-mail" type="email" />
                    <FloatInput label="Senha" type="password" />
                    <button className="ck-btn-pink" style={btnPink}>Entrar na minha conta</button>
                    <a href="#" style={{ textAlign: "center", fontSize: 12, color: "hsl(353,100%,68%)" }}>Esqueci minha senha</a>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <FloatInput label="Nome completo" />
                    <FloatInput label="E-mail" type="email" />
                    <div className="ck-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <FloatInput label="CPF" />
                      <FloatInput label="Telefone / WhatsApp" />
                    </div>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12, color: "#666", cursor: "pointer" }}>
                      <input type="checkbox" style={{ accentColor: "hsl(353,100%,78%)", marginTop: 1, flexShrink: 0 }} />
                      Aceito receber novidades e promoções da TenTech 3D por e-mail
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* ────────────────── STEP 2 ────────────────── */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 22, color: "#222" }}>Endereço de Entrega</h2>
                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                  <div style={{ flex: 1 }}>
                    <FloatInput label="CEP" value={cep} onChange={e => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))} />
                  </div>
                  <button className="ck-btn-pink" onClick={lookupCep} style={{ ...btnPink, padding: "13px 22px", flexShrink: 0 }}>Buscar</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <FloatInput label="Rua / Logradouro" value={addr.rua} onChange={e => setAddr(a => ({ ...a, rua: e.target.value }))} />
                  <div className="ck-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <FloatInput label="Número" value={addr.numero} onChange={e => setAddr(a => ({ ...a, numero: e.target.value }))} />
                    <FloatInput label="Complemento (opcional)" value={addr.complemento} onChange={e => setAddr(a => ({ ...a, complemento: e.target.value }))} />
                  </div>
                  <FloatInput label="Bairro" value={addr.bairro} onChange={e => setAddr(a => ({ ...a, bairro: e.target.value }))} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 80px", gap: 12 }}>
                    <FloatInput label="Cidade" value={addr.cidade} onChange={e => setAddr(a => ({ ...a, cidade: e.target.value }))} />
                    <FloatInput label="UF" value={addr.estado} onChange={e => setAddr(a => ({ ...a, estado: e.target.value.toUpperCase().slice(0, 2) }))} />
                  </div>
                </div>
              </div>
            )}

            {/* ────────────────── STEP 3 ────────────────── */}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 22, color: "#222" }}>Opções de Frete</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    ...SHIPPING_OPTIONS,
                    ...(freeShip ? [{ id: "free", emoji: "🎁", name: "Frete Grátis", days: "7 dias úteis", price: 0 }] : []),
                  ].map(opt => {
                    const sel = shipping === opt.id;
                    return (
                      <button key={opt.id} className="ck-ship" onClick={() => setShipping(opt.id)} style={{
                        display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                        border: `2px solid ${sel ? "hsl(353,100%,78%)" : "#e8e8e8"}`,
                        borderRadius: 10,
                        background: sel ? "hsl(353,100%,97%)" : "#fff",
                        cursor: "pointer", transition: "all 0.22s", textAlign: "left", fontFamily: "inherit",
                      }}>
                        <span style={{ fontSize: 26 }}>{opt.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>{opt.name}</div>
                          <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{opt.days}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                          {opt.id === "free"
                            ? <span style={{ background: "#4caf50", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>GRÁTIS</span>
                            : <span style={{ fontSize: 15, fontWeight: 700, color: "hsl(353,100%,60%)" }}>{R(opt.price)}</span>
                          }
                          <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${sel ? "hsl(353,100%,78%)" : "#ddd"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {sel && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "hsl(353,100%,78%)" }} />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {freeShip && (
                  <div style={{ marginTop: 12, padding: "10px 14px", background: "#f0faf0", border: "1px solid #b2dfdb", borderRadius: 8, fontSize: 12, color: "#2e7d32" }}>
                    🎉 Seu pedido qualifica para frete grátis!
                  </div>
                )}
              </div>
            )}

            {/* ────────────────── STEP 4 ────────────────── */}
            {step === 4 && (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#222" }}>Pagamento</h2>

                {/* Payment tabs */}
                <div style={{ display: "flex", borderBottom: "2px solid #eee", marginBottom: 24 }}>
                  {([["card", "💳 Cartão"], ["pix", "⚡ PIX"], ["boleto", "🏦 Boleto"]] as const).map(([tab, lbl]) => (
                    <button key={tab} className="ck-pay-tab" onClick={() => setPayTab(tab)} style={{
                      padding: "10px 18px", fontSize: 13, background: "none", border: "none",
                      borderBottom: `2px solid ${payTab === tab ? "hsl(353,100%,78%)" : "transparent"}`,
                      marginBottom: -2, cursor: "pointer", fontFamily: "inherit",
                      fontWeight: payTab === tab ? 600 : 400,
                      color: payTab === tab ? "hsl(353,100%,60%)" : "#888",
                      transition: "all 0.22s",
                    }}>
                      {lbl}
                    </button>
                  ))}
                </div>

                {/* ── Cartão ── */}
                {payTab === "card" && (
                  <div>
                    {/* 3D Card preview */}
                    <div style={{ perspective: 1000, marginBottom: 24 }}>
                      <div className="ck-card-preview" style={{
                        width: "100%", maxWidth: 360, height: 192, margin: "0 auto",
                        position: "relative", transformStyle: "preserve-3d",
                        transition: "transform 0.6s ease",
                        transform: cardFlipped ? "rotateY(180deg)" : "none",
                      }}>
                        {/* Front */}
                        <div style={{
                          position: "absolute", inset: 0, borderRadius: 16, padding: 22,
                          background: "linear-gradient(135deg, hsl(353,100%,75%) 0%, hsl(353,65%,54%) 100%)",
                          boxShadow: "0 20px 50px rgba(255,100,100,0.35)",
                          backfaceVisibility: "hidden", color: "#fff",
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 26 }}>
                            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>Ten<span style={{ opacity: 0.6 }}>Tech</span></span>
                            <span style={{ fontSize: 26 }}>💳</span>
                          </div>
                          <div style={{ fontSize: 17, letterSpacing: "3px", marginBottom: 20, fontFamily: "monospace", fontWeight: 600 }}>
                            {cardNum || "•••• •••• •••• ••••"}
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                            <div>
                              <div style={{ fontSize: 9, opacity: 0.6, marginBottom: 3, letterSpacing: 1 }}>TITULAR DO CARTÃO</div>
                              <div style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{cardName || "SEU NOME"}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: 9, opacity: 0.6, marginBottom: 3, letterSpacing: 1 }}>VALIDADE</div>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>{cardExp || "MM/AA"}</div>
                            </div>
                          </div>
                        </div>
                        {/* Back */}
                        <div style={{
                          position: "absolute", inset: 0, borderRadius: 16,
                          background: "linear-gradient(135deg, #2c2c2c 0%, #484848 100%)",
                          boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
                          backfaceVisibility: "hidden", transform: "rotateY(180deg)",
                        }}>
                          <div style={{ height: 38, background: "#111", marginTop: 22, marginBottom: 18 }} />
                          <div style={{ padding: "0 22px" }}>
                            <div style={{ background: "#f0f0f0", borderRadius: 5, padding: "10px 14px", display: "flex", justifyContent: "flex-end" }}>
                              <span style={{ fontFamily: "monospace", fontSize: 16, letterSpacing: 4, color: "#333", fontWeight: 700 }}>
                                {cardCvv || "•••"}
                              </span>
                            </div>
                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 5, textAlign: "right" }}>CVV / CVC</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card inputs */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <FloatInput label="Número do cartão"
                        value={fmtCard(cardNum)}
                        onChange={e => { setCardNum(e.target.value); setFlip(false); }} />
                      <FloatInput label="Nome impresso no cartão"
                        value={cardName}
                        onChange={e => { setCardName(e.target.value.toUpperCase()); setFlip(false); }} />
                      <div className="ck-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <FloatInput label="Validade (MM/AA)"
                          value={cardExp}
                          onChange={e => { setCardExp(fmtExp(e.target.value)); setFlip(false); }} />
                        <FloatInput label="CVV"
                          value={cardCvv}
                          onFocus={() => setFlip(true)}
                          onBlur={() => setFlip(false)}
                          onChange={e => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} />
                      </div>

                      {/* Installments */}
                      <div style={{ position: "relative" }}>
                        <select style={{
                          width: "100%", padding: "14px 16px 14px 14px",
                          border: "1.5px solid #ddd", borderRadius: 8,
                          fontSize: 13, color: "#444", background: "#fff",
                          fontFamily: "inherit", cursor: "pointer", appearance: "none",
                        }}>
                          <option value="">Selecione o número de parcelas</option>
                          {[1, 2, 3].map(n => (
                            <option key={n}>{n}x de {R(total / n)} sem juros</option>
                          ))}
                          {[4, 5, 6, 10, 12].map(n => (
                            <option key={n}>{n}x de {R((total * 1.039) / n)} com juros</option>
                          ))}
                        </select>
                        <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#aaa", fontSize: 12 }}>▼</span>
                      </div>

                      <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#666", cursor: "pointer" }}>
                        <input type="checkbox" style={{ accentColor: "hsl(353,100%,78%)", width: 16, height: 16 }} />
                        Salvar cartão para próximas compras
                      </label>
                    </div>
                  </div>
                )}

                {/* ── PIX ── */}
                {payTab === "pix" && (
                  <div style={{ textAlign: "center" }}>
                    {/* QR Code visual */}
                    <div style={{
                      width: 196, height: 196, margin: "0 auto 18px",
                      background: "#fff", borderRadius: 14, border: "2px solid #e8e8e8",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.06)", padding: 12,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
                    }}>
                      {/* Static QR pattern */}
                      <svg width="140" height="140" viewBox="0 0 140 140">
                        {/* corners */}
                        {[[0,0],[0,100],[100,0]].map(([cx,cy],i) => (
                          <g key={i} transform={`translate(${cx},${cy})`}>
                            <rect x="0" y="0" width="40" height="40" fill="#222" />
                            <rect x="6" y="6" width="28" height="28" fill="#fff" />
                            <rect x="12" y="12" width="16" height="16" fill="#222" />
                          </g>
                        ))}
                        {/* body dots */}
                        {[50,56,62,68,74,80,86,92,98,104,50,62,74,86,98,56,68,80,92,104,50,58,66,74,82,90,98,106,54,70,78,88,102,58,66,80,94,50,62,76,88,100].map((x, i) => (
                          <rect key={i} x={x} y={40 + (i % 8) * 8} width="5" height="5" fill="#222" />
                        ))}
                      </svg>
                      <div style={{ fontSize: 10, color: "#aaa" }}>PIX TenTech 3D</div>
                    </div>

                    {/* Timer */}
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px",
                      background: pixSec > 0 ? "#fff8e6" : "#fff0f0",
                      border: `1px solid ${pixSec > 0 ? "#ffe082" : "#f99"}`,
                      borderRadius: 999, fontSize: 13, fontWeight: 600,
                      color: pixSec > 0 ? "#e67e22" : "#e74c3c", marginBottom: 18,
                    }}>
                      ⏱ Expira em {fmtTimer(pixSec)}
                    </div>

                    {/* Pix key */}
                    <div style={{ background: "#f5f5f5", borderRadius: 10, padding: "12px 14px", marginBottom: 22, display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}>
                      <code style={{ fontSize: 10, flex: 1, wordBreak: "break-all", color: "#666", lineHeight: 1.6 }}>
                        00020126580014BR.GOV.BCB.PIX0136a47b-4d2e-4f7e-9a3c-2f8d1e6b92a35204000053039865404{total.toFixed(0)}5802BR5920TenTech3D LTDA6009SAO PAULO62090505TT3D763047F9A
                      </code>
                      <button className="ck-btn-pink"
                        onClick={() => navigator.clipboard?.writeText("00020126580014BR.GOV.BCB.PIX...")}
                        style={{ ...btnPink, padding: "8px 12px", fontSize: 11, flexShrink: 0 }}>
                        📋 Copiar
                      </button>
                    </div>

                    {/* Instructions */}
                    <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 12 }}>
                      {[
                        "Abra o app do seu banco ou carteira digital",
                        "Vá em Pagar → PIX → QR Code ou Copia e Cola",
                        "Escaneie o código ou cole a chave PIX acima",
                        "Confirme o valor e finalize o pagamento",
                      ].map((txt, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                          <span style={{ width: 26, height: 26, borderRadius: "50%", background: "hsl(353,100%,78%)", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                          <span style={{ fontSize: 13, color: "#555", paddingTop: 5 }}>{txt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Boleto ── */}
                {payTab === "boleto" && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 58, marginBottom: 12 }}>🏦</div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#222", marginBottom: 6 }}>Boleto Bancário</h3>
                    <p style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>
                      Valor: <strong style={{ color: "hsl(353,100%,60%)" }}>{R(total)}</strong>
                    </p>
                    <p style={{ fontSize: 12, color: "#aaa", marginBottom: 24 }}>Vencimento em 3 dias úteis após a geração</p>
                    <button className="ck-btn-pink" style={{ ...btnPink, width: "100%", justifyContent: "center", padding: "14px", marginBottom: 20 }}>
                      📄 Gerar Boleto
                    </button>
                    <div style={{ background: "#fffbea", border: "1px solid #ffe082", borderRadius: 10, padding: "14px 16px", textAlign: "left" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#7a5c00", marginBottom: 8 }}>⚠️ Atenção</div>
                      {[
                        "O boleto pode levar até 1 dia útil para compensar",
                        "Após compensação, o pedido será processado e enviado",
                        "Válido apenas para o valor exato do pedido",
                      ].map((t, i) => (
                        <div key={i} style={{ fontSize: 12, color: "#666", marginBottom: 6, display: "flex", gap: 8 }}>
                          <span style={{ flexShrink: 0 }}>•</span><span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Navigation buttons ── */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30, paddingTop: 20, borderTop: "1px solid #f5f5f5" }}>
              {step > 1 ? (
                <button className="ck-btn-gray" onClick={() => setStep(s => (s - 1) as 1|2|3|4)} style={btnGray}>
                  ← Voltar
                </button>
              ) : (
                <Link href="/" style={{ ...btnGray, textDecoration: "none", fontSize: 13 }}>
                  ← Continuar comprando
                </Link>
              )}

              {step < 4 ? (
                <button className="ck-btn-pink" onClick={() => setStep(s => (s + 1) as 1|2|3|4)} style={btnPink}>
                  Continuar →
                </button>
              ) : (
                <Link href="/checkout/success" style={{
                  ...btnPink, textDecoration: "none",
                  padding: "14px 32px", fontSize: 14,
                  background: "hsl(353,100%,70%)",
                  boxShadow: "0 8px 24px rgba(255,100,100,0.35)",
                }}>
                  🔒 Confirmar Pedido
                </Link>
              )}
            </div>
          </div>

          {/* ── Desktop sidebar ── */}
          <div className="ck-sidebar" style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", position: "sticky", top: 16 }}>
            <Summary />
          </div>
        </div>
      </div>
    </div>
  );
}
