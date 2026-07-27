"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const services = [
  {
    number: "01",
    title: "Portrait Photography",
    description:
      "Personal and professional portrait sessions focused on natural light, clean composition and a timeless editorial aesthetic.",
  },
  {
    number: "02",
    title: "Commercial Photography",
    description:
      "Visual content for brands, products and editorial projects seeking clarity, consistency and refined visual identity.",
  },
  {
    number: "03",
    title: "Fine Art Prints",
    description:
      "Selected works available as high-quality digital files or curated prints, with licensing options based on usage.",
  },
];

export default function ServicesSection() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 1024);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isMobile]);

  return (
    <section id="services" className="relative py-28 md:py-40 bg-foreground overflow-hidden">
      {/* Subtle warm grain texture via pseudo background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')] pointer-events-none" />

      <div className="relative px-6">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="text-[9px] uppercase tracking-[0.45em] text-background/40">
            Services
          </p>
          <h2 className="mt-4 font-serif font-light text-background/90 text-[clamp(2rem,4vw,3rem)]">
            What I Offer
          </h2>
          <div className="mt-5 w-8 h-px bg-accent-gold/70" />
        </motion.div>

        {/* Desktop layout — horizontal list with top border rule */}
        {!isMobile && (
          <div className="grid grid-cols-3 divide-x divide-background/[0.08]">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="px-10 py-2 first:pl-0 last:pr-0 group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              >
                <span className="text-[10px] tracking-widest text-background/25 font-light">
                  {service.number}
                </span>

                <h3 className="mt-5 font-serif text-lg text-background/85 leading-snug group-hover:text-accent-gold transition-colors duration-400">
                  {service.title}
                </h3>

                <div className="mt-4 w-5 h-px bg-accent-gold/40 group-hover:w-10 transition-all duration-400" />

                <p className="mt-5 text-[14px] leading-[1.75] text-background/50">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile carousel */}
        {isMobile && (
          <>
            <div className="relative h-60">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 max-w-sm mx-auto"
                >
                  <span className="text-[10px] tracking-widest text-background/25">
                    {services[index].number}
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-background/85">
                    {services[index].title}
                  </h3>
                  <div className="mt-4 w-6 h-px bg-accent-gold/50" />
                  <p className="mt-5 text-sm leading-[1.75] text-background/50">
                    {services[index].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center gap-2.5">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Service ${i + 1}`}
                  className={`h-px rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-background/60" : "w-2 bg-background/20"
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
