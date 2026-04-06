"use client";

import { motion } from "framer-motion";
import CollectionCard from "@/app/components/ui/CollectionCard";

// Using the same base mock data from GalleryPreview, expanded.
// Once you add CMS or actual data, replace this array.
const collections = [
  { src: "/images/gallery1.jpg", name: "JAVIER", photos: ["/images/gallery1.jpg", "/images/gallery2.jpg", "/images/gallery3.jpg"] },
  { src: "/images/gallery2.jpg", name: "MARCO", photos: ["/images/gallery2.jpg", "/images/gallery4.jpg", "/images/gallery6.jpg"] },
  { src: "/images/gallery3.jpg", name: "ANTONIO", photos: ["/images/gallery3.jpg", "/images/gallery5.jpg"] },
  { src: "/images/gallery4.jpg", name: "LUCAS", photos: ["/images/gallery4.jpg", "/images/gallery1.jpg"] },
  { src: "/images/gallery5.jpg", name: "MATEO", photos: ["/images/gallery5.jpg", "/images/gallery2.jpg"] },
  { src: "/images/gallery6.jpg", name: "DANIEL", photos: ["/images/gallery6.jpg", "/images/gallery3.jpg", "/images/gallery4.jpg"] },
];

export default function GalleryGrid() {
  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
            Archive
          </p>
          <h1
            className="
              mt-5
              font-light
              uppercase
              tracking-[0.3em]
              text-black
              text-[clamp(1.8rem,4vw,3rem)]
            "
          >
            Full Portfolio
          </h1>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {collections.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
            >
              <CollectionCard item={item} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
