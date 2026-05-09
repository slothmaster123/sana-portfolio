import { defineField, defineType } from "sanity";

const mediums = [
  "Installation",
  "Photography",
  "Painting",
  "Sculpture",
  "Textile",
  "3D Printing",
  "Digital",
];

export const artworkSchema = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
      options: { list: mediums.map((m) => ({ title: m, value: m })) },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload the artwork image here.",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      placeholder: "e.g. 60 × 80 cm, or Dimensions variable",
    }),
    defineField({
      name: "description",
      title: "Description / Exhibition note",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featured",
      title: "Show on home page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "forSale",
      title: "Available for sale",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "price",
      title: "Price (shown publicly)",
      type: "string",
      description: 'e.g. "£1,200" or "Contact for pricing"',
      hidden: ({ document }) => !document?.forSale,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower number = shown first. Leave blank for automatic.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "year", media: "image" },
  },
  orderings: [
    { title: "Year, newest first", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
