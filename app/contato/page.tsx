"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const FAQS = [
  { q: "Qual é o prazo de produção?", a: "Para produtos do catálogo, até 3 dias úteis. Para peças personalizadas, de 5 a 10 dias úteis dependendo da complexidade." },
  { q: "Vocês entregam para todo o Brasil?", a: "Sim! Entregamos para todos os estados via Correios, Jadlog e transportadoras parceiras." },
  { q: "Como faço para enviar meu arquivo 3D?", a: "Aceitamos arquivos STL, OBJ e 3MF. Envie pelo formulário de impressão sob demanda ou por e-mail." },
  { q: "Posso personalizar um produto do catálogo?", a: "Com certeza! Fale conosco e nosso time vai avaliar as possibilidades de customização." },
  { q: "Qual a política de troca?", a: "Aceitamos trocas e devoluções em até 30 dias após o recebimento. Veja nossa política completa na página de Trocas." },
];

export default function ContatoPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "", lgpd: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function set(key: string, value: string | boolean) {
    setForm(p => ({ ...p, [key]: value }));
    setErrors(p => ({ ...p, [key]: "" }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Nome obrigatório";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "E-mail inválido";
    if (!form.subject) errs.subject = "Selecione um assunto";
    if (!form.message.trim() || form.message.length < 10) errs.message = "Mensagem muito curta";
    if (!form.lgpd) errs.lgpd = "Você precisa aceitar para continuar";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  }

  return (
    <>
      <Header />
      <main className="contato-page">
        <div className="container contato-body">
          <div className="contato-grid">
            <div className="contato-form-col">
              <h1 className="contato-title">Fale Conosco</h1>
              <p className="contato-subtitle">Respondemos em até 2h úteis</p>

              {success ? (
                <div className="contato-success">
                  <span style={{ fontSize: 48 }}>✅</span>
                  <h2>Mensagem enviada!</h2>
                  <p>Recebemos sua mensagem e responderemos em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="contato-form">
                  <div className="ff-group">
                    <label className="ff-label">Nome completo</label>
                    <input
                      type="text"
                      className={`ff-input${errors.name ? " ff-input--error" : ""}`}
                      value={form.name}
                      onChange={e => set("name", e.target.value)}
                      placeholder="Seu nome"
                    />
                    {errors.name && <span className="ff-error">{errors.name}</span>}
                  </div>

                  <div className="contato-row">
                    <div className="ff-group">
                      <label className="ff-label">E-mail</label>
                      <input
                        type="email"
                        className={`ff-input${errors.email ? " ff-input--error" : ""}`}
                        value={form.email}
                        onChange={e => set("email", e.target.value)}
                        placeholder="seu@email.com"
                      />
                      {errors.email && <span className="ff-error">{errors.email}</span>}
                    </div>
                    <div className="ff-group">
                      <label className="ff-label">Telefone <span style={{ color: "#999", fontWeight: 400 }}>(opcional)</span></label>
                      <input
                        type="tel"
                        className="ff-input"
                        value={form.phone}
                        onChange={e => set("phone", e.target.value)}
                        placeholder="(11) 99999-0000"
                      />
                    </div>
                  </div>

                  <div className="ff-group">
                    <label className="ff-label">Assunto</label>
                    <select
                      className={`ff-input${errors.subject ? " ff-input--error" : ""}`}
                      value={form.subject}
                      onChange={e => set("subject", e.target.value)}
                      style={{ cursor: "pointer" }}
                    >
                      <option value="">Selecione…</option>
                      <option value="pedido">Pedido</option>
                      <option value="orcamento">Orçamento</option>
                      <option value="duvida">Dúvida</option>
                      <option value="reclamacao">Reclamação</option>
                      <option value="outro">Outro</option>
                    </select>
                    {errors.subject && <span className="ff-error">{errors.subject}</span>}
                  </div>

                  <div className="ff-group">
                    <label className="ff-label">Mensagem</label>
                    <textarea
                      className={`ff-input ff-textarea${errors.message ? " ff-input--error" : ""}`}
                      rows={5}
                      value={form.message}
                      onChange={e => set("message", e.target.value)}
                      placeholder="Descreva sua dúvida ou solicitação…"
                    />
                    {errors.message && <span className="ff-error">{errors.message}</span>}
                  </div>

                  <label className="auth-checkbox-group" style={{ marginBottom: 4 }}>
                    <input
                      type="checkbox"
                      className="auth-checkbox"
                      checked={form.lgpd}
                      onChange={e => set("lgpd", e.target.checked)}
                    />
                    <span className="auth-checkbox-label">
                      Aceito que meus dados sejam usados para responder esta mensagem
                    </span>
                  </label>
                  {errors.lgpd && <span className="ff-error">{errors.lgpd}</span>}

                  <button type="submit" className="auth-btn-primary" disabled={loading} style={{ marginTop: 16 }}>
                    {loading ? <span className="auth-btn-spinner" /> : null}
                    {loading ? "Enviando…" : "Enviar Mensagem"}
                  </button>
                </form>
              )}
            </div>

            <div className="contato-info-col">
              <div className="contato-info-card">
                <h3>Informações de contato</h3>

                <div className="contato-info-item">
                  <span>📍</span>
                  <div>
                    <strong>Endereço</strong>
                    <p>Rua das Impressoras, 123<br />Vila Técnica — São Paulo, SP</p>
                  </div>
                </div>

                <div className="contato-info-item">
                  <span>☎️</span>
                  <div>
                    <strong>Telefone</strong>
                    <p>(11) 9 9999-0000</p>
                  </div>
                </div>

                <div className="contato-info-item">
                  <span>✉️</span>
                  <div>
                    <strong>E-mail</strong>
                    <a href="mailto:contato@tentech3d.com.br" className="contato-link">contato@tentech3d.com.br</a>
                  </div>
                </div>

                <div className="contato-info-item">
                  <span>🕐</span>
                  <div>
                    <strong>Horário</strong>
                    <p>Seg–Sex: 9h–18h<br />Sáb: 9h–13h</p>
                  </div>
                </div>

                <a
                  href="https://wa.me/5511999990000?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20falar%20com%20a%20TenTech%203D."
                  target="_blank"
                  rel="noreferrer"
                  className="contato-whatsapp-btn"
                >
                  <span>💬</span> Atendimento via WhatsApp
                </a>

                <div className="contato-socials">
                  <a href="#" className="contato-social-icon" title="Instagram">📸</a>
                  <a href="#" className="contato-social-icon" title="Facebook">📘</a>
                  <a href="#" className="contato-social-icon" title="LinkedIn">💼</a>
                  <a href="#" className="contato-social-icon" title="YouTube">▶️</a>
                </div>
              </div>
            </div>
          </div>

          <section className="contato-faq">
            <h2 className="contato-faq-title">Dúvidas Frequentes</h2>
            <div className="contato-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`contato-faq-item${openFaq === i ? " open" : ""}`}>
                  <button
                    className="contato-faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    {f.q}
                    <span className="contato-faq-arrow">{openFaq === i ? "▲" : "▼"}</span>
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
