// ─────────────────────────────────────────────────────────────────────────────
// Site-wide static constants — single source of truth.
// Import from "@/app/constants/site" everywhere.
// ─────────────────────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { name: "gallery", label: "Galería" },
  { name: "about", label: "Sobre mí" },
  { name: "services", label: "Servicios" },
  { name: "contact", label: "Contacto" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/fragmentsofed" },
  { label: "WhatsApp", href: "https://wa.me/51910280429" },
  { label: "X / Twitter", href: "https://twitter.com/Edwardhrnndz" },
] as const;

export const SERVICES = [
  {
    number: "01",
    title: "Fotografía de Retratos",
    description:
      "Sesiones de retrato personales y profesionales centradas en luz natural, composición limpia y una estética editorial atemporal.",
  },
  {
    number: "02",
    title: "Fotografía Comercial",
    description:
      "Contenido visual para marcas, productos y proyectos editoriales que buscan claridad, consistencia e identidad visual refinada.",
  },
  {
    number: "03",
    title: "Impresiones de Arte",
    description:
      "Obras seleccionadas disponibles como archivos digitales de alta calidad o impresiones curadas, con opciones de licencia según el uso.",
  },
] as const;

export const CONTACT_INFO = {
  email: "edwardenrique1@gmail.com",
  whatsapp: "https://wa.me/51910280429",
  instagram: "https://instagram.com/fragmentsofed",
  instagramHandle: "@fragmentsofed",
  location: "Lima e Internacional",
} as const;

export const SITE_META = {
  name: "Edward Barradas Studio",
  tagline: "Fotografía & Estudio Editorial",
  location: "Lima, Perú",
} as const;
