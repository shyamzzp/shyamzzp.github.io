create extension if not exists pgcrypto;

create table if not exists public.installr_categories (
  slug text primary key,
  name text not null,
  description text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.installr_catalog_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category_slug text not null references public.installr_categories(slug) on update cascade,
  category text not null,
  description text not null,
  ecosystem text not null,
  language text,
  framework text,
  package_manager text,
  platforms text[] not null default '{}',
  trust text not null default 'verified',
  source text not null,
  command text not null,
  command_steps jsonb not null default '[]'::jsonb,
  prerequisites jsonb not null default '[]'::jsonb,
  verify text not null,
  rollback text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.installr_categories enable row level security;
alter table public.installr_catalog_items enable row level security;

drop policy if exists installr_categories_public_read on public.installr_categories;
create policy installr_categories_public_read
on public.installr_categories
for select
using (true);

drop policy if exists installr_catalog_items_public_read on public.installr_catalog_items;
create policy installr_catalog_items_public_read
on public.installr_catalog_items
for select
using (true);

insert into public.installr_categories (slug, name, description, sort_order) values
  ('developer-tools', 'Developer Tools', 'Command line utilities for repo work, GitHub workflows, and fast local search.', 10),
  ('python', 'Python', 'Python runtimes, app frameworks, validation layers, and dependency managers.', 20),
  ('javascript-runtime', 'JavaScript Runtime', 'Node.js, Bun, app scaffolds, browser automation, and frontend tooling.', 30),
  ('containers', 'Containers', 'Container platform commands for local development infrastructure.', 40),
  ('databases', 'Databases', 'Database installers and managed backend tooling for local and hosted state.', 50),
  ('infrastructure', 'Infrastructure', 'Infrastructure-as-code and cloud project bootstrap commands.', 60),
  ('systems', 'Systems Languages', 'Compiled-language toolchains for backend services and CLI utilities.', 70)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.installr_catalog_items (
  slug, name, category_slug, category, description, ecosystem, language, framework, package_manager,
  platforms, trust, source, command, command_steps, prerequisites, verify, rollback, sort_order
) values
  (
    'paperclip', 'Paperclip', 'developer-tools', 'Developer Tools',
    'Bootstrap and onboard a local Paperclip workspace with defaults.',
    'AI developer tooling', 'Node.js', 'Paperclip CLI', 'npm',
    array['macOS','Linux','Windows'], 'verified', 'npmjs.com/package/paperclipai',
    'npx paperclipai onboard --yes',
    '[{"label":"Check Node.js","command":"node --version"},{"label":"Run onboarding","command":"npx paperclipai onboard --yes"}]'::jsonb,
    '["Node.js 18+ available in PATH.","Writable project directory."]'::jsonb,
    'paperclipai --version',
    'npm uninstall -g paperclipai',
    10
  ),
  (
    'github-cli', 'GitHub CLI', 'developer-tools', 'Developer Tools',
    'Install GitHub CLI for pull requests, issues, and release automation.',
    'Repository operations', 'Shell', 'GitHub CLI', 'Homebrew',
    array['macOS','Linux','Windows'], 'verified', 'cli.github.com',
    'brew install gh',
    '[{"label":"Install package","command":"brew install gh"},{"label":"Authenticate","command":"gh auth login"}]'::jsonb,
    '["Homebrew installed.","Git available for repository workflows."]'::jsonb,
    'gh --version',
    'brew uninstall gh',
    20
  ),
  (
    'ripgrep', 'ripgrep', 'developer-tools', 'Developer Tools',
    'Install ripgrep for fast code and text search in large repositories.',
    'Search tooling', 'Rust', 'ripgrep CLI', 'Homebrew',
    array['macOS','Linux','Windows'], 'verified', 'github.com/BurntSushi/ripgrep',
    'brew install ripgrep',
    '[{"label":"Install package","command":"brew install ripgrep"},{"label":"Smoke test","command":"rg --files"}]'::jsonb,
    '["Package manager available.","Terminal session with install permissions."]'::jsonb,
    'rg --version',
    'brew uninstall ripgrep',
    30
  ),
  (
    'uv', 'uv', 'python', 'Python',
    'Install uv for ultra-fast Python project and environment management.',
    'Python packaging', 'Python', 'uv', 'standalone installer',
    array['macOS','Linux','Windows'], 'verified', 'docs.astral.sh/uv',
    'curl -LsSf https://astral.sh/uv/install.sh | sh',
    '[{"label":"Install uv","command":"curl -LsSf https://astral.sh/uv/install.sh | sh"},{"label":"Refresh shell","command":"source \"$HOME/.cargo/env\" 2>/dev/null || true"}]'::jsonb,
    '["curl available.","Shell profile can update PATH."]'::jsonb,
    'uv --version',
    'rm -rf "$HOME/.local/bin/uv" "$HOME/.local/share/uv"',
    40
  ),
  (
    'poetry', 'Poetry', 'python', 'Python',
    'Install Poetry for Python dependency management and lockfiles.',
    'Python packaging', 'Python', 'Poetry', 'official installer',
    array['macOS','Linux','Windows'], 'stale', 'python-poetry.org/docs',
    'curl -sSL https://install.python-poetry.org | python3 -',
    '[{"label":"Check Python","command":"python3 --version"},{"label":"Install Poetry","command":"curl -sSL https://install.python-poetry.org | python3 -"}]'::jsonb,
    '["Python 3.9+ available.","curl available."]'::jsonb,
    'poetry --version',
    'curl -sSL https://install.python-poetry.org | python3 - --uninstall',
    50
  ),
  (
    'fastapi', 'FastAPI + Pydantic', 'python', 'Python',
    'Create a FastAPI backend with Pydantic validation and standard ASGI tooling.',
    'API framework', 'Python', 'FastAPI, Pydantic', 'pip',
    array['macOS','Linux','Windows'], 'verified', 'fastapi.tiangolo.com',
    'python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install "fastapi[standard]" pydantic',
    '[{"label":"Create virtualenv","command":"python3 -m venv .venv"},{"label":"Activate virtualenv","command":"source .venv/bin/activate"},{"label":"Upgrade pip","command":"python -m pip install --upgrade pip"},{"label":"Install API stack","command":"pip install \"fastapi[standard]\" pydantic"}]'::jsonb,
    '["Python 3.10+ available.","Writable project directory.","Shell supports virtualenv activation."]'::jsonb,
    'python -c "import fastapi, pydantic; print(fastapi.__version__, pydantic.__version__)"',
    'deactivate 2>/dev/null || true
rm -rf .venv',
    60
  ),
  (
    'bun', 'Bun', 'javascript-runtime', 'JavaScript Runtime',
    'Install Bun runtime and package manager for fast JS tooling.',
    'JavaScript runtime', 'JavaScript/TypeScript', 'Bun', 'standalone installer',
    array['macOS','Linux','Windows'], 'verified', 'bun.sh/docs/installation',
    'curl -fsSL https://bun.sh/install | bash',
    '[{"label":"Install Bun","command":"curl -fsSL https://bun.sh/install | bash"},{"label":"Load PATH","command":"source \"$HOME/.bashrc\" 2>/dev/null || source \"$HOME/.zshrc\" 2>/dev/null || true"}]'::jsonb,
    '["curl installed.","Shell profile can export BUN_INSTALL."]'::jsonb,
    'bun --version',
    'rm -rf "$HOME/.bun"',
    70
  ),
  (
    'nextjs', 'Next.js', 'javascript-runtime', 'JavaScript Runtime',
    'Scaffold a TypeScript Next.js app with the App Router and linting defaults.',
    'Frontend framework', 'TypeScript', 'Next.js, React', 'npx',
    array['macOS','Linux','Windows'], 'verified', 'nextjs.org/docs',
    'npx create-next-app@latest my-app --ts --eslint --app',
    '[{"label":"Check Node.js","command":"node --version"},{"label":"Create app","command":"npx create-next-app@latest my-app --ts --eslint --app"},{"label":"Start dev server","command":"cd my-app && npm run dev"}]'::jsonb,
    '["Node.js 18.18+ available.","npm or compatible package runner available."]'::jsonb,
    'cd my-app && npm run build',
    'rm -rf my-app',
    80
  ),
  (
    'playwright', 'Playwright', 'javascript-runtime', 'JavaScript Runtime',
    'Install browser automation and end-to-end testing dependencies.',
    'Testing', 'JavaScript/TypeScript', 'Playwright', 'npm/npx',
    array['macOS','Linux','Windows'], 'verified', 'playwright.dev',
    'npm init playwright@latest
npx playwright install --with-deps',
    '[{"label":"Initialize tests","command":"npm init playwright@latest"},{"label":"Install browsers","command":"npx playwright install --with-deps"}]'::jsonb,
    '["Node.js 18+ available.","Project package.json exists or can be created."]'::jsonb,
    'npx playwright --version',
    'npm uninstall @playwright/test
rm -rf tests/playwright playwright.config.*',
    90
  ),
  (
    'prisma', 'Prisma', 'javascript-runtime', 'JavaScript Runtime',
    'Install Prisma for typed database schema management and client generation.',
    'Database ORM', 'TypeScript', 'Prisma', 'npm',
    array['macOS','Linux','Windows'], 'verified', 'prisma.io/docs',
    'npm install prisma typescript tsx @types/node --save-dev
npx prisma init --datasource-provider postgresql',
    '[{"label":"Install dev dependencies","command":"npm install prisma typescript tsx @types/node --save-dev"},{"label":"Initialize Prisma","command":"npx prisma init --datasource-provider postgresql"}]'::jsonb,
    '["Node.js 18+ available.","PostgreSQL connection string for DATABASE_URL."]'::jsonb,
    'npx prisma validate',
    'npm uninstall prisma typescript tsx @types/node
rm -rf prisma',
    100
  ),
  (
    'tailwindcss', 'Tailwind CSS', 'javascript-runtime', 'JavaScript Runtime',
    'Install Tailwind CSS and PostCSS wiring for utility-first frontend styling.',
    'Frontend styling', 'CSS/JavaScript', 'Tailwind CSS', 'npm',
    array['macOS','Linux','Windows'], 'verified', 'tailwindcss.com/docs',
    'npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p',
    '[{"label":"Install packages","command":"npm install -D tailwindcss postcss autoprefixer"},{"label":"Create config","command":"npx tailwindcss init -p"}]'::jsonb,
    '["Node.js 18+ available.","Frontend project with package.json."]'::jsonb,
    'npx tailwindcss --help',
    'npm uninstall tailwindcss postcss autoprefixer
rm -f tailwind.config.js postcss.config.js',
    110
  ),
  (
    'docker-engine', 'Docker Engine', 'containers', 'Containers',
    'Install Docker Engine and CLI for containerized local development.',
    'Containers', 'Shell', 'Docker Engine', 'official installer',
    array['Linux'], 'verified', 'docs.docker.com/engine/install',
    'curl -fsSL https://get.docker.com | sh',
    '[{"label":"Install Docker","command":"curl -fsSL https://get.docker.com | sh"},{"label":"Add user to group","command":"sudo usermod -aG docker \"$USER\""}]'::jsonb,
    '["Linux host with sudo access.","curl available."]'::jsonb,
    'docker --version',
    'sudo apt-get remove --purge -y docker-ce docker-ce-cli containerd.io',
    120
  ),
  (
    'postgresql', 'PostgreSQL', 'databases', 'Databases',
    'Install PostgreSQL with background service support for local development.',
    'Database', 'SQL', 'PostgreSQL', 'Homebrew',
    array['macOS','Linux','Windows'], 'verified', 'postgresql.org/download',
    'brew install postgresql@16 && brew services start postgresql@16',
    '[{"label":"Install PostgreSQL","command":"brew install postgresql@16"},{"label":"Start service","command":"brew services start postgresql@16"}]'::jsonb,
    '["Homebrew available.","Disk space for local database data."]'::jsonb,
    'psql --version',
    'brew services stop postgresql@16 && brew uninstall postgresql@16',
    130
  ),
  (
    'supabase-cli', 'Supabase CLI', 'databases', 'Databases',
    'Install Supabase CLI for local Postgres, auth, storage, edge functions, and migrations.',
    'Backend-as-a-service', 'SQL/TypeScript', 'Supabase', 'Homebrew',
    array['macOS','Linux','Windows'], 'verified', 'supabase.com/docs/guides/cli',
    'brew install supabase/tap/supabase
supabase login
supabase init',
    '[{"label":"Install CLI","command":"brew install supabase/tap/supabase"},{"label":"Authenticate","command":"supabase login"},{"label":"Initialize project","command":"supabase init"}]'::jsonb,
    '["Homebrew available.","Supabase account access.","Project directory for config."]'::jsonb,
    'supabase --version',
    'brew uninstall supabase',
    140
  ),
  (
    'redis', 'Redis', 'databases', 'Databases',
    'Install Redis for local queues, caching, sessions, and pub/sub workflows.',
    'Data store', 'Shell', 'Redis', 'Homebrew',
    array['macOS','Linux','Windows'], 'verified', 'redis.io/docs/latest/operate/oss_and_stack/install',
    'brew install redis
brew services start redis',
    '[{"label":"Install Redis","command":"brew install redis"},{"label":"Start service","command":"brew services start redis"}]'::jsonb,
    '["Homebrew available.","Local port 6379 available."]'::jsonb,
    'redis-cli ping',
    'brew services stop redis && brew uninstall redis',
    150
  ),
  (
    'terraform', 'Terraform', 'infrastructure', 'Infrastructure',
    'Install Terraform using HashiCorp tap, then enable CLI autocomplete for IaC workflows.',
    'Infrastructure as Code', 'HCL', 'Terraform', 'Homebrew',
    array['macOS','Linux','Windows'], 'verified', 'developer.hashicorp.com/terraform/install',
    'brew tap hashicorp/tap
brew install hashicorp/tap/terraform
terraform -install-autocomplete',
    '[{"label":"Add HashiCorp tap","command":"brew tap hashicorp/tap"},{"label":"Install Terraform","command":"brew install hashicorp/tap/terraform"},{"label":"Enable autocomplete","command":"terraform -install-autocomplete"}]'::jsonb,
    '["Homebrew available.","Shell profile can be updated for autocomplete."]'::jsonb,
    'terraform -version',
    'brew uninstall hashicorp/tap/terraform
brew untap hashicorp/tap',
    160
  ),
  (
    'rust', 'Rust', 'systems', 'Systems Languages',
    'Install Rust toolchain with rustup for CLI, systems, and WebAssembly projects.',
    'Systems programming', 'Rust', 'Cargo', 'rustup',
    array['macOS','Linux','Windows'], 'verified', 'rust-lang.org/tools/install',
    'curl --proto ''=https'' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"',
    '[{"label":"Install rustup","command":"curl --proto ''=https'' --tlsv1.2 -sSf https://sh.rustup.rs | sh"},{"label":"Load Cargo env","command":"source \"$HOME/.cargo/env\""}]'::jsonb,
    '["curl available.","Build tools available for native crates."]'::jsonb,
    'rustc --version && cargo --version',
    'rustup self uninstall',
    170
  ),
  (
    'go', 'Go', 'systems', 'Systems Languages',
    'Install Go for backend services, CLIs, and cloud-native tooling.',
    'Backend toolchain', 'Go', 'Go modules', 'Homebrew',
    array['macOS','Linux','Windows'], 'verified', 'go.dev/doc/install',
    'brew install go
go env GOPATH',
    '[{"label":"Install Go","command":"brew install go"},{"label":"Check workspace","command":"go env GOPATH"}]'::jsonb,
    '["Homebrew available.","Shell PATH includes Homebrew bin."]'::jsonb,
    'go version',
    'brew uninstall go',
    180
  )
on conflict (slug) do update set
  name = excluded.name,
  category_slug = excluded.category_slug,
  category = excluded.category,
  description = excluded.description,
  ecosystem = excluded.ecosystem,
  language = excluded.language,
  framework = excluded.framework,
  package_manager = excluded.package_manager,
  platforms = excluded.platforms,
  trust = excluded.trust,
  source = excluded.source,
  command = excluded.command,
  command_steps = excluded.command_steps,
  prerequisites = excluded.prerequisites,
  verify = excluded.verify,
  rollback = excluded.rollback,
  sort_order = excluded.sort_order,
  updated_at = now();
