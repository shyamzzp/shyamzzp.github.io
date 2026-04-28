import BlogArticleLayout from "./BlogArticleLayout";

const meta = [
  { label: "Author", value: "Shyam S. Suthar" },
  { label: "Published", value: "April 28, 2026" },
  { label: "Category", value: "Developer workflow" },
  { label: "Reading Time", value: "7 min read" },
];

export default function GitWorktreeBlogPost() {
  return (
    <BlogArticleLayout
      kicker="Blog"
      title="Git Worktree for Day-to-Day Engineering"
      description="A practical guide to using git worktree for parallel branches, safer context switching, AI-assisted development, reviews, hotfixes, and experiments."
      meta={meta}
      sections={[
        {
          title: "Core Idea",
          body: (
            <>
              <span className="note-case-inline-code">git worktree</span> lets
              one repository have multiple working directories checked out at
              the same time. Instead of stashing work, switching branches, and
              rebuilding the same dependency state repeatedly, each task can
              live in its own folder with its own branch.
              <code className="note-case-code">{`git worktree add ../repo-feature feature/new-dashboard
git worktree add ../repo-hotfix hotfix/login-redirect`}</code>
              <mark className="note-case-mark">
                The benefit is clean parallel context
              </mark>
              : one folder for the current feature, one for a review, one for a
              hotfix, and one for an AI experiment.
            </>
          ),
        },
        {
          title: "Why It Matters",
          body: (
            <>
              Normal branch switching is fine for small changes. It becomes
              painful when a developer has unfinished UI work, a production bug,
              a review request, and an experiment happening together. Worktrees
              reduce accidental file churn because each task has a separate
              working tree. The branch is isolated, but it still shares the
              same Git object database, so it is lighter than cloning the full
              repository several times.
            </>
          ),
        },
        {
          title: "Daily Workflow",
          body: (
            <>
              A simple routine is to keep the main repository clean and create
              sibling folders for active work. Use the main folder for pulling,
              building confidence, and quick checks. Use worktree folders for
              implementation branches.
              <code className="note-case-code">{`# from the main repo
git pull origin main
git worktree add -b feature/blog-polish ../portfolio-blog-polish main

# work in the new folder
cd ../portfolio-blog-polish
npm install
npm start`}</code>
              This makes context switching explicit: changing folders means
              changing tasks.
            </>
          ),
        },
        {
          title: "AI Engineering Use",
          body: (
            <>
              For AI-assisted engineering, worktrees are especially useful
              because multiple agents or experiments can work without touching
              the same files in the same directory. One worktree can test a UI
              idea, another can refactor data handling, and another can run a
              risky spike. The human engineer can review diffs independently
              and merge only the useful branch.
              <code className="note-case-code">{`git worktree add -b ai/search-refactor ../repo-ai-search main
git worktree add -b ai/ui-copy-pass ../repo-ai-copy main
git worktree list`}</code>
              <mark className="note-case-mark">
                This is safer than asking every AI session to operate inside
                the same dirty working directory
              </mark>
              .
            </>
          ),
        },
        {
          title: "Review and Hotfix Flow",
          body: (
            <>
              Worktrees are strong for reviews and hotfixes because they avoid
              disrupting in-progress work. If a teammate asks for a review, add
              their branch into a temporary worktree. If production needs a
              patch, create a hotfix worktree from main while the feature folder
              stays untouched.
              <code className="note-case-code">{`git fetch origin
git worktree add ../repo-review origin/feature/payment-flow
git worktree add -b hotfix/prod-auth ../repo-hotfix origin/main`}</code>
              After the review or fix is done, remove the folder cleanly.
              <code className="note-case-code">{`git worktree remove ../repo-review
git worktree prune`}</code>
            </>
          ),
        },
        {
          title: "Rules That Keep It Clean",
          body: (
            <>
              Use predictable folder names, keep one branch per worktree, avoid
              editing the same files in multiple worktrees unless there is a
              clear reason, and remove stale worktrees after branches are
              merged. Before deleting anything, check the list and status.
              <code className="note-case-code">{`git worktree list
git -C ../repo-feature status --short
git worktree remove ../repo-feature`}</code>
              A good naming pattern is{" "}
              <span className="note-case-inline-code">repo-feature-name</span>,{" "}
              <span className="note-case-inline-code">repo-review-name</span>,
              and <span className="note-case-inline-code">repo-hotfix-name</span>.
            </>
          ),
        },
        {
          title: "Common Mistakes",
          body: (
            <>
              The most common mistake is forgetting which folder is active.
              Keep terminal tabs named clearly and run{" "}
              <span className="note-case-inline-code">git branch --show-current</span>
              when unsure. Another mistake is trying to check out the same
              branch in two worktrees; Git blocks this because it would create
              confusing branch state. Create a new branch for each active
              folder.
            </>
          ),
        },
        {
          title: "Practical Takeaway",
          body: (
            <>
              Use worktrees when tasks need real isolation but a full clone is
              too heavy. They are ideal for hotfixes, reviews, AI experiments,
              parallel feature branches, and keeping a clean main directory.
              For day-to-day work, the habit is simple: create a focused
              worktree, do the task, commit, push, then remove the worktree
              when it is no longer needed.
            </>
          ),
        },
      ]}
    />
  );
}
