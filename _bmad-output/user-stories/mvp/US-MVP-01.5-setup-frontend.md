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

- [ ] Workspace `frontend/` créé avec son `package.json`
- [ ] Next.js 14+ avec App Router
- [ ] TypeScript strict
- [ ] Tailwind CSS configuré
- [ ] Shadcn/ui installé avec composants de base
- [ ] Structure de dossiers :
  ```
  frontend/src/
  ├── app/
  │   ├── layout.tsx
  │   ├── page.tsx
  │   └── (auth)/
  ├── components/
  │   └── ui/
  ├── lib/
  │   └── utils.ts
  └── hooks/
  ```
- [ ] ESLint + Prettier configurés
- [ ] Variables d'environnement (`NEXT_PUBLIC_API_URL`)
- [ ] Import du workspace `shared` fonctionnel
- [ ] Scripts : `dev`, `build`, `start`, `compile`, `lint`

---

## Tâches techniques

- [ ] Créer `frontend/package.json` avec dépendances :
  - `next`, `react`, `react-dom`
  - `tailwindcss`, `postcss`, `autoprefixer`
  - `@radix-ui/*` (via shadcn/ui)
  - `@tanstack/react-query`, `axios`
  - `react-hook-form`, `zod`, `@hookform/resolvers`
  - `lucide-react`, `clsx`, `tailwind-merge`
- [ ] Configurer `tailwind.config.js`
- [ ] Configurer `tsconfig.json` avec paths vers `shared`
- [ ] Initialiser shadcn/ui avec `components.json`
- [ ] Créer layout de base responsive
- [ ] Valider que `yarn workspace frontend dev` fonctionne

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
