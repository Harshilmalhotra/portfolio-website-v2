import { defineField, defineType } from "sanity";

export const techStack = defineType({
    name: "techStack",
    title: "Tech Stack",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "icon",
            title: "Icon (Lucide Icon Name or Image)",
            type: "string",
            description: "Legacy: Use Tech Image for custom uploads",
        }),
        defineField({
            name: "techImage",
            title: "Tech Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: 'Frontend', value: 'Frontend' },
                    { title: 'Backend', value: 'Backend' },
                    { title: 'Full Stack', value: 'Full Stack' },
                    { title: 'Tools', value: 'Tools' },
                    { title: 'DevOps', value: 'DevOps' },
                    { title: 'Languages', value: 'Languages' },
                    { title: "Other", value: "Other" }
                ]
            }
        }),
        defineField({
            name: "show",
            title: "Show in Tech Stack List",
            type: "boolean",
            initialValue: true,
            description: "Toggle to show or hide this tech in the main Tech Stack section. Hidden items can still be used in projects.",
        }),
    ],
});
