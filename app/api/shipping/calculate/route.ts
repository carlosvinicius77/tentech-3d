import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { calculateShipping } from '@/lib/melhorenvio'

const schema = z.object({
  cep: z.string().min(8),
  items: z.array(z.object({
    weight: z.number(),
    width: z.number(),
    height: z.number(),
    length: z.number(),
    quantity: z.number(),
  })),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.safeParse(body)
    if (!data.success) return NextResponse.json({ error: data.error.flatten() }, { status: 400 })

    const options = await calculateShipping({ to: data.data.cep, products: data.data.items })

    return NextResponse.json({ data: { options } })
  } catch (err) {
    console.error('[shipping calculate]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
