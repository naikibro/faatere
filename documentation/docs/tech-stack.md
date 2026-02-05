---
id: tech-stack
title: Tech Stack
---

# Tech Stack

This document explains our technology choices and the reasoning behind each decision.

---

## Backend: NestJS

| Technology | Version |
| ---------- | ------- |
| NestJS | 10.x |
| TypeORM | 0.3.x |
| PostgreSQL | 16 |

### Why NestJS?

We chose NestJS over alternatives like Express or Fastify for several reasons:

1. **Opinionated structure**: NestJS enforces a modular architecture with dependency injection, which scales well as the codebase grows. This is critical for a project with multiple domains (members, tomites, users).

2. **TypeScript-first**: Unlike Express where TypeScript is bolted on, NestJS is built from the ground up with TypeScript. This provides better type safety and IDE support.

3. **Built-in validation**: The integration with `class-validator` allows us to define DTOs with decorators, ensuring data integrity at the API boundary without manual validation code.

4. **Enterprise patterns**: Guards, interceptors, and pipes provide clean separation of concerns for authentication, logging, and data transformation.

### Why TypeORM?

TypeORM was selected over Prisma or Drizzle because:

1. **Decorator-based entities**: Entity definitions live alongside the code, making it easier to understand the data model when reading service code.

2. **Migration support**: TypeORM generates migrations from entity changes, which is essential for production deployments on Railway.

3. **Repository pattern**: The built-in repository pattern aligns with NestJS's dependency injection, making services testable.

---

## Frontend: Next.js

| Technology | Version |
| ---------- | ------- |
| Next.js | 14.x |
| React | 18.x |
| TailwindCSS | 3.x |

### Why Next.js?

Next.js was chosen over Create React App or Vite for these reasons:

1. **Server Components**: React Server Components reduce client-side JavaScript bundle size, improving performance on slower connections common in remote Polynesian islands.

2. **App Router**: The file-based routing with layouts simplifies navigation structure and enables route-level data fetching.

3. **Vercel deployment**: Next.js deploys seamlessly to Vercel with zero configuration, which is our target production platform.

4. **API Routes**: For simple operations, we can create API routes directly in Next.js, reducing round-trips to the backend.

### Why TailwindCSS?

TailwindCSS was selected over CSS Modules or styled-components because:

1. **Rapid prototyping**: Utility classes allow fast UI iteration without context-switching between files.

2. **Consistency**: The design token system (spacing, colors, typography) enforces visual consistency across the application.

3. **Bundle size**: Tailwind purges unused styles in production, resulting in minimal CSS footprint.

---

## Mobile: React Native + Expo

| Technology | Version |
| ---------- | ------- |
| React Native | 0.73+ |
| Expo | 50+ |
| WatermelonDB | - |

### Why React Native?

React Native was chosen over Flutter or native development because:

1. **Code sharing**: Components and business logic can be shared with the web frontend, reducing development time.

2. **JavaScript ecosystem**: The team's expertise is in TypeScript/JavaScript, avoiding the learning curve of Dart (Flutter) or Swift/Kotlin.

3. **Expo**: The Expo framework simplifies development, testing, and deployment, especially for a small team.

### Why WatermelonDB for Offline?

WatermelonDB was selected over Realm or SQLite directly because:

1. **React integration**: WatermelonDB provides React hooks and observables that integrate naturally with our component architecture.

2. **Sync protocol**: Built-in sync primitives make it straightforward to implement the push/pull synchronization with our backend.

3. **Performance**: Lazy loading and observable queries ensure the UI stays responsive even with large datasets.

---

## Infrastructure

| Technology | Purpose |
| ---------- | ------- |
| Docker | Local development |
| Railway | Backend hosting |
| Vercel | Frontend hosting |
| Railway S3 | File storage |

### Why Railway for Backend?

Railway was chosen over AWS, Heroku, or Render because:

1. **Simplicity**: Railway deploys directly from GitHub with automatic builds, no CI/CD configuration required.

2. **PostgreSQL included**: Managed PostgreSQL is included with automatic backups, eliminating database administration overhead.

3. **Cost-effective**: The usage-based pricing model is suitable for a project with variable traffic.

### Why Vercel for Frontend?

Vercel is the natural choice for Next.js deployment:

1. **Zero config**: Next.js features like ISR and Edge Functions work automatically on Vercel.

2. **Global CDN**: Static assets are served from edge locations worldwide, important for users across Pacific islands.

3. **Preview deployments**: Every pull request gets a preview URL for testing before merge.
