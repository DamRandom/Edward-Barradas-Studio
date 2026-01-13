"use client";

import { motion } from "framer-motion";
import CollectionCard from "./CollectionCard";
import { CollectionGridProps } from "../types/gallery";

export default function CollectionGrid({ collections, onSelectCollection }: CollectionGridProps) {
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid */}
        <motion.div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-x-12
            gap-y-24
          "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onSelect={onSelectCollection}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
