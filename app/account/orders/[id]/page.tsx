import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Detalhes do Pedido — TenTech 3D" };

/* ---- Mock order data ---- */
type TimelineStatus = "done" | "active" | "pending";

interface TimelineStep {
  title: string;
  time: string | null;
  status: TimelineStatus;
}

interface OrderData {
  id: string;
  date: string;
  status: string;
  statusCls: string;
  timeline: TimelineStep[];
  items: { emoji: string; name: string; variant: string; qty: number; price: number }[];
  address: string;
  payment: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  tracking: string | null;
}

function getOrder(id: string): OrderData {
  return {
    id,
    date: "23/05/2025 às 14:32",
    status: "Em Produção",
    statusCls: "status-producao",
    timeline: [
      { title: "Pedido Realizado",       time: "23/05/2025 — 14:32", status: "done"    },
      { title: "Pagamento Confirmado",   time: "23/05/2025 — 14:45", status: "done"    },
      { title: "Em Produção 3D",         time: "Iniciado em 24/05/2025", status: "active"  },
      { title: "Enviado",                time: null,                 status: "pending" },
      { title: "Entregue",               time: null,                 status: "pending" },
    ],
    items: [
      { emoji: "📱", name: "Suporte Celular 3D Ajustável",   variant: "Cor: Preto | Mat: PLA",    qty: 1, price: 89.9  },
      { emoji: "🛡️", name: "Case iPhone 15 Pro Personalizada", variant: "Cor: Transparente | Mat: PETG", qty: 1, price: 99.9  },
    ],
    address: "Rua das Impressoras, 42\nVila 3D — São Paulo, SP\nCEP 01310-100",
    payment: "Cartão de crédito ••••4242 (2× R$ 94,95)",
    subtotal: 189.8,
    shipping: 0,
    discount: 0,
    total: 189.8,
    tracking: null,
  };
}

function fmt(v: number) {
  return v.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrder(id);

  return (
    <>
      {/* Header */}
      <div className="order-detail-header">
        <Link href="/account/orders" className="order-back-link">
          ← Meus Pedidos
        </Link>
        <h1 className="order-number-title">Pedido {order.id}</h1>
        <span className="order-date-text">{order.date}</span>
        <span className={`status-badge ${order.statusCls}`}>{order.status}</span>
      </div>

      <div className="order-detail-grid">
        {/* LEFT col: timeline + items */}
        <div>
          {/* Timeline */}
          <div className="account-section">
            <div className="account-section-header">
              <h2 className="account-section-title">Acompanhar Pedido</h2>
            </div>
            <ol className="timeline-list">
              {order.timeline.map((step, i) => (
                <li key={i} className={`timeline-item ${step.status}`}>
                  <div className="timeline-dot">
                    {step.status === "done"   && "✓"}
                    {step.status === "active" && "●"}
                  </div>
                  <div className="timeline-content">
                    <p className="timeline-step-title">{step.title}</p>
                    {step.time && (
                      <p className="timeline-step-time">{step.time}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Items */}
          <div className="account-section">
            <div className="account-section-header">
              <h2 className="account-section-title">Itens do Pedido</h2>
            </div>
            <ul className="order-items-list">
              {order.items.map((item, i) => (
                <li key={i} className="order-item-row">
                  <div className="order-item-emoji">{item.emoji}</div>
                  <div className="order-item-info">
                    <p className="order-item-name">{item.name}</p>
                    <p className="order-item-variant">{item.variant}</p>
                    <p className="order-item-qty">Qtd: {item.qty}</p>
                  </div>
                  <div className="order-item-price">R$ {fmt(item.price)}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT col: summary + tracking */}
        <div>
          {/* Order summary */}
          <div className="order-info-box">
            <p className="order-info-box-title">Resumo do Pedido</p>
            <div className="order-info-row">
              <span>Subtotal</span>
              <span>R$ {fmt(order.subtotal)}</span>
            </div>
            <div className="order-info-row">
              <span>Frete</span>
              <span>{order.shipping === 0 ? "Grátis" : `R$ ${fmt(order.shipping)}`}</span>
            </div>
            {order.discount > 0 && (
              <div className="order-info-row">
                <span>Desconto</span>
                <span style={{ color: "var(--ocean-green)" }}>
                  − R$ {fmt(order.discount)}
                </span>
              </div>
            )}
            <div className="order-info-row total">
              <span>Total</span>
              <span>R$ {fmt(order.total)}</span>
            </div>
          </div>

          {/* Payment */}
          <div className="order-info-box">
            <p className="order-info-box-title">Pagamento</p>
            <p className="order-info-address">{order.payment}</p>
          </div>

          {/* Delivery address */}
          <div className="order-info-box">
            <p className="order-info-box-title">Endereço de Entrega</p>
            <p className="order-info-address" style={{ whiteSpace: "pre-line" }}>
              {order.address}
            </p>
          </div>

          {/* Tracking */}
          {order.tracking ? (
            <div className="tracking-box">
              <p className="tracking-label">Código de Rastreamento</p>
              <p className="tracking-code">{order.tracking}</p>
              <button className="tracking-btn">
                Rastrear Pedido →
              </button>
            </div>
          ) : (
            <div className="tracking-box">
              <p className="tracking-label">Rastreamento</p>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--sonic-silver)",
                  margin: "8px 0",
                  lineHeight: 1.6,
                }}
              >
                O código de rastreamento será disponibilizado assim que o pedido
                for enviado.
              </p>
            </div>
          )}

          {/* Return */}
          <button className="return-btn">
            ↩ Solicitar Troca ou Devolução
          </button>
        </div>
      </div>
    </>
  );
}
