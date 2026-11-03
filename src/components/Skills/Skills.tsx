import React from "react";

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
      "AWS Bedrock AgentCore",
      "Copilot Studio",
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
      "Microsoft 365 Integration",
      "Salesforce Integration",
      "Oracle Integrations",
      "Kony Visualizer",
      "Workflow Automation",
    ],
  },
  {
    title: "Data, Cloud & Infra",
    className: "is-light-grey-pink",
    items: [
      // databases
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "NoSQL",
      "Database Design",
      "Data Migration",
      // search and vector stores
      "Elasticsearch",
      "OpenSearch",
      "pgvector",
      "Pinecone",
      "Chroma",
      "FAISS",
      // analytics and pipelines
      "Snowflake",
      "BigQuery",
      "DuckDB",
      "Parquet",
      "ETL Pipelines",
      "Airflow",
      "dbt",
      // aws
      "AWS EC2/S3/Lambda",
      "AWS Bedrock",
      "Step Functions",
      "EventBridge",
      "CloudWatch",
      "Secrets Manager",
      "IAM",
      "OCI",
      // infrastructure
      "Terraform",
      "AWS CDK",
      "CloudFormation",
      "Docker",
      "Kubernetes",
      "Helm",
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

// Tags wrap greedily, so the row count depends on the order they sit in.
// Measure the rendered widths and re-order each group with first-fit-decreasing
// bin packing, which hits the minimum number of rows for the column width.
const packRow = (container: HTMLElement) => {
  const tags = Array.from(container.children) as HTMLElement[];
  if (tags.length === 0) {
    return;
  }

  const styles = getComputedStyle(container);
  const gap = parseFloat(styles.columnGap) || 0;
  // Inside CSS multi-column, clientWidth reports the unfragmented width, so
  // measure the laid-out box instead.
  const width = container.getBoundingClientRect().width;

  tags.forEach((tag) => {
    tag.style.order = "";
  });

  const measured = tags.map((tag, index) => {
    const box = getComputedStyle(tag);
    const margins =
      (parseFloat(box.marginLeft) || 0) + (parseFloat(box.marginRight) || 0);
    return {
      index,
      width: tag.getBoundingClientRect().width + margins,
    };
  });

  const rows: { used: number; items: number[] }[] = [];
  [...measured]
    .sort((a, b) => b.width - a.width)
    .forEach((tag) => {
      const row = rows.find(
        (candidate) => candidate.used + gap + tag.width <= width
      );
      if (row) {
        row.used += gap + tag.width;
        row.items.push(tag.index);
      } else {
        rows.push({ used: tag.width, items: [tag.index] });
      }
    });

  let position = 0;
  rows.forEach((row) => {
    row.items.forEach((index) => {
      tags[index].style.order = String(position);
      position += 1;
    });
  });
};

export default function Skills() {
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) {
      return;
    }

    const repack = () => {
      grid
        .querySelectorAll<HTMLElement>(".tags")
        .forEach((container) => packRow(container));
    };

    repack();
    // Fonts land after first paint and change every tag width.
    document.fonts?.ready.then(repack).catch(() => undefined);

    const observer = new ResizeObserver(repack);
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const renderItem = (item: string, className: string) => (
    <span key={item} className={`tag ${className}`}>
      <span>{item}</span>
    </span>
  );

  return (
    <div className="skills-grid" ref={gridRef}>
      {skillGroups.map((group) => (
        <div key={group.title} className="skills-group">
          <p className="skills-group-heading">{group.title}</p>
          <div className="tags">
            {group.items.map((item) => renderItem(item, group.className))}
          </div>
        </div>
      ))}
    </div>
  );
}
