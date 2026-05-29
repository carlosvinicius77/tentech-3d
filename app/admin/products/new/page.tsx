"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const CATEGORIES = [
  "Miniaturas", "Filamentos", "Impressoras", "Decoração",
  "Acessórios", "Gaming", "Resinas", "Arquitetura", "Ferramentas",
];

interface Variation {
  material: string;
  acabamento: string;
  stock: string;
}

interface ImgPreview {
  id: string;
  src: string;
  name: string;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function NewProductPage() {
  const [name, setName]               = useState("");
  const [slug, setSlug]               = useState("");
  const [slugEdited, setSlugEdited]   = useState(false);
  const [desc, setDesc]               = useState("");
  const [price, setPrice]             = useState("");
  const [promoPrice, setPromoPrice]   = useState("");
  const [sku, setSku]                 = useState("");
  const [category, setCategory]       = useState("");
  const [tags, setTags]               = useState<string[]>([]);
  const [tagInput, setTagInput]       = useState("");
  const [peso, setPeso]               = useState("");
  const [dimC, setDimC]               = useState("");
  const [dimL, setDimL]               = useState("");
  const [dimA, setDimA]               = useState("");
  const [active, setActive]           = useState(true);
  const [images, setImages]           = useState<ImgPreview[]>([]);
  const [isDragOver, setIsDragOver]   = useState(false);
  const [dragImg, setDragImg]         = useState<string | null>(null);
  const [variations, setVariations]   = useState<Variation[]>([
    { material: "", acabamento: "", stock: "" },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (v: string) => {
    setName(v);
    if (!slugEdited) setSlug(slugify(v));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), src: e.target?.result as string, name: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const addVariation = () =>
    setVariations((prev) => [...prev, { material: "", acabamento: "", stock: "" }]);

  const updateVariation = (i: number, field: keyof Variation, value: string) =>
    setVariations((prev) => prev.map((v, idx) => (idx === i ? { ...v, [field]: value } : v)));

  const removeVariation = (i: number) =>
    setVariations((prev) => prev.filter((_, idx) => idx !== i));

  const removeImage = (id: string) =>
    setImages((prev) => prev.filter((img) => img.id !== id));

  const handleImgDragStart = (id: string) => setDragImg(id);
  const handleImgDrop = (targetId: string) => {
    if (!dragImg || dragImg === targetId) return;
    setImages((prev) => {
      const arr = [...prev];
      const fromIdx = arr.findIndex((i) => i.id === dragImg);
      const toIdx   = arr.findIndex((i) => i.id === targetId);
      const [item]  = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, item);
      return arr;
    });
    setDragImg(null);
  };

  const handleSubmit = (draft: boolean) => {
    alert(draft ? "Rascunho salvo! (demo)" : "Produto publicado! (demo)");
  };

  return (
    <>
      <div className="a-page-header">
        <div>
          <Link href="/admin/products" className="a-text-link" style={{ marginBottom: 4, display: "inline-block" }}>
            ← Produtos
          </Link>
          <h1 className="a-page-title">Novo Produto</h1>
        </div>
      </div>

      <div className="a-form-grid">
        {/* ===== MAIN COLUMN ===== */}
        <div className="a-form-main">
          {/* Basic info */}
          <div className="a-card">
            <div className="a-card-title">Informações Básicas</div>

            <div className="a-form-group">
              <label className="a-label">Nome do Produto *</label>
              <input
                className="a-input"
                placeholder="Ex: Miniatura Personalizada Dragon Age"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                style={{ fontSize: 16, fontWeight: 600 }}
              />
            </div>

            <div className="a-form-group">
              <label className="a-label">Slug (URL)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--a-muted)", fontSize: 13 }}>
                  /produtos/
                </span>
                <input
                  className="a-input"
                  style={{ paddingLeft: 72 }}
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
                />
              </div>
            </div>

            <div className="a-form-group">
              <label className="a-label">
                Descrição
                <span style={{ marginLeft: 8, color: "var(--a-muted)", fontWeight: 400 }}>
                  {desc.length}/1000
                </span>
              </label>
              <textarea
                className="a-textarea"
                placeholder="Descreva o produto em detalhes..."
                maxLength={1000}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ minHeight: 120 }}
              />
            </div>

            <div className="a-grid-3">
              <div className="a-form-group" style={{ marginBottom: 0 }}>
                <label className="a-label">Preço *</label>
                <input
                  className="a-input"
                  placeholder="R$ 0,00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="a-form-group" style={{ marginBottom: 0 }}>
                <label className="a-label">Preço Promocional</label>
                <input
                  className="a-input"
                  placeholder="R$ 0,00"
                  value={promoPrice}
                  onChange={(e) => setPromoPrice(e.target.value)}
                />
              </div>
              <div className="a-form-group" style={{ marginBottom: 0 }}>
                <label className="a-label">SKU</label>
                <input
                  className="a-input"
                  placeholder="Ex: MIN-001"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="a-card">
            <div className="a-card-title">Imagens do Produto</div>

            <div
              className={`a-dropzone${isDragOver ? " drag-over" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragOver(false); handleFiles(e.dataTransfer.files); }}
            >
              <div className="a-dropzone-icon">🖼️</div>
              <div className="a-dropzone-label">Arraste imagens aqui ou clique para selecionar</div>
              <div className="a-dropzone-sub">PNG, JPG, WebP — máx. 5MB por arquivo</div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => handleFiles(e.target.files)}
            />

            {images.length > 0 && (
              <div className="a-img-previews">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="a-img-thumb-wrap"
                    draggable
                    onDragStart={() => handleImgDragStart(img.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleImgDrop(img.id)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.name} className="a-img-thumb" />
                    <button className="a-img-remove" onClick={() => removeImage(img.id)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Variations */}
          <div className="a-card">
            <div className="a-card-title">
              Variações
              <button className="a-btn a-btn-outline a-btn-sm" onClick={addVariation}>
                + Adicionar
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px 36px", gap: "8px", marginBottom: 8 }}>
              <span className="a-label" style={{ marginBottom: 0 }}>Material</span>
              <span className="a-label" style={{ marginBottom: 0 }}>Acabamento</span>
              <span className="a-label" style={{ marginBottom: 0 }}>Estoque</span>
              <span />
            </div>

            {variations.map((v, i) => (
              <div className="a-variation-row" key={i}>
                <input
                  className="a-input"
                  placeholder="PLA, PETG..."
                  value={v.material}
                  onChange={(e) => updateVariation(i, "material", e.target.value)}
                />
                <input
                  className="a-input"
                  placeholder="Natural, Fosco..."
                  value={v.acabamento}
                  onChange={(e) => updateVariation(i, "acabamento", e.target.value)}
                />
                <input
                  className="a-input"
                  placeholder="0"
                  type="number"
                  min={0}
                  value={v.stock}
                  onChange={(e) => updateVariation(i, "stock", e.target.value)}
                />
                <button
                  className="a-btn a-btn-ghost a-btn-sm"
                  onClick={() => removeVariation(i)}
                  disabled={variations.length === 1}
                  style={{ color: "var(--a-accent)" }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== SIDE COLUMN ===== */}
        <div className="a-form-side">
          {/* Status */}
          <div className="a-card">
            <div className="a-card-title">Status</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <label className="a-toggle-switch">
                <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
                <span className="a-toggle-switch-track" />
              </label>
              <span style={{ fontSize: 13, fontWeight: 600, color: active ? "#22c55e" : "var(--a-muted)" }}>
                {active ? "Ativo" : "Rascunho"}
              </span>
            </div>
          </div>

          {/* Category */}
          <div className="a-card">
            <div className="a-card-title">Categoria</div>
            <select
              className="a-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecionar categoria...</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Tags */}
          <div className="a-card">
            <div className="a-card-title">Tags</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                className="a-input"
                placeholder="Adicionar tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
              />
              <button className="a-btn a-btn-outline" onClick={addTag}>+</button>
            </div>
            {tags.length > 0 && (
              <div className="a-tags-wrap">
                {tags.map((t) => (
                  <div key={t} className="a-tag">
                    {t}
                    <button className="a-tag-remove" onClick={() => setTags((prev) => prev.filter((x) => x !== t))}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dimensions */}
          <div className="a-card">
            <div className="a-card-title">Logística</div>
            <div className="a-form-group">
              <label className="a-label">Peso (g)</label>
              <input className="a-input" placeholder="Ex: 250" type="number" min={0} value={peso} onChange={(e) => setPeso(e.target.value)} />
            </div>
            <label className="a-label">Dimensões (cm)</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              <input className="a-input" placeholder="C" type="number" min={0} value={dimC} onChange={(e) => setDimC(e.target.value)} />
              <input className="a-input" placeholder="L" type="number" min={0} value={dimL} onChange={(e) => setDimL(e.target.value)} />
              <input className="a-input" placeholder="A" type="number" min={0} value={dimA} onChange={(e) => setDimA(e.target.value)} />
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="a-btn a-btn-outline" style={{ justifyContent: "center" }} onClick={() => handleSubmit(true)}>
              Salvar Rascunho
            </button>
            <button className="a-btn a-btn-primary" style={{ justifyContent: "center" }} onClick={() => handleSubmit(false)}>
              Publicar Produto
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
