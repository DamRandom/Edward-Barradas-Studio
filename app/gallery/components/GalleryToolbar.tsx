"use client";

import { motion } from "framer-motion";

type GalleryToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  availableTags: string[]; // ahora coincide con GalleryPage
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
};

export default function GalleryToolbar({
  search,
  onSearchChange,
  availableTags,
  activeTag,
  onTagChange,
}: GalleryToolbarProps) {
  return (
    <motion.div
      className="
        w-full
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-8
        border-b
        border-black/10
        pb-8
      "
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Search */}
      <div className="relative max-w-sm w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search collections"
          className="
            w-full
            bg-transparent
            border-b
            border-black/20
            py-2
            text-sm
            tracking-wide
            text-black
            placeholder:text-gray-400
            focus:outline-none
            focus:border-black
            transition
          "
        />
      </div>

      {/* Tags */}
      <div
        className="
          flex
          flex-wrap
          items-center
          gap-6
          text-[10px]
          uppercase
          tracking-[0.35em]
        "
      >
        {/* All */}
        <button
          onClick={() => onTagChange(null)}
          className={`transition ${
            activeTag === null
              ? "text-black"
              : "text-gray-400 hover:text-black"
          }`}
        >
          All
        </button>

        {/* Tags dinámicos */}
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagChange(tag.toLowerCase())}
            className={`transition ${
              activeTag === tag.toLowerCase()
                ? "text-black"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
