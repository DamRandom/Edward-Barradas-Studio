"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import CollectionCard from "@/app/components/ui/CollectionCard";

export default function GalleryGrid({ collections }: { collections: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const allAvailableTags = useMemo(() => {
    const tags = new Set<string>();
    collections.forEach(col => {
      col.photos?.forEach((photo: any) => {
        photo.tags?.forEach((tag: string) => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  }, [collections]);

  const filteredCollections = useMemo(() => {
    return collections.filter(col => {
      const matchesSearch = col.name.toLowerCase().includes(searchQuery.toLowerCase());
      const colTags = col.photos?.flatMap((p: any) => p.tags || []) || [];
      const matchesTags =
        activeTags.length === 0 || activeTags.every(tag => colTags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [collections, searchQuery, activeTags]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <section className="py-28 md:py-40 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Page header */}
        <motion.div
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.45em] text-foreground/40 font-medium">
              Archive Catalog
            </span>
            <h1 className="mt-3 font-serif font-light text-foreground text-[clamp(2.6rem,5vw,4rem)] leading-none">
              Full Portfolio
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-accent-gold" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              Photographic Monograph
            </p>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-16 space-y-7">
          {/* Search input — editorial minimal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <input
              id="gallery-search"
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full max-w-sm
                bg-transparent
                border-b border-black/15
                px-0 py-3
                text-[11px] uppercase tracking-[0.25em] text-foreground
                outline-none
                placeholder:text-foreground/25
                focus:border-foreground/40
                transition-colors duration-400
              "
            />
          </motion.div>

          {/* Tag filters */}
          {allAvailableTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2.5"
            >
              {allAvailableTags.map(tag => {
                const isActive = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      px-4 py-1.5 text-[8px] uppercase tracking-widest transition-all duration-300 border
                      ${isActive
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-gray-warm border-black/10 hover:border-foreground/30 hover:text-foreground"
                      }
                    `}
                  >
                    {tag}
                  </button>
                );
              })}

              {activeTags.length > 0 && (
                <button
                  onClick={() => setActiveTags([])}
                  className="px-4 py-1.5 text-[8px] uppercase tracking-widest text-foreground/30 hover:text-foreground transition-colors duration-300"
                >
                  Clear
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* Grid content */}
        <AnimatePresence mode="popLayout">
          {filteredCollections.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 text-center border border-black/[0.06]"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-warm">
                No results found.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            >
              {filteredCollections.map((item, index) => (
                <motion.div
                  key={item._id || `${item.name}-${index}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <CollectionCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
