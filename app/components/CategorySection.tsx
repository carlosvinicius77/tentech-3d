const categories = [
  { icon: "🎨", name: "Impressão Sob Demanda", count: 200 },
  { icon: "🎭", name: "Miniaturas",            count: 95  },
  { icon: "🏠", name: "Decoração",             count: 43  },
  { icon: "👤", name: "Personalizados",        count: 176 },
  { icon: "🔬", name: "Protótipos",            count: 28  },
  { icon: "🎮", name: "Games & RPG",           count: 67  },
  { icon: "🏆", name: "Troféus & Prêmios",     count: 34  },
  { icon: "💡", name: "Luminárias",            count: 19  },
];

export default function CategorySection() {
  return (
    <section className="section" style={{ background: "var(--white)", paddingTop: 32, paddingBottom: 32 }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Categorias</h2>
          <a href="#" className="section-link">Ver todas →</a>
        </div>
        <div className="categories-list">
          {categories.map((cat) => (
            <a key={cat.name} href="#" className="category-item">
              <div className="category-icon">{cat.icon}</div>
              <span className="category-name">{cat.name}</span>
              <span className="category-count">{cat.count} itens</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
