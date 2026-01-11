"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const services = [
  {
    title: "Portrait Photography",
    description:
      "Personal and professional portrait sessions focused on natural light, clean composition and a timeless editorial aesthetic.",
  },
  {
    title: "Commercial Photography",
    description:
      "Visual content for brands, products and editorial projects seeking clarity, consistency and refined visual identity.",
  },
  {
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
    <section id="services" className="relative py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
            Services
          </p>
          <h2
            className="
              mt-6
              font-light
              uppercase
              tracking-[0.3em]
              text-black
              text-[clamp(1.4rem,4vw,2.3rem)]
            "
          >
            What I Offer
          </h2>
        </motion.div>

        {/* Desktop layout */}
        {!isMobile && (
          <div className="grid grid-cols-3 gap-16">
            {services.map((service, i) => (
              <div
                key={i}
                className="
                  relative
                  p-12
                  bg-white
                  shadow-[0_40px_100px_-55px_rgba(0,0,0,0.35)]
                "
              >
                <span className="absolute top-6 right-6 text-[10px] tracking-widest text-gray-400">
                  0{i + 1}
                </span>

                <h3 className="text-sm uppercase tracking-[0.25em] text-black">
                  {service.title}
                </h3>

                <p className="mt-6 text-sm leading-relaxed text-gray-700">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Mobile / tablet carousel */}
        {isMobile && (
          <>
            <div className="relative h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="
                    absolute
                    inset-0
                    mx-auto
                    max-w-sm
                    p-10
                    bg-white
                    shadow-[0_40px_100px_-55px_rgba(0,0,0,0.35)]
                  "
                >
                  <span className="text-[10px] tracking-widest text-gray-400">
                    0{index + 1}
                  </span>

                  <h3 className="mt-4 text-sm uppercase tracking-[0.25em] text-black">
                    {services[index].title}
                  </h3>

                  <p className="mt-6 text-sm leading-relaxed text-gray-700">
                    {services[index].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination dots */}
            <div className="mt-10 flex justify-center gap-3">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    i === index ? "bg-black" : "bg-gray-300"
                  }`}
                  aria-label={`Service ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
