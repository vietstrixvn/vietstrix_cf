# Changelog

All notable changes to MyDocs are documented here.

---

## v2.3.0 — 2026-04-15

### ✨ New features

- **Hash-based navigation** — switch between sections without a full page reload
- `<Tabs>` component now supports keyboard navigation (← →)
- Added `renderMarkdown` utility to the public API

### 🐛 Bug fixes

- Fixed sidebar active state not updating on back/forward navigation
- Resolved flash of unstyled content on first paint

### ⚡ Performance

- Reduced JS bundle by ~18 kB by tree-shaking unused highlight.js languages

---

## v2.2.0 — 2026-03-01

### ✨ New features

- Dark mode (opt-in via `theme: "dark"` in config)
- `<Callout>` now supports a custom `title` prop

### 🐛 Bug fixes

- Table of contents links were off by one heading level
- `useDoc` hook returned stale data after fast navigation

---

## v2.1.0 — 2026-01-20

### ✨ New features

- Algolia DocSearch integration
- `<Steps>` and `<CodeGroup>` components

---

## v2.0.0 — 2025-12-01

Initial stable release of the v2 rewrite.

- Complete TypeScript rewrite
- New plugin system
- MDX support
- Improved build performance (3× faster than v1)
