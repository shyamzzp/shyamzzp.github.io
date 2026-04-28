import React from "react";
import "../CaseStudy/NoteTakingCaseStudy.css";

const publicationMeta = [
  { label: "Author", value: "Shyam S. Suthar" },
  { label: "Published", value: "April 28, 2026" },
  { label: "Category", value: "Product thinking" },
  { label: "Reading Time", value: "4 min read" },
];

export default function VoiceWorkflowBlogPost() {
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
          <p className="note-case-kicker">Sample blog</p>
          <h1>Voice, Automation, and the Next Layer of Work</h1>
          <p>
            A short sample post on the direction behind the portfolio: building
            tools that reduce friction, capture intent faster, and make daily
            workflows feel lighter.
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
              <span className="note-case-section-title">Why This Matters</span>
              Most productivity problems are not caused by missing software.
              They come from small moments of friction: typing the same thing
              again, switching tools, looking for context, waiting for a
              verification email, or turning a rough idea into structured work.
              The strongest products remove those moments without making the
              user manage a heavier system.
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">The Pattern</span>
              Across the case studies, the same idea keeps appearing:{" "}
              <mark className="note-case-mark">
                the best workflow tools stay close to the user's current intent
              </mark>
              . Raycast keeps commands near the keyboard. Wispr Flow keeps
              writing near speech. Workflowy keeps structure near the thought.
              Temp mail automation keeps verification near the test flow.
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">What I Look For</span>
              I like products where the first version is simple, but the system
              can grow. A voice tool can begin as dictation, then become
              correction, summarization, personal vocabulary, and cross-app
              writing. A command launcher can begin as app search, then become
              scripts, shortcuts, snippets, and custom automation.
              <span className="note-case-example">
                Example: a small shortcut that saves five seconds is not just a
                shortcut if it becomes part of a repeated daily workflow.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Product Principle</span>
              The product should be compact on the surface and capable under
              the hood. Users should not need to understand every feature before
              getting value. The interface should make the first action obvious,
              and the deeper layers should appear when the user's workflow
              actually needs them.
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Where This Is Going</span>
              This blog direction can become a place for short notes on product
              systems, AI workflows, developer tooling, automation patterns,
              case-study breakdowns, and practical engineering choices. The
              goal is not to publish generic tutorials; it is to document how
              useful software becomes sharper when product, workflow, and
              implementation are thought about together.
            </span>
          </section>
        </section>
      </section>
    </main>
  );
}
