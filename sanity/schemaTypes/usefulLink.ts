import { defineField, defineType } from "sanity";

export const usefulLink = defineType({
    name: "usefulLink",
    title: "Useful Link",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "url",
            title: "URL",
            type: "url",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "icon",
            title: "Icon Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "label",
            title: "Label (Optional)",
            description: "If different from name",
            type: "string",
        }),
        defineField({
            name: "color",
            title: "Color",
            type: "string",
            options: {
                list: [
                    { title: "Background", value: "bg-background" },
                    { title: "Foreground", value: "bg-foreground" },
                    { title: "Primary", value: "bg-primary" },
                    { title: "Primary Foreground", value: "bg-primary-foreground" },
                    { title: "Muted", value: "bg-muted" },
                    { title: "Muted Foreground", value: "bg-muted-foreground" },
                    { title: "Accent", value: "bg-accent" },
                    { title: "Accent Foreground", value: "bg-accent-foreground" },
                    { title: "Border", value: "bg-border" },
                ],
            },
            initialValue: "bg-muted",
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "url",
            media: "icon",
        },
    },
});
