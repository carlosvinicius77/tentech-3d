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

export default function ProductCard({ product }: { product: Product }) {
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
        <button className="add-to-cart-btn">
          🛒 Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
