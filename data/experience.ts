export type Experience = {
    position: string;
    company: string;
    companyLink?: string;
    experienceCategory: string; // 'Full Time' | 'Freelance'
    startDate: string;
    endDate?: string;
    stillWorking?: boolean;
    shortDesc: string;
    description?: string;
    location?: string;
    tasks?: string[];
};

export const experiences: Experience[] = [
  {
    position: "Software Development Engineer Intern",
    company: "Bajaj Finserv Health Limited",
    experienceCategory: "Internship",
    startDate: "Jun 2025",
    endDate: "Jul 2025",
    stillWorking: false,
    shortDesc:
      "Built and shipped production healthcare software handling real-time signals, cloud infrastructure, and secure APIs at scale.",
    tasks: [
      "Built and shipped a production Progressive Web App (PWA) enabling contactless health screening using device camera input in under 30 seconds",
      "Designed and implemented secure, low-latency REST APIs with strict input validation, failure isolation, and monitoring",
      "Containerized backend services using Docker and deployed on Microsoft Azure with CI/CD pipelines for safe rollouts and rollbacks",
      "Collaborated with ML and product teams to productionize computer-vision pipelines with reliability, observability, and SLA guarantees",
      "Integrated backend inference services aggregating 25+ health markers across distributed components"
    ]
  },
  {
    position: "Artificial Intelligence / Machine Learning Intern",
    company: "Indian Institute of Technology (IIT) Mandi",
    experienceCategory: "Internship",
    startDate: "Jun 2024",
    endDate: "Jul 2024",
    stillWorking: false,
    shortDesc:
      "Built and optimized machine-learning pipelines for time-series anomaly detection in a research environment.",
    tasks: [
      "Built an LSTM-Autoencoder pipeline for time-series anomaly detection, improving F1 score from 0.78 to 0.90",
      "Applied feature engineering and noise filtering to reduce false positives and improve detection reliability",
      "Optimized inference and preprocessing pipelines, reducing latency by 20% and increasing throughput by 40%",
      "Analyzed anomalous patterns and refined detection thresholds for behavior-based fault and threat detection",
      "Produced research-grade experimental results and technical documentation"
    ]
  }
];
