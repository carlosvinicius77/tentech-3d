import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder')

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string(),
  description: z.string().min(10),
  material: z.string(),
  acabamento: z.string(),
  quantity: z.number().min(1),
  fileUrl: z.string().url().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.safeParse(body)
    if (!data.success) return NextResponse.json({ error: data.error.flatten() }, { status: 400 })

    const quote = await prisma.quote.create({ data: data.data })

    await Promise.allSettled([
      resend.emails.send({
        from: process.env.FROM_EMAIL ?? 'TenTech 3D <noreply@tentech3d.com.br>',
        to: 'contato@tentech3d.com.br',
        subject: `Novo orçamento de ${data.data.name}`,
        text: `Orçamento #${quote.id}\n\nNome: ${data.data.name}\nEmail: ${data.data.email}\nMaterial: ${data.data.material}\nAcabamento: ${data.data.acabamento}\nQuantidade: ${data.data.quantity}\n\n${data.data.description}`,
      }),
      resend.emails.send({
        from: process.env.FROM_EMAIL ?? 'TenTech 3D <noreply@tentech3d.com.br>',
        to: data.data.email,
        subject: 'Orçamento recebido — TenTech 3D',
        text: `Olá ${data.data.name},\n\nRecebemos sua solicitação de orçamento! Nossa equipe analisará e entrará em contato em até 24 horas.\n\nEquipe TenTech 3D`,
      }),
    ])

    return NextResponse.json({ data: { quote: { id: quote.id } } }, { status: 201 })
  } catch (err) {
    console.error('[quote]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
