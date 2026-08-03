"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { SanitySiteSettings } from "@/app/types";
import { SOCIAL_LINKS } from "@/app/constants/site";
import { SocialIcon } from "./ui/SocialIcon";

interface HeroBannerProps {
  siteSettings?: SanitySiteSettings;
}

const FALLBACK_IMAGE = "/images/gallery1.jpg";

const IMAGE_CLASSES =
  "object-cover grayscale saturate-[0.2] sepia-[0.25] contrast-[0.92] brightness-[0.9]";

const CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function HeroBanner({ siteSettings }: HeroBannerProps) {
  const heroSrc = siteSettings?.heroImage ?? FALLBACK_IMAGE;

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
        <Image
          src={heroSrc}
          alt="Edward Barradas Photography"
          fill
          priority
          sizes="100vw"
          className={IMAGE_CLASSES}
        />

        {/* Warm cream veil — editorial feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f1ea]/30 via-[#f5f1ea]/55 to-[#f5f1ea]/75" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(26,20,12,0.2)_100%)] pointer-events-none" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center py-20"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Eyebrow label */}
        <motion.div
          className="inline-flex items-center gap-3 px-4 py-1.5 border border-black/10 rounded-full mb-8 bg-background/40 backdrop-blur-xs"
          variants={CHILD_VARIANTS}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.45em] text-foreground/60 font-medium">
            Fotografía & Arte · Lima, Perú
          </span>
        </motion.div>

        {/* Name — Playfair Display */}
        <motion.h1
          className="font-serif font-light text-foreground text-[clamp(3.2rem,8.5vw,7.5rem)] leading-[0.98] tracking-[-0.03em] max-w-5xl mx-auto"
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
          className="mt-6 text-[10px] sm:text-xs uppercase tracking-[0.42em] text-foreground/55 max-w-xl mx-auto font-light"
          variants={CHILD_VARIANTS}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Arte Visual & Fotografía Editorial
        </motion.p>

        {/* Divider line */}
        <motion.div
          className="mt-10 mx-auto w-16 h-px bg-accent-gold/60"
          variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Actions */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <a
            id="hero-view-gallery"
            href="#gallery"
            className="px-8 py-3.5 border border-foreground/30 text-[10px] uppercase tracking-[0.35em] text-foreground hover:bg-foreground hover:text-background transition-all duration-400"
          >
            Ver Portafolio
          </a>
          <a
            id="hero-contact"
            href="#contact"
            className="text-[10px] uppercase tracking-[0.35em] text-foreground/70 hover:text-foreground underline-offset-8 decoration-accent-gold hover:underline transition-all duration-300 py-2"
          >
            Escríbeme →
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-6"
          variants={CHILD_VARIANTS}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {SOCIAL_LINKS.map((s, i) => (
            <span key={s.label} className="flex items-center gap-6">
              {i > 0 && <span className="text-accent-gold/40 text-[9px]">·</span>}
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-foreground/45 hover:text-foreground transition-colors duration-300"
                aria-label={s.label}
              >
                <SocialIcon name={s.label} className="w-[18px] h-[18px]" />
              </a>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
