"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CollectionModal from "./CollectionModal";

export interface CollectionCardProps {
  item: {
    src: string;
    name: string;
    href?: string;
    photos?: { url: string; date?: string; tags?: string[] }[];
  };
}

export default function CollectionCard({ item }: CollectionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allTags = item.photos?.flatMap(p => p.tags || []) || [];
  const uniqueTags = Array.from(new Set(allTags)).slice(0, 3);
  const photoCount = item.photos?.length || 0;

  return (
    <>
      <motion.article
        className="group relative cursor-pointer"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative aspect-3/4 overflow-hidden border border-black/[0.06]">
          <Image
            src={item.src}
            alt={item.name}
            fill
            sizes="(min-width:1024px) 33vw, 85vw"
            className="object-cover saturate-[0.85] sepia-[0.12] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:saturate-100 group-hover:sepia-0"
          />

          {/* Cream overlay — fades on hover */}
          <div className="absolute inset-0 bg-background/50 transition-opacity duration-500 group-hover:opacity-0" />

          {/* Default label — clip-path text filled with the image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 group-hover:opacity-0">
            <span
              className="font-serif font-bold text-transparent bg-clip-text uppercase tracking-[0.2em] text-[clamp(1.2rem,3.5vw,2.2rem)] leading-tight text-center px-4"
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
          <div className="absolute inset-0 bg-foreground/70 opacity-0 transition-opacity duration-600 group-hover:opacity-100 flex flex-col items-center justify-center p-6 pointer-events-none">
            <h3 className="font-serif text-background/90 text-xl font-light tracking-wide text-center transform translate-y-3 group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
              {item.name}
            </h3>

            {uniqueTags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5 mt-4 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-700 delay-75">
                {uniqueTags.map(tag => (
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
        <p className="mt-3 text-[9px] uppercase tracking-[0.35em] text-gray-warm group-hover:text-foreground transition-colors duration-300">
          {item.name}
        </p>
      </motion.article>

      <AnimatePresence>
        {isModalOpen && (
          <CollectionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            collection={item}
          />
        )}
      </AnimatePresence>
    </>
  );
}
