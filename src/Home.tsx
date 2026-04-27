import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Drawer } from "rsuite";

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

const previousWorkItems = [
  ...projectData.map((project) => ({
    id: project.id,
    title: project.title,
    summary: project.summary,
    status: project.status,
    type: "Project",
  })),
  {
    id: "ai-roadmap",
    title: "AI Roadmap",
    summary:
      "A structured knowledge map for AI engineering concepts, tools, agent patterns, and practical learning paths.",
    status: "Published",
    type: "Case study",
  },
  {
    id: "software-idea-checklist",
    title: "Software Idea Checklist",
    summary:
      "A decision checklist for validating product ideas across problem quality, distribution, technical risk, and launch readiness.",
    status: "Published",
    type: "Case study",
  },
  {
    id: "prep-arch-pitch",
    title: "Prep Architecture Pitch",
    summary:
      "A product pitch and architecture exploration for turning interview preparation into a focused learning workflow.",
    status: "Draft",
    type: "Case study",
  },
  {
    id: "architecture-studio",
    title: "Architecture Studio Concepts",
    summary:
      "Visual website concepts for presenting studio work, project galleries, and service positioning with responsive layouts.",
    status: "Prototype",
    type: "Project",
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
                      <a
                        href="/ShyamSS-resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open Shyam Suthar resume"
                      >
                        <img src={cv} width="34" className="mr-1" alt="" />
                      </a>
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
                        <div>
                          <div className="project-preview-title-row">
                            <h3>{project.title}</h3>
                            <span className="project-preview-kind">
                              {project.type}
                            </span>
                          </div>
                          <p>{project.summary}</p>
                        </div>
                        <span className="project-preview-status">
                          {project.status}
                        </span>
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
                      Load more projects
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
