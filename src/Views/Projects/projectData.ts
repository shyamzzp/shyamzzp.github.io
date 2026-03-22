export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectDetailSection = {
  title: string;
  items: string[];
};

export type ProjectRecord = {
  id: string;
  title: string;
  status: string;
  summary: string;
  description: string[];
  sections: ProjectDetailSection[];
  tags: string[];
  links?: ProjectLink[];
};

export const projectData: ProjectRecord[] = [
  {
    id: "interview-preparation",
    title: "Interview Preparation",
    status: "Live",
    summary:
      "A structured interview-prep product focused on coding rounds, system design, and deliberate practice.",
    description: [
      "Enhance technical skills.",
      "Prepare for coding interviews.",
      "Structural approach to tackle challenges.",
      "Deep dive into system design.",
    ],
    sections: [
      {
        title: "What It Solves",
        items: [
          "Combines coding practice and system-design preparation in a single learning flow.",
          "Turns scattered prep notes into a more repeatable, guided experience.",
        ],
      },
      {
        title: "Implementation",
        items: [
          "Built with ReactJS, Docusaurus, TypeScript, and Markdown-driven content.",
          "Optimized for publishing technical content and keeping topics easy to update.",
        ],
      },
      {
        title: "Why It Matters",
        items: [
          "Makes interview prep easier to maintain and revisit over time.",
          "Creates a cleaner format for sharing deep-dive engineering knowledge.",
        ],
      },
    ],
    tags: ["ReactJS", "Docusaurus", "TypeScript", "Markdown"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/shyamzzp/interview",
      },
      {
        label: "Live Demo",
        href: "https://shyamzzp.github.io/interview/",
      },
    ],
  },
  {
    id: "off-pay",
    title: "Off Pay",
    status: "Concept",
    summary:
      "An offline payment concept aimed at enabling transactions in low-connectivity environments.",
    description: ["An offline payment solution."],
    sections: [
      {
        title: "Problem Space",
        items: [
          "Targets payment reliability in environments with weak or intermittent internet access.",
          "Explores how to keep the payment experience usable even when the network is unavailable.",
        ],
      },
      {
        title: "Product Thinking",
        items: [
          "Requires careful tradeoffs between usability, trust, and reconciliation once connectivity returns.",
          "Would need strong fallback states, transaction visibility, and fraud-aware workflows.",
        ],
      },
    ],
    tags: ["Payments", "Offline-first", "Product Design", "Systems Thinking"],
  },
  {
    id: "docs-goto",
    title: "Docs Goto",
    status: "Prototype",
    summary:
      "A documentation-focused web app designed to make technical references easier to scan and consume.",
    description: [
      "A web app for easy read-on for documentation.",
      "Contains documentation for various technologies.",
      "Easy to read and understand.",
      "Contains code snippets for better understanding.",
    ],
    sections: [
      {
        title: "Core Idea",
        items: [
          "Improves documentation readability and navigation for developers who switch contexts often.",
          "Keeps code examples close to the explanation so learning stays practical.",
        ],
      },
      {
        title: "Value",
        items: [
          "Reduces friction while reading technical references and tutorials.",
          "Helps organize knowledge into a cleaner, more approachable format.",
        ],
      },
    ],
    tags: ["Documentation", "Developer Experience", "Code Snippets", "Web App"],
  },
  {
    id: "find-mentor",
    title: "Find Mentor",
    status: "Prototype",
    summary:
      "A mentor-discovery product that connects learners with experienced practitioners in their field.",
    description: [
      "A web app for finding mentors in your field.",
      "Access to experienced mentors.",
      "Skill development and learning opportunities.",
      "Trackable progress and feedback.",
    ],
    sections: [
      {
        title: "User Flow",
        items: [
          "Lets users discover mentors aligned with their goals and experience level.",
          "Supports an engagement model where progress and feedback can be tracked over time.",
        ],
      },
      {
        title: "Product Direction",
        items: [
          "Useful for turning informal mentoring into a more structured learning system.",
          "Could expand into session planning, async feedback, and milestone tracking.",
        ],
      },
    ],
    tags: ["TypeScript", "PocketBase", "VueJS", "REST"],
  },
  {
    id: "bike-rental-service",
    title: "Bike Rental Service",
    status: "Prototype",
    summary:
      "A rental platform for managing bike bookings, inventory, and user access flows.",
    description: [
      "A web app for bike rental service.",
      "A REST API using Node.js and Express.js.",
      "Used MongoDB for database.",
      "Used JWT for authentication.",
    ],
    sections: [
      {
        title: "Backend",
        items: [
          "Exposes a REST API using Node.js and Express.js.",
          "Uses MongoDB for persistence and JWT for authentication.",
        ],
      },
      {
        title: "Product Scope",
        items: [
          "Covers the core flow for browsing, reserving, and managing rental records.",
          "Provides a useful base for adding pricing logic, availability windows, and admin tools.",
        ],
      },
    ],
    tags: ["NodeJS", "ExpressJS", "MongoDB", "JWT"],
  },
];
