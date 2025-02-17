import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'landingPage',
  type: 'document',
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: 'gallery',
      type: 'imageGallery',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutMe',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'description',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{ title: 'Paragraph', value: 'normal' }],
              marks: {
                decorators: [{ title: 'Strong', value: 'strong' }],
                annotations: [],
              },
              lists: [],
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'portrait',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'contact',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          type: 'string',
        }),
        defineField({
          name: 'email',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Landing Page',
      }
    },
  },
})
