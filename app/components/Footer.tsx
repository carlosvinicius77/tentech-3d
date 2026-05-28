export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="/" className="logo">
            Ten<span>Tech</span> 3D
          </a>
          <p>
            Especialistas em impressão 3D personalizada. Levamos tecnologia e criatividade para projetos únicos. Do filamento à peça final, somos seu parceiro.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Facebook">👍</a>
            <a href="#" aria-label="WhatsApp">💬</a>
            <a href="#" aria-label="YouTube">▶️</a>
          </div>
        </div>

        <div>
          <h3 className="footer-col-title">Links Úteis</h3>
          <div className="footer-links">
            <a href="#">Sobre a TenTech 3D</a>
            <a href="#">Como Funciona</a>
            <a href="#">Envie seu Projeto</a>
            <a href="#">Blog & Tutoriais</a>
            <a href="#">Trabalhe Conosco</a>
          </div>
        </div>

        <div>
          <h3 className="footer-col-title">Atendimento</h3>
          <div className="footer-links">
            <a href="#">Central de Ajuda</a>
            <a href="#">Meus Pedidos</a>
            <a href="#">Trocas e Devoluções</a>
            <a href="#">Prazo de Entrega</a>
            <a href="#">Fale Conosco</a>
          </div>
        </div>

        <div>
          <h3 className="footer-col-title">Contato</h3>
          <div className="footer-contact">
            <div className="footer-contact-item">
              <span>📍</span>
              <span>Rua das Impressoras, 3D — São Paulo, SP</span>
            </div>
            <div className="footer-contact-item">
              <span>📞</span>
              <span>(11) 99999-3D00</span>
            </div>
            <div className="footer-contact-item">
              <span>📧</span>
              <span>contato@tentech3d.com.br</span>
            </div>
            <div className="footer-contact-item">
              <span>🕐</span>
              <span>Seg–Sex: 9h–18h</span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "16px 24px",
          maxWidth: 1400,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 12,
          color: "hsl(0,0%,50%)",
        }}
      >
        <p>© 2025 TenTech 3D — Todos os direitos reservados.</p>
        <div style={{ display: "flex", gap: 8, fontSize: 22 }}>
          <span title="Pix">💠</span>
          <span title="Visa">💳</span>
          <span title="Mastercard">🔴</span>
          <span title="Boleto">🧾</span>
        </div>
      </div>
    </footer>
  );
}
