import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { sendWelcomeEmail } from '@/lib/email'

function validateCPF(cpf: string): boolean {
  const c = cpf.replace(/\D/g, '')
  if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false
  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(c[i]) * (10 - i)
  let r = 11 - (sum % 11)
  if (r >= 10) r = 0
  if (r !== parseInt(c[9])) return false
  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(c[i]) * (11 - i)
  r = 11 - (sum % 11)
  if (r >= 10) r = 0
  return r === parseInt(c[10])
}

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  cpf: z.string().refine(validateCPF, 'CPF inválido'),
  phone: z.string().optional(),
  password: z.string().min(6),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.safeParse(body)
    if (!data.success) return NextResponse.json({ error: data.error.flatten() }, { status: 400 })

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email: data.data.email }, { cpf: data.data.cpf }] },
    })
    if (existing) {
      return NextResponse.json({ error: 'E-mail ou CPF já cadastrado' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(data.data.password, 10)
    const user = await prisma.user.create({
      data: {
        name: data.data.name,
        email: data.data.email,
        cpf: data.data.cpf,
        phone: data.data.phone,
        passwordHash,
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    })

    await sendWelcomeEmail({ name: user.name, email: user.email })

    return NextResponse.json({ data: { user } }, { status: 201 })
  } catch (err) {
    console.error('[register]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
