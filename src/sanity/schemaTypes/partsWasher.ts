import { defineField, defineType } from 'sanity';

export const partsWasherType = defineType({
  name: 'partsWasher',
  title: 'Parts Washer',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Model Name', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ 
      name: 'loadType', 
      type: 'string', 
      title: 'Loading Configuration',
      options: { 
        list: [
          { title: 'Top Load', value: 'top-load' },
          { title: 'Front Load', value: 'front-load' },
          { title: 'Manual/Aqueous sink', value: 'manual' },
          { title: 'Roll-Out Door', value: 'roll-out' },
        ] 
      } 
    }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'mainImage', type: 'image', options: { hotspot: true } }),
    
    // Technical Data
    defineField({
      name: 'specs',
      type: 'object',
      title: 'Technical Specifications',
      fields: [
        { name: 'turntableDiameter', type: 'string', title: 'Turntable Diameter' },
        { name: 'workHeight', type: 'string', title: 'Working Height' },
        { name: 'weightCapacity', type: 'string', title: 'Weight Capacity (kg)' },
        { name: 'tankCapacity', type: 'string', title: 'Sump Capacity (Litres)' },
        { name: 'pumpPower', type: 'string', title: 'Pump HP' },
        { name: 'heatPower', type: 'string', title: 'Heating Element (kW)' },
      ]
    }),

    defineField({ name: 'brochurePDF', type: 'file', title: 'Brochure PDF' }),
  ],
});
