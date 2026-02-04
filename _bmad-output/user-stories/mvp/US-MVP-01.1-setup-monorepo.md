# US-MVP-01.1 : Setup Monorepo avec Yarn Workspaces

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-01.1 |
| **Epic** | E-MVP-01 : Setup Projet |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |
| **Status** | Done |

---

## User Story

**En tant que** développeur,
**Je veux** initialiser un monorepo avec Yarn Workspaces,
**Afin d'** avoir une structure de projet unifiée et des dépendances partagées.

---

## Contexte

> **Note Architecture** : Cette section est basée sur la structure monorepo utilisée dans les projets Air Tahiti (air-tahiti-app-v2, air-tahiti-nui-v2) avec Yarn Workspaces.

### Structure cible du monorepo

```
faatere/
├── package.json              # Racine monorepo avec workspaces
├── yarn.lock                 # Lock file unique pour tout le projet
├── docker-compose.yml        # Services dev local (PostgreSQL, MinIO)
├── .env.example              # Template variables d'environnement
├── .gitignore
├── tsconfig.json             # Config TypeScript de base (extends)
├── frontend/                 # Next.js (workspace)
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
├── mobile/                   # React Native Expo (workspace) - V1.1
│   ├── package.json
│   └── src/
├── services/
│   └── backend/              # NestJS (workspace)
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
├── shared/                   # Types & interfaces partagés (workspace)
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
└── _bmad-output/             # Documentation projet
```

---

## Critères d'acceptance

- [x] `package.json` racine avec configuration `workspaces`
- [x] Workspaces déclarés : `frontend`, `mobile`, `services/backend`, `shared`
- [x] Scripts racine pour orchestrer les commandes (dev, build, lint, test)
- [x] `yarn.lock` unique à la racine
- [x] `.gitignore` complet (node_modules, .env, build outputs, etc.)
- [x] `packageManager` défini : `yarn@1.22.22`
- [x] Husky configuré pour pre-commit hooks

---

## Tâches techniques

- [x] Créer `package.json` racine avec :
  ```json
  {
    "name": "faatere",
    "private": true,
    "workspaces": [
      "frontend",
      "mobile",
      "services/backend",
      "shared"
    ],
    "scripts": {
      "postinstall": "husky",
      "dev": "yarn workspace backend dev",
      "dev:frontend": "yarn workspace frontend dev",
      "dev:backend": "yarn workspace backend dev",
      "build": "yarn workspaces run build",
      "lint": "yarn workspaces run lint",
      "test": "yarn workspaces run test",
      "compile": "yarn workspaces run compile"
    },
    "devDependencies": {
      "husky": "^9.1.7"
    },
    "packageManager": "yarn@1.22.22"
  }
  ```
- [x] Créer la structure de dossiers vides
- [x] Configurer `.gitignore` complet
- [x] Exécuter `yarn install` pour valider la configuration

---

## Références

- [air-tahiti-app-v2/package.json](https://github.com/devlab-io/air-tahiti-app-v2)

---

## Dépendances

- Aucune (première US du projet)

---

## Notes

Cette US établit les fondations du projet. Toutes les autres US MVP dépendent de cette configuration initiale.

---

## Dev Agent Record

### Implementation Date
2026-02-03

### Commit
`c485a63` - feat(monorepo): setup Yarn Workspaces and shared types

### File List
- `package.json` - Root monorepo config with workspaces
- `yarn.lock` - Generated lockfile
- `tsconfig.json` - Base TypeScript config
- `.gitignore` - Enhanced with build outputs, IDE files, coverage
- `.env.example` - Environment variables template
- `.husky/pre-commit` - Pre-commit hook running `yarn compile`
- `frontend/package.json` - Frontend workspace placeholder
- `mobile/package.json` - Mobile workspace placeholder
- `services/backend/package.json` - Backend workspace placeholder

### Notes
- Added `license: "UNLICENSED"` to root package.json (private project)
- Pre-commit hook runs TypeScript compilation across all workspaces
- Placeholder workspaces have stub scripts for dev/build/lint/test/compile
