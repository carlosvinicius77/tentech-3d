"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV = [
  {
    group: "VISÃO GERAL",
    items: [{ label: "Dashboard", icon: "📊", href: "/admin" }],
  },
  {
    group: "CATÁLOGO",
    items: [
      { label: "Produtos",   icon: "📦", href: "/admin/products" },
      { label: "Categorias", icon: "🏷️",  href: "/admin/categories" },
      { label: "Estoque",    icon: "🗄️",  href: "/admin/inventory" },
    ],
  },
  {
    group: "VENDAS",
    items: [
      { label: "Pedidos",   icon: "🛒", href: "/admin/orders" },
      { label: "Clientes",  icon: "👥", href: "/admin/customers" },
      { label: "Cupons",    icon: "🎟️", href: "/admin/coupons" },
    ],
  },
  {
    group: "MARKETING",
    items: [
      { label: "Banners",      icon: "🖼️",  href: "/admin/banners" },
      { label: "Newsletter",   icon: "📧",  href: "/admin/newsletter" },
      { label: "Avaliações",   icon: "⭐",  href: "/admin/reviews" },
    ],
  },
  {
    group: "CONFIG",
    items: [
      { label: "Configurações", icon: "⚙️", href: "/admin/settings" },
      { label: "Usuários",      icon: "👤", href: "/admin/users" },
    ],
  },
];

const BREADCRUMBS: Record<string, { trail: string; title: string }> = {
  "/admin":               { trail: "Admin",            title: "Dashboard" },
  "/admin/products":      { trail: "Admin › Catálogo", title: "Produtos" },
  "/admin/products/new":  { trail: "Admin › Produtos", title: "Novo Produto" },
  "/admin/categories":    { trail: "Admin › Catálogo", title: "Categorias" },
  "/admin/inventory":     { trail: "Admin › Catálogo", title: "Estoque" },
  "/admin/orders":        { trail: "Admin › Vendas",   title: "Pedidos" },
  "/admin/customers":     { trail: "Admin › Vendas",   title: "Clientes" },
  "/admin/coupons":       { trail: "Admin › Vendas",   title: "Cupons" },
  "/admin/banners":       { trail: "Admin › Marketing","title": "Banners" },
  "/admin/newsletter":    { trail: "Admin › Marketing","title": "Newsletter" },
  "/admin/reviews":       { trail: "Admin › Marketing","title": "Avaliações" },
  "/admin/settings":      { trail: "Admin › Config",  "title": "Configurações" },
  "/admin/users":         { trail: "Admin › Config",  "title": "Usuários" },
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const bc = BREADCRUMBS[pathname] ?? { trail: "Admin", title: "Página" };

  return (
    <div className="admin-root">
      {/* Mobile overlay */}
      <div
        className={`a-mobile-overlay${mobileOpen ? " show" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* SIDEBAR */}
      <aside className={`a-sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " open" : ""}`}>
        {/* Logo */}
        <div className="a-logo">
          <div className="a-logo-icon">T</div>
          {!collapsed && (
            <span className="a-logo-text">
              Ten<span>Tech</span> 3D
            </span>
          )}
          <button
            className="a-toggle"
            onClick={() => setCollapsed((c) => !c)}
            title={collapsed ? "Expandir" : "Colapsar"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Nav */}
        <nav className="a-nav">
          {NAV.map((section) => (
            <div key={section.group}>
              <div className="a-section-label">{section.group}</div>
              {section.items.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`a-nav-item${isActive ? " active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="a-nav-icon">{item.icon}</span>
                    {!collapsed && <span className="a-nav-label">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="a-sidebar-footer">
          <div className="a-avatar">CV</div>
          {!collapsed && (
            <div className="a-footer-info">
              <div className="a-footer-name">Carlos Vinicius</div>
              <div className="a-footer-role">Administrador</div>
            </div>
          )}
          {!collapsed && (
            <button className="a-logout-btn" title="Sair">🚪</button>
          )}
        </div>
      </aside>

      {/* MAIN */}
      <div className="a-main">
        {/* Topbar */}
        <header className="a-topbar">
          {/* Mobile menu button */}
          <button
            className="a-btn a-btn-ghost"
            style={{ display: "none" }}
            id="mobile-menu-btn"
            onClick={() => setMobileOpen((o) => !o)}
          >
            ☰
          </button>

          <div className="a-breadcrumb">
            <div className="a-breadcrumb-trail">{bc.trail}</div>
            <div className="a-breadcrumb-title">{bc.title}</div>
          </div>

          <div className="a-topbar-actions">
            <button className="a-notif-btn" title="Notificações">
              🔔
              <span className="a-notif-badge">5</span>
            </button>
            <div className="a-topbar-avatar" title="Carlos Vinicius">CV</div>
          </div>
        </header>

        {/* Page content */}
        <main className="a-content">{children}</main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
