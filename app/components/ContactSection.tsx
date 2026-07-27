"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-28 md:py-44 bg-background overflow-hidden"
    >
      {/* Decorative top border accent */}
      <div className="absolute top-0 left-6 right-6 h-px bg-black/[0.06]" />

      <div className="px-6">
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-16 md:gap-24"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Left content */}
          <div className="max-w-lg">
            <p className="text-[9px] uppercase tracking-[0.45em] text-gray-warm">
              Contact
            </p>

            <h2 className="mt-4 font-serif text-[clamp(2.2rem,5vw,3.5rem)] text-foreground leading-[1.08]">
              Let&apos;s work<br />together.
            </h2>

            <div className="mt-6 w-8 h-px bg-accent-gold" />

            <p className="mt-8 text-[15px] leading-[1.8] text-foreground/60 max-w-sm">
              For print inquiries, commissioned work or collaborations,
              feel free to reach out. I&apos;m always open to thoughtful projects
              and meaningful visual stories.
            </p>
          </div>

          {/* CTA — editorial minimal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="shrink-0"
          >
            <a
              id="contact-start-conversation"
              href="https://wa.me/51910280429"
              target="_blank"
              rel="noreferrer"
              className="
                group
                relative
                inline-flex items-center gap-5
                px-9 py-5
                border border-foreground/20
                text-[10px] uppercase tracking-[0.4em] text-foreground/70
                hover:text-foreground hover:border-foreground/60
                transition-all duration-400
                overflow-hidden
              "
            >
              <span className="relative">Start a conversation</span>
              <span className="relative text-accent-gold group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>

            <div className="mt-8 space-y-4">
              <a
                href="mailto:contact@edwardbarradas.com"
                className="block text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground/70 underline-offset-4 hover:underline decoration-foreground/20 transition-all duration-300"
              >
                contact@edwardbarradas.com
              </a>
              <a
                href="https://instagram.com/fragmentsofed"
                target="_blank"
                rel="noreferrer"
                className="block text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground/70 underline-offset-4 hover:underline decoration-foreground/20 transition-all duration-300"
              >
                @fragmentsofed
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
