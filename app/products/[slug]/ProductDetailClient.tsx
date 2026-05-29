"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProductDetail } from "./productData";

function Stars({ rating, large }: { rating: number; large?: boolean }) {
  return (
    <span className="stars" style={large ? { fontSize: 18 } : {}}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

export default function ProductDetailClient({
  product,
}: {
  product: ProductDetail;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(
    product.materials[0]
  );
  const [selectedFinish, setSelectedFinish] = useState(product.finishes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("descricao");
  const [cep, setCep] = useState("");
  const [cepResult, setCepResult] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const tabs = [
    { id: "descricao", label: "Descrição" },
    { id: "especificacoes", label: "Especificações" },
    { id: "avaliacoes", label: `Avaliações (${product.reviewsList.length})` },
  ];

  function handleCepCalc() {
    if (cep.replace(/\D/g, "").length >= 8) setCepResult(true);
  }

  return (
    <div className="pd-page">
      {/* ── Breadcrumb ── */}
      <div className="pd-breadcrumb">
        <div className="container">
          <nav className="pd-breadcrumb-nav" aria-label="breadcrumb">
            <Link href="/">Início</Link>
            <span className="pd-bc-sep">›</span>
            <Link href="/#produtos">Miniaturas</Link>
            <span className="pd-bc-sep">›</span>
            <span className="pd-bc-current">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Main grid ── */}
      <section className="pd-main">
        <div className="container">
          <div className="pd-main-grid">
            {/* ── Gallery ── */}
            <div className="pd-gallery">
              <div className="pd-gallery-main">
                <div
                  className="pd-gallery-main-img"
                  style={{
                    background: product.images[selectedImage].bg,
                  }}
                >
                  <span>{product.images[selectedImage].emoji}</span>
                </div>
                <span className="pd-discount-badge">-{product.discount}%</span>
                <span className="pd-zoom-hint">🔍</span>
              </div>

              <div className="pd-gallery-thumbs">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    className={`pd-gallery-thumb ${
                      i === selectedImage ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(i)}
                    style={{ background: img.bg }}
                    aria-label={img.alt}
                    aria-pressed={i === selectedImage}
                  >
                    {img.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Info column ── */}
            <div className="pd-info">
              <p className="pd-category-label">{product.category}</p>
              <h1 className="pd-title">{product.title}</h1>

              <div className="pd-rating-row">
                <Stars rating={product.rating} large />
                <a href="#avaliacoes" className="pd-rating-link">
                  ({product.reviews} avaliações)
                </a>
              </div>

              <p className="pd-sku">SKU: {product.sku}</p>

              <div className="pd-price-block">
                <div className="pd-price-row">
                  <span className="pd-price-main">{product.priceFormatted}</span>
                  <span className="pd-price-old">
                    {product.oldPriceFormatted}
                  </span>
                  <span className="pd-price-badge">-{product.discount}%</span>
                </div>
                <p className="pd-installments">{product.installments}</p>
              </div>

              <hr className="pd-divider" />

              {/* Material */}
              <div className="pd-selector">
                <p className="pd-selector-label">
                  Material: <strong>{selectedMaterial}</strong>
                </p>
                <div className="pd-selector-options">
                  {product.materials.map((m) => (
                    <button
                      key={m}
                      className={`pd-option-btn ${
                        selectedMaterial === m ? "active" : ""
                      }`}
                      onClick={() => setSelectedMaterial(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Acabamento */}
              <div className="pd-selector">
                <p className="pd-selector-label">
                  Acabamento: <strong>{selectedFinish}</strong>
                </p>
                <div className="pd-selector-options">
                  {product.finishes.map((f) => (
                    <button
                      key={f}
                      className={`pd-option-btn ${
                        selectedFinish === f ? "active" : ""
                      }`}
                      onClick={() => setSelectedFinish(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="pd-selector">
                <p className="pd-selector-label">Quantidade:</p>
                <div className="pd-qty-control">
                  <button
                    className="pd-qty-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Diminuir quantidade"
                  >
                    −
                  </button>
                  <span className="pd-qty-value">{quantity}</span>
                  <button
                    className="pd-qty-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Aumentar quantidade"
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="pd-stock">✓ {product.stock} unidades disponíveis</p>

              {/* CTA buttons */}
              <div className="pd-buttons">
                <button className="pd-cart-btn">🛒 Adicionar ao Carrinho</button>
                <button className="pd-buy-btn">Comprar Agora</button>
              </div>

              {/* Wishlist + share */}
              <div className="pd-actions-row">
                <button
                  className={`pd-action-link ${wishlist ? "active" : ""}`}
                  onClick={() => setWishlist((w) => !w)}
                >
                  {wishlist ? "❤️" : "🤍"} Lista de Desejos
                </button>
                <button className="pd-action-link">📤 Compartilhar</button>
              </div>

              {/* Shipping calculator */}
              <div className="pd-shipping-box">
                <p className="pd-shipping-title">📦 Calcular Frete</p>
                <div className="pd-cep-row">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) =>
                      setCep(e.target.value.replace(/\D/g, "").slice(0, 8))
                    }
                    className="pd-cep-input"
                    maxLength={9}
                  />
                  <button className="pd-cep-btn" onClick={handleCepCalc}>
                    Calcular
                  </button>
                </div>
                {cepResult && (
                  <div className="pd-cep-result">
                    <p className="pd-cep-option">
                      📦 Padrão — R$12,90 (5–7 dias úteis)
                    </p>
                    <p className="pd-cep-option">
                      ⚡ Express — R$24,90 (2–3 dias úteis)
                    </p>
                    <p className="pd-cep-free">
                      ✓ Frete grátis em compras acima de R$200
                    </p>
                  </div>
                )}
              </div>

              {/* Trust badges */}
              <div className="pd-trust">
                <span>🔒 Compra Segura</span>
                <span>🔄 Troca em 30 dias</span>
                <span>🚚 Frete grátis acima de R$200</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tabs ── */}
      <section className="pd-tabs-section" id="avaliacoes">
        <div className="container">
          <div className="pd-tabs-header" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`pd-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pd-tab-panel">
            {activeTab === "descricao" && (
              <div className="pd-description">
                {product.descriptionParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {activeTab === "especificacoes" && (
              <table className="pd-spec-table">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label}>
                      <td className="pd-spec-label">{spec.label}</td>
                      <td className="pd-spec-value">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === "avaliacoes" && (
              <div className="pd-reviews">
                <div className="pd-reviews-summary">
                  <div className="pd-reviews-score">
                    <span className="pd-score-big">{product.rating}.0</span>
                    <Stars rating={product.rating} large />
                    <span className="pd-score-total">
                      {product.reviews} avaliações
                    </span>
                  </div>
                </div>

                <div className="pd-reviews-list">
                  {product.reviewsList.map((review, i) => (
                    <div key={i} className="pd-review-item">
                      <div className="pd-review-header">
                        <div className="pd-review-avatar">{review.avatar}</div>
                        <div className="pd-review-meta">
                          <span className="pd-review-author">
                            {review.author}
                          </span>
                          <Stars rating={review.rating} />
                        </div>
                        <span className="pd-review-date">{review.date}</span>
                      </div>
                      <p className="pd-review-text">{review.text}</p>
                      <p className="pd-review-helpful">
                        👍 {review.helpful} pessoas acharam útil
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Related products ── */}
      <section className="pd-related">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Você também pode gostar</h2>
          </div>
          <div className="pd-related-grid">
            {product.relatedProducts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/products/${rp.slug}`}
                className="product-card"
                style={{ display: "block" }}
              >
                {rp.badge && (
                  <span className="product-badge">{rp.badge}</span>
                )}
                <div className="product-image-wrapper">
                  <div
                    className="product-image"
                    style={{ background: rp.iconBg }}
                  >
                    {rp.icon}
                  </div>
                </div>
                <div className="product-content">
                  <p className="product-category">{rp.category}</p>
                  <h3 className="product-title">{rp.title}</h3>
                  <div className="product-rating">
                    <Stars rating={rp.rating} />
                    <span className="rating-count">({rp.reviews})</span>
                  </div>
                  <div className="product-price">
                    <span className="price-now">{rp.price}</span>
                    {rp.oldPrice && (
                      <span className="price-old">{rp.oldPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
