export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-social">
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Facebook">👍</a>
            <a href="#" aria-label="WhatsApp">💬</a>
          </div>
          <p style={{ fontSize: 12, color: "hsl(0,0%,60%)" }}>
            🚚 Frete grátis para pedidos acima de R$200,00
          </p>
          <div className="header-top-actions">
            <a href="#">Sobre Nós</a>
            <a href="#">FAQ</a>
            <a href="#">Contato</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header-main">
        <div className="container">
          <a href="/" className="logo">
            Ten<span>Tech</span> 3D
          </a>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar produtos, filamentos, impressoras..."
            />
            <button aria-label="Buscar">🔍</button>
          </div>

          <div className="header-actions">
            <button className="header-action-btn">
              <span style={{ fontSize: 22 }}>👤</span>
              <span>Conta</span>
            </button>
            <button className="header-action-btn">
              <span style={{ fontSize: 22, position: "relative" }}>
                ❤️
                <span className="badge">3</span>
              </span>
              <span>Favoritos</span>
            </button>
            <button className="header-action-btn">
              <span style={{ fontSize: 22, position: "relative" }}>
                🛒
                <span className="badge">5</span>
              </span>
              <span>Carrinho</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
