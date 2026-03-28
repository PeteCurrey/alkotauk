import { defineType, defineField } from "sanity";
import { Users } from "lucide-react";

export const lead = defineType({
  name: "lead",
  title: "Lead Management",
  type: "document",
  icon: Users,
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Context / Message",
      type: "text",
    }),
    defineField({
      name: "status",
      title: "Lead Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Qualified", value: "qualified" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      initialValue: "maintenance_splash",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "company",
      status: "status",
      date: "_createdAt"
    },
    prepare(selection) {
      const { title, subtitle, status, date } = selection;
      return {
        title: `${title} ${subtitle ? `(${subtitle})` : ""}`,
        subtitle: `${status.toUpperCase()} - ${date ? new Date(date).toLocaleDateString() : ''}`,
      };
    },
  },
});
