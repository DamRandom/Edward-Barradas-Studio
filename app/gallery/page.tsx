"use client";

import { useState } from "react";
import GalleryToolbar from "./components/GalleryToolbar";
import CollectionGrid from "./components/CollectionGrid";
import CollectionModal from "./components/CollectionModal";
import ModelInfo from "./components/ModelInfo";

// Tipos
import { Collection } from "./types/gallery";

// Mock data
import galleryData from "../data/gallery.json";

export default function GalleryPage() {
  const { collections } = galleryData;

  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredCollections = collections.filter((collection: Collection) => {
    const matchesSearch =
      collection.title.toLowerCase().includes(search.toLowerCase());

    const matchesTag = activeTag
      ? collection.tags
          .map((tag: string) => tag.toLowerCase())
          .includes(activeTag.toLowerCase())
      : true;

    return matchesSearch && matchesTag;
  });

  return (
    <main className="bg-white">
      {/* Intro / model info */}
      <section className="pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <ModelInfo
            name={collections[0].model.name}
            image="/images/models/alex.jpg" // puedes actualizar con tu ruta real
            description={collections[0].model.bio}
          />
        </div>
      </section>

      {/* Toolbar */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <GalleryToolbar
            search={search}
            onSearchChange={setSearch}
            activeTag={activeTag}
            onTagChange={setActiveTag}
            availableTags={[
              "portrait",
              "editorial",
              "studio",
              "natural-light",
              "black-white",
              "fashion",
              "dramatic",
              "soft",
            ]}
          />
        </div>
      </section>

      {/* Collections */}
      <section className="pb-40">
        <div className="max-w-7xl mx-auto px-6">
          <CollectionGrid
            collections={filteredCollections}
            onSelectCollection={setActiveCollection}
          />
        </div>
      </section>

      {/* Modal */}
      {activeCollection && (
        <CollectionModal
          collection={activeCollection}
          onClose={() => setActiveCollection(null)}
        />
      )}
    </main>
  );
}
