import React from "react";

const skillGroups = [
  {
    title: "Platforms",
    className: "is-warning",
    items: ["Windows", "Linux"],
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
    title: "Backend",
    className: "is-link",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "FastAPI",
      "Flask",
      "NetSuite",
      "Kony Visualizer",
      "Chrome Extensions",
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
      "Oracle Cloud",
      "AWS (EC2/S3/Lambda)",
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
    ],
  },
  {
    title: "Testing & Design",
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
    ],
  },
];

export default function Skills() {
  return (
    <>
      <div className="skills-group">
        <p className="skills-group-heading">{skillGroups[0].title}</p>
        <div className="tags">
          {skillGroups[0].items.map((item) => (
            <span key={item} className={`tag ${skillGroups[0].className}`}>
              {item}
            </span>
          ))}{" "}
          <a href="/projects" className="tag cursor-pointer border">
            Projects
          </a>
        </div>
      </div>
      {skillGroups.slice(1).map((group) => (
        <div key={group.title} className="skills-group">
          <p className="skills-group-heading">{group.title}</p>
          <div className="tags">
            {group.items.map((item) => (
              <span key={item} className={`tag ${group.className}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
