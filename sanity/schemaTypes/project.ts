import { defineField, defineType } from "sanity";

export const project = defineType({
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "name" },
        }),
        defineField({
            name: "shortDesc",
            title: "Short Description",
            type: "text",
        }),
        defineField({
            name: "description",
            title: "Full Description",
            type: "text",
        }),
        defineField({
            name: "demoLink",
            title: "Demo Link",
            type: "url",
        }),
        defineField({
            name: "sourceLink",
            title: "Source Link",
            type: "url",
        }),
        defineField({
            name: "role",
            title: "Role",
            type: "string",
        }),
        defineField({
            name: "technologies",
            title: "Technologies",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "coverImageUrl",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "previews",
            title: "Preview Images",
            type: "array",
            of: [
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Alternative Text",
                        },
                    ],
                },
            ],
        }),
    ],
});
