"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        min-h-svh
        w-full
        flex
        items-center
        justify-center
        bg-white
        overflow-hidden
      "
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08, opacity: 0 }}
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

        {/* Editorial veil */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="
          relative
          z-10
          w-full
          max-w-6xl
          px-6
          text-center
        "
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.22,
            },
          },
        }}
      >
        {/* Name */}
        <motion.h1
          className="
            font-bold
            uppercase
            text-black
            tracking-[0.28em]
            text-[clamp(2.2rem,8vw,6.5rem)]
            leading-[1.05]
          "
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Edward Barradas
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="
            mt-6
            text-[10px]
            sm:text-xs
            md:text-sm
            uppercase
            tracking-[0.32em]
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
          className="
            mt-14
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-8
            sm:gap-12
          "
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <a
            href="#gallery"
            className="
              text-xs
              uppercase
              tracking-widest
              text-black
              border-b
              border-black
              pb-1
              hover:opacity-60
              transition
            "
          >
            View Gallery
          </a>

          <a
            href="#contact"
            className="
              text-xs
              uppercase
              tracking-widest
              text-black
              border-b
              border-black
              pb-1
              hover:opacity-60
              transition
            "
          >
            Contact
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
