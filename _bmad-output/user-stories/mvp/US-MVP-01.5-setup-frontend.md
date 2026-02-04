# US-MVP-01.5 : Setup Workspace Frontend (Next.js)

| Métadonnée    | Valeur                                       |
| ------------- | -------------------------------------------- |
| **ID**        | US-MVP-01.5                                  |
| **Epic**      | E-MVP-01 : Setup Projet                      |
| **Milestone** | MVP                                          |
| **Priorité**  | P0                                           |
| **PRD**       | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** développeur,
**Je veux** initialiser le workspace frontend avec Next.js,
**Afin de** créer l'interface utilisateur web.

---

## Critères d'acceptance

- [x] Workspace `frontend/` créé avec son `package.json`
- [x] Next.js 15+ avec App Router
- [x] TypeScript strict
- [x] Tailwind CSS configuré
- [x] Shadcn/ui installé avec composants de base
- [x] Structure de dossiers correcte (app/, components/, lib/, hooks/)
- [x] ESLint + Prettier configurés
- [x] Variables d'environnement (`NEXT_PUBLIC_API_URL`)
- [x] Import du workspace `shared` fonctionnel
- [x] Scripts : `dev`, `build`, `start`, `compile`, `lint`

---

## Tâches techniques

- [x] Créer `frontend/package.json` avec dépendances Next.js 15+, Tailwind, shadcn/ui
- [x] Configurer `tailwind.config.ts`
- [x] Configurer `tsconfig.json` avec paths vers `shared`
- [x] Initialiser shadcn/ui avec `components.json`
- [x] Créer layout de base responsive
- [x] Valider que `yarn workspace frontend dev` fonctionne

---

## Références

- [air-tahiti-app-v2/frontend](https://github.com/devlab-io/air-tahiti-app-v2/tree/main/frontend)

---

## Dépendances

- US-MVP-01.1 : Setup Monorepo
- US-MVP-01.2 : Setup Workspace Shared

---

## Notes

Le frontend Next.js utilise l'App Router pour une meilleure performance et une navigation optimisée. Shadcn/ui fournit des composants UI modernes et accessibles.

---

## Status

**DONE** - Completed 2026-02-03

---

## File List

- `frontend/package.json` - Frontend package with Next.js 15+, React 19, Tailwind, shadcn/ui dependencies
- `frontend/tsconfig.json` - TypeScript configuration with strict mode and shared paths
- `frontend/next.config.ts` - Next.js configuration with shared package transpilation
- `frontend/tailwind.config.ts` - Tailwind CSS configuration with shadcn/ui theme
- `frontend/postcss.config.mjs` - PostCSS configuration
- `frontend/components.json` - shadcn/ui configuration
- `frontend/.env.example` - Frontend environment variables template
- `frontend/.prettierrc` - Prettier configuration with Tailwind plugin
- `frontend/next-env.d.ts` - Next.js TypeScript declarations (auto-generated)
- `frontend/src/app/layout.tsx` - Root layout with Inter font and base styling
- `frontend/src/app/page.tsx` - Home page with welcome message
- `frontend/src/app/globals.css` - Global styles with Tailwind and CSS variables
- `frontend/src/app/(auth)/layout.tsx` - Auth route group layout
- `frontend/src/components/ui/button.tsx` - shadcn/ui Button component
- `frontend/src/lib/utils.ts` - Utility functions (cn helper)
- `frontend/src/hooks/.gitkeep` - Placeholder for custom hooks

---

## Change Log

- 2026-02-03: Initial implementation of Next.js frontend with App Router, Tailwind CSS, and shadcn/ui
- 2026-02-03: [Code Review] Added Prettier configuration with Tailwind plugin
