import type { MetadataRoute } from "next";

const BASE_URL = "https://tentech3d.com.br";

const CATEGORIES = [
  "miniaturas-rpg",
  "decoracao",
  "prototipos",
  "pecas-tecnicas",
  "presentes-personalizados",
];

async function getProductSlugs(): Promise<string[]> {
  // TODO: substituir por consulta real ao banco quando disponível
  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productSlugs = await getProductSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/impressao-sob-demanda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contato`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${BASE_URL}/products/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
