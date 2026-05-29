import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { sendForgotPassword } from '@/lib/email'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.safeParse(body)
    if (!data.success) return NextResponse.json({ error: 'E-mail inválido' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email: data.data.email } })

    if (user) {
      const token = crypto.randomBytes(32).toString('hex')
      const expiry = new Date(Date.now() + 60 * 60 * 1000)
      await prisma.user.update({
        where: { id: user.id },
        data: { resetToken: token, resetTokenExpiry: expiry },
      })
      await sendForgotPassword(user.email, token)
    }

    return NextResponse.json({ message: 'Se o e-mail existir, você receberá as instruções.' })
  } catch (err) {
    console.error('[forgot-password]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
