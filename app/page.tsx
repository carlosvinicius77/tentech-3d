import Header from "./components/Header";
import Navigation from "./components/Navigation";
import HeroSlider from "./components/HeroSlider";
import CategorySection from "./components/CategorySection";
import ProductsSection from "./components/ProductsSection";
import DealOfDay from "./components/DealOfDay";
import Services from "./components/Services";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Navigation />
      <main>
        <HeroSlider />
        <CategorySection />
        <ProductsSection />
        <DealOfDay />
        <Services />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
