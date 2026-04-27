import React from "react";
import "./NoteTakingCaseStudy.css";

const publicationMeta = [
  { label: "Author", value: "Shyam S. Suthar" },
  { label: "Published", value: "April 27, 2026" },
  { label: "Category", value: "Product workflow case study" },
  { label: "Reading Time", value: "5 min read" },
];

const references = [
  {
    label: "Workflowy home page: single list, no folders, no distractions.",
    href: "https://workflowy.com/",
  },
  {
    label: "Workflowy basics: infinite document, nesting, zoom, and search.",
    href: "https://workflowy.com/basics",
  },
  {
    label: "Workflowy usage guide: notes, tasks, projects, and knowledge work.",
    href: "https://workflowy.com/help/how-people-use-workflowy",
  },
];

export default function WorkflowyCaseStudy() {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.location.href = "/";
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="note-case-page">
      <section className="note-case-shell">
        <a className="note-case-back" href="/">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 6 9 12l6 6" />
          </svg>
          Back to profile
        </a>

        <header className="note-case-header">
          <p className="note-case-kicker">Case study</p>
          <h1>Workflowy</h1>
          <p>
            A product workflow case study on how a single structured document
            can reduce tool switching while supporting notes, tasks, and
            projects.
          </p>
          <dl className="note-case-meta">
            {publicationMeta.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <section className="note-case-content">
          <section className="note-case-narrative">
            <span className="note-case-block">
              <span className="note-case-section-title">Core Idea</span>
              Workflowy keeps work inside a{" "}
              <mark className="note-case-mark">single structured outline</mark>
              . Instead of separating notes, tasks, projects, and references
              into different apps or folders, the product lets hierarchy become
              the organizing system.
              <span className="note-case-example">
                Example: a meeting note can start as one bullet, become a
                project plan through nested action items, and later become a
                reference branch without moving to another tool.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Problem</span>
              Knowledge workers often lose context because their work is split
              between documents, task managers, project boards, notes, and
              chat. <mark className="note-case-mark">The problem is not only
              storage</mark>; it is the cost of repeatedly deciding where
              something belongs.
              <span className="note-case-example">
                Example: a product idea may begin in notes, produce tasks in a
                task app, become a roadmap item in a board, and later need to be
                found again during planning.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">
                Base of the Problem
              </span>
              The base issue is{" "}
              <mark className="note-case-mark">structural friction</mark>.
              Traditional systems ask users to choose a container first: folder,
              document, task, board, database, or page. Workflowy starts with a
              bullet and lets the structure emerge through nesting, zooming, and
              search.
              <span className="note-case-example">
                Example: a user can zoom into one bullet to focus on a project,
                then zoom back out to see how it connects to broader goals.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Sub-Problems</span>
              A single-outline model must stay simple without becoming too
              shallow. It has to support capture, retrieval, focus, sharing,
              and task management while avoiding the feeling of a heavy
              productivity system.
              <span className="note-case-example">
                Example: tags and saved searches help surface related items
                without forcing the user to duplicate content across folders.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">
                Practical Takeaway
              </span>
              Workflowy works best when the user treats structure as something
              that can evolve.{" "}
              <mark className="note-case-mark">
                Capture first, organize as meaning appears
              </mark>
              . This makes the system useful for messy early thinking as well
              as polished planning.
              <span className="note-case-example">
                Example: start with raw bullets from a call, indent related
                points later, convert action items into tasks, and tag only the
                items that need cross-project retrieval.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">
                Product Implications
              </span>
              <span className="note-case-line">
                <mark className="note-case-mark">Low-friction capture</mark>{" "}
                matters because users will not maintain a system that slows
                down their thinking.
              </span>
              <span className="note-case-line">
                <mark className="note-case-mark">Zoom-based focus</mark> helps
                a large outline feel small enough to work inside.
              </span>
              <span className="note-case-line">
                <mark className="note-case-mark">Search and tags</mark> become
                the recovery layer when hierarchy alone is not enough.
              </span>
              <span className="note-case-example">
                Example: the same outline can support a personal inbox, weekly
                plan, product backlog, research notes, and team handoff without
                requiring separate products.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">References</span>
              {references.map((reference) => (
                <a
                  className="note-case-reference-link"
                  href={reference.href}
                  key={reference.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {reference.label}
                </a>
              ))}
            </span>
          </section>
        </section>
      </section>
    </main>
  );
}
