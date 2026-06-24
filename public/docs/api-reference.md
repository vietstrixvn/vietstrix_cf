# API Reference

Complete reference for the MyDocs JavaScript / TypeScript API.

## `defineConfig(options)`

Creates a fully-typed configuration object.

```ts
import { defineConfig } from 'mydocs';

const config = defineConfig({ title: 'My Docs' });
```

**Parameters**

| Parameter | Type         | Required |
| --------- | ------------ | -------- |
| `options` | `DocsConfig` | ✅       |

**Returns** `DocsConfig`

---

## `useDoc(slug)`

React hook that returns the parsed document for a given slug.

```ts
const { frontmatter, content, toc } = useDoc('getting-started');
```

**Returns**

```ts
interface DocResult {
  frontmatter: Record<string, unknown>;
  content: string; // HTML string
  toc: TocItem[];
}
```

---

## `renderMarkdown(source)`

Transforms raw Markdown into sanitised HTML.

```ts
import { renderMarkdown } from 'mydocs/markdown';

const html = await renderMarkdown('# Hello **world**');
// → "<h1>Hello <strong>world</strong></h1>"
```

## Error codes

| Code             | Meaning                            |
| ---------------- | ---------------------------------- |
| `DOC_NOT_FOUND`  | Slug does not map to any document  |
| `CONFIG_INVALID` | `docs.config.ts` failed validation |
| `BUILD_FAILED`   | Static build encountered an error  |
