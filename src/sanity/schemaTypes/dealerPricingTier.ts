import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'dealerPricingTier',
  title: 'Dealer Pricing Tier',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tier Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Tier Level (1=Gold, 2=Silver, etc)',
      type: 'number',
    }),
    defineField({
      name: 'discountPercentage',
      title: 'Base Discount %',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'minimumOrder',
      title: 'Minimum Order Value (£)',
      type: 'number',
    }),
  ],
});
