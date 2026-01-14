export type Project = {
    name: string;
    shortDesc: string;
    description?: string;
    demoLink?: string;
    sourceLink?: string;
    slug: string;
    iconUrl?: string; // Optional for now
    coverImageUrl?: string;
    role?: string;
    technologies?: any[];
    content?: string; // HTML or Markdown content
    previews?: { imageAlt: string, imageUrl: string }[];
};

export const projects: Project[] = [
  {
    name: "Memvix",
    shortDesc: "AI-powered personal memory and reminder assistant",
    description:
      "Memvix is an intelligent assistant that understands natural language, extracts time, intent, and context, and schedules reminders across platforms like Telegram and web dashboards. It uses NLP, Duckling, background workers, and a distributed system architecture to deliver real-time, reliable reminders.",
    demoLink: "https://github.com/Harshilmalhotra/memvix",
    slug: "memvix",
    role: "Founder & Full Stack Engineer",
    content: `
      <p>
        Memvix is a production-grade reminder and memory system that allows users to create reminders using natural language such as 
        <i>"Remind me tomorrow at 9 PM to submit assignment"</i>.
      </p>
      <p>
        The platform uses NLP pipelines, Duckling for date-time extraction, Redis queues, PostgreSQL, and background workers to process
        and trigger reminders reliably. It also integrates with Telegram via webhooks for real-time delivery.
      </p>
      <p>
        The system is deployed using Docker and GitHub Actions with CI/CD for automatic production deployment.
      </p>
    `
  },

  {
    name: "MeetSight",
    shortDesc: "AI meeting assistant that converts conversations into action items",
    description:
      "MeetSight is an AI-powered Zoom meeting companion that listens to meetings in real time and converts conversations into structured summaries, action items, and follow-ups using speech-to-text and large language models.",
    demoLink: "https://github.com/Harshilmalhotra/meetsight",
    slug: "meetsight",
    role: "AI Engineer & Product Architect",
    content: `
      <p>
        MeetSight captures live meeting audio, converts it to text, and runs it through an NLP pipeline to extract tasks, decisions,
        and discussion summaries.
      </p>
      <p>
        It integrates real-time streaming, speech processing, and LLM-based understanding to turn unstructured meetings into
        structured, usable outputs for teams.
      </p>
    `
  }


];