import Link from "next/link";
import SalesChart from "./components/SalesChart";

const KPIS = [
  {
    label: "Faturamento Hoje",
    value: "R$ 1.247,90",
    icon: "💰",
    iconBg: "#fff5f7",
    delta: "↑ 12% vs ontem",
    kind: "up",
  },
  {
    label: "Pedidos Hoje",
    value: "23",
    icon: "📦",
    iconBg: "#eff6ff",
    delta: "↑ 5 vs ontem",
    kind: "up",
  },
  {
    label: "Aguardando Pagamento",
    value: "7 pedidos",
    icon: "⏳",
    iconBg: "#fffbeb",
    delta: "Requer atenção",
    kind: "warn",
  },
  {
    label: "Estoque Crítico",
    value: "4 produtos",
    icon: "⚠️",
    iconBg: "#fff1f2",
    delta: "Repor estoque",
    kind: "danger",
  },
];

const RECENT_ORDERS = [
  { id: "#8472", client: "Ana Silva",    product: "Miniatura Dragon Age",  value: "R$ 89,90",  status: "entregue",   date: "28/05/2026" },
  { id: "#8471", client: "João Souza",   product: "Filamento PLA+ 1kg",    value: "R$ 59,90",  status: "enviado",    date: "28/05/2026" },
  { id: "#8470", client: "Maria Lopes",  product: "Impressora FDM Pro",    value: "R$ 1.299,00",status: "producao",  date: "27/05/2026" },
  { id: "#8469", client: "Pedro Costa",  product: "Placa Nome Personaliz.", value: "R$ 34,90",  status: "aguardando", date: "27/05/2026" },
  { id: "#8468", client: "Lucas Ramos",  product: "Miniatura D&D Pack",    value: "R$ 129,90", status: "entregue",   date: "26/05/2026" },
  { id: "#8467", client: "Carla Matos",  product: "Filamento PETG 1kg",    value: "R$ 69,90",  status: "producao",   date: "26/05/2026" },
  { id: "#8466", client: "Bruna Alves",  product: "Suporte Celular 3D",    value: "R$ 24,90",  status: "enviado",    date: "25/05/2026" },
  { id: "#8465", client: "Rafael Lima",  product: "Caixa Controle Custom", value: "R$ 44,90",  status: "entregue",   date: "25/05/2026" },
];

const TOP_PRODUCTS = [
  { name: "Miniatura Personalizada",  qty: 142 },
  { name: "Filamento PLA+ 1kg",       qty: 98  },
  { name: "Placa Nome/Frase",         qty: 87  },
  { name: "Pack Miniaturas D&D",      qty: 64  },
  { name: "Suporte Mesa Custom",      qty: 51  },
];

const LOW_STOCK = [
  { name: "Filamento ABS Cinza 1kg",  qty: 2 },
  { name: "Impressora FDM Lite",      qty: 1 },
  { name: "Resina Translúcida 500ml", qty: 3 },
  { name: "Filamento Flexível TPU",   qty: 2 },
];

const STATUS_LABELS: Record<string, string> = {
  aguardando: "Aguardando",
  producao:   "Em Produção",
  enviado:    "Enviado",
  entregue:   "Entregue",
  cancelado:  "Cancelado",
};

export default function AdminDashboard() {
  return (
    <>
      {/* KPI Cards */}
      <div className="a-kpi-grid">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="a-kpi">
            <div className="a-kpi-header">
              <span className="a-kpi-label">{kpi.label}</span>
              <div className="a-kpi-icon" style={{ background: kpi.iconBg }}>
                {kpi.icon}
              </div>
            </div>
            <div className="a-kpi-value">{kpi.value}</div>
            <div className={`a-kpi-delta ${kpi.kind}`}>{kpi.delta}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="a-dash-grid">
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Sales chart */}
          <div className="a-card">
            <div className="a-card-title">
              Vendas — Últimos 30 dias
              <span style={{ fontSize: "12px", color: "var(--a-muted)", fontWeight: 400 }}>
                Atualizado agora
              </span>
            </div>
            <SalesChart />
          </div>

          {/* Recent orders */}
          <div className="a-card">
            <div className="a-card-title">
              Últimos Pedidos
              <Link href="/admin/orders" className="a-text-link">Ver todos →</Link>
            </div>
            <div className="a-table-wrap">
              <table className="a-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Produto</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map((o) => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 600 }}>{o.id}</td>
                      <td>{o.client}</td>
                      <td style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {o.product}
                      </td>
                      <td style={{ fontWeight: 600 }}>{o.value}</td>
                      <td>
                        <span className={`a-badge ${o.status}`}>
                          {STATUS_LABELS[o.status]}
                        </span>
                      </td>
                      <td style={{ color: "var(--a-muted)" }}>{o.date}</td>
                      <td>
                        <Link href="/admin/orders" className="a-btn a-btn-ghost a-btn-sm">
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Top produtos */}
          <div className="a-card">
            <div className="a-card-title">Top Produtos</div>
            <div className="a-rank-list">
              {TOP_PRODUCTS.map((p, i) => (
                <div key={p.name} className="a-rank-item">
                  <div className="a-rank-pos">{i + 1}</div>
                  <span className="a-rank-name">{p.name}</span>
                  <span className="a-rank-val">{p.qty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Estoque baixo */}
          <div className="a-card">
            <div className="a-card-title">
              Estoque Crítico
              <span style={{ fontSize: "18px" }}>⚠️</span>
            </div>
            <div className="a-low-stock">
              {LOW_STOCK.map((p) => (
                <div key={p.name} className="a-low-item">
                  <span>{p.name}</span>
                  <span className="a-low-qty">{p.qty} un.</span>
                </div>
              ))}
            </div>
            <hr className="a-section-sep" />
            <Link href="/admin/inventory" className="a-btn a-btn-outline" style={{ width: "100%", justifyContent: "center" }}>
              Gerenciar Estoque
            </Link>
          </div>

          {/* Quick actions */}
          <div className="a-card">
            <div className="a-card-title">Ações Rápidas</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link href="/admin/products/new" className="a-btn a-btn-primary" style={{ justifyContent: "center" }}>
                + Novo Produto
              </Link>
              <Link href="/admin/orders" className="a-btn a-btn-outline" style={{ justifyContent: "center" }}>
                📋 Ver Pedidos
              </Link>
              <Link href="/admin/newsletter" className="a-btn a-btn-outline" style={{ justifyContent: "center" }}>
                📧 Newsletter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
