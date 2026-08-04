"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/app/hooks/useMediaQuery";
import type { SanitySiteSettings } from "@/app/types";

interface AboutSectionProps {
  siteSettings?: SanitySiteSettings;
}

const FALLBACK_BG = "/images/gallery1.jpg";
const FALLBACK_PORTRAIT = "/images/about.jpg";

export default function AboutSection({ siteSettings }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={siteSettings?.aboutBackground ?? FALLBACK_BG}
          alt=""
          fill
          sizes="100vw"
          className="object-cover saturate-[0.15] sepia-[0.3] contrast-[0.88] brightness-[0.85]"
        />
        {/* Warm cream overlay */}
        <div className="absolute inset-0 bg-[#f5f1ea]/50 backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#f5f1ea]/60 via-transparent to-[#f5f1ea]/20 pointer-events-none" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          className="relative bg-[#f5f1ea]/90 backdrop-blur-xs border border-black/8 shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* On mobile: stacked layout (portrait on top, text below).
              On desktop: side-by-side 50/50 split. */}
          <div className="flex flex-col lg:flex-row">
            {/* Portrait */}
            <div className="w-full lg:w-1/2 relative aspect-[3/4] lg:aspect-auto lg:min-h-[520px]">
              <Image
                src={siteSettings?.aboutPortrait ?? FALLBACK_PORTRAIT}
                alt="Edward Barradas portrait"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover saturate-[0.85] sepia-[0.1]"
              />
              <div className="absolute inset-0 bg-foreground/[0.02]" />
            </div>

            {/* Text */}
            <div className="w-full lg:w-1/2 flex items-center">
              <div className="p-8 sm:p-12 md:p-16 lg:p-20">
                <span className="text-[9px] uppercase tracking-[0.45em] text-foreground/40 font-medium block mb-3">
                  Sobre mí / Visión
                </span>

                <h2 className="font-serif font-light text-[clamp(2rem,3.2vw,2.8rem)] text-foreground leading-[1.08]">
                  El trabajo detrás
                  <br />
                  de la imagen
                </h2>

                <div className="mt-6 w-12 h-px bg-accent-gold" />

                <div className="mt-8 space-y-5 text-[14px] sm:text-[15px] leading-[1.85] text-foreground/75 font-light">
                  <p>
                    Soy Edward Hernández Barradas, fotógrafo enfocado en
                    retratos y fotografía homoerótica, creando imágenes limpias,
                    honestas y visualmente atemporales.
                  </p>
                  <p>
                    Colaboro en proyectos personales, trabajando de cerca con
                    personas y propuestas creativas que buscan una identidad
                    visual auténtica.
                  </p>
                  <p>
                    Cada imagen está cuidadosamente elaborada, manteniendo un
                    enfoque minimalista y editorial durante todo el proceso.
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-black/10 flex items-center justify-between text-[9px] uppercase tracking-[0.35em] text-foreground/45">
                  <span>Basado en Lima</span>
                  <span className="text-accent-gold">·</span>
                  <span>Disponible Internacionalmente</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile swipe hint — replaced the complex sliding animation with
              a simple stacked layout that is more reliable and accessible */}
          {isMobile && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.35em] text-foreground/30 pointer-events-none">
              ↓ Scroll
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
