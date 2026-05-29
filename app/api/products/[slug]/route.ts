import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        variants: true,
        reviews: { include: { user: { select: { name: true, avatar: true } } }, where: { isVisible: true } },
      },
    })

    if (!product) return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 })

    const related = await prisma.product.findMany({
      where: { categoryId: product.categoryId, id: { not: product.id }, isActive: true },
      take: 4,
    })

    return NextResponse.json({ data: { product, related } })
  } catch (err) {
    console.error('[product slug GET]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
