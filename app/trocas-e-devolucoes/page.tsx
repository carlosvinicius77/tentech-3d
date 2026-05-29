"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const STEPS = [
  { n: 1, icon: "📋", title: "Solicitar a troca", desc: "Preencha o formulário abaixo com o número do pedido e motivo." },
  { n: 2, icon: "📧", title: "Aprovação", desc: "Nossa equipe analisará sua solicitação em até 1 dia útil." },
  { n: 3, icon: "📦", title: "Devolução", desc: "Envie a peça com a etiqueta de postagem que enviaremos por e-mail." },
  { n: 4, icon: "✅", title: "Resolução", desc: "Após recebermos, fazemos o reenvio ou estorno em até 5 dias úteis." },
];

const FAQS = [
  { q: "Qual o prazo para solicitar troca?", a: "Até 30 dias após o recebimento do pedido." },
  { q: "O frete da devolução é por minha conta?", a: "Não! Em caso de defeito, o frete de devolução é por nossa conta. Para desistência, o cliente arca com o frete." },
  { q: "Posso trocar por outro produto?", a: "Sim! Você pode trocar por qualquer produto do catálogo de valor igual ou superior (pagando a diferença)." },
  { q: "Peças personalizadas podem ser trocadas?", a: "Peças 100% customizadas só são aceitas em caso de defeito de impressão comprovado." },
  { q: "Quanto tempo leva o estorno?", a: "Estornos no cartão levam de 5 a 15 dias úteis dependendo da operadora." },
];

export default function TrocasPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ order: "", reason: "", desc: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.order || !form.reason) return;
    setSubmitted(true);
  }

  return (
    <>
      <Header />
      <main className="trocas-page">
        <div className="trocas-hero">
          <div className="container">
            <h1 className="trocas-title">Trocas e Devoluções</h1>
            <p className="trocas-subtitle">Nossa política é simples: sua satisfação vem primeiro.</p>
          </div>
        </div>

        <div className="container trocas-body">
          <section className="trocas-prazo-box">
            <span style={{ fontSize: 40 }}>📅</span>
            <div>
              <strong>30 dias para trocar ou devolver</strong>
              <p>Contados a partir da data de recebimento do pedido.</p>
            </div>
          </section>

          <section className="trocas-steps">
            <h2>Como funciona o processo</h2>
            <div className="trocas-steps-list">
              {STEPS.map((s, i) => (
                <div key={s.n} className="trocas-step">
                  <div className="trocas-step-icon">{s.icon}</div>
                  {i < STEPS.length - 1 && <div className="trocas-step-line" />}
                  <div className="trocas-step-body">
                    <span className="trocas-step-num">Passo {s.n}</span>
                    <strong>{s.title}</strong>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="trocas-condicoes">
            <h2>Condições para troca ou devolução</h2>
            <ul className="trocas-conditions">
              <li>✓ Produto com defeito de impressão (camadas, falhas estruturais)</li>
              <li>✓ Produto diferente do pedido (cor, tamanho, modelo errado)</li>
              <li>✓ Produto danificado no transporte</li>
              <li>✓ Desistência da compra em até 7 dias (CDC — Código de Defesa do Consumidor)</li>
              <li>✗ Produto personalizado sem defeito não pode ser devolvido</li>
              <li>✗ Produto com sinais de uso ou danificado pelo cliente</li>
              <li>✗ Após 30 dias do recebimento</li>
            </ul>
          </section>

          <section className="trocas-form-section">
            <h2>Solicitar Troca ou Devolução</h2>
            {submitted ? (
              <div className="contato-success">
                <span style={{ fontSize: 48 }}>✅</span>
                <h3>Solicitação recebida!</h3>
                <p>Entraremos em contato em até 1 dia útil com as instruções.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="trocas-form">
                <div className="ff-group">
                  <label className="ff-label">Número do pedido</label>
                  <input
                    type="text"
                    className="ff-input"
                    placeholder="Ex: #TT-2025-00123"
                    value={form.order}
                    onChange={e => setForm(p => ({ ...p, order: e.target.value }))}
                    required
                  />
                </div>
                <div className="ff-group">
                  <label className="ff-label">Motivo</label>
                  <select
                    className="ff-input"
                    value={form.reason}
                    onChange={e => setForm(p => ({ ...p, reason: e.target.value }))}
                    required
                    style={{ cursor: "pointer" }}
                  >
                    <option value="">Selecione…</option>
                    <option value="defeito">Defeito de impressão</option>
                    <option value="errado">Produto errado</option>
                    <option value="transporte">Dano no transporte</option>
                    <option value="desistencia">Desistência</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div className="ff-group">
                  <label className="ff-label">Descrição detalhada</label>
                  <textarea
                    className="ff-input ff-textarea"
                    rows={4}
                    placeholder="Descreva o problema com o máximo de detalhes possível…"
                    value={form.desc}
                    onChange={e => setForm(p => ({ ...p, desc: e.target.value }))}
                  />
                </div>
                <button type="submit" className="auth-btn-primary">Solicitar Troca / Devolução</button>
              </form>
            )}
          </section>

          <section className="contato-faq">
            <h2 className="contato-faq-title">Dúvidas sobre Trocas</h2>
            <div className="contato-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`contato-faq-item${openFaq === i ? " open" : ""}`}>
                  <button className="contato-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {f.q} <span className="contato-faq-arrow">{openFaq === i ? "▲" : "▼"}</span>
                  </button>
                  {openFaq === i && <div className="contato-faq-a">{f.a}</div>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
