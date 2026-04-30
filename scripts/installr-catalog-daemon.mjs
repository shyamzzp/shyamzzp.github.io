import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const env = loadEnv();
const projectRef = env.SUPABASE_PROJECT_REF || "lpehkeyhpwxljdylbhkc";
const dbPassword = env.SUPABASE_DB_PASSWORD;

if (!dbPassword && !env.SUPABASE_DB_URL) {
  throw new Error("Missing SUPABASE_DB_PASSWORD or SUPABASE_DB_URL in .env");
}

const dbUrl =
  env.SUPABASE_DB_URL ||
  `postgresql://postgres:${encodeURIComponent(dbPassword)}@db.${projectRef}.supabase.co:5432/postgres?sslmode=require`;

const intervalMs = Number(env.INSTALLR_DAEMON_INTERVAL_MS || 10000);
const maxBatches = Number(env.INSTALLR_DAEMON_MAX_BATCHES || 6);
const durationMs = Number(env.INSTALLR_DAEMON_DURATION_MS || 120000);
const batchSize = Number(env.INSTALLR_DAEMON_BATCH_SIZE || 5);
const startedAt = Date.now();
const discoveryQueries = (env.INSTALLR_DAEMON_DISCOVERY_QUERIES || "cli,developer-tool,framework,testing,devops")
  .split(",")
  .map((query) => query.trim())
  .filter(Boolean);
const discoveryOffset = Number(env.INSTALLR_DAEMON_DISCOVERY_OFFSET || Math.floor(Date.now() / 60000) % 80);
const discoveryLimit = Number(env.INSTALLR_DAEMON_DISCOVERY_LIMIT || 12);
const runId = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);

const categories = [
  ["kubernetes", "Kubernetes", "Cluster tooling, manifests, Helm charts, and local Kubernetes workflows.", 80],
  ["cloud-platforms", "Cloud Platforms", "Cloud provider CLIs and project bootstraps for managed infrastructure.", 90],
  ["observability", "Observability", "Metrics, logs, tracing, and local monitoring stack installers.", 100],
  ["security", "Security", "Secret scanning, software supply-chain checks, and policy tooling.", 110],
  ["data-ai", "Data + AI", "Data notebooks, vector databases, and AI development stack setup commands.", 120],
  ["mobile", "Mobile", "iOS, Android, and cross-platform mobile development tooling.", 130],
  ["npm-modules", "NPM Modules", "Discovered JavaScript CLI packages and module bootstraps from npm registry search.", 140],
  ["python-modules", "Python Modules", "Python package, app framework, and module installation recipes.", 150],
  ["homebrew-tools", "Homebrew Tools", "Discovered Homebrew formulas with CLI-oriented install commands.", 160],
  ["custom-recipes", "Custom Recipes", "Generated setup recipes that combine files, services, manifests, and framework scaffolds.", 170]
];

const items = [
  item({
    slug: "helm",
    name: "Helm",
    categorySlug: "kubernetes",
    category: "Kubernetes",
    description: "Install Helm for packaging Kubernetes applications and managing chart releases.",
    ecosystem: "Kubernetes",
    language: "YAML",
    framework: "Helm Charts",
    packageManager: "Homebrew",
    commandStyle: "tap + install",
    complexity: "medium",
    platforms: ["macOS", "Linux", "Windows"],
    source: "helm.sh/docs/intro/install",
    command: "brew install helm",
    steps: [
      ["Install Helm", "brew install helm"],
      ["Add Bitnami charts", "helm repo add bitnami https://charts.bitnami.com/bitnami"],
      ["Refresh repos", "helm repo update"]
    ],
    prerequisites: ["Kubernetes cluster access is configured.", "Homebrew is installed."],
    verify: "helm version",
    rollback: "brew uninstall helm",
    sortOrder: 190
  }),
  item({
    slug: "kind",
    name: "kind",
    categorySlug: "kubernetes",
    category: "Kubernetes",
    description: "Create a local Kubernetes cluster inside Docker for integration testing.",
    ecosystem: "Kubernetes",
    language: "YAML",
    framework: "kind",
    packageManager: "Homebrew",
    commandStyle: "config heredoc",
    complexity: "complex",
    platforms: ["macOS", "Linux", "Windows"],
    source: "kind.sigs.k8s.io/docs/user/quick-start",
    command: [
      "brew install kind kubectl",
      "cat > kind-config.yaml <<'YAML'",
      "kind: Cluster",
      "apiVersion: kind.x-k8s.io/v1alpha4",
      "nodes:",
      "- role: control-plane",
      "  extraPortMappings:",
      "  - containerPort: 30080",
      "    hostPort: 8080",
      "YAML",
      "kind create cluster --name installr --config kind-config.yaml"
    ].join("\n"),
    steps: [
      ["Install CLIs", "brew install kind kubectl"],
      ["Write cluster config", "cat > kind-config.yaml <<'YAML'\nkind: Cluster\napiVersion: kind.x-k8s.io/v1alpha4\nnodes:\n- role: control-plane\nYAML"],
      ["Create cluster", "kind create cluster --name installr --config kind-config.yaml"]
    ],
    prerequisites: ["Docker is running.", "Port 8080 is free."],
    verify: "kubectl cluster-info --context kind-installr",
    rollback: "kind delete cluster --name installr\nrm -f kind-config.yaml",
    sortOrder: 200
  }),
  item({
    slug: "kubectl-kustomize-nginx",
    name: "kubectl + Kustomize",
    categorySlug: "kubernetes",
    category: "Kubernetes",
    description: "Apply a generated Kubernetes deployment and service using a local Kustomize overlay.",
    ecosystem: "Kubernetes",
    language: "YAML",
    framework: "Kustomize",
    packageManager: "kubectl",
    commandStyle: "generated manifest",
    complexity: "complex",
    platforms: ["macOS", "Linux", "Windows"],
    source: "kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization",
    command: [
      "mkdir -p k8s/base",
      "cat > k8s/base/deployment.yaml <<'YAML'",
      "apiVersion: apps/v1",
      "kind: Deployment",
      "metadata:",
      "  name: installr-nginx",
      "spec:",
      "  replicas: 2",
      "  selector: { matchLabels: { app: installr-nginx } }",
      "  template:",
      "    metadata: { labels: { app: installr-nginx } }",
      "    spec:",
      "      containers:",
      "      - name: nginx",
      "        image: nginx:1.27-alpine",
      "YAML",
      "kubectl apply -k k8s/base"
    ].join("\n"),
    steps: [
      ["Create manifest directory", "mkdir -p k8s/base"],
      ["Write deployment", "cat > k8s/base/deployment.yaml <<'YAML'\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: installr-nginx\nspec:\n  replicas: 2\nYAML"],
      ["Apply overlay", "kubectl apply -k k8s/base"]
    ],
    prerequisites: ["kubectl is configured against a cluster.", "Kustomize support is available in kubectl."],
    verify: "kubectl get deploy installr-nginx",
    rollback: "kubectl delete -k k8s/base\nrm -rf k8s",
    sortOrder: 210
  }),
  item({
    slug: "aws-cli-sso",
    name: "AWS CLI + SSO",
    categorySlug: "cloud-platforms",
    category: "Cloud Platforms",
    description: "Install AWS CLI and configure an SSO-backed profile for cloud automation.",
    ecosystem: "AWS",
    language: "Shell",
    framework: "AWS CLI",
    packageManager: "Homebrew",
    commandStyle: "interactive auth",
    complexity: "medium",
    platforms: ["macOS", "Linux", "Windows"],
    source: "docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html",
    command: "brew install awscli\naws configure sso",
    steps: [
      ["Install CLI", "brew install awscli"],
      ["Start SSO configuration", "aws configure sso"],
      ["Check caller identity", "aws sts get-caller-identity --profile default"]
    ],
    prerequisites: ["AWS SSO start URL and region.", "Browser access for login."],
    verify: "aws --version",
    rollback: "brew uninstall awscli\nrm -rf ~/.aws/sso/cache",
    sortOrder: 220
  }),
  item({
    slug: "gcloud-cli",
    name: "Google Cloud CLI",
    categorySlug: "cloud-platforms",
    category: "Cloud Platforms",
    description: "Install gcloud and initialize a project for GCP deployments and service APIs.",
    ecosystem: "Google Cloud",
    language: "Shell",
    framework: "gcloud CLI",
    packageManager: "Homebrew",
    commandStyle: "auth + project",
    complexity: "medium",
    platforms: ["macOS", "Linux", "Windows"],
    source: "cloud.google.com/sdk/docs/install",
    command: "brew install --cask google-cloud-sdk\ngcloud init\ngcloud config set project YOUR_PROJECT_ID",
    steps: [
      ["Install SDK", "brew install --cask google-cloud-sdk"],
      ["Initialize auth", "gcloud init"],
      ["Set project", "gcloud config set project YOUR_PROJECT_ID"]
    ],
    prerequisites: ["Google Cloud account access.", "Target project ID."],
    verify: "gcloud version",
    rollback: "brew uninstall --cask google-cloud-sdk\nrm -rf ~/.config/gcloud",
    sortOrder: 230
  }),
  item({
    slug: "azure-cli",
    name: "Azure CLI",
    categorySlug: "cloud-platforms",
    category: "Cloud Platforms",
    description: "Install Azure CLI and create a resource group for deployment experiments.",
    ecosystem: "Azure",
    language: "Shell",
    framework: "Azure CLI",
    packageManager: "Homebrew",
    commandStyle: "login + resource",
    complexity: "medium",
    platforms: ["macOS", "Linux", "Windows"],
    source: "learn.microsoft.com/cli/azure/install-azure-cli",
    command: "brew install azure-cli\naz login\naz group create --name installr-rg --location eastus",
    steps: [
      ["Install CLI", "brew install azure-cli"],
      ["Authenticate", "az login"],
      ["Create resource group", "az group create --name installr-rg --location eastus"]
    ],
    prerequisites: ["Azure subscription access.", "Browser access for login."],
    verify: "az version",
    rollback: "az group delete --name installr-rg --yes --no-wait\nbrew uninstall azure-cli",
    sortOrder: 240
  }),
  item({
    slug: "docker-compose-observability",
    name: "Prometheus + Grafana",
    categorySlug: "observability",
    category: "Observability",
    description: "Create a local Prometheus and Grafana stack with Docker Compose.",
    ecosystem: "Monitoring",
    language: "YAML",
    framework: "Prometheus, Grafana",
    packageManager: "Docker Compose",
    commandStyle: "compose file",
    complexity: "complex",
    platforms: ["macOS", "Linux", "Windows"],
    source: "prometheus.io/docs/prometheus/latest/installation",
    command: [
      "mkdir -p observability",
      "cat > observability/docker-compose.yml <<'YAML'",
      "services:",
      "  prometheus:",
      "    image: prom/prometheus:v2.55.0",
      "    ports: ['9090:9090']",
      "  grafana:",
      "    image: grafana/grafana:11.2.0",
      "    ports: ['3000:3000']",
      "YAML",
      "docker compose -f observability/docker-compose.yml up -d"
    ].join("\n"),
    steps: [
      ["Create workspace", "mkdir -p observability"],
      ["Write compose file", "cat > observability/docker-compose.yml <<'YAML'\nservices:\n  prometheus:\n    image: prom/prometheus:v2.55.0\n    ports: ['9090:9090']\n  grafana:\n    image: grafana/grafana:11.2.0\n    ports: ['3000:3000']\nYAML"],
      ["Start services", "docker compose -f observability/docker-compose.yml up -d"]
    ],
    prerequisites: ["Docker Desktop or Docker Engine is running.", "Ports 3000 and 9090 are free."],
    verify: "docker compose -f observability/docker-compose.yml ps",
    rollback: "docker compose -f observability/docker-compose.yml down -v\nrm -rf observability",
    sortOrder: 250
  }),
  item({
    slug: "otel-collector",
    name: "OpenTelemetry Collector",
    categorySlug: "observability",
    category: "Observability",
    description: "Run a local OpenTelemetry Collector with a generated debug pipeline config.",
    ecosystem: "Tracing",
    language: "YAML",
    framework: "OpenTelemetry",
    packageManager: "Docker",
    commandStyle: "container + config",
    complexity: "complex",
    platforms: ["macOS", "Linux", "Windows"],
    source: "opentelemetry.io/docs/collector",
    command: [
      "cat > otel-collector.yaml <<'YAML'",
      "receivers:",
      "  otlp:",
      "    protocols:",
      "      grpc:",
      "      http:",
      "exporters:",
      "  debug:",
      "service:",
      "  pipelines:",
      "    traces:",
      "      receivers: [otlp]",
      "      exporters: [debug]",
      "YAML",
      "docker run --rm -p 4317:4317 -p 4318:4318 -v \"$PWD/otel-collector.yaml:/etc/otelcol/config.yaml\" otel/opentelemetry-collector:latest"
    ].join("\n"),
    steps: [
      ["Write collector config", "cat > otel-collector.yaml <<'YAML'\nreceivers:\n  otlp:\n    protocols:\n      grpc:\n      http:\nexporters:\n  debug:\nservice:\n  pipelines:\n    traces:\n      receivers: [otlp]\n      exporters: [debug]\nYAML"],
      ["Run collector", "docker run --rm -p 4317:4317 -p 4318:4318 -v \"$PWD/otel-collector.yaml:/etc/otelcol/config.yaml\" otel/opentelemetry-collector:latest"]
    ],
    prerequisites: ["Docker is running.", "Ports 4317 and 4318 are free."],
    verify: "test -f otel-collector.yaml",
    rollback: "rm -f otel-collector.yaml",
    sortOrder: 260
  }),
  item({
    slug: "sentry-cli",
    name: "Sentry CLI",
    categorySlug: "observability",
    category: "Observability",
    description: "Install Sentry CLI for release creation and source map uploads.",
    ecosystem: "Error tracking",
    language: "JavaScript/TypeScript",
    framework: "Sentry",
    packageManager: "npm",
    commandStyle: "project integration",
    complexity: "medium",
    platforms: ["macOS", "Linux", "Windows"],
    source: "docs.sentry.io/product/cli/installation",
    command: "npm install --save-dev @sentry/cli\nnpx sentry-cli login",
    steps: [
      ["Install CLI", "npm install --save-dev @sentry/cli"],
      ["Authenticate", "npx sentry-cli login"],
      ["Create release", "npx sentry-cli releases new \"$npm_package_version\""]
    ],
    prerequisites: ["Node.js project with package.json.", "Sentry auth token or login access."],
    verify: "npx sentry-cli --version",
    rollback: "npm uninstall @sentry/cli",
    sortOrder: 270
  }),
  item({
    slug: "trivy",
    name: "Trivy",
    categorySlug: "security",
    category: "Security",
    description: "Install Trivy for container image, filesystem, and dependency vulnerability scans.",
    ecosystem: "Security",
    language: "Go",
    framework: "Trivy",
    packageManager: "Homebrew",
    commandStyle: "scanner",
    complexity: "medium",
    platforms: ["macOS", "Linux", "Windows"],
    source: "aquasecurity.github.io/trivy/latest/getting-started/installation",
    command: "brew install trivy\ntrivy fs --severity HIGH,CRITICAL .",
    steps: [
      ["Install scanner", "brew install trivy"],
      ["Scan repository", "trivy fs --severity HIGH,CRITICAL ."]
    ],
    prerequisites: ["Homebrew available.", "Repository or image to scan."],
    verify: "trivy --version",
    rollback: "brew uninstall trivy",
    sortOrder: 280
  }),
  item({
    slug: "gitleaks",
    name: "Gitleaks",
    categorySlug: "security",
    category: "Security",
    description: "Install and run secret scanning against the current Git repository.",
    ecosystem: "Security",
    language: "Go",
    framework: "Gitleaks",
    packageManager: "Homebrew",
    commandStyle: "git scanner",
    complexity: "medium",
    platforms: ["macOS", "Linux", "Windows"],
    source: "github.com/gitleaks/gitleaks",
    command: "brew install gitleaks\ngitleaks detect --source . --redact",
    steps: [
      ["Install scanner", "brew install gitleaks"],
      ["Run redacted scan", "gitleaks detect --source . --redact"]
    ],
    prerequisites: ["Git repository is available.", "Homebrew available."],
    verify: "gitleaks version",
    rollback: "brew uninstall gitleaks",
    sortOrder: 290
  }),
  item({
    slug: "cosign",
    name: "Cosign",
    categorySlug: "security",
    category: "Security",
    description: "Install Cosign for signing and verifying container images with Sigstore.",
    ecosystem: "Supply chain",
    language: "Go",
    framework: "Sigstore",
    packageManager: "Homebrew",
    commandStyle: "keyless signing",
    complexity: "complex",
    platforms: ["macOS", "Linux", "Windows"],
    source: "docs.sigstore.dev/cosign/installation",
    command: "brew install cosign\ncosign initialize\ncosign verify --certificate-identity-regexp '.*' --certificate-oidc-issuer-regexp '.*' IMAGE_REF",
    steps: [
      ["Install Cosign", "brew install cosign"],
      ["Initialize trust root", "cosign initialize"],
      ["Verify image", "cosign verify --certificate-identity-regexp '.*' --certificate-oidc-issuer-regexp '.*' IMAGE_REF"]
    ],
    prerequisites: ["Container image reference to verify.", "Network access to Sigstore services."],
    verify: "cosign version",
    rollback: "brew uninstall cosign",
    sortOrder: 300
  }),
  item({
    slug: "jupyterlab",
    name: "JupyterLab",
    categorySlug: "data-ai",
    category: "Data + AI",
    description: "Create an isolated Python notebook environment for data analysis and AI experiments.",
    ecosystem: "Data science",
    language: "Python",
    framework: "JupyterLab",
    packageManager: "uv",
    commandStyle: "venv + packages",
    complexity: "medium",
    platforms: ["macOS", "Linux", "Windows"],
    source: "jupyter.org/install",
    command: "uv venv .venv\nsource .venv/bin/activate\nuv pip install jupyterlab pandas numpy\njupyter lab",
    steps: [
      ["Create environment", "uv venv .venv"],
      ["Activate environment", "source .venv/bin/activate"],
      ["Install packages", "uv pip install jupyterlab pandas numpy"],
      ["Launch lab", "jupyter lab"]
    ],
    prerequisites: ["uv installed.", "Python 3.10+ available."],
    verify: "jupyter lab --version",
    rollback: "rm -rf .venv",
    sortOrder: 310
  }),
  item({
    slug: "qdrant-compose",
    name: "Qdrant",
    categorySlug: "data-ai",
    category: "Data + AI",
    description: "Run a local vector database for semantic search and embedding experiments.",
    ecosystem: "Vector database",
    language: "Rust",
    framework: "Qdrant",
    packageManager: "Docker",
    commandStyle: "docker volume",
    complexity: "medium",
    platforms: ["macOS", "Linux", "Windows"],
    source: "qdrant.tech/documentation/quick-start",
    command: "docker volume create qdrant_storage\ndocker run -p 6333:6333 -p 6334:6334 -v qdrant_storage:/qdrant/storage qdrant/qdrant",
    steps: [
      ["Create volume", "docker volume create qdrant_storage"],
      ["Run database", "docker run -p 6333:6333 -p 6334:6334 -v qdrant_storage:/qdrant/storage qdrant/qdrant"]
    ],
    prerequisites: ["Docker is running.", "Ports 6333 and 6334 are free."],
    verify: "curl http://localhost:6333/healthz",
    rollback: "docker rm -f qdrant 2>/dev/null || true\ndocker volume rm qdrant_storage",
    sortOrder: 320
  }),
  item({
    slug: "ollama",
    name: "Ollama",
    categorySlug: "data-ai",
    category: "Data + AI",
    description: "Install Ollama and pull a local model for offline development workflows.",
    ecosystem: "Local AI",
    language: "Model runtime",
    framework: "Ollama",
    packageManager: "Homebrew",
    commandStyle: "service + model",
    complexity: "medium",
    platforms: ["macOS", "Linux", "Windows"],
    source: "ollama.com/download",
    command: "brew install ollama\nollama serve\nollama pull llama3.2",
    steps: [
      ["Install runtime", "brew install ollama"],
      ["Start service", "ollama serve"],
      ["Pull model", "ollama pull llama3.2"]
    ],
    prerequisites: ["Enough disk space for model weights.", "Port 11434 is available."],
    verify: "ollama list",
    rollback: "brew uninstall ollama\nrm -rf ~/.ollama",
    sortOrder: 330
  }),
  item({
    slug: "expo",
    name: "Expo",
    categorySlug: "mobile",
    category: "Mobile",
    description: "Scaffold a React Native app with Expo for fast mobile prototyping.",
    ecosystem: "Mobile",
    language: "TypeScript",
    framework: "Expo, React Native",
    packageManager: "npx",
    commandStyle: "scaffold",
    complexity: "medium",
    platforms: ["macOS", "Linux", "Windows"],
    source: "docs.expo.dev/get-started/create-a-project",
    command: "npx create-expo-app@latest installr-mobile --template blank-typescript\ncd installr-mobile\nnpx expo start",
    steps: [
      ["Create app", "npx create-expo-app@latest installr-mobile --template blank-typescript"],
      ["Enter project", "cd installr-mobile"],
      ["Start dev server", "npx expo start"]
    ],
    prerequisites: ["Node.js 18+ available.", "Expo Go or simulator available for preview."],
    verify: "cd installr-mobile && npx expo --version",
    rollback: "rm -rf installr-mobile",
    sortOrder: 340
  }),
  item({
    slug: "android-platform-tools",
    name: "Android Platform Tools",
    categorySlug: "mobile",
    category: "Mobile",
    description: "Install adb and fastboot for Android device debugging and simulator workflows.",
    ecosystem: "Android",
    language: "Shell",
    framework: "adb",
    packageManager: "Homebrew",
    commandStyle: "cask install",
    complexity: "simple",
    platforms: ["macOS", "Linux", "Windows"],
    source: "developer.android.com/tools/releases/platform-tools",
    command: "brew install --cask android-platform-tools\nadb devices",
    steps: [
      ["Install platform tools", "brew install --cask android-platform-tools"],
      ["Check devices", "adb devices"]
    ],
    prerequisites: ["USB debugging enabled for physical devices.", "Homebrew available."],
    verify: "adb version",
    rollback: "brew uninstall --cask android-platform-tools",
    sortOrder: 350
  }),
  item({
    slug: "xcodegen",
    name: "XcodeGen",
    categorySlug: "mobile",
    category: "Mobile",
    description: "Generate Xcode projects from declarative YAML for iOS app repositories.",
    ecosystem: "iOS",
    language: "Swift",
    framework: "XcodeGen",
    packageManager: "Homebrew",
    commandStyle: "project generator",
    complexity: "complex",
    platforms: ["macOS"],
    source: "github.com/yonaskolb/XcodeGen",
    command: "brew install xcodegen\ncat > project.yml <<'YAML'\nname: InstallrApp\noptions:\n  bundleIdPrefix: com.example\nsettings:\n  IPHONEOS_DEPLOYMENT_TARGET: '17.0'\ntargets:\n  InstallrApp:\n    type: application\n    platform: iOS\n    sources: [InstallrApp]\nYAML\nxcodegen generate",
    steps: [
      ["Install generator", "brew install xcodegen"],
      ["Write project spec", "cat > project.yml <<'YAML'\nname: InstallrApp\ntargets:\n  InstallrApp:\n    type: application\n    platform: iOS\n    sources: [InstallrApp]\nYAML"],
      ["Generate project", "xcodegen generate"]
    ],
    prerequisites: ["macOS with Xcode installed.", "Source directory exists or can be created."],
    verify: "xcodegen --version",
    rollback: "brew uninstall xcodegen\nrm -f project.yml\nrm -rf InstallrApp.xcodeproj",
    sortOrder: 360
  })
];

function item(value) {
  return value;
}

function loadEnv() {
  const output = { ...process.env };
  if (!existsSync(".env")) return output;

  for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    output[key] = rawValue.replace(/^['"]|['"]$/g, "");
  }

  return output;
}

function sqlString(value) {
  return `'${String(value ?? "").replace(/'/g, "''")}'`;
}

function sqlArray(values) {
  return `array[${values.map(sqlString).join(",")}]`;
}

function sqlJson(value) {
  return `${sqlString(JSON.stringify(value))}::jsonb`;
}

function categorySql() {
  const values = categories
    .map(([slug, name, description, sortOrder]) => `(${sqlString(slug)}, ${sqlString(name)}, ${sqlString(description)}, ${sortOrder})`)
    .join(",\n");

  return `
    insert into public.installr_categories (slug, name, description, sort_order)
    values ${values}
    on conflict (slug) do update set
      name = excluded.name,
      description = excluded.description,
      sort_order = excluded.sort_order,
      updated_at = now();
  `;
}

function itemSql(batch) {
  const values = batch.map((entry) => `(
    ${sqlString(entry.slug)},
    ${sqlString(entry.name)},
    ${sqlString(entry.categorySlug)},
    ${sqlString(entry.category)},
    ${sqlString(entry.description)},
    ${sqlString(entry.ecosystem)},
    ${sqlString(entry.language)},
    ${sqlString(entry.framework)},
    ${sqlString(entry.packageManager)},
    ${sqlString(entry.commandStyle)},
    ${sqlString(entry.complexity)},
    ${sqlArray(entry.platforms)},
    'verified',
    ${sqlString(entry.source)},
    ${sqlString(entry.command)},
    ${sqlJson(entry.steps.map(([label, command]) => ({ label, command })))},
    ${sqlJson(entry.prerequisites)},
    ${sqlString(entry.verify)},
    ${sqlString(entry.rollback)},
    ${entry.sortOrder},
    ${entry.review === true ? "true" : "false"},
    ${sqlString(entry.reviewNotes || "Pending review from discovery daemon.")}
  )`).join(",\n");

  return `
    insert into public.installr_catalog_items (
      slug, name, category_slug, category, description, ecosystem, language, framework, package_manager,
      command_style, complexity, platforms, trust, source, command, command_steps, prerequisites, verify, rollback, sort_order,
      review, review_notes
    )
    values ${values}
    on conflict (slug) do update set
      name = excluded.name,
      category_slug = excluded.category_slug,
      category = excluded.category,
      description = excluded.description,
      ecosystem = excluded.ecosystem,
      language = excluded.language,
      framework = excluded.framework,
      package_manager = excluded.package_manager,
      command_style = excluded.command_style,
      complexity = excluded.complexity,
      platforms = excluded.platforms,
      trust = excluded.trust,
      source = excluded.source,
      command = excluded.command,
      command_steps = excluded.command_steps,
      prerequisites = excluded.prerequisites,
      verify = excluded.verify,
      rollback = excluded.rollback,
      sort_order = excluded.sort_order,
      review_notes = public.installr_catalog_items.review_notes,
      updated_at = now();
  `;
}

function ensureSchemaSql() {
  return `
    alter table public.installr_catalog_items
      add column if not exists command_style text,
      add column if not exists complexity text,
      add column if not exists review boolean not null default true,
      add column if not exists reviewed_at timestamptz,
      add column if not exists review_notes text;

    drop policy if exists installr_catalog_items_public_read on public.installr_catalog_items;
    create policy installr_catalog_items_public_read
    on public.installr_catalog_items
    for select
    using (review = true);
  `;
}

function runSql(sql) {
  const result = spawnSync("psql", [dbUrl, "-v", "ON_ERROR_STOP=1", "-c", sql], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });

  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    throw new Error("psql command failed");
  }

  if (result.stdout.trim()) {
    console.log(result.stdout.trim());
  }
}

function runSqlValue(sql) {
  const result = spawnSync("psql", [dbUrl, "-At", "-v", "ON_ERROR_STOP=1", "-c", sql], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });

  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    throw new Error("psql command failed");
  }

  return result.stdout.trim();
}

function getExistingSlugs() {
  const output = runSqlValue("select slug from public.installr_catalog_items order by slug;");
  return new Set(output.split("\n").map((slug) => slug.trim()).filter(Boolean));
}

async function fetchJson(url) {
  const headers = {
    "User-Agent": "installr-catalog-daemon/1.0"
  };
  if (env.GITHUB_TOKEN && url.includes("api.github.com")) {
    headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, {
    headers
  });

  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status}: ${url}`);
  }

  return response.json();
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/^@/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function pickCategoryForNpm(pkg) {
  const haystack = `${pkg.name || ""} ${(pkg.description || "")}`.toLowerCase();
  if (haystack.includes("test") || haystack.includes("playwright") || haystack.includes("vitest")) return ["javascript-runtime", "JavaScript Runtime"];
  if (haystack.includes("lint") || haystack.includes("format") || haystack.includes("build")) return ["developer-tools", "Developer Tools"];
  if (haystack.includes("react") || haystack.includes("next") || haystack.includes("vite")) return ["javascript-runtime", "JavaScript Runtime"];
  return ["npm-modules", "NPM Modules"];
}

function npmCandidate(pkg, index) {
  const [categorySlug, category] = pickCategoryForNpm(pkg);
  const packageName = pkg.name;
  const isScoped = packageName.startsWith("@");
  const binaryName = isScoped ? packageName.split("/").pop() : packageName;
  const command = [
    `npm install -D ${packageName}`,
    `npx ${binaryName} --help`
  ].join("\n");

  return item({
    slug: `npm-${slugify(packageName)}`,
    name: packageName,
    categorySlug,
    category,
    description: pkg.description || `Install ${packageName} from npm and inspect its CLI help.`,
    ecosystem: "npm registry",
    language: "JavaScript/TypeScript",
    framework: packageName,
    packageManager: "npm",
    commandStyle: "npm + npx",
    complexity: "medium",
    platforms: ["macOS", "Linux", "Windows"],
    source: `npmjs.com/package/${packageName}`,
    command,
    steps: [
      ["Install package", `npm install -D ${packageName}`],
      ["Inspect CLI help", `npx ${binaryName} --help`]
    ],
    prerequisites: ["Node.js 18+ available.", "Project package.json exists or can be created."],
    verify: `npm view ${packageName} version`,
    rollback: `npm uninstall ${packageName}`,
    sortOrder: 1000 + index
  });
}

async function discoverNpmCandidates(seedOffset) {
  const candidates = [];
  for (const query of discoveryQueries) {
    const url = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=${discoveryLimit}&from=${seedOffset}`;
    try {
      const payload = await fetchJson(url);
      for (const [index, result] of (payload.objects || []).entries()) {
        if (result?.package?.name) {
          candidates.push(npmCandidate(result.package, seedOffset + index));
        }
      }
    } catch (error) {
      console.warn(error.message);
    }
  }
  return candidates;
}

function homebrewCandidate(formula, index) {
  const name = formula.name;
  return item({
    slug: `brew-${slugify(name)}`,
    name,
    categorySlug: "homebrew-tools",
    category: "Homebrew Tools",
    description: formula.desc || `Install ${name} with Homebrew.`,
    ecosystem: "Homebrew",
    language: "Shell",
    framework: name,
    packageManager: "Homebrew",
    commandStyle: "brew formula",
    complexity: "simple",
    platforms: ["macOS", "Linux"],
    source: `formulae.brew.sh/formula/${name}`,
    command: `brew install ${name}`,
    steps: [
      ["Install formula", `brew install ${name}`],
      ["Show formula info", `brew info ${name}`]
    ],
    prerequisites: ["Homebrew available.", "Shell can write to Homebrew prefix."],
    verify: `${name} --version || brew info ${name}`,
    rollback: `brew uninstall ${name}`,
    sortOrder: 2000 + index
  });
}

async function discoverHomebrewCandidates(seedOffset) {
  try {
    const formulas = await fetchJson("https://formulae.brew.sh/api/formula.json");
    const cliLike = formulas.filter((formula) => {
      const text = `${formula.name || ""} ${formula.desc || ""}`.toLowerCase();
      return /\b(cli|command|tool|developer|kubernetes|cloud|lint|format|test|server|database|security)\b/.test(text);
    });
    return cliLike
      .slice(seedOffset, seedOffset + discoveryLimit)
      .map((formula, index) => homebrewCandidate(formula, seedOffset + index));
  } catch (error) {
    console.warn(error.message);
    return [];
  }
}

function githubCommandForRepo(repo) {
  const cloneCommand = `git clone ${repo.clone_url}\ncd ${repo.name}`;
  const language = repo.language || "Shell";
  const lowerLanguage = language.toLowerCase();

  if (lowerLanguage.includes("javascript") || lowerLanguage.includes("typescript")) {
    return {
      command: `${cloneCommand}\nnpm install\nnpm run build --if-present\nnpm test -- --runInBand || npm test -- --run || true`,
      steps: [
        ["Clone repository", `git clone ${repo.clone_url}`],
        ["Enter repository", `cd ${repo.name}`],
        ["Install dependencies", "npm install"],
        ["Build project", "npm run build --if-present"]
      ],
      verify: "npm run build --if-present",
      rollback: `cd ..\nrm -rf ${repo.name}`,
      packageManager: "npm",
      commandStyle: "git clone + npm"
    };
  }

  if (lowerLanguage.includes("python")) {
    return {
      command: `${cloneCommand}\npython3 -m venv .venv\nsource .venv/bin/activate\npython -m pip install --upgrade pip\npip install -e .`,
      steps: [
        ["Clone repository", `git clone ${repo.clone_url}`],
        ["Create virtualenv", "python3 -m venv .venv"],
        ["Activate virtualenv", "source .venv/bin/activate"],
        ["Install editable package", "pip install -e ."]
      ],
      verify: "python -m pip check",
      rollback: `cd ..\nrm -rf ${repo.name}`,
      packageManager: "pip",
      commandStyle: "git clone + virtualenv"
    };
  }

  if (lowerLanguage.includes("go")) {
    return {
      command: `go install github.com/${repo.full_name}@latest`,
      steps: [
        ["Install Go module", `go install github.com/${repo.full_name}@latest`],
        ["Check binary path", "go env GOPATH"]
      ],
      verify: "go version",
      rollback: "rm -f \"$(go env GOPATH)/bin/REPLACE_WITH_BINARY\"",
      packageManager: "go install",
      commandStyle: "go install"
    };
  }

  if (lowerLanguage.includes("rust")) {
    return {
      command: `cargo install --git ${repo.clone_url}`,
      steps: [
        ["Install from Git", `cargo install --git ${repo.clone_url}`],
        ["Check Cargo binaries", "ls \"${CARGO_HOME:-$HOME/.cargo}/bin\""]
      ],
      verify: "cargo --version",
      rollback: "cargo uninstall REPLACE_WITH_CRATE_NAME",
      packageManager: "cargo",
      commandStyle: "cargo git install"
    };
  }

  return {
    command: `${cloneCommand}\nls -la\ncat README.md | sed -n '1,80p'`,
    steps: [
      ["Clone repository", `git clone ${repo.clone_url}`],
      ["Enter repository", `cd ${repo.name}`],
      ["Inspect README", "cat README.md | sed -n '1,80p'"]
    ],
    verify: "test -d .git",
    rollback: `cd ..\nrm -rf ${repo.name}`,
    packageManager: "git",
    commandStyle: "git clone + inspect"
  };
}

function githubCandidate(repo, index) {
  const recipe = githubCommandForRepo(repo);
  const language = repo.language || "Mixed";
  return item({
    slug: `github-${slugify(repo.full_name)}`,
    name: repo.full_name,
    categorySlug: "custom-recipes",
    category: "Custom Recipes",
    description: repo.description || `Clone and inspect ${repo.full_name} from GitHub.`,
    ecosystem: "GitHub repository",
    language,
    framework: repo.topics?.slice(0, 3).join(", ") || repo.name,
    packageManager: recipe.packageManager,
    commandStyle: recipe.commandStyle,
    complexity: recipe.command.includes("\n") ? "complex" : "medium",
    platforms: ["macOS", "Linux", "Windows"],
    source: `github.com/${repo.full_name}`,
    command: recipe.command,
    steps: recipe.steps,
    prerequisites: ["Git is installed.", `${language} toolchain is available if the repository requires it.`],
    verify: recipe.verify,
    rollback: recipe.rollback,
    sortOrder: 4000 + index,
    review: false,
    reviewNotes: `Discovered from GitHub search during daemon run ${runId}.`
  });
}

async function discoverGithubCandidates(seedOffset) {
  const candidates = [];
  for (const query of discoveryQueries) {
    const search = `${query} cli tool in:name,description stars:>50 archived:false`;
    const page = Math.floor(seedOffset / discoveryLimit) + 1;
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(search)}&sort=updated&order=desc&per_page=${discoveryLimit}&page=${page}`;
    try {
      const payload = await fetchJson(url);
      for (const [index, repo] of (payload.items || []).entries()) {
        if (repo?.full_name && repo?.clone_url) {
          candidates.push(githubCandidate(repo, seedOffset + index));
        }
      }
    } catch (error) {
      console.warn(error.message);
    }
  }
  return candidates;
}

function customRecipeCandidates(batchNumber) {
  const suffix = `${runId}-${batchNumber + 1}`;
  return [
    item({
      slug: `custom-makefile-node-api-${suffix}`,
      name: `Node API Makefile Bootstrap ${batchNumber + 1}`,
      categorySlug: "custom-recipes",
      category: "Custom Recipes",
      description: "Generate a Makefile-driven Node API setup with install, dev, lint, and test targets.",
      ecosystem: "Node.js",
      language: "Makefile, TypeScript",
      framework: "Express/Fastify-ready",
      packageManager: "npm",
      commandStyle: "generated Makefile",
      complexity: "complex",
      platforms: ["macOS", "Linux", "Windows"],
      source: "docs.npmjs.com/cli",
      command: [
        "npm init -y",
        "npm install express dotenv",
        "npm install -D typescript tsx vitest @types/node",
        "cat > Makefile <<'MAKE'",
        "install:",
        "\tnpm install",
        "dev:",
        "\tnpx tsx watch src/server.ts",
        "test:",
        "\tnpx vitest run",
        "MAKE"
      ].join("\n"),
      steps: [
        ["Initialize package", "npm init -y"],
        ["Install runtime dependencies", "npm install express dotenv"],
        ["Install development tooling", "npm install -D typescript tsx vitest @types/node"],
        ["Write Makefile", "cat > Makefile <<'MAKE'\ninstall:\n\tnpm install\ndev:\n\tnpx tsx watch src/server.ts\ntest:\n\tnpx vitest run\nMAKE"]
      ],
      prerequisites: ["Node.js 18+ available.", "Writable project directory."],
      verify: "make test",
      rollback: "rm -f Makefile package.json package-lock.json\nrm -rf node_modules",
      sortOrder: 3000 + batchNumber
    }),
    item({
      slug: `custom-python-service-compose-${suffix}`,
      name: `FastAPI Compose Stack ${batchNumber + 1}`,
      categorySlug: "custom-recipes",
      category: "Custom Recipes",
      description: "Generate a FastAPI plus Postgres Docker Compose stack with environment file scaffolding.",
      ecosystem: "Python services",
      language: "Python, YAML",
      framework: "FastAPI, Postgres",
      packageManager: "Docker Compose",
      commandStyle: "compose + env",
      complexity: "complex",
      platforms: ["macOS", "Linux", "Windows"],
      source: "fastapi.tiangolo.com/deployment/docker",
      command: [
        "mkdir -p app",
        "cat > requirements.txt <<'REQ'",
        "fastapi[standard]",
        "pydantic-settings",
        "psycopg[binary]",
        "REQ",
        "cat > docker-compose.yml <<'YAML'",
        "services:",
        "  api:",
        "    image: python:3.12-slim",
        "    working_dir: /app",
        "    volumes: ['.:/app']",
        "    command: sh -c \"pip install -r requirements.txt && fastapi dev app/main.py --host 0.0.0.0\"",
        "    ports: ['8000:8000']",
        "  db:",
        "    image: postgres:16-alpine",
        "    environment:",
        "      POSTGRES_PASSWORD: installr",
        "YAML",
        "docker compose up -d"
      ].join("\n"),
      steps: [
        ["Create app directory", "mkdir -p app"],
        ["Write requirements", "cat > requirements.txt <<'REQ'\nfastapi[standard]\npydantic-settings\npsycopg[binary]\nREQ"],
        ["Write compose stack", "cat > docker-compose.yml <<'YAML'\nservices:\n  api:\n    image: python:3.12-slim\n    ports: ['8000:8000']\n  db:\n    image: postgres:16-alpine\nYAML"],
        ["Start stack", "docker compose up -d"]
      ],
      prerequisites: ["Docker is running.", "Ports 8000 and 5432 are free."],
      verify: "docker compose ps",
      rollback: "docker compose down -v\nrm -f docker-compose.yml requirements.txt",
      sortOrder: 3100 + batchNumber
    })
  ];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let batchNumber = 0;
let nextIndex = Number(env.INSTALLR_DAEMON_START_INDEX || 0);

console.log(`Installr catalog daemon starting: discovery mode, batch size ${batchSize}, interval ${intervalMs}ms.`);
runSql(ensureSchemaSql());
runSql(categorySql());

while (batchNumber < maxBatches && Date.now() - startedAt <= durationMs) {
  const existingSlugs = getExistingSlugs();
  const seedOffset = discoveryOffset + (batchNumber * discoveryLimit);
  const discovered = [
    ...(await discoverGithubCandidates(seedOffset)),
    ...(await discoverNpmCandidates(seedOffset)),
    ...(await discoverHomebrewCandidates(seedOffset)),
    ...customRecipeCandidates(batchNumber),
    ...items.slice(nextIndex)
  ];
  const seenInBatch = new Set();
  const batch = discovered.filter((entry) => {
    if (existingSlugs.has(entry.slug) || seenInBatch.has(entry.slug)) return false;
    seenInBatch.add(entry.slug);
    return true;
  }).slice(0, batchSize);

  if (batch.length === 0) {
    console.log("No new install records discovered in this cycle.");
    break;
  }

  runSql(itemSql(batch));
  batchNumber += 1;
  nextIndex += Math.max(0, batch.length - 2);
  console.log(`Batch ${batchNumber}: discovered and upserted ${batch.length} new items (${batch.map((entry) => entry.slug).join(", ")}).`);

  if (batchNumber < maxBatches && Date.now() - startedAt + intervalMs <= durationMs) {
    await sleep(intervalMs);
  }
}

console.log(`Installr catalog daemon finished after ${batchNumber} batch(es).`);
