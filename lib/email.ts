import { Resend } from 'resend'
import { WelcomeEmail } from '@/emails/WelcomeEmail'
import { OrderConfirmation } from '@/emails/OrderConfirmation'
import { OrderShipped } from '@/emails/OrderShipped'
import { ForgotPasswordEmail } from '@/emails/ForgotPassword'
import { AbandonedCart } from '@/emails/AbandonedCart'
import { createElement } from 'react'

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder')
const FROM = process.env.FROM_EMAIL ?? 'TenTech 3D <noreply@tentech3d.com.br>'

export interface CartItem {
  name: string
  image: string
  price: number
  quantity: number
}

export async function sendWelcomeEmail(user: { name: string; email: string }) {
  try {
    await resend.emails.send({
      from: FROM,
      to: user.email,
      subject: `Bem-vindo à TenTech 3D, ${user.name}! 🎉`,
      react: createElement(WelcomeEmail, { name: user.name }),
    })
  } catch (err) {
    console.error('[email] sendWelcomeEmail failed', err)
  }
}

export async function sendOrderConfirmation(order: {
  orderNumber: string
  userName: string
  userEmail: string
  items: { name: string; image: string; price: number; quantity: number; variant?: string }[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  address: string
  paymentMethod: string
}) {
  try {
    await resend.emails.send({
      from: FROM,
      to: order.userEmail,
      subject: `Pedido #${order.orderNumber} confirmado! ✅`,
      react: createElement(OrderConfirmation, order),
    })
  } catch (err) {
    console.error('[email] sendOrderConfirmation failed', err)
  }
}

export async function sendOrderShipped(params: {
  userEmail: string
  userName: string
  orderNumber: string
  trackingCode: string
  estimatedDelivery: string
  items: { name: string; quantity: number }[]
}) {
  try {
    await resend.emails.send({
      from: FROM,
      to: params.userEmail,
      subject: `Seu pedido foi enviado! 🚚 Rastreie agora`,
      react: createElement(OrderShipped, params),
    })
  } catch (err) {
    console.error('[email] sendOrderShipped failed', err)
  }
}

export async function sendForgotPassword(email: string, token: string) {
  try {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Redefina sua senha — TenTech 3D 🔐',
      react: createElement(ForgotPasswordEmail, { resetUrl }),
    })
  } catch (err) {
    console.error('[email] sendForgotPassword failed', err)
  }
}

export async function sendAbandonedCart(
  user: { name: string; email: string },
  cartItems: CartItem[]
) {
  try {
    await resend.emails.send({
      from: FROM,
      to: user.email,
      subject: 'Você esqueceu algo no carrinho 🛒',
      react: createElement(AbandonedCart, { name: user.name, items: cartItems }),
    })
  } catch (err) {
    console.error('[email] sendAbandonedCart failed', err)
  }
}
