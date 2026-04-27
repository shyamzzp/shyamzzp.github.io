import React from "react";
import "./NoteTakingCaseStudy.css";

const publicationMeta = [
  { label: "Author", value: "Shyam S. Suthar" },
  { label: "Published", value: "April 27, 2026" },
  { label: "Category", value: "Automation workflow case study" },
  { label: "Reading Time", value: "6 min read" },
];

const references = [
  {
    label: "Mail.tm API: create temporary email accounts and receive emails through REST.",
    href: "https://docs.mail.tm/",
  },
  {
    label: "Mail.tm Accounts API: create and manage temporary accounts.",
    href: "https://docs.mail.tm/api/accounts",
  },
  {
    label: "Mail.tm Messages API: fetch, read, and manage received emails.",
    href: "https://docs.mail.tm/api/messages",
  },
  {
    label: "Mail.tm FAQ: message retention, anonymous use, and no-send limitation.",
    href: "https://mail.tm/en/faq/",
  },
  {
    label: "InboxHook: temporary inbox API with webhook delivery.",
    href: "https://www.inboxhook.dev/",
  },
  {
    label: "Catchmail: disposable email API with custom domain support.",
    href: "https://catchmail.io/",
  },
];

export default function TempMailCaseStudy() {
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
          <h1>Temp Mail Automation</h1>
          <p>
            A workflow case study for creating temporary inboxes, polling them
            over a timeout window, reading incoming messages, and automating
            multiple disposable addresses through an API.
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
              Temp mail is a{" "}
              <mark className="note-case-mark">short-lived receiving inbox</mark>
              . The useful automation pattern is simple: create an address, use
              it in a flow, check the inbox repeatedly for a bounded amount of
              time, extract the needed message, and clean up when the workflow
              is done.
              <span className="note-case-example">
                Example: a test runner creates a temporary address, submits a
                signup form, polls for a verification email for two minutes, and
                extracts the confirmation link.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Problem</span>
              Email-driven workflows are hard to test because inboxes are stateful,
              slow, and often connected to real identities. Temporary email lets
              teams test one-time flows without polluting personal or shared
              mailboxes.
              <span className="note-case-example">
                Example: QA can test password reset, newsletter opt-in, invite,
                and email verification flows without manually creating real
                mailbox accounts.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Components</span>
              A complete temp-mail workflow needs a domain provider, mailbox
              creation, account credentials or mailbox identifiers, inbox list,
              message detail endpoint, polling or webhook delivery, timeout
              logic, parsing, cleanup, logging, and rate-limit handling.
              <span className="note-case-example">
                Example: with Mail.tm, a client can fetch domains, create an
                account, request a token, fetch messages, and read individual
                message content through REST endpoints.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Feature Set</span>
              Useful temp-mail features include instant address creation,
              random address generation, custom local-part generation, domain
              selection, inbox polling, message detail reading, HTML/text body
              access, attachment awareness, delete/cleanup, token-based access,
              and optional real-time webhooks or SSE events.
              <span className="note-case-example">
                Example: a developer tool can show the newest messages first,
                mark already-read messages, open full HTML content, and expose
                one-click copy for OTP codes or confirmation URLs.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Polling Workflow</span>
              Polling should be bounded. The client starts a timer, fetches the
              inbox at a safe interval, checks whether a matching message has
              arrived, and stops when the message is found or the timeout is
              reached.
              <span className="note-case-example">
                Example: poll every five seconds for up to two minutes; stop
                early when a subject contains "Verify your email" or the sender
                matches the expected product domain.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Creating Multiple Mails</span>
              To create two or three temporary emails through an API, the
              automation needs a list of available domains, unique addresses,
              stored credentials or tokens per address, and a mailbox registry
              that tracks timeout, status, and messages for each inbox.
              <span className="note-case-example">
                Example: create `test-a@domain`, `test-b@domain`, and
                `test-c@domain`; store each token separately; poll each inbox
                independently so one delayed message does not block the others.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">API Requirements</span>
              A practical API integration needs endpoints for domains, account
              creation, token/authentication, message listing, message detail,
              and deletion. For production-grade automation, add retries,
              backoff, provider health checks, rate-limit protection, and
              provider-specific retention rules.
              <span className="note-case-example">
                Example: Mail.tm documents account creation and message
                retrieval, while webhook-first services such as InboxHook reduce
                polling by notifying your server when mail arrives.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Automation Design</span>
              The safest design is a small mailbox manager. It creates inboxes,
              stores their tokens in memory or short-lived storage, schedules
              polling jobs, extracts matching messages, then deletes or expires
              records after the workflow finishes.
              <span className="note-case-example">
                Example: an end-to-end test asks the mailbox manager for an
                address, uses it in the browser test, waits for a matching
                message, extracts the OTP, and then destroys the mailbox state.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Parsing Messages</span>
              The parser should avoid assuming that every provider returns the
              same body format. It should support subject matching, sender
              matching, plain text, HTML, links, OTP patterns, and duplicate
              message handling.
              <span className="note-case-example">
                Example: for verification emails, search for a six-digit OTP
                first, then fallback to extracting the first confirmation link
                from the HTML body.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Safety and Abuse Limits</span>
              Temp-mail automation should be limited to legitimate testing,
              privacy-preserving signups, and internal workflows. It should not
              be used to bypass platform rules, create fake accounts at scale,
              evade bans, spam, or violate a service's terms.
              <span className="note-case-example">
                Example: allow temp mail for QA verification tests, but block
                automation that repeatedly creates accounts against third-party
                services without permission.
              </span>
            </span>

            <span className="note-case-block">
              <span className="note-case-section-title">Product Implications</span>
              A good temp-mail product is less about the address and more about
              reliability: quick inbox creation, predictable delivery, clear
              timeout states, safe polling, readable messages, visible privacy
              limits, and cleanup behavior users can trust.
              <span className="note-case-example">
                Example: when no email arrives, the interface should explain
                whether the mailbox is still polling, timed out, rate-limited,
                or waiting for the sender to retry delivery.
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
