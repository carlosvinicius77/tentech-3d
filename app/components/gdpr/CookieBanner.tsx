"use client";

import { useEffect, useState } from "react";

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const COOKIE_NAME = "tentech_cookie_consent";

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(COOKIE_NAME);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeConsent(consent: ConsentState) {
  const value = JSON.stringify(consent);
  localStorage.setItem(COOKIE_NAME, value);
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function loadAnalytics() {
  if (document.getElementById("ga-script")) return;
  const script = document.createElement("script");
  script.id = "ga-script";
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
  script.async = true;
  document.head.appendChild(script);
}

function loadMarketing() {
  if (document.getElementById("meta-pixel")) return;
  const script = document.createElement("script");
  script.id = "meta-pixel";
  script.innerHTML = `
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init','XXXXXXXXXXXXXXXXX');fbq('track','PageView');
  `;
  document.head.appendChild(script);
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      applyConsent(saved);
    } else {
      setVisible(true);
    }
  }, []);

  function applyConsent(c: ConsentState) {
    if (c.analytics) loadAnalytics();
    if (c.marketing) loadMarketing();
  }

  function handleAcceptAll() {
    const all: ConsentState = { analytics: true, marketing: true, preferences: true };
    writeConsent(all);
    applyConsent(all);
    setVisible(false);
  }

  function handleSave() {
    writeConsent(consent);
    applyConsent(consent);
    setModalOpen(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <>
      {/* Banner */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#1a1a2e",
        color: "#fff",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.3)",
      }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, flex: 1, minWidth: 260 }}>
          🍪 Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{" "}
          <a href="/privacy" style={{ color: "#ff6b9d", textDecoration: "underline" }}>Política de Privacidade</a>.
        </p>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              padding: "8px 18px",
              borderRadius: 6,
              border: "1.5px solid #fff",
              background: "transparent",
              color: "#fff",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "opacity .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = ".75")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Personalizar
          </button>
          <button
            onClick={handleAcceptAll}
            style={{
              padding: "8px 18px",
              borderRadius: 6,
              border: "none",
              background: "hsl(353,100%,78%)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "transform .15s, box-shadow .15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(255,107,157,.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >
            Aceitar Todos
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(0,0,0,.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div style={{
            background: "#1a1a2e",
            color: "#fff",
            borderRadius: 12,
            padding: 28,
            maxWidth: 480,
            width: "100%",
            boxShadow: "0 20px 60px rgba(0,0,0,.5)",
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Preferências de Cookies</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.65)", marginBottom: 24, lineHeight: 1.6 }}>
              Escolha quais cookies você aceita. Os essenciais não podem ser desativados.
            </p>

            {[
              { key: "essential" as const, label: "Essenciais", desc: "Necessários para o funcionamento básico da loja.", forced: true },
              { key: "analytics" as const, label: "Analytics — Google Analytics", desc: "Ajuda a entender como você usa o site.", forced: false },
              { key: "marketing" as const, label: "Marketing — Meta Pixel", desc: "Permite anúncios personalizados nas redes sociais.", forced: false },
              { key: "preferences" as const, label: "Preferências", desc: "Salva suas configurações como idioma e tema.", forced: false },
            ].map(({ key, label, desc, forced }) => (
              <div key={key} style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,.1)",
              }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{label}</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,.55)", margin: "2px 0 0" }}>{desc}</p>
                </div>
                <label style={{ position: "relative", display: "inline-block", width: 44, height: 24, flexShrink: 0, marginTop: 2 }}>
                  <input
                    type="checkbox"
                    checked={forced || consent[key as keyof ConsentState]}
                    disabled={forced}
                    onChange={forced ? undefined : (e) => setConsent(prev => ({ ...prev, [key]: e.target.checked }))}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 12,
                    background: (forced || consent[key as keyof ConsentState]) ? "hsl(353,100%,78%)" : "rgba(255,255,255,.2)",
                    transition: "background .2s",
                    cursor: forced ? "not-allowed" : "pointer",
                  }}>
                    <span style={{
                      position: "absolute",
                      top: 3,
                      left: (forced || consent[key as keyof ConsentState]) ? 23 : 3,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "left .2s",
                    }} />
                  </span>
                </label>
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button
                onClick={() => setModalOpen(false)}
                style={{ padding: "9px 18px", borderRadius: 6, border: "1.5px solid rgba(255,255,255,.3)", background: "transparent", color: "#fff", fontSize: 13, cursor: "pointer" }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                style={{ padding: "9px 20px", borderRadius: 6, border: "none", background: "hsl(353,100%,78%)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              >
                Salvar Preferências
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
