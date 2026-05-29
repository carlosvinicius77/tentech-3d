type ProductSchemaProps = {
  name: string;
  description: string;
  image: string | string[];
  price: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  ratingValue?: number;
  reviewCount?: number;
  sku?: string;
  url?: string;
};

export function ProductSchema({
  name,
  description,
  image,
  price,
  currency = "BRL",
  availability = "InStock",
  ratingValue,
  reviewCount,
  sku,
  url,
}: ProductSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: Array.isArray(image) ? image : [image],
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price,
      availability: `https://schema.org/${availability}`,
      url,
    },
  };

  if (sku) schema.sku = sku;
  if (ratingValue != null && reviewCount != null) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TenTech 3D",
    url: "https://tentech3d.com.br",
    logo: "https://tentech3d.com.br/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    sameAs: [
      "https://instagram.com/tentech3d",
      "https://facebook.com/tentech3d",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "TenTech 3D",
    description:
      "Especialistas em impressão 3D personalizada. Miniaturas, decoração, protótipos e peças técnicas.",
    url: "https://tentech3d.com.br",
    image: "https://tentech3d.com.br/logo.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.5505,
      longitude: -46.6333,
    },
    areaServed: "Brasil",
    priceRange: "$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Cartão de crédito, PIX, Boleto",
    sameAs: [
      "https://instagram.com/tentech3d",
      "https://facebook.com/tentech3d",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
