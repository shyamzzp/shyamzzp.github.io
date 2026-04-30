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

const categories = [
  ["kubernetes", "Kubernetes", "Cluster tooling, manifests, Helm charts, and local Kubernetes workflows.", 80],
  ["cloud-platforms", "Cloud Platforms", "Cloud provider CLIs and project bootstraps for managed infrastructure.", 90],
  ["observability", "Observability", "Metrics, logs, tracing, and local monitoring stack installers.", 100],
  ["security", "Security", "Secret scanning, software supply-chain checks, and policy tooling.", 110],
  ["data-ai", "Data + AI", "Data notebooks, vector databases, and AI development stack setup commands.", 120],
  ["mobile", "Mobile", "iOS, Android, and cross-platform mobile development tooling.", 130]
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
    ${entry.sortOrder}
  )`).join(",\n");

  return `
    insert into public.installr_catalog_items (
      slug, name, category_slug, category, description, ecosystem, language, framework, package_manager,
      command_style, complexity, platforms, trust, source, command, command_steps, prerequisites, verify, rollback, sort_order
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
      updated_at = now();
  `;
}

function ensureSchemaSql() {
  return `
    alter table public.installr_catalog_items
      add column if not exists command_style text,
      add column if not exists complexity text;
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let batchNumber = 0;
let nextIndex = Number(env.INSTALLR_DAEMON_START_INDEX || 0);

console.log(`Installr catalog daemon starting: ${items.length} curated items, batch size ${batchSize}, interval ${intervalMs}ms.`);
runSql(ensureSchemaSql());
runSql(categorySql());

while (batchNumber < maxBatches && Date.now() - startedAt <= durationMs && nextIndex < items.length) {
  const batch = items.slice(nextIndex, nextIndex + batchSize);
  runSql(itemSql(batch));
  batchNumber += 1;
  nextIndex += batch.length;
  console.log(`Batch ${batchNumber}: upserted ${batch.length} items (${batch.map((entry) => entry.slug).join(", ")}).`);

  if (batchNumber < maxBatches && nextIndex < items.length && Date.now() - startedAt + intervalMs <= durationMs) {
    await sleep(intervalMs);
  }
}

console.log(`Installr catalog daemon finished after ${batchNumber} batch(es).`);
