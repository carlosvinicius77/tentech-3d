"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  useCart,
  formatBRL,
  COUPONS,
  SHIPPING_THRESHOLD,
  SHIPPING_COST,
} from "@/lib/cart/CartContext";

export default function CartDrawer() {
  const { state, dispatch, subtotal, discount, shipping, total, itemCount } = useCart();
  const { drawerOpen, items, coupon } = state;

  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  const close = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [dispatch]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen, close]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

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
      setCouponMsg({ text: `Cupom "${code}" aplicado!`, ok: true });
      setCouponInput("");
    } else {
      setCouponMsg({ text: "Cupom inválido ou expirado.", ok: false });
    }
  };

  const progressPct = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);
  const amountLeft = Math.max(SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${drawerOpen ? " open" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer${drawerOpen ? " open" : ""}`}
        aria-label="Carrinho de compras"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">
            Carrinho
            {itemCount > 0 && (
              <span className="cart-drawer-count">{itemCount} {itemCount === 1 ? "item" : "itens"}</span>
            )}
          </h2>
          <button className="cart-drawer-close" onClick={close} aria-label="Fechar carrinho">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <p className="cart-empty-title">Seu carrinho está vazio</p>
            <p className="cart-empty-sub">Adicione produtos incríveis e volte aqui!</p>
            <button className="cart-cta-btn" onClick={close}>
              Explorar produtos
            </button>
          </div>
        ) : (
          <div className="cart-drawer-body">
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
                    <div
                      className="cart-progress-fill"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Items list */}
            <ul className="cart-items-list">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={`cart-item${removingIds.has(item.id) ? " removing" : ""}`}
                >
                  <div
                    className="cart-item-image"
                    style={{ background: "var(--cultured)" }}
                  >
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
                      <button
                        className="qty-btn"
                        onClick={() => handleQty(item.id, item.quantity - 1)}
                        aria-label="Diminuir quantidade"
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleQty(item.id, item.quantity + 1)}
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cart-remove-btn"
                      onClick={() => handleRemove(item.id)}
                      aria-label="Remover item"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Coupon */}
            <div className="cart-coupon">
              <div className="cart-coupon-row">
                <input
                  type="text"
                  className="cart-coupon-input"
                  placeholder="Código do cupom"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value);
                    setCouponMsg(null);
                  }}
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
                    onClick={() => {
                      dispatch({ type: "APPLY_COUPON", code: "" });
                      setCouponMsg(null);
                    }}
                  >
                    remover
                  </button>
                </p>
              )}
            </div>

            {/* Summary */}
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

            {/* Actions */}
            <div className="cart-actions">
              <Link href="/cart" className="cart-cta-btn" onClick={close}>
                Finalizar Compra →
              </Link>
              <button className="cart-continue-btn" onClick={close}>
                Continuar comprando
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
