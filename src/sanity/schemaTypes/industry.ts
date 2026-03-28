import { defineField, defineType } from 'sanity';

export const industryType = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Industry Name', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'icon', type: 'string', title: 'Lucide Icon Name' }),
    defineField({ name: 'description', type: 'text', title: 'Short Description' }),
    defineField({ name: 'content', type: 'array', of: [{ type: 'block' }], title: 'Full Page Content' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ 
      name: 'featuredMachines', 
      type: 'array', 
      of: [{ type: 'reference', to: [{ type: 'machine' }] }] 
    }),
    defineField({
      name: 'seo',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string' },
        { name: 'metaDescription', type: 'text' },
      ]
    }),
  ],
});
