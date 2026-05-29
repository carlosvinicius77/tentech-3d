export interface ProductImage {
  id: string
  emoji: string
  bg: string
  alt: string
}

export interface ProductReview {
  author: string
  avatar: string
  rating: number
  date: string
  text: string
  helpful: number
}

export interface ProductSpec {
  label: string
  value: string
}

export interface RelatedProduct {
  slug: string
  icon: string
  iconBg: string
  category: string
  title: string
  price: string
  oldPrice?: string
  rating: number
  reviews: number
  badge?: string
}

export interface ProductDetail {
  slug: string
  title: string
  category: string
  description: string
  descriptionParagraphs: string[]
  sku: string
  rating: number
  reviews: number
  price: number
  oldPrice: number
  discount: number
  priceFormatted: string
  oldPriceFormatted: string
  installments: string
  stock: number
  images: ProductImage[]
  materials: string[]
  finishes: string[]
  specs: ProductSpec[]
  reviewsList: ProductReview[]
  relatedProducts: RelatedProduct[]
  ogImage: string
}

const products: ProductDetail[] = [
  {
    slug: "miniatura-rpg-guerreiro-elfico",
    title: "Miniatura RPG — Guerreiro Élfico Customizado",
    category: "Miniaturas",
    description:
      "Miniatura de alta precisão para RPG de mesa, impressa em resina com acabamento profissional. Perfeita para D&D, Pathfinder e Warhammer.",
    descriptionParagraphs: [
      "Leve suas aventuras de RPG de mesa a um nível completamente novo com nossa Miniatura Guerreiro Élfico Customizado. Produzida com a mais alta precisão usando impressão 3D de resina, cada detalhe foi cuidadosamente projetado para trazer seu personagem à vida.",
      "A miniatura apresenta um guerreiro élfico em pose de batalha, com armadura detalhada, espada longa e capa ao vento. Perfeita para jogos de D&D, Pathfinder, ou qualquer RPG de mesa que você aprecie.",
      "Disponível em diferentes materiais e acabamentos para se adequar ao seu estilo de jogo e orçamento. Cada peça é inspecionada manualmente antes do envio para garantir a mais alta qualidade.",
    ],
    sku: "TT3D-MIN-001",
    rating: 5,
    reviews: 214,
    price: 49.9,
    oldPrice: 69.9,
    discount: 28,
    priceFormatted: "R$49,90",
    oldPriceFormatted: "R$69,90",
    installments: "ou 3x de R$16,63 sem juros",
    stock: 23,
    images: [
      {
        id: "img1",
        emoji: "🎭",
        bg: "linear-gradient(135deg,#fdebd0,#f5cba7)",
        alt: "Vista frontal do guerreiro",
      },
      {
        id: "img2",
        emoji: "⚔️",
        bg: "linear-gradient(135deg,#d6eaf8,#aed6f1)",
        alt: "Detalhe da espada",
      },
      {
        id: "img3",
        emoji: "🛡️",
        bg: "linear-gradient(135deg,#d5f5e3,#a9dfbf)",
        alt: "Detalhe do escudo",
      },
      {
        id: "img4",
        emoji: "✨",
        bg: "linear-gradient(135deg,#f9e79f,#f4d03f)",
        alt: "Acabamento pintado",
      },
    ],
    materials: ["PLA", "PETG", "Resina", "TPU"],
    finishes: ["Natural", "Pintado", "Lixado"],
    specs: [
      { label: "Material padrão", value: "PLA Premium" },
      { label: "Dimensões", value: "28mm altura × 12mm base" },
      { label: "Peso", value: "~8g (PLA) / ~12g (Resina)" },
      { label: "Acabamento padrão", value: "Natural (sem pintura)" },
      { label: "Cor base", value: "Cinza miniatura" },
      { label: "Camada de impressão", value: "0,05mm (ultra-fino)" },
      { label: "Compatibilidade", value: "D&D, Pathfinder, Warhammer" },
      { label: "Inclusões", value: "Base circular 25mm inclusa" },
    ],
    reviewsList: [
      {
        author: "Rafael M.",
        avatar: "🧙",
        rating: 5,
        date: "15 mai. 2026",
        text: "Qualidade incrível! Detalhes muito bem definidos, chegou bem embalada e dentro do prazo. Com certeza comprarei mais peças.",
        helpful: 42,
      },
      {
        author: "Ana Paula",
        avatar: "🧝",
        rating: 5,
        date: "2 mai. 2026",
        text: "Perfeita para minha campanha de D&D! O acabamento pintado ficou melhor do que eu esperava. Artista muito talentoso!",
        helpful: 28,
      },
      {
        author: "Carlos V.",
        avatar: "⚔️",
        rating: 5,
        date: "20 abr. 2026",
        text: "Comprei a versão em resina e foi a melhor decisão. Detalhes que nunca vi em miniaturas desse preço no mercado brasileiro.",
        helpful: 19,
      },
      {
        author: "Mariana S.",
        avatar: "🏹",
        rating: 4,
        date: "8 abr. 2026",
        text: "Muito boa miniatura. Só achei que poderia vir com instruções de pintura para iniciantes, mas a qualidade é excelente.",
        helpful: 11,
      },
    ],
    relatedProducts: [
      {
        slug: "miniatura-de-pet",
        icon: "🐾",
        iconBg: "linear-gradient(135deg,#fef9e7,#fdebd0)",
        category: "Miniaturas",
        title: "Miniatura de Pet (a partir da sua foto)",
        price: "R$79,90",
        rating: 5,
        reviews: 421,
      },
      {
        slug: "colecao-dragoes",
        icon: "🐉",
        iconBg: "linear-gradient(135deg,#f0b27a,#e59866)",
        category: "Miniaturas",
        title: "Coleção Dragões — Pack com 5 Miniaturas",
        price: "R$189,90",
        rating: 5,
        reviews: 44,
        badge: "Novo",
      },
      {
        slug: "cenario-dungeon",
        icon: "🎮",
        iconBg: "linear-gradient(135deg,#2c2c2c,#444)",
        category: "Games & RPG",
        title: "Cenário 3D Dungeon — Set Completo",
        price: "R$299,90",
        rating: 5,
        reviews: 18,
        badge: "Novo",
      },
      {
        slug: "dado-gigante-d20",
        icon: "🎲",
        iconBg: "linear-gradient(135deg,#fdfefe,#f2f3f4)",
        category: "Games & RPG",
        title: "Dado Gigante Decorativo D20 — 15cm",
        price: "R$44,90",
        oldPrice: "R$59,90",
        rating: 4,
        reviews: 89,
        badge: "24%",
      },
    ],
    ogImage: "/og-miniatura-guerreiro.jpg",
  },
]

export function getProductBySlug(slug: string): ProductDetail {
  return products.find((p) => p.slug === slug) ?? products[0]
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug)
}
