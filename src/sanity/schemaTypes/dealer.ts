import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'dealer',
  title: 'Dealer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Dealership Name',
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
      name: 'pricingTier',
      title: 'Pricing Tier',
      type: 'reference',
      to: [{ type: 'dealerPricingTier' }],
    }),
    defineField({
      name: 'location',
      title: 'Location (City/County)',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'text',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'serviceArea',
      title: 'Service Area (Radius/Regions)',
      type: 'string',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
    }),
  ],
});
