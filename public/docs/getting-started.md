# Getting Started

Welcome to **MyDocs** — the fastest way to ship great documentation.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** v18 or higher
- **npm** v9+ or **pnpm** v8+
- A code editor (we recommend VS Code)

## Installation

Run the following command to scaffold a new project:

```bash
npx create-mydocs@latest my-project
cd my-project
npm install
```

## Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the welcome screen.

> **Tip:** Hot-reload is enabled by default. Every change you save is reflected instantly.

## Project structure

```
my-project/
├── docs/          # Your Markdown files live here
├── public/        # Static assets
├── src/
│   └── components/
├── package.json
└── docs.config.ts # Global configuration
```

You're all set! Head over to [Configuration](#configuration) to customise your setup.
