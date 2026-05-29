import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

function verifySignature(body: string, signature: string): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET ?? ''
  const hash = crypto.createHmac('sha256', secret).update(body).digest('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature))
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-signature') ?? ''

  if (process.env.MERCADOPAGO_WEBHOOK_SECRET && !verifySignature(body, signature)) {
    return NextResponse.json({ error: 'Assinatura inválida' }, { status: 401 })
  }

  try {
    const payload = JSON.parse(body)
    const type: string = payload.type ?? payload.action ?? ''
    const paymentId: string = String(payload.data?.id ?? '')

    if ((type === 'payment' || type === 'payment.updated') && paymentId) {
      const order = await prisma.order.findFirst({ where: { paymentId } })
      if (order) {
        const mpStatus: string = payload.data?.status ?? 'unknown'
        const newStatus = mpStatus === 'approved' ? 'PAID'
          : mpStatus === 'rejected' ? 'CANCELLED'
          : undefined

        if (newStatus) {
          await prisma.order.update({
            where: { id: order.id },
            data: {
              paymentStatus: mpStatus === 'approved' ? 'APPROVED' : 'REJECTED',
              status: newStatus as 'PAID' | 'CANCELLED',
              statusHistory: { create: { status: newStatus as 'PAID' | 'CANCELLED', note: `Pagamento ${mpStatus}` } },
            },
          })
        }
      }
    }
  } catch (err) {
    console.error('[webhook]', err)
  }

  return NextResponse.json({ received: true })
}
