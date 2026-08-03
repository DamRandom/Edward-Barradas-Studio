"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import type { FeedItem } from "@/app/types";

interface PhotoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: FeedItem[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
}

export default function PhotoLightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}: PhotoLightboxProps) {
  const currentItem = items[currentIndex];

  const handlePrev = () =>
    onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
  const handleNext = () =>
    onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, items.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-white/70 hover:text-white text-xs uppercase tracking-[0.3em] flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm transition-all hover:bg-white/20"
          aria-label="Close lightbox"
        >
          <span>Close</span>
          <span className="text-sm">✕</span>
        </button>

        {/* Navigation */}
        {items.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-white text-2xl p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-white text-2xl p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all"
              aria-label="Next photo"
            >
              ›
            </button>
          </>
        )}

        {/* Main content */}
        <div
          className="relative max-w-5xl max-h-[88vh] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Photo */}
          <div className="relative max-h-[75vh] w-full flex items-center justify-center overflow-hidden">
            <Image
              src={currentItem.url}
              alt={currentItem.title}
              width={1200}
              height={900}
              className="max-h-[75vh] max-w-full w-auto h-auto object-contain rounded-sm shadow-2xl"
              priority
            />
          </div>

          {/* Details & actions */}
          <div className="mt-5 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-white/90 px-2">
            <div>
              <span className="text-[9px] uppercase tracking-[0.35em] text-white/50 block">
                {currentItem.date ?? "Editorial Archive"}
              </span>
              <h3 className="font-serif text-lg font-light tracking-wide text-white">
                {currentItem.title}
              </h3>
            </div>

            {currentItem.tags && currentItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {currentItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] uppercase tracking-widest text-white/80 bg-white/10 px-2.5 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Counter */}
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">
              {currentIndex + 1} / {items.length}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
