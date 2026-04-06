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
    photos?: string[];
  };
}

export default function CollectionCard({ item }: CollectionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.article
        className="group relative cursor-pointer"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onClick={() => setIsModalOpen(true)}
      >
        <div
          className="
            relative
            aspect-3/4
            overflow-hidden
            shadow-[0_40px_90px_-45px_rgba(0,0,0,0.35)]
          "
        >
          <Image
            src={item.src}
            alt={item.name}
            fill
            sizes="80vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-white/55 transition-opacity duration-500 group-hover:opacity-0" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="
                font-bold
                uppercase
                text-transparent
                bg-clip-text
                tracking-[0.3em]
                text-[clamp(1.4rem,4vw,2.6rem)]
                transition-opacity
                duration-500
                group-hover:opacity-0
              "
              style={{
                backgroundImage: `url(${item.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {item.name}
            </span>
          </div>
        </div>
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
