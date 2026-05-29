import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Meu Painel — TenTech 3D" };

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  aguardando: { label: "Aguardando",   cls: "status-aguardando" },
  pago:       { label: "Pago",         cls: "status-pago" },
  producao:   { label: "Em Produção",  cls: "status-producao" },
  enviado:    { label: "Enviado",      cls: "status-enviado" },
  entregue:   { label: "Entregue",     cls: "status-entregue" },
  cancelado:  { label: "Cancelado",    cls: "status-cancelado" },
};

const RECENT_ORDERS = [
  { id: "TT-2025-047", date: "23/05/2025", items: "Suporte Celular 3D, Case iPhone 15", total: 189.9,  status: "enviado"   },
  { id: "TT-2025-039", date: "10/05/2025", items: "Filamento PLA Gold 1kg",             total:  89.9,  status: "entregue"  },
  { id: "TT-2025-031", date: "28/04/2025", items: "Kit Impressão 3D Básico × 3",        total: 347.7,  status: "entregue"  },
  { id: "TT-2025-018", date: "02/03/2025", items: "Impressora Bambu A1 Mini",            total: 2199.0, status: "entregue"  },
  { id: "TT-2025-005", date: "14/01/2025", items: "Resina UV Standard 1L",              total:  79.9,  status: "cancelado" },
];

const FAVORITES = [
  { id: 1, emoji: "🖨️", name: "Bambu Lab P1S Combo",         price: "R$ 4.299,90", href: "/products/bambu-p1s" },
  { id: 2, emoji: "🎨", name: "Filamento PETG Transparente", price: "R$ 79,90",    href: "/products/petg-transparente" },
  { id: 3, emoji: "📱", name: "Suporte Ajustável Celular",    price: "R$ 39,90",    href: "/products/suporte-celular" },
  { id: 4, emoji: "⚙️", name: "Kit Peças Ender 3 Pro",        price: "R$ 129,90",   href: "/products/kit-ender3" },
];

function fmt(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

export default function AccountPage() {
  return (
    <>
      <h1 className="account-greeting">Olá, Carlos! 👋</h1>

      {/* Summary cards */}
      <div className="account-summary-grid">
        <div className="summary-card">
          <div className="summary-card-icon">📦</div>
          <div className="summary-card-value">12</div>
          <div className="summary-card-label">pedidos realizados</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-icon">⏳</div>
          <div className="summary-card-value">2</div>
          <div className="summary-card-label">em processamento</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-icon">💰</div>
          <div className="summary-card-value price">R$ 3.847,60</div>
          <div className="summary-card-label">em compras</div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="account-section">
        <div className="account-section-header">
          <h2 className="account-section-title">Últimos Pedidos</h2>
          <Link href="/account/orders" className="account-section-link">
            Ver todos →
          </Link>
        </div>
        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>#Pedido</th>
                <th>Data</th>
                <th>Itens</th>
                <th>Total</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => {
                const s = STATUS_MAP[order.status];
                return (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id}</strong>
                    </td>
                    <td>{order.date}</td>
                    <td
                      style={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {order.items}
                    </td>
                    <td>
                      <strong>R$ {fmt(order.total)}</strong>
                    </td>
                    <td>
                      <span className={`status-badge ${s.cls}`}>{s.label}</span>
                    </td>
                    <td>
                      <Link
                        href={`/account/orders/${order.id}`}
                        className="table-action-btn"
                      >
                        Ver →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Favorites */}
      <div className="account-section">
        <div className="account-section-header">
          <h2 className="account-section-title">Favoritos Recentes</h2>
          <Link href="/account/wishlist" className="account-section-link">
            Ver lista →
          </Link>
        </div>
        <div className="favorites-grid">
          {FAVORITES.map((p) => (
            <Link key={p.id} href={p.href} className="mini-product-card">
              <div className="mini-product-image">{p.emoji}</div>
              <div className="mini-product-info">
                <div className="mini-product-name">{p.name}</div>
                <div className="mini-product-price">{p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
