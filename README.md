# pgEdge Documentation

This repository contains the core pgEdge product documentation and 
infrastructure for generating the docs website. It is based on 
[MkDocs](https://www.mkdocs.org), using the 
[Material theme](https://squidfunk.github.io/mkdocs-material/), along with the
[multirepo plugin](https://github.com/jdoiro3/mkdocs-multirepo-plugin) which
allows docs from other repositories to be merged into the site.

## Build Status

[![Build Docs](https://github.com/pgEdge/pgedge-docs/actions/workflows/build-docs.yml/badge.svg)](https://github.com/pgEdge/pgedge-docs/actions/workflows/build-docs.yml)

## Setup

1) Create a Python virtual environment:
    ```bash
    python3 -m venv pgedge-docs-venv
    ```

2) Activate the virtual environment:
    ```bash
    source pgedge-docs-venv/bin/activate
    ```

3) Check out the source tree, and install the required Python modules:
    ```bash
    git clone https://github.com/pgEdge/pgedge-docs
    cd pgedge-docs
    pip install -r requirements.txt
    ```

4) Run the local MkDocs server for testing:
    ```bash
    mkdocs serve
    INFO    -  Building documentation...
    INFO    -  Multirepo plugin importing docs...
    INFO    -  Cleaning site directory
    INFO    -  Multirepo plugin is cleaning up temp_dir/
    INFO    -  Documentation built in 0.18 seconds
    INFO    -  [14:32:14] Watching paths for changes: 'docs', 'mkdocs.yml'
    INFO    -  [14:32:14] Serving on http://127.0.0.1:8000/
    ```

## Adding External Versioned Docsets

External documentation repositories can be imported using the multirepo plugin.
For versioned docsets (products with multiple versions), follow these steps:

### 1. Add to Navigation (`mkdocs.yml`)

Add the docset to the `nav` section with version imports. The first version listed
(excluding "Development") is considered the latest and will be the redirect target:

```yaml
nav:
  # ... existing nav items ...

  - My Product:
    - v1.2.0: '!import https://github.com/pgEdge/my-product?branch=v1.2.0'
    - v1.1.0: '!import https://github.com/pgEdge/my-product?branch=v1.1.0'
    - Development: '!import https://github.com/pgEdge/my-product?branch=main'
```

The nav title ("My Product") will be converted to a URL slug (`my-product`).

### 2. Add to Versioned Docsets List (`mkdocs.yml`)

Add the URL slug to `extra.versioned_docsets`. This enables automatic redirect
generation for `/my-product/` → `/my-product/v1-2-0/`:

```yaml
extra:
  versioned_docsets:
    # ... existing docsets ...
    - my-product
```

### 3. Add to Navigation Categories (`mkdocs.yml`)

If the docset should appear in the navigation dropdown menus, add it to the
appropriate category in `extra.nav_categories`:

```yaml
extra:
  nav_categories:
    Tools:
      # ... existing items ...
      - title: My Product
        url: my-product/
```

### 4. Add to `.gitignore`

The redirect `index.md` file is auto-generated at build time by
`hooks/versioned_redirects.py`. Add it to `.gitignore` to prevent it from being
committed:

```
docs/my-product/index.md
```

### How It Works

- **`hooks/versioned_redirects.py`**: Generates `docs/<docset>/index.md` files
  at build time for each entry in `versioned_docsets`
- **`overrides/redirect.html`**: Template that dynamically determines the latest
  version from the nav structure and generates a JavaScript/meta refresh redirect
- **`overrides/404.html`**: Handles legacy URLs without version numbers by
  redirecting to the latest version (e.g., `/ace/overview/` → `/ace/v1-5-1/overview/`)