import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
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
const previousWorkTypes = ["Project", "Case study", "Blog"] as const;
type PreviousWorkType = (typeof previousWorkTypes)[number];

const cvOptions = [
  {
    title: "Professional CV",
    description:
      "Focused on full-time senior software engineering work, product teams, delivery ownership, and production systems.",
    href: "/ShyamSS-resume.pdf",
    status: "Full-time",
  },
  {
    title: "Personal CV",
    description:
      "A broader profile for personal projects, experiments, open-source work, prototypes, and technologies I explore outside full-time roles.",
    href: "/ShyamSS-resume.pdf",
    status: "Experiments",
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
    problemsFaced: [
      "Keeping the scope focused while still showing meaningful product value.",
      "Balancing implementation detail with a clean, readable user experience.",
      "Choosing what to simplify so the project stays maintainable.",
    ],
    routeOnly: false,
  })),
  {
    id: "production-effect",
    title: "The Production Effect",
    summary:
      "A case study on handwritten versus typed note-taking effects on college students' performance.",
    status: "Published",
    href: "/production-effect-case-study",
    type: "Case study",
    details: [
      "Compares typed capture speed with handwritten synthesis.",
      "Frames note-taking as active production rather than passive storage.",
    ],
    features: [
      "Problem, base problem, and sub-problem breakdown.",
      "Performance implications for college learning workflows.",
      "Practical hybrid note-taking recommendations.",
    ],
    problemsFaced: [
      "Balancing nuance without turning the case study into an academic paper.",
      "Explaining the production effect in practical student-facing language.",
      "Separating note-taking medium from review and retrieval habits.",
    ],
    routeOnly: true,
  },
  {
    id: "workflowy-case-study",
    title: "Workflowy",
    summary:
      "A product workflow case study on using one structured outline for notes, tasks, projects, and knowledge work.",
    status: "Published",
    href: "/workflowy-case-study",
    type: "Case study",
    details: [
      "Studies how a single outline can reduce tool switching.",
      "Frames nesting, zooming, search, and tags as workflow primitives.",
    ],
    features: [
      "Problem, base problem, and sub-problem breakdown.",
      "Practical examples for capture, retrieval, and project planning.",
      "Revenue model discussion across Basic, Pro, team, education, and nonprofit paths.",
      "References to Workflowy's official product positioning and basics.",
    ],
    problemsFaced: [
      "Explaining the product model without turning it into a feature list.",
      "Balancing simplicity with the deeper workflow implications.",
      "Showing why an outline can support both messy thinking and structured execution.",
    ],
    routeOnly: true,
  },
  {
    id: "raycast-case-study",
    title: "Raycast",
    summary:
      "A product workflow case study on Raycast as a command center for launching, searching, scripting, automating, and extending desktop workflows.",
    status: "Published",
    href: "/raycast-case-study",
    type: "Case study",
    details: [
      "Breaks Raycast into launcher, commands, extensions, shortcuts, and scripts.",
      "Explains script commands, custom inputs, aliases, and keyboard shortcuts.",
    ],
    features: [
      "Component and feature breakdown across core commands, extensions, scripts, snippets, quicklinks, AI, and window management.",
      "Examples for custom script commands and shortcut-driven automation.",
      "References to Raycast's official manual, script-command docs, and extension guidelines.",
    ],
    problemsFaced: [
      "Covering the breadth of Raycast without making the case study feel like a manual copy.",
      "Separating core product primitives from specific extension implementations.",
      "Explaining custom scripts and shortcuts in practical workflow terms.",
    ],
    routeOnly: true,
  },
  {
    id: "temp-mail-case-study",
    title: "Temp Mail Automation",
    summary:
      "A workflow case study on generating temporary inboxes, polling them over a timeout, reading messages, and automating multiple disposable addresses through APIs.",
    status: "Published",
    href: "/temp-mail-case-study",
    type: "Case study",
    details: [
      "Covers temporary mailbox creation, inbox polling, message parsing, and timeout handling.",
      "Explains how to automate two or three temporary inboxes using an API pattern.",
    ],
    features: [
      "Feature breakdown for domains, accounts, tokens, inboxes, message details, polling, webhooks, parsing, and cleanup.",
      "API requirements for creating multiple inboxes and reading incoming messages.",
      "Safety constraints for legitimate testing and privacy-preserving workflows.",
    ],
    problemsFaced: [
      "Balancing automation usefulness with anti-abuse and terms-of-service boundaries.",
      "Designing polling that is reliable without hammering provider APIs.",
      "Handling delayed delivery, duplicate messages, HTML parsing, and provider retention rules.",
    ],
    routeOnly: true,
  },
  {
    id: "wispr-flow-case-study",
    title: "Wispr Flow",
    summary:
      "A voice workflow case study on AI dictation, speech cleanup, cross-app writing, personal vocabulary, and hands-free text entry.",
    status: "Published",
    href: "/wispr-flow-case-study",
    type: "Case study",
    details: [
      "Studies how voice can become a first-class writing layer across apps and devices.",
      "Breaks down dictation, refinement, personalization, accessibility, and cross-app insertion.",
    ],
    features: [
      "Voice-first writing flow for messages, emails, notes, documents, and product work.",
      "AI cleanup for filler words, punctuation, formatting, corrections, and tone changes.",
      "Personal vocabulary support for names, acronyms, company terms, and technical language.",
      "Cross-app behavior where dictated text follows the active cursor.",
      "Accessibility value for hands-free writing and reduced dependency on sustained typing.",
      "Revenue model discussion across freemium, Pro, team, and Enterprise plans.",
    ],
    problemsFaced: [
      "Balancing speed with trust when speech recognition, cleanup, or insertion is imperfect.",
      "Handling microphone permissions, privacy expectations, app compatibility, and background behavior.",
      "Designing voice correction so users can fix mistakes without falling back to manual editing.",
    ],
    routeOnly: true,
  },
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
    problemsFaced: [
      "AI topics change quickly, so the structure had to support updates.",
      "The roadmap needed to avoid becoming a flat list of disconnected links.",
      "Balancing depth with scanability was the main content-design challenge.",
    ],
    routeOnly: false,
  },
  {
    id: "ai-landscape-blog",
    title: "AI Landscape for Practical Builders",
    summary:
      "A blog post mapping the practical AI stack across models, context, retrieval, tools, agents, evaluation, and product fit.",
    status: "Published",
    href: "/ai-landscape-blog",
    type: "Blog",
    details: [
      "Explains the AI landscape as system layers instead of disconnected tools.",
      "Covers model behavior, context design, retrieval, tool calling, agents, and evaluation.",
    ],
    features: [
      "Deep discussion of model, context, retrieval, and tool layers.",
      "Agent and evaluation sections focused on production reliability.",
      "Product-fit guidance for choosing useful AI use cases.",
    ],
    problemsFaced: [
      "Keeping the AI overview practical instead of becoming abstract theory.",
      "Covering the main AI system layers without turning the blog into a glossary.",
      "Making the article useful for builders who need implementation direction.",
    ],
    routeOnly: true,
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
    problemsFaced: [
      "The questions needed to be strict without becoming too academic.",
      "It was easy to over-expand the checklist and make it hard to finish.",
      "The structure had to work for both small ideas and larger products.",
    ],
    routeOnly: false,
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
    problemsFaced: [
      "Connecting pitch content with architecture details without losing focus.",
      "Making the idea concrete enough to evaluate before implementation.",
      "Separating useful roadmap thinking from speculative product scope.",
    ],
    routeOnly: false,
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
    problemsFaced: [
      "Keeping visual layouts polished across mobile and desktop.",
      "Presenting project imagery without making the page feel crowded.",
      "Balancing brand personality with practical portfolio navigation.",
    ],
    routeOnly: false,
  },
  {
    id: "github-site-blog",
    title: "GitHub Site Notes",
    summary:
      "A practical blog-style note on publishing, maintaining, and thinking through a personal GitHub Pages site.",
    status: "Published",
    href: "/blogs",
    type: "Blog",
    details: [
      "Documents learnings around maintaining a personal web presence.",
      "Connects publishing workflow decisions with portfolio iteration.",
    ],
    features: [
      "Personal-site publishing notes.",
      "Developer-friendly writing format.",
      "Useful context for future site maintenance.",
    ],
    problemsFaced: [
      "Keeping the notes useful without turning them into long documentation.",
      "Balancing implementation detail with reader-friendly writing.",
      "Making the content easy to revisit later.",
    ],
    routeOnly: false,
  },
  {
    id: "voice-automation-workflow-blog",
    title: "Voice, Automation, and the Next Layer of Work",
    summary:
      "A sample blog post on voice workflows, command centers, automation, and compact product thinking across the portfolio.",
    status: "Published",
    href: "/voice-automation-workflow-blog",
    type: "Blog",
    details: [
      "Connects Wispr Flow, Raycast, Workflowy, and temp mail automation into one product-thinking thread.",
      "Frames the blog direction as practical notes on workflow, AI, developer tools, and implementation choices.",
    ],
    features: [
      "Short editorial format using the same compact case-study reading style.",
      "Examples around repeated workflow friction and automation value.",
      "Clear direction for future posts without turning the page into a tutorial.",
    ],
    problemsFaced: [
      "Keeping the sample specific to the portfolio instead of writing a generic productivity article.",
      "Making the post concise while still showing the intended content direction.",
      "Reusing existing case-study styling so the sample feels native to the site.",
    ],
    routeOnly: true,
  },
  {
    id: "ai-roadmap-blog",
    title: "AI Roadmap for Software Engineers",
    summary:
      "A blog post outlining a practical learning path from model basics to retrieval, tools, agents, evaluation, and portfolio projects.",
    status: "Published",
    href: "/ai-roadmap-blog",
    type: "Blog",
    details: [
      "Moves from software engineering fundamentals into AI product engineering.",
      "Sequences learning across models, prompting, retrieval, tools, agents, and operations.",
    ],
    features: [
      "Phase-by-phase roadmap for AI engineering skills.",
      "Guidance on RAG, tool calling, agent design, evaluation, and deployment.",
      "Portfolio direction for projects that show real implementation tradeoffs.",
    ],
    problemsFaced: [
      "Avoiding a vague roadmap by connecting each phase to buildable skills.",
      "Balancing learning sequence with practical production concerns.",
      "Showing how software engineers can enter AI without pretending to be researchers first.",
    ],
    routeOnly: true,
  },
  {
    id: "git-worktree-blog",
    title: "Git Worktree for Day-to-Day Engineering",
    summary:
      "A practical blog post on using git worktree for parallel branches, AI-assisted engineering, hotfixes, reviews, and clean context switching.",
    status: "Published",
    href: "/git-worktree-blog",
    type: "Blog",
    details: [
      "Explains how worktrees let one repository support multiple local working directories.",
      "Shows day-to-day usage for feature work, reviews, hotfixes, and AI experiments.",
    ],
    features: [
      "Command snippets for adding, listing, reviewing, and removing worktrees.",
      "AI engineering workflow guidance for isolated agent experiments.",
      "Practical rules for naming, cleanup, branch isolation, and avoiding mistakes.",
    ],
    problemsFaced: [
      "Explaining worktrees simply without making the post feel like raw Git documentation.",
      "Balancing practical snippets with workflow guidance for daily engineering.",
      "Showing how AI engineers can use worktrees without creating branch confusion.",
    ],
    routeOnly: true,
  },
  {
    id: "human-3-creator-revolution-blog",
    title: "Human 3.0 and the Creator Revolution",
    summary:
      "A response blog on Daniel Miessler's Human 3.0 idea, AI-enabled creators, agency, builder leverage, and the shift from permission to output.",
    status: "Published",
    href: "/human-3-creator-revolution-blog",
    type: "Blog",
    details: [
      "Frames Human 3.0 as a move from job-centered identity to creator-centered agency.",
      "Connects activation, enablement, AI tooling, shipping, feedback loops, and creator leverage.",
    ],
    features: [
      "Perspective on Human 1.0, Human 2.0, and Human 3.0.",
      "Practical creator stack for problem discovery, AI-assisted execution, publishing, feedback, and systems.",
      "Sections for engineers, creators, risks, roadmap, and practical takeaway.",
    ],
    problemsFaced: [
      "Responding to the source concept without copying the original article.",
      "Keeping the post practical for builders rather than purely philosophical.",
      "Balancing creator optimism with risks around low-quality automation and weak originality.",
    ],
    routeOnly: true,
  },
  {
    id: "agile-development-blog",
    title: "Agile Development Notes",
    summary:
      "A concise blog-style reference for agile development concepts, team rituals, and delivery vocabulary.",
    status: "Published",
    href: "/blogs",
    type: "Blog",
    details: [
      "Captures glossary-style thinking around agile delivery practices.",
      "Useful for quickly revisiting terminology and workflow concepts.",
    ],
    features: [
      "Short-form agile reference notes.",
      "Simple structure for repeated reading.",
      "Reusable content for onboarding and interview preparation.",
    ],
    problemsFaced: [
      "Avoiding generic definitions that do not help in real project work.",
      "Keeping the writing compact while still being useful.",
      "Selecting concepts that are worth revisiting.",
    ],
    routeOnly: false,
  },
];

function Home() {
  const navigate = useNavigate();
  const [openBlogs, setOpenBlogs] = React.useState(false);
  const [openCaseStudies, setOpenCaseStudies] = React.useState(false);
  const [openGlossary, setOpenGlossary] = React.useState(false);
  const [value, setValue] = React.useState("agile-development");
  const [viewForClicked, setViewForClicked] = React.useState("github-site");
  const [tosText, setTosText] = useState("");
  const [tosTextBlog, setTosTextBlog] = useState("");
  const [openCvModal, setOpenCvModal] = React.useState(false);
  const [activePreviousWorkId, setActivePreviousWorkId] = React.useState<
    string | null
  >(null);
  const [expandedPreviousWorkIds, setExpandedPreviousWorkIds] = React.useState<
    string[]
  >([]);
  const [previousWorkType, setPreviousWorkType] =
    React.useState<PreviousWorkType>("Project");
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

  const openPreviousWork = (project: (typeof previousWorkItems)[number]) => {
    if (project.routeOnly && project.href) {
      navigate(project.href);
      return;
    }

    setActivePreviousWorkId(project.id);
  };

  const activePreviousWorkIndex = activePreviousWorkId
    ? previousWorkItems.findIndex((item) => item.id === activePreviousWorkId)
    : -1;

  const activePreviousWork =
    activePreviousWorkIndex >= 0
      ? previousWorkItems[activePreviousWorkIndex]
      : null;

  const filteredPreviousWorkItems = previousWorkItems.filter(
    (item) => item.type === previousWorkType
  );

  useEffect(() => {
    setVisiblePreviousWorkCount(4);
  }, [previousWorkType]);

  const movePreviousWorkModal = React.useCallback((direction: 1 | -1) => {
    setActivePreviousWorkId((currentId) => {
      const currentIndex = currentId
        ? previousWorkItems.findIndex((item) => item.id === currentId)
        : -1;
      const nextIndex =
        currentIndex < 0
          ? 0
          : (currentIndex + direction + previousWorkItems.length) %
            previousWorkItems.length;
      return previousWorkItems[nextIndex].id;
    });
  }, []);

  useEffect(() => {
    if (!activePreviousWorkId) {
      return;
    }

    const handlePreviousWorkKeys = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        movePreviousWorkModal(1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        movePreviousWorkModal(-1);
      }
    };

    window.addEventListener("keydown", handlePreviousWorkKeys);

    return () => {
      window.removeEventListener("keydown", handlePreviousWorkKeys);
    };
  }, [activePreviousWorkId, movePreviousWorkModal]);

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
                    <h2>Projects | Case studies | Blogs</h2>
                    <p>
                      A snapshot of products, prototypes, and technical systems I
                      have shipped or explored.
                    </p>
                    <div
                      className="previous-work-filter"
                      aria-label="Filter previous work"
                    >
                      {previousWorkTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`previous-work-filter-button ${
                            previousWorkType === type
                              ? "previous-work-filter-button-active"
                              : ""
                          }`}
                          onClick={() => setPreviousWorkType(type)}
                        >
                          {type === "Case study" ? "Case studies" : `${type}s`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="project-preview-list">
                    {filteredPreviousWorkItems
                      .slice(0, visiblePreviousWorkCount)
                      .map((project) => (
                      <article
                        key={project.id}
                        className="project-preview-item"
                        role="button"
                        tabIndex={0}
                        onClick={() => openPreviousWork(project)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openPreviousWork(project);
                          }
                        }}
                      >
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
                                  onClick={(event) => event.stopPropagation()}
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
                                Features
                              </p>
                              <ul>
                                {project.features.map((feature) => (
                                  <li key={feature}>{feature}</li>
                                ))}
                              </ul>
                              <p className="project-preview-features-title project-preview-problems-title">
                                Problems faced
                              </p>
                              <ul>
                                {project.problemsFaced.map((problemFaced) => (
                                  <li key={problemFaced}>{problemFaced}</li>
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
                          onMouseDown={(event) => event.stopPropagation()}
                          onClick={(event) => {
                            event.stopPropagation();
                            togglePreviousWorkFeatures(project.id);
                          }}
                        />
                      </article>
                    ))}
                  </div>

                  {visiblePreviousWorkCount < filteredPreviousWorkItems.length ? (
                    <button
                      type="button"
                      className="portfolio-panel-action"
                      onClick={() => {
                        setVisiblePreviousWorkCount((count) =>
                          Math.min(count + 4, filteredPreviousWorkItems.length)
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

            <Modal
              open={Boolean(activePreviousWork)}
              onClose={() => setActivePreviousWorkId(null)}
              size="full"
              className="previous-work-modal"
            >
              {activePreviousWork ? (
                <>
                  <Modal.Header>
                    <Modal.Title>{activePreviousWork.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="previous-work-modal-shell">
                      <button
                        type="button"
                        className="previous-work-modal-nav previous-work-modal-nav-left"
                        aria-label="Previous project"
                        onClick={() => movePreviousWorkModal(-1)}
                      />
                      <div className="previous-work-modal-content">
                        <div className="previous-work-modal-top">
                          <div>
                            <p className="portfolio-panel-kicker">
                              {activePreviousWorkIndex + 1} /{" "}
                              {previousWorkItems.length}
                            </p>
                            <h2>{activePreviousWork.title}</h2>
                            <p>{activePreviousWork.summary}</p>
                          </div>
                          <div className="project-preview-badges previous-work-modal-badges">
                            {activePreviousWork.href &&
                            isPublicPreviousWork(activePreviousWork.status) ? (
                              <a
                                className="project-preview-status project-preview-status-link project-preview-status-public"
                                href={activePreviousWork.href}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {activePreviousWork.status}
                              </a>
                            ) : (
                              <span
                                className={`project-preview-status ${
                                  isPublicPreviousWork(activePreviousWork.status)
                                    ? "project-preview-status-public"
                                    : ""
                                }`}
                              >
                                {activePreviousWork.status}
                              </span>
                            )}
                            <span className="project-preview-kind">
                              {activePreviousWork.type}
                            </span>
                          </div>
                        </div>
                        <div className="previous-work-modal-grid">
                          <section>
                            <h3>Details</h3>
                            <ul>
                              {activePreviousWork.details.map((detail) => (
                                <li key={detail}>{detail}</li>
                              ))}
                            </ul>
                          </section>
                          <section>
                            <h3>Features</h3>
                            <ul>
                              {activePreviousWork.features.map((feature) => (
                                <li key={feature}>{feature}</li>
                              ))}
                            </ul>
                          </section>
                          <section>
                            <h3>Problems Faced</h3>
                            <ul>
                              {activePreviousWork.problemsFaced.map(
                                (problemFaced) => (
                                  <li key={problemFaced}>{problemFaced}</li>
                                )
                              )}
                            </ul>
                          </section>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="previous-work-modal-nav previous-work-modal-nav-right"
                        aria-label="Next project"
                        onClick={() => movePreviousWorkModal(1)}
                      />
                    </div>
                  </Modal.Body>
                </>
              ) : null}
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
