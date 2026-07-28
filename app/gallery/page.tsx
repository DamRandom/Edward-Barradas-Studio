import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GalleryGrid from "./components/GalleryGrid";

import { client } from "@/sanity/lib/client";
import { allCollectionsQuery } from "@/sanity/lib/queries";

export const metadata = {
  title: "Gallery | Edward Barradas Studio",
  description: "Explore the full photographic archive and editorial portfolio.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GalleryPage() {
  const collections = await client.fetch(allCollectionsQuery);

  return (
    <>
      <main>
        <Navbar />
        <GalleryGrid collections={collections} />
      </main>
      <Footer />
    </>
  );
}
