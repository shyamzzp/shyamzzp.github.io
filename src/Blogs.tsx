import "./App.css";

const blogLinks = [
  {
    title: "Voice, Automation, and the Next Layer of Work",
    href: "/voice-automation-workflow-blog",
    type: "Sample",
  },
  {
    title: "AI Landscape",
    href: "/ai",
    type: "HTML",
  },
  {
    title: "AI Roadmap",
    href: "/ai-roadmap",
    type: "HTML",
  },
];

function Blogs() {
  return (
    <div className="help-page">
      <div className="help-shell">
        <div className="help-header">
          <p className="help-eyebrow">Blogs</p>
          <h1 className="help-title">Published blog pages</h1>
          <p className="help-copy">
            Direct links to the long-form pages currently published on the
            site.
          </p>
        </div>
        <div className="help-grid">
          {blogLinks.map((blog) => (
            <a
              key={blog.href}
              href={blog.href}
              target="_blank"
              rel="noreferrer"
              className="help-card"
            >
              <span className="help-card-type">{blog.type}</span>
              <span className="help-card-title">{blog.title}</span>
              <span className="help-card-link">{blog.href}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
