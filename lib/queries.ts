import { groq } from "next-sanity";

export const profileQuery = groq`
    *[_type == "profile"][0] {
        _id,
        name,
        tagline,
        about,
        socialLinks,
        email,
        heroImage
    }
`;

export const projectsQuery = groq`
    *[_type == "project"] | order(_createdAt desc) {
        _id,
        name,
        slug,
        isFeatured,
        shortDesc,
        description,
        demoLink,
        sourceLink,
        role,
        "technologies": technologies[]->{
            name,
            icon,
            techImage
        },
        content,
        coverImageUrl
    }
`;

export const techStackQuery = groq`
    *[_type == "techStack" && (show == true || !defined(show))] {
        _id,
        name,
        icon,
        techImage,
        "category": coalesce(categoryRef->title, category)
    }
`;

export const experienceQuery = groq`
    *[_type == "experience"] | order(startDate desc) {
        _id,
        position,
        company,
        companyLink,
        experienceCategory,
        startDate,
        endDate,
        stillWorking,
        shortDesc,
        tasks
    }
`;

export const statsQuery = groq`
    *[_type == "stat"] {
        _id,
        label,
        value
    }
`;

export const techCategoryQuery = groq`
    *[_type == "techCategory"] | order(order asc) {
        _id,
        title,
        order
    }
`;
