# US-MVP-01.4 : Setup Workspace Backend (NestJS)

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-01.4 |
| **Epic** | E-MVP-01 : Setup Projet |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** développeur,
**Je veux** initialiser le workspace backend avec NestJS,
**Afin de** créer l'API REST de l'application.

---

## Critères d'acceptance

- [x] Workspace `services/backend/` créé avec son `package.json`
- [x] NestJS 11+ initialisé avec TypeScript strict
- [x] Structure modulaire (src/modules/, src/common/, src/config/)
- [x] TypeORM configuré avec PostgreSQL
- [x] ConfigModule avec validation des variables d'environnement
- [x] Swagger/OpenAPI configuré sur `/api/docs`
- [x] Health check endpoint `/` fonctionnel
- [x] ESLint + Prettier configurés
- [x] Scripts : `dev`, `build`, `start`, `compile`, `lint`, `test`
- [x] Import du workspace `shared` fonctionnel

---

## Tâches techniques

- [x] Créer `services/backend/package.json` avec dépendances NestJS 11+
- [x] Créer `services/backend/tsconfig.json` avec paths vers `shared`
- [x] Créer `services/backend/nest-cli.json`
- [x] Créer `services/backend/.env.example`
- [x] Créer structure `services/backend/src/` avec main.ts, app.module.ts, etc.
- [x] Configurer Swagger avec titre "Faatere API"
- [x] Valider que `yarn workspace backend dev` fonctionne

---

## Références

- [air-tahiti-app-v2/services/backend](https://github.com/devlab-io/air-tahiti-app-v2/tree/main/services/backend)

---

## Dépendances

- US-MVP-01.1 : Setup Monorepo
- US-MVP-01.2 : Setup Workspace Shared

---

## Notes

Le backend NestJS est le coeur de l'application. Il expose l'API REST consommée par le frontend web et l'application mobile.

---

## Status

**DONE** - Completed 2026-02-03

---

## File List

- `services/backend/package.json` - Backend package with NestJS 11+ dependencies
- `services/backend/tsconfig.json` - TypeScript configuration with strict mode and shared paths
- `services/backend/nest-cli.json` - NestJS CLI configuration
- `services/backend/.env.example` - Backend environment variables template
- `services/backend/eslint.config.mjs` - ESLint flat config
- `services/backend/.prettierrc` - Prettier configuration
- `services/backend/src/main.ts` - Application entry point with Swagger setup
- `services/backend/src/app.module.ts` - Root module with TypeORM, ConfigModule and validation
- `services/backend/src/app.controller.ts` - Health check controller
- `services/backend/src/app.service.ts` - Health check service
- `services/backend/src/app.controller.spec.ts` - Unit tests for controller
- `services/backend/src/config/configuration.ts` - Environment configuration
- `services/backend/src/config/validation.schema.ts` - Joi validation schema for env vars
- `services/backend/src/modules/.gitkeep` - Placeholder for feature modules
- `services/backend/src/common/.gitkeep` - Placeholder for shared utilities

---

## Change Log

- 2026-02-03: Initial implementation of NestJS backend with TypeORM, Swagger, health check, and tests
- 2026-02-03: [Code Review] Added Joi validation schema, modular directory structure, strict TypeScript mode
