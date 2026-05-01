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

const references = [
  {
    label:
      "Mueller, P. A., & Oppenheimer, D. M. (2014). The Pen Is Mightier Than the Keyboard.",
    href: "https://doi.org/10.1177/0956797614524581",
  },
  {
    label:
      "MacLeod, C. M., Gopie, N., Hourihan, K. L., Neary, K. R., & Ozubko, J. D. (2010). The production effect.",
    href: "https://doi.org/10.1037/a0020270",
  },
  {
    label:
      "Kiewra, K. A. (1985). Students' note-taking behaviors and the efficacy of providing the instructor's notes.",
    href: "https://doi.org/10.1016/0361-476X(85)90034-7",
  },
];

export default function NoteTakingCaseStudy() {
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
    <main className="note-case-page note-case-page-case-study">
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
              <span className="note-case-example">
                Example: after a lecture on memory, a useful note is not just
                "retrieval practice matters"; it becomes "testing myself after
                class is part of learning, not only checking what I remember."
              </span>
            </span>
            <span className="note-case-block">
              <span className="note-case-section-title">Problem</span>
              <mark className="note-case-mark">
                Performance depends on useful notes
              </mark>{" "}
              not simply fast notes. College students often choose note-taking
              tools based on speed or convenience, but the real outcome depends
              on comprehension, retention, and later retrieval.
              <span className="note-case-example">
                Example: a student may type every sentence from a lecture and
                still struggle in the exam because the notes captured words, not
                the relationship between concepts.
              </span>
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
              <span className="note-case-example">
                Example: typing "photosynthesis converts light into energy" is
                fast; writing "plants turn light into stored food through a
                chemical process" requires selection and rephrasing.
              </span>
            </span>
            <span className="note-case-block">
              <span className="note-case-section-title">Sub-Problems</span>
              Students may confuse complete notes with useful notes. Fast typing
              can reduce mental filtering during lectures, while handwritten
              notes can miss details when lectures move quickly. Review habits
              often matter as much as the note-taking medium.
              <span className="note-case-example">
                Example: handwritten notes may be conceptually stronger but
                incomplete; typed notes may be complete but too close to a
                transcript. Both need review and transformation.
              </span>
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
              <span className="note-case-example">
                Example: after class, convert notes into three questions, one
                short summary, and one explanation you could teach to another
                student.
              </span>
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
              <span className="note-case-example">
                Example: the strongest result usually comes from using notes as
                a working tool: recall, explain, correct, and repeat.
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
