import { defineField, defineType } from "sanity";

export const experience = defineType({
    name: "experience",
    title: "Experience",
    type: "document",
    fields: [
        defineField({
            name: "position",
            title: "Position",
            type: "string",
        }),
        defineField({
            name: "company",
            title: "Company",
            type: "string",
        }),
        defineField({
            name: "companyLink",
            title: "Company Link",
            type: "url",
        }),
        defineField({
            name: "experienceCategory",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: 'Full Time', value: 'Full Time' },
                    { title: 'Internship', value: 'Internship' },
                    { title: 'Freelance', value: 'Freelance' }
                ]
            }
        }),
        defineField({
            name: "startDate",
            title: "Start Date",
            type: "date",
        }),
        defineField({
            name: "endDate",
            title: "End Date",
            type: "date",
        }),
        defineField({
            name: "stillWorking",
            title: "Still Working Here",
            type: "boolean",
        }),
        defineField({
            name: "shortDesc",
            title: "Short Description",
            type: "text",
        }),
        defineField({
            name: "tasks",
            title: "Tasks / Responsibilities",
            type: "array",
            of: [{ type: "string" }]
        }),
    ],
});
