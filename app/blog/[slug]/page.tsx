import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const POSTS: Record<string, {
  category: string; title: string; date: string; author: string; readTime: string; emoji: string;
  content: string; tags: string[];
}> = {
  "guia-materiais-impressao-3d": {
    category: "Materiais",
    title: "Guia Completo dos Materiais de Impressão 3D: PLA, PETG, Resina e Mais",
    date: "20 de maio de 2025",
    author: "Carlos Vinicius",
    readTime: "8 min",
    emoji: "🧪",
    tags: ["materiais", "pla", "petg", "resina", "iniciantes"],
    content: `
      <h2>PLA — O Material do Iniciante</h2>
      <p>O PLA (Ácido Polilático) é o material mais popular na impressão FDM por ser biodegradável, fácil de imprimir e disponível em centenas de cores. Ideal para miniaturas, modelos decorativos e peças que não precisam de alta resistência térmica.</p>
      <h3>Vantagens do PLA</h3>
      <ul>
        <li>Fácil de imprimir — menos warping</li>
        <li>Excelente acabamento de superfície</li>
        <li>Ecologicamente mais amigável</li>
        <li>Grande variedade de cores e acabamentos (silk, matte, glow)</li>
      </ul>
      <h2>PETG — O Equilíbrio Perfeito</h2>
      <p>O PETG combina a facilidade do PLA com a resistência do ABS. É resistente à umidade, a produtos químicos e tem boa tolerância térmica (80°C+). Excelente para peças funcionais.</p>
      <h2>Resina — Máximo Detalhe</h2>
      <p>Impressoras de resina (SLA/MSLA) produzem peças com resolução muito superior ao FDM. Camadas de 0,025mm garantem detalhes impossíveis no filamento. Ideal para miniaturas de RPG e joias.</p>
    `,
  },
  "como-modelar-miniaturas-rpg": {
    category: "Tutoriais",
    title: "Como Modelar Miniaturas para RPG: Do Zero ao Print",
    date: "15 de maio de 2025",
    author: "Ana Lima",
    readTime: "12 min",
    emoji: "🎲",
    tags: ["modelagem", "rpg", "blender", "miniaturas"],
    content: `
      <h2>Ferramentas Recomendadas</h2>
      <p>Para modelagem de miniaturas, recomendamos o <strong>Blender</strong> (gratuito) em conjunto com o addon <strong>Sculpt Tools</strong>. Para iniciantes, o <strong>ZBrushCore Mini</strong> também é uma opção acessível.</p>
      <h2>Configurações para Impressão</h2>
      <p>Ao exportar para impressão, certifique-se que o modelo está em escala 1:1, sem faces invertidas e com espessura mínima de 1mm nas partes mais finas.</p>
      <h3>Dica de Suportes</h3>
      <p>Posicione a miniatura em 45° para reduzir a área de suporte. Use suportes tipo "tree" no Chitubox ou Lychee Slicer para peças de resina.</p>
    `,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  return { title: `${post.title} | Blog TenTech 3D`, description: post.content.replace(/<[^>]+>/g, "").slice(0, 155) };
}

export async function generateStaticParams() {
  return Object.keys(POSTS).map(slug => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  const related = Object.entries(POSTS).filter(([s]) => s !== slug).slice(0, 2);

  return (
    <>
      <Header />
      <article className="blog-post-page">
        <div className="blog-post-header">
          <div className="container">
            <span className="blog-badge">{post.category}</span>
            <h1 className="blog-post-title">{post.title}</h1>
            <div className="blog-meta" style={{ marginTop: 12 }}>
              <span>{post.author}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime} de leitura</span>
            </div>
          </div>
        </div>

        <div className="blog-post-hero">
          <span style={{ fontSize: 100 }}>{post.emoji}</span>
        </div>

        <div className="container blog-post-body">
          <div className="blog-post-content">
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="blog-post-tags">
              {post.tags.map(t => (
                <span key={t} className="blog-tag">#{t}</span>
              ))}
            </div>

            <div className="blog-post-share">
              <span>Compartilhar:</span>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer" className="blog-share-btn">Twitter</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://tentech3d.vercel.app/blog/${slug}`)}`} target="_blank" rel="noreferrer" className="blog-share-btn">LinkedIn</a>
            </div>
          </div>

          <aside className="blog-sidebar">
            <div className="blog-sidebar-card">
              <h3>Posts Relacionados</h3>
              {related.map(([s, p]) => (
                <Link key={s} href={`/blog/${s}`} className="blog-related-item">
                  <span className="blog-related-emoji">{p.emoji}</span>
                  <div>
                    <span className="blog-badge" style={{ fontSize: 10 }}>{p.category}</span>
                    <p className="blog-related-title">{p.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </article>

      <div className="container" style={{ paddingBottom: 40 }}>
        <Link href="/blog" className="auth-link-pink">← Voltar ao Blog</Link>
      </div>
      <Footer />
    </>
  );
}
