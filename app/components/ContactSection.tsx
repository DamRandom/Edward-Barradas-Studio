"use client";

import { motion } from "framer-motion";
import { CONTACT_INFO } from "@/app/constants/site";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-28 md:py-44 bg-background overflow-hidden"
    >
      {/* Decorative top border accent */}
      <div className="absolute top-0 left-6 right-6 h-px bg-black/6" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Left content */}
          <div className="lg:col-span-7">
            <span className="text-[9px] uppercase tracking-[0.45em] text-foreground/40 font-medium block mb-3">
              Consultas / 03
            </span>

            <h2 className="font-serif font-light text-[clamp(2.5rem,5.5vw,4.2rem)] text-foreground leading-[1.02]">
              Creemos algo<br />
              <span className="italic font-serif text-accent-gold font-normal">atemporal</span> juntos.
            </h2>

            <div className="mt-8 w-12 h-px bg-accent-gold" />

            <p className="mt-8 text-[15px] leading-[1.85] text-foreground/70 max-w-lg font-light">
              Para consultas de impresiones, fotografía editorial por encargo, colaboraciones con marcas
              o retratos privados, no dudes en escribirme. Cada consulta es atendida con dedicación y cuidado.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600/80" />
                Disponible para Proyectos Q3/Q4
              </span>
              <span>·</span>
              <span>{CONTACT_INFO.location}</span>
            </div>
          </div>

          {/* Right CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 p-8 sm:p-10 bg-background/80 border border-black/10 shadow-xs relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-gold/5 blur-2xl pointer-events-none" />

            <p className="text-[9px] uppercase tracking-[0.35em] text-foreground/40 mb-6 font-medium">
              Contacto Directo
            </p>

            <a
              id="contact-start-conversation"
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group w-full flex items-center justify-between px-7 py-4.5 bg-foreground text-background text-[10px] uppercase tracking-[0.35em] hover:bg-foreground/90 transition-all duration-300"
            >
              <span>Iniciar Conversación</span>
              <span className="text-accent-gold group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>

            <div className="mt-8 space-y-4 pt-6 border-t border-black/10">
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-widest text-foreground/35 mb-1">Correo</span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-xs tracking-wider text-foreground/80 hover:text-foreground underline-offset-4 hover:underline transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="flex flex-col pt-2">
                <span className="text-[8px] uppercase tracking-widest text-foreground/35 mb-1">Instagram</span>
                <a
                  href={CONTACT_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs tracking-wider text-foreground/80 hover:text-foreground underline-offset-4 hover:underline transition-colors"
                >
                  {CONTACT_INFO.instagramHandle}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
