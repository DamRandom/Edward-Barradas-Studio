"use client";

import { Fragment } from "react";
import Link from "next/link";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/app/constants/site";
import { SocialIcon } from "@/app/components/ui/SocialIcon";

interface GallerySidebarProps {
  viewMode: "collections" | "feed";
  onViewModeChange: (mode: "collections" | "feed") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
  resultLabel: string;
}

export default function GallerySidebar({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  resultCount,
  resultLabel,
}: GallerySidebarProps) {
  return (
    <aside className="w-full lg:w-[310px] xl:w-[340px] shrink-0 lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] flex flex-col justify-between space-y-7 bg-background lg:pr-3 overflow-y-auto">
      <div className="space-y-6">
        {/* Return Home */}
        <div className="flex items-center justify-end border-b border-foreground/10 pb-4">
          <Link
            href="/"
            className="text-[9.5px] uppercase tracking-[0.35em] text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-1.5 group py-1 font-medium"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1 text-accent-gold font-bold">
              ←
            </span>
            <span>Inicio</span>
          </Link>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h1 className="font-serif font-light text-foreground text-3xl sm:text-4xl lg:text-[2.35rem] leading-[1.08] tracking-tight">
            Galería
          </h1>
          <div className="flex items-center gap-3 pt-1">
            <div className="w-6 h-px bg-accent-gold" />
            <p className="text-[9.5px] uppercase tracking-[0.3em] text-foreground/60 font-medium">
              Archivo Fotográfico
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="space-y-2 pt-1">
          <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 font-medium block">
            Organizar Obras
          </span>
          <div className="grid grid-cols-2 gap-1.5 bg-foreground/[0.04] p-1 border border-foreground/10">
            {(["feed", "collections"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`py-2 px-2 text-[8.5px] uppercase tracking-widest transition-all duration-300 ${
                  viewMode === mode
                    ? "bg-foreground text-background font-semibold shadow-xs"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {mode === "feed" ? "Todas las Fotos" : "Por Colección"}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            id="gallery-masonry-search"
            type="text"
            placeholder="Buscar en el archivo o #etiquetas..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent border-b border-foreground/20 px-0 py-2 text-[11px] uppercase tracking-[0.18em] text-foreground outline-none placeholder:text-foreground/35 focus:border-foreground transition-colors duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-foreground/40 hover:text-foreground p-1"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between text-[9.5px] uppercase tracking-[0.25em] text-foreground/60 border-t border-b border-foreground/10 py-3">
          <span>{viewMode === "collections" ? "Total de Series" : "Archivo Curado"}</span>
          <span className="font-semibold text-foreground tracking-widest">
            {resultCount} {resultLabel}
          </span>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-foreground/10 pt-5 mt-4 space-y-3.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[9px] uppercase tracking-[0.3em] text-foreground/50">
          <Link href="/#about" className="hover:text-foreground transition-colors">
            Sobre mí
          </Link>
          <span>·</span>
          <Link href="/#contact" className="hover:text-foreground transition-colors">
            Contacto
          </Link>
          {SOCIAL_LINKS.slice(0, 2).map((s) => (
            <Fragment key={s.label}>
              <span>·</span>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground text-foreground/45 transition-colors p-1"
                aria-label={s.label}
              >
                <SocialIcon name={s.label} className="w-[15px] h-[15px]" />
              </a>
            </Fragment>
          ))}
        </div>
        <p className="text-[8.5px] uppercase tracking-[0.28em] text-foreground/35">
          © {new Date().getFullYear()} Edward Barradas · Lima, Perú
        </p>
      </div>
    </aside>
  );
}
