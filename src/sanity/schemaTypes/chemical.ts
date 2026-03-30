import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'chemical',
  title: 'Alkota Chemical',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Chemical Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      placeholder: 'e.g. TR-440 Farm Soap',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Degreasers', value: 'degreasers' },
          { title: 'Auto & Truck Wash', value: 'auto-truck-wash' },
          { title: 'Aluminum Brightener', value: 'aluminum-brightener' },
          { title: 'Industrial', value: 'industrial' },
          { title: 'Food Processing', value: 'food-processing' },
          { title: 'Masonry & Asphalt', value: 'masonry-asphalt' },
          { title: 'Parts Washer', value: 'parts-washer' },
          { title: 'Residential', value: 'residential' },
          { title: 'Additives & Scale Stop', value: 'additives' },
          { title: 'Coatings', value: 'coatings' },
          { title: 'Aviation', value: 'aviation' },
          { title: 'Transportation', value: 'transportation' }
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Short Tagline',
      type: 'string',
      placeholder: 'e.g. Extreme road film and carbon removal.',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'features',
      title: 'Key Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    
    // Technical Specs
    defineField({
      name: 'specs',
      title: 'Technical Specifications',
      type: 'object',
      fields: [
        { name: 'phLevel', type: 'string', title: 'pH Level (e.g. 12 - 13)' },
        { name: 'dilutionRatio', type: 'string', title: 'Recommended Dilution (e.g. 1:50 - 1:100)' },
        { name: 'scent', type: 'string', title: 'Scent' },
        { name: 'color', type: 'string', title: 'Color' },
        { name: 'isBiodegradable', type: 'boolean', title: 'Biodegradable', initialValue: true },
      ]
    }),

    // Visuals
    defineField({
      name: 'image',
      title: 'Main Product Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Action/Application Gallery',
      type: 'array',
      of: [{ type: 'image' }],
    }),

    // Documents
    defineField({
      name: 'sdsFile',
      title: 'Safety Data Sheet (SDS) PDF',
      type: 'file',
    }),
    defineField({
      name: 'techSheetFile',
      title: 'Technical Data Sheet PDF',
      type: 'file',
    }),

    // Availability & Pricing
    defineField({
      name: 'variants',
      title: 'Container Sizes & Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'size', type: 'string', title: 'Size (e.g. 20L Drum)' },
            { name: 'price', type: 'number', title: 'Price (£)' },
            { name: 'sku', type: 'string', title: 'Unit SKU' },
          ]
        }
      ]
    }),

    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields',
    }),
  ],
});
