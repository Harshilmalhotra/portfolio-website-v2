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
    *[_type == "project"] | order(order asc, _createdAt desc) {
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

export const usefulLinksQuery = groq`
    *[_type == "usefulLink"] | order(order asc) {
        _id,
        name,
        url,
        icon,
        label,
        color,
        order
    }
`;

export const lastUpdatedQuery = groq`
    *[_type in ["project", "profile", "techStack", "techCategory", "usefulLink", "certification"]] | order(_updatedAt desc)[0]._updatedAt
`;

export const certificationsQuery = groq`
    *[_type == "certification"] | order(order asc, issueDate desc) {
        _id,
        title,
        company,
        issueDate,
        description,
        skills,
        image,
        link,
        order,
        isFeatured
    }
`;

export const searchEverythingQuery = groq`
    {
        "projects": *[_type == "project"] {
            _id, 
            name, 
            "slug": slug.current, 
            description, 
            "technologies": technologies[]->name
        },
        "experience": *[_type == "experience"] {
            _id, 
            company, 
            position, 
            startDate,
            endDate
        },
        "tech": *[_type == "techStack"] {
            _id, 
            name,
            "category": coalesce(categoryRef->title, category)
        },
        "certifications": *[_type == "certification"] {
            _id, 
            title,
            company
        },
        "links": *[_type == "usefulLink"] {
            _id,
            name,
            url
        }
    }
`;
