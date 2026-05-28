import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TenTech 3D — Impressão 3D e Produtos Personalizados",
  description: "Sua loja de impressão 3D personalizada, filamentos, impressoras e acessórios. Qualidade e tecnologia ao seu alcance.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
