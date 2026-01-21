# Container Images

pgEdge publishes container images to the GitHub Container Registry 
(GCR) for deploying pgEdge components in containerized environments.
To review the available pgEdge container images, visit the pgEdge
GitHub Container Registry at:

[github.com/orgs/pgEdge/packages](https://github.com/orgs/pgEdge/packages?visibility=public)

All pgEdge container images follow security best practices:

- Images run as unprivileged users for non-root execution.
- Rocky Linux 9 (database images) and Red Hat UBI 9 (AI Toolkit images) serve as enterprise base images.
- Final images contain only runtime dependencies through multi-stage builds.
- pgEdge rebuilds images regularly to include security patches.


## Authentication

You can pull public images without authentication. To avoid rate
limits, authenticate with a GitHub Personal Access Token
(PAT):

```bash
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin
```

Your PAT needs the `read:packages` scope to pull images.

