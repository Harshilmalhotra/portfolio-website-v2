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
    ],
});
