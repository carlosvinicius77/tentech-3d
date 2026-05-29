import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  token: z.string(),
  newPassword: z.string().min(6),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.safeParse(body)
    if (!data.success) return NextResponse.json({ error: data.error.flatten() }, { status: 400 })

    const user = await prisma.user.findFirst({
      where: {
        resetToken: data.data.token,
        resetTokenExpiry: { gt: new Date() },
      },
    })
    if (!user) return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 400 })

    const passwordHash = await bcrypt.hash(data.data.newPassword, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash, resetToken: null, resetTokenExpiry: null },
    })

    return NextResponse.json({ message: 'Senha atualizada com sucesso.' })
  } catch (err) {
    console.error('[reset-password]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
