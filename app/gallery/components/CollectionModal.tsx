"use client";

import { motion, AnimatePresence } from "framer-motion";
import PhotoCarousel from "./PhotoCarousel";
import PurchasePanel from "./PurchasePanel";

import { CollectionModalProps } from "../types/gallery";

/* ---------- Component ---------- */

export default function CollectionModal({
  collection,
  onClose,
}: CollectionModalProps) {
  if (!collection) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed inset-0 z-50
          bg-white
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute top-6 right-6
            text-xs uppercase tracking-[0.35em]
            text-gray-500
            hover:text-black
            transition
          "
        >
          Close
        </button>

        {/* Content */}
        <div
          className="
            h-full
            max-w-7xl
            mx-auto
            px-6
            grid
            grid-cols-1
            lg:grid-cols-[1.6fr_1fr]
            gap-16
            items-center
          "
        >
          {/* Left — Images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
            // Re-trigger build
          >
            <PhotoCarousel
              images={collection.photos.map((photo) => ({
                id: photo.id,
                src: photo.src,
              }))}
            />
          </motion.div>

          {/* Right — Info & Purchase */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="
              flex
              flex-col
              justify-center
              max-w-md
            "
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
              Collection
            </p>

            <h2
              className="
                mt-6
                text-3xl
                font-light
                uppercase
                tracking-[0.3em]
                text-black
              "
            >
              {collection.title}
            </h2>

            {collection.description && (
              <p className="mt-8 text-sm leading-relaxed text-gray-700">
                {collection.description}
              </p>
            )}

            <PurchasePanel
              selectedCount={0}
              selectedTotal={0}
              fullPrice={collection.fullPackPrice}
              discountedPrice={
                collection.fullPackPrice * (1 - collection.discountPercent / 100)
              }
              onBuySelected={() => {}}
              onBuyFull={() => {}}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
