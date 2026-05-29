"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/account",           icon: "🏠", label: "Meu Painel" },
  { href: "/account/orders",    icon: "📦", label: "Meus Pedidos" },
  { href: "/account/profile",   icon: "👤", label: "Dados Pessoais" },
  { href: "/account/addresses", icon: "📍", label: "Endereços" },
  { href: "/account/wishlist",  icon: "❤️",  label: "Lista de Desejos" },
  { href: "/account/security",  icon: "🔒", label: "Segurança" },
];

const MOBILE_ITEMS = [
  { href: "/account",          icon: "🏠", label: "Painel" },
  { href: "/account/orders",   icon: "📦", label: "Pedidos" },
  { href: "/account/wishlist", icon: "❤️",  label: "Favoritos" },
  { href: "/account/profile",  icon: "👤", label: "Conta" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();

  function isActive(href: string) {
    if (href === "/account") return pathname === "/account";
    return pathname.startsWith(href);
  }

  function handleLogout() {
    document.cookie = "tentech_session=; path=/; max-age=0";
    router.push("/");
    router.refresh();
  }

  return (
    <>
      {/* ---- Desktop Sidebar ---- */}
      <aside className="account-sidebar">
        <div className="sidebar-user">
          <div className="sidebar-avatar">CV</div>
          <p className="sidebar-user-name">Carlos Vinicius</p>
          <p className="sidebar-user-email">carlos@tentech3d.com.br</p>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-nav-link${isActive(item.href) ? " active" : ""}`}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout}>
            <span className="sidebar-nav-icon">🚪</span>
            Sair
          </button>
        </div>
      </aside>

      {/* ---- Mobile Bottom Nav ---- */}
      <nav className="account-mobile-nav">
        <ul className="mobile-nav-list">
          {MOBILE_ITEMS.map((item) => (
            <li key={item.href} style={{ flex: 1 }}>
              <Link
                href={item.href}
                className={`mobile-nav-item${isActive(item.href) ? " active" : ""}`}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
