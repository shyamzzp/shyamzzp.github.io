import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Drawer, Modal } from "rsuite";

import "./App.css";
import { getBlogReadMe, getGlossaryReadMe } from "./ReadMeFiles/Glossaries";
import Blog from "./Views/Blog/Blog";
import CaseStudy from "./Views/CaseStudy/CaseStudy";
import Glossaries from "./Views/Glossaries/Glossaries";
import { projectData } from "./Views/Projects/projectData";
import "./bulma.min.css";
import Skills from "./components/Skills/Skills";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import cv from "./img/cv.png";

const activeProblems = [
  {
    title: "AI learning systems",
    problem:
      "People collect AI links, notes, and tools faster than they can turn them into a usable learning path.",
    basis:
      "The problem starts with fragmented sources, fast-moving model changes, and unclear sequencing between fundamentals, tools, and production patterns.",
    subProblems: [
      "Separating durable concepts from hype.",
      "Mapping topics into beginner, intermediate, and advanced tracks.",
      "Keeping examples current without rewriting the whole knowledge base.",
    ],
  },
  {
    title: "Developer productivity",
    problem:
      "Engineering notes, docs, and implementation context often live in too many places to be useful during real work.",
    basis:
      "The base issue is retrieval and maintenance: developers need context quickly, but most knowledge systems are optimized for storage, not action.",
    subProblems: [
      "Making docs scannable under time pressure.",
      "Connecting decisions, code examples, and follow-up tasks.",
      "Reducing repeated explanations across projects and teams.",
    ],
  },
  {
    title: "Offline-first product flows",
    problem:
      "Important workflows break when connectivity is weak, especially payments, field operations, and approval flows.",
    basis:
      "The base of the problem is trust: users need clear status, conflict handling, and recovery when the network disappears.",
    subProblems: [
      "Designing reliable pending and retry states.",
      "Reconciling local actions with server truth later.",
      "Preventing duplicate actions, fraud, and unclear user feedback.",
    ],
  },
];

const panelIds = ["about", "problems", "projects"] as const;
type PanelId = (typeof panelIds)[number];

const cvOptions = [
  {
    title: "Full-time professional CV",
    description: "For senior software engineering roles and long-term product teams.",
    href: "/ShyamSS-resume.pdf",
    status: "Available",
  },
  {
    title: "Contract CV",
    description: "For fixed-term delivery, consulting, and technical execution roles.",
    href: "/ShyamSS-resume.pdf",
    status: "Available soon",
  },
  {
    title: "Freelance CV",
    description: "For project-based web, automation, and product engineering work.",
    href: "/ShyamSS-resume.pdf",
    status: "Available soon",
  },
];

const previousWorkItems = [
  ...projectData.map((project) => ({
    id: project.id,
    title: project.title,
    summary: project.summary,
    status: project.status,
    href:
      project.links?.find((link) => /live|demo/i.test(link.label))?.href ??
      project.links?.[0]?.href,
    type: "Project",
    details: [
      `Focus: ${project.sections[0]?.title ?? "Product implementation"}.`,
      `Stack: ${project.tags.slice(0, 4).join(", ")}.`,
    ],
    features: [
      ...project.description,
      ...project.sections.flatMap((section) => section.items),
    ].slice(0, 5),
  })),
  {
    id: "ai-roadmap",
    title: "AI Roadmap",
    summary:
      "A structured knowledge map for AI engineering concepts, tools, agent patterns, and practical learning paths.",
    status: "Published",
    href: "/ai-roadmap/",
    type: "Case study",
    details: [
      "Mapped AI topics into practical learning sequences.",
      "Organized concepts, tools, and agent patterns for scanning.",
    ],
    features: [
      "Topic branches for models, agents, vector search, and AI engineering roles.",
      "Practical sequencing from fundamentals to implementation patterns.",
      "Reference-style pages that support fast scanning and revision.",
    ],
  },
  {
    id: "software-idea-checklist",
    title: "Software Idea Checklist",
    summary:
      "A decision checklist for validating product ideas across problem quality, distribution, technical risk, and launch readiness.",
    status: "Published",
    href: "/software_idea_checklist/",
    type: "Case study",
    details: [
      "Breaks idea validation into risk, market, build, and launch checks.",
      "Designed to expose weak assumptions before implementation starts.",
    ],
    features: [
      "Question-led validation checklist.",
      "Sections for market, distribution, build risk, launch, and operations.",
      "Actionable prompts for turning vague ideas into testable decisions.",
    ],
  },
  {
    id: "prep-arch-pitch",
    title: "Prep Architecture Pitch",
    summary:
      "A product pitch and architecture exploration for turning interview preparation into a focused learning workflow.",
    status: "Draft",
    href: "/prep-arch-pitch/",
    type: "Case study",
    details: [
      "Explores the product positioning and user journey for prep workflows.",
      "Connects pitch, architecture, and roadmap thinking in one artifact.",
    ],
    features: [
      "Problem framing for interview preparation workflows.",
      "Product pitch sections with roadmap and business thinking.",
      "Architecture-oriented narrative for how the product could scale.",
    ],
  },
  {
    id: "architecture-studio",
    title: "Architecture Studio Concepts",
    summary:
      "Visual website concepts for presenting studio work, project galleries, and service positioning with responsive layouts.",
    status: "Prototype",
    href: "/nm.archstudio_03/",
    type: "Project",
    details: [
      "Tests responsive presentation patterns for architecture portfolios.",
      "Includes gallery, service, and project-detail layout concepts.",
    ],
    features: [
      "Responsive gallery layouts.",
      "Studio positioning and project storytelling sections.",
      "Multiple visual directions for comparing presentation styles.",
    ],
  },
];

function Home() {
  const [openBlogs, setOpenBlogs] = React.useState(false);
  const [openCaseStudies, setOpenCaseStudies] = React.useState(false);
  const [openGlossary, setOpenGlossary] = React.useState(false);
  const [value, setValue] = React.useState("agile-development");
  const [viewForClicked, setViewForClicked] = React.useState("github-site");
  const [tosText, setTosText] = useState("");
  const [tosTextBlog, setTosTextBlog] = useState("");
  const [openCvModal, setOpenCvModal] = React.useState(false);
  const [expandedPreviousWorkIds, setExpandedPreviousWorkIds] = React.useState<
    string[]
  >([]);
  const [visiblePreviousWorkCount, setVisiblePreviousWorkCount] =
    React.useState(4);
  const panelRefs = React.useRef<Record<PanelId, HTMLElement | null>>({
    about: null,
    problems: null,
    projects: null,
  });
  const [scrollablePanels, setScrollablePanels] = React.useState<
    Record<PanelId, boolean>
  >({
    about: false,
    problems: false,
    projects: false,
  });
  const [panelAtBottom, setPanelAtBottom] = React.useState<
    Record<PanelId, boolean>
  >({
    about: false,
    problems: false,
    projects: false,
  });

  useEffect(() => {
    fetch(getGlossaryReadMe(value))
      .then((res) => res.text())
      .then((text) => setTosText(text));
  });

  useEffect(() => {
    fetch(getBlogReadMe(value))
      .then((res) => res.text())
      .then((text) => setTosTextBlog(text));
  });

  useEffect(() => {
    const updateScrollablePanels = () => {
      setScrollablePanels((current) => {
        const next = panelIds.reduce((state, panelId) => {
          const panel = panelRefs.current[panelId];
          state[panelId] = panel
            ? panel.scrollHeight > panel.clientHeight + 1
            : false;
          return state;
        }, {} as Record<PanelId, boolean>);

        if (panelIds.every((panelId) => current[panelId] === next[panelId])) {
          return current;
        }

        return next;
      });
    };

    const updatePanelBottomState = () => {
      setPanelAtBottom((current) => {
        const next = panelIds.reduce((state, panelId) => {
          const panel = panelRefs.current[panelId];
          state[panelId] = panel
            ? panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2
            : false;
          return state;
        }, {} as Record<PanelId, boolean>);

        if (panelIds.every((panelId) => current[panelId] === next[panelId])) {
          return current;
        }

        return next;
      });
    };

    updateScrollablePanels();
    updatePanelBottomState();

    const resizeObserver = new ResizeObserver(updateScrollablePanels);
    const panelElements = panelIds
      .map((panelId) => panelRefs.current[panelId])
      .filter((panel): panel is HTMLElement => Boolean(panel));

    panelElements.forEach((panel) => {
      if (panel) {
        resizeObserver.observe(panel);
        panel.addEventListener("scroll", updatePanelBottomState);
      }
    });

    window.addEventListener("resize", updateScrollablePanels);
    window.addEventListener("resize", updatePanelBottomState);

    return () => {
      resizeObserver.disconnect();
      panelElements.forEach((panel) => {
        panel.removeEventListener("scroll", updatePanelBottomState);
      });
      window.removeEventListener("resize", updateScrollablePanels);
      window.removeEventListener("resize", updatePanelBottomState);
    };
  }, []);

  const handleScrollIndicatorClick = (panelId: PanelId) => {
    const panel = panelRefs.current[panelId];
    if (!panel) {
      return;
    }

    panel.scrollTo({
      top: panelAtBottom[panelId] ? 0 : panel.scrollHeight,
      behavior: "smooth",
    });
  };

  const togglePreviousWorkFeatures = (id: string) => {
    setExpandedPreviousWorkIds((expandedIds) =>
      expandedIds.includes(id)
        ? expandedIds.filter((expandedId) => expandedId !== id)
        : [...expandedIds, id]
    );
  };

  const isPublicPreviousWork = (status: string) =>
    ["Live", "Published"].includes(status);

  const setReadMeFileContext = (data: string) => {
    setValue(data);
  };

  const exposedMethod = (data: string) => {
    setViewForClicked(data);
  };

  return (
    <div id="app">
      <section className="hero is-info is-fullheight">
        <div className="hero-body" style={{ backgroundColor: "#f7f6ee" }}>
          <div className="container">
            <div className="portfolio-swipe-cue" aria-hidden="true">
              <span>Swipe horizontally</span>
              <span className="portfolio-swipe-arrow">-&gt;</span>
            </div>

            <div
              className="portfolio-panel-track"
              aria-label="Portfolio overview sections"
            >
              <section
                className="portfolio-panel portfolio-panel-about"
              >
                <div
                  className="portfolio-panel-scroll"
                  ref={(element) => {
                    panelRefs.current.about = element;
                  }}
                >
                  <div className="portfolio-panel-header">
                    <p className="portfolio-panel-kicker">01 / About</p>
                    <div className="portfolio-profile-heading">
                      <h2>Shyam S. Suthar</h2>
                      <button
                        type="button"
                        className="portfolio-cv-button"
                        aria-label="Open Shyam Suthar resume"
                        onClick={() => setOpenCvModal(true)}
                      >
                        <img src={cv} width="34" className="mr-1" alt="" />
                      </button>
                    </div>
                    <p className="portfolio-role">Sen. Software Engineer (9+)</p>
                    <p>
                      Senior software engineer building full-stack products,
                      internal tools, technical content, and systems with strong
                      frontend and backend ownership.
                    </p>
                    <div className="portfolio-profile-links">
                      <SocialMedia />
                    </div>
                  </div>
                  <Skills />
                </div>
                {scrollablePanels.about ? (
                  <button
                    type="button"
                    className={`portfolio-scroll-hint ${
                      panelAtBottom.about ? "portfolio-scroll-hint-up" : ""
                    }`}
                    aria-label={
                      panelAtBottom.about
                        ? "Scroll about column to top"
                        : "Scroll about column down"
                    }
                    onClick={() => handleScrollIndicatorClick("about")}
                  />
                ) : null}
              </section>

              <section
                className="portfolio-panel portfolio-panel-problems"
              >
                <div
                  className="portfolio-panel-scroll"
                  ref={(element) => {
                    panelRefs.current.problems = element;
                  }}
                >
                  <div className="portfolio-panel-header">
                    <p className="portfolio-panel-kicker">02 / Current focus</p>
                    <h2>Problems I am working on</h2>
                    <p>
                      I like problems where product clarity, engineering depth,
                      and useful interfaces all matter.
                    </p>
                  </div>

                  <div className="problem-list">
                    {activeProblems.map((problem) => (
                      <article key={problem.title} className="problem-item">
                        <h3>{problem.title}</h3>
                        <div className="problem-detail">
                          <p className="problem-detail-label problem-detail-label-problem">
                            Problem
                          </p>
                          <p>{problem.problem}</p>
                        </div>
                        <div className="problem-detail">
                          <p className="problem-detail-label problem-detail-label-base">
                            Base
                          </p>
                          <p>{problem.basis}</p>
                        </div>
                        <div className="problem-detail">
                          <p className="problem-detail-label problem-detail-label-sub">
                            Sub-problems
                          </p>
                          <ul>
                            {problem.subProblems.map((subProblem) => (
                              <li key={subProblem}>{subProblem}</li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                {scrollablePanels.problems ? (
                  <button
                    type="button"
                    className={`portfolio-scroll-hint ${
                      panelAtBottom.problems ? "portfolio-scroll-hint-up" : ""
                    }`}
                    aria-label={
                      panelAtBottom.problems
                        ? "Scroll problems column to top"
                        : "Scroll problems column down"
                    }
                    onClick={() => handleScrollIndicatorClick("problems")}
                  />
                ) : null}
              </section>

              <section
                className="portfolio-panel portfolio-panel-projects"
              >
                <div
                  className="portfolio-panel-scroll"
                  ref={(element) => {
                    panelRefs.current.projects = element;
                  }}
                >
                  <div className="portfolio-panel-header">
                    <p className="portfolio-panel-kicker">03 / Previous work</p>
                    <h2>Projects | Case studies</h2>
                    <p>
                      A snapshot of products, prototypes, and technical systems I
                      have shipped or explored.
                    </p>
                  </div>

                  <div className="project-preview-list">
                    {previousWorkItems
                      .slice(0, visiblePreviousWorkCount)
                      .map((project) => (
                      <article key={project.id} className="project-preview-item">
                        <div className="project-preview-content">
                          <div className="project-preview-main-row">
                            <div className="project-preview-copy">
                              <div className="project-preview-title-row">
                                <h3>{project.title}</h3>
                              </div>
                              <p>{project.summary}</p>
                              <ul className="project-preview-detail-list">
                                {project.details.map((detail) => (
                                  <li key={detail}>{detail}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="project-preview-badges">
                              {project.href && isPublicPreviousWork(project.status) ? (
                                <a
                                  className="project-preview-status project-preview-status-link project-preview-status-public"
                                  href={project.href}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {project.status}
                                </a>
                              ) : (
                                <span
                                  className={`project-preview-status ${
                                    isPublicPreviousWork(project.status)
                                      ? "project-preview-status-public"
                                      : ""
                                  }`}
                                >
                                  {project.status}
                                </span>
                              )}
                              <span className="project-preview-kind">
                                {project.type}
                              </span>
                            </div>
                          </div>
                          {expandedPreviousWorkIds.includes(project.id) ? (
                            <div className="project-preview-features">
                              <p className="project-preview-features-title">
                                Important features
                              </p>
                              <ul>
                                {project.features.map((feature) => (
                                  <li key={feature}>{feature}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          className={`project-preview-toggle ${
                            expandedPreviousWorkIds.includes(project.id)
                              ? "project-preview-toggle-open"
                              : ""
                          }`}
                          aria-label={
                            expandedPreviousWorkIds.includes(project.id)
                              ? `Hide features for ${project.title}`
                              : `Show features for ${project.title}`
                          }
                          aria-expanded={expandedPreviousWorkIds.includes(
                            project.id
                          )}
                          onClick={() => togglePreviousWorkFeatures(project.id)}
                        />
                      </article>
                    ))}
                  </div>

                  {visiblePreviousWorkCount < previousWorkItems.length ? (
                    <button
                      type="button"
                      className="portfolio-panel-action"
                      onClick={() => {
                        setVisiblePreviousWorkCount((count) =>
                          Math.min(count + 4, previousWorkItems.length)
                        );
                      }}
                    >
                      Load more items
                    </button>
                  ) : null}
                </div>
                {scrollablePanels.projects ? (
                  <button
                    type="button"
                    className={`portfolio-scroll-hint ${
                      panelAtBottom.projects ? "portfolio-scroll-hint-up" : ""
                    }`}
                    aria-label={
                      panelAtBottom.projects
                        ? "Scroll projects column to top"
                        : "Scroll projects column down"
                    }
                    onClick={() => handleScrollIndicatorClick("projects")}
                  />
                ) : null}
              </section>
            </div>

            <div className="portfolio-swipe-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <Modal
              open={openCvModal}
              onClose={() => setOpenCvModal(false)}
              size="sm"
            >
              <Modal.Header>
                <Modal.Title>Choose CV</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="cv-option-list">
                  {cvOptions.map((option) => (
                    <a
                      key={option.title}
                      className={`cv-option-card ${
                        option.status !== "Available" ? "cv-option-card-muted" : ""
                      }`}
                      href={option.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-disabled={option.status !== "Available"}
                      onClick={(event) => {
                        if (option.status !== "Available") {
                          event.preventDefault();
                        }
                      }}
                    >
                      <div>
                        <h3>{option.title}</h3>
                        <p>{option.description}</p>
                      </div>
                      <span>{option.status}</span>
                    </a>
                  ))}
                </div>
              </Modal.Body>
            </Modal>

            {/* <BorderedSection
                text="Case Studies"
                onClick={() => {
                  setOpenCaseStudies(true);
                }}
                isBorderedRadius
              /> */}
                {/* <BorderedSection
                text="Blogs"
                onClick={() => {
                  setOpenBlogs(true);
                }}
                isBorderedRadius
              /> */}
                {/* <BorderedSection
                text="Glossary"
                onClick={() => {
                  setOpenGlossary(true);
                }}
                isBorderedRadius
              /> */}

            <>
              <Drawer
                size={"full"}
                backdrop={"static"}
                open={openBlogs}
                onClose={() => setOpenBlogs(false)}
              >
                <Drawer.Header>
                  <Drawer.Title style={{ fontSize: "20px" }}>
                    Blogs
                  </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body
                  style={{ paddingInline: "2rem", paddingBlock: "1rem" }}
                >
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: "35%",
                        paddingRight: "30px",
                        height: "85vh",
                        overflow: "scroll",
                        paddingBottom: "20px",
                      }}
                    >
                      <Blog exposedMethod={exposedMethod} />
                    </div>
                    <div
                      style={{
                        width: "65%",
                        height: "85vh",
                        overflow: "scroll",
                        paddingInline: "30px",
                      }}
                    >
                      <p>{viewForClicked}</p>
                      <ReactMarkdown children={tosTextBlog} />
                    </div>
                  </div>
                </Drawer.Body>
              </Drawer>
            </>

            <>
              <Drawer
                size={"full"}
                backdrop={"static"}
                open={openCaseStudies}
                onClose={() => setOpenCaseStudies(false)}
              >
                <Drawer.Header>
                  <Drawer.Title style={{ fontSize: "20px" }}>
                    Case Studies
                  </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body
                  style={{ paddingInline: "2rem", paddingBlock: "1rem" }}
                >
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: "35%",
                        paddingRight: "30px",
                        height: "85vh",
                        overflow: "scroll",
                      }}
                    >
                      <CaseStudy />
                    </div>
                    <div
                      style={{
                        width: "65%",
                        height: "85vh",
                        overflow: "scroll",
                        paddingInline: "30px",
                      }}
                    >
                      <p>Default Value for the Bigger Section</p>
                      {/* <FlightDetails /> */}
                    </div>
                  </div>
                </Drawer.Body>
              </Drawer>
            </>

            <>
              <Drawer
                size={"full"}
                backdrop={"static"}
                open={openGlossary}
                onClose={() => setOpenGlossary(false)}
              >
                <Drawer.Header>
                  <Drawer.Title style={{ fontSize: "20px" }}>
                    Glossary
                  </Drawer.Title>
                  {/* <Drawer.Actions>
                                        <Button onClick={() => updateDBWithGlossaryData()}>Feed Data to DB</Button>
                                    </Drawer.Actions> */}
                </Drawer.Header>
                <Drawer.Body
                  style={{ paddingInline: "2rem", paddingBlock: "1rem" }}
                >
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: "35%",
                        paddingRight: "30px",
                        height: "85vh",
                        overflow: "scroll",
                      }}
                    >
                      <Glossaries setValue={setReadMeFileContext} />
                    </div>
                    <div
                      style={{
                        width: "65%",
                        height: "85vh",
                        overflow: "scroll",
                        paddingInline: "30px",
                      }}
                      className="readme-section"
                    >
                      <ReactMarkdown children={tosText} />
                    </div>
                  </div>
                </Drawer.Body>
              </Drawer>
            </>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
