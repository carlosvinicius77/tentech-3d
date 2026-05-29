import type { Metadata } from "next";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import {
  getProductBySlug,
  getAllProductSlugs,
} from "./productData";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return {
    title: `${product.title} | TenTech 3D`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.ogImage],
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return (
    <>
      <Header />
      <Navigation />
      <main>
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </>
  );
}
