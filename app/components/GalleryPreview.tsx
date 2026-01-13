"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  { src: "/images/gallery1.jpg", name: "JAVIER" },
  { src: "/images/gallery2.jpg", name: "MARCO" },
  { src: "/images/gallery3.jpg", name: "ANTONIO" },
];

export default function GalleryPreview() {
  const [index, setIndex] = useState(0);
  const [isCarousel, setIsCarousel] = useState(false);

  // Detect when carousel should activate
  useEffect(() => {
    const handleResize = () => {
      setIsCarousel(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isCarousel) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isCarousel]);

  return (
    <section id="gallery" className="bg-white py-24">
      <div className="max-w-400 mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
            Portfolio
          </p>

          <h2
            className="
              mt-5
              font-light
              uppercase
              tracking-[0.3em]
              text-black
              text-[clamp(1.4rem,3vw,2.2rem)]
            "
          >
            Selected Work
          </h2>
        </motion.div>

        {/* Desktop layout */}
        {!isCarousel && (
          <div className="grid grid-cols-3 gap-14">
            {images.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        )}

        {/* Carousel layout */}
        {isCarousel && (
          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="max-w-[80vw] mx-auto">
                    <Card item={images[index]} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination dots */}
            <div className="mt-10 flex justify-center gap-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    index === i ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
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

function Card({ item }: { item: { src: string; name: string } }) {
  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className="
          relative
          aspect-3/4
          overflow-hidden
          shadow-[0_40px_90px_-45px_rgba(0,0,0,0.35)]
        "
      >
        <Image
          src={item.src}
          alt={item.name}
          fill
          sizes="80vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-white/55 transition-opacity duration-500 group-hover:opacity-0" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="
              font-bold
              uppercase
              text-transparent
              bg-clip-text
              tracking-[0.3em]
              text-[clamp(1.4rem,4vw,2.6rem)]
              transition-opacity
              duration-500
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
  );
}
