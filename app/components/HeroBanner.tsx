"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero({ siteSettings }: { siteSettings?: any }) {
  return (
    <section
      id="home"
      className="relative min-h-svh w-full flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Background image — film aesthetic */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        {siteSettings?.heroImage ? (
          <Image
            src={siteSettings.heroImage}
            alt="Edward Barradas Photography"
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale saturate-[0.2] sepia-[0.25] contrast-[0.92] brightness-[0.9]"
          />
        ) : (
          <Image
            src="/images/gallery1.jpg"
            alt="Edward Barradas Photography"
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale saturate-[0.2] sepia-[0.25] contrast-[0.92] brightness-[0.9]"
          />
        )}

        {/* Warm cream veil — editorial feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f1ea]/30 via-[#f5f1ea]/55 to-[#f5f1ea]/75" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(26,20,12,0.2)_100%)] pointer-events-none" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full px-6 text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.25 },
          },
        }}
      >
        {/* Eyebrow label */}
        <motion.p
          className="text-[9px] uppercase tracking-[0.5em] text-foreground/50 mb-8"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Photography · Lima, Perú
        </motion.p>

        {/* Name — Playfair Display */}
        <motion.h1
          className="font-serif font-bold text-foreground text-[clamp(2.8rem,9vw,7rem)] leading-[1.02] tracking-[-0.02em]"
          variants={{
            hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Edward Barradas
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-5 text-[10px] sm:text-xs uppercase tracking-[0.38em] text-foreground/60"
          variants={{
            hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Visual Art · Editorial Aesthetic
        </motion.p>

        {/* Divider line */}
        <motion.div
          className="mt-10 mx-auto w-12 h-px bg-foreground/25"
          variants={{
            hidden: { opacity: 0, scaleX: 0 },
            visible: { opacity: 1, scaleX: 1 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Actions */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <a
            id="hero-view-gallery"
            href="#gallery"
            className="text-[10px] uppercase tracking-widest text-foreground border-b border-foreground/30 pb-0.5 hover:border-foreground/80 transition-all duration-300"
          >
            View Gallery
          </a>
          <span className="hidden sm:inline text-foreground/20 text-xs">·</span>
          <a
            id="hero-contact"
            href="#contact"
            className="text-[10px] uppercase tracking-widest text-foreground border-b border-foreground/30 pb-0.5 hover:border-foreground/80 transition-all duration-300"
          >
            Contact
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-5"
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {[
            { label: "Instagram", href: "https://instagram.com/fragmentsofed" },
            { label: "WhatsApp", href: "https://wa.me/51910280429" },
            { label: "X / Twitter", href: "https://twitter.com/Edwardhrnndz" },
          ].map((s, i) => (
            <span key={s.label} className="flex items-center gap-5">
              {i > 0 && <span className="text-foreground/20 text-[9px]">·</span>}
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-[9px] uppercase tracking-widest text-foreground/40 hover:text-foreground/80 transition-colors duration-300"
              >
                {s.label}
              </a>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
