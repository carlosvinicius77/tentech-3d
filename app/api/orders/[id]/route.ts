import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const patchSchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'PRINTING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']),
  note: z.string().optional(),
})

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    const { id } = await params

    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true, address: true, statusHistory: { orderBy: { createdAt: 'asc' } } },
    })

    if (!order) return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 })

    const isOwner = session?.user?.id === order.userId
    const isAdmin = session?.user?.role === 'ADMIN'
    if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })

    return NextResponse.json({ data: { order } })
  } catch (err) {
    console.error('[order GET]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (session?.user?.role !== 'ADMIN') return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })

    const { id } = await params
    const body = await req.json()
    const data = patchSchema.safeParse(body)
    if (!data.success) return NextResponse.json({ error: data.error.flatten() }, { status: 400 })

    const order = await prisma.order.update({
      where: { id },
      data: {
        status: data.data.status,
        statusHistory: { create: { status: data.data.status, note: data.data.note } },
      },
    })

    return NextResponse.json({ data: { order } })
  } catch (err) {
    console.error('[order PATCH]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
