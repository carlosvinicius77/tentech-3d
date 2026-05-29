import type { Viewport } from "next";
import { defaultMetadata } from "@/lib/metadata";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/seo/JsonLd";
import "./globals.css";
import ClientProviders from "./components/ClientProviders";
import CookieBanner from "./components/gdpr/CookieBanner";

export const metadata = defaultMetadata;

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
      <body>
        <OrganizationSchema />
        <LocalBusinessSchema />
        <ClientProviders>{children}</ClientProviders>
        <CookieBanner />
      </body>
    </html>
  );
}
