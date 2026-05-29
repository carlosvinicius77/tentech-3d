"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";

interface Product {
  badge?: string;
  badgeType?: "default" | "new" | "sale";
  icon: string;
  category: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
  oldPrice?: string;
  iconBg?: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

function parsePrice(price: string): number {
  return parseFloat(
    price.replace(/[R$\s]/g, "").replace(/\./g, "").replace(",", ".")
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const id = slugify(product.title);
    dispatch({
      type: "ADD_ITEM",
      item: {
        id,
        name: product.title,
        slug: id,
        price: parsePrice(product.price),
        originalPrice: product.oldPrice ? parsePrice(product.oldPrice) : undefined,
        image: product.icon,
        material: "PLA",
        acabamento: "Natural",
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card">
      {product.badge && (
        <span className={`product-badge ${product.badgeType ?? ""}`}>
          {product.badge}
        </span>
      )}

      <div className="product-image-wrapper">
        <div
          className="product-image"
          style={{ background: product.iconBg ?? "var(--cultured)" }}
        >
          {product.icon}
        </div>
        <div className="product-actions">
          <button className="action-btn" title="Favoritar">❤️</button>
          <button className="action-btn" title="Visualizar">👁️</button>
          <button className="action-btn" title="Comparar">🔄</button>
        </div>
      </div>

      <div className="product-content">
        <p className="product-category">{product.category}</p>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <Stars rating={product.rating} />
          <span className="rating-count">({product.reviews})</span>
        </div>
        <div className="product-price">
          <span className="price-now">{product.price}</span>
          {product.oldPrice && (
            <span className="price-old">{product.oldPrice}</span>
          )}
        </div>
        <button
          className={`add-to-cart-btn${added ? " added" : ""}`}
          onClick={handleAddToCart}
        >
          {added ? "✓ Adicionado!" : "🛒 Adicionar ao Carrinho"}
        </button>
      </div>
    </div>
  );
}
