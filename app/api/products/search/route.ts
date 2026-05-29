import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  q: z.string().min(1),
  limit: z.coerce.number().min(1).max(50).default(10),
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const params = schema.safeParse(Object.fromEntries(searchParams))
    if (!params.success) return NextResponse.json({ error: 'Query inválida' }, { status: 400 })

    const { q, limit } = params.data
    const term = q.toLowerCase()

    const results = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: term, mode: 'insensitive' } },
          { description: { contains: term, mode: 'insensitive' } },
          { shortDescription: { contains: term, mode: 'insensitive' } },
          { category: { name: { contains: term, mode: 'insensitive' } } },
        ],
      },
      include: { category: true },
      take: limit,
    })

    const suggestions = [...new Set(results.map((p: { name: string }) => p.name.split(' ').slice(0, 3).join(' ')))].slice(0, 5)

    return NextResponse.json({ data: { results, suggestions } })
  } catch (err) {
    console.error('[search]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
