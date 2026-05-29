"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  useCart,
  formatBRL,
  COUPONS,
  SHIPPING_THRESHOLD,
  SHIPPING_COST,
} from "@/lib/cart/CartContext";

const suggestions = [
  { icon: "🎭", title: "Miniatura RPG — Guerreiro Élfico", price: "R$49,90", bg: "linear-gradient(135deg,#fdebd0,#f5cba7)" },
  { icon: "👤", title: "Chaveiro 3D com Nome Personalizado", price: "R$19,90", bg: "linear-gradient(135deg,#fdedec,#fadbd8)" },
  { icon: "🏠", title: "Vaso Geométrico Decorativo", price: "R$39,90", bg: "linear-gradient(135deg,#eaf2fb,#d6eaf8)" },
  { icon: "🏆", title: "Troféu 3D Personalizado", price: "R$159,90", bg: "linear-gradient(135deg,#f9e79f,#f4d03f)" },
];

export default function CartPage() {
  const { state, dispatch, subtotal, discount, shipping, total, itemCount } = useCart();
  const { items, coupon } = state;

  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  const handleRemove = (id: string) => {
    setRemovingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      dispatch({ type: "REMOVE_ITEM", id });
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 320);
  };

  const handleQty = (id: string, qty: number) =>
    dispatch({ type: "UPDATE_QUANTITY", id, quantity: qty });

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      dispatch({ type: "APPLY_COUPON", code });
      setCouponMsg({ text: `Cupom "${code}" aplicado com sucesso!`, ok: true });
      setCouponInput("");
    } else {
      setCouponMsg({ text: "Cupom inválido ou expirado.", ok: false });
    }
  };

  const progressPct = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);
  const amountLeft = Math.max(SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <>
      <Header />
      <main className="cart-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="cart-breadcrumb">
            <Link href="/">Início</Link>
            <span>›</span>
            <span>Carrinho</span>
          </nav>

          <h1 className="cart-page-title">
            Meu Carrinho
            {itemCount > 0 && (
              <span className="cart-page-count">{itemCount} {itemCount === 1 ? "item" : "itens"}</span>
            )}
          </h1>

          {items.length === 0 ? (
            <div className="cart-page-empty">
              <span className="cart-empty-icon">🛒</span>
              <p className="cart-empty-title">Seu carrinho está vazio</p>
              <p className="cart-empty-sub">
                Explore nossos produtos e encontre algo especial!
              </p>
              <Link href="/" className="cart-cta-btn">
                Explorar produtos
              </Link>
            </div>
          ) : (
            <div className="cart-page-layout">
              {/* Left: items */}
              <div className="cart-page-items">
                {/* Shipping progress */}
                <div className="cart-shipping-bar">
                  {subtotal >= SHIPPING_THRESHOLD ? (
                    <p className="cart-shipping-msg free">
                      Frete grátis no seu pedido! 🎉
                    </p>
                  ) : (
                    <>
                      <p className="cart-shipping-msg">
                        Faltam <strong>{formatBRL(amountLeft)}</strong> para frete grátis!
                      </p>
                      <div className="cart-progress-track">
                        <div className="cart-progress-fill" style={{ width: `${progressPct}%` }} />
                      </div>
                    </>
                  )}
                </div>

                {/* Desktop table */}
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Preço</th>
                      <th>Quantidade</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr
                        key={item.id}
                        className={removingIds.has(item.id) ? "removing" : ""}
                      >
                        <td className="cart-table-product">
                          <div
                            className="cart-table-img"
                            style={{ background: "var(--cultured)" }}
                          >
                            <span style={{ fontSize: 28 }}>{item.image}</span>
                          </div>
                          <div>
                            <p className="cart-table-name">{item.name}</p>
                            {(item.material || item.acabamento) && (
                              <p className="cart-item-variation">
                                {item.material && `Material: ${item.material}`}
                                {item.material && item.acabamento && " · "}
                                {item.acabamento && `Acabamento: ${item.acabamento}`}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="cart-table-price">{formatBRL(item.price)}</td>
                        <td>
                          <div className="qty-control">
                            <button
                              className="qty-btn"
                              onClick={() => handleQty(item.id, item.quantity - 1)}
                            >
                              −
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() => handleQty(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="cart-table-total">
                          {formatBRL(item.price * item.quantity)}
                        </td>
                        <td>
                          <button
                            className="cart-remove-btn"
                            onClick={() => handleRemove(item.id)}
                            aria-label="Remover"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile cards */}
                <ul className="cart-mobile-list">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className={`cart-item${removingIds.has(item.id) ? " removing" : ""}`}
                    >
                      <div className="cart-item-image" style={{ background: "var(--cultured)" }}>
                        <span style={{ fontSize: 28 }}>{item.image}</span>
                      </div>
                      <div className="cart-item-info">
                        <p className="cart-item-name">{item.name}</p>
                        {(item.material || item.acabamento) && (
                          <p className="cart-item-variation">
                            {item.material && `Material: ${item.material}`}
                            {item.material && item.acabamento && " · "}
                            {item.acabamento && `Acabamento: ${item.acabamento}`}
                          </p>
                        )}
                        <p className="cart-item-price">{formatBRL(item.price)}</p>
                      </div>
                      <div className="cart-item-controls">
                        <div className="qty-control">
                          <button className="qty-btn" onClick={() => handleQty(item.id, item.quantity - 1)}>−</button>
                          <span className="qty-value">{item.quantity}</span>
                          <button className="qty-btn" onClick={() => handleQty(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <button className="cart-remove-btn" onClick={() => handleRemove(item.id)}>🗑️</button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="cart-page-actions">
                  <Link href="/" className="cart-continue-btn cart-continue-link">
                    ← Continuar comprando
                  </Link>
                  <button
                    className="cart-clear-btn"
                    onClick={() => dispatch({ type: "CLEAR_CART" })}
                  >
                    Esvaziar carrinho
                  </button>
                </div>
              </div>

              {/* Right: order summary */}
              <aside className="cart-page-summary">
                <h2 className="cart-summary-title">Resumo do Pedido</h2>

                {/* Coupon */}
                <div className="cart-coupon">
                  <div className="cart-coupon-row">
                    <input
                      type="text"
                      className="cart-coupon-input"
                      placeholder="Código do cupom"
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value); setCouponMsg(null); }}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    />
                    <button className="cart-coupon-btn" onClick={handleApplyCoupon}>
                      Aplicar
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={`cart-coupon-msg ${couponMsg.ok ? "ok" : "err"}`}>
                      {couponMsg.text}
                    </p>
                  )}
                  {coupon && (
                    <p className="cart-coupon-active">
                      ✅ Cupom <strong>{coupon.code}</strong> ativo
                      <button
                        className="cart-coupon-remove"
                        onClick={() => { dispatch({ type: "APPLY_COUPON", code: "" }); setCouponMsg(null); }}
                      >
                        remover
                      </button>
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="cart-summary">
                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <span>{formatBRL(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="cart-summary-row discount">
                      <span>Desconto cupom</span>
                      <span>− {formatBRL(discount)}</span>
                    </div>
                  )}
                  <div className="cart-summary-row">
                    <span>Frete</span>
                    <span className={shipping === 0 ? "free-shipping" : ""}>
                      {shipping === 0 ? "Grátis 🎉" : formatBRL(SHIPPING_COST)}
                    </span>
                  </div>
                  <div className="cart-summary-row total">
                    <span>Total</span>
                    <span>{formatBRL(total)}</span>
                  </div>
                </div>

                <button className="cart-cta-btn" style={{ width: "100%", marginTop: 8 }}>
                  Finalizar Compra →
                </button>

                <div className="cart-trust">
                  <span>🔒 Pagamento seguro</span>
                  <span>🚚 Entrega garantida</span>
                  <span>↩️ Troca fácil</span>
                </div>
              </aside>
            </div>
          )}

          {/* Suggestions */}
          <section className="cart-suggestions">
            <div className="section-header">
              <h2 className="section-title">Clientes também compraram</h2>
            </div>
            <div className="cart-suggestions-grid">
              {suggestions.map((s, i) => (
                <div key={i} className="cart-suggestion-card">
                  <div className="cart-suggestion-img" style={{ background: s.bg }}>
                    <span style={{ fontSize: 36 }}>{s.icon}</span>
                  </div>
                  <p className="cart-suggestion-name">{s.title}</p>
                  <p className="cart-suggestion-price">{s.price}</p>
                  <button className="add-to-cart-btn" style={{ width: "100%", fontSize: 12 }}>
                    🛒 Adicionar
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
