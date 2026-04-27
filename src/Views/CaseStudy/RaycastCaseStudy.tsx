import React from "react";
import "./NoteTakingCaseStudy.css";

const publicationMeta = [
  { label: "Author", value: "Shyam S. Suthar" },
  { label: "Published", value: "April 27, 2026" },
  { label: "Category", value: "Product workflow case study" },
  { label: "Reading Time", value: "7 min read" },
];

const references = [
  {
    label: "Raycast Manual: platform overview, core concepts, and FAQs.",
    href: "https://manual.raycast.com/",
  },
  {
    label: "Raycast Core: clipboard history and built-in productivity commands.",
    href: "https://manual.raycast.com/core",
  },
  {
    label: "Raycast Script Commands: custom local workflow automation.",
    href: "https://manual.raycast.com/script-commands",
  },
  {
    label: "Raycast Blog: getting started with script commands.",
    href: "https://www.raycast.com/blog/getting-started-with-script-commands",
  },
  {
    label: "Raycast Blog: typed inputs for script commands.",
    href: "https://www.raycast.com/blog/inputs-for-script-commands",
  },
  {
    label: "Raycast Settings: shortcuts, command preferences, and extension settings.",
    href: "https://manual.raycast.com/windows/settings",
  },
  {
    label: "Raycast Window Management: window commands and custom layouts.",
    href: "https://manual.raycast.com/window-management",
  },
  {
    label: "Raycast Snippets: text expansion, placeholders, and shared snippets.",
    href: "https://manual.raycast.com/snippets",
  },
  {
    label: "Raycast Dynamic Placeholders: placeholders for snippets, quicklinks, and AI commands.",
    href: "https://manual.raycast.com/dynamic-placeholders",
  },
  {
    label: "Raycast AI Extensions: natural-language actions and extension mentions.",
    href: "https://manual.raycast.com/ai-extensions",
  },
  {
    label: "Raycast Extensions Guidelines: extension model, review process, and quality rules.",
    href: "https://manual.raycast.com/extensions",
  },
];

export default function RaycastCaseStudy() {
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
          <h1>Raycast</h1>
          <p>
            A product workflow case study on Raycast as a command center for
            launching, searching, automating, scripting, and extending daily
            computer workflows.
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
              Raycast turns the launcher into a{" "}
              <mark className="note-case-mark">keyboard-first command layer</mark>.
              Instead of opening apps, finding the right screen, and clicking
              through UI, users can search for an action and execute it directly.
              <span className="note-case-example">
                Example: opening an app, finding a file, pasting a previous
                clipboard item, resizing a window, creating a snippet, or
                running a script all start from the same command surface.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Components</span>
              The product is built from a few repeatable components: root
              search, commands, command detail views, action menus, settings,
              shortcuts, aliases, extensions, script commands, quicklinks,
              snippets, clipboard history, window management, AI commands, and
              team/shared workflows.
              <span className="note-case-example">
                Example: a GitHub extension command and a local shell script can
                both appear as searchable commands, but each can expose its own
                actions, preferences, inputs, and shortcuts.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Core Features</span>
              Raycast supports application launching, file search, calculator
              style utility commands, clipboard history, snippets, quicklinks,
              window management, calendar-style workflows, extension store
              commands, AI commands, and settings for shortcuts and aliases.
              <span className="note-case-example">
                Example: a user can assign one hotkey to Clipboard History,
                another to a window command, and aliases for frequently used
                commands so the root search stays fast.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">
                Extensions and Store
              </span>
              Extensions are Raycast's scalable feature model. They can connect
              to web services, expose commands, use Raycast UI patterns, and
              appear in the Store. Guidelines help keep extensions useful,
              grouped sensibly, maintained, and compliant with service rules.
              <span className="note-case-example">
                Example: instead of building a separate app for each service,
                Raycast can expose service-specific commands inside the same
                launcher and action-menu model.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">
                Script Commands
              </span>
              Script Commands let users add local scripts as Raycast commands.
              They are useful for personal workflows such as toggling system
              settings, triggering dev tasks, calling internal tools, or
              automating repeated steps without opening a terminal.
              <span className="note-case-example">
                Example: a shell script can create an internal release, open a
                project dashboard, restart a local service, or call a home
                automation endpoint.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">
                Custom Script Inputs
              </span>
              Raycast makes scripts feel native by reading metadata from
              comments at the top of the script. A script can define title,
              icon, package name, mode, arguments, and refresh behavior. Typed
              arguments let users provide input without editing the script code.
              <span className="note-case-example">
                Example: a `Search in Google` script can declare a text argument
                named `query`, then open a generated URL from the provided input.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">
                Custom Script Shortcuts
              </span>
              Script Commands become part of Raycast's command system, so they
              can be launched from root search, assigned aliases, added to
              favorites, and assigned shortcuts through Raycast settings. This
              makes custom automation feel like a first-class command.
              <span className="note-case-example">
                Example: a developer can create a "Restart API" script, assign a
                keyboard shortcut to it, and trigger the local workflow without
                searching or opening Terminal.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">
                Quicklinks and Shortcuts
              </span>
              Quicklinks reduce navigation by turning URLs, searches, folders,
              or repeated destinations into searchable and shortcut-driven
              commands. Settings provide a central place to assign shortcuts to
              commands, applications, quicklinks, and extensions.
              <span className="note-case-example">
                Example: a quicklink can open a project board, search a docs
                site with a query, or jump to a frequently used folder.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">
                Clipboard and Snippets
              </span>
              Clipboard History helps recover previous copied text, links,
              files, images, and colors. Snippets store reusable text and can
              expand through keywords. Dynamic placeholders make snippets,
              quicklinks, and AI commands adapt to clipboard content, date,
              time, cursor position, and other context.
              <span className="note-case-example">
                Example: a support reply can expand from a snippet, include the
                current date, and use clipboard text as part of the response.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">
                Window and Workspace Control
              </span>
              Window Management lets users move, resize, center, maximize,
              split, and restore windows from the keyboard. Custom window
              commands and layouts extend this into repeatable workspace
              arrangements.
              <span className="note-case-example">
                Example: a user can move the active window to the left half,
                center a floating reference window, or trigger a saved layout
                before starting deep work.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">AI Layer</span>
              Raycast AI adds natural-language actions, AI commands, AI chat,
              AI extensions, and reusable presets. AI Extensions can be invoked
              through mentions so a user can ask an extension to act with the
              relevant context.
              <span className="note-case-example">
                Example: a user can ask an AI extension to inspect calendar
                context, summarize selected text, or perform a service-specific
                task with a confirmation step before execution.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">
                Product Implications
              </span>
              Raycast is strongest when it keeps different workflows behind one
              mental model: search, choose command, provide input if needed, and
              execute. The complexity is hidden in extension settings, script
              metadata, shortcuts, and action menus.
              <span className="note-case-example">
                Example: built-in commands, third-party extensions, snippets,
                quicklinks, AI commands, and local scripts all feel consistent
                because they share the launcher-command-action pattern.
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
