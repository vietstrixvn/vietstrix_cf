# Configuration

MyDocs is configured via `docs.config.ts` at the root of your project.

## Basic example

```ts
// docs.config.ts
import { defineConfig } from 'mydocs';

export default defineConfig({
  title: 'My Project',
  description: 'Awesome documentation',
  logo: '/logo.svg',
  nav: [
    { text: 'Guide', link: '/docs/getting-started' },
    { text: 'API', link: '/docs/api-reference' },
  ],
});
```

## Options reference

| Key           | Type                | Default     | Description                         |
| ------------- | ------------------- | ----------- | ----------------------------------- |
| `title`       | `string`            | `"Docs"`    | Site title shown in the browser tab |
| `description` | `string`            | `""`        | Meta description for SEO            |
| `logo`        | `string`            | `undefined` | Path to your logo image             |
| `nav`         | `NavItem[]`         | `[]`        | Top navigation links                |
| `sidebar`     | `SidebarItem[]`     | auto        | Sidebar structure                   |
| `theme`       | `"light" \| "dark"` | `"light"`   | Default colour scheme               |

## Custom sidebar

Override the auto-generated sidebar with a manual structure:

```ts
sidebar: [
  {
    text: 'Introduction',
    items: [
      { text: 'Getting Started', link: '/docs/getting-started' },
      { text: 'Configuration', link: '/docs/configuration' },
    ],
  },
];
```

## Environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
ANALYTICS_ID=UA-XXXXXXXXX
```
