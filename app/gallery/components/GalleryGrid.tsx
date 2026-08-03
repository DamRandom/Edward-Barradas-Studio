"use client";

import { useState, useMemo } from "react";
import GallerySidebar from "./GallerySidebar";
import MasonryCard from "./MasonryCard";
import PhotoLightbox from "./PhotoLightbox";
import CollectionCard from "@/app/components/ui/CollectionCard";
import type { SanityCollection, FeedItem } from "@/app/types";

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Cycle through aspect ratios for visual variety in the masonry grid */
const ASPECT_RATIOS = [
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-[1/1]",
  "aspect-[3/5]",
  "aspect-[2/3]",
  "aspect-[4/3]",
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

interface GalleryGridProps {
  collections: SanityCollection[];
}

export default function GalleryGrid({ collections }: GalleryGridProps) {
  const [viewMode, setViewMode] = useState<"collections" | "feed">("feed");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // ── Flat feed: cover image + individual photos per collection ──────────────
  const allFeedItems = useMemo<FeedItem[]>(() => {
    if (!collections?.length) return [];
    const items: FeedItem[] = [];
    collections.forEach((col, colIdx) => {
      if (col.src) {
        items.push({
          id: `${col._id ?? colIdx}-cover`,
          url: col.src,
          title: col.name,
          date: col.publishedAt?.substring(0, 10),
          tags: col.photos?.flatMap((p) => p.tags ?? []).slice(0, 3) ?? [],
          collectionId: col._id,
        });
      }
      col.photos?.forEach((photo, pIdx) => {
        if (photo.url && photo.url !== col.src) {
          items.push({
            id: `${col._id ?? colIdx}-photo-${pIdx}`,
            url: photo.url,
            title: col.name,
            date: photo.date,
            tags: photo.tags ?? [],
            collectionId: col._id,
          });
        }
      });
    });
    return items;
  }, [collections]);

  // ── Filtered collections (cover image required) ───────────────────────────
  const filteredCollections = useMemo(() => {
    if (!collections?.length) return [];
    const query = searchQuery.trim().toLowerCase();
    return collections
      .filter((col): col is SanityCollection & { src: string } => !!col.src)
      .filter((col) => {
        const colTags = col.photos?.flatMap((p) => p.tags ?? []) ?? [];
        const matchesSearch =
          !query ||
          col.name.toLowerCase().includes(query) ||
          colTags.some((t) => t.toLowerCase().includes(query));
        return matchesSearch;
      });
  }, [collections, searchQuery]);

  // ── Filtered feed items ───────────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allFeedItems.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.tags?.some((t) => t.toLowerCase().includes(query));
      return matchesSearch;
    });
  }, [allFeedItems, searchQuery]);

  const isEmpty = !collections?.length;

  // ── Result count display ──────────────────────────────────────────────────
  const resultCount =
    viewMode === "collections" ? filteredCollections.length : filteredItems.length;
  const resultLabel =
    viewMode === "collections"
      ? filteredCollections.length === 1 ? "Colección" : "Colecciones"
      : filteredItems.length === 1 ? "Fotografía" : "Fotografías";

  const resetFilters = () => setSearchQuery("");

  return (
    <section className="py-8 sm:py-12 lg:py-10 bg-background min-h-screen">
      <div className="max-w-380 mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-14 items-start">

          {/* Sidebar */}
          <GallerySidebar
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            resultCount={resultCount}
            resultLabel={resultLabel}
          />

          {/* Main content */}
          <div className="w-full flex-1 min-w-0">
            {/* Empty archive */}
            {isEmpty && (
              <div className="py-32 text-center border border-dashed border-foreground/15">
                <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/35 font-medium">
                  El archivo está vacío
                </p>
                <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-foreground/25">
                  Aún no hay colecciones publicadas en Sanity
                </p>
              </div>
            )}

            {/* Collections view */}
            {!isEmpty && viewMode === "collections" && (
              filteredCollections.length === 0 ? (
                <EmptySearch onReset={resetFilters} />
              ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 lg:gap-6 space-y-4 sm:space-y-5 lg:space-y-6">
                  {filteredCollections.map((item, i) => (
                    <CollectionCard
                      key={item._id ?? item.name}
                      item={item}
                      aspectRatio={ASPECT_RATIOS[i % ASPECT_RATIOS.length]}
                    />
                  ))}
                </div>
              )
            )}

            {/* Feed view */}
            {!isEmpty && viewMode === "feed" && (
              filteredItems.length === 0 ? (
                <EmptySearch onReset={resetFilters} />
              ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 lg:gap-6 space-y-4 sm:space-y-5 lg:space-y-6">
                  {filteredItems.map((item, i) => (
                    <MasonryCard
                      key={item.id}
                      item={item}
                      onClick={() => setLightboxIndex(i)}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          isOpen
          onClose={() => setLightboxIndex(null)}
          items={filteredItems}
          currentIndex={lightboxIndex}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function EmptySearch({ onReset }: { onReset: () => void }) {
  return (
    <div className="py-24 text-center border border-dashed border-foreground/15">
      <p className="text-[10px] uppercase tracking-[0.35em] text-foreground/40 font-medium">
        No hay resultados que coincidan con tu búsqueda.
      </p>
      <button
        onClick={onReset}
        className="mt-4 text-[9px] uppercase tracking-[0.2em] underline text-foreground/60 hover:text-foreground"
      >
        Reiniciar Búsqueda
      </button>
    </div>
  );
}
