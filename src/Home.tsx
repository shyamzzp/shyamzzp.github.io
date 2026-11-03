import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Drawer } from "rsuite";

import "./App.css";
import { getBlogReadMe, getGlossaryReadMe } from "./ReadMeFiles/Glossaries";
import Blog from "./Views/Blog/Blog";
import CaseStudy from "./Views/CaseStudy/CaseStudy";
import Glossaries from "./Views/Glossaries/Glossaries";
import "./bulma.min.css";
import Skills from "./components/Skills/Skills";
import SocialMedia from "./components/SocialMedia/SocialMedia";

const panelIds = ["about"] as const;

type PanelId = (typeof panelIds)[number];

function Home() {
  const [openBlogs, setOpenBlogs] = React.useState(false);
  const [openCaseStudies, setOpenCaseStudies] = React.useState(false);
  const [openGlossary, setOpenGlossary] = React.useState(false);
  const [value, setValue] = React.useState("agile-development");
  const [viewForClicked, setViewForClicked] = React.useState("github-site");
  const [tosText, setTosText] = useState("");
  const [tosTextBlog, setTosTextBlog] = useState("");
  const [showCv, setShowCv] = useState(false);
  const lastShiftRef = React.useRef(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (event.key === "Escape") {
        setShowCv(false);
        return;
      }

      // Double-tap Shift opens the CV viewer
      if (event.key === "Shift" && !event.repeat && !typing) {
        const now = event.timeStamp;
        if (now - lastShiftRef.current < 400) {
          setShowCv((open) => !open);
          lastShiftRef.current = 0;
        } else {
          lastShiftRef.current = now;
        }
        return;
      }
      if (event.key !== "Shift") {
        lastShiftRef.current = 0;
      }

    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  const panelRefs = React.useRef<Record<PanelId, HTMLElement | null>>({
    about: null,
  });
  const [scrollablePanels, setScrollablePanels] = React.useState<
    Record<PanelId, boolean>
  >({
    about: false,
  });
  const [panelAtBottom, setPanelAtBottom] = React.useState<
    Record<PanelId, boolean>
  >({
    about: false,
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
            <div
              className="portfolio-panel-track"
              aria-label="Portfolio overview sections"
            >
              <section
                id="about"
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
                      <h2
                        className="portfolio-name"
                        onDoubleClick={() => setShowCv(true)}
                        title="Double-click to view resume"
                      >
                        Shyam S. Suthar
                      </h2>
                    </div>
                    <p className="portfolio-role">
                      Senior AI Solution Architect
                    </p>
                    <p>
                      Senior AI Solution Architect with 9+ years leading the
                      design and delivery of enterprise software. I architect
                      scalable, cloud-native platforms, automate delivery
                      through CI/CD, and lead cross-functional teams across
                      Retail, Manufacturing, and Automotive.
                    </p>
                    <br />
                    <p>
                      I design and ship agentic AI solutions — multi-agent
                      systems, RAG pipelines, and tool-calling workflows — and
                      own ERP customization end to end, from architecture to
                      production.
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
            </div>

            {showCv ? (
              <div
                className="cv-overlay"
                role="dialog"
                aria-modal="true"
                aria-label="Resume preview"
                onClick={() => setShowCv(false)}
              >
                <div
                  className="cv-modal"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="cv-modal-bar">
                    <span className="cv-modal-title">Resume</span>
                    <div className="cv-modal-actions">
                      <a
                        className="cv-modal-link"
                        href="/ShyamSS-resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open in new tab
                      </a>
                      <button
                        type="button"
                        className="cv-modal-close"
                        aria-label="Close resume preview"
                        onClick={() => setShowCv(false)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <iframe
                    className="cv-modal-frame"
                    src="/ShyamSS-resume.pdf#view=FitH&navpanes=0&toolbar=0&pagemode=none"
                    title="Shyam Suthar resume"
                  />
                </div>
              </div>
            ) : null}

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
