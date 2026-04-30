const skillGroups = [
  {
    title: "Platforms",
    className: "is-warning",
    items: [
      "Windows",
      "Linux",
      "Microsoft 365",
      "Oracle Cloud",
      "AWS",
      "Azure",
    ],
  },
  {
    title: "Languages",
    className: "is-dark",
    items: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Java",
      "C# (UWP/WPF)",
      "SQL",
      "SuiteScript",
      "PHP",
    ],
  },
  {
    title: "Frontend",
    className: "is-success",
    items: [
      "ReactJS",
      "Next.js",
      "Vue.js",
      "NuxtJS",
      "TailwindCSS",
      "GraphQL",
      "WebSockets",
      "D3.js",
    ],
  },
  {
    title: "Backend & APIs",
    className: "is-link",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "FastAPI",
      "Flask",
      "REST APIs",
      "GraphQL APIs",
      "Microservices",
      "API Gateway",
      "Chrome Extensions",
    ],
  },
  {
    title: "AI & Agentic Systems",
    className: "is-ai-systems",
    items: [
      "Copilot Studio",
      "Agent Design",
      "Power Automate",
      "LLM Integration",
      "Prompt Engineering",
      "RAG Pipelines",
      "Multi-Agent Systems",
      "ReAct",
      "MCP",
      "Tool Calling",
      "AI Builder",
      "OCR Processing",
    ],
  },
  {
    title: "Enterprise & ERP",
    className: "is-enterprise",
    items: [
      "NetSuite",
      "SuiteScript",
      "Custom Connectors",
      "Microsoft 365 Integration",
      "SharePoint",
      "Salesforce Integration",
      "Oracle Integrations",
      "Kony Visualizer",
      "Workflow Automation",
      "Requirements Gathering",
    ],
  },
  {
    title: "Data, Cloud & Infra",
    className: "is-light-grey-pink",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "NoSQL",
      "Elasticsearch",
      "ETL Pipelines",
      "Database Design",
      "Data Migration",
      "AWS EC2/S3/Lambda",
      "OCI",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    title: "DevOps & Tools",
    className: "is-js-frameworks",
    items: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "GitLab",
      "GitLab CI",
      "Perforce",
      "Jenkins",
      "CI/CD",
      "JIRA",
      "Postman",
      "Git Commands",
      "Cron Jobs",
    ],
  },
  {
    title: "Testing, Design & Leadership",
    className: "is-light-orange",
    items: [
      "Jest",
      "Jasmine",
      "Karma",
      "Playwright",
      "Nightwatch",
      "Selenium",
      "REST Assured",
      "Figma",
      "Sketch",
      "System Design",
      "Technical Leadership",
      "Code Review",
      "Mentorship",
      "User Training",
    ],
  },
];

export default function Skills() {
  const renderItem = (item: string, className: string) => (
    <span key={item} className={`tag ${className}`}>
      <span>{item}</span>
    </span>
  );

  return (
    <>
      <div className="skills-group">
        <p className="skills-group-heading">{skillGroups[0].title}</p>
        <div className="tags">
          {skillGroups[0].items.map((item) =>
            renderItem(item, skillGroups[0].className)
          )}{" "}
          <span
            className="tag skills-disabled-tag"
            aria-disabled="true"
            title="Projects link disabled"
          >
            Projects
          </span>
        </div>
      </div>
      {skillGroups.slice(1).map((group) => (
        <div key={group.title} className="skills-group">
          <p className="skills-group-heading">{group.title}</p>
          <div className="tags">
            {group.items.map((item) =>
              renderItem(item, group.className)
            )}
          </div>
        </div>
      ))}
    </>
  );
}
