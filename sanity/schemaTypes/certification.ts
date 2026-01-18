import { defineField, defineType } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      description: "Toggle to show this certification on the home page",
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company/Issuer",
      type: "string",
    }),
    defineField({
      name: "issueDate",
      title: "Issue Date",
      type: "date",
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Certificate Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "link",
      title: "Credential URL",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Issue Date",
      name: "issueDateDesc",
      by: [{ field: "issueDate", direction: "desc" }],
    }
  ]
});
