"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import CollectionCard from "./ui/CollectionCard";

export default function GalleryPreview({ collections }: { collections: any[] }) {
  const [index, setIndex] = useState(0);
  const [isCarousel, setIsCarousel] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCarousel(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isCarousel || !collections?.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % collections.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isCarousel, collections]);

  return (
    <section id="gallery" className="bg-background py-28 md:py-36">
      <div className="px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="text-[9px] uppercase tracking-[0.45em] text-gray-warm">
            Portfolio
          </p>

          <h2 className="mt-4 font-serif font-light text-foreground text-[clamp(2rem,4vw,3rem)]">
            Selected Work
          </h2>

          <div className="mt-5 w-8 h-px bg-accent-gold" />
        </motion.div>

        {/* Empty State */}
        {(!collections || collections.length === 0) && (
          <div className="py-24 text-center border border-black/10">
            <p className="text-[10px] uppercase tracking-widest text-gray-warm">
              No collections to display yet.
            </p>
          </div>
        )}

        {/* Desktop layout */}
        {!isCarousel && collections && collections.length > 0 && (
          <div className="grid grid-cols-3 gap-10">
            {collections.map((item, i) => (
              <CollectionCard key={i} item={item} />
            ))}
          </div>
        )}

        {/* Carousel layout (mobile) */}
        {isCarousel && collections && collections.length > 0 && (
          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="max-w-[85vw] mx-auto">
                    <CollectionCard item={collections[index]} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination dots */}
            <div className="mt-8 flex justify-center gap-2.5">
              {collections.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Collection ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === i ? "w-6 bg-foreground" : "w-1.5 bg-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link
            id="gallery-explore-all"
            href="/gallery"
            className="inline-block text-[10px] uppercase tracking-widest text-foreground border-b border-foreground/25 pb-0.5 hover:border-foreground/70 transition-all duration-300"
          >
            Explore full gallery
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
