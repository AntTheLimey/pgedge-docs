# Container Images

pgEdge publishes container images to GitHub Container Registry (GHCR) for deploying pgEdge components in containerized environments.

## Container Registry

All pgEdge container images are hosted on GitHub Container Registry at:

```
ghcr.io/pgedge/
```

### Browsing Available Images

You can view all available pgEdge container images in the GitHub web interface:

[github.com/orgs/pgEdge/packages](https://github.com/orgs/pgEdge/packages?visibility=public)

### Authentication

Public images can be pulled without authentication. To avoid rate limits, you can authenticate with a GitHub Personal Access Token (PAT):

```bash
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin
```

Your PAT needs the `read:packages` scope to pull images.

---

## Available Images

### Core Database

| Image | Description | Source |
|-------|-------------|--------|
| `ghcr.io/pgedge/pgedge-postgres` | pgEdge Enterprise PostgreSQL with extensions pre-installed | [pgEdge/postgres-images](https://github.com/pgEdge/postgres-images) |

### Control Plane

| Image | Description | Source |
|-------|-------------|--------|
| `ghcr.io/pgedge/control-plane` | Orchestration and management control plane | [pgEdge/control-plane](https://github.com/pgEdge/control-plane) |

### Kubernetes

| Image | Description | Source |
|-------|-------------|--------|
| `ghcr.io/pgedge/cloudnative-pg` | CloudNativePG operator for Kubernetes deployments | - |
| `ghcr.io/pgedge/pgedge-helm-utils` | Utility image for Helm chart operations | [pgEdge/pgedge-helm](https://github.com/pgEdge/pgedge-helm) |

### AI Toolkit

| Image | Description | Source |
|-------|-------------|--------|
| `ghcr.io/pgedge/postgres-mcp` | MCP server with PostgreSQL tools for AI agents | [pgEdge/pgedge-postgres-mcp](https://github.com/pgEdge/pgedge-postgres-mcp) |
| `ghcr.io/pgedge/nla-web` | Natural Language Agent web UI | [pgEdge/pgedge-postgres-mcp](https://github.com/pgEdge/pgedge-postgres-mcp) |
| `ghcr.io/pgedge/nla-cli` | Natural Language Agent command-line client | [pgEdge/pgedge-postgres-mcp](https://github.com/pgEdge/pgedge-postgres-mcp) |
| `ghcr.io/pgedge/rag-server` | RAG (Retrieval-Augmented Generation) server | [pgEdge/pgedge-rag-server](https://github.com/pgEdge/pgedge-rag-server) |

### Tools

| Image | Description | Source |
|-------|-------------|--------|
| `ghcr.io/pgedge/ace` | Active Consistency Engine for distributed PostgreSQL | [pgEdge/ace](https://github.com/pgEdge/ace) |

---

## Pulling Images

### AI Toolkit Images

```bash
docker pull ghcr.io/pgedge/postgres-mcp:latest
docker pull ghcr.io/pgedge/nla-web:latest
docker pull ghcr.io/pgedge/nla-cli:latest
docker pull ghcr.io/pgedge/rag-server:latest
```

### pgEdge PostgreSQL

The `pgedge-postgres` image uses version-specific tags.

**Tag format:** `{postgres-version}-spock{spock-version}-{variant}`

**Variants:**

- `standard` - Full image with all extensions
- `minimal` - Smaller image with core extensions only

```bash
# PostgreSQL 17 with Spock 5 (standard)
docker pull ghcr.io/pgedge/pgedge-postgres:17-spock5-standard

# PostgreSQL 18 with Spock 5 (standard)
docker pull ghcr.io/pgedge/pgedge-postgres:18-spock5-standard

# PostgreSQL 18 with Spock 5 (minimal)
docker pull ghcr.io/pgedge/pgedge-postgres:18-spock5-minimal
```

---

## Image Details

### pgedge-postgres

The `pgedge-postgres` image is based on pgEdge Enterprise PostgreSQL packages, with pgEdge extensions pre-installed.

- **Base image:** Rocky Linux 9
- **Tag format:** `{postgres-version}-spock{spock-version}-{variant}`

```bash
docker pull ghcr.io/pgedge/pgedge-postgres:17-spock5-standard
```

**Available tags:**

| Tag | Description |
|-----|-------------|
| `17-spock5-standard` | PostgreSQL 17 with Spock 5 (full) |
| `17-spock5-minimal` | PostgreSQL 17 with Spock 5 (minimal) |
| `18-spock5-standard` | PostgreSQL 18 with Spock 5 (full) |
| `18-spock5-minimal` | PostgreSQL 18 with Spock 5 (minimal) |

More specific version tags are also available (e.g., `18.1-spock5.0.4-standard-3`).

**Documentation:** [pgEdge Enterprise PostgreSQL](/enterprise-postgres/)

---

### control-plane

The Control Plane provides orchestration and management capabilities for pgEdge PostgreSQL deployments.

```bash
docker pull ghcr.io/pgedge/control-plane:latest
```

**Documentation:** [Control Plane](/control-plane/)

---

### cloudnative-pg

CloudNativePG operator image for deploying pgEdge PostgreSQL on Kubernetes.

```bash
docker pull ghcr.io/pgedge/cloudnative-pg:latest
```

**Documentation:** [Kubernetes Deployment](/kubernetes/helm/)

---

### pgedge-helm-utils

Utility image used by pgEdge Helm charts for initialization and configuration tasks.

```bash
docker pull ghcr.io/pgedge/pgedge-helm-utils:latest
```

**Documentation:** [Helm Chart](/kubernetes/helm/)

---

### postgres-mcp

The MCP (Model Context Protocol) server enables AI agents to interact with PostgreSQL databases through natural language.

- **Base image:** Red Hat UBI 9

**Variants:**

| Tag | Description | Size |
|-----|-------------|------|
| `latest` | Base image without knowledgebase | ~50MB |
| `latest-with-kb` | Includes pre-built documentation knowledgebase | ~300-500MB |

**Base image** (smallest footprint):

```bash
docker pull ghcr.io/pgedge/postgres-mcp:latest
```

**With knowledgebase** (includes pre-built documentation search):

```bash
docker pull ghcr.io/pgedge/postgres-mcp:latest-with-kb
```

Use the base image when:

- You want the smallest possible image footprint
- You will provide your own knowledgebase via volume mount
- You don't need knowledgebase search functionality

Use the `-with-kb` variant when:

- You want knowledgebase search available out-of-the-box
- You prefer simplicity over image size
- You're setting up a quick demo or development environment

!!! note "Embedding Provider Required"
    Even with the built-in knowledgebase, you still need an embedding provider API key (e.g., Voyage AI) for similarity search queries.

**Documentation:** [MCP Server](/ai-toolkit/mcp-server/)

---

### nla-web

React-based web UI for the Natural Language Agent.

- **Base image:** Red Hat UBI 9

```bash
docker pull ghcr.io/pgedge/nla-web:latest
```

**Documentation:** [Natural Language Agent](/ai-toolkit/nla/)

---

### nla-cli

Command-line interface for interacting with the Natural Language Agent.

- **Base image:** Red Hat UBI 9

```bash
docker pull ghcr.io/pgedge/nla-cli:latest
```

**Documentation:** [Natural Language Agent CLI](/ai-toolkit/nla/cli/)

---

### rag-server

RAG (Retrieval-Augmented Generation) server for enhanced AI responses with document context.

```bash
docker pull ghcr.io/pgedge/rag-server:latest
```

**Documentation:** [RAG Server](/ai-toolkit/rag-server/)

---

### ace

Active Consistency Engine (ACE) monitors and maintains data consistency across distributed PostgreSQL nodes.

```bash
docker pull ghcr.io/pgedge/ace:latest
```

**Documentation:** [ACE - Active Consistency Engine](/tools/ace/)

---

## Running Containers

### pgEdge PostgreSQL

```bash
docker run -d \
  --name pgedge-postgres \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -v pgdata:/var/lib/postgresql/data \
  ghcr.io/pgedge/pgedge-postgres:17-spock5-standard
```

### MCP Server

```bash
docker run -d \
  --name postgres-mcp \
  -p 8080:8080 \
  -e POSTGRES_CONNECTION_STRING="postgresql://user:pass@host:5432/db" \
  ghcr.io/pgedge/postgres-mcp:latest
```

### MCP Server with Knowledgebase

```bash
docker run -d \
  --name postgres-mcp \
  -p 8080:8080 \
  -e POSTGRES_CONNECTION_STRING="postgresql://user:pass@host:5432/db" \
  -e PGEDGE_KB_ENABLED=true \
  -e PGEDGE_KB_EMBEDDING_PROVIDER=voyage \
  -e PGEDGE_KB_VOYAGE_API_KEY=${VOYAGE_API_KEY} \
  ghcr.io/pgedge/postgres-mcp:latest-with-kb
```

### Natural Language Agent Web UI

```bash
docker run -d \
  --name nla-web \
  -p 8081:8081 \
  -e MCP_SERVER_URL=http://postgres-mcp:8080 \
  ghcr.io/pgedge/nla-web:latest
```

---

## Image Security

All pgEdge container images follow security best practices:

- **Non-root execution:** Images run as unprivileged users
- **Enterprise base images:** Rocky Linux 9 (database images) and Red Hat UBI 9 (AI Toolkit images)
- **Multi-stage builds:** Final images contain only runtime dependencies
- **Regular updates:** Images are rebuilt regularly to include security patches
