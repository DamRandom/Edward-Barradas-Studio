"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-40 bg-white"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
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
            Contact
          </h2>

          <p className="mt-8 text-sm leading-relaxed text-gray-700 max-w-xl mx-auto">
            For print inquiries, commissioned work or collaborations,
            feel free to reach out.
          </p>
        </motion.div>

        {/* Editorial button */}
        <motion.div
          className="mt-24 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <a
            href="mailto:contact@edwardbarradas.com"
            className="
              group
              relative
              inline-flex
              items-center
              gap-6
              px-14 py-6
              border
              border-black
              text-xs
              uppercase
              tracking-[0.35em]
              text-black
              overflow-hidden
              transition
            "
          >
            {/* Hover fill */}
            <span
              className="
                absolute
                inset-0
                bg-black
                translate-y-full
                group-hover:translate-y-0
                transition-transform
                duration-500
                ease-out
                -z-10
              "
            />

            <span className="relative group-hover:text-white transition-colors duration-300">
              Start a conversation
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
