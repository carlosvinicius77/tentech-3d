"use client";

import { useState } from "react";
import Link from "next/link";

interface WishItem {
  id: number;
  emoji: string;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
}

const INITIAL_ITEMS: WishItem[] = [
  { id: 1, emoji: "🖨️", name: "Bambu Lab P1S Combo",            category: "Impressoras",  price: "R$ 4.299,90", oldPrice: "R$ 4.799,90" },
  { id: 2, emoji: "🎨", name: "Filamento PETG Transparente 1kg", category: "Filamentos",   price: "R$ 79,90"  },
  { id: 3, emoji: "📱", name: "Suporte Celular 3D Ajustável",     category: "Acessórios",   price: "R$ 39,90"  },
  { id: 4, emoji: "⚙️", name: "Kit Peças Reposição Ender 3 Pro",  category: "Peças",        price: "R$ 129,90" },
  { id: 5, emoji: "🔦", name: "Impressora Anycubic Photon M5s",   category: "Impressoras",  price: "R$ 2.199,90", oldPrice: "R$ 2.599,90" },
  { id: 6, emoji: "🧴", name: "Resina UV Premium 1L",             category: "Resinas",      price: "R$ 89,90"  },
];

export default function WishlistPage() {
  const [items, setItems] = useState<WishItem[]>(INITIAL_ITEMS);

  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <>
      <h1 className="account-greeting">Lista de Desejos ❤️</h1>

      {items.length === 0 ? (
        <div className="account-section">
          <div className="empty-state">
            <span className="empty-state-icon">🤍</span>
            <p className="empty-state-title">Sua lista está vazia</p>
            <p className="empty-state-text">
              Salve os produtos que você quer comprar para não perder as
              oportunidades!
            </p>
            <Link href="/" className="empty-state-btn">
              🛍️ Explorar Produtos
            </Link>
          </div>
        </div>
      ) : (
        <>
          <p
            style={{
              fontSize: 13,
              color: "var(--sonic-silver)",
              marginBottom: 20,
              marginTop: -12,
            }}
          >
            {items.length} {items.length === 1 ? "produto" : "produtos"} salvos
          </p>

          <div className="wishlist-grid">
            {items.map((item) => (
              <div key={item.id} className="wishlist-card">
                <div className="wishlist-image">
                  <div className="wishlist-image-inner">{item.emoji}</div>
                </div>
                <div className="wishlist-info">
                  <p className="wishlist-category">{item.category}</p>
                  <p className="wishlist-name">{item.name}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <p className="wishlist-price" style={{ margin: 0 }}>{item.price}</p>
                    {item.oldPrice && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--sonic-silver)",
                          textDecoration: "line-through",
                        }}
                      >
                        {item.oldPrice}
                      </span>
                    )}
                  </div>
                  <div className="wishlist-actions">
                    <button
                      className="wishlist-remove-btn"
                      onClick={() => removeItem(item.id)}
                      title="Remover dos favoritos"
                    >
                      🤍 Remover
                    </button>
                    <button className="wishlist-add-btn">
                      🛒 Adicionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
