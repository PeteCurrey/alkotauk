import { defineField, defineType } from 'sanity';

export const machineSeriesType = defineType({
  name: 'machineSeries',
  title: 'Machine Series',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Series Name', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', type: 'text', title: 'Series Description' }),
    defineField({ name: 'isEliteSeries', type: 'boolean', title: 'Is Elite Series', initialValue: false }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
  ],
});
