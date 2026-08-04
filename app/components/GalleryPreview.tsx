"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/app/hooks/useMediaQuery";
import CollectionCard from "./ui/CollectionCard";
import type { SanityCollection } from "@/app/types";

interface GalleryPreviewProps {
  collections: SanityCollection[];
}

export default function GalleryPreview({ collections }: GalleryPreviewProps) {
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();

  // Auto-advance carousel on mobile
  useEffect(() => {
    if (!isMobile || !collections?.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % collections.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, collections]);

  const isEmpty = !collections?.length;

  return (
    <section id="gallery" className="bg-background py-32 md:py-44 border-t border-black/6">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.45em] text-foreground/40 font-medium">
              Archivo / 01
            </span>
            <h2 className="mt-3 font-serif font-light text-foreground text-[clamp(2.4rem,4.5vw,3.6rem)] leading-none">
              Trabajo Seleccionado
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-accent-gold" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              Colecciones
            </p>
          </div>
        </motion.div>

        {/* Empty State */}
        {isEmpty && (
          <div className="py-24 text-center border border-black/10">
            <p className="text-[10px] uppercase tracking-widest text-gray-warm">
              Aún no hay colecciones para mostrar.
            </p>
          </div>
        )}

        {/* Desktop grid */}
        {!isMobile && !isEmpty && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {collections
              .filter((item): item is SanityCollection & { src: string } => !!item.src)
              .map((item) => (
                <CollectionCard key={item._id} item={item} />
              ))}
          </div>
        )}

        {/* Mobile carousel — only collections that have a cover image */}
        {isMobile && !isEmpty && (() => {
          const withCover = collections.filter(
            (item): item is SanityCollection & { src: string } => !!item.src
          );
          if (!withCover.length) return null;
          const safeIndex = index % withCover.length;
          return (
          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={safeIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="max-w-[90vw] mx-auto">
                    <CollectionCard item={withCover[safeIndex]} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination dots */}
            <div className="mt-10 flex justify-center gap-2.5">
              {withCover.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Collection ${i + 1}`}
                  className={`h-1 transition-all duration-300 ${
                    safeIndex === i ? "w-8 bg-foreground" : "w-2 bg-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>
          );
        })()}

        {/* Bottom CTA */}
        {!isEmpty && (
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link
              id="gallery-explore-all"
              href="/gallery"
              className="inline-flex items-center gap-3 px-8 py-4 border border-black/15 text-[10px] uppercase tracking-[0.35em] text-foreground hover:bg-foreground hover:text-background transition-all duration-400"
            >
              <span>Ver galería completa</span>
              <span className="text-accent-gold">→</span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
