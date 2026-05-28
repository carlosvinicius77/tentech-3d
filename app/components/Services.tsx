const services = [
  {
    icon: "🚚",
    title: "Frete Grátis",
    text: "Acima de R$200 para todo o Brasil",
  },
  {
    icon: "🔄",
    title: "Troca Fácil",
    text: "30 dias para troca ou devolução",
  },
  {
    icon: "🔒",
    title: "Pagamento Seguro",
    text: "Pix, cartão e boleto com proteção",
  },
  {
    icon: "⚡",
    title: "Entrega Rápida",
    text: "Impressão e envio em até 3 dias úteis",
  },
  {
    icon: "🛠️",
    title: "Suporte Técnico",
    text: "Equipe especializada em impressão 3D",
  },
];

export default function Services() {
  return (
    <section className="section" style={{ background: "var(--cultured)" }}>
      <div className="container">
        <div className="services-list">
          {services.map((s) => (
            <div key={s.title} className="service-item">
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
