import { defineField, defineType } from 'sanity';

export const waterTreatmentSystemType = defineType({
  name: 'waterTreatmentSystem',
  title: 'Water Treatment System',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'System Name', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ 
      name: 'systemType', 
      type: 'string', 
      title: 'System Technology',
      options: { 
        list: [
          { title: 'Vacuum Filtration (VFS)', value: 'vfs' },
          { title: 'Media Filtration', value: 'media-filtration' },
          { title: 'Oil/Water Separator', value: 'separator' },
          { title: 'Wastewater Evaporator', value: 'evaporator' },
          { title: 'Biological Treatment', value: 'biological' },
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
        { name: 'flowRateLPM', type: 'number', title: 'Treatment Capacity (LPM)' },
        { name: 'tankCapacity', type: 'string', title: 'Tank Capacity' },
        { name: 'filtrationMicrons', type: 'string', title: 'Filtration Level (Microns)' },
        { name: 'powerRequirements', type: 'string', title: 'Power Requirements' },
        { name: 'dimensions', type: 'string', title: 'Footprint (Dimensions)' },
      ]
    }),

    defineField({
      name: 'applicationAreas',
      type: 'array',
      title: 'Application Areas',
      of: [{ type: 'string' }],
    }),

    defineField({ name: 'brochurePDF', type: 'file', title: 'Brochure PDF' }),
  ],
});
