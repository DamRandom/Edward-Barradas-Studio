import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import GalleryPreview from "./components/GalleryPreview";
import AboutSection from "./components/AboutSection";
import InstagramSection from "./components/InstagramSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { fetchHomeData } from "./lib/data";

export default async function Home() {
  const { collections, siteSettings, instagramPosts } = await fetchHomeData();

  return (
    <>
      <main>
        <HeroBanner siteSettings={siteSettings} />
        <Navbar />
        <GalleryPreview collections={collections} />
        <AboutSection siteSettings={siteSettings} />
        <InstagramSection posts={instagramPosts} />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
