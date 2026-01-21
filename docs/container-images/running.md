# Running pgEdge Containers

The following examples demonstrate commands that run containers.  For example,
to start a pgEdge PostgreSQL container, use a command in the following form:

```bash
docker run -d \
  --name pgedge-postgres \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -v pgdata:/var/lib/postgresql/data \
  ghcr.io/pgedge/pgedge-postgres:17-spock5-standard
```

To run the MCP server container to enable AI agents to interact with your 
Postgres database, use the command:

```bash
docker run -d \
  --name postgres-mcp \
  -p 8080:8080 \
  -e POSTGRES_CONNECTION_STRING="postgresql://user:pass@host:5432/db" \
  ghcr.io/pgedge/postgres-mcp:latest
```

To deploy the MCP server with the built-in documentation knowledgebase and 
embedding provider configuration:

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

To launch the Natural Language Agent web interface and connect it to your MCP
server:

```bash
docker run -d \
  --name nla-web \
  -p 8081:8081 \
  -e MCP_SERVER_URL=http://postgres-mcp:8080 \
  ghcr.io/pgedge/nla-web:latest
```

