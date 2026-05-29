import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getAllProductSlugs, getProductBySlug } from "@/app/products/[slug]/productData";

export default function NotFound() {
  const featured = getAllProductSlugs().slice(0, 4).map(getProductBySlug);

  return (
    <>
      <Header />
      <main className="notfound-page">
        <div className="notfound-hero">
          <div className="notfound-cube-wrapper">
            <div className="notfound-cube">
              <div className="cube-face cube-front">3D</div>
              <div className="cube-face cube-back">404</div>
              <div className="cube-face cube-left">🖨️</div>
              <div className="cube-face cube-right">😅</div>
              <div className="cube-face cube-top"></div>
              <div className="cube-face cube-bottom"></div>
            </div>
          </div>

          <div className="notfound-num">404</div>
          <h1 className="notfound-title">Ops! Página não encontrada</h1>
          <p className="notfound-text">
            Parece que esta página foi impressa em uma dimensão diferente.
            Não se preocupe — você pode buscar o que precisa ou voltar para a home.
          </p>

          <form action="/search" method="get" className="notfound-search">
            <input
              type="search"
              name="q"
              placeholder="Buscar produtos…"
              className="ff-input notfound-search-input"
            />
            <button type="submit" className="auth-btn-primary notfound-search-btn">Buscar</button>
          </form>

          <Link href="/" className="notfound-home-btn">← Voltar para a Home</Link>
        </div>

        <div className="container notfound-products">
          <h2 className="notfound-products-title">Produtos em Destaque</h2>
          <div className="search-grid">
            {featured.map(p => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="search-product-card">
                <div className="search-product-img">
                  <span style={{ fontSize: 48 }}>🖨️</span>
                </div>
                <div className="search-product-info">
                  <span className="search-product-cat">{p.category}</span>
                  <h3 className="search-product-name">{p.title}</h3>
                  <span className="search-product-price">{p.priceFormatted}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
