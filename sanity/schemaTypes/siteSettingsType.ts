import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'The massive background image on the home page.',
    }),
    defineField({
      name: 'aboutPortrait',
      title: 'About Portrait Image',
      type: 'image',
      options: { hotspot: true },
      description: 'The portrait image of the photographer in the About section.',
    }),
    defineField({
      name: 'aboutBackground',
      title: 'About Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'The parallax background image in the About section.',
    })
  ]
})
