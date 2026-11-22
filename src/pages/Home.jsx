import Hero from "../components/home/Hero";
import FeaturedCategories from "../components/home/FeaturedCategories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PromoBanner from "../components/home/PromoBanner";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import { usePageTitle } from "../components/ui/ScrollToTop";

export default function Home() {
  usePageTitle("Home");
  return (
    <main>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromoBanner />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
