"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const tabs = ["Mais Vendidos", "Novidades", "Em Alta", "Mais Avaliados"];

const allProducts = {
  "Mais Vendidos": [
    { icon: "🎭", category: "Miniaturas",     title: "Miniatura RPG — Guerreiro Élfico Customizado",    rating: 5, reviews: 214, price: "R$49,90",  oldPrice: "R$69,90",  badge: "28%",  iconBg: "linear-gradient(135deg,#fdebd0,#f5cba7)" },
    { icon: "👤", category: "Personalizados", title: "Chaveiro 3D com Nome Personalizado",               rating: 5, reviews: 388, price: "R$19,90",  oldPrice: "R$29,90",  badge: "33%",  iconBg: "linear-gradient(135deg,#fdedec,#fadbd8)" },
    { icon: "🏠", category: "Decoração",      title: "Vaso Geométrico Decorativo — Design Exclusivo",    rating: 4, reviews: 53,  price: "R$39,90",  oldPrice: "R$55,90",  badge: "28%",  iconBg: "linear-gradient(135deg,#eaf2fb,#d6eaf8)" },
    { icon: "🏆", category: "Troféus",        title: "Troféu 3D Personalizado para Empresa",             rating: 5, reviews: 298, price: "R$159,90",                                         iconBg: "linear-gradient(135deg,#f9e79f,#f4d03f)" },
    { icon: "👤", category: "Personalizados", title: "Porta-Retrato 3D com Foto Personalizada",          rating: 5, reviews: 176, price: "R$89,90",                                         iconBg: "linear-gradient(135deg,#f9ebea,#fadbd8)" },
    { icon: "🎭", category: "Miniaturas",     title: "Miniatura de Pet (a partir da sua foto)",          rating: 5, reviews: 421, price: "R$79,90",                                         iconBg: "linear-gradient(135deg,#fef9e7,#fdebd0)" },
    { icon: "💡", category: "Luminárias",     title: "Luminária LED Impressão 3D Personalizada",         rating: 5, reviews: 9,   price: "R$119,90", badge: "Novo", badgeType: "new" as const, iconBg: "linear-gradient(135deg,#fdebd0,#fadbd8)" },
    { icon: "🏠", category: "Decoração",      title: "Suporte Organizer Mesa Home Office",               rating: 4, reviews: 134, price: "R$54,90",  oldPrice: "R$74,90",  badge: "26%",  iconBg: "linear-gradient(135deg,#e8daef,#d7bde2)" },
  ],
  "Novidades": [
    { icon: "🎭", category: "Miniaturas",     title: "Coleção Dragões — Pack com 5 Miniaturas",          rating: 5, reviews: 44,  price: "R$189,90", badge: "Novo", badgeType: "new" as const, iconBg: "linear-gradient(135deg,#f0b27a,#e59866)" },
    { icon: "🎮", category: "Games & RPG",    title: "Cenário 3D Dungeon — Set Completo",                rating: 5, reviews: 18,  price: "R$299,90", badge: "Novo", badgeType: "new" as const, iconBg: "linear-gradient(135deg,#2c2c2c,#444)" },
    { icon: "💡", category: "Luminárias",     title: "Abajur Geométrico Diamante P/LED",                 rating: 4, reviews: 11,  price: "R$89,90",  badge: "Novo", badgeType: "new" as const, iconBg: "linear-gradient(135deg,#d6eaf8,#aed6f1)" },
    { icon: "🏆", category: "Troféus",        title: "Medalha 3D Personalizada — Eventos Esportivos",   rating: 5, reviews: 7,   price: "R$34,90",  badge: "Novo", badgeType: "new" as const, iconBg: "linear-gradient(135deg,#d2b4de,#bb8fce)" },
    { icon: "🔬", category: "Protótipos",     title: "Peça Técnica Sob Encomenda (Envie o STL)",         rating: 5, reviews: 25,  price: "R$49,90",  badge: "Novo", badgeType: "new" as const, iconBg: "linear-gradient(135deg,#d6eaf8,#aed6f1)" },
    { icon: "🏠", category: "Decoração",      title: "Escultura Abstrata Parede — 3 Peças",              rating: 5, reviews: 9,   price: "R$149,90", badge: "Novo", badgeType: "new" as const, iconBg: "linear-gradient(135deg,#fdebd0,#fadbd8)" },
  ],
  "Em Alta": [
    { icon: "🎭", category: "Miniaturas",     title: "Pack Miniaturas Star Wars — 10 Peças",             rating: 5, reviews: 456, price: "R$249,90", oldPrice: "R$319,90", badge: "21%", iconBg: "linear-gradient(135deg,#17202a,#2c3e50)" },
    { icon: "👤", category: "Personalizados", title: "Busto Personalizado do Rosto (do seu arquivo)",    rating: 5, reviews: 203, price: "R$199,90",                                        iconBg: "linear-gradient(135deg,#fdedec,#fadbd8)" },
    { icon: "🏠", category: "Decoração",      title: "Vaso Bioluminescente Efeito Floresta",             rating: 5, reviews: 203, price: "R$64,90",                                         iconBg: "linear-gradient(135deg,#1abc9c,#16a085)" },
    { icon: "🎮", category: "Games & RPG",    title: "Dado Gigante Decorativo D20 — 15cm",               rating: 4, reviews: 89,  price: "R$44,90",  oldPrice: "R$59,90", badge: "24%",   iconBg: "linear-gradient(135deg,#fdfefe,#f2f3f4)" },
    { icon: "👤", category: "Personalizados", title: "Tag de Mala com Nome 3D",                          rating: 5, reviews: 312, price: "R$24,90",                                         iconBg: "linear-gradient(135deg,#eafaf1,#d5f5e3)" },
    { icon: "💡", category: "Luminárias",     title: "Luminária Mapa Mundi Recortado LED",               rating: 4, reviews: 134, price: "R$129,90", oldPrice: "R$169,90", badge: "23%",   iconBg: "linear-gradient(135deg,#e8daef,#d7bde2)" },
  ],
  "Mais Avaliados": [
    { icon: "🎭", category: "Miniaturas",     title: "Miniatura Personalizada de Pet (Foto)",            rating: 5, reviews: 534, price: "R$79,90",  oldPrice: "R$99,90",  badge: "20%",  iconBg: "linear-gradient(135deg,#fef9e7,#fdebd0)" },
    { icon: "👤", category: "Personalizados", title: "Chaveiro 3D com Nome Personalizado",               rating: 5, reviews: 672, price: "R$19,90",                                         iconBg: "linear-gradient(135deg,#fdedec,#fadbd8)" },
    { icon: "🏆", category: "Troféus",        title: "Troféu 3D Personalizado para Empresa",             rating: 5, reviews: 298, price: "R$159,90",                                         iconBg: "linear-gradient(135deg,#f9e79f,#f4d03f)" },
    { icon: "🏠", category: "Decoração",      title: "Vaso Geométrico Decorativo — Design Exclusivo",    rating: 4, reviews: 203, price: "R$39,90",                                         iconBg: "linear-gradient(135deg,#eaf2fb,#d6eaf8)" },
    { icon: "🎮", category: "Games & RPG",    title: "Pack Miniaturas Star Wars — 10 Peças",             rating: 5, reviews: 456, price: "R$249,90", oldPrice: "R$319,90", badge: "21%",   iconBg: "linear-gradient(135deg,#17202a,#2c3e50)" },
    { icon: "💡", category: "Luminárias",     title: "Luminária LED Impressão 3D Personalizada",         rating: 5, reviews: 189, price: "R$119,90",                                         iconBg: "linear-gradient(135deg,#fdebd0,#fadbd8)" },
  ],
};

const filterGroups = [
  {
    title: "Categoria",
    items: [
      { label: "Miniaturas",      count: 95  },
      { label: "Decoração",       count: 43  },
      { label: "Personalizados",  count: 176 },
      { label: "Troféus",         count: 34  },
      { label: "Luminárias",      count: 19  },
      { label: "Protótipos",      count: 28  },
      { label: "Games & RPG",     count: 67  },
    ],
  },
  {
    title: "Material",
    items: [
      { label: "PLA",    count: 120 },
      { label: "PETG",   count: 45  },
      { label: "Resina", count: 88  },
      { label: "TPU",    count: 22  },
      { label: "ABS",    count: 34  },
    ],
  },
  {
    title: "Acabamento",
    items: [
      { label: "Natural (sem pintura)", count: 210 },
      { label: "Pintado à mão",         count: 64  },
      { label: "Lixado e polido",       count: 38  },
      { label: "Envernizado",           count: 47  },
    ],
  },
];

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState("Mais Vendidos");
  const products = allProducts[activeTab as keyof typeof allProducts];

  return (
    <section className="section">
      <div className="container">
        <div className="products-wrapper">
          <aside className="sidebar">
            <h2 className="sidebar-title">Filtrar Produtos</h2>

            <div className="filter-group">
              <p className="filter-group-title">Faixa de Preço</p>
              <div className="price-range">
                <input type="range" min={0} max={500} defaultValue={250} />
                <div className="price-range-values">
                  <span>R$0</span>
                  <span>R$500</span>
                </div>
              </div>
            </div>

            {filterGroups.map((group) => (
              <div key={group.title} className="filter-group">
                <p className="filter-group-title">{group.title}</p>
                {group.items.map((item) => (
                  <div key={item.label} className="filter-item">
                    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                      <input type="checkbox" style={{ accentColor: "var(--salmon-pink)" }} />
                      {item.label}
                    </label>
                    <span className="filter-count">{item.count}</span>
                  </div>
                ))}
              </div>
            ))}

            <div className="filter-group">
              <p className="filter-group-title">Avaliação</p>
              {[5, 4, 3, 2].map((r) => (
                <div key={r} className="filter-item">
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <input type="checkbox" style={{ accentColor: "var(--salmon-pink)" }} />
                    <span style={{ color: "var(--sandy-brown)" }}>{"★".repeat(r)}{"☆".repeat(5 - r)}</span>
                  </label>
                </div>
              ))}
            </div>
          </aside>

          <div>
            <div className="tabs-header">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="tab-content active">
              {products.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
