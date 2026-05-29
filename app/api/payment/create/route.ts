import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createPixPayment, createCardPayment, createBoletoPayment } from '@/lib/mercadopago'

const schema = z.object({
  orderId: z.string(),
  method: z.enum(['pix', 'credit_card', 'boleto']),
  installments: z.number().optional(),
  cardToken: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    const body = await req.json()
    const data = schema.safeParse(body)
    if (!data.success) return NextResponse.json({ error: data.error.flatten() }, { status: 400 })

    const order = await prisma.order.findUnique({ where: { id: data.data.orderId } })
    if (!order) return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 })
    if (order.userId && order.userId !== session?.user?.id) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let paymentData: any

    if (data.data.method === 'pix') {
      paymentData = await createPixPayment(order)
    } else if (data.data.method === 'credit_card') {
      if (!data.data.cardToken) return NextResponse.json({ error: 'cardToken obrigatório' }, { status: 400 })
      paymentData = await createCardPayment(order, data.data.cardToken, data.data.installments ?? 1)
    } else {
      paymentData = await createBoletoPayment(order)
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: String(paymentData.paymentId) },
    })

    return NextResponse.json({ data: { paymentData } })
  } catch (err) {
    console.error('[payment create]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
