import React from "react";
import "./NoteTakingCaseStudy.css";

const findings = [
  {
    lead: "Typed notes capture more raw information",
    rest:
      "but they often encourage verbatim transcription instead of processing.",
  },
  {
    lead: "Handwritten notes slow students down",
    rest:
      "which can push them to summarize, prioritize, and reframe ideas in their own words.",
  },
  {
    lead: "The strongest learning effect comes from active production",
    rest: "retrieval, summarization, self-explanation, and review.",
  },
];

const publicationMeta = [
  { label: "Author", value: "Shyam S. Suthar" },
  { label: "Published", value: "April 27, 2026" },
  { label: "Category", value: "Learning research case study" },
  { label: "Reading Time", value: "4 min read" },
];

export default function NoteTakingCaseStudy() {
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
          <h1>The Production Effect</h1>
          <p>
            Handwritten versus typed note-taking effects on college students'
            performance.
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
              Note-taking is not only a{" "}
              <mark className="note-case-mark">storage activity</mark>. It is a{" "}
              <mark className="note-case-mark">learning activity</mark>. The
              more students produce, organize, and explain ideas in their own
              words, the more useful the notes become for performance.
            </span>
            <span className="note-case-block">
              <span className="note-case-section-title">Problem</span>
              <mark className="note-case-mark">
                Performance depends on useful notes
              </mark>{" "}
              not simply fast notes. College students often choose note-taking
              tools based on speed or convenience, but the real outcome depends
              on comprehension, retention, and later retrieval.
            </span>
            <span className="note-case-block">
              <span className="note-case-section-title">
                Base of the Problem
              </span>
              <mark className="note-case-mark">
                The base issue is cognitive processing
              </mark>
              . Typing can preserve lecture detail, while handwriting can force
              selection and synthesis. The production effect matters because
              learning improves when students actively produce meaning instead
              of passively recording content.
            </span>
            <span className="note-case-block">
              <span className="note-case-section-title">Sub-Problems</span>
              Students may confuse complete notes with useful notes. Fast typing
              can reduce mental filtering during lectures, while handwritten
              notes can miss details when lectures move quickly. Review habits
              often matter as much as the note-taking medium.
            </span>
            <span className="note-case-block">
              <span className="note-case-section-title">
                Practical Takeaway
              </span>
              <mark className="note-case-mark">
                The best workflow is usually hybrid
              </mark>
              : capture enough detail, then actively transform notes into
              summaries, questions, diagrams, flashcards, or teaching-style
              explanations.
            </span>
            <span className="note-case-block">
              <span className="note-case-section-title">
                Performance Implications
              </span>
              {findings.map((finding) => (
                <span className="note-case-line" key={finding.lead}>
                  <mark className="note-case-mark">{finding.lead}</mark>{" "}
                  {finding.rest}
                </span>
              ))}
            </span>
          </section>
        </section>
      </section>
    </main>
  );
}
