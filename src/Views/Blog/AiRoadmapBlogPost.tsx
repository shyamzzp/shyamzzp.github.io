import BlogArticleLayout from "./BlogArticleLayout";

const meta = [
  { label: "Author", value: "Shyam S. Suthar" },
  { label: "Published", value: "April 28, 2026" },
  { label: "Category", value: "Learning roadmap" },
  { label: "Reading Time", value: "8 min read" },
];

export default function AiRoadmapBlogPost() {
  return (
    <BlogArticleLayout
      kicker="Blog"
      title="AI Roadmap for Software Engineers"
      description="A practical roadmap for moving from software engineering fundamentals into AI product engineering, retrieval systems, agents, evaluation, and deployment."
      meta={meta}
      sections={[
        {
          title: "Starting Point",
          body: (
            <>
              A software engineer does not need to become a researcher before
              building useful AI systems. The starting point is understanding
              how models behave, how context changes output, how APIs are
              called, and how failure is measured.{" "}
              <mark className="note-case-mark">
                Treat AI as a system dependency with uncertainty
              </mark>
              , not as magic.
            </>
          ),
        },
        {
          title: "Phase One",
          body: (
            <>
              Learn the model basics: tokens, context windows, temperature,
              structured outputs, tool calling, embeddings, multimodal inputs,
              latency, and cost. Build small examples that summarize, extract,
              classify, rewrite, and answer questions from a controlled input.
              This phase builds intuition for what models do well and where
              they drift.
            </>
          ),
        },
        {
          title: "Phase Two",
          body: (
            <>
              Move into prompt and context design. Practice giving the model a
              role, task, constraints, examples, source material, expected
              output shape, and verification criteria. The goal is not fancy
              prompting; the goal is repeatable behavior under real inputs.
            </>
          ),
        },
        {
          title: "Phase Three",
          body: (
            <>
              Build retrieval systems. Learn document ingestion, chunking,
              embeddings, vector search, keyword search, hybrid retrieval,
              metadata filters, reranking, permissions, and citations. A useful
              AI assistant needs the right information more than it needs a
              clever prompt.
            </>
          ),
        },
        {
          title: "Phase Four",
          body: (
            <>
              Add tools and automation. Let the model call functions, query
              databases, read files, create tickets, update CRMs, draft emails,
              or run scripts. This is where product value increases, but so does
              risk. Each tool needs validation, logging, rate limits, and clear
              permission boundaries.
            </>
          ),
        },
        {
          title: "Phase Five",
          body: (
            <>
              Study agents only after the previous layers are clear. Agents
              should decompose tasks, use tools, inspect outputs, recover from
              failures, and stop when done. They need explicit goals, small
              action spaces, checkpoints, and verification. Otherwise, they
              become expensive loops with uncertain output.
            </>
          ),
        },
        {
          title: "Phase Six",
          body: (
            <>
              Learn evaluation and operations. Create golden datasets, compare
              outputs, monitor latency and cost, track user corrections, test
              regressions, and review failures.{" "}
              <mark className="note-case-mark">
                AI engineering quality depends on measurement
              </mark>
              because subjective demos do not prove production reliability.
            </>
          ),
        },
        {
          title: "Portfolio Direction",
          body: (
            <>
              The strongest portfolio projects show an end-to-end workflow:
              real user problem, data source, model choice, retrieval or tool
              use, UI, error handling, evaluation, and deployment. A smaller
              project with clear reasoning is stronger than a large demo with
              no explanation of tradeoffs.
            </>
          ),
        },
      ]}
    />
  );
}
