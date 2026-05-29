import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const order = await prisma.order.findUnique({
      where: { id },
      select: {
        orderNumber: true,
        status: true,
        trackingCode: true,
        shippingDeadline: true,
        statusHistory: { orderBy: { createdAt: 'asc' } },
      },
    })

    if (!order) return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 })

    return NextResponse.json({ data: { order } })
  } catch (err) {
    console.error('[track]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
