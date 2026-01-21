# Pulling Images

Use the `docker pull` command to download container images from the GitHub
Container Registry to your local system. Replace the image name and tag as
needed based on which components you want to deploy.

For example, to download AI Toolkit images:

```bash
docker pull ghcr.io/pgedge/postgres-mcp:latest
docker pull ghcr.io/pgedge/nla-web:latest
docker pull ghcr.io/pgedge/nla-cli:latest
docker pull ghcr.io/pgedge/rag-server:latest
```

The `pgedge-postgres-spock` image uses version-specific tags in the form:

`{postgres-version}-spock{spock-version}-{variant}`

`variant` can be:

- `standard` - Full image with all extensions
- `minimal` - Smaller image with core extensions only

For example, the following commands pull different pgEdge Postgres versions
with Spock version 5:

```bash
# PostgreSQL 17 with Spock 5 (standard)
docker pull ghcr.io/pgedge/pgedge-postgres:17-spock5-standard

# PostgreSQL 18 with Spock 5 (standard)
docker pull ghcr.io/pgedge/pgedge-postgres:18-spock5-standard

# PostgreSQL 18 with Spock 5 (minimal)
docker pull ghcr.io/pgedge/pgedge-postgres:18-spock5-minimal
```


## pgedge-postgres

The pgEdge Enterprise PostgreSQL packages provide the basis for the
`pgedge-postgres` image, with pgEdge extensions pre-installed.

- The base image is Rocky Linux 9.
- The tag takes the form: 
      
      `{postgres-version}-spock{spock-version}-{variant}`

```bash
docker pull ghcr.io/pgedge/pgedge-postgres:17-spock5-standard
```

Available tags:

| Tag | Description |
|-----|-------------|
| `17-spock5-standard` | PostgreSQL 17 with Spock 5 (full) |
| `17-spock5-minimal` | PostgreSQL 17 with Spock 5 (minimal) |
| `18-spock5-standard` | PostgreSQL 18 with Spock 5 (full) |
| `18-spock5-minimal` | PostgreSQL 18 with Spock 5 (minimal) |

More specific version tags are also available
(for example, `18.1-spock5.0.4-standard-3`).

Documentation: [pgEdge Enterprise PostgreSQL](https://docs.pgedge.com/enterprise/)


## control-plane

The Control Plane provides orchestration and management capabilities
for pgEdge PostgreSQL deployments.

```bash
docker pull ghcr.io/pgedge/control-plane:latest
```

Documentation: [Control Plane](https://docs.pgedge.com/control-plane)


## cloudnative-pg

Deploy pgEdge PostgreSQL on Kubernetes using the CloudNativePG operator image.

```bash
docker pull ghcr.io/pgedge/cloudnative-pg:latest
```

Documentation: [Kubernetes Deployment](https://docs.pgedge.com/pgedge-containers)


## pgedge-helm-utils

pgEdge Helm charts use this utility image for initialization and
configuration tasks.

```bash
docker pull ghcr.io/pgedge/pgedge-helm-utils:latest
```

Documentation: [Helm Chart](https://docs.pgedge.com/pgedge-containers)


## postgres-mcp

The MCP (Model Context Protocol) server enables AI agents to interact
with PostgreSQL databases through natural language.

- Base image: Red Hat UBI 9

`variants`:


| Tag | Description | Size |
|-----|-------------|------|
| `latest` | Base image without knowledgebase | ~50MB |
| `latest-with-kb` | Includes pre-built documentation | ~300-500MB |

The smallest footprint is the `latest` base image; use the following command
to pull the image:

`docker pull ghcr.io/pgedge/postgres-mcp:latest`

To pull an image with knowledgebase (and pre-built documentation search):

```bash
docker pull ghcr.io/pgedge/postgres-mcp:latest-with-kb
```

Use the base image when:

- you want the smallest possible image footprint.
- you will provide your own knowledgebase via volume mount.
- you don't need knowledgebase search functionality.

Use the `-with-kb` variant when:

- you want knowledgebase search available out-of-the-box.
- you prefer simplicity over image size.
- you're setting up a quick demo or development environment.

Documentation: [MCP Server](https://docs.pgedge.com/pgedge-postgres-mcp-server)

!!! note "Embedding Provider Required"

    Even with the built-in knowledgebase, you still need an embedding
    provider API key (e.g., Voyage AI) for similarity search queries.

   
## nla-web

You can access the Natural Language Agent through a React-based web UI.

- Base image: Red Hat UBI 9

```bash
docker pull ghcr.io/pgedge/nla-web:latest
```

Documentation: [Natural Language Agent](https://docs.pgedge.com/pgedge-postgres-mcp-server)


## nla-cli

Interact with the Natural Language Agent using the command-line interface.

- Base image: Red Hat UBI 9

```bash

docker pull ghcr.io/pgedge/nla-cli:latest
```

Documentation: [Natural Language Agent](https://docs.pgedge.com/pgedge-postgres-mcp-server/v1-0-0-beta1/reference/config-examples/cli-client/)


## rag-server

RAG (Retrieval-Augmented Generation) server for enhanced AI responses
with document context.

```bash
docker pull ghcr.io/pgedge/rag-server:latest
```

Documentation: [RAG Server](https://docs.pgedge.com/pgedge-rag-server)


## ace

The pgEdge Active Consistency Engine (ACE) monitors and maintains data 
consistency across distributed PostgreSQL nodes.

```bash
docker pull ghcr.io/pgedge/ace:latest
```

Documentation: [ACE - Active Consistency Engine](https://docs.pgedge.com/ace)

