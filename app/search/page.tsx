"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getAllProductSlugs, getProductBySlug } from "@/app/products/[slug]/productData";

const allProducts = getAllProductSlugs().map(getProductBySlug);
const POPULAR_SEARCHES = ["Miniatura RPG", "Suporte celular", "Busto decorativo", "Engrenagem", "Porta-chaves", "Peças personalizadas"];

function highlight(text: string, query: string) {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(re);
  return parts.map((part, i) =>
    re.test(part) ? <mark key={i} className="search-mark">{part}</mark> : part
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = JSON.parse(localStorage.getItem("tentech_search_history") || "[]");
    setHistory(saved);
    if (q) {
      const updated = [q, ...saved.filter((s: string) => s !== q)].slice(0, 6);
      localStorage.setItem("tentech_search_history", JSON.stringify(updated));
      setHistory(updated);
    }
  }, [q]);

  const results = q
    ? allProducts.filter(p =>
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.category.toLowerCase().includes(q.toLowerCase())
      )
    : [];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
  }

  return (
    <>
      <Header />
      <main className="search-page">
        <div className="search-hero">
          <div className="container">
            <form onSubmit={handleSearch} className="search-hero-form">
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="O que você está procurando?"
                className="search-hero-input"
                autoFocus
              />
              <button type="submit" className="search-hero-btn">Buscar</button>
            </form>
          </div>
        </div>

        <div className="container search-body">
          {q ? (
            <>
              <div className="search-header">
                <h1 className="search-title">
                  Resultados para: <span className="search-term">"{q}"</span>
                </h1>
                <p className="search-count">{results.length} produto{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}</p>
              </div>

              {results.length > 0 ? (
                <div className="search-grid">
                  {results.map(p => (
                    <Link key={p.slug} href={`/products/${p.slug}`} className="search-product-card">
                      <div className="search-product-img" style={{ background: "#f0f0f0" }}>
                        <span style={{ fontSize: 48 }}>🖨️</span>
                      </div>
                      <div className="search-product-info">
                        <span className="search-product-cat">{p.category}</span>
                        <h3 className="search-product-name">{highlight(p.title, q)}</h3>
                        <span className="search-product-price">{p.priceFormatted}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="search-empty">
                  <div className="search-empty-icon">🔍</div>
                  <h2>Nenhum resultado para "{q}"</h2>
                  <p>Tente termos mais curtos ou navegue pelas categorias abaixo.</p>
                  <div className="search-chips">
                    {POPULAR_SEARCHES.map(s => (
                      <a key={s} href={`/search?q=${encodeURIComponent(s)}`} className="search-chip">{s}</a>
                    ))}
                  </div>
                </div>
              )}

              <div className="search-related">
                <h3>Buscas populares</h3>
                <div className="search-chips">
                  {POPULAR_SEARCHES.map(s => (
                    <a key={s} href={`/search?q=${encodeURIComponent(s)}`} className="search-chip">{s}</a>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="search-landing">
              {history.length > 0 && (
                <div className="search-section">
                  <h3>Buscas recentes</h3>
                  <div className="search-chips">
                    {history.map(s => (
                      <a key={s} href={`/search?q=${encodeURIComponent(s)}`} className="search-chip search-chip--history">
                        🕐 {s}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <div className="search-section">
                <h3>Buscas populares</h3>
                <div className="search-chips">
                  {POPULAR_SEARCHES.map(s => (
                    <a key={s} href={`/search?q=${encodeURIComponent(s)}`} className="search-chip">{s}</a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
