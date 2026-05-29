import {
  Body, Button, Container, Head, Heading, Html,
  Preview, Section, Text
} from '@react-email/components'

export function ForgotPasswordEmail({ resetUrl }: { resetUrl: string }) {
  return (
    <Html>
      <Head />
      <Preview>Redefina sua senha — TenTech 3D</Preview>
      <Body style={{ backgroundColor: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto' }}>
          <Section style={{ backgroundColor: '#1a1a2e', padding: '32px', textAlign: 'center' as const }}>
            <Heading style={{ color: '#fff', fontFamily: 'Syne, sans-serif', margin: 0 }}>
              <span style={{ color: '#e91e8c' }}>Ten</span>Tech 3D
            </Heading>
          </Section>

          <Section style={{ padding: '32px', textAlign: 'center' as const }}>
            <Text style={{ fontSize: 48 }}>🔐</Text>
            <Heading as="h2" style={{ color: '#1a1a2e' }}>Redefinição de Senha</Heading>
            <Text style={{ color: '#666', lineHeight: 1.6 }}>
              Recebemos uma solicitação de redefinição de senha para sua conta. Clique no botão abaixo para criar uma nova senha.
            </Text>

            <Button
              href={resetUrl}
              style={{ backgroundColor: '#e91e8c', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, margin: '24px 0' }}
            >
              Redefinir Senha →
            </Button>

            <Text style={{ color: '#888', fontSize: 13 }}>Este link expira em 1 hora.</Text>

            <Section style={{ backgroundColor: '#fff8e1', borderRadius: 8, padding: '16px', marginTop: 24 }}>
              <Text style={{ color: '#f57f17', margin: 0, fontSize: 13 }}>
                ⚠️ Se você não solicitou a redefinição de senha, ignore este e-mail com segurança. Sua senha não será alterada.
              </Text>
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
