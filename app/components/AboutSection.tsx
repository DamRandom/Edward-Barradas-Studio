"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-36 overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/images/gallery1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover grayscale"
        />

        {/* Editorial veil (lighter) */}
        <div className="absolute inset-0 bg-white/40" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Dual editorial card */}
        <motion.div
          className="
            grid grid-cols-1 md:grid-cols-2
            bg-white
            shadow-[0_60px_140px_-70px_rgba(0,0,0,0.4)]
          "
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Left image */}
          <div className="relative aspect-3/4 md:aspect-auto overflow-hidden">
            <Image
              src="/images/about.jpg"
              alt="Edward Barradas portrait"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />

            {/* Subtle texture */}
            <div className="absolute inset-0 bg-black/5" />
          </div>

          {/* Right content */}
          <div className="p-12 md:p-16 flex flex-col justify-center">
            <motion.h2
              className="
                text-3xl md:text-4xl
                font-light
                uppercase
                tracking-[0.3em]
                text-black
              "
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              About
            </motion.h2>

            <motion.div
              className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            >
              <p>
                I’m Edward Barradas, a photographer focused on creating clean,
                honest and visually timeless imagery. My work is driven by light,
                composition and subtle details that often go unnoticed.
              </p>

              <p>
                I collaborate on both personal and commercial projects, working
                closely with brands and individuals who value aesthetics,
                simplicity and a clear visual narrative.
              </p>

              <p>
                Every image is carefully crafted, from capture to final edit,
                maintaining a minimal and editorial approach throughout the
                entire process.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
