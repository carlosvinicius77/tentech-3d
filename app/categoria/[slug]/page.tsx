import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getAllProductSlugs, getProductBySlug } from "@/app/products/[slug]/productData";

const CATEGORIES: Record<string, { name: string; description: string; emoji: string; subcategories?: string[] }> = {
  "miniaturas": {
    name: "Miniaturas",
    description: "Miniaturas impressas em 3D com detalhes incríveis para RPG, coleção e decoração.",
    emoji: "🧙",
    subcategories: ["RPG & Games", "Pets & Animais", "Personagens", "Veículos"],
  },
  "games-rpg": {
    name: "Games & RPG",
    description: "Peças, cenários e acessórios para jogos de tabuleiro e RPG de mesa.",
    emoji: "🎲",
    subcategories: ["Cenários", "Dados", "Marcadores", "Torres de Dados"],
  },
  "decoracao": {
    name: "Decoração",
    description: "Objetos decorativos únicos impressos em 3D para deixar seu espaço especial.",
    emoji: "🏠",
    subcategories: ["Bustos", "Vasos", "Luminárias", "Quadros"],
  },
  "utilidades": {
    name: "Utilidades",
    description: "Peças funcionais e utilitários do dia a dia impressos sob medida.",
    emoji: "🔧",
    subcategories: ["Suportes", "Organizadores", "Ganchos", "Adaptadores"],
  },
  "personalizados": {
    name: "Personalizados",
    description: "Produtos 100% customizados com seu nome, logo ou design exclusivo.",
    emoji: "✨",
    subcategories: ["Corporativo", "Presentes", "Brindes", "Troféus"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES[slug];
  if (!cat) return {};
  return {
    title: `${cat.name} | TenTech 3D`,
    description: cat.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map(slug => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = CATEGORIES[slug];
  if (!cat) notFound();

  const allProducts = getAllProductSlugs().map(getProductBySlug);
  const products = allProducts.filter(p =>
    p.category.toLowerCase().replace(/[^a-z0-9]/g, "-").includes(slug.split("-")[0])
  );

  return (
    <>
      <Header />
      <main className="category-page">
        <div className="category-banner">
          <div className="category-banner-emoji">{cat.emoji}</div>
          <nav className="category-breadcrumb">
            <Link href="/">Início</Link>
            <span>›</span>
            <Link href="/categorias">Categorias</Link>
            <span>›</span>
            <span>{cat.name}</span>
          </nav>
          <h1 className="category-title">{cat.name}</h1>
          <p className="category-desc">{cat.description}</p>
        </div>

        <div className="container category-body">
          {cat.subcategories && (
            <div className="category-subcats">
              {cat.subcategories.map(s => (
                <span key={s} className="category-subcat-chip">{s}</span>
              ))}
            </div>
          )}

          {products.length > 0 ? (
            <div className="search-grid">
              {products.map(p => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="search-product-card">
                  <div className="search-product-img">
                    <span style={{ fontSize: 48 }}>{cat.emoji}</span>
                  </div>
                  <div className="search-product-info">
                    <span className="search-product-cat">{p.category}</span>
                    <h3 className="search-product-name">{p.title}</h3>
                    <span className="search-product-price">{p.priceFormatted}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="search-empty">
              <div className="search-empty-icon">{cat.emoji}</div>
              <h2>Em breve!</h2>
              <p>Produtos desta categoria chegando em breve.</p>
              <Link href="/" className="auth-btn-primary" style={{ display: "inline-block", marginTop: 16 }}>
                Ver todos os produtos
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
