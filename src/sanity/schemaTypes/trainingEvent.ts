import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'trainingEvent',
  title: 'Training Event',
  type: 'document',
  fields: [
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'trainingCourse' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
    }),
    defineField({
      name: 'bookingLink',
      title: 'External Booking URL',
      type: 'url',
    }),
  ],
});
