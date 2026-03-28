import { defineField, defineType } from 'sanity';

export const machineType = defineType({
  name: 'machine',
  title: 'Machine',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Machine Name', validation: (Rule) => Rule.required() }),
    defineField({ name: 'modelCode', type: 'string', title: 'Model Code (e.g. 420X4)' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'series', type: 'reference', to: [{ type: 'machineSeries' }], title: 'Machine Series' }),
    defineField({ 
      name: 'category', 
      type: 'string', 
      options: { 
        list: [
          { title: 'Hot Water', value: 'hot-water' },
          { title: 'Cold Water', value: 'cold-water' },
          { title: 'Steam Cleaner', value: 'steam-cleaner' },
          { title: 'Parts Washer', value: 'parts-washer' },
          { title: 'Trailer', value: 'trailer' },
          { title: 'Van Pack', value: 'van-pack' },
          { title: 'Mobile Wash System', value: 'mobile-wash-system' },
          { title: 'Water Heater', value: 'water-heater' },
          { title: 'Water Treatment', value: 'water-treatment' },
          { title: 'Space Heater', value: 'space-heater' },
        ] 
      } 
    }),
    defineField({ name: 'isEliteSeries', type: 'boolean', title: 'Elite Series (Industrial Standard)', initialValue: false }),
    defineField({
      name: 'eliteFeatures',
      type: 'array',
      title: 'Elite Series Features',
      of: [{ type: 'string' }],
      hidden: ({ document }) => !document?.isEliteSeries
    }),
    
    // Technical Data
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'galleryImages', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    
    // Ecommerce & Pricing
    defineField({
      name: 'ecommerce',
      title: 'Ecommerce & Pricing',
      type: 'object',
      fields: [
        { name: 'price', type: 'number', title: 'Display Price (Optional)' },
        { name: 'depositAmount', type: 'number', title: 'Stripe Deposit Amount', description: 'Amount required to reserve this machine.' },
        { name: 'isBookable', type: 'boolean', title: 'Enable Deposit Checkout', initialValue: false },
        { name: 'snipcartId', type: 'string', title: 'Snipcart Product SKU' },
      ]
    }),

    // Specifications Group
    defineField({
      name: 'specs',
      type: 'object',
      title: 'Specifications',
      fields: [
        { name: 'flowRateGPM', type: 'number', title: 'Flow Rate (GPM)' },
        { name: 'flowRateLPM', type: 'number', title: 'Flow Rate (LPM)' },
        { name: 'pressurePSI', type: 'number', title: 'Pressure (PSI)' },
        { name: 'pressureBar', type: 'number', title: 'Pressure (BAR)' },
        { name: 'btuRating', type: 'string', title: 'BTU Rating' },
        { name: 'powerSource', type: 'string', options: { list: ['electric', 'petrol', 'diesel', 'lp-gas', 'natural-gas'] } },
        { name: 'heatingFuel', type: 'string', options: { list: ['diesel-kerosene', 'lp-gas', 'natural-gas', 'electric', 'none'] } },
        { name: 'engineType', type: 'string', title: 'Engine/Motor Brand (e.g. Honda GX390)' },
        { name: 'motorVoltage', type: 'string', title: 'Voltage/Phase (e.g. 230V 1ph)' },
        { name: 'pumpStyle', type: 'string', title: 'Pump Style' },
        { name: 'coilType', type: 'string', title: 'Coil Type' },
        { name: 'coilWarrantyYears', type: 'number', title: 'Coil Warranty (Years)' },
        { name: 'weight', type: 'string', title: 'Weight' },
        { name: 'dimensions', type: 'string', title: 'Dimensions (L x W x H)' },
      ]
    }),

    // Relations
    defineField({ name: 'industries', type: 'array', of: [{ type: 'reference', to: [{ type: 'industry' }] }] }),
    
    // Downloads
    defineField({ name: 'brochurePDF', type: 'file', title: 'Brochure PDF' }),
    defineField({ name: 'specSheetPDF', type: 'file', title: 'Spec Sheet PDF' }),
    defineField({ name: 'userManualPDF', type: 'file', title: 'User Manual PDF' }),
  ],
});
