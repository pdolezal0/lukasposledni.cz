import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'imageGallery',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        defineArrayMember({
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt',
              type: 'string',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
  },
})
