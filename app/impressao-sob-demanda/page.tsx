'use client';

import { useState, useRef, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './impressao.css';

/* ─── types ─── */
type TabId      = 'stl' | 'descricao';
type MaterialId = 'pla' | 'petg' | 'resina' | 'tpu';
type AcabId     = 'natural' | 'pintado' | 'lixado' | 'envernizado';

/* ─── data ─── */
const CORES = [
  '#FFFFFF','#1a1a2e','#000000','#FF6B6B','#FFD93D',
  '#6BCB77','#4D96FF','#FF922B','#CC5DE8','#F06595',
];

const FORM_MATERIAIS: { id: MaterialId; icon: string; nome: string; desc: string }[] = [
  { id: 'pla',   icon: '🌱', nome: 'PLA',   desc: 'Fácil de imprimir' },
  { id: 'petg',  icon: '⚙️', nome: 'PETG',  desc: 'Resistente e durável' },
  { id: 'resina',icon: '💎', nome: 'Resina',desc: 'Ultra detalhamento' },
  { id: 'tpu',   icon: '🤸', nome: 'TPU',   desc: 'Flexível' },
];

const ACABAMENTOS: { id: AcabId; icon: string; label: string }[] = [
  { id: 'natural',     icon: '🪨', label: 'Natural' },
  { id: 'pintado',     icon: '🎨', label: 'Pintado' },
  { id: 'lixado',      icon: '✨', label: 'Lixado' },
  { id: 'envernizado', icon: '🔮', label: 'Envernizado' },
];

const MATERIAIS_FULL = [
  {
    id: 'pla', icon: '🌱', nome: 'PLA',
    bg: 'rgba(107,203,119,0.15)', iconBg: '#6BCB77',
    features: ['Biodegradável', 'Acabamento suave', 'Variedade de cores'],
    idealPara: 'Decoração, protótipos, brinquedos, uso indoor',
  },
  {
    id: 'petg', icon: '⚙️', nome: 'PETG',
    bg: 'rgba(77,150,255,0.12)', iconBg: '#4D96FF',
    features: ['Resistente ao calor', 'Semi-flexível', 'Impermeável'],
    idealPara: 'Peças funcionais, uso externo, embalagens',
  },
  {
    id: 'resina', icon: '💎', nome: 'Resina',
    bg: 'rgba(204,93,232,0.12)', iconBg: '#CC5DE8',
    features: ['Alta definição', 'Superfície lisa', 'Detalhes finos ±0,1mm'],
    idealPara: 'Miniaturas, joias, próteses, arte',
  },
  {
    id: 'tpu', icon: '🤸', nome: 'TPU',
    bg: 'rgba(255,146,43,0.12)', iconBg: '#FF922B',
    features: ['100% flexível', 'Resistente a impacto', 'Antiderrapante'],
    idealPara: 'Capas, juntas, solas, protetores',
  },
  {
    id: 'abs', icon: '🔩', nome: 'ABS',
    bg: 'rgba(90,90,110,0.1)', iconBg: '#5a5a6e',
    features: ['Resistente ao calor', 'Alta durabilidade', 'Usinável'],
    idealPara: 'Peças técnicas, automotivo, caixas eletrônicas',
  },
];

const PORTFOLIO = [
  { id:1,  title:'Engrenagem Industrial', cat:'Peças Técnicas',    bg:'linear-gradient(135deg,#667eea,#764ba2)', h:200 },
  { id:2,  title:'Miniatura Arquitetônica', cat:'Maquetes',        bg:'linear-gradient(135deg,#f093fb,#f5576c)', h:260 },
  { id:3,  title:'Suporte para PCB',       cat:'Eletrônica',       bg:'linear-gradient(135deg,#4facfe,#00f2fe)', h:175 },
  { id:4,  title:'Colar Customizado',      cat:'Joalheria',         bg:'linear-gradient(135deg,#43e97b,#38f9d7)', h:245 },
  { id:5,  title:'Case para Arduino',      cat:'Maker',             bg:'linear-gradient(135deg,#fa709a,#fee140)', h:185 },
  { id:6,  title:'Peça Automotiva',        cat:'Automotivo',        bg:'linear-gradient(135deg,#a18cd1,#fbc2eb)', h:220 },
  { id:7,  title:'Protótipo de Produto',   cat:'Design Industrial', bg:'linear-gradient(135deg,#fccb90,#d57eeb)', h:200 },
  { id:8,  title:'Figura Decorativa',      cat:'Decoração',         bg:'linear-gradient(135deg,#84fab0,#8fd3f4)', h:270 },
  { id:9,  title:'Prótese Personalizada',  cat:'Saúde',             bg:'linear-gradient(135deg,#cfd9df,#a8c0ff)', h:190 },
];

const FAQS = [
  {
    q: 'Quais formatos de arquivo são aceitos?',
    a: 'Aceitamos STL, OBJ e 3MF — os formatos mais comuns em Fusion 360, Blender, SolidWorks e TinkerCAD. O arquivo deve estar em milímetros e sem erros de malha.',
  },
  {
    q: 'Qual é o prazo de entrega?',
    a: 'Peças simples em PLA ficam prontas em 3–5 dias úteis; resina em 5–7 dias; peças maiores ou com acabamento especial em 7–15 dias. Enviamos por Correios PAC, SEDEX ou transportadora.',
  },
  {
    q: 'Quais são as tolerâncias de impressão?',
    a: 'FDM (PLA, PETG, TPU, ABS): ±0,3 mm. Resina (SLA/MSLA): ±0,1 mm. Para peças com encaixe, recomendamos folga mínima de 0,4 mm entre partes móveis.',
  },
  {
    q: 'Como funciona o acabamento?',
    a: 'Natural: direto da impressora, linhas de camada visíveis. Lixado: lixas 180–800 grit. Pintado: lixado + primer + tinta acrílica ou automotiva. Envernizado: camada protetora fosca ou brilhante.',
  },
  {
    q: 'Vocês entregam para todo o Brasil?',
    a: 'Sim! Correios (PAC e SEDEX) e transportadoras parceiras para todos os estados. Frete calculado no orçamento. Na Grande Vitória/ES, retirada presencial disponível.',
  },
  {
    q: 'É possível imprimir peças muito grandes?',
    a: 'Sim. Para peças maiores que nossa área de impressão, dividimos em seções e montamos com adesivo estrutural ou conectores impressos, mantendo resistência e aparência final.',
  },
];

const DEPOIMENTOS = [
  {
    nome: 'João Silva',
    empresa: 'Engenheiro · Startup Tech SP',
    texto: 'Incrível! Enviei o STL de uma peça de encaixe para um protótipo e recebi em 4 dias. Dimensional perfeito, dentro das tolerâncias do projeto. Voltarei sempre.',
    avatarEmoji: '👨‍💼', avatarBg: '#4D96FF',
  },
  {
    nome: 'Maria Fernanda',
    empresa: 'Designer · Studio MF Joias',
    texto: 'A qualidade da resina superou minhas expectativas. Detalhes incríveis, usamos para moldes de fundição. Atendimento ágil e orçamento em menos de 1 hora.',
    avatarEmoji: '👩‍🎨', avatarBg: '#CC5DE8',
  },
  {
    nome: 'Ricardo Santos',
    empresa: 'Arquiteto · RS Projetos',
    texto: 'Fazemos maquetes arquitetônicas regularmente. A TenTech entende especificações técnicas e sempre entrega no prazo. Excelente custo-benefício.',
    avatarEmoji: '👷', avatarBg: '#43e97b',
  },
];

/* ─── component ─── */
export default function ImpressaoSobDemanda() {
  const [tab,        setTab]        = useState<TabId>('stl');
  const [material,   setMaterial]   = useState<MaterialId>('pla');
  const [acabamento, setAcabamento] = useState<AcabId>('natural');
  const [cor,        setCor]        = useState('#FFFFFF');
  const [fileStl,    setFileStl]    = useState<File | null>(null);
  const [fileRef,    setFileRef]    = useState<File | null>(null);
  const [dragging,   setDragging]   = useState(false);
  const [openFaq,    setOpenFaq]    = useState<number | null>(null);

  const stlInputRef = useRef<HTMLInputElement>(null);
  const refInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setFileStl(f);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('✅ Orçamento enviado! Entraremos em contato em até 2 horas úteis.');
  };

  return (
    <>
      <Header />
      <main>

        {/* ══════════════ HERO ══════════════ */}
        <section className="ipo-hero">
          <div className="ipo-hero-inner">
            <div className="ipo-hero-badge">
              <span>🖨️</span>
              <span>Impressão 3D Sob Demanda</span>
            </div>

            <h1 className="ipo-hero-title">
              Traga Seu Arquivo,<br />
              <span>Nós Imprimimos</span>
            </h1>

            <p className="ipo-hero-subtitle">
              Envie seu arquivo STL ou nos descreva o projeto. Peças técnicas, decoração,
              protótipos — entregamos em todo o Brasil.
            </p>

            <div className="ipo-hero-ctas">
              <a href="#orcamento" className="ipo-btn-primary">Enviar Arquivo STL →</a>
              <a href="#portfolio"  className="ipo-btn-outline">Ver Portfolio →</a>
            </div>

            {/* Como funciona */}
            <div className="ipo-steps">
              {[
                { num:'1', icon:'📤', title:'Envie o Arquivo',     desc:'Faça upload do STL ou descreva o projeto por texto' },
                { num:'2', icon:'💬', title:'Orçamento Grátis',    desc:'Analisamos e enviamos proposta em até 2h úteis' },
                { num:'3', icon:'🚀', title:'Receba em Casa',       desc:'Produzimos com qualidade e entregamos para todo o Brasil' },
              ].map((s, i, arr) => (
                <div key={s.num} className="ipo-step">
                  {i < arr.length - 1 && <span className="ipo-step-arrow">→</span>}
                  <div className="ipo-step-num">{s.num}</div>
                  <div className="ipo-step-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ FORMULÁRIO ══════════════ */}
        <section className="ipo-form-section" id="orcamento">
          <div className="ipo-form-card">
            <div className="ipo-form-header">
              <h2>Solicite seu Orçamento</h2>
              <p>Preencha as informações abaixo e receba uma proposta personalizada</p>
            </div>

            <form className="ipo-form-body" onSubmit={handleSubmit}>
              {/* Tabs */}
              <div className="ipo-tabs">
                <button
                  type="button"
                  className={`ipo-tab-btn${tab === 'stl' ? ' active' : ''}`}
                  onClick={() => setTab('stl')}
                >
                  📁 Tenho arquivo STL
                </button>
                <button
                  type="button"
                  className={`ipo-tab-btn${tab === 'descricao' ? ' active' : ''}`}
                  onClick={() => setTab('descricao')}
                >
                  ✏️ Descreva o projeto
                </button>
              </div>

              {/* ── Tab STL ── */}
              {tab === 'stl' && (
                <>
                  {/* Drop zone */}
                  <div
                    className={`ipo-drop-zone${dragging ? ' dragging' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onClick={() => stlInputRef.current?.click()}
                  >
                    <input
                      ref={stlInputRef}
                      type="file"
                      accept=".stl,.obj,.3mf"
                      style={{ display: 'none' }}
                      onChange={e => { const f = e.target.files?.[0]; if (f) setFileStl(f); }}
                    />
                    <div className="ipo-drop-icon">{fileStl ? '✅' : '📂'}</div>
                    <p className="ipo-drop-text">
                      {fileStl ? fileStl.name : 'Arraste o arquivo STL ou clique para selecionar'}
                    </p>
                    <p className="ipo-drop-hint">Aceita: .stl · .obj · .3mf &nbsp;·&nbsp; Máx. 50 MB</p>
                    {fileStl && (
                      <div className="ipo-file-chip">
                        📎 {fileStl.name} &nbsp;·&nbsp; {(fileStl.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    )}
                  </div>

                  {/* Material */}
                  <div className="ipo-form-group">
                    <label className="ipo-form-label">Material</label>
                    <div className="ipo-material-cards">
                      {FORM_MATERIAIS.map(m => (
                        <div
                          key={m.id}
                          className={`ipo-material-card${material === m.id ? ' sel' : ''}`}
                          onClick={() => setMaterial(m.id)}
                        >
                          <span className="ipo-material-icon">{m.icon}</span>
                          <div className="ipo-material-info">
                            <h4>{m.nome}</h4>
                            <p>{m.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Acabamento */}
                  <div className="ipo-form-group">
                    <label className="ipo-form-label">Acabamento</label>
                    <div className="ipo-acab-grid">
                      {ACABAMENTOS.map(a => (
                        <button
                          key={a.id}
                          type="button"
                          className={`ipo-acab-btn${acabamento === a.id ? ' sel' : ''}`}
                          onClick={() => setAcabamento(a.id)}
                        >
                          {a.icon}<br />{a.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cor */}
                  <div className="ipo-form-group">
                    <label className="ipo-form-label">Cor preferida</label>
                    <div className="ipo-colors">
                      {CORES.map(c => (
                        <div
                          key={c}
                          className={`ipo-color-dot${cor === c ? ' sel' : ''}`}
                          style={{
                            background: c,
                            boxShadow: c === '#FFFFFF'
                              ? '0 0 0 1px #ddd, 0 2px 8px rgba(0,0,0,0.1)'
                              : '0 2px 8px rgba(0,0,0,0.15)',
                          }}
                          onClick={() => setCor(c)}
                          title={c}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quantidade + Prazo */}
                  <div className="ipo-grid-2">
                    <div className="ipo-form-group" style={{ marginBottom: 0 }}>
                      <label className="ipo-form-label">Quantidade</label>
                      <input type="number" min="1" defaultValue="1" className="ipo-input" />
                    </div>
                    <div className="ipo-form-group" style={{ marginBottom: 0 }}>
                      <label className="ipo-form-label">Prazo desejado</label>
                      <select className="ipo-input" style={{ appearance: 'auto' }}>
                        <option>3–5 dias úteis</option>
                        <option>7–10 dias úteis</option>
                        <option>10–15 dias úteis</option>
                        <option>Sem pressa (melhor preço)</option>
                      </select>
                    </div>
                  </div>

                  {/* Observações */}
                  <div className="ipo-form-group" style={{ marginTop: 24 }}>
                    <label className="ipo-form-label">Observações</label>
                    <textarea
                      className="ipo-textarea"
                      placeholder="Tolerâncias específicas, cor exata (código hex/RAL), encaixes, uso final..."
                    />
                  </div>
                </>
              )}

              {/* ── Tab Descrição ── */}
              {tab === 'descricao' && (
                <>
                  <div className="ipo-form-group">
                    <label className="ipo-form-label">Descreva o que você precisa</label>
                    <textarea
                      className="ipo-textarea"
                      style={{ minHeight: 160 }}
                      placeholder="Ex: Preciso de um suporte para câmera GoPro com encaixe de ¼ de polegada, resistente à água, fixando em guidão de 31,8 mm..."
                    />
                  </div>

                  <div className="ipo-grid-2">
                    <div className="ipo-form-group">
                      <label className="ipo-form-label">Dimensões aproximadas</label>
                      <input type="text" className="ipo-input" placeholder="Ex: 10 × 5 × 3 cm" />
                    </div>
                    <div className="ipo-form-group">
                      <label className="ipo-form-label">Material preferido</label>
                      <select className="ipo-input" style={{ appearance: 'auto' }}>
                        <option value="">Não sei — me recomendem</option>
                        <option>PLA</option>
                        <option>PETG</option>
                        <option>Resina</option>
                        <option>TPU (flexível)</option>
                        <option>ABS</option>
                      </select>
                    </div>
                  </div>

                  <div className="ipo-form-group">
                    <label className="ipo-form-label">Imagem de referência (opcional)</label>
                    <div
                      className="ipo-drop-zone"
                      style={{ padding: '28px 24px', marginBottom: 0 }}
                      onClick={() => refInputRef.current?.click()}
                    >
                      <input
                        ref={refInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e => { const f = e.target.files?.[0]; if (f) setFileRef(f); }}
                      />
                      <div className="ipo-drop-icon" style={{ fontSize: 32 }}>
                        {fileRef ? '🖼️' : '📸'}
                      </div>
                      <p className="ipo-drop-text" style={{ fontSize: 13 }}>
                        {fileRef ? fileRef.name : 'Clique para adicionar imagem de referência'}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* ── Dados de contato ── */}
              <hr className="ipo-divider" />
              <p className="ipo-footer-label">Seus dados para contato</p>

              <div className="ipo-grid-2" style={{ marginBottom: 16 }}>
                <input type="text"  className="ipo-input" placeholder="Nome completo *" required />
                <input type="email" className="ipo-input" placeholder="E-mail *" required />
              </div>
              <input
                type="tel"
                className="ipo-input"
                placeholder="Telefone / WhatsApp *"
                style={{ marginBottom: 24 }}
                required
              />

              <button type="submit" className="ipo-submit-btn">
                Solicitar Orçamento Gratuito →
              </button>
              <p className="ipo-submit-hint">⏱ Respondemos em até 2 horas úteis · Sem compromisso</p>
            </form>
          </div>
        </section>

        {/* ══════════════ MATERIAIS ══════════════ */}
        <section className="ipo-mat-section">
          <div className="ipo-section-inner">
            <div className="ipo-section-hd">
              <span className="ipo-badge">Materiais</span>
              <h2 className="ipo-s-title">Escolha o Material Certo</h2>
              <p className="ipo-s-sub">Cada material tem características únicas. Nossos especialistas ajudam você a decidir.</p>
            </div>

            <div className="ipo-mat-grid">
              {MATERIAIS_FULL.map(m => (
                <div key={m.id} className="ipo-mat-card">
                  <div className="ipo-mat-ico" style={{ background: m.bg }}>
                    <span>{m.icon}</span>
                  </div>
                  <h3 className="ipo-mat-name">{m.nome}</h3>
                  <ul className="ipo-mat-features">
                    {m.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                  <div className="ipo-mat-use">
                    <strong>Ideal para</strong>
                    {m.idealPara}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ PORTFOLIO ══════════════ */}
        <section className="ipo-portfolio-section" id="portfolio">
          <div className="ipo-section-hd">
            <span className="ipo-badge">Portfolio</span>
            <h2 className="ipo-s-title">Projetos Realizados</h2>
            <p className="ipo-s-sub">Cada peça é única. Veja alguns dos projetos que já entregamos.</p>
          </div>

          <div className="ipo-portfolio-grid">
            {PORTFOLIO.map(item => (
              <div key={item.id} className="ipo-port-item">
                <div
                  className="ipo-port-img"
                  style={{ background: item.bg, height: item.h }}
                />
                <div className="ipo-port-overlay">
                  <p className="ipo-port-cat">{item.cat}</p>
                  <p className="ipo-port-name">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════ FAQ ══════════════ */}
        <section className="ipo-faq-section">
          <div className="ipo-section-inner">
            <div className="ipo-section-hd">
              <span className="ipo-badge">FAQ Técnico</span>
              <h2 className="ipo-s-title">Dúvidas Frequentes</h2>
              <p className="ipo-s-sub">Respondemos as perguntas mais comuns sobre impressão 3D sob demanda.</p>
            </div>

            <div className="ipo-faq-list">
              {FAQS.map((faq, i) => (
                <div key={i} className={`ipo-faq-item${openFaq === i ? ' open' : ''}`}>
                  <button
                    type="button"
                    className={`ipo-faq-q${openFaq === i ? ' open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <span className={`ipo-chevron${openFaq === i ? ' open' : ''}`}>▾</span>
                  </button>
                  <div className={`ipo-faq-body${openFaq === i ? ' open' : ''}`}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ DEPOIMENTOS ══════════════ */}
        <section className="ipo-testi-section">
          <div className="ipo-section-inner">
            <div className="ipo-section-hd">
              <span className="ipo-badge">Depoimentos</span>
              <h2 className="ipo-s-title">O Que Nossos Clientes Dizem</h2>
              <p className="ipo-s-sub">Mais de 500 projetos entregues com satisfação garantida.</p>
            </div>

            <div className="ipo-testi-grid">
              {DEPOIMENTOS.map((d, i) => (
                <div key={i} className="ipo-testi-card">
                  <div className="ipo-stars">★★★★★</div>
                  <p className="ipo-testi-text">"{d.texto}"</p>
                  <div className="ipo-testi-author">
                    <div className="ipo-avatar" style={{ background: d.avatarBg }}>
                      {d.avatarEmoji}
                    </div>
                    <div>
                      <p className="ipo-testi-name">{d.nome}</p>
                      <p className="ipo-testi-company">{d.empresa}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
