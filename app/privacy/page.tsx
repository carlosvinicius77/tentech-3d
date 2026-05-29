"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "informacoes", title: "1. Informações Coletadas" },
  { id: "como-usamos", title: "2. Como Usamos" },
  { id: "compartilhamento", title: "3. Compartilhamento" },
  { id: "seus-direitos", title: "4. Seus Direitos (LGPD)" },
  { id: "cookies", title: "5. Cookies" },
  { id: "contato", title: "6. Contato" },
];

export default function PrivacyPage() {
  const [activeId, setActiveId] = useState("informacoes");

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "#f5f5f7", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#1a1a2e", color: "#fff", padding: "24px 24px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Link href="/" style={{ color: "hsl(353,100%,78%)", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
            ← Voltar à loja
          </Link>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 700, margin: 0 }}>Política de Privacidade</h1>
          <p style={{ color: "rgba(255,255,255,.6)", marginTop: 8, fontSize: 13 }}>
            Última atualização: 28 de maio de 2026 · Em conformidade com a LGPD (Lei 13.709/2018)
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px", display: "flex", gap: 40, alignItems: "flex-start" }}>
        {/* Sidebar (desktop) */}
        <aside style={{
          width: 220,
          flexShrink: 0,
          position: "sticky",
          top: 24,
          background: "#fff",
          borderRadius: 10,
          padding: "18px 0",
          boxShadow: "0 4px 20px rgba(0,0,0,.06)",
          display: "none",
        }}
          className="privacy-sidebar"
        >
          <p style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: ".06em", padding: "0 18px", marginBottom: 10 }}>Sumário</p>
          {SECTIONS.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{
                display: "block",
                padding: "8px 18px",
                fontSize: 13,
                color: activeId === s.id ? "hsl(353,100%,68%)" : "#333",
                fontWeight: activeId === s.id ? 600 : 400,
                borderLeft: activeId === s.id ? "3px solid hsl(353,100%,68%)" : "3px solid transparent",
                transition: "all .15s",
                textDecoration: "none",
              }}
            >
              {s.title}
            </a>
          ))}
        </aside>

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: "36px 40px", boxShadow: "0 4px 20px rgba(0,0,0,.06)", lineHeight: 1.75, color: "#333" }}>

            <section id="informacoes" style={{ marginBottom: 48 }}>
              <h2 style={h2}>1. Informações Coletadas</h2>
              <p>A TenTech 3D coleta as seguintes categorias de dados pessoais, sempre com base em uma das bases legais previstas na LGPD:</p>
              <ul style={ul}>
                <li><strong>Dados de cadastro:</strong> nome completo, e-mail, CPF, telefone, endereço de entrega e cobrança — coletados no momento do cadastro ou finalização de compra.</li>
                <li><strong>Dados de pagamento:</strong> número parcial do cartão (apenas os últimos 4 dígitos ficam armazenados), bandeira e validade. Dados completos são processados diretamente pela adquirente e nunca armazenados em nossos servidores.</li>
                <li><strong>Dados de navegação:</strong> endereço IP, tipo de dispositivo, navegador, páginas visitadas, tempo de sessão — coletados via cookies analíticos, se você consentir.</li>
                <li><strong>Comunicações:</strong> mensagens enviadas pelo formulário de contato, chat ou e-mail de suporte.</li>
                <li><strong>Dados de uso da loja:</strong> histórico de pedidos, itens no carrinho, listas de favoritos e avaliações de produtos.</li>
              </ul>
              <p style={note}>Nunca coletamos dados sensíveis (art. 5º, II da LGPD) sem consentimento explícito e justificativa adequada.</p>
            </section>

            <section id="como-usamos" style={{ marginBottom: 48 }}>
              <h2 style={h2}>2. Como Usamos os Dados</h2>
              <p>Utilizamos seus dados para as seguintes finalidades e bases legais correspondentes:</p>
              <table style={table}>
                <thead>
                  <tr>
                    <th style={th}>Finalidade</th>
                    <th style={th}>Base legal (LGPD)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Processar e entregar seus pedidos", "Execução de contrato (art. 7º, V)"],
                    ["Enviar nota fiscal e confirmações de compra", "Cumprimento de obrigação legal (art. 7º, II)"],
                    ["Atendimento ao cliente", "Execução de contrato (art. 7º, V)"],
                    ["Prevenção a fraudes", "Legítimo interesse (art. 7º, IX)"],
                    ["Newsletter e promoções", "Consentimento (art. 7º, I)"],
                    ["Melhoria do site com Google Analytics", "Consentimento (art. 7º, I)"],
                    ["Anúncios via Meta Pixel", "Consentimento (art. 7º, I)"],
                  ].map(([fin, base], i) => (
                    <tr key={i}>
                      <td style={td}>{fin}</td>
                      <td style={td}>{base}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section id="compartilhamento" style={{ marginBottom: 48 }}>
              <h2 style={h2}>3. Compartilhamento de Dados</h2>
              <p>Não vendemos seus dados. Compartilhamos apenas com:</p>
              <ul style={ul}>
                <li><strong>Transportadoras e Correios:</strong> nome, endereço e telefone para entrega do pedido.</li>
                <li><strong>Gateway de pagamento:</strong> dados necessários para autorização da transação (Mercado Pago, PagSeguro ou similar).</li>
                <li><strong>Serviços de e-mail transacional:</strong> para envio de confirmações e notificações (Resend/SendGrid).</li>
                <li><strong>Autoridades governamentais:</strong> quando exigido por lei, ordem judicial ou autoridade competente.</li>
              </ul>
              <p>Todos os parceiros são contratualmente obrigados a tratar seus dados com confidencialidade e segurança, atuando como <strong>operadores</strong> conforme definição da LGPD (art. 5º, VII).</p>
            </section>

            <section id="seus-direitos" style={{ marginBottom: 48 }}>
              <h2 style={h2}>4. Seus Direitos (LGPD)</h2>
              <p>Conforme os arts. 17 a 22 da LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14, marginTop: 18 }}>
                {[
                  { icon: "👁️", title: "Acesso", desc: "Confirmar se tratamos seus dados e obter cópia." },
                  { icon: "✏️", title: "Correção", desc: "Atualizar dados incompletos, inexatos ou desatualizados." },
                  { icon: "🗑️", title: "Exclusão", desc: "Solicitar apagamento dos dados tratados com base em consentimento." },
                  { icon: "📦", title: "Portabilidade", desc: "Receber seus dados em formato estruturado para outro fornecedor." },
                  { icon: "🚫", title: "Oposição", desc: "Opor-se a tratamento realizado por legítimo interesse." },
                  { icon: "↩️", title: "Revogação", desc: "Retirar consentimento a qualquer momento, sem prejuízo dos tratamentos anteriores." },
                  { icon: "ℹ️", title: "Informação", desc: "Ser informado sobre as entidades com as quais compartilhamos seus dados." },
                  { icon: "⚖️", title: "Revisão", desc: "Solicitar revisão de decisões automatizadas que afetem seus interesses." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} style={{ background: "#f5f5f7", borderRadius: 8, padding: "14px 16px" }}>
                    <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
                    <p style={{ fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>{title}</p>
                    <p style={{ fontSize: 12, color: "#666", margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 18 }}>Para exercer qualquer direito, envie sua solicitação para <strong>privacidade@tentech3d.com.br</strong> ou acesse a seção <em>Minha Conta → Privacidade</em>. Respondemos em até <strong>15 dias</strong> corridos.</p>
            </section>

            <section id="cookies" style={{ marginBottom: 48 }}>
              <h2 style={h2}>5. Cookies</h2>
              <p>Utilizamos cookies para garantir o funcionamento da loja e, com seu consentimento, para analytics e marketing:</p>
              <table style={table}>
                <thead>
                  <tr>
                    <th style={th}>Tipo</th>
                    <th style={th}>Finalidade</th>
                    <th style={th}>Obrigatório?</th>
                    <th style={th}>Validade</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Sessão / Carrinho", "Manter itens no carrinho e sessão de login", "Sim", "Sessão"],
                    ["Preferências", "Lembrar idioma e moeda", "Não", "1 ano"],
                    ["Google Analytics", "Mensurar tráfego e comportamento", "Não", "2 anos"],
                    ["Meta Pixel", "Rastrear conversões e remarketing", "Não", "90 dias"],
                  ].map(([tipo, fin, obrig, val], i) => (
                    <tr key={i}>
                      <td style={td}>{tipo}</td>
                      <td style={td}>{fin}</td>
                      <td style={td}>{obrig}</td>
                      <td style={td}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ marginTop: 12 }}>Você pode gerenciar suas preferências a qualquer momento clicando em <strong>"Preferências de Cookies"</strong> no rodapé da página.</p>
            </section>

            <section id="contato">
              <h2 style={h2}>6. Contato e Encarregado de Dados (DPO)</h2>
              <p>Para questões sobre esta política ou exercício de direitos, entre em contato com nosso Encarregado de Dados:</p>
              <div style={{ background: "#f5f5f7", borderRadius: 10, padding: "20px 24px", marginTop: 14 }}>
                <p style={{ margin: 0, fontSize: 14 }}><strong>TenTech 3D — Impressão 3D</strong></p>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#555" }}>CNPJ: XX.XXX.XXX/0001-XX</p>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#555" }}>Encarregado: Carlos Vinicius</p>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#555" }}>E-mail: <a href="mailto:privacidade@tentech3d.com.br" style={{ color: "hsl(353,100%,60%)" }}>privacidade@tentech3d.com.br</a></p>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#555" }}>Autoridade: ANPD — <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" style={{ color: "hsl(353,100%,60%)" }}>www.gov.br/anpd</a></p>
              </div>
              <p style={{ marginTop: 18, fontSize: 13, color: "#888" }}>
                Esta política pode ser atualizada. Notificaremos por e-mail sobre mudanças significativas. A versão mais recente estará sempre disponível nesta página.
              </p>
            </section>

          </div>
        </main>
      </div>

      <style>{`
        .privacy-sidebar { display: none; }
        @media (min-width: 768px) { .privacy-sidebar { display: block !important; } }
      `}</style>
    </div>
  );
}

const h2: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: "#1a1a2e",
  marginBottom: 14,
  paddingBottom: 10,
  borderBottom: "2px solid #f0f0f0",
};
const ul: React.CSSProperties = { paddingLeft: 20, margin: "10px 0", display: "flex", flexDirection: "column", gap: 6 };
const note: React.CSSProperties = { background: "#fff8e1", border: "1px solid #ffe082", borderRadius: 6, padding: "10px 14px", fontSize: 13, color: "#7a5c00", marginTop: 14 };
const table: React.CSSProperties = { width: "100%", borderCollapse: "collapse", marginTop: 12, fontSize: 13 };
const th: React.CSSProperties = { background: "#f5f5f7", padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#444", borderBottom: "2px solid #e0e0e0" };
const td: React.CSSProperties = { padding: "10px 14px", borderBottom: "1px solid #f0f0f0", color: "#555", verticalAlign: "top" };
