import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Variant Name (e.g. Size Large, Red)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'Variant SKU',
      type: 'string',
    }),
    defineField({
      name: 'priceAdjustment',
      title: 'Price Adjustment (+/-)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'stock',
      title: 'Stock Level',
      type: 'number',
      initialValue: 0,
    }),
  ],
});
