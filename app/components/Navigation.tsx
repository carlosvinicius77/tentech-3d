const navItems = [
  { label: "Início", href: "/" },
  { label: "Filamentos", href: "#filamentos" },
  { label: "Impressoras", href: "#impressoras" },
  { label: "Impressão Personalizada", href: "#personalizado", badge: "Popular" },
  { label: "Miniaturas", href: "#miniaturas" },
  { label: "Acessórios", href: "#acessorios" },
  { label: "Promoções", href: "#promocoes", badge: "Hot" },
  { label: "Blog", href: "#blog" },
];

export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.href} className="nav-item">
              <a href={item.href} className="nav-link">
                {item.label}
                {item.badge && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
