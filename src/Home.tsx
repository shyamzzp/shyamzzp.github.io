import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Drawer } from "rsuite";

import "./App.css";
import { getBlogReadMe, getGlossaryReadMe } from "./ReadMeFiles/Glossaries";
import Blog from "./Views/Blog/Blog";
import CaseStudy from "./Views/CaseStudy/CaseStudy";
import Glossaries from "./Views/Glossaries/Glossaries";
import Projects from "./Views/Projects/Projects";
import { projectData } from "./Views/Projects/projectData";
import "./bulma.min.css";
import Skills from "./components/Skills/Skills";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import cv from "./img/cv.png";

const activeProblems = [
  {
    title: "AI learning systems",
    description:
      "Building structured AI roadmaps and knowledge bases that turn scattered research into practical learning paths.",
  },
  {
    title: "Developer productivity",
    description:
      "Exploring tools that make documentation, prep material, and implementation notes easier to browse and maintain.",
  },
  {
    title: "Offline-first product flows",
    description:
      "Thinking through resilient payment and workflow experiences for low-connectivity environments.",
  },
];

function Home() {
  const [openProjects, setModalOpenProjects] = React.useState(false);
  const [openBlogs, setOpenBlogs] = React.useState(false);
  const [openCaseStudies, setOpenCaseStudies] = React.useState(false);
  const [openGlossary, setOpenGlossary] = React.useState(false);
  const [value, setValue] = React.useState("agile-development");
  const [viewForClicked, setViewForClicked] = React.useState("github-site");
  const [tosText, setTosText] = useState("");
  const [tosTextBlog, setTosTextBlog] = useState("");

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
            <h4 className="title flex items-center !mb-2">
              Shyam Suthar{" "}
              <span className="ml-2">
                <a
                  href="/ShyamSS-resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={cv} width="40" className="mr-1" alt="" />
                </a>
              </span>
            </h4>
            <h3
              className="title title-sub"
              style={{ fontSize: "25px", marginBottom: "10px" }}
            >
              Sen. Software Engineer (9+)
            </h3>

            <SocialMedia />

            <div className="portfolio-swipe-cue" aria-hidden="true">
              <span>Swipe horizontally</span>
              <span className="portfolio-swipe-arrow">-&gt;</span>
            </div>

            <div
              className="portfolio-panel-track"
              aria-label="Portfolio overview sections"
            >
              <section className="portfolio-panel portfolio-panel-about">
                <div className="portfolio-panel-header">
                  <p className="portfolio-panel-kicker">01 / About</p>
                  <h2>Shyam Suthar</h2>
                  <p>
                    Senior software engineer building full-stack products,
                    internal tools, technical content, and systems with strong
                    frontend and backend ownership.
                  </p>
                </div>
                <Skills />
              </section>

              <section className="portfolio-panel portfolio-panel-problems">
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
                      <p>{problem.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="portfolio-panel portfolio-panel-projects">
                <div className="portfolio-panel-header">
                  <p className="portfolio-panel-kicker">03 / Previous work</p>
                  <h2>Projects I worked on before</h2>
                  <p>
                    A snapshot of products, prototypes, and technical systems I
                    have shipped or explored.
                  </p>
                </div>

                <div className="project-preview-list">
                  {projectData.slice(0, 4).map((project) => (
                    <article key={project.id} className="project-preview-item">
                      <div>
                        <h3>{project.title}</h3>
                        <p>{project.summary}</p>
                      </div>
                      <span>{project.status}</span>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  className="portfolio-panel-action"
                  onClick={() => {
                    setModalOpenProjects(true);
                  }}
                >
                  View all projects
                </button>
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
                size={"sm"}
                backdrop={"static"}
                open={openProjects}
                onClose={() => setModalOpenProjects(false)}
              >
                <Drawer.Header>
                  <Drawer.Title>Projects</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <Projects />
                </Drawer.Body>
              </Drawer>
            </>
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
