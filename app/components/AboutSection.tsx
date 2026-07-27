"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function AboutSection({ siteSettings }: { siteSettings?: any }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      {/* Parallax background — film aesthetic */}
      <motion.div aria-hidden style={{ y: bgY }} className="absolute inset-0 -z-10">
        {siteSettings?.aboutBackground ? (
          <Image
            src={siteSettings.aboutBackground}
            alt=""
            fill
            sizes="100vw"
            className="object-cover saturate-[0.15] sepia-[0.3] contrast-[0.88] brightness-[0.85]"
          />
        ) : (
          <Image
            src="/images/gallery1.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover saturate-[0.15] sepia-[0.3] contrast-[0.88] brightness-[0.85]"
          />
        )}
        {/* Warm cream overlay */}
        <div className="absolute inset-0 bg-[#f5f1ea]/50 backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f1ea]/60 via-transparent to-[#f5f1ea]/20 pointer-events-none" />
      </motion.div>

      <div className="px-6">
        <motion.div
          className="relative bg-[#f5f1ea] border border-black/[0.07] overflow-hidden"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Sliding container for mobile */}
          <motion.div
            className="flex w-[200%] lg:w-full"
            animate={isMobile ? { x: showText ? "-50%" : "0%" } : { x: "0%" }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
          >
            {/* Image panel */}
            <div className="w-1/2 lg:w-1/2 relative aspect-3/4 lg:aspect-auto">
              {siteSettings?.aboutPortrait ? (
                <Image
                  src={siteSettings.aboutPortrait}
                  alt="Edward Barradas portrait"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover saturate-[0.8] sepia-[0.12]"
                />
              ) : (
                <Image
                  src="/images/about.jpg"
                  alt="Edward Barradas portrait"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover saturate-[0.8] sepia-[0.12]"
                />
              )}
              <div className="absolute inset-0 bg-foreground/[0.03]" />
            </div>

            {/* Text panel */}
            <div className="w-1/2 lg:w-1/2 flex items-center">
              <div className="p-10 md:p-16 lg:p-20">
                <p className="text-[9px] uppercase tracking-[0.45em] text-gray-warm mb-4">
                  About
                </p>

                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-foreground">
                  The Work Behind<br />the Image
                </h2>

                <div className="mt-6 w-8 h-px bg-accent-gold" />

                <div className="mt-8 space-y-5 text-[15px] leading-[1.8] text-foreground/70">
                  <p>
                    I&apos;m Edward Barradas, a photographer focused on creating
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

          {/* Mobile toggle button */}
          {isMobile && (
            <button
              id="about-toggle-mobile"
              onClick={() => setShowText((v) => !v)}
              className="absolute bottom-5 right-5 flex items-center justify-center w-9 h-9 border border-foreground/20 text-foreground/50 hover:border-foreground/50 hover:text-foreground transition-all duration-300"
              aria-label="Toggle about content"
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
