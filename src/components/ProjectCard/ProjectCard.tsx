import React from "react";
import live from "../../img/live.png";
import github from "../../img/github.png";
import "./ProjectCard.css";
import { ProjectLink } from "../../Views/Projects/projectData";

type ProjectCardProps = {
  header: string;
  status?: string;
  summary?: string;
  description: string[];
  tags: string[];
  links?: ProjectLink[];
  isActive?: boolean;
  onClick?: () => void;
};

function ProjectCard(props: ProjectCardProps) {
  const liveLink = props.links?.find((link) => link.label === "Live Demo");
  const githubLink = props.links?.find((link) => link.label === "GitHub");

  return (
    <div
      className={`project-card ${props.isActive ? "project-card-active" : ""}`}
      onClick={props.onClick}
      role={props.onClick ? "button" : undefined}
      tabIndex={props.onClick ? 0 : undefined}
      onKeyDown={(event) => {
        if (props.onClick && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          props.onClick();
        }
      }}
    >
      <div className="section project-card-section">
        <div className="project-card-header">
          <div>
            <p className="project-header-title">
              {props.header}
              <span
                className={liveLink ? "blink_me project-card-status-dot" : ""}
              >
                {liveLink ? "•" : "•"}
              </span>
            </p>
            {props.status ? (
              <p className="project-card-status-label">{props.status}</p>
            ) : null}
          </div>
          <div className="project-card-links">
            {githubLink ? (
              <a
                href={githubLink.href}
                target="_blank"
                style={{ display: "flex", alignItems: "center" }}
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                <img src={github} width="25" alt="" style={{ marginRight: "5px" }} />
              </a>
            ) : null}
            {liveLink ? (
              <a
                href={liveLink.href}
                target="_blank"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                <img src={live} width="25" alt="" style={{ marginRight: "5px" }} />
              </a>
            ) : null}
          </div>
        </div>

        {props.summary ? <p className="project-card-summary">{props.summary}</p> : null}

        <ul className="project-header-sub-title project-card-description">
          {props.description.map((item: string) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>

        <div className="project-card-tags">
          {props.tags.map((item: string) => {
            return (
              <span
                key={item}
                className="tag is-dark tech-stack"
                style={{ marginTop: "5px", backgroundColor: "#ffffffa6" }}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
