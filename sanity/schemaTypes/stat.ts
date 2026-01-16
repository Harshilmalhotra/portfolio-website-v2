import { defineField, defineType } from "sanity";

export const stat = defineType({
    name: "stat",
    title: "Stat / Metric",
    type: "document",
    fields: [
        defineField({
            name: "label",
            title: "Label",
            type: "string",
        }),
        defineField({
            name: "value",
            title: "Value",
            type: "string",
        }),
    ],
});
