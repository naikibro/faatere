# US-MVP-01.1 : Setup Monorepo avec Yarn Workspaces

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-01.1 |
| **Epic** | E-MVP-01 : Setup Projet |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

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

- [ ] `package.json` racine avec configuration `workspaces`
- [ ] Workspaces déclarés : `frontend`, `mobile`, `services/backend`, `shared`
- [ ] Scripts racine pour orchestrer les commandes (dev, build, lint, test)
- [ ] `yarn.lock` unique à la racine
- [ ] `.gitignore` complet (node_modules, .env, build outputs, etc.)
- [ ] `packageManager` défini : `yarn@1.22.22`
- [ ] Husky configuré pour pre-commit hooks

---

## Tâches techniques

- [ ] Créer `package.json` racine avec :
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
- [ ] Créer la structure de dossiers vides
- [ ] Configurer `.gitignore` complet
- [ ] Exécuter `yarn install` pour valider la configuration

---

## Références

- [air-tahiti-app-v2/package.json](https://github.com/devlab-io/air-tahiti-app-v2)

---

## Dépendances

- Aucune (première US du projet)

---

## Notes

Cette US établit les fondations du projet. Toutes les autres US MVP dépendent de cette configuration initiale.
