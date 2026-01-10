import Navbar from "./components/Navbar";
import Hero from "./components/HeroBanner";
import GalleryPreview from "./components/GalleryPreview";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <main>
        {/* Hero full screen */}
        <Hero />

        {/* Navbar como separador */}
        <Navbar />

        {/* Contenido */}
        <GalleryPreview />

        <AboutSection />

        <ServicesSection />

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
