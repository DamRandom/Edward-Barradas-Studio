"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import type { SanityPhoto } from "@/app/types";

// ── Types ─────────────────────────────────────────────────────────────────────

/**
 * Generic photo shape accepted by the Lightbox.
 * Compatible with both SanityPhoto (from CollectionCard/CollectionModal)
 * and FeedItem (from GalleryGrid/PhotoLightbox).
 */
export interface LightboxPhoto {
  url: string;
  title?: string;
  date?: string;
  tags?: string[];
}

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  photos: LightboxPhoto[];
  initialIndex?: number;
  collectionName?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Lightbox({
  isOpen,
  onClose,
  photos,
  initialIndex = 0,
  collectionName,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Reset state whenever the lightbox opens or initial index changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
    }
  }, [isOpen, initialIndex]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Reset loading state on slide change
  useEffect(() => {
    setIsImageLoading(true);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) setIsZoomed(false);
        else onClose();
      }
      if (!isZoomed) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, isZoomed, currentIndex, photos.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];
  const hasMultiple = photos.length > 1;

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#f5f1ea]/97 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onClick={onClose}
      />

      <motion.div
        className="relative w-full h-full flex flex-col"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 md:px-10 md:py-7 pointer-events-none">
          {collectionName && (
            <h2 className="font-serif font-light text-foreground text-lg md:text-2xl tracking-wide">
              {collectionName}
            </h2>
          )}
          <button
            id="lightbox-close"
            onClick={onClose}
            className="pointer-events-auto ml-auto text-[9px] uppercase tracking-[0.4em] text-gray-warm hover:text-foreground transition-colors duration-300"
            aria-label="Close lightbox"
          >
            Close
          </button>
        </div>

        {/* Viewer */}
        <div className="flex-1 w-full h-full flex items-center justify-center p-8 md:p-24 relative overflow-hidden pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
            {/* Loading overlay */}
            {isImageLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <LoadingSpinner size="md" />
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, filter: "blur(6px)", scale: 1 }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  scale: isZoomed ? 2 : 1,
                  x: isZoomed ? `${50 - mousePos.x}%` : "0%",
                  y: isZoomed ? `${50 - mousePos.y}%` : "0%",
                }}
                exit={{ opacity: 0, filter: "blur(6px)", scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`relative w-full h-full ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                onClick={() => setIsZoomed((z) => !z)}
                onMouseMove={handleMouseMove}
              >
                <Image
                  src={currentPhoto.url}
                  alt={currentPhoto.title ?? collectionName ?? `Photo ${currentIndex + 1}`}
                  fill
                  className="object-contain saturate-[0.9] sepia-[0.08]"
                  sizes="100vw"
                  priority
                  onLoad={() => setIsImageLoading(false)}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            {hasMultiple && !isZoomed && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-0 h-full w-1/4 flex items-center justify-start group outline-none cursor-w-resize"
                  aria-label="Previous image"
                >
                  <span className="text-2xl md:text-4xl font-light text-foreground/20 group-hover:text-foreground/60 transition-all duration-300 -translate-x-1 group-hover:translate-x-2 ml-3">
                    ←
                  </span>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-0 h-full w-1/4 flex items-center justify-end group outline-none cursor-e-resize"
                  aria-label="Next image"
                >
                  <span className="text-2xl md:text-4xl font-light text-foreground/20 group-hover:text-foreground/60 transition-all duration-300 translate-x-1 group-hover:-translate-x-2 mr-3">
                    →
                  </span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer metadata */}
        {currentPhoto && !isZoomed && (
          <div className="absolute bottom-5 md:bottom-8 left-0 right-0 flex flex-col items-center gap-2.5 z-20 pointer-events-none">
            {currentPhoto.tags && currentPhoto.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5">
                {currentPhoto.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] uppercase tracking-widest text-foreground/60 bg-foreground/[0.05] px-2.5 py-0.5 border border-foreground/[0.07]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {currentPhoto.date && (
              <span className="text-[8px] uppercase tracking-widest text-foreground/40">
                {new Date(currentPhoto.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            {hasMultiple && (
              <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/30">
                {currentIndex + 1} / {photos.length}
              </span>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
