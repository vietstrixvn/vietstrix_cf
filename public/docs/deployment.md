# Deployment

Deploy your MyDocs site to any static host in minutes.

## Vercel (recommended)

1. Push your project to GitHub.
2. Import the repository in the [Vercel dashboard](https://vercel.com).
3. Set the **Framework Preset** to _Next.js_.
4. Click **Deploy**.

Vercel will automatically rebuild on every push to `main`.

## Netlify

```bash
# Build locally first
npm run build

# Deploy with Netlify CLI
npx netlify deploy --prod --dir=out
```

Or connect your GitHub repo via the Netlify UI and set:

```
Build command:  npm run build
Publish dir:    out
```

## Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

## GitHub Pages

Add this workflow to `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```
