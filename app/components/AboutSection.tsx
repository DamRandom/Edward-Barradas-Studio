"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
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
        <div className="absolute inset-0 bg-white/40" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="
            relative
            bg-white
            shadow-[0_60px_140px_-70px_rgba(0,0,0,0.4)]
            overflow-hidden
          "
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Sliding container */}
          <motion.div
            className="flex w-[200%] lg:w-full"
            animate={
              isMobile
                ? { x: showText ? "-50%" : "0%" }
                : { x: "0%" }
            }
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {/* Image panel */}
            <div className="w-1/2 lg:w-1/2 relative aspect-[3/4] lg:aspect-auto">
              <Image
                src="/images/about.jpg"
                alt="Edward Barradas portrait"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>

            {/* Text panel */}
            <div className="w-1/2 lg:w-1/2 flex items-center">
              <div className="p-12 md:p-16">
                <h2
                  className="
                    text-3xl md:text-4xl
                    font-light
                    uppercase
                    tracking-[0.3em]
                    text-black
                  "
                >
                  About
                </h2>

                <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700">
                  <p>
                    I’m Edward Barradas, a photographer focused on creating
                    clean, honest and visually timeless imagery.
                  </p>

                  <p>
                    I collaborate on both personal and commercial projects,
                    working closely with brands and individuals.
                  </p>

                  <p>
                    Every image is carefully crafted, maintaining a minimal
                    and editorial approach throughout the process.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Toggle arrow (mobile only) */}
          {isMobile && (
            <button
              onClick={() => setShowText((v) => !v)}
              className="
                absolute
                bottom-6
                right-6
                flex
                items-center
                justify-center
                w-10
                h-10
                border
                border-black
                rounded-full
                text-black
                transition
                hover:bg-black
                hover:text-white
              "
              aria-label="Toggle content"
            >
              <motion.span
                animate={{ rotate: showText ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="block text-sm"
              >
                →
              </motion.span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
