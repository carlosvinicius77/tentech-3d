import {
  Body, Button, Container, Head, Heading, Html,
  Preview, Section, Text
} from '@react-email/components'

interface Props {
  userName: string
  orderNumber: string
  trackingCode: string
  estimatedDelivery: string
  items: { name: string; quantity: number }[]
}

export function OrderShipped({ userName, orderNumber, trackingCode, estimatedDelivery, items }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Seu pedido #{orderNumber} foi enviado!</Preview>
      <Body style={{ backgroundColor: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto' }}>
          <Section style={{ backgroundColor: '#1a1a2e', padding: '32px', textAlign: 'center' as const }}>
            <Heading style={{ color: '#fff', fontFamily: 'Syne, sans-serif', margin: 0 }}>
              <span style={{ color: '#e91e8c' }}>Ten</span>Tech 3D
            </Heading>
          </Section>

          <Section style={{ padding: '32px' }}>
            <Section style={{ backgroundColor: '#e3f2fd', borderRadius: 8, padding: '12px 20px', display: 'inline-block' }}>
              <Text style={{ color: '#1565c0', fontWeight: 700, margin: 0 }}>🚚 Em Trânsito</Text>
            </Section>

            <Heading as="h2" style={{ color: '#1a1a2e' }}>Olá {userName}, seu pedido está a caminho!</Heading>

            <Section style={{ backgroundColor: '#f5f5f5', borderRadius: 8, padding: '20px', textAlign: 'center' as const }}>
              <Text style={{ color: '#888', margin: 0, fontSize: 13 }}>Código de Rastreamento</Text>
              <Text style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3, color: '#1a1a2e', margin: '8px 0' }}>
                {trackingCode}
              </Text>
              <Text style={{ color: '#888', margin: 0, fontSize: 13 }}>Previsão: {estimatedDelivery}</Text>
            </Section>

            <Section style={{ textAlign: 'center' as const, marginTop: 24 }}>
              <Button
                href={`https://www.correios.com.br/rastreamento/${trackingCode}`}
                style={{ backgroundColor: '#1565c0', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700 }}
              >
                Rastrear Pedido →
              </Button>
            </Section>

            <Section style={{ marginTop: 24 }}>
              <Text style={{ fontWeight: 700 }}>Itens do pedido:</Text>
              {items.map((item, i) => (
                <Text key={i} style={{ color: '#666', margin: '4px 0' }}>
                  • {item.name} x{item.quantity}
                </Text>
              ))}
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
