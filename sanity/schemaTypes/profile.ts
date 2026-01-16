import { defineField, defineType } from "sanity";

export const profile = defineType({
    name: "profile",
    title: "Profile",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "tagline",
            title: "Tagline",
            type: "string",
        }),
        defineField({
            name: "about",
            title: "About",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "socialLinks",
            title: "Social Links",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "platform", type: "string", title: "Platform" },
                        { name: "url", type: "url", title: "URL" },
                        { name: "icon", type: "string", title: "Icon (Lucide Icon Name)" }
                    ]
                }
            ],
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
        }),
        defineField({
            name: "heroImage",
            title: "Hero Image",
            type: "image",
        })
    ],
});
