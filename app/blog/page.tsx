import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Blog | TenTech 3D",
  description: "Dicas, tutoriais e novidades sobre impressão 3D.",
};

const CATEGORIES = ["Todos", "Tutoriais", "Materiais", "Dicas", "Novidades", "Cases"];

const POSTS = [
  {
    slug: "guia-materiais-impressao-3d",
    category: "Materiais",
    title: "Guia Completo dos Materiais de Impressão 3D: PLA, PETG, Resina e Mais",
    excerpt: "Entenda as diferenças entre os principais materiais e saiba qual escolher para cada tipo de projeto.",
    author: "Carlos Vinicius",
    date: "20 de maio de 2025",
    readTime: "8 min",
    featured: true,
    emoji: "🧪",
  },
  {
    slug: "como-modelar-miniaturas-rpg",
    category: "Tutoriais",
    title: "Como Modelar Miniaturas para RPG: Do Zero ao Print",
    excerpt: "Aprenda o fluxo completo de modelagem 3D para criar suas próprias miniaturas de RPG.",
    author: "Ana Lima",
    date: "15 de maio de 2025",
    readTime: "12 min",
    emoji: "🎲",
  },
  {
    slug: "post-processamento-pintura",
    category: "Dicas",
    title: "Post-processamento e Pintura: Elevando o Nível das suas Peças",
    excerpt: "Técnicas de lixamento, primer e pintura acrílica para peças impressas em 3D.",
    author: "Carlos Vinicius",
    date: "10 de maio de 2025",
    readTime: "6 min",
    emoji: "🎨",
  },
  {
    slug: "novidades-2025-tentech",
    category: "Novidades",
    title: "TenTech 3D em 2025: Novas Impressoras, Materiais e Serviços",
    excerpt: "Conheça as novidades que preparamos para este ano: mais velocidade, mais materiais, mais qualidade.",
    author: "TenTech 3D",
    date: "5 de maio de 2025",
    readTime: "4 min",
    emoji: "🚀",
  },
  {
    slug: "case-empresa-brindes-corporativos",
    category: "Cases",
    title: "Case: Como uma Empresa Economizou 60% em Brindes Corporativos com Impressão 3D",
    excerpt: "Veja como a TechStart substituiu brindes importados por peças personalizadas impressas em 3D.",
    author: "Ana Lima",
    date: "28 de abril de 2025",
    readTime: "5 min",
    emoji: "🏆",
  },
  {
    slug: "resolucao-layer-height",
    category: "Tutoriais",
    title: "Layer Height x Qualidade: Qual a Resolução Ideal para sua Peça?",
    excerpt: "Entenda como a altura de camada afeta o tempo de impressão, resistência e aparência final.",
    author: "Carlos Vinicius",
    date: "20 de abril de 2025",
    readTime: "7 min",
    emoji: "📐",
  },
];

export default function BlogPage() {
  const featured = POSTS.find(p => p.featured);
  const others = POSTS.filter(p => !p.featured);

  return (
    <>
      <Header />
      <main className="blog-page">
        <div className="blog-hero">
          <div className="container">
            <h1 className="blog-hero-title">Blog <span>TenTech 3D</span></h1>
            <p className="blog-hero-subtitle">Dicas, tutoriais e novidades sobre o mundo da impressão 3D</p>
          </div>
        </div>

        <div className="container blog-body">
          <div className="blog-categories">
            {CATEGORIES.map(c => (
              <button key={c} className={`blog-cat-chip${c === "Todos" ? " active" : ""}`}>{c}</button>
            ))}
          </div>

          {featured && (
            <Link href={`/blog/${featured.slug}`} className="blog-featured">
              <div className="blog-featured-img">
                <span style={{ fontSize: 80 }}>{featured.emoji}</span>
              </div>
              <div className="blog-featured-content">
                <span className="blog-badge">{featured.category}</span>
                <h2 className="blog-featured-title">{featured.title}</h2>
                <p className="blog-featured-excerpt">{featured.excerpt}</p>
                <div className="blog-meta">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime} de leitura</span>
                </div>
                <span className="blog-cta">Ler artigo →</span>
              </div>
            </Link>
          )}

          <div className="blog-grid">
            {others.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
                <div className="blog-card-img">
                  <span style={{ fontSize: 52 }}>{p.emoji}</span>
                </div>
                <div className="blog-card-body">
                  <span className="blog-badge">{p.category}</span>
                  <h3 className="blog-card-title">{p.title}</h3>
                  <p className="blog-card-excerpt">{p.excerpt}</p>
                  <div className="blog-meta">
                    <span>{p.author}</span>
                    <span>·</span>
                    <span>{p.readTime} de leitura</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="blog-pagination">
            <button className="blog-page-btn active">1</button>
            <button className="blog-page-btn">2</button>
            <button className="blog-page-btn">3</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
