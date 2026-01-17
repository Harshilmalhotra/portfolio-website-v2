import { defineField, defineType } from "sanity";

export const techCategory = defineType({
    name: "techCategory",
    title: "Tech Category",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            description: "Category name (must match Tech Stack category)",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "order",
            title: "Order",
            type: "number",
            description: "Lower numbers appear first",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "order",
        },
    },
});
