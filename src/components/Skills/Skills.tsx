import React from "react";

const skillIcons: Record<string, { iconUrl: string; alt: string }> = {
  Windows: {
    iconUrl: "https://skillicons.dev/icons?i=windows",
    alt: "Windows icon",
  },
  Linux: {
    iconUrl: "https://cdn.simpleicons.org/linux/FCC624",
    alt: "Linux icon",
  },
  TypeScript: {
    iconUrl: "https://cdn.simpleicons.org/typescript/3178C6",
    alt: "TypeScript icon",
  },
  JavaScript: {
    iconUrl: "https://cdn.simpleicons.org/javascript/F7DF1E",
    alt: "JavaScript icon",
  },
  Python: {
    iconUrl: "https://cdn.simpleicons.org/python/3776AB",
    alt: "Python icon",
  },
  Java: {
    iconUrl: "https://cdn.simpleicons.org/openjdk/EA2D2E",
    alt: "Java icon",
  },
  "C# (UWP/WPF)": {
    iconUrl: "https://skillicons.dev/icons?i=cs",
    alt: "C sharp icon",
  },
  SQL: {
    iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1",
    alt: "SQL database icon",
  },
  SuiteScript: {
    iconUrl: "https://skillicons.dev/icons?i=oracle",
    alt: "SuiteScript icon",
  },
  PHP: {
    iconUrl: "https://cdn.simpleicons.org/php/777BB4",
    alt: "PHP icon",
  },
  ReactJS: {
    iconUrl: "https://cdn.simpleicons.org/react/61DAFB",
    alt: "React icon",
  },
  "Next.js": {
    iconUrl: "https://cdn.simpleicons.org/nextdotjs/000000",
    alt: "Next.js icon",
  },
  "Vue.js": {
    iconUrl: "https://cdn.simpleicons.org/vuedotjs/4FC08D",
    alt: "Vue icon",
  },
  NuxtJS: {
    iconUrl: "https://skillicons.dev/icons?i=nuxtjs",
    alt: "Nuxt icon",
  },
  TailwindCSS: {
    iconUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    alt: "Tailwind CSS icon",
  },
  GraphQL: {
    iconUrl: "https://cdn.simpleicons.org/graphql/E10098",
    alt: "GraphQL icon",
  },
  WebSockets: {
    iconUrl: "https://cdn.simpleicons.org/socketdotio/010101",
    alt: "WebSockets icon",
  },
  "D3.js": {
    iconUrl: "https://skillicons.dev/icons?i=d3",
    alt: "D3 icon",
  },
  "Node.js": {
    iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
    alt: "Node.js icon",
  },
  "Express.js": {
    iconUrl: "https://cdn.simpleicons.org/express/000000",
    alt: "Express icon",
  },
  NestJS: {
    iconUrl: "https://cdn.simpleicons.org/nestjs/E0234E",
    alt: "NestJS icon",
  },
  FastAPI: {
    iconUrl: "https://cdn.simpleicons.org/fastapi/009688",
    alt: "FastAPI icon",
  },
  Flask: {
    iconUrl: "https://cdn.simpleicons.org/flask/000000",
    alt: "Flask icon",
  },
  NetSuite: {
    iconUrl: "https://www.google.com/s2/favicons?domain=netsuite.com&sz=64",
    alt: "NetSuite icon",
  },
  "Kony Visualizer": {
    iconUrl: "https://www.google.com/s2/favicons?domain=kony.com&sz=64",
    alt: "Kony Visualizer icon",
  },
  "Chrome Extensions": {
    iconUrl: "https://cdn.simpleicons.org/googlechrome/4285F4",
    alt: "Chrome icon",
  },
  PostgreSQL: {
    iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1",
    alt: "PostgreSQL icon",
  },
  MySQL: {
    iconUrl: "https://cdn.simpleicons.org/mysql/4479A1",
    alt: "MySQL icon",
  },
  MongoDB: {
    iconUrl: "https://cdn.simpleicons.org/mongodb/47A248",
    alt: "MongoDB icon",
  },
  Redis: {
    iconUrl: "https://cdn.simpleicons.org/redis/DC382D",
    alt: "Redis icon",
  },
  NoSQL: {
    iconUrl: "https://cdn.simpleicons.org/mongodb/47A248",
    alt: "NoSQL icon",
  },
  Elasticsearch: {
    iconUrl: "https://cdn.simpleicons.org/elasticsearch/005571",
    alt: "Elasticsearch icon",
  },
  "Oracle Cloud": {
    iconUrl: "https://www.google.com/s2/favicons?domain=oracle.com&sz=64",
    alt: "Oracle Cloud icon",
  },
  "AWS (EC2/S3/Lambda)": {
    iconUrl: "https://skillicons.dev/icons?i=aws",
    alt: "AWS icon",
  },
  Docker: {
    iconUrl: "https://cdn.simpleicons.org/docker/2496ED",
    alt: "Docker icon",
  },
  Kubernetes: {
    iconUrl: "https://cdn.simpleicons.org/kubernetes/326CE5",
    alt: "Kubernetes icon",
  },
  Git: {
    iconUrl: "https://cdn.simpleicons.org/git/F05032",
    alt: "Git icon",
  },
  GitHub: {
    iconUrl: "https://cdn.simpleicons.org/github/181717",
    alt: "GitHub icon",
  },
  "GitHub Actions": {
    iconUrl: "https://cdn.simpleicons.org/githubactions/2088FF",
    alt: "GitHub Actions icon",
  },
  GitLab: {
    iconUrl: "https://cdn.simpleicons.org/gitlab/FC6D26",
    alt: "GitLab icon",
  },
  "GitLab CI": {
    iconUrl: "https://cdn.simpleicons.org/gitlab/FC6D26",
    alt: "GitLab CI icon",
  },
  Perforce: {
    iconUrl: "https://cdn.simpleicons.org/perforce/404040",
    alt: "Perforce icon",
  },
  Jenkins: {
    iconUrl: "https://www.google.com/s2/favicons?domain=jenkins.io&sz=64",
    alt: "Jenkins icon",
  },
  "CI/CD": {
    iconUrl: "https://cdn.simpleicons.org/githubactions/2088FF",
    alt: "CI/CD icon",
  },
  JIRA: {
    iconUrl: "https://cdn.simpleicons.org/jira/0052CC",
    alt: "Jira icon",
  },
  Postman: {
    iconUrl: "https://cdn.simpleicons.org/postman/FF6C37",
    alt: "Postman icon",
  },
  Jest: {
    iconUrl: "https://cdn.simpleicons.org/jest/C21325",
    alt: "Jest icon",
  },
  Jasmine: {
    iconUrl: "https://cdn.simpleicons.org/jasmine/8A4182",
    alt: "Jasmine icon",
  },
  Karma: {
    iconUrl: "https://www.google.com/s2/favicons?domain=karma-runner.github.io&sz=64",
    alt: "Karma icon",
  },
  Playwright: {
    iconUrl: "https://www.google.com/s2/favicons?domain=playwright.dev&sz=64",
    alt: "Playwright icon",
  },
  Nightwatch: {
    iconUrl: "https://cdn.simpleicons.org/javascript/F7DF1E",
    alt: "Nightwatch icon",
  },
  Selenium: {
    iconUrl: "https://cdn.simpleicons.org/selenium/43B02A",
    alt: "Selenium icon",
  },
  "REST Assured": {
    iconUrl:
      "https://raw.githubusercontent.com/rest-assured/rest-assured/master/rest-assured-logo-green.png",
    alt: "REST Assured icon",
  },
  Figma: {
    iconUrl: "https://cdn.simpleicons.org/figma/F24E1E",
    alt: "Figma icon",
  },
  Sketch: {
    iconUrl: "https://cdn.simpleicons.org/sketch/F7B500",
    alt: "Sketch icon",
  },
};

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
  const renderItem = (groupTitle: string, item: string, className: string) => {
    const icon = skillIcons[item];

    return (
      <span key={item} className={`tag ${className}`}>
        {icon ? (
          <span className="skill-icon-image-wrap" aria-hidden="true">
            <img className="skill-icon-image" src={icon.iconUrl} alt={icon.alt} />
          </span>
        ) : null}
        <span>{item}</span>
      </span>
    );
  };

  return (
    <>
      <div className="skills-group">
        <p className="skills-group-heading">{skillGroups[0].title}</p>
        <div className="tags">
          {skillGroups[0].items.map((item) =>
            renderItem(skillGroups[0].title, item, skillGroups[0].className)
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
              renderItem(group.title, item, group.className)
            )}
          </div>
        </div>
      ))}
    </>
  );
}
