"""
MkDocs hook to automatically generate redirect pages for versioned docsets.

This hook creates index.md files in each versioned docset directory that
redirect to the latest version. The redirect template dynamically determines
the latest version from the nav structure.
"""

import os
import logging

log = logging.getLogger('mkdocs.hooks.versioned_redirects')

REDIRECT_CONTENT = """---
template: redirect.html
---
"""


def on_pre_build(config):
    """Generate redirect index.md files for each versioned docset."""
    versioned_docsets = config.get('extra', {}).get('versioned_docsets', [])
    docs_dir = config.get('docs_dir', 'docs')

    for docset in versioned_docsets:
        docset_dir = os.path.join(docs_dir, docset)
        index_path = os.path.join(docset_dir, 'index.md')

        # Create directory if it doesn't exist
        if not os.path.exists(docset_dir):
            os.makedirs(docset_dir)
            log.info(f"Created directory: {docset_dir}")

        # Only write if file doesn't exist or content differs
        # This prevents triggering mkdocs serve rebuild loop
        needs_write = True
        if os.path.exists(index_path):
            with open(index_path, 'r') as f:
                existing_content = f.read()
            if existing_content == REDIRECT_CONTENT:
                needs_write = False

        if needs_write:
            with open(index_path, 'w') as f:
                f.write(REDIRECT_CONTENT)
            log.info(f"Generated redirect: {index_path}")

    return config
