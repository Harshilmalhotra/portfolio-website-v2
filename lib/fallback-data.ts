import { Experience, Profile, Project, Stat, TechStack } from "@/types/sanity";

export const fallbackProfile: Profile = {
    _id: "fallback-profile",
    _type: "profile",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    _rev: "fallback-rev",
    name: "Harshil Malhotra",
    tagline: "Fullstack Developer building digital experiences.",
    about: [
        {
            _type: "block",
            children: [
                {
                    _type: "span",
                    text: "I Build production-grade web and backend systems with strong foundations in distributed systems, cloud, and security. I specialize in AI-powered applications, real-time pipelines, and scalable APIs that run reliably at scale.",
                },
            ],
        },
    ] as any, // detailed PortableText structure omitted for brevity in fallback
    socialLinks: [],
    email: "harshil@example.com",
    heroImage: undefined,
};

export const fallbackStats: Stat[] = [
    { _id: "1", _type: "stat", _createdAt: "", _updatedAt: "", _rev: "", label: "Years of experience", value: "3+" },
    { _id: "2", _type: "stat", _createdAt: "", _updatedAt: "", _rev: "", label: "Projects delivered", value: "5+" },
    { _id: "3", _type: "stat", _createdAt: "", _updatedAt: "", _rev: "", label: "Satisfaction", value: "99%" },
];



export const fallbackExperience: Experience[] = [
    {
        _id: "1", _type: "experience", _createdAt: "", _updatedAt: "", _rev: "",
        position: "Software Development Engineer Intern",
        company: "Bajaj Finserv Health Limited",
        companyLink: "",
        experienceCategory: "Internship",
        startDate: "2025-06-01",
        endDate: "2025-07-31",
        stillWorking: false,
        shortDesc: "Built and shipped production healthcare software handling real-time signals, cloud infrastructure, and secure APIs at scale.",
        tasks: [
            "Built and shipped a production Progressive Web App (PWA) enabling contactless health screening using device camera input in under 30 seconds",
            "Designed and implemented secure, low-latency REST APIs with strict input validation, failure isolation, and monitoring"
        ]
    }
];

export const fallbackProjects: Project[] = [
    {
        _id: "1", _type: "project", _createdAt: "", _updatedAt: "", _rev: "",
        name: "Memvix",
        slug: { current: "memvix" },
        isFeatured: true,
        shortDesc: "AI-powered personal memory and reminder assistant",
        description: "Memvix is an intelligent assistant that understands natural language...",
        demoLink: "https://github.com/Harshilmalhotra/memvix",
        sourceLink: "https://github.com/Harshilmalhotra/memvix",
        role: "Founder & Full Stack Engineer",
        technologies: [],
        content: [],
        // coverImageUrl: { _type: "image", asset: { _ref: "", _type: "reference" } },
        coverImageUrl: undefined,
    }
];
