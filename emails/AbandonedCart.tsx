import {
  Body, Button, Container, Head, Heading, Html,
  Preview, Section, Text, Row, Column, Img
} from '@react-email/components'

interface CartItem {
  name: string
  image: string
  price: number
  quantity: number
}

export function AbandonedCart({ name, items }: { name: string; items: CartItem[] }) {
  return (
    <Html>
      <Head />
      <Preview>Você esqueceu algo no carrinho 🛒</Preview>
      <Body style={{ backgroundColor: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto' }}>
          <Section style={{ backgroundColor: '#1a1a2e', padding: '32px', textAlign: 'center' as const }}>
            <Heading style={{ color: '#fff', fontFamily: 'Syne, sans-serif', margin: 0 }}>
              <span style={{ color: '#e91e8c' }}>Ten</span>Tech 3D
            </Heading>
          </Section>

          <Section style={{ padding: '32px' }}>
            <Heading as="h2" style={{ color: '#1a1a2e' }}>Ei {name}, você deixou itens no carrinho! 🛒</Heading>

            {items.map((item, i) => (
              <Row key={i} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
                <Column style={{ width: 60 }}>
                  <Img src={item.image} width={50} height={50} style={{ borderRadius: 4 }} alt={item.name} />
                </Column>
                <Column>
                  <Text style={{ margin: 0, fontWeight: 600 }}>{item.name}</Text>
                  <Text style={{ margin: 0, color: '#e91e8c', fontWeight: 700 }}>R$ {item.price.toFixed(2)}</Text>
                </Column>
              </Row>
            ))}

            <Section style={{ backgroundColor: '#fff3e0', borderRadius: 8, padding: '16px', margin: '24px 0' }}>
              <Text style={{ color: '#e65100', fontWeight: 700, margin: 0 }}>
                ⏰ Estoque limitado — garanta o seu antes que acabe!
              </Text>
            </Section>

            <Section style={{ backgroundColor: '#fce4ec', borderRadius: 12, padding: '20px', textAlign: 'center' as const }}>
              <Text style={{ fontSize: 24, fontWeight: 800, color: '#e91e8c', letterSpacing: 3, margin: 0 }}>VOLTA10</Text>
              <Text style={{ color: '#666', margin: '8px 0 0', fontSize: 13 }}>
                10% de desconto — válido por 24 horas
              </Text>
            </Section>

            <Section style={{ textAlign: 'center' as const, marginTop: 24 }}>
              <Button
                href={`${process.env.NEXT_PUBLIC_APP_URL}/cart`}
                style={{ backgroundColor: '#e91e8c', color: '#fff', padding: '16px 40px', borderRadius: 8, fontWeight: 700, fontSize: 16 }}
              >
                Finalizar Compra →
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
