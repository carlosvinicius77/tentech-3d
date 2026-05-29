import { MercadoPagoConfig, Payment } from 'mercadopago'
import { prisma } from '@/lib/prisma'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

const payment = new Payment(client)

export interface PaymentResult {
  paymentId: string
  status: string
  statusDetail: string
}

export async function createPixPayment(order: {
  id: string
  total: number
  orderNumber: string
  guestEmail?: string | null
  userId?: string | null
}) {
  const user = order.userId
    ? await prisma.user.findUnique({ where: { id: order.userId } })
    : null

  const result = await payment.create({
    body: {
      transaction_amount: order.total,
      description: `Pedido ${order.orderNumber} - TenTech 3D`,
      payment_method_id: 'pix',
      payer: {
        email: user?.email ?? order.guestEmail ?? 'guest@tentech3d.com.br',
        first_name: user?.name?.split(' ')[0],
      },
    },
  })

  return {
    qrCode: result.point_of_interaction?.transaction_data?.qr_code ?? '',
    qrCodeBase64: result.point_of_interaction?.transaction_data?.qr_code_base64 ?? '',
    paymentId: String(result.id),
  }
}

export async function createCardPayment(
  order: { id: string; total: number; orderNumber: string; userId?: string | null; guestEmail?: string | null },
  cardToken: string,
  installments: number
): Promise<PaymentResult> {
  const user = order.userId
    ? await prisma.user.findUnique({ where: { id: order.userId } })
    : null

  const result = await payment.create({
    body: {
      transaction_amount: order.total,
      token: cardToken,
      description: `Pedido ${order.orderNumber} - TenTech 3D`,
      installments,
      payment_method_id: 'visa',
      payer: {
        email: user?.email ?? order.guestEmail ?? 'guest@tentech3d.com.br',
      },
    },
  })

  return {
    paymentId: String(result.id),
    status: result.status ?? 'unknown',
    statusDetail: result.status_detail ?? '',
  }
}

export async function createBoletoPayment(order: {
  id: string
  total: number
  orderNumber: string
  userId?: string | null
  guestEmail?: string | null
}) {
  const user = order.userId
    ? await prisma.user.findUnique({ where: { id: order.userId } })
    : null

  const result = await payment.create({
    body: {
      transaction_amount: order.total,
      description: `Pedido ${order.orderNumber} - TenTech 3D`,
      payment_method_id: 'bolbradesco',
      payer: {
        email: user?.email ?? order.guestEmail ?? 'guest@tentech3d.com.br',
        first_name: user?.name?.split(' ')[0],
        last_name: user?.name?.split(' ').slice(1).join(' '),
        identification: { type: 'CPF', number: user?.cpf ?? '00000000000' },
      },
    },
  })

  return {
    boletoUrl: result.transaction_details?.external_resource_url ?? '',
    barCode: ((result as unknown) as { barcode?: { content?: string } }).barcode?.content ?? '',
    paymentId: String(result.id),
  }
}

export async function getPaymentStatus(paymentId: string) {
  const result = await payment.get({ id: paymentId })
  return result.status
}
