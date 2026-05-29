import { NextRequest, NextResponse } from "next/server";
import type { Review } from "@/components/reviews/types";

const store: Review[] = [
  {
    id: "rv1",
    userId: "u1",
    productId: "miniatura-rpg-guerreiro-elfico",
    rating: 5,
    title: "Qualidade incrível!",
    body: "Fiquei impressionado com o nível de detalhe. Chegou rápido, bem embalado. Recomendo a TenTech 3D para qualquer um que queira miniaturas de qualidade.",
    photos: [],
    helpful: 12,
    notHelpful: 0,
    verified: true,
    material: "Resina",
    acabamento: "Pintado",
    createdAt: new Date("2025-05-15"),
    user: { name: "João Silva" },
  },
  {
    id: "rv2",
    userId: "u2",
    productId: "miniatura-rpg-guerreiro-elfico",
    rating: 4,
    title: "Muito bom, entrega rápida",
    body: "O produto chegou antes do prazo e a qualidade superou minhas expectativas. A miniatura tem detalhes que não esperava para o preço. Só dei 4 estrelas porque o suporte demorou um pouco para responder.",
    photos: [],
    helpful: 5,
    notHelpful: 1,
    verified: true,
    material: "PLA",
    acabamento: "Natural",
    createdAt: new Date("2025-05-10"),
    user: { name: "Maria Oliveira" },
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const page = parseInt(searchParams.get("page") || "1");
  const filter = searchParams.get("filter") || "recent";
  const rating = searchParams.get("rating");
  const perPage = 10;

  let results = productId ? store.filter(r => r.productId === productId) : store;

  if (rating) results = results.filter(r => r.rating === parseInt(rating));

  if (filter === "highest") results.sort((a, b) => b.rating - a.rating);
  else if (filter === "lowest") results.sort((a, b) => a.rating - b.rating);
  else if (filter === "photos") results = results.filter(r => r.photos.length > 0);
  else results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const total = results.length;
  const paginated = results.slice((page - 1) * perPage, page * perPage);
  const average = total > 0 ? results.reduce((s, r) => s + r.rating, 0) / total : 0;

  const distribution = [1, 2, 3, 4, 5].map(stars => ({
    stars,
    count: results.filter(r => r.rating === stars).length,
  }));

  return NextResponse.json({ reviews: paginated, total, average, distribution, page, pages: Math.ceil(total / perPage) });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { productId, rating, title, body: text, photos, material, acabamento } = body;

  if (!productId || !rating || !text || text.length < 30) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const review: Review = {
    id: `rv${Date.now()}`,
    userId: "current_user",
    productId,
    rating,
    title: title || "",
    body: text,
    photos: photos || [],
    helpful: 0,
    notHelpful: 0,
    verified: false,
    material,
    acabamento,
    createdAt: new Date(),
    user: { name: "Usuário" },
  };

  store.push(review);
  return NextResponse.json(review, { status: 201 });
}
