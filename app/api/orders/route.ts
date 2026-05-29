import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendOrderConfirmation } from '@/lib/email'

const createSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string().optional(),
    quantity: z.number().min(1),
  })),
  addressId: z.string(),
  shippingMethod: z.string(),
  paymentMethod: z.enum(['PIX', 'CREDIT_CARD', 'BOLETO']),
  couponCode: z.string().optional(),
})

function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `TT-${year}-${rand}`
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
    const limit = Math.min(50, parseInt(searchParams.get('limit') ?? '10'))

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId: session.user.id },
        include: { items: true, address: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where: { userId: session.user.id } }),
    ])

    return NextResponse.json({ data: { orders, total, pages: Math.ceil(total / limit), currentPage: page } })
  } catch (err) {
    console.error('[orders GET]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    const body = await req.json()
    const data = createSchema.safeParse(body)
    if (!data.success) return NextResponse.json({ error: data.error.flatten() }, { status: 400 })

    const products = await Promise.all(
      data.data.items.map((item) =>
        prisma.product.findUnique({ where: { id: item.productId }, include: { variants: true } })
      )
    )

    let subtotal = 0
    const orderItems = data.data.items.map((item, i) => {
      const product = products[i]
      if (!product) throw new Error(`Produto não encontrado: ${item.productId}`)
      const variant = item.variantId ? product.variants.find((v: { id: string }) => v.id === item.variantId) : null
      const price = product.price + (variant?.additionalPrice ?? 0)
      subtotal += price * item.quantity
      return {
        productId: product.id,
        variantId: item.variantId,
        name: product.name,
        sku: product.sku,
        price,
        quantity: item.quantity,
        image: Array.isArray(product.images) ? (product.images as string[])[0] ?? '' : '',
      }
    })

    let discount = 0
    let couponDiscount: number | undefined
    if (data.data.couponCode) {
      const coupon = await prisma.coupon.findFirst({
        where: {
          code: data.data.couponCode,
          isActive: true,
          startsAt: { lte: new Date() },
          expiresAt: { gte: new Date() },
        },
      })
      if (coupon) {
        discount = coupon.type === 'PERCENT'
          ? Math.min(subtotal * (coupon.value / 100), coupon.maxDiscount ?? Infinity)
          : coupon.value
        couponDiscount = discount
      }
    }

    const shipping = 19.9
    const total = subtotal - discount + shipping

    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id,
        orderNumber: generateOrderNumber(),
        subtotal,
        discount,
        shipping,
        total,
        couponCode: data.data.couponCode,
        couponDiscount,
        addressId: data.data.addressId,
        shippingMethod: data.data.shippingMethod,
        paymentMethod: data.data.paymentMethod as 'PIX' | 'CREDIT_CARD' | 'BOLETO',
        items: { create: orderItems },
        statusHistory: { create: { status: 'PENDING', note: 'Pedido criado' } },
      },
      include: { items: true, address: true },
    })

    if (session?.user) {
      const address = `${order.address.street}, ${order.address.number}, ${order.address.city}-${order.address.state}`
      await sendOrderConfirmation({
        orderNumber: order.orderNumber,
        userName: session.user.name ?? '',
        userEmail: session.user.email ?? '',
        items: order.items.map((i: { name: string; image: string; price: number; quantity: number }) => ({ name: i.name, image: i.image, price: i.price, quantity: i.quantity })),
        subtotal: order.subtotal,
        shipping: order.shipping,
        discount: order.discount,
        total: order.total,
        address,
        paymentMethod: order.paymentMethod,
      })
    }

    return NextResponse.json({ data: { order } }, { status: 201 })
  } catch (err) {
    console.error('[orders POST]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
