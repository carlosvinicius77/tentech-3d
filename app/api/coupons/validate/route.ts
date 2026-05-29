import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  code: z.string(),
  cartTotal: z.number(),
  userId: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.safeParse(body)
    if (!data.success) return NextResponse.json({ error: data.error.flatten() }, { status: 400 })

    const coupon = await prisma.coupon.findUnique({ where: { code: data.data.code.toUpperCase() } })

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ data: { valid: false, message: 'Cupom inválido' } })
    }
    if (coupon.expiresAt < new Date()) {
      return NextResponse.json({ data: { valid: false, message: 'Cupom expirado' } })
    }
    if (coupon.startsAt > new Date()) {
      return NextResponse.json({ data: { valid: false, message: 'Cupom ainda não está ativo' } })
    }
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return NextResponse.json({ data: { valid: false, message: 'Cupom esgotado' } })
    }
    if (coupon.minOrderValue && data.data.cartTotal < coupon.minOrderValue) {
      return NextResponse.json({
        data: { valid: false, message: `Pedido mínimo de R$ ${coupon.minOrderValue.toFixed(2)}` },
      })
    }
    if (data.data.userId) {
      const used = await prisma.couponUsage.findFirst({
        where: { couponId: coupon.id, userId: data.data.userId },
      })
      if (used) return NextResponse.json({ data: { valid: false, message: 'Você já usou este cupom' } })
    }

    const discount =
      coupon.type === 'PERCENT'
        ? Math.min(data.data.cartTotal * (coupon.value / 100), coupon.maxDiscount ?? Infinity)
        : coupon.value

    return NextResponse.json({
      data: { valid: true, discount, type: coupon.type.toLowerCase(), value: coupon.value },
    })
  } catch (err) {
    console.error('[coupon validate]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
