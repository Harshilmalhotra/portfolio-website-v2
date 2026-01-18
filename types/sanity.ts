import { PortableTextBlock } from "sanity";

export interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string;
}

export interface Image {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
}

export interface Profile extends SanityBody {
    _type: "profile";
    name: string;
    tagline: string;
    about: PortableTextBlock[];
    socialLinks: SocialLink[];
    email: string;
    heroImage?: Image;
}

export interface SocialLink {
    _key: string;
    platform: string;
    url: string;
    icon: string;
}

export interface Project extends SanityBody {
    _type: "project";
    name: string;
    slug: { current: string };
    isFeatured?: boolean;
    order?: number;
    shortDesc: string;
    description: string;
    demoLink: string;
    sourceLink: string;
    role: string;
    technologies: TechStack[];
    content: PortableTextBlock[];
    coverImageUrl?: Image;
    previews?: (Image & { alt?: string })[];
}

export interface TechStack extends SanityBody {
    _type: "techStack";
    name: string;
    icon: string;
    techImage?: Image;
    category: string;
    show?: boolean;
}

export interface TechCategory extends SanityBody {
    _type: "techCategory";
    title: string;
    order: number;
}

export interface Experience extends SanityBody {
    _type: "experience";
    position: string;
    company: string;
    companyLink: string;
    experienceCategory: "Full Time" | "Internship" | "Freelance";
    startDate: string;
    endDate: string;
    stillWorking: boolean;
    shortDesc: string;
    tasks: string[];
}

export interface Stat extends SanityBody {
    _type: "stat";
    label: string;
    value: string;
}

export interface UsefulLink extends SanityBody {
    _type: "usefulLink";
    name: string;
    url: string;
    icon?: Image;
    label?: string;
    color: string;
    order: number;
}

export interface Certification extends SanityBody {
    _type: "certification";
    title: string;
    company: string;
    issueDate?: string;
    description?: string;
    skills?: string[];
    image?: Image | string;
    link?: string;
    order?: number;
    isFeatured?: boolean;
}
