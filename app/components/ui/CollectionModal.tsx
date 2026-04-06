"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  collection: {
    name: string;
    photos?: string[];
  };
}

export default function CollectionModal({ isOpen, onClose, collection }: CollectionModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lock body scroll and reset state
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentIndex(0);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, collection]);

  if (!isOpen) return null;

  const photos = collection.photos || [];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-white/95 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        className="relative w-full h-full flex flex-col"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 pointer-events-none">
          <h2 className="text-xl md:text-2xl font-light uppercase tracking-[0.25em] text-black">
            {collection.name}
          </h2>

          <button
            onClick={onClose}
            className="group p-2 flex items-center justify-center pointer-events-auto"
            aria-label="Close modal"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-black/60 group-hover:text-black transition">
              Close ( Esc )
            </span>
          </button>
        </div>

        {/* Viewer Content */}
        <div className="flex-1 w-full h-full flex items-center justify-center p-8 md:p-24 relative overflow-hidden pointer-events-none">
          {photos.length === 0 ? (
            <p className="text-xs uppercase tracking-widest text-gray-500 pointer-events-auto">
              No photos found.
            </p>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, filter: "blur(4px)", scale: 0.98 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(4px)", scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={photos[currentIndex]}
                    alt={`${collection.name} - ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation Arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="
                      absolute left-[-2rem] md:left-0 
                      h-full w-1/3 md:w-1/4 
                      flex items-center justify-start 
                      group outline-none cursor-[w-resize]
                    "
                    aria-label="Previous image"
                  >
                     <span className="text-3xl md:text-5xl font-light text-black/20 group-hover:text-black/80 transition-all transform -translate-x-2 group-hover:translate-x-4 opacity-50 group-hover:opacity-100 duration-300 ml-4">
                       ←
                     </span>
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="
                      absolute right-[-2rem] md:right-0 
                      h-full w-1/3 md:w-1/4  
                      flex items-center justify-end 
                      group outline-none cursor-[e-resize]
                    "
                    aria-label="Next image"
                  >
                     <span className="text-3xl md:text-5xl font-light text-black/20 group-hover:text-black/80 transition-all transform translate-x-2 group-hover:-translate-x-4 opacity-50 group-hover:opacity-100 duration-300 mr-4">
                       →
                     </span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        {photos.length > 0 && (
          <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center z-20 pointer-events-none">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black bg-white/70 px-5 py-2 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
