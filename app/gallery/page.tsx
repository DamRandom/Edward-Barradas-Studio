import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GalleryGrid from "./components/GalleryGrid";

export const metadata = {
  title: "Gallery | Edward Barradas Studio",
  description: "Explore the full photographic archive and editorial portfolio.",
};

export default function GalleryPage() {
  return (
    <>
      <main>
        <Navbar />
        <GalleryGrid />
      </main>
      <Footer />
    </>
  );
}
