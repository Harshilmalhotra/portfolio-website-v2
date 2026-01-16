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
    heroImage: { _type: "image", asset: { _ref: "", _type: "reference" } },
};

export const fallbackStats: Stat[] = [
    { _id: "1", _type: "stat", _createdAt: "", _updatedAt: "", _rev: "", label: "Years experience", value: "3+" },
    { _id: "2", _type: "stat", _createdAt: "", _updatedAt: "", _rev: "", label: "Projects delivered", value: "5+" },
    { _id: "3", _type: "stat", _createdAt: "", _updatedAt: "", _rev: "", label: "Satisfaction", value: "99%" },
];

export const fallbackTechStack: TechStack[] = [
    // Languages
    { _id: "l1", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "C", icon: "", category: "Languages" },
    { _id: "l2", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "C++", icon: "", category: "Languages" },
    { _id: "l3", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Python", icon: "", category: "Languages" },
    { _id: "l4", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "JavaScript", icon: "", category: "Languages" },

    // Core CS
    { _id: "cs1", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Data Structures & Algorithms", icon: "", category: "Other" },
    { _id: "cs2", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Object-Oriented Programming", icon: "", category: "Other" },
    { _id: "cs3", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Operating Systems", icon: "", category: "Other" },
    { _id: "cs4", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Linux", icon: "", category: "Tools" },
    { _id: "cs5", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "SQL", icon: "", category: "Languages" },

    // Backend & Web
    { _id: "bw1", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Node.js", icon: "", category: "Backend" },
    { _id: "bw2", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Express.js", icon: "", category: "Backend" },
    { _id: "bw3", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "FastAPI", icon: "", category: "Backend" },
    { _id: "bw4", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "React.js", icon: "", category: "Frontend" },
    { _id: "bw5", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Next.js", icon: "", category: "Frontend" },
    { _id: "bw6", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Tailwind CSS", icon: "", category: "Frontend" },

    // Databases
    { _id: "db1", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "PostgreSQL", icon: "", category: "Backend" },
    { _id: "db2", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "MongoDB", icon: "", category: "Backend" },
    { _id: "db3", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Supabase", icon: "", category: "Backend" },

    // Cloud & DevOps
    { _id: "cd1", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Docker", icon: "", category: "DevOps" },
    { _id: "cd2", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "CI/CD", icon: "", category: "DevOps" },
    { _id: "cd3", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "GitHub Actions", icon: "", category: "DevOps" },
    { _id: "cd4", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Kubernetes", icon: "", category: "DevOps" },
    { _id: "cd5", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "AWS (EC2, S3, Lambda)", icon: "", category: "DevOps" },
    { _id: "cd6", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Azure", icon: "", category: "DevOps" },

    // AI/ML
    { _id: "ai1", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "TensorFlow", icon: "", category: "Other" },
    { _id: "ai2", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "PyTorch", icon: "", category: "Other" },
    { _id: "ai3", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "Scikit-learn", icon: "", category: "Other" },
    { _id: "ai4", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "OpenCV", icon: "", category: "Other" },
    { _id: "ai5", _type: "techStack", _createdAt: "", _updatedAt: "", _rev: "", name: "MediaPipe", icon: "", category: "Other" },
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
        shortDesc: "AI-powered personal memory and reminder assistant",
        description: "Memvix is an intelligent assistant that understands natural language...",
        demoLink: "https://github.com/Harshilmalhotra/memvix",
        sourceLink: "https://github.com/Harshilmalhotra/memvix",
        role: "Founder & Full Stack Engineer",
        technologies: [],
        content: [],
        coverImageUrl: { _type: "image", asset: { _ref: "", _type: "reference" } },
    }
];
