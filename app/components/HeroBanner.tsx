"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <Image
          src="/images/gallery1.jpg"
          alt="Edward Barradas Photography"
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale"
        />

        {/* Editorial overlay */}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-white/35" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl px-6 text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.25,
            },
          },
        }}
      >
        {/* Name */}
        <motion.h1
          className="
            text-5xl md:text-7xl lg:text-8xl
            font-bold
            uppercase
            tracking-[0.35em]
            text-black
          "
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Edward Barradas
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="
            mt-8
            text-xs md:text-sm
            uppercase
            tracking-[0.3em]
            text-gray-800
          "
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Photography · Visual Art · Editorial Aesthetic
        </motion.p>

        {/* Actions */}
        <motion.div
          className="mt-14 flex justify-center gap-12"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <a
            href="#gallery"
            className="text-xs uppercase tracking-widest text-black border-b border-black pb-1 hover:opacity-60 transition"
          >
            View Gallery
          </a>

          <a
            href="#contact"
            className="text-xs uppercase tracking-widest text-black border-b border-black pb-1 hover:opacity-60 transition"
          >
            Contact
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
