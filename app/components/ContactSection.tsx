"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-16
          "
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Left content */}
          <div className="max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
              Contact
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
              Let’s work together
            </h2>

            <p className="mt-8 text-sm leading-relaxed text-gray-700">
              For print inquiries, commissioned work or collaborations,
              feel free to reach out. I’m always open to thoughtful projects
              and meaningful visual stories.
            </p>
          </div>

          {/* Editorial CTA */}
          <motion.a
            href="mailto:contact@edwardbarradas.com"
            className="
              group
              relative
              shrink-0
              inline-flex
              items-center
              gap-6
              px-16 py-8
              border
              border-black
              text-xs
              uppercase
              tracking-[0.35em]
              text-black
              overflow-hidden
            "
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            {/* Sliding fill */}
            <span
              className="
                absolute
                inset-0
                bg-black
                translate-x-full
                group-hover:translate-x-0
                transition-transform
                duration-500
                ease-out
                -z-10
              "
            />

            <span className="relative group-hover:text-white transition-colors duration-300">
              Start a conversation
            </span>

            {/* Arrow */}
            <span
              className="
                relative
                text-base
                group-hover:text-white
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
