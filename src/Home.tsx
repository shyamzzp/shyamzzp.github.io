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
import githubIcon from "./img/github.png";
import installrMockup from "./img/installr-mockup.svg";
import liveIcon from "./img/live.png";

const panelIds = ["about", "projects"] as const;

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

type Project = {
  slug: string;
  titleLead: string;
  titleRest: string;
  category: string;
  description: string[];
  terms?: string[];
  usps: string[];
  challenges: string[];
  stack: string[];
  image: string;
  addOns?: string[];
  testimonials?: Testimonial[];
  liveUrl?: string;
  githubUrl?: string;
};

const projects: Project[] = [
  {
    slug: "voxos",
    titleLead: "VOXOS",
    titleRest: "VOICE-FIRST ASSISTANT",
    category: "On-Device AI · iOS · SwiftUI",
    description: [
      "A native SwiftUI iPhone assistant built around compact, voice-first daily context. A unified command router turns speech or text into structured intent JSON, routes it to a local or cloud LLM, and shows the heard text, interpreted intent, and confirmation controls before anything changes data or contacts an integration.",
      "It bundles a daily briefing, global local search, Persona knowledge extraction, local file indexing, receipts OCR, and provider health — plus a Mac Link companion for controlling macOS — all backed by on-device SQLite, with a Gateway backend foundation for agent-style runtime expansion.",
    ],
    terms: [
      "voice-first",
      "unified command router",
      "structured intent JSON",
      "local or cloud LLM",
      "Persona knowledge",
      "Mac Link",
      "on-device SQLite",
      "daily briefing",
    ],
    usps: [
      "Voice or text → structured intent JSON, with confirm-before-act controls.",
      "Runs local GGUF / Core ML models via bundled llama.cpp, or Cerebras / OpenRouter cloud.",
      "On-device SQLite — Persona, notes, receipts, and search stay on the phone.",
      "Mac Link companion controls macOS: input, clipboard, and Spotlight search.",
    ],
    challenges: [
      "Designing a command router that returns reliable structured intent JSON across both local and cloud LLMs.",
      "Running quantized GGUF / Core ML models on-device through a bundled llama.cpp runtime within iPhone limits.",
      "A Vision OCR pipeline for receipts — orientation-normalized, tiled, INR-first total extraction into SQLite.",
    ],
    stack: [
      "Swift",
      "SwiftUI",
      "llama.cpp / GGUF",
      "Core ML",
      "SQLite",
      "Supabase",
    ],
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "ownscribe",
    titleLead: "OWNSCRIBE",
    titleRest: "LOCAL TRANSCRIPTION",
    category: "On-Device AI · Python · [fork]",
    description: [
      "A fork of paberr/ownscribe that adds live streaming transcripts, folder-grounded question suggestions, and vocabulary priming for accurate names and domain terms.",
      "Fully local meeting transcription and summarization — everything runs on-device with WhisperX and a local LLM, so no data ever leaves the machine.",
    ],
    terms: [
      "live streaming transcripts",
      "folder-grounded question suggestions",
      "vocabulary priming",
      "on-device",
      "WhisperX",
      "local LLM",
      "no data ever leaves the machine",
    ],
    usps: [
      "100% on-device — no audio or transcript ever leaves the machine.",
      "Live streaming transcripts, not batch-after-stop.",
      "Folder-grounded prompts surface the right questions mid-call.",
    ],
    challenges: [
      "Preserving transcription accuracy across chunk boundaries in the live streaming path.",
      "Fitting WhisperX plus a local LLM within on-device memory and latency budgets.",
      "Priming Whisper (initial_prompt + hotwords) so names and domain terms don't get mangled.",
    ],
    stack: ["Python", "WhisperX", "faster-whisper", "phi-4-mini"],
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=80",
    addOns: [
      "Live streaming transcription (chunked faster-whisper) instead of batch-after-stop.",
      "Folder-grounded question suggestions from attached reference docs.",
      "Vocabulary priming so names and domain terms transcribe correctly.",
    ],
    githubUrl: "https://github.com/shyamzzp/ownscribe-app",
  },
  {
    slug: "commits-metadata",
    titleLead: "COMMITS",
    titleRest: "METADATA",
    category: "AI · Data Engineering · Python",
    description: [
      "Extracts schema-validated feature metadata from GitHub commits — for a single commit, a repository, or an entire organization — through a deterministic parse, classify, and validate pipeline with optional LLM enrichment.",
      "Ships as a FastAPI service and a Hugging Face Space, so the same extraction runs both as an API and an interactive UI.",
    ],
    terms: [
      "schema-validated feature metadata",
      "deterministic",
      "LLM enrichment",
      "FastAPI",
      "Hugging Face Space",
      "organization",
    ],
    usps: [
      "Deterministic pipeline with schema-validated JSON output.",
      "Scales from one commit to an entire organization.",
      "Optional LLM enrichment on top of rule-based extraction.",
    ],
    challenges: [
      "Designing one fixed JSON schema that holds for a single commit, a repo, and a whole org.",
      "Keeping extraction deterministic while layering optional LLM enrichment on top.",
      "Working around GitHub API rate limits when scanning large organizations.",
    ],
    stack: ["Python", "FastAPI", "Gradio", "Hugging Face"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    githubUrl: "https://github.com/shyamzzp/commits-metadata",
  },
  {
    slug: "installr",
    titleLead: "INSTALLR",
    titleRest: "SCRIPTS MARKETPLACE",
    category: "Developer Tools · TypeScript",
    description: [
      "A marketplace dashboard for installer scripts — browse, publish, and run curated setup scripts from a single catalog.",
      "Catalog verification, benchmarking, and release guardrails are built into the workflow, so only vetted scripts make it in front of users.",
    ],
    terms: [
      "marketplace dashboard",
      "installer scripts",
      "catalog verification",
      "benchmarking",
      "release guardrails",
      "vetted scripts",
    ],
    usps: [
      "Single verified catalog for installer scripts.",
      "Built-in benchmarking and release guardrails.",
      "Publish and run scripts from one dashboard.",
    ],
    challenges: [
      "Verifying and benchmarking third-party installer scripts safely before listing them.",
      "Release guardrails to stop broken or unverified catalog entries from shipping.",
      "Maintaining catalog data integrity across the publish and run flows.",
    ],
    stack: ["TypeScript", "React", "Vite", "Node.js"],
    image: installrMockup,
    githubUrl: "https://github.com/shyamzzp/installr",
  },
  {
    slug: "chatgeni",
    titleLead: "CHATGENI",
    titleRest: "CHAT TO VIDEO",
    category: "CLI · Media · Go",
    description: [
      "A Go CLI that turns a chat JSON file into a WhatsApp-style portrait MP4, rendering the conversation frame by frame with profile photos, custom backgrounds, optional music, and per-message timing controls.",
      "Exports Instagram-ready video and ships with a web editor and live preview for composing chats before rendering.",
    ],
    terms: [
      "chat JSON",
      "portrait MP4",
      "frame by frame",
      "per-message timing",
      "web editor",
      "live preview",
    ],
    usps: [
      "Chat script in, Instagram-ready portrait video out.",
      "Frame-by-frame rendering with profile photos, backgrounds, and music.",
      "Web editor with live preview before export.",
    ],
    challenges: [
      "Deterministic frame-by-frame rendering synced to per-message timing.",
      "Driving ffmpeg from Go to assemble frames, audio, and timing into one MP4.",
      "Keeping the web editor preview consistent with the CLI render output.",
    ],
    stack: ["Go", "ffmpeg", "TypeScript", "React"],
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1600&q=80",
    githubUrl: "https://github.com/shyamzzp/ChatGenI",
  },
  {
    slug: "clendr",
    titleLead: "CLENDR",
    titleRest: "LOCAL CALENDAR",
    category: "Frontend · Next.js",
    description: [
      "A Fantastical-inspired calendar built as a static-export Next.js app — day, week, month, agenda, and year views, with events, reminders, recurrence, and per-calendar colors.",
      "Fully browser-local: calendars, events, reminders, settings, and UI state persist in localStorage, with JSON import/export for backup.",
    ],
    terms: [
      "Fantastical-inspired",
      "static-export Next.js",
      "reminders",
      "recurrence",
      "browser-local",
      "localStorage",
      "JSON import/export",
    ],
    usps: [
      "Five views — day, week, month, agenda, and year.",
      "Events and reminders with recurrence, priorities, and notes.",
      "100% browser-local with JSON backup import/export.",
    ],
    challenges: [
      "Modeling recurrence, reminders, and multi-view state entirely client-side.",
      "Persisting all calendar state reliably in localStorage.",
      "Producing a static artifact via next build with no backend.",
    ],
    stack: ["Next.js", "React", "TypeScript", "localStorage"],
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80",
    githubUrl: "https://github.com/shyamzzp/clendr",
  },
  {
    slug: "interview",
    titleLead: "INTERVIEW",
    titleRest: "PREP PLATFORM",
    category: "Learning · System Design · Web",
    description: [
      "An interactive interview-preparation site covering data structures, algorithms, and system design — including worked breakdowns of large-scale designs like Netflix and Uber.",
      "Published as a live static site so the material is browsable directly in the browser.",
    ],
    terms: [
      "data structures",
      "algorithms",
      "system design",
      "Netflix",
      "Uber",
      "live static site",
    ],
    usps: [
      "Data structures, algorithms, and system design in one place.",
      "Worked breakdowns of real large-scale system designs.",
      "Live, browsable, and free.",
    ],
    challenges: [
      "Structuring broad DS / algorithms / system-design content into a navigable format.",
      "Explaining large-scale designs (Netflix, Uber) at the right level of detail.",
      "Shipping it as a zero-backend static site.",
    ],
    stack: ["TypeScript", "JavaScript", "HTML", "CSS"],
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1600&q=80",
    liveUrl: "https://shyamzzp.github.io/interview/",
    githubUrl: "https://github.com/shyamzzp/interview",
  },
];

type PanelId = (typeof panelIds)[number];

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const projectName = (project: Project) =>
  `${project.titleLead} ${project.titleRest}`
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const highlightTerms = (text: string, terms?: string[]): React.ReactNode => {
  if (!terms || terms.length === 0) {
    return text;
  }
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  return text.split(pattern).map((part, index) =>
    terms.some((term) => term.toLowerCase() === part.toLowerCase()) ? (
      <span key={`${part}-${index}`} className="project-term">
        {part}
      </span>
    ) : (
      <React.Fragment key={`t-${index}`}>{part}</React.Fragment>
    )
  );
};

function Home() {
  const [openBlogs, setOpenBlogs] = React.useState(false);
  const [openCaseStudies, setOpenCaseStudies] = React.useState(false);
  const [openGlossary, setOpenGlossary] = React.useState(false);
  const [value, setValue] = React.useState("agile-development");
  const [viewForClicked, setViewForClicked] = React.useState("github-site");
  const [tosText, setTosText] = useState("");
  const [tosTextBlog, setTosTextBlog] = useState("");
  const [projectIndex, setProjectIndex] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }
    const slug = new URLSearchParams(window.location.search).get("project");
    const index = projects.findIndex((project) => project.slug === slug);
    return index >= 0 ? index : 0;
  });
  const [showCv, setShowCv] = useState(false);
  const lastShiftRef = React.useRef(0);

  const showProject = (index: number) => {
    const count = projects.length;
    setProjectIndex(((index % count) + count) % count);
  };

  // Keep ?project=<slug> in the URL so a reload sticks to the same project.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("project", projects[projectIndex].slug);
    const next = `${window.location.pathname}?${params.toString()}${
      window.location.hash
    }`;
    window.history.replaceState(null, "", next);
  }, [projectIndex]);

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

      if (typing) {
        return;
      }
      const count = projects.length;
      if (event.key === "ArrowRight") {
        setProjectIndex((i) => (i + 1) % count);
      } else if (event.key === "ArrowLeft") {
        setProjectIndex((i) => (i - 1 + count) % count);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  const panelRefs = React.useRef<Record<PanelId, HTMLElement | null>>({
    about: null,
    projects: null,
  });
  const [scrollablePanels, setScrollablePanels] = React.useState<
    Record<PanelId, boolean>
  >({
    about: false,
    projects: false,
  });
  const [panelAtBottom, setPanelAtBottom] = React.useState<
    Record<PanelId, boolean>
  >({
    about: false,
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
                      Senior AI Solution Architect | Senior Forward Deployed
                      Engineer | AI Product Visionary | Fractional CTO
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

              <section
                id="projects"
                className="portfolio-panel portfolio-panel-projects"
              >
                <div
                  className="portfolio-panel-scroll project-carousel-scroll"
                  ref={(element) => {
                    panelRefs.current.projects = element;
                  }}
                >
                  <p className="portfolio-panel-kicker project-panel-kicker">
                    02 / Projects
                  </p>
                  <div className="project-nav-status">
                    {projectIndex > 0 ? (
                      <>
                        <button
                          type="button"
                          className="project-nav-link"
                          onClick={() => showProject(projectIndex - 1)}
                        >
                          ‹ Prev: {projectName(projects[projectIndex - 1])}
                        </button>
                        <span className="project-nav-sep">|</span>
                      </>
                    ) : null}
                    <span className="project-nav-count">
                      {projectIndex + 1} of {projects.length} projects
                    </span>
                    {projectIndex < projects.length - 1 ? (
                      <>
                        <span className="project-nav-sep">|</span>
                        <button
                          type="button"
                          className="project-nav-link"
                          onClick={() => showProject(projectIndex + 1)}
                        >
                          Next: {projectName(projects[projectIndex + 1])} ›
                        </button>
                      </>
                    ) : null}
                  </div>
                  {(() => {
                    const project = projects[projectIndex];
                    return (
                      <div className="project-carousel">
                        <div className="project-card">
                          <div className="project-card-media">
                            <img
                              src={project.image}
                              alt={`${project.titleLead} ${project.titleRest}`}
                            />
                          </div>
                          <div className="project-card-body">
                            <h3 className="project-card-title">
                              <strong>{project.titleLead}</strong>{" "}
                              <span>{project.titleRest}</span>
                            </h3>
                            <p className="project-card-category">
                              {project.category}
                            </p>
                            <p className="project-card-hello">Overview</p>
                            <div className="project-card-desc">
                              {project.description.map((para, index) => (
                                <React.Fragment key={para}>
                                  {index > 0 ? <br /> : null}
                                  <p className="project-desc-para">
                                    {highlightTerms(para, project.terms)}
                                  </p>
                                </React.Fragment>
                              ))}
                            </div>

                            <p className="project-stack-label">Highlights</p>
                            <ul className="project-usp-grid">
                              {project.usps.map((point) => (
                                <li key={point} className="project-usp-block">
                                  {point}
                                </li>
                              ))}
                            </ul>

                            {project.addOns && project.addOns.length > 0 ? (
                              <>
                                <p className="project-stack-label">Add-ons</p>
                                <ul className="project-usp-grid">
                                  {project.addOns.map((item) => (
                                    <li
                                      key={item}
                                      className="project-usp-block"
                                    >
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ) : null}

                            <p className="project-stack-label">
                              Challenges solved
                            </p>
                            <ul className="project-usp-grid">
                              {project.challenges.map((item) => (
                                <li key={item} className="project-usp-block">
                                  {item}
                                </li>
                              ))}
                            </ul>

                            <p className="project-stack-label">Built with</p>
                            <p className="project-stack-list">
                              {project.stack.join(" · ")}
                            </p>

                            {project.testimonials &&
                            project.testimonials.length > 0 ? (
                              <>
                                <p className="project-stack-label">
                                  Testimonials
                                </p>
                                <div className="project-testimonials">
                                  {project.testimonials.map((t) => (
                                    <blockquote
                                      key={t.quote}
                                      className="project-testimonial"
                                    >
                                      <p className="project-testimonial-quote">
                                        {t.quote}
                                      </p>
                                      <footer className="project-testimonial-author">
                                        {t.author} · {t.role}
                                      </footer>
                                    </blockquote>
                                  ))}
                                </div>
                              </>
                            ) : null}

                            {project.liveUrl || project.githubUrl ? (
                              <div className="project-links">
                                {project.liveUrl ? (
                                  <a
                                    className="project-link"
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      src={liveIcon}
                                      alt=""
                                      aria-hidden="true"
                                    />
                                    <span>Visit site</span>
                                  </a>
                                ) : null}
                                {project.githubUrl ? (
                                  <a
                                    className="project-link"
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      src={githubIcon}
                                      alt=""
                                      aria-hidden="true"
                                    />
                                    <span>GitHub</span>
                                  </a>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="project-dots">
                    {projects.map((project, index) => (
                      <button
                        key={`${project.titleLead}-dot`}
                        type="button"
                        className={`project-dot ${
                          index === projectIndex ? "project-dot-active" : ""
                        }`}
                        aria-label={`Show project ${index + 1}`}
                        aria-current={index === projectIndex}
                        onClick={() => showProject(index)}
                      />
                    ))}
                  </div>
                </div>
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
