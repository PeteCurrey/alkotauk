import { defineField, defineType } from 'sanity';
import { Settings } from 'lucide-react';

export const partType = defineType({
  name: 'part',
  title: 'Part & Consumable',
  type: 'document',
  icon: Settings,
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Part Name', validation: (Rule) => Rule.required() }),
    defineField({ name: 'sku', type: 'string', title: 'SKU / Part Number', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ 
      name: 'category', 
      type: 'string', 
      options: { 
        list: [
          { title: 'Nozzles', value: 'nozzles' },
          { title: 'Hoses', value: 'hoses' },
          { title: 'Trigger Guns', value: 'trigger-guns' },
          { title: 'Lances', value: 'lances' },
          { title: 'Detergent', value: 'detergent' },
          { title: 'Pump Parts', value: 'pump-parts' },
          { title: 'Engines & Motors', value: 'engines-motors' },
          { title: 'Burner Parts', value: 'burner-parts' },
        ] 
      } 
    }),
    defineField({ name: 'price', type: 'number', title: 'Price (GBP)', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', type: 'text', title: 'Short Description' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ 
      name: 'compatibility', 
      type: 'array', 
      title: 'Compatible Machines',
      of: [{ type: 'reference', to: [{ type: 'machine' }] }] 
    }),
    defineField({
      name: 'specs',
      type: 'object',
      title: 'Technical Specs',
      fields: [
        { name: 'material', type: 'string' },
        { name: 'connection', type: 'string' },
        { name: 'maxPressure', type: 'string' },
        { name: 'maxTemp', type: 'string' },
      ]
    }),
  ],
});
