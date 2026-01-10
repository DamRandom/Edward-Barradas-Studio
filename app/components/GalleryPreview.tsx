"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const images = [
  { src: "/images/gallery1.jpg", name: "ALESSIA" },
  { src: "/images/gallery2.jpg", name: "MATTEO" },
  { src: "/images/gallery3.jpg", name: "CAMILLE" },
];

export default function GalleryPreview() {
  return (
    <section id="gallery" className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Optional editorial label */}
          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
            Portfolio
          </p>

          <h2
            className="
              mt-6
              text-3xl md:text-4xl
              font-light
              uppercase
              tracking-[0.3em]
              text-black
            "
          >
            Selected Work
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {images.map((item, index) => (
            <motion.article
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            >
              <div className="relative aspect-3/4 overflow-hidden shadow-[0_40px_90px_-45px_rgba(0,0,0,0.35)]">
                {/* Image */}
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />

                {/* Editorial veil */}
                <div className="absolute inset-0 bg-white/50 transition-opacity duration-500 group-hover:opacity-0" />

                {/* Cut-out name */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span
                    className="
                      text-4xl md:text-5xl
                      font-bold
                      uppercase
                      tracking-[0.35em]
                      text-transparent
                      bg-clip-text
                      transition-opacity duration-500
                      group-hover:opacity-0
                    "
                    style={{
                      backgroundImage: `url(${item.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-28 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link
            href="/gallery"
            className="
              inline-block
              text-xs
              uppercase
              tracking-widest
              text-black
              border-b border-black
              pb-1
              hover:opacity-60
              transition
            "
          >
            Explore full gallery
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
