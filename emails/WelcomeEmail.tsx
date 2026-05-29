import {
  Body, Button, Container, Head, Heading, Hr, Html,
  Preview, Section, Text, Row, Column
} from '@react-email/components'

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Preview>Bem-vindo à TenTech 3D, {name}!</Preview>
      <Body style={{ backgroundColor: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto' }}>
          <Section style={{ backgroundColor: '#1a1a2e', padding: '32px', textAlign: 'center' as const }}>
            <Heading style={{ color: '#fff', fontFamily: 'Syne, sans-serif', margin: 0 }}>
              <span style={{ color: '#e91e8c' }}>Ten</span>Tech 3D
            </Heading>
          </Section>

          <Section style={{ padding: '32px' }}>
            <Heading as="h2" style={{ color: '#1a1a2e' }}>
              Olá {name}, seja bem-vindo! 🎉
            </Heading>
            <Text style={{ color: '#444', lineHeight: 1.6 }}>
              Sua conta foi criada com sucesso. Explore nossa coleção de produtos 3D e aproveite o cupom exclusivo abaixo:
            </Text>

            <Section style={{ backgroundColor: '#fce4ec', borderRadius: 12, padding: '24px', textAlign: 'center' as const, margin: '24px 0' }}>
              <Text style={{ fontSize: 28, fontWeight: 800, color: '#e91e8c', letterSpacing: 4, margin: 0 }}>
                BEMVINDO10
              </Text>
              <Text style={{ color: '#666', margin: '8px 0 0' }}>
                10% de desconto na sua primeira compra
              </Text>
            </Section>

            <Row>
              {[
                { icon: '⚡', title: 'Entrega Rápida', desc: 'Prazo de 3 a 10 dias úteis' },
                { icon: '✅', title: 'Qualidade Garantida', desc: 'Materiais premium certificados' },
                { icon: '💬', title: 'Suporte 24h', desc: 'Equipe especializada disponível' },
              ].map((b) => (
                <Column key={b.title} style={{ padding: '0 8px', textAlign: 'center' as const }}>
                  <Text style={{ fontSize: 24 }}>{b.icon}</Text>
                  <Text style={{ fontWeight: 700, color: '#1a1a2e', margin: '4px 0' }}>{b.title}</Text>
                  <Text style={{ color: '#666', fontSize: 13 }}>{b.desc}</Text>
                </Column>
              ))}
            </Row>

            <Section style={{ textAlign: 'center' as const, marginTop: 32 }}>
              <Button
                href={process.env.NEXT_PUBLIC_APP_URL ?? 'https://tentech3d.com.br'}
                style={{ backgroundColor: '#e91e8c', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}
              >
                Explorar Produtos →
              </Button>
            </Section>

            <Text style={{ color: '#999', fontSize: 12, marginTop: 24 }}>
              Cupom válido por 30 dias. Não acumulativo com outras promoções.
            </Text>
          </Section>

          <Section style={{ backgroundColor: '#f5f5f5', padding: '16px 32px', textAlign: 'center' as const }}>
            <Text style={{ color: '#999', fontSize: 12 }}>
              © 2025 TenTech 3D · Rua Exemplo, 123, São Paulo — SP
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
