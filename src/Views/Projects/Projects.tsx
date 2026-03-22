import React from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./Projects.css";
import { projectData } from "./projectData";

function Projects() {
  const [activeProjectId, setActiveProjectId] = React.useState(projectData[0].id);
  const activeProject =
    projectData.find((project) => project.id === activeProjectId) ?? projectData[0];

  return (
    <div className="projects-page">
      <div className="projects-page-copy">
        <p className="projects-page-eyebrow">Projects</p>
        <h1 className="projects-page-title">Detailed project explanations</h1>
        <p className="projects-page-subtitle">
          Select a project from the list to inspect the problem, implementation,
          and decision-making details in the sidebar.
        </p>
      </div>

      <div className="projects-layout">
        <div className="projects-list">
          {projectData.map((project) => (
            <ProjectCard
              key={project.id}
              header={project.title}
              status={project.status}
              summary={project.summary}
              description={project.description}
              tags={project.tags}
              links={project.links}
              isActive={project.id === activeProject.id}
              onClick={() => setActiveProjectId(project.id)}
            />
          ))}
        </div>

        <aside className="project-detail-sidebar">
          <div className="project-detail-shell">
            <p className="project-detail-eyebrow">{activeProject.status}</p>
            <h2 className="project-detail-title">{activeProject.title}</h2>
            <p className="project-detail-summary">{activeProject.summary}</p>

            <div className="project-detail-links">
              {activeProject.links?.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-detail-link"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="project-detail-tags">
              {activeProject.tags.map((tag) => (
                <span key={tag} className="tag is-dark tech-stack">
                  {tag}
                </span>
              ))}
            </div>

            {activeProject.sections.map((section) => (
              <section key={section.title} className="project-detail-section">
                <h3 className="project-detail-section-title">{section.title}</h3>
                <ul className="project-detail-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
export default Projects;
