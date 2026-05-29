import type { Metadata } from "next";

const BASE_URL = "https://tentech3d.com.br";
const SITE_NAME = "TenTech 3D";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: "TenTech 3D — Impressão 3D Personalizada",
  },
  description:
    "Especialistas em impressão 3D personalizada. Miniaturas, decoração, protótipos e peças técnicas. Entregamos em todo o Brasil.",
  keywords: [
    "impressão 3d",
    "miniaturas rpg",
    "impressão 3d personalizada",
    "PLA",
    "PETG",
    "resina",
    "impressão 3d São Paulo",
    "peças personalizadas",
    "prototipagem",
  ],
  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: "TenTech 3D — Impressão 3D Personalizada",
    description:
      "Especialistas em impressão 3D personalizada. Miniaturas, decoração, protótipos e peças técnicas. Entregamos em todo o Brasil.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TenTech 3D — Impressão 3D Personalizada",
    description:
      "Especialistas em impressão 3D personalizada. Miniaturas, decoração, protótipos e peças técnicas.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export type ProductMetaInput = {
  name: string;
  description: string;
  images: string[];
  price: number;
  currency?: string;
  slug: string;
};

export function generateProductMeta(product: ProductMetaInput): Metadata {
  const description = product.description.slice(0, 160);
  const url = `${BASE_URL}/products/${product.slug}`;
  const image = product.images[0] ?? "";
  const currency = product.currency ?? "BRL";

  return {
    title: product.name,
    description,
    openGraph: {
      type: "website",
      url,
      title: `${product.name} | ${SITE_NAME}`,
      description,
      images: image ? [{ url: image, width: 1200, height: 630, alt: product.name }] : [],
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${SITE_NAME}`,
      description,
      images: image ? [image] : [],
    },
    other: {
      "og:price:amount": String(product.price),
      "og:price:currency": currency,
    },
  };
}

export type CategoryMetaInput = {
  name: string;
  description: string;
  slug: string;
  image?: string;
};

export function generateCategoryMeta(category: CategoryMetaInput): Metadata {
  const url = `${BASE_URL}/products/${category.slug}`;
  const description = category.description.slice(0, 160);

  return {
    title: category.name,
    description,
    openGraph: {
      type: "website",
      url,
      title: `${category.name} | ${SITE_NAME}`,
      description,
      images: category.image
        ? [{ url: category.image, width: 1200, height: 630, alt: category.name }]
        : [],
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | ${SITE_NAME}`,
      description,
      images: category.image ? [category.image] : [],
    },
  };
}
