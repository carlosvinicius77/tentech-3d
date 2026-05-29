import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const querySchema = z.object({
  category: z.string().optional(),
  material: z.string().optional(),
  acabamento: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  rating: z.coerce.number().optional(),
  sort: z.enum(['price_asc', 'price_desc', 'newest', 'popular']).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(12),
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const params = querySchema.safeParse(Object.fromEntries(searchParams))
    if (!params.success) return NextResponse.json({ error: params.error.flatten() }, { status: 400 })

    const { category, material, acabamento, minPrice, maxPrice, sort, page, limit } = params.data

    const where: Record<string, unknown> = { isActive: true }

    if (category) where.category = { slug: category }
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {}
      if (minPrice !== undefined) (where.price as Record<string, unknown>).gte = minPrice
      if (maxPrice !== undefined) (where.price as Record<string, unknown>).lte = maxPrice
    }
    if (material || acabamento) {
      where.variants = { some: {} }
      if (material) (where.variants as { some: Record<string, unknown> }).some.material = material
      if (acabamento) (where.variants as { some: Record<string, unknown> }).some.acabamento = acabamento
    }

    const orderBy: Record<string, unknown> =
      sort === 'price_asc' ? { price: 'asc' }
      : sort === 'price_desc' ? { price: 'desc' }
      : sort === 'popular' ? { reviews: { _count: 'desc' } }
      : { createdAt: 'desc' }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true, reviews: { select: { rating: true } } },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      data: {
        products,
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      },
    })
  } catch (err) {
    console.error('[products GET]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
