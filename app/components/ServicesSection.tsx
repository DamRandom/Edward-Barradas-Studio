"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/app/hooks/useMediaQuery";
import { SERVICES } from "@/app/constants/site";

export default function ServicesSection() {
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();

  // Auto-advance carousel on mobile
  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SERVICES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isMobile]);

  return (
    <section
      id="services"
      className="relative py-32 md:py-44 bg-[#141414] text-background overflow-hidden border-t border-b border-black"
    >
      {/* Subtle warm grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.45em] text-background/40 font-medium block mb-3">
              Servicios / 02
            </span>
            <h2 className="font-serif font-light text-background/95 text-[clamp(2.4rem,4.5vw,3.6rem)] leading-none">
              Capacidades & Servicios
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-accent-gold/60" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-background/45">
              Soluciones Personalizadas
            </p>
          </div>
        </motion.div>

        {/* Desktop grid */}
        {!isMobile && (
          <div className="grid grid-cols-3 divide-x divide-background/8 border-t border-b border-background/8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.number}
                className="p-8 lg:p-12 group transition-colors duration-400 hover:bg-background/2"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-light text-accent-gold/70 group-hover:text-accent-gold transition-colors duration-300">
                    {service.number}
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.3em] text-background/30 px-2 py-0.5 border border-background/10">
                    Servicio
                  </span>
                </div>
                <h3 className="mt-8 font-serif text-xl text-background/90 leading-snug group-hover:text-accent-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <div className="mt-5 w-8 h-px bg-accent-gold/40 group-hover:w-16 transition-all duration-400" />
                <p className="mt-6 text-[14px] leading-[1.8] text-background/55 font-light">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile carousel */}
        {isMobile && (
          <>
            <div className="relative min-h-65 border border-background/10 p-8 bg-background/2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full"
                >
                  <span className="font-serif text-2xl text-accent-gold">
                    {SERVICES[index].number}
                  </span>
                  <h3 className="mt-4 font-serif text-xl text-background/90">
                    {SERVICES[index].title}
                  </h3>
                  <div className="mt-4 w-8 h-px bg-accent-gold/60" />
                  <p className="mt-5 text-sm leading-[1.8] text-background/60 font-light">
                    {SERVICES[index].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2.5">
              {SERVICES.map((s, i) => (
                <button
                  key={s.number}
                  onClick={() => setIndex(i)}
                  aria-label={`Service ${i + 1}`}
                  className={`h-1 transition-all duration-300 ${
                    i === index ? "w-8 bg-accent-gold" : "w-2 bg-background/20"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
