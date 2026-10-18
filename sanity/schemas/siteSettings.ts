import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "About & Contact",
  type: "document",
  description:
    "Your biography, artist statement and contact details. These appear on the About page, Contact page and footer.",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: 'Short line under your name, e.g. "Multidisciplinary Artist · Lahore"',
    }),
    defineField({
      name: "bioShort",
      title: "Short bio",
      type: "text",
      rows: 3,
      description: "One or two sentences. Used in search results.",
    }),
    defineField({
      name: "bioLong",
      title: "Biography",
      type: "text",
      rows: 14,
      description: "Your full bio. Leave a blank line between paragraphs.",
    }),
    defineField({
      name: "statement",
      title: "Artist statement",
      type: "text",
      rows: 14,
      description: "Leave a blank line between paragraphs.",
    }),
    defineField({
      name: "facts",
      title: "Information box (About page sidebar)",
      type: "array",
      description:
        'Short label/value rows, e.g. "Born" → "1994, Lahore". Drag to reorder.',
      of: [
        {
          type: "object",
          name: "fact",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "value", title: "Value", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "instagram",
      title: "Instagram link",
      type: "url",
      description: "Full link, e.g. https://instagram.com/yourname",
    }),
  ],
  preview: { prepare: () => ({ title: "About & Contact" }) },
});
