"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CollectionCardProps } from "../types/gallery";

export default function CollectionCard({ collection, onSelect }: CollectionCardProps) {
  const { title, coverImage, tags, fullPackPrice } = collection;

  return (
    <motion.article
      onClick={() => onSelect(collection)}
      className="
        group
        relative
        cursor-pointer
        select-none
      "
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Image */}
      <div
        className="
          relative
          aspect-3/4
          overflow-hidden
          bg-neutral-100
          shadow-[0_40px_90px_-45px_rgba(0,0,0,0.35)]
        "
      >
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.03]
          "
        />

        {/* Editorial veil */}
        <div
          className="
            absolute
            inset-0
            bg-white/55
            transition-opacity
            duration-500
            group-hover:opacity-30
          "
        />
      </div>

      {/* Meta */}
      <div className="mt-6 space-y-3">
        {/* Title */}
        <h3
          className="
            text-xs
            uppercase
            tracking-[0.3em]
            text-black
          "
        >
          {title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="
                text-[10px]
                uppercase
                tracking-widest
                text-gray-500
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <p
          className="
            pt-2
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-gray-700
          "
        >
          From ${fullPackPrice}
        </p>
      </div>
    </motion.article>
  );
}
