import React from "react";
import "./NoteTakingCaseStudy.css";

const publicationMeta = [
  { label: "Author", value: "Shyam S. Suthar" },
  { label: "Published", value: "April 28, 2026" },
  { label: "Category", value: "Voice workflow case study" },
  { label: "Reading Time", value: "6 min read" },
];

const references = [
  {
    label: "Wispr Flow home: voice-to-text in every app across supported devices.",
    href: "https://wisprflow.ai/",
  },
  {
    label: "Wispr Flow features: speak, refine, personalize, collaborate, and build.",
    href: "https://wisprflow.ai/features",
  },
  {
    label: "Wispr Flow docs: what Flow is and how dictation works.",
    href: "https://docs.wisprflow.ai/articles/2772472373-what-is-flow",
  },
  {
    label: "Wispr Flow support: setup, usage, accuracy, and troubleshooting.",
    href: "https://wisprflow.ai/support",
  },
  {
    label: "Wispr Flow accessibility: hands-free writing across apps and websites.",
    href: "https://wisprflow.ai/accessibility",
  },
  {
    label: "Wispr Flow Android setup: permissions, bubble, and background behavior.",
    href: "https://docs.wisprflow.ai/articles/8858845757-setup-wispr-flow-on-android-android-settings",
  },
];

export default function WisprFlowCaseStudy() {
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
          <h1>Wispr Flow</h1>
          <p>
            A voice workflow case study on turning natural speech into polished
            text across apps, devices, languages, and writing contexts.
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
              Wispr Flow shifts writing from keyboard-first composition to a{" "}
              <mark className="note-case-mark">voice-first writing layer</mark>.
              The user speaks naturally, and the product turns the rough speech
              into clear, formatted text inside the current app or text field.
              <span className="note-case-example">
                Example: instead of typing a Slack update, a user speaks the
                thought out loud and Flow inserts a cleaner, ready-to-send
                version in Slack.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Problem</span>
              Many people think faster than they type. Standard dictation often
              breaks flow because it mishears names, keeps filler words, misses
              punctuation, or requires manual cleanup afterward.
              <span className="note-case-example">
                Example: a founder walking between meetings can capture an
                email response verbally, but the output still needs to sound
                professional before sending.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Components</span>
              The product is made from a dictation trigger, live transcription,
              AI cleanup, correction handling, personal vocabulary, style
              adaptation, device sync, app integration, language support, notes
              capture, accessibility support, and platform-specific controls.
              <span className="note-case-example">
                Example: on desktop, a hotkey starts dictation in the active
                text field; on mobile, the keyboard or app-level controls make
                voice entry available where typing normally happens.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Core Features</span>
              Wispr Flow supports dictation in apps and websites, real-time
              transcription, AI commands, filler-word cleanup, automatic
              punctuation, list formatting, corrections while speaking,
              personal dictionary behavior, whisper-style quiet dictation, and
              multi-language writing.
              <span className="note-case-example">
                Example: saying "let's meet at two, actually three" should
                produce the corrected time instead of preserving the false
                start.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Refinement Layer</span>
              The important product layer is not transcription alone. It is the
              refinement step that converts messy speech into{" "}
              <mark className="note-case-mark">usable written output</mark>.
              Flow removes pauses, handles punctuation, formats lists, and can
              respond to spoken instructions such as making text more
              professional or summarizing it.
              <span className="note-case-example">
                Example: a rambling spoken note can become a short client-ready
                update without the user opening a separate AI editor.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Personalization</span>
              Personal vocabulary matters because generic speech-to-text often
              fails on names, acronyms, product terms, code terms, and company
              language. A personal dictionary reduces repeated corrections and
              helps the system learn the user's writing context.
              <span className="note-case-example">
                Example: names like "Shyam", internal project names, product
                acronyms, or technical stack terms should not need correction
                every time they are dictated.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Cross-App Behavior</span>
              The strongest workflow promise is that voice entry follows the
              cursor. The user should not need to dictate in one app, copy text,
              switch context, and paste it elsewhere.
              <span className="note-case-example">
                Example: the same dictation habit should work in Gmail, Docs,
                Slack, Cursor, Notion, WhatsApp, or any normal text field.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Mobile and Desktop</span>
              Flow spans desktop and mobile workflows. Desktop emphasizes
              hotkey-driven writing in existing apps; mobile emphasizes the
              keyboard/app controls, quick notes, widgets, and hands-free
              capture where supported.
              <span className="note-case-example">
                Example: a user can dictate a quick idea from a phone widget,
                then continue writing longer responses from the desktop app.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Accessibility</span>
              Voice-first writing is also an accessibility workflow. It reduces
              dependency on sustained typing and can help people with pain,
              mobility constraints, vision challenges, or situations where
              hands-free writing is easier.
              <span className="note-case-example">
                Example: someone with wrist pain can compose emails, messages,
                and notes through speech without repeatedly switching tools.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Risks and Constraints</span>
              The product has to manage privacy, microphone permissions,
              background behavior, app compatibility, accent/language quality,
              quiet-space dictation, correction latency, and user trust. If
              transcription feels inconsistent, the user returns to typing.
              <span className="note-case-example">
                Example: if dictated text enters the wrong field, misses a
                private term, or needs heavy cleanup, the speed advantage
                disappears.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Product Implications</span>
              Wispr Flow's product quality depends on keeping the speech loop
              short: start dictation quickly, understand natural speech, clean
              the result, respect context, and insert text without disrupting
              the user.
              <span className="note-case-example">
                Example: the best experience is when the user forgets the tool
                is there and treats voice as a normal input method.
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
