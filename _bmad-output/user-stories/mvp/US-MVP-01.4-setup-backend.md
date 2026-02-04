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

- [ ] Workspace `services/backend/` créé avec son `package.json`
- [ ] NestJS 11+ initialisé avec TypeScript strict
- [ ] Structure modulaire (src/modules/, src/common/, src/config/)
- [ ] TypeORM configuré avec PostgreSQL
- [ ] ConfigModule avec validation des variables d'environnement
- [ ] Swagger/OpenAPI configuré sur `/api/docs`
- [ ] Health check endpoint `/` fonctionnel
- [ ] ESLint + Prettier configurés
- [ ] Scripts : `dev`, `build`, `start`, `compile`, `lint`, `test`
- [ ] Import du workspace `shared` fonctionnel

---

## Tâches techniques

- [ ] Créer `services/backend/package.json` avec dépendances :
  - `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`
  - `@nestjs/config`, `@nestjs/typeorm`, `@nestjs/swagger`
  - `@nestjs/passport`, `@nestjs/jwt`
  - `typeorm`, `pg`, `class-validator`, `class-transformer`
  - `bcrypt`, `passport`, `passport-jwt`, `passport-local`
- [ ] Créer `services/backend/tsconfig.json` avec paths vers `shared`
- [ ] Créer `services/backend/nest-cli.json`
- [ ] Créer `services/backend/.env.example`
- [ ] Créer structure `services/backend/src/` :
  ```
  src/
  ├── main.ts
  ├── app.module.ts
  ├── app.controller.ts
  ├── app.service.ts
  └── config/
      └── configuration.ts
  ```
- [ ] Configurer Swagger avec titre "Faatere API"
- [ ] Valider que `yarn workspace backend dev` fonctionne

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
