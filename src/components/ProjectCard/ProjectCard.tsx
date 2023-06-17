import React from 'react'
import live from '../../img/live.png';
import github from '../../img/github.png';

function ProjectCard() {
    return (
        <div style={{ display: "flex", gap: "20px" }}>
                            <div
                                className="section"
                                style={{
                                    padding: "1rem 1rem 1rem",
                                    color: "rgba(52,53,65)",
                                    maxWidth: "25rem",
                                    width: "fit-content",
                                    borderRadius: ".375rem",
                                    border: "1px solid rgb(223 223 223)",
                                    boxShadow: 'rgba(0, 0, 0, 0.1) 5px 5px 0px 0px'
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div
                                        className="project-header-title"
                                        style={{
                                            fontSize: "1.25rem",
                                            textAlign: "start",
                                            fontWeight: "500",
                                            display: "flex",
                                        }}
                                    >
                                        Interview Preparation <span className="blink_me" style={{marginLeft:'5px'}}> •</span>
                                        <div
                                            style={{
                                                fontSize: "25px",
                                                display: "flex",
                                                marginLeft: "40px",
                                            }}
                                        >
                                            <a
                                                href="https://github.com/shyamzzp/interview"
                                                target="_blank"
                                                style={{ display: "flex", alignItems: "center" }}
                                                rel="noreferrer"
                                            >
                                                <img
                                                    src={github}
                                                    width="25"
                                                    alt=""
                                                    style={{ marginRight: "5px" }}
                                                />
                                            </a>
                                            <a
                                                href="https://shyamzzp.github.io/interview/"
                                                target="_blank"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    marginLeft: "5px",
                                                }}
                                                rel="noreferrer"
                                            >
                                                <img
                                                    src={live}
                                                    width="25"
                                                    alt=""
                                                    style={{ marginRight: "5px" }}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <p
                                    className="project-header-sub-title"
                                    style={{ fontSize: ".875rem", textAlign: "start" }}
                                >
                                    • Enhance technical skills. <br />
                                    • Prepare for Coding Interviews. <br />
                                    • Structural approach to tackle challenges. <br />• Deep dive
                                    into System Design.
                                </p>

                                <div style={{ marginTop: "5px", display:'flex', gap:'5px' }}>
                                    <span
                                        className="tag is-dark tech-stack"
                                        style={{ marginTop: "5px", backgroundColor: "#3636367d" }}
                                    >
                                        ReactJS
                                    </span>
                                    <span
                                        className="tag is-dark tech-stack"
                                        style={{ marginTop: "5px", backgroundColor: "#3636367d" }}
                                    >
                                        Docusaurus
                                    </span>
                                    <span
                                        className="tag is-dark tech-stack"
                                        style={{ marginTop: "5px", backgroundColor: "#3636367d" }}
                                    >
                                        TypeScript
                                    </span>
                                </div>
                            </div>
                        </div>
    )
}
export default ProjectCard;