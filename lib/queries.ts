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
        shortDesc,
        description,
        demoLink,
        sourceLink,
        role,
        technologies,
        content,
        coverImageUrl
    }
`;

export const techStackQuery = groq`
    *[_type == "techStack"] {
        _id,
        name,
        icon,
        category
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
