import Navbar from "./components/Navbar";
import Hero from "./components/HeroBanner";
import GalleryPreview from "./components/GalleryPreview";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

import { client } from "@/sanity/lib/client";
import { recentCollectionsQuery, siteSettingsQuery } from "@/sanity/lib/queries";

export default async function Home() {
  const collections = await client.fetch(recentCollectionsQuery);
  const siteSettings = await client.fetch(siteSettingsQuery) || {};

  return (
    <>
      <main>
        <Hero siteSettings={siteSettings} />
        <Navbar />
        <GalleryPreview collections={collections} />

        <AboutSection siteSettings={siteSettings} />

        <ServicesSection />

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
