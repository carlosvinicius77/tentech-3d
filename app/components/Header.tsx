export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <div className="header-top">
        <div className="header-top-inner">
          <div className="header-top-social">
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Facebook">👍</a>
            <a href="#" aria-label="WhatsApp">💬</a>
          </div>
          <p className="header-top-banner">
            🚚 Frete grátis para pedidos acima de R$200,00
          </p>
          <div className="header-top-links">
            <a href="#">Sobre Nós</a>
            <a href="#">FAQ</a>
            <a href="#">Contato</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header-main">
        <div className="header-main-inner">
          {/* Row 1: Logo + Actions */}
          <div className="header-row1">
            <a href="/" className="logo">
              Ten<span>Tech</span> 3D
            </a>

            {/* Desktop search (hidden on mobile) */}
            <div className="search-bar search-desktop">
              <input type="text" placeholder="Buscar produtos, filamentos, impressoras..." />
              <button aria-label="Buscar">🔍</button>
            </div>

            <div className="header-actions">
              <button className="header-action-btn">
                <span className="action-icon">👤</span>
                <span className="action-label">Conta</span>
              </button>
              <button className="header-action-btn">
                <span className="action-icon" style={{ position: "relative", display: "inline-block" }}>
                  ❤️
                  <span className="badge">3</span>
                </span>
                <span className="action-label">Favoritos</span>
              </button>
              <button className="header-action-btn">
                <span className="action-icon" style={{ position: "relative", display: "inline-block" }}>
                  🛒
                  <span className="badge">5</span>
                </span>
                <span className="action-label">Carrinho</span>
              </button>
            </div>
          </div>

          {/* Row 2: Mobile search (hidden on desktop) */}
          <div className="search-bar search-mobile">
            <input type="text" placeholder="Buscar produtos..." />
            <button aria-label="Buscar">🔍</button>
          </div>
        </div>
      </header>
    </>
  );
}
