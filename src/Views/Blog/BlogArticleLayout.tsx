import React from "react";
import "../CaseStudy/NoteTakingCaseStudy.css";

type BlogMeta = {
  label: string;
  value: string;
};

type BlogSection = {
  title: string;
  body: React.ReactNode;
};

type BlogArticleLayoutProps = {
  kicker: string;
  title: string;
  description: string;
  meta: BlogMeta[];
  sections: BlogSection[];
};

export default function BlogArticleLayout({
  kicker,
  title,
  description,
  meta,
  sections,
}: BlogArticleLayoutProps) {
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
          <p className="note-case-kicker">{kicker}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <dl className="note-case-meta">
            {meta.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <section className="note-case-content">
          <section className="note-case-narrative">
            {sections.map((section) => (
              <span className="note-case-block" key={section.title}>
                <span className="note-case-section-title">
                  {section.title}
                </span>
                {section.body}
              </span>
            ))}
          </section>
        </section>
      </section>
    </main>
  );
}
