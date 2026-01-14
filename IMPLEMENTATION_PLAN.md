# pgEdge Documentation Redesign - Implementation Plan

**Branch:** `feature/lovable-prototype-redesign`
**Prototype Reference:** https://pgedge-doc-explorer.lovable.app/
**Date:** January 14, 2026

---

## 🎯 CRITICAL CONSTRAINT

**ALL EXISTING URL PATHS MUST REMAIN UNCHANGED**
- Preserves SEO rankings and Google indexing
- Maintains user bookmarks
- No broken links
- Example: `/control-plane/v0-6/` stays exactly as-is
- Example: `/ace/v1-5-1/` must not change

**Strategy:** Visual/UI reorganization only. Keep mkdocs.yml nav structure intact.

---

## 📋 Implementation Checklist

### Phase 1: Navigation Structure (4-6 hours)

- [ ] **1.1** Keep existing mkdocs.yml nav structure unchanged
- [ ] **1.2** Create secondary navigation bar (below header) with 6 sections:
  - Get Started
  - VM / Bare Metal
  - Containers / Kubernetes
  - pgEdge Cloud (DBaaS)
  - AI Toolkit
  - Postgres Extensions
- [ ] **1.3** Implement tab switching logic (JavaScript)
- [ ] **1.4** Update sidebar to show only current section's items
- [ ] **1.5** Set indentation: 12px base + 12px per level
- [ ] **1.6** Add collapsible chevron icons
- [ ] **1.7** Hide version folders (v0.6, Development) visually with CSS
- [ ] **1.8** Add section title at top of sidebar (uppercase, small text)

**Files to modify:**
- `overrides/partials/tabs.html` (already has dropdown structure)
- `docs/stylesheets/custom-theme.css` (navigation styling)
- `docs/javascripts/section-navigation.js` (NEW - section switching logic)

---

### Phase 2: Header Component (2-3 hours)

- [ ] **2.1** Update header layout:
  - Left: pgEdge logo + "Documentation" text with separator
  - Center: Search box (max-width: 28rem)
  - Right: Theme toggle + Discord + GitHub icons
- [ ] **2.2** Set header height: 3.5rem (56px)
- [ ] **2.3** Add backdrop-blur effect
- [ ] **2.4** Make header sticky
- [ ] **2.5** Add border-bottom with header-border color
- [ ] **2.6** Make search responsive (hide on mobile, show as button)

**Files to modify:**
- `overrides/main.html` (header structure)
- `docs/stylesheets/custom-theme.css` (header styling)

---

### Phase 3: Visual Design & Typography (3-4 hours)

- [ ] **3.1** Add IBM Plex Sans font (400, 500, 600, 700 weights)
- [ ] **3.2** Add IBM Plex Mono font (400 weight for code)
- [ ] **3.3** Update global font-family CSS
- [ ] **3.4** Implement light mode color scheme:
  ```css
  --primary: hsl(174, 72%, 40%)           /* Cyan accent */
  --background: hsl(0, 0%, 100%)           /* White */
  --foreground: hsl(220, 20%, 15%)         /* Dark text */
  --muted: hsl(210, 15%, 96%)              /* Light gray */
  --nav-hover: hsl(210, 20%, 96%)          /* Light hover */
  --nav-active: hsl(174, 72%, 95%)         /* Cyan tint */
  --sidebar-bg: hsl(210, 20%, 98%)         /* Off-white */
  --header-border: hsl(220, 15%, 92%)      /* Subtle border */
  ```
- [ ] **3.5** Implement dark mode color scheme:
  ```css
  --background: hsl(222, 30%, 8%)          /* Very dark blue */
  --foreground: hsl(210, 20%, 95%)         /* Light text */
  --primary: hsl(174, 72%, 45%)            /* Brighter cyan */
  --nav-active: hsl(174, 50%, 15%)         /* Dark cyan tint */
  --sidebar-bg: hsl(222, 30%, 6%)          /* Darker sidebar */
  --header-bg: hsl(222, 30%, 10%)          /* Dark header */
  ```
- [ ] **3.6** Update spacing variables (0.5rem gaps, 1.5rem/2.5rem padding)

**Files to modify:**
- `docs/stylesheets/custom-theme.css` (all color and spacing variables)
- `mkdocs.yml` (add font CDN links if needed)

---

### Phase 4: Content Area (2-3 hours)

- [ ] **4.1** Add breadcrumb navigation component
  - Format: Section > Component > Page
  - Font size: 0.875rem
  - Muted color
  - Separator: "/"
- [ ] **4.2** Position breadcrumb above version selector
- [ ] **4.3** Update version selector styling:
  - Label: "Version:" in small caps
  - Dropdown button design
  - Position: below breadcrumb, above H1
- [ ] **4.4** Keep existing version-selector.js functionality
- [ ] **4.5** Set content max-width: 48rem (768px)
- [ ] **4.6** Set content padding: 1.5rem mobile, 2.5rem desktop
- [ ] **4.7** Add right sidebar for ToC (width: 16rem)
- [ ] **4.8** Set gap between content and ToC: 2rem

**Files to modify:**
- `overrides/main.html` (breadcrumb component)
- `docs/stylesheets/custom-theme.css` (content area layout)
- `docs/stylesheets/extra.css` (version selector styling)

---

### Phase 5: Table of Contents (1-2 hours)

- [ ] **5.1** Set ToC font size: 0.875rem (14px)
- [ ] **5.2** Set line height: 1.25rem (20px)
- [ ] **5.3** Set padding: 0.25rem 0.5rem
- [ ] **5.4** Set margin between items: 0.125rem (2px)
- [ ] **5.5** Add active item styling: 2px cyan left border
- [ ] **5.6** Implement smooth scroll behavior
- [ ] **5.7** Add hover states

**Files to modify:**
- `docs/stylesheets/custom-theme.css` (ToC styling)

---

### Phase 6: Additional Features (2-3 hours)

- [ ] **6.1** Add Help dropdown (top-right corner):
  - Button with "?" icon or "Help" text
  - Dropdown menu items:
    - Get Started guide
    - Community Forums link
    - Support contact link
- [ ] **6.2** Style theme toggle:
  - Sun/moon icon
  - Smooth transitions
  - Persist in localStorage
- [ ] **6.3** Add Discord icon button
  - Link: https://discord.gg/pgedge
  - Opens in new tab
- [ ] **6.4** Add GitHub icon button
  - Link: https://github.com/pgEdge
  - Opens in new tab
- [ ] **6.5** Style all icon buttons consistently

**Files to modify:**
- `overrides/main.html` (help dropdown, icon buttons)
- `docs/stylesheets/custom-theme.css` (dropdown and button styling)
- `docs/javascripts/help-dropdown.js` (NEW - dropdown interaction)

---

### Phase 7: CSS Organization (2 hours)

- [ ] **7.1** Reorganize `custom-theme.css` by component:
  - CSS custom properties (variables)
  - Header styles
  - Navigation bar styles
  - Sidebar styles
  - Content area styles
  - ToC styles
  - Component-specific styles
- [ ] **7.2** Add comments for each section
- [ ] **7.3** Ensure existing styles preserved:
  - Version selector
  - Tab dropdowns (already exist in tabs.html)
  - Code blocks
  - Admonitions
- [ ] **7.4** Remove unused/conflicting styles

**Files to modify:**
- `docs/stylesheets/custom-theme.css` (reorganize and clean up)

---

### Phase 8: Testing & Validation (3-4 hours)

- [ ] **8.1** URL preservation tests:
  - [ ] Verify `/control-plane/v0-6/` loads correctly
  - [ ] Verify `/ace/v1-5-1/install/` loads correctly
  - [ ] Verify `/cloud/getting-started/` loads correctly
  - [ ] Test direct URL access (not just navigation)
  - [ ] Check all nav links generate correct URLs
- [ ] **8.2** Responsive design tests:
  - [ ] Mobile (< 640px): Check hamburger menu, layout
  - [ ] Tablet (640px - 1024px): Check adjusted spacing
  - [ ] Desktop (> 1024px): Check three-column layout
- [ ] **8.3** Browser compatibility:
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)
- [ ] **8.4** Dark mode testing:
  - [ ] All colors render correctly
  - [ ] Contrast ratios meet WCAG standards
  - [ ] Toggle transition is smooth
- [ ] **8.5** Navigation functionality:
  - [ ] Tab switching updates sidebar
  - [ ] Sidebar expansion/collapse works
  - [ ] Breadcrumbs update correctly
  - [ ] Version selector changes pages
  - [ ] Search works
- [ ] **8.6** Performance checks:
  - [ ] Page load time < 2 seconds
  - [ ] No console errors
  - [ ] Smooth scrolling
  - [ ] No layout shifts

---

## 🔧 Technical Implementation Details

### Navigation Strategy

**Current State (Production):**
```yaml
nav:
  - Welcome: index.md
  - pgEdge Enterprise Postgres: ...
  - pgEdge Distributed Postgres: ...
  - pgEdge Cloud: ...
  - pgEdge Containers: ...
  - ACE: ...
  - [Other products]
```

**Keep This Structure!** URLs are generated from nav structure.

**Visual Layer:**
Create a mapping in JavaScript that groups existing nav items into prototype sections:

```javascript
const sectionMapping = {
  'get-started': ['Welcome'],
  'vm-bare-metal': ['pgEdge Enterprise Postgres', 'pgEdge Distributed Postgres', 'ACE'],
  'containers': ['pgEdge Containers'],
  'cloud': ['pgEdge Cloud'],
  'ai-toolkit': ['pgEdge Postgres MCP Server', 'pgEdge RAG Server', ...],
  'extensions': ['Spock v5', 'lolor', 'Snowflake', ...]
};
```

When user clicks a section tab, filter sidebar to show only nav items in that section's array.

### Version Folder Hiding

**CSS Approach:**
```css
/* Hide version navigation items in sidebar */
.md-sidebar--primary nav[data-md-level="3"] > label.md-nav__title {
    display: none !important;
}

.md-sidebar--primary .md-nav[data-md-level="2"] > .md-nav__list > .md-nav__item--nested > input.md-nav__toggle,
.md-sidebar--primary .md-nav[data-md-level="2"] > .md-nav__list > .md-nav__item--nested > label.md-nav__link {
    display: none !important;
}

.md-sidebar--primary .md-nav[data-md-level="3"] {
    display: block !important;
}
```

This hides the version labels (v0.6, Development) but keeps the content visible.

### Breadcrumb Generation

Use page.meta and page.url to build breadcrumb trail:

```jinja2
{% set url_parts = page.url.split('/') | reject('equalto', '') | list %}
<nav class="breadcrumb">
  {% for part in url_parts[:-1] %}
    <a href="/{{ url_parts[:loop.index] | join('/') }}/">
      {{ part | replace('-', ' ') | title }}
    </a>
    <span class="separator">/</span>
  {% endfor %}
  <span class="current">{{ page.title }}</span>
</nav>
```

---

## 📦 Dependencies

**Fonts:**
- IBM Plex Sans (Google Fonts or CDN)
- IBM Plex Mono (Google Fonts or CDN)

**Icons:**
- Material Icons (already included in Material theme)
- Lucide icons for custom icons (optional, can use Material icons)

**Existing Dependencies (Keep):**
- Material for MkDocs 9.6.17
- Python markdown extensions
- Existing JavaScript files

---

## ✅ Success Criteria

1. ✅ Visual design matches Lovable prototype
2. ✅ All existing URLs work unchanged (SEO preserved)
3. ✅ Navigation is intuitive and matches prototype flow
4. ✅ Dark mode fully functional
5. ✅ Mobile responsive (< 640px works well)
6. ✅ No broken links or 404 errors
7. ✅ Performance maintained (< 2s load time)
8. ✅ SEO metadata preserved
9. ✅ Search functionality works
10. ✅ Accessibility standards met (WCAG AA)

---

## ⏱️ Estimated Timeline

| Phase | Hours | Priority |
|-------|-------|----------|
| Phase 1: Navigation Structure | 4-6 | HIGH |
| Phase 2: Header Component | 2-3 | HIGH |
| Phase 3: Visual Design & Typography | 3-4 | HIGH |
| Phase 4: Content Area | 2-3 | MEDIUM |
| Phase 5: Table of Contents | 1-2 | MEDIUM |
| Phase 6: Additional Features | 2-3 | LOW |
| Phase 7: CSS Organization | 2 | LOW |
| Phase 8: Testing & Validation | 3-4 | HIGH |
| **TOTAL** | **19-27 hours** | |

Additional buffer: 5-8 hours for refinement and bug fixes

**Total Project Estimate: 24-35 hours**

---

## 🚀 Getting Started

1. ✅ Created branch: `feature/lovable-prototype-redesign`
2. Review this implementation plan
3. Start with Phase 1 (Navigation Structure)
4. Test after each phase completion
5. Commit changes incrementally
6. Create pull request when complete

---

## 📝 Notes

- Prototype uses React/TailwindCSS but we're implementing with Jinja2/Material theme
- Some differences are acceptable as long as visual appearance matches
- Focus on user experience and maintaining existing functionality
- All current documentation content remains unchanged
- Only updating structure, navigation, and styling

---

## 🔗 References

- **Prototype:** https://pgedge-doc-explorer.lovable.app/
- **Current Site:** https://docs.pgedge.com/
- **Material Theme Docs:** https://squidfunk.github.io/mkdocs-material/
- **Prototype Source:** /Users/apegg/PROJECTS/pgedge-doc-explorer/

---

**Last Updated:** January 14, 2026
**Author:** Implementation plan generated for pgEdge documentation redesign
