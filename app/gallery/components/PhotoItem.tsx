"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { PhotoItemProps } from "../types/gallery";

export default function PhotoItem({
  id,
  src,
  alt,
  price,
  selected = false,
  onSelect,
}: PhotoItemProps) {
  return (
    <motion.div
      onClick={() => onSelect?.(id)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        group
        relative
        cursor-pointer
        bg-white
        shadow-[0_30px_80px_-45px_rgba(0,0,0,0.35)]
      `}
    >
      {/* Image */}
      <div className="relative aspect-3/4 overflow-hidden">
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes="(min-width: 768px) 25vw, 80vw"
          className="object-cover"
        />

        {/* Editorial veil */}
        <div
          className={`
            absolute inset-0
            transition-opacity duration-300
            ${
              selected
                ? "bg-black/20"
                : "bg-white/45 group-hover:bg-white/20"
            }
          `}
        />

        {/* Selected indicator */}
        {selected && (
          <div className="absolute top-4 right-4">
            <div
              className="
                h-3 w-3
                rounded-full
                bg-black
              "
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 flex items-center justify-between">
        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-gray-500
          "
        >
          Fine art print
        </span>

        <span
          className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-black
          "
        >
          ${price}
        </span>
      </div>
    </motion.div>
  );
}
