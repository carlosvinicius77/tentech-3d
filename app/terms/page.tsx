import Link from "next/link";

export default function TermsPage() {
  return (
    <div style={{ background: "#f5f5f7", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#1a1a2e", color: "#fff", padding: "24px 24px 32px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Link href="/" style={{ color: "hsl(353,100%,78%)", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
            ← Voltar à loja
          </Link>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 700, margin: 0 }}>Termos de Uso</h1>
          <p style={{ color: "rgba(255,255,255,.6)", marginTop: 8, fontSize: 13 }}>
            Última atualização: 28 de maio de 2026 · Leia com atenção antes de usar nossa plataforma.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: "clamp(24px, 5vw, 44px)", boxShadow: "0 4px 20px rgba(0,0,0,.06)", lineHeight: 1.8, color: "#333", fontSize: 14 }}>

          <p style={{ background: "#fff8e1", border: "1px solid #ffe082", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#7a5c00", marginBottom: 32 }}>
            Ao acessar ou usar a plataforma TenTech 3D, você declara ter lido, compreendido e concordado com estes Termos de Uso. Caso não concorde com qualquer disposição, não utilize nossos serviços.
          </p>

          <Section title="1. Das Partes e Definições">
            <p><strong>TenTech 3D</strong> ("Empresa", "nós") é uma empresa brasileira especializada em impressão 3D, venda de filamentos, impressoras e produtos personalizados.</p>
            <p><strong>Usuário</strong> ou <strong>Cliente</strong> é toda pessoa física ou jurídica que acessa, navega ou realiza compras na plataforma.</p>
            <p><strong>Plataforma</strong> refere-se ao site, aplicativo mobile e demais canais digitais da TenTech 3D.</p>
          </Section>

          <Section title="2. Cadastro e Conta">
            <ul style={ul}>
              <li>O cadastro é gratuito e destinado a maiores de 18 anos ou menores devidamente assistidos/representados.</li>
              <li>Você é responsável pela veracidade das informações fornecidas. Dados falsos implicam cancelamento da conta e eventuais responsabilidades legais.</li>
              <li>Mantenha sua senha confidencial. Caso suspeite de acesso não autorizado, notifique-nos imediatamente em <strong>seguranca@tentech3d.com.br</strong>.</li>
              <li>É vedado criar múltiplas contas para obter vantagens indevidas em promoções.</li>
              <li>Reservamo-nos o direito de encerrar contas que violem estes termos, sem reembolso de créditos decorrentes de abuso.</li>
            </ul>
          </Section>

          <Section title="3. Produtos e Preços">
            <ul style={ul}>
              <li>Todos os preços são expressos em Reais (BRL) e incluem os impostos federais aplicáveis.</li>
              <li>Frete e taxas regionais são calculados no checkout e exibidos antes da confirmação do pedido.</li>
              <li>Nos casos de erro manifesto de preço (ex.: produto com valor R$ 0,00 por falha técnica), reservamo-nos o direito de cancelar o pedido, notificando o cliente com antecedência.</li>
              <li>Produtos personalizados (impressão 3D sob encomenda) podem ter prazo adicional de produção, informado na ficha do produto.</li>
              <li>Imagens meramente ilustrativas. Cores reais podem variar em função do filamento disponível no momento da produção.</li>
            </ul>
          </Section>

          <Section title="4. Formas de Pagamento">
            <ul style={ul}>
              <li>Aceitamos cartão de crédito (até 12x), cartão de débito, Pix e boleto bancário.</li>
              <li>Pedidos via boleto têm o estoque reservado por 3 dias úteis. Após esse prazo sem confirmação de pagamento, o pedido é cancelado automaticamente.</li>
              <li>Em caso de suspeita de fraude, o pedido pode ser suspenso para análise, com contato pelo e-mail cadastrado.</li>
              <li>O processamento é realizado por gateways de pagamento certificados PCI-DSS. A TenTech 3D não armazena dados completos de cartões.</li>
            </ul>
          </Section>

          <Section title="5. Entrega e Prazos">
            <ul style={ul}>
              <li>Prazos de entrega são estimados e contados a partir da confirmação do pagamento e, para produtos personalizados, após a aprovação do arquivo de impressão.</li>
              <li>Atrasos causados por transportadoras, greves, catástrofes ou casos fortuitos não são de responsabilidade da TenTech 3D, mas faremos o possível para minimizá-los.</li>
              <li>Após o despacho, um código de rastreio é enviado por e-mail.</li>
              <li>O cliente assume a responsabilidade por endereços de entrega incorretos fornecidos no cadastro.</li>
            </ul>
          </Section>

          <Section title="6. Política de Trocas e Devoluções (CDC)">
            <p>Em conformidade com o Código de Defesa do Consumidor (Lei 8.078/1990):</p>
            <ul style={ul}>
              <li><strong>Arrependimento (art. 49):</strong> para compras online, você tem 7 dias corridos a partir do recebimento para solicitar devolução sem necessidade de justificativa, com reembolso integral incluindo frete.</li>
              <li><strong>Produto com defeito:</strong> prazo de 30 dias para bens não duráveis e 90 dias para bens duráveis a partir do recebimento. Realizamos análise técnica e, se confirmado o defeito, oferecemos reparo, substituição ou reembolso.</li>
              <li><strong>Produtos personalizados sob medida</strong> (com arquivo do cliente aprovado) não são elegíveis para devolução por arrependimento, salvo vício de fabricação.</li>
              <li>Para iniciar uma troca ou devolução, acesse <em>Minha Conta → Pedidos → Solicitar Devolução</em>.</li>
            </ul>
          </Section>

          <Section title="7. Propriedade Intelectual">
            <ul style={ul}>
              <li>Todo o conteúdo da plataforma (logotipos, textos, imagens, código-fonte, design) é propriedade da TenTech 3D ou licenciado por terceiros, protegido pela Lei 9.610/1998.</li>
              <li>É proibida a reprodução, distribuição ou uso comercial sem autorização escrita.</li>
              <li>Ao enviar arquivos 3D para impressão, o cliente declara ser o titular dos direitos ou ter autorização do titular, responsabilizando-se por qualquer violação de propriedade intelectual de terceiros.</li>
              <li>Não aceitamos pedidos de impressão de objetos protegidos por patente sem licença, armas, peças ilegais ou conteúdo ofensivo.</li>
            </ul>
          </Section>

          <Section title="8. Conduta do Usuário">
            <p>É expressamente vedado:</p>
            <ul style={ul}>
              <li>Utilizar robôs, scrapers ou qualquer mecanismo automatizado para acessar ou coletar dados da plataforma.</li>
              <li>Tentar comprometer a segurança, integridade ou disponibilidade dos sistemas.</li>
              <li>Publicar avaliações falsas, enganosas ou com linguagem ofensiva.</li>
              <li>Usar a plataforma para fins ilegais, fraudulentos ou lesivos a terceiros.</li>
            </ul>
            <p>Violações podem resultar em suspensão imediata da conta e notificação às autoridades competentes.</p>
          </Section>

          <Section title="9. Limitação de Responsabilidade">
            <ul style={ul}>
              <li>A TenTech 3D não se responsabiliza por danos indiretos, lucros cessantes ou danos morais decorrentes de uso indevido da plataforma.</li>
              <li>Nossa responsabilidade total fica limitada ao valor do pedido que originou o dano.</li>
              <li>Não garantimos disponibilidade ininterrupta da plataforma, podendo haver manutenções programadas.</li>
            </ul>
          </Section>

          <Section title="10. Privacidade e LGPD">
            <p>
              O tratamento dos seus dados pessoais é regido pela nossa{" "}
              <Link href="/privacy" style={{ color: "hsl(353,100%,60%)", fontWeight: 600 }}>Política de Privacidade</Link>,
              em conformidade com a Lei 13.709/2018 (LGPD). Ao aceitar estes termos, você declara ciência sobre como coletamos e usamos seus dados.
            </p>
          </Section>

          <Section title="11. Alterações nos Termos">
            <p>Podemos atualizar estes Termos a qualquer momento. Notificaremos por e-mail sobre mudanças materiais com pelo menos 10 dias de antecedência. O uso continuado da plataforma após esse prazo implica aceitação das alterações.</p>
          </Section>

          <Section title="12. Foro e Lei Aplicável">
            <p>
              Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias, ressalvada a opção do consumidor pelo foro do seu domicílio (art. 101, I do CDC).
            </p>
            <p>Antes de recorrer ao Judiciário, o cliente pode registrar reclamação na plataforma <a href="https://consumidor.gov.br" target="_blank" rel="noopener noreferrer" style={{ color: "hsl(353,100%,60%)" }}>consumidor.gov.br</a>.</p>
          </Section>

          <Section title="13. Contato">
            <div style={{ background: "#f5f5f7", borderRadius: 10, padding: "18px 22px" }}>
              <p style={{ margin: 0 }}><strong>TenTech 3D</strong></p>
              <p style={{ margin: "3px 0 0", color: "#555" }}>E-mail: <a href="mailto:contato@tentech3d.com.br" style={{ color: "hsl(353,100%,60%)" }}>contato@tentech3d.com.br</a></p>
              <p style={{ margin: "3px 0 0", color: "#555" }}>WhatsApp: (11) 99999-3D00</p>
              <p style={{ margin: "3px 0 0", color: "#555" }}>Horário: Seg–Sex, 9h–18h</p>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{
        fontSize: 17,
        fontWeight: 700,
        color: "#1a1a2e",
        marginBottom: 12,
        paddingBottom: 8,
        borderBottom: "2px solid #f0f0f0",
      }}>{title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </section>
  );
}

const ul: React.CSSProperties = { paddingLeft: 20, margin: "4px 0", display: "flex", flexDirection: "column", gap: 6 };
