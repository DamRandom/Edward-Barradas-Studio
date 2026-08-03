import GalleryGrid from "./components/GalleryGrid";
import { fetchGalleryData } from "@/app/lib/data";

export const metadata = {
  title: "Galería | Edward Barradas Studio",
  description: "Explora el archivo fotográfico completo y el portafolio editorial.",
};

export default async function GalleryPage() {
  const collections = await fetchGalleryData();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <GalleryGrid collections={collections} />
    </main>
  );
}
