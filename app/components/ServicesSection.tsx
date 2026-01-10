"use client";

import { motion } from "framer-motion";

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
  return (
    <section id="services" className="relative py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2
            className="
              text-3xl md:text-4xl
              font-light
              uppercase
              tracking-[0.3em]
              text-black
            "
          >
            Services
          </h2>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-gray-500">
            Selected offerings
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="
                relative
                p-12
                bg-white
                shadow-[0_40px_100px_-55px_rgba(0,0,0,0.35)]
              "
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            >
              {/* Index */}
              <span
                className="
                  absolute top-6 right-6
                  text-[10px]
                  uppercase
                  tracking-widest
                  text-gray-400
                "
              >
                0{index + 1}
              </span>

              {/* Title */}
              <h3
                className="
                  text-sm
                  uppercase
                  tracking-[0.25em]
                  text-black
                "
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-6 text-sm leading-relaxed text-gray-700">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
