import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seoFields',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Ideal length is 50-60 characters.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Ideal length is 150-160 characters.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (OG)',
      type: 'image',
    }),
    defineField({
      name: 'canonical',
      title: 'Canonical URL',
      type: 'url',
    }),
    defineField({
      name: 'noIndex',
      title: 'Do Not Index',
      type: 'boolean',
      description: 'Hide this page from search engines',
      initialValue: false,
    }),
    defineField({
      name: 'structuredData',
      title: 'Custom Structured Data (JSON-LD)',
      type: 'text',
      description: 'Raw JSON-LD object for advanced usage',
    }),
  ],
});
