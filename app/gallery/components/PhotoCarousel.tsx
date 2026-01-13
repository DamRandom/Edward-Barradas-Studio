// PhotoCarousel.tsx
"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PhotoCarousel({ images, autoPlay = true, interval = 4000 }) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    if (!autoPlay || total <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, total]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Image area */}
      <div className="relative aspect-3/4 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[index].id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src={images[index].src}
              alt={images[index].alt ?? ""}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
              priority
            />

            {/* Subtle editorial veil */}
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      {total > 1 && (
        <div className="mt-6 flex justify-center gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                i === index ? "bg-black scale-125" : "bg-black/30 hover:bg-black/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
