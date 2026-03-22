import "./App.css";
import { publishedFiles } from "./publishedFiles";

function Help() {
  return (
    <div className="help-page">
      <div className="help-shell">
        <div className="help-header">
          <p className="help-eyebrow">Help</p>
          <h1 className="help-title">Published files</h1>
          <p className="help-copy">
            Direct links to every public document and HTML page in this site.
          </p>
        </div>
        <div className="help-grid">
          {publishedFiles.map((file) => (
            <a
              key={file.href}
              href={file.href}
              target="_blank"
              rel="noreferrer"
              className="help-card"
            >
              <span className="help-card-type">{file.type}</span>
              <span className="help-card-title">{file.title}</span>
              <span className="help-card-link">{file.href}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Help;
