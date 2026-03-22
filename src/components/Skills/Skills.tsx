import React from "react";
import { Drawer } from "rsuite";
import ProjectCarousel from "../../Views/Projects-Carousel/ProjectCarousel";

const skillGroups = [
  {
    className: "is-warning",
    items: ["Windows", "Linux"],
  },
  {
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
  const [openProjects, setModalOpenProjects] = React.useState(false);
  return (
    <>
      <div className="tags">
        {skillGroups[0].items.map((item) => (
          <span key={item} className={`tag ${skillGroups[0].className}`}>
            {item}
          </span>
        ))}{" "}
        <span
          className="tag cursor-pointer border"
          onClick={() => {
            setModalOpenProjects(true);
          }}
        >
          Projects
        </span>
      </div>
      <br />
      {skillGroups.slice(1).map((group) => (
        <div key={group.className} className="tags">
          {group.items.map((item) => (
            <span key={item} className={`tag ${group.className}`}>
              {item}
            </span>
          ))}
        </div>
      ))}
      <Drawer
        size={"full"}
        backdrop={"static"}
        open={openProjects}
        onClose={() => setModalOpenProjects(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Projects</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <ProjectCarousel />
        </Drawer.Body>
      </Drawer>
    </>
  );
}
