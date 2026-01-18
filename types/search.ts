export interface SearchResults {
    projects: {
        _id: string;
        name: string;
        slug: string;
        description?: string;
        technologies?: string[];
    }[];
    experience: {
        _id: string;
        company: string;
        position: string;
        startDate: string;
        endDate?: string;
    }[];
    tech: {
        _id: string;
        name: string;
        category?: string;
    }[];
    certifications: {
        _id: string;
        title: string;
        company: string;
    }[];
    links: {
        _id: string;
        name: string;
        url: string;
    }[];
}
