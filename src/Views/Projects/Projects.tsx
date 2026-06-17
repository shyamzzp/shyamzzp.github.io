import React from "react";
import "./Projects.css";
import { projectData } from "./projectData";

function toProjectHandle(id: string) {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function Projects() {
  const [activeTag, setActiveTag] = React.useState("All");

  const tagCounts = projectData.reduce<Record<string, number>>((counts, project) => {
    project.tags.forEach((tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1;
    });

    return counts;
  }, {});

  const allTags = Object.entries(tagCounts).sort((left, right) => {
    if (right[1] !== left[1]) {
      return right[1] - left[1];
    }

    return left[0].localeCompare(right[0]);
  });

  const filteredProjects =
    activeTag === "All"
      ? projectData
      : projectData.filter((project) => project.tags.includes(activeTag));

  const totalFeatureCount = projectData.reduce((count, project) => {
    const sectionItems = project.sections.reduce((sum, section) => sum + section.items.length, 0);
    return count + project.description.length + sectionItems;
  }, 0);

  return (
    <div className="projects-directory-page">
      <div className="projects-directory-shell">
        <aside className="projects-directory-sidebar">
          <div className="projects-sidebar-group">
            <p className="projects-sidebar-label">About</p>
            <p className="projects-sidebar-copy">
              This projects board curates products, prototypes, and technical
              systems I have built, with every card focusing on concrete features
              instead of open issues.
            </p>
          </div>

          <div className="projects-sidebar-group">
            <p className="projects-sidebar-label">Browse by stack</p>
            <div className="projects-sidebar-chip-grid">
              <button
                type="button"
                className={`projects-sidebar-chip ${
                  activeTag === "All" ? "projects-sidebar-chip-active" : ""
                }`}
                onClick={() => setActiveTag("All")}
              >
                All x {projectData.length}
              </button>
              {allTags.map(([tag, count]) => (
                <button
                  type="button"
                  key={tag}
                  className={`projects-sidebar-chip ${
                    activeTag === tag ? "projects-sidebar-chip-active" : ""
                  }`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag} x {count}
                </button>
              ))}
            </div>
          </div>

          <a href="mailto:shyam.suthar@gmail.com" className="projects-sidebar-cta">
            Ask About A Project
          </a>

          <div className="projects-sidebar-footer">
            <span className="projects-sidebar-footer-mark">+</span>
            <span>
              <a
                href="https://github.com/shyamzzp"
                target="_blank"
                rel="noreferrer"
                className="projects-sidebar-footer-link"
              >
                More work on GitHub
              </a>
            </span>
          </div>
        </aside>

        <main className="projects-directory-results">
          {filteredProjects.map((project) => {
            const featureCount =
              project.description.length +
              project.sections.reduce((count, section) => count + section.items.length, 0);
            const primaryStack = project.tags[0] ?? "General";
            const projectLinks = project.links?.length ?? 0;

            return (
              <article key={project.id} className="projects-directory-card">
                <div className="projects-directory-card-top">
                  <div>
                    <h2 className="projects-directory-card-title">
                      {toProjectHandle(project.id)} / {project.title}
                    </h2>
                    <p className="projects-directory-card-subtitle">{project.summary}</p>
                  </div>

                  <span className="projects-directory-badge">
                    {featureCount} {featureCount === 1 ? "feature" : "features"}
                  </span>
                </div>

                <p className="projects-directory-card-copy">
                  {project.description.join(" ")}
                </p>

                <div className="projects-directory-meta">
                  <span>stack: {primaryStack}</span>
                  <span>status: {project.status}</span>
                  <span>references: {projectLinks}</span>
                </div>

                <div className="projects-directory-tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag} className="projects-directory-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="projects-directory-section-list">
                  {project.sections.map((section) => (
                    <div key={section.title} className="projects-directory-section">
                      <p className="projects-directory-section-title">{section.title}</p>
                      <ul className="projects-directory-section-items">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {project.links?.length ? (
                  <div className="projects-directory-links">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="projects-directory-link"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}

          <div className="projects-directory-summary">
            <span>{filteredProjects.length} showcased project(s)</span>
            <span>{totalFeatureCount} total mapped features</span>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Projects;
