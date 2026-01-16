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
            name: "isFeatured",
            title: "Featured Project",
            type: "boolean",
            initialValue: false,
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
            of: [{ type: "reference", to: { type: "techStack" } }],
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H1", value: "h1" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    lists: [
                        { title: "Bullet", value: "bullet" },
                        { title: "Numbered", value: "number" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Strong", value: "strong" },
                            { title: "Emphasis", value: "em" },
                            { title: "Code", value: "code" },
                            { title: "Underline", value: "underline" },
                            { title: "Strike", value: "strike-through" },
                        ],
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                    {
                                        name: "href",
                                        type: "url",
                                        title: "URL",
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: "image",
                    options: { hotspot: true },
                },
                {
                    type: "code",
                    options: {
                        language: "javascript",
                        withFilename: true,
                    },
                },
            ],
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
