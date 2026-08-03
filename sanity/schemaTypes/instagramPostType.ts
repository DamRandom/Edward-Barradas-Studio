import { defineField, defineType } from "sanity";

export const instagramPostType = defineType({
  name: "instagramPost",
  title: "Instagram Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título Interno (Solo para identificar en Sanity)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagen del Post",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL del Post de Instagram",
      type: "url",
      description: "Ejemplo: https://www.instagram.com/p/C1X.../",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "likes",
      title: "Número de Likes",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "comments",
      title: "Número de Comentarios",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "reposts",
      title: "Número de Reposts / Shares",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de Publicación original",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "isActive",
      title: "Mostrar en la web",
      description: "Solo los posts activos se mostrarán en la página (hasta 6).",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      likes: "likes",
      isActive: "isActive",
    },
    prepare({ title, media, likes, isActive }) {
      return {
        title: title,
        subtitle: `${likes} Likes ${isActive ? "• Activo" : "• Oculto"}`,
        media,
      };
    },
  },
});
