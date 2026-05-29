import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Nós | TenTech 3D",
  description: "Conheça a TenTech 3D: nossa história, equipe e missão.",
};

const STATS = [
  { value: "5.000+", label: "Clientes satisfeitos" },
  { value: "15.000+", label: "Peças impressas" },
  { value: "4.9★", label: "Avaliação média" },
  { value: "3 anos", label: "De experiência" },
];

const TEAM = [
  { name: "Carlos Vinicius", role: "Fundador & CEO", emoji: "👨‍💼" },
  { name: "Ana Lima", role: "Designer 3D Sênior", emoji: "👩‍🎨" },
  { name: "Rafael Costa", role: "Técnico de Impressão", emoji: "👨‍🔧" },
  { name: "Julia Santos", role: "Atendimento ao Cliente", emoji: "👩‍💻" },
];

const VALUES = [
  { icon: "🎯", title: "Precisão", text: "Cada peça é revisada antes de sair da fábrica. Zero tolerância para defeitos." },
  { icon: "🌱", title: "Sustentabilidade", text: "Usamos materiais recicláveis e processos que minimizam desperdício." },
  { icon: "🤝", title: "Parceria", text: "Somos parceiros do seu projeto, não apenas fornecedores." },
];

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="sobre-page">
        <div className="sobre-hero">
          <div className="container">
            <h1 className="sobre-hero-title">Sobre a <span>TenTech 3D</span></h1>
            <p className="sobre-hero-subtitle">
              Transformando ideias em realidade, camada por camada.
            </p>
          </div>
        </div>

        <section className="sobre-historia">
          <div className="container sobre-historia-inner">
            <div className="sobre-historia-text">
              <h2>Nossa História</h2>
              <p>
                A TenTech 3D nasceu em 2022 com uma missão simples: tornar a impressão 3D acessível para
                todos — de hobbistas apaixonados a empresas que precisam de prototipagem rápida.
              </p>
              <p>
                Começamos com uma única impressora em um espaço compartilhado. Hoje, temos um laboratório
                completo com impressoras FDM e de resina, atendendo clientes em todo o Brasil.
              </p>
              <p>
                Nossa paixão pela tecnologia e pelo design nos move a buscar sempre a melhor qualidade,
                o prazo mais curto e o suporte mais humano do mercado.
              </p>
            </div>
            <div className="sobre-historia-visual">
              <div className="sobre-historia-card">
                <span style={{ fontSize: 80 }}>🏭</span>
                <p>Nosso laboratório em São Paulo, SP</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sobre-stats">
          <div className="container">
            <div className="sobre-stats-grid">
              {STATS.map(s => (
                <div key={s.label} className="sobre-stat-card">
                  <span className="sobre-stat-value">{s.value}</span>
                  <span className="sobre-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sobre-equipe">
          <div className="container">
            <h2 className="sobre-section-title">Nossa Equipe</h2>
            <div className="sobre-team-grid">
              {TEAM.map(m => (
                <div key={m.name} className="sobre-team-card">
                  <div className="sobre-team-avatar">{m.emoji}</div>
                  <h3 className="sobre-team-name">{m.name}</h3>
                  <p className="sobre-team-role">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sobre-values">
          <div className="container">
            <h2 className="sobre-section-title">Nossos Valores</h2>
            <div className="sobre-values-grid">
              {VALUES.map(v => (
                <div key={v.title} className="sobre-value-card">
                  <span className="sobre-value-icon">{v.icon}</span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sobre-localizacao">
          <div className="container">
            <h2 className="sobre-section-title">Onde Estamos</h2>
            <div className="sobre-mapa-wrapper">
              <div className="sobre-mapa-card">
                <p>📍 Rua das Impressoras, 123 — Vila Técnica</p>
                <p>São Paulo, SP — CEP 01310-100</p>
                <p>☎️ (11) 9 9999-0000</p>
                <p>✉️ contato@tentech3d.com.br</p>
              </div>
              <div className="sobre-mapa-embed">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0754852613!2d-46.6565!3d-23.5634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQ4LjIiUyA0NsKwMzknMjMuNCJX!5e0!3m2!1spt-BR!2sbr!4v1620000000000"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: 12 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="sobre-cta">
          <div className="container sobre-cta-inner">
            <h2>Quer trabalhar conosco?</h2>
            <p>Estamos sempre em busca de talentos apaixonados por tecnologia e design.</p>
            <div className="sobre-cta-btns">
              <a href="mailto:contato@tentech3d.com.br" className="auth-btn-primary" style={{ display: "inline-block" }}>
                Ver vagas abertas
              </a>
              <Link href="/contato" className="sobre-btn-secondary">
                Fale com a gente
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
