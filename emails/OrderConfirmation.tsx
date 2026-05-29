import {
  Body, Button, Container, Head, Heading, Hr, Html,
  Preview, Section, Text, Row, Column, Img
} from '@react-email/components'

interface OrderItem {
  name: string
  image: string
  price: number
  quantity: number
  variant?: string
}

interface Props {
  orderNumber: string
  userName: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  address: string
  paymentMethod: string
}

export function OrderConfirmation(props: Props) {
  const { orderNumber, userName, items, subtotal, shipping, discount, total, address, paymentMethod } = props
  return (
    <Html>
      <Head />
      <Preview>Pedido #{orderNumber} confirmado!</Preview>
      <Body style={{ backgroundColor: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto' }}>
          <Section style={{ backgroundColor: '#1a1a2e', padding: '32px', textAlign: 'center' as const }}>
            <Heading style={{ color: '#fff', fontFamily: 'Syne, sans-serif', margin: 0 }}>
              <span style={{ color: '#e91e8c' }}>Ten</span>Tech 3D
            </Heading>
          </Section>

          <Section style={{ padding: '32px' }}>
            <Section style={{ backgroundColor: '#e8f5e9', borderRadius: 8, padding: '12px 20px', display: 'inline-block' }}>
              <Text style={{ color: '#2e7d32', fontWeight: 700, margin: 0 }}>✅ Pedido Confirmado</Text>
            </Section>

            <Heading as="h2" style={{ color: '#1a1a2e' }}>Olá {userName}, recebemos seu pedido!</Heading>

            {items.map((item, i) => (
              <Row key={i} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
                <Column style={{ width: 50 }}>
                  <Img src={item.image} width={40} height={40} style={{ borderRadius: 4 }} alt={item.name} />
                </Column>
                <Column>
                  <Text style={{ margin: 0, fontWeight: 600 }}>{item.name}</Text>
                  {item.variant && <Text style={{ margin: 0, color: '#888', fontSize: 13 }}>{item.variant}</Text>}
                </Column>
                <Column style={{ textAlign: 'right' as const }}>
                  <Text style={{ margin: 0 }}>{item.quantity}x</Text>
                  <Text style={{ margin: 0, fontWeight: 600 }}>R$ {item.price.toFixed(2)}</Text>
                </Column>
              </Row>
            ))}

            <Section style={{ backgroundColor: '#f9f9f9', borderRadius: 8, padding: '20px', marginTop: 16 }}>
              <Row>
                <Column><Text style={{ margin: '4px 0', color: '#666' }}>Subtotal</Text></Column>
                <Column style={{ textAlign: 'right' as const }}><Text style={{ margin: '4px 0' }}>R$ {subtotal.toFixed(2)}</Text></Column>
              </Row>
              <Row>
                <Column><Text style={{ margin: '4px 0', color: '#666' }}>Frete</Text></Column>
                <Column style={{ textAlign: 'right' as const }}><Text style={{ margin: '4px 0' }}>R$ {shipping.toFixed(2)}</Text></Column>
              </Row>
              {discount > 0 && (
                <Row>
                  <Column><Text style={{ margin: '4px 0', color: '#e91e8c' }}>Desconto</Text></Column>
                  <Column style={{ textAlign: 'right' as const }}><Text style={{ margin: '4px 0', color: '#e91e8c' }}>- R$ {discount.toFixed(2)}</Text></Column>
                </Row>
              )}
              <Hr />
              <Row>
                <Column><Text style={{ fontWeight: 700, margin: '4px 0' }}>Total</Text></Column>
                <Column style={{ textAlign: 'right' as const }}><Text style={{ fontWeight: 700, color: '#e91e8c', margin: '4px 0' }}>R$ {total.toFixed(2)}</Text></Column>
              </Row>
            </Section>

            <Section style={{ marginTop: 24 }}>
              <Text style={{ fontWeight: 700 }}>📦 Endereço de entrega</Text>
              <Text style={{ color: '#666', margin: 0 }}>{address}</Text>
              <Text style={{ fontWeight: 700, marginTop: 16 }}>💳 Pagamento</Text>
              <Text style={{ color: '#666', margin: 0 }}>{paymentMethod}</Text>
            </Section>

            <Section style={{ textAlign: 'center' as const, marginTop: 32 }}>
              <Button
                href={`${process.env.NEXT_PUBLIC_APP_URL}/account/orders`}
                style={{ backgroundColor: '#1a1a2e', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700 }}
              >
                Acompanhar Pedido →
              </Button>
            </Section>
          </Section>

          <Section style={{ backgroundColor: '#f5f5f5', padding: '16px 32px', textAlign: 'center' as const }}>
            <Text style={{ color: '#999', fontSize: 12 }}>© 2025 TenTech 3D</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
