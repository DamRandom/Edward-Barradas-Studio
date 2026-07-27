import {defineField, defineType} from 'sanity'

export const collectionType = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The title of the collection (e.g., JAVIER, BODAS).',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      description: 'The main image shown on the grid.',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true }
          }),
          defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
            initialValue: () => new Date().toISOString().substring(0, 10)
          }),
          defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' }
          })
        ],
        preview: {
          select: {
            title: 'tags.0',
            subtitle: 'date',
            media: 'image'
          },
          prepare(selection) {
            const {title, subtitle, media} = selection
            return {
              title: title ? `#${title}` : 'Photo',
              subtitle: subtitle,
              media: media
            }
          }
        }
      }],
      description: 'Upload your photos. Click each photo to add its tags and date.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'Used to sort the collections chronologically.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'coverImage',
    },
  },
})
