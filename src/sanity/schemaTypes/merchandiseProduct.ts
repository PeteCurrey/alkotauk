import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'merchandiseProduct',
  title: 'Merchandise Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'Base SKU',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Base Price (£)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Workwear',
          'Casual Wear',
          'Accessories',
          'PPE',
          'Gifts',
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'variants',
      title: 'Variants (Sizes/Colors)',
      type: 'array',
      of: [{ type: 'productVariant' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields',
    }),
  ],
});
