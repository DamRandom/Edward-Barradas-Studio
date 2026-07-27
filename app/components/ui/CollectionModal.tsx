"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  collection: {
    name: string;
    photos?: { url: string; date?: string; tags?: string[] }[];
  };
}

export default function CollectionModal({ isOpen, onClose, collection }: CollectionModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setIsImageLoading(true);
  }, [currentIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentIndex(0);
      setIsZoomed(false);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, collection]);

  const photos = collection.photos || [];

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
      if (!isZoomed) {
        if (e.key === "ArrowRight") setCurrentIndex(prev => (prev + 1) % photos.length);
        if (e.key === "ArrowLeft") setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, isZoomed, photos.length]);

  if (!isOpen) return null;
  const handleNext = () => setCurrentIndex(prev => (prev + 1) % photos.length);
  const handlePrev = () => setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop — warm cream */}
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
          <h2 className="font-serif font-light text-foreground text-lg md:text-2xl tracking-wide">
            {collection.name}
          </h2>

          <button
            id="modal-close"
            onClick={onClose}
            className="pointer-events-auto text-[9px] uppercase tracking-[0.4em] text-gray-warm hover:text-foreground transition-colors duration-300"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>

        {/* Viewer */}
        <div className="flex-1 w-full h-full flex items-center justify-center p-8 md:p-24 relative overflow-hidden pointer-events-none">
          {photos.length === 0 ? (
            <p className="text-[10px] uppercase tracking-widest text-gray-warm pointer-events-auto">
              No photos found.
            </p>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
              {/* Loader overlay displayed until image is loaded */}
              {isImageLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                  <LoadingSpinner size="md" />
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, filter: "blur(6px)", scale: 1, x: "0%", y: "0%" }}
                  animate={{ 
                    opacity: 1, 
                    filter: "blur(0px)",
                    scale: isZoomed ? 2 : 1,
                    x: isZoomed ? `${50 - mousePos.x}%` : "0%",
                    y: isZoomed ? `${50 - mousePos.y}%` : "0%"
                  }}
                  exit={{ opacity: 0, filter: "blur(6px)", scale: 1, x: "0%", y: "0%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`relative w-full h-full ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  onMouseMove={(e) => {
                    if (!isZoomed) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    // Calculate raw percentage relative to the *visible* unscaled bounding box
                    // Since it's scaled, currentTarget might return scaled rect or unscaled. 
                    // Actually, rect is the scaled bounds.
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    setMousePos({ x, y });
                  }}
                >
                  <Image
                    src={photos[currentIndex]?.url || ""}
                    alt={`${collection.name} — ${currentIndex + 1}`}
                    fill
                    className="object-contain saturate-[0.9] sepia-[0.08]"
                    sizes="100vw"
                    priority
                    onLoad={() => setIsImageLoading(false)}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              {photos.length > 1 && !isZoomed && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="absolute left-0 h-full w-1/4 flex items-center justify-start group outline-none cursor-w-resize"
                    aria-label="Previous image"
                  >
                    <span className="text-2xl md:text-4xl font-light text-foreground/20 group-hover:text-foreground/60 transition-all duration-300 transform -translate-x-1 group-hover:translate-x-2 ml-3">
                      ←
                    </span>
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="absolute right-0 h-full w-1/4 flex items-center justify-end group outline-none cursor-e-resize"
                    aria-label="Next image"
                  >
                    <span className="text-2xl md:text-4xl font-light text-foreground/20 group-hover:text-foreground/60 transition-all duration-300 transform translate-x-1 group-hover:-translate-x-2 mr-3">
                      →
                    </span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer metadata */}
        {photos.length > 0 && photos[currentIndex] && !isZoomed && (
          <div className="absolute bottom-5 md:bottom-8 left-0 right-0 flex flex-col items-center gap-2.5 z-20 pointer-events-none">
            {photos[currentIndex].tags && photos[currentIndex].tags!.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5">
                {photos[currentIndex].tags!.map(tag => (
                  <span
                    key={tag}
                    className="text-[8px] uppercase tracking-widest text-foreground/60 bg-foreground/[0.05] px-2.5 py-0.5 border border-foreground/[0.07]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {photos[currentIndex].date && (
              <span className="text-[8px] uppercase tracking-widest text-foreground/40">
                {new Date(photos[currentIndex].date as string).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}

            <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/30">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
