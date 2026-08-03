"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Lightbox from "./Lightbox";
import type { SanityCollection } from "@/app/types";

interface CollectionCardProps {
  item: SanityCollection & { src: string }; // src required for rendering
  className?: string;
  aspectRatio?: string;
}

export default function CollectionCard({
  item,
  className = "",
  aspectRatio = "aspect-[3/4]",
}: CollectionCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const allTags = item.photos?.flatMap((p) => p.tags ?? []) ?? [];
  const uniqueTags = Array.from(new Set(allTags)).slice(0, 3);
  const photoCount = item.photos?.length ?? 0;

  // Map SanityPhoto[] to the shape expected by Lightbox
  const lightboxPhotos =
    item.photos?.map((p) => ({
      url: p.url,
      title: item.name,
      date: p.date,
      tags: p.tags,
    })) ?? [];

  return (
    <>
      <motion.article
        className={`group relative cursor-pointer break-inside-avoid mb-5 sm:mb-6 ${className}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        onClick={() => setIsLightboxOpen(true)}
      >
        <div className={`relative ${aspectRatio} overflow-hidden border border-black/[0.06] bg-black/5`}>
          <Image
            src={item.src}
            alt={item.name}
            fill
            sizes="(min-width:1024px) 33vw, 85vw"
            className="object-cover saturate-[0.95] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:saturate-100"
          />

          {/* Reduced translucent overlay before hover */}
          <div className="absolute inset-0 bg-background/20 transition-opacity duration-500 group-hover:opacity-0" />

          {/* Default label — clip-path text filled with the image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 group-hover:opacity-0">
            <span
              className="font-serif font-bold text-transparent bg-clip-text uppercase tracking-[0.2em] text-[clamp(1.2rem,3.5vw,2.2rem)] leading-tight text-center px-4 drop-shadow-sm"
              style={{
                backgroundImage: `url(${item.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {item.name}
            </span>
          </div>

          {/* Hover editorial overlay */}
          <div className="absolute inset-0 bg-foreground/75 opacity-0 transition-opacity duration-600 group-hover:opacity-100 flex flex-col items-center justify-center p-6 pointer-events-none">
            <h3 className="font-serif text-background/90 text-xl font-light tracking-wide text-center transform translate-y-3 group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
              {item.name}
            </h3>
            {uniqueTags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5 mt-4 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-700 delay-75">
                {uniqueTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] uppercase tracking-widest text-foreground/80 bg-background/90 px-2.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-5 text-[9px] uppercase tracking-[0.3em] text-background/40 border-t border-background/10 pt-3 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-700 delay-100">
              {photoCount} {photoCount === 1 ? "photo" : "photos"}
            </div>
          </div>
        </div>

        {/* Card label below image */}
        <div className="mt-4 flex items-center justify-between">
          <h3 className="font-serif text-sm font-normal text-foreground group-hover:text-accent-gold transition-colors duration-300">
            {item.name}
          </h3>
          <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/35 font-light">
            {photoCount > 0 ? `${photoCount} ${photoCount === 1 ? "WORK" : "WORKS"}` : "SERIES"}
          </span>
        </div>
      </motion.article>

      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox
            isOpen={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
            photos={lightboxPhotos}
            collectionName={item.name}
          />
        )}
      </AnimatePresence>
    </>
  );
}
