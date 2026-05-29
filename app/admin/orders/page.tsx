"use client";

import { useState } from "react";

interface Order {
  id: string;
  client: string;
  email: string;
  product: string;
  value: string;
  status: string;
  date: string;
  [key: string]: unknown;
}

const ALL_ORDERS: Order[] = [
  { id: "#8472", client: "Ana Silva",       email: "ana@email.com",    product: "Miniatura Dragon Age",     value: "R$ 89,90",    status: "entregue",   date: "28/05/2026" },
  { id: "#8471", client: "João Souza",      email: "joao@email.com",   product: "Filamento PLA+ 1kg",       value: "R$ 59,90",    status: "enviado",    date: "28/05/2026" },
  { id: "#8470", client: "Maria Lopes",     email: "maria@email.com",  product: "Impressora FDM Pro",       value: "R$ 1.299,00", status: "producao",   date: "27/05/2026" },
  { id: "#8469", client: "Pedro Costa",     email: "pedro@email.com",  product: "Placa Nome Personaliz.",   value: "R$ 34,90",    status: "aguardando", date: "27/05/2026" },
  { id: "#8468", client: "Lucas Ramos",     email: "lucas@email.com",  product: "Miniatura D&D Pack",       value: "R$ 129,90",   status: "entregue",   date: "26/05/2026" },
  { id: "#8467", client: "Carla Matos",     email: "carla@email.com",  product: "Filamento PETG 1kg",       value: "R$ 69,90",    status: "producao",   date: "26/05/2026" },
  { id: "#8466", client: "Bruna Alves",     email: "bruna@email.com",  product: "Suporte Celular 3D",       value: "R$ 24,90",    status: "enviado",    date: "25/05/2026" },
  { id: "#8465", client: "Rafael Lima",     email: "rafael@email.com", product: "Caixa Controle Custom",    value: "R$ 44,90",    status: "entregue",   date: "25/05/2026" },
  { id: "#8464", client: "Fernanda Dias",   email: "fer@email.com",    product: "Resina Translúcida 500ml", value: "R$ 79,90",    status: "aguardando", date: "24/05/2026" },
  { id: "#8463", client: "Thiago Nunes",    email: "thiago@email.com", product: "Miniatura Personalizada",  value: "R$ 89,90",    status: "cancelado",  date: "24/05/2026" },
  { id: "#8462", client: "Juliana Moura",   email: "ju@email.com",     product: "Filamento ABS Cinza 1kg",  value: "R$ 64,90",    status: "aguardando", date: "23/05/2026" },
  { id: "#8461", client: "Diego Santos",    email: "diego@email.com",  product: "Pack Miniaturas D&D",      value: "R$ 129,90",   status: "enviado",    date: "23/05/2026" },
  { id: "#8460", client: "Camila Rocha",    email: "cami@email.com",   product: "Modelo Arquitetônico",     value: "R$ 199,90",   status: "producao",   date: "22/05/2026" },
  { id: "#8459", client: "André Vieira",    email: "andre@email.com",  product: "Kit Ferramentas 3D",       value: "R$ 49,90",    status: "entregue",   date: "22/05/2026" },
  { id: "#8458", client: "Patricia Gomes",  email: "pat@email.com",    product: "Filamento Flexível TPU",   value: "R$ 84,90",    status: "aguardando", date: "21/05/2026" },
];

const TABS = [
  { key: "todos",      label: "Todos" },
  { key: "aguardando", label: "Aguardando" },
  { key: "producao",   label: "Em Produção" },
  { key: "enviado",    label: "Enviado" },
  { key: "entregue",   label: "Entregue" },
  { key: "cancelado",  label: "Cancelado" },
];

const STATUS_LABELS: Record<string, string> = {
  aguardando: "Aguardando",
  producao:   "Em Produção",
  enviado:    "Enviado",
  entregue:   "Entregue",
  cancelado:  "Cancelado",
};

const STATUS_OPTIONS = ["aguardando", "producao", "enviado", "entregue", "cancelado"];

export default function OrdersPage() {
  const [tab, setTab]         = useState("todos");
  const [search, setSearch]   = useState("");
  const [orders, setOrders]   = useState<Order[]>(ALL_ORDERS);

  const counts = TABS.reduce<Record<string, number>>((acc, t) => {
    acc[t.key] = t.key === "todos"
      ? orders.length
      : orders.filter((o) => o.status === t.key).length;
    return acc;
  }, {});

  const filtered = orders.filter((o) => {
    const matchTab = tab === "todos" || o.status === tab;
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.client.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const changeStatus = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const exportCSV = () => {
    const header = "ID,Cliente,Email,Produto,Valor,Status,Data\n";
    const rows = filtered
      .map((o) => `${o.id},${o.client},${o.email},"${o.product}",${o.value},${STATUS_LABELS[o.status]},${o.date}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "pedidos.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="a-page-header">
        <h1 className="a-page-title">Pedidos</h1>
        <button className="a-btn a-btn-outline" onClick={exportCSV}>
          📥 Exportar CSV
        </button>
      </div>

      <div className="a-card">
        {/* Tabs */}
        <div className="a-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`a-tab${tab === t.key ? " active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
              <span className="a-tab-badge">{counts[t.key]}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="a-filter-bar">
          <div className="a-search-wrap" style={{ maxWidth: 360 }}>
            <span className="a-search-icon">🔍</span>
            <input
              className="a-input"
              placeholder="Buscar por ID, cliente ou produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
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
                <th>Alterar Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "var(--a-muted)", padding: 32 }}>
                    Nenhum pedido encontrado
                  </td>
                </tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 700 }}>{o.id}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{o.client}</div>
                      <div style={{ fontSize: 11, color: "var(--a-muted)" }}>{o.email}</div>
                    </td>
                    <td style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
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
                      <select
                        className="a-status-select"
                        value={o.status}
                        onChange={(e) => changeStatus(o.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 12, fontSize: 12, color: "var(--a-muted)" }}>
          Exibindo {filtered.length} de {orders.length} pedidos
        </div>
      </div>
    </>
  );
}
