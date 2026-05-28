"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const tabs = ["Mais Vendidos", "Novidades", "Em Alta", "Mais Avaliados"];

const allProducts = {
  "Mais Vendidos": [
    { icon: "🧵", category: "Filamentos", title: "Filamento PLA Premium 1kg — Branco Neve", rating: 5, reviews: 128, price: "R$89,90", oldPrice: "R$119,90", badge: "20%", iconBg: "linear-gradient(135deg, #f0f0f0, #e0e0e0)" },
    { icon: "🧵", category: "Filamentos", title: "Filamento PETG Transparente 1kg", rating: 4, reviews: 87, price: "R$109,90", iconBg: "linear-gradient(135deg, #e8f4f8, #c8e6f0)", badge: "Novo", badgeType: "new" as const },
    { icon: "🎭", category: "Miniaturas", title: "Miniatura RPG — Guerreiro Élfico Customizado", rating: 5, reviews: 214, price: "R$49,90", oldPrice: "R$69,90", badge: "28%", iconBg: "linear-gradient(135deg, #fdebd0, #f5cba7)" },
    { icon: "⚙️", category: "Peças", title: "Hot-End E3D V6 Compatível Ender 3", rating: 4, reviews: 63, price: "R$59,90", iconBg: "linear-gradient(135deg, #d5e8d4, #b8d4b5)" },
    { icon: "🧵", category: "Filamentos", title: "Filamento TPU Flexível 95A 1kg — Preto", rating: 5, reviews: 42, price: "R$129,90", oldPrice: "R$159,90", badge: "Sale", badgeType: "sale" as const, iconBg: "linear-gradient(135deg, #2c2c2c, #444)" },
    { icon: "🔧", category: "Acessórios", title: "Kit Ferramentas Manutenção Impressora 3D", rating: 4, reviews: 95, price: "R$79,90", iconBg: "linear-gradient(135deg, #fdf2e9, #fde8d0)" },
    { icon: "🎨", category: "Personalizados", title: "Porta-Retrato 3D Personalizado com Foto", rating: 5, reviews: 176, price: "R$89,90", iconBg: "linear-gradient(135deg, #f9ebea, #fadbd8)" },
    { icon: "🏠", category: "Decoração", title: "Vaso Geométrico Decorativo — Design Exclusivo", rating: 4, reviews: 53, price: "R$39,90", oldPrice: "R$55,90", badge: "28%", iconBg: "linear-gradient(135deg, #eaf2fb, #d6eaf8)" },
  ],
  "Novidades": [
    { icon: "🖨️", category: "Impressoras", title: "Bambu Lab A1 Mini — Impressora FDM Multi-cor", rating: 5, reviews: 31, price: "R$2.499,00", badge: "Novo", badgeType: "new" as const, iconBg: "linear-gradient(135deg, #2c3e50, #3d5a80)" },
    { icon: "🧵", category: "Filamentos", title: "Filamento PLA Silk — Efeito Metálico Dourado", rating: 4, reviews: 18, price: "R$99,90", badge: "Novo", badgeType: "new" as const, iconBg: "linear-gradient(135deg, #f9e79f, #f4d03f)" },
    { icon: "🔬", category: "Protótipos", title: "Resina UV Transparente Premium 500ml", rating: 5, reviews: 25, price: "R$149,90", badge: "Novo", badgeType: "new" as const, iconBg: "linear-gradient(135deg, #d6eaf8, #aed6f1)" },
    { icon: "🎭", category: "Miniaturas", title: "Coleção Dragões — Pack com 5 Miniaturas", rating: 5, reviews: 44, price: "R$189,90", badge: "Novo", badgeType: "new" as const, iconBg: "linear-gradient(135deg, #f0b27a, #e59866)" },
    { icon: "⚙️", category: "Peças", title: "Placa Silicone Antivibração 4un", rating: 4, reviews: 12, price: "R$24,90", badge: "Novo", badgeType: "new" as const, iconBg: "linear-gradient(135deg, #d2b4de, #bb8fce)" },
    { icon: "🏠", category: "Decoração", title: "Luminária LED Impressão 3D Personalizada", rating: 5, reviews: 9, price: "R$119,90", badge: "Novo", badgeType: "new" as const, iconBg: "linear-gradient(135deg, #fdebd0, #fadbd8)" },
  ],
  "Em Alta": [
    { icon: "🎨", category: "Personalizados", title: "Chaveiro 3D Personalizado com Nome", rating: 5, reviews: 388, price: "R$19,90", oldPrice: "R$29,90", badge: "33%", iconBg: "linear-gradient(135deg, #fdedec, #fadbd8)" },
    { icon: "🧵", category: "Filamentos", title: "Filamento ABS Premium 1kg — Cinza", rating: 4, reviews: 203, price: "R$94,90", iconBg: "linear-gradient(135deg, #d5d8dc, #aab7b8)" },
    { icon: "🔧", category: "Acessórios", title: "Cama de Impressão Magnética Flexível PEI", rating: 5, reviews: 156, price: "R$69,90", iconBg: "linear-gradient(135deg, #eafaf1, #d5f5e3)" },
    { icon: "⚙️", category: "Peças", title: "Extrusor Dual Drive BMG Clone", rating: 4, reviews: 89, price: "R$44,90", oldPrice: "R$59,90", badge: "24%", iconBg: "linear-gradient(135deg, #fdfefe, #f2f3f4)" },
    { icon: "🎭", category: "Miniaturas", title: "Miniatura Personalizada de Pet (Foto)", rating: 5, reviews: 421, price: "R$79,90", iconBg: "linear-gradient(135deg, #fef9e7, #fdebd0)" },
    { icon: "🏠", category: "Decoração", title: "Suporte Organizer Mesa Home Office", rating: 4, reviews: 134, price: "R$54,90", oldPrice: "R$74,90", badge: "26%", iconBg: "linear-gradient(135deg, #e8daef, #d7bde2)" },
  ],
  "Mais Avaliados": [
    { icon: "🖨️", category: "Impressoras", title: "Ender 3 V3 SE — Creality (Montada)", rating: 5, reviews: 534, price: "R$1.199,00", oldPrice: "R$1.499,00", badge: "20%", iconBg: "linear-gradient(135deg, #1a1a2e, #16213e)" },
    { icon: "🧵", category: "Filamentos", title: "Filamento PLA+ Resistente 1kg — Diversas Cores", rating: 5, reviews: 672, price: "R$99,90", iconBg: "linear-gradient(135deg, #f7dc6f, #f0b27a, #82e0aa)" },
    { icon: "🎨", category: "Personalizados", title: "Troféu 3D Personalizado para Empresa", rating: 5, reviews: 298, price: "R$159,90", iconBg: "linear-gradient(135digits, #f9e79f, #f4d03f)" },
    { icon: "🔧", category: "Acessórios", title: "Lubrificante PTFE Grease para Trilhos", rating: 5, reviews: 189, price: "R$29,90", iconBg: "linear-gradient(135deg, #d5e8d4, #a9dfbf)" },
    { icon: "🎭", category: "Miniaturas", title: "Pack Miniaturas Star Wars — 10 Peças", rating: 5, reviews: 456, price: "R$249,90", oldPrice: "R$319,90", badge: "21%", iconBg: "linear-gradient(135deg, #17202a, #2c3e50)" },
    { icon: "🏠", category: "Decoração", title: "Vaso Bioluminescente Efeito Floresta", rating: 5, reviews: 203, price: "R$64,90", iconBg: "linear-gradient(135deg, #1abc9c, #16a085)" },
  ],
};

const filterGroups = [
  {
    title: "Categoria",
    items: [
      { label: "Filamentos", count: 48 },
      { label: "Impressoras", count: 12 },
      { label: "Miniaturas", count: 95 },
      { label: "Personalizados", count: 200 },
      { label: "Acessórios", count: 134 },
    ],
  },
  {
    title: "Material",
    items: [
      { label: "PLA", count: 32 },
      { label: "PETG", count: 18 },
      { label: "ABS", count: 14 },
      { label: "TPU", count: 8 },
      { label: "Resina", count: 22 },
    ],
  },
  {
    title: "Marca",
    items: [
      { label: "Creality", count: 24 },
      { label: "Bambu Lab", count: 8 },
      { label: "E3D", count: 15 },
      { label: "TenTech Original", count: 40 },
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
          {/* Sidebar */}
          <aside className="sidebar">
            <h2 className="sidebar-title">Filtrar Produtos</h2>

            <div className="filter-group">
              <p className="filter-group-title">Faixa de Preço</p>
              <div className="price-range">
                <input type="range" min={0} max={3000} defaultValue={1500} />
                <div className="price-range-values">
                  <span>R$0</span>
                  <span>R$3.000</span>
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

          {/* Products */}
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
