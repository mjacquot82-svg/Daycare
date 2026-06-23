# Daycare

This repository is initialized with a standard **React + Vite** application.

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Deployment

The app is deployed on **Vercel**. A `vercel.json` file is included at the repository root to configure client-side routing (SPA rewrites), which is required for React Router to work correctly on direct URL navigation.

### Deploy to Vercel

1. Install the Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```
2. From the repository root, run:
   ```bash
   vercel
   ```
   Follow the prompts to link the project to your Vercel account.
3. For production deployments, push to the default branch (e.g. `main`) — Vercel's GitHub integration will automatically trigger a new build and deploy.

### Update an existing deployment

- **Automatic**: Any push to the linked branch triggers a re-deploy via Vercel's GitHub integration.
- **Manual**: Run `vercel --prod` from the repository root to deploy the current local build to production.

### Configuration

| Setting | Value |
|---------|-------|
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

The `vercel.json` rewrite rule ensures all routes are served by `index.html`, enabling client-side navigation to `/child-profile` and `/attendance` without 404 errors.
