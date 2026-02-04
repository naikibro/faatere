# Product Requirements Document (PRD) - FAATERE

**Application de gestion des adhérents pour partis politiques polynésiens**

---

| Métadonnée | Valeur |
|------------|--------|
| **Nom du projet** | Faatere ("Diriger") |
| **Version PRD** | 1.0 |
| **Date** | 3 février 2026 |
| **Product Owner** | Naiki |
| **Équipe** | 1 développeur (solo) |
| **Référence** | [Cahier des charges V1](./cahier-des-charges-faatere-v1.md) |

---

## Table des matières

1. [Vision produit](#1-vision-produit)
2. [Roadmap et milestones](#2-roadmap-et-milestones)
3. [MVP - Spécifications détaillées](#3-mvp---spécifications-détaillées)
4. [V1.0 - Spécifications détaillées](#4-v10---spécifications-détaillées)
5. [V1.1 - Spécifications détaillées](#5-v11---spécifications-détaillées)
6. [Exigences non fonctionnelles](#6-exigences-non-fonctionnelles)
7. [Dépendances techniques](#7-dépendances-techniques)
8. [Risques et mitigations](#8-risques-et-mitigations)
9. [Critères de succès](#9-critères-de-succès)

---

## 1. Vision produit

### 1.1 Énoncé de vision

> Faatere permet aux partis politiques polynésiens de gérer efficacement leurs adhérents et tomités avec une traçabilité complète, remplaçant les fichiers Excel par une solution moderne, sécurisée et accessible sur toutes les plateformes.

### 1.2 Proposition de valeur

| Pour | Qui | Faatere est |
|------|-----|-------------|
| Membres du Bureau | Ont besoin de visibilité globale sur le parti | Un tableau de bord centralisé avec statistiques en temps réel |
| Présidents de Tomité | Gèrent leurs adhérents localement | Un outil de gestion autonome et cloisonné |
| Secrétaires | Ajoutent des adhérents sur le terrain | Une app mobile rapide fonctionnant hors-ligne |

### 1.3 Personas

#### Persona 1 : Teva - Membre du Bureau
- **Âge** : 55 ans
- **Rôle** : Président du parti
- **Objectifs** : Voir l'évolution du nombre d'adhérents, identifier les tomités performants
- **Frustrations actuelles** : Doit compiler manuellement les Excel de chaque tomité
- **Usage** : Web uniquement, depuis son bureau

#### Persona 2 : Moana - Présidente de Tomité
- **Âge** : 42 ans
- **Rôle** : Présidente du Tomité Papeete
- **Objectifs** : Gérer les adhérents de son tomité, déléguer aux secrétaires
- **Frustrations actuelles** : Conflits de données avec les secrétaires sur Excel
- **Usage** : Web et mobile

#### Persona 3 : Hina - Secrétaire
- **Âge** : 28 ans
- **Rôle** : Secrétaire du Tomité Faa'a
- **Objectifs** : Inscrire rapidement les nouveaux adhérents lors des réunions
- **Frustrations actuelles** : Pas de réseau sur certains sites, doit noter sur papier
- **Usage** : Principalement mobile, sur le terrain

---

## 2. Roadmap et milestones

### 2.1 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ROADMAP FAATERE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐                 │
│  │    MVP      │ ───▶ │    V1.0     │ ───▶ │    V1.1     │                 │
│  │             │      │             │      │             │                 │
│  │  Backend    │      │  Features   │      │   Mobile    │                 │
│  │  + Web UI   │      │  complètes  │      │  Offline    │                 │
│  │  Core       │      │             │      │             │                 │
│  └─────────────┘      └─────────────┘      └─────────────┘                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Scope par milestone

| Feature | MVP | V1.0 | V1.1 |
|---------|-----|------|------|
| **Authentification** | ✅ | ✅ | ✅ |
| Auth email/password | ✅ | ✅ | ✅ |
| Invitation par token | ✅ | ✅ | ✅ |
| Gestion users (Bureau) | ✅ | ✅ | ✅ |
| **Tomités** | ✅ | ✅ | ✅ |
| CRUD Tomités | ✅ | ✅ | ✅ |
| **Adhérents** | ✅ | ✅ | ✅ |
| CRUD Adhérents | ✅ | ✅ | ✅ |
| Validation 18+ | ✅ | ✅ | ✅ |
| Détection doublons | ✅ | ✅ | ✅ |
| Upload photo (galerie) | ✅ | ✅ | ✅ |
| Transfert adhérent | ✅ | ✅ | ✅ |
| **Recherche** | ✅ | ✅ | ✅ |
| Super search bar | ✅ | ✅ | ✅ |
| **Paiement** | ✅ | ✅ | ✅ |
| Statut hasPaid | ✅ | ✅ | ✅ |
| Méthode de paiement | ✅ | ✅ | ✅ |
| **RBAC** | ✅ | ✅ | ✅ |
| Rôles Bureau/Président/Secrétaire | ✅ | ✅ | ✅ |
| Cloisonnement par tomité | ✅ | ✅ | ✅ |
| **i18n** | ✅ | ✅ | ✅ |
| Structure FR/TY | ✅ | ✅ | ✅ |
| **Dashboard** | ❌ | ✅ | ✅ |
| Stats globales | ❌ | ✅ | ✅ |
| Évolution temporelle | ❌ | ✅ | ✅ |
| Top tomités | ❌ | ✅ | ✅ |
| Derniers adhérents | ❌ | ✅ | ✅ |
| **Export** | ❌ | ✅ | ✅ |
| Export CSV | ❌ | ✅ | ✅ |
| Export PDF | ❌ | ✅ | ✅ |
| Filtres export | ❌ | ✅ | ✅ |
| **Cartes adhérent** | ❌ | ✅ | ✅ |
| Génération PDF | ❌ | ✅ | ✅ |
| Google Wallet | ❌ | ✅ | ✅ |
| Apple Wallet | ❌ | ✅ | ✅ |
| **Audit** | ❌ | ✅ | ✅ |
| Logs de mutations | ❌ | ✅ | ✅ |
| Consultation logs | ❌ | ✅ | ✅ |
| **Emails** | ❌ | ✅ | ✅ |
| Envoi par tomité | ❌ | ✅ | ✅ |
| Envoi par filtre | ❌ | ✅ | ✅ |
| **Mobile** | ❌ | ❌ | ✅ |
| App React Native | ❌ | ❌ | ✅ |
| Photo caméra | ❌ | ❌ | ✅ |
| Mode offline | ❌ | ❌ | ✅ |
| Sync & résolution conflits | ❌ | ❌ | ✅ |

---

## 3. MVP - Spécifications détaillées

### 3.1 Épics MVP

| ID | Épic | Description |
|----|------|-------------|
| E-MVP-01 | Setup Projet | Configuration initiale backend + frontend |
| E-MVP-02 | Authentification | Système d'auth complet |
| E-MVP-03 | Gestion Tomités | CRUD tomités |
| E-MVP-04 | Gestion Adhérents | CRUD adhérents avec validations |
| E-MVP-05 | Recherche | Super search bar |
| E-MVP-06 | RBAC | Permissions par rôle |
| E-MVP-07 | i18n | Structure internationalisation |

---

### 3.2 E-MVP-01 : Setup Projet Monorepo

> **Note Architecture** : Cette section est basée sur la structure monorepo utilisée dans les projets Air Tahiti (air-tahiti-app-v2, air-tahiti-nui-v2) avec Yarn Workspaces.

#### Structure cible du monorepo

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

#### US-MVP-01.1 : Setup Monorepo avec Yarn Workspaces

**En tant que** développeur,
**Je veux** initialiser un monorepo avec Yarn Workspaces,
**Afin d'** avoir une structure de projet unifiée et des dépendances partagées.

**Critères d'acceptance :**
- [ ] `package.json` racine avec configuration `workspaces`
- [ ] Workspaces déclarés : `frontend`, `mobile`, `services/backend`, `shared`
- [ ] Scripts racine pour orchestrer les commandes (dev, build, lint, test)
- [ ] `yarn.lock` unique à la racine
- [ ] `.gitignore` complet (node_modules, .env, build outputs, etc.)
- [ ] `packageManager` défini : `yarn@1.22.22`
- [ ] Husky configuré pour pre-commit hooks

**Tâches techniques :**
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

**Référence** : [air-tahiti-app-v2/package.json](https://github.com/devlab-io/air-tahiti-app-v2)

---

#### US-MVP-01.2 : Setup Workspace Shared (Types partagés)

**En tant que** développeur,
**Je veux** créer un workspace `shared` avec les types TypeScript partagés,
**Afin de** réutiliser les interfaces et enums entre frontend, backend et mobile.

**Critères d'acceptance :**
- [ ] Workspace `shared/` créé avec son `package.json`
- [ ] `tsconfig.json` configuré pour compilation
- [ ] Enums définis : `UserRole`, `PaymentMethod`
- [ ] Interfaces définies : `IUser`, `IMember`, `ITomite`, `IInvitation`
- [ ] Export centralisé via `index.ts`
- [ ] Script `build` fonctionnel

**Tâches techniques :**
- [ ] Créer `shared/package.json` :
  ```json
  {
    "name": "shared",
    "version": "1.0.0",
    "private": true,
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "scripts": {
      "build": "tsc",
      "compile": "tsc --noEmit"
    },
    "devDependencies": {
      "typescript": "^5.7.3"
    }
  }
  ```
- [ ] Créer structure `shared/src/` :
  ```
  shared/src/
  ├── index.ts
  ├── enums/
  │   ├── role.enum.ts
  │   └── payment-method.enum.ts
  └── interfaces/
      ├── user.interface.ts
      ├── member.interface.ts
      └── tomite.interface.ts
  ```
- [ ] Définir les enums et interfaces selon le schéma de données du cahier des charges

**Contenu des fichiers :**

`shared/src/enums/role.enum.ts` :
```typescript
export enum UserRole {
  BOARD = 'BOARD',
  TOMITE_PRESIDENT = 'TOMITE_PRESIDENT',
  SECRETARY = 'SECRETARY',
}
```

`shared/src/enums/payment-method.enum.ts` :
```typescript
export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  TRANSFER = 'TRANSFER',
}
```

**Référence** : [air-tahiti-app-v2/shared](https://github.com/devlab-io/air-tahiti-app-v2/tree/main/shared)

---

#### US-MVP-01.3 : Setup Docker Compose (Dev Environment)

**En tant que** développeur,
**Je veux** configurer Docker Compose pour les services de développement,
**Afin de** lancer facilement PostgreSQL et MinIO en local.

**Critères d'acceptance :**
- [ ] `docker-compose.yml` à la racine du projet
- [ ] Service PostgreSQL 16 configuré
- [ ] Service Adminer pour UI de base de données
- [ ] Service MinIO pour stockage S3-compatible (photos)
- [ ] Volumes persistants pour les données
- [ ] Health checks configurés
- [ ] `.env.example` avec toutes les variables nécessaires

**Tâches techniques :**
- [ ] Créer `docker-compose.yml` :
  ```yaml
  version: '3.8'
  services:
    postgres:
      image: postgres:16-alpine
      container_name: faatere-postgres
      environment:
        POSTGRES_DB: faatere
        POSTGRES_USER: faatere
        POSTGRES_PASSWORD: faatere_dev_password
      ports:
        - '5432:5432'
      volumes:
        - postgres_data:/var/lib/postgresql/data
      healthcheck:
        test: ['CMD-SHELL', 'pg_isready -U faatere']
        interval: 10s
        timeout: 5s
        retries: 5

    adminer:
      image: adminer:latest
      container_name: faatere-adminer
      ports:
        - '8080:8080'
      depends_on:
        - postgres

    minio:
      image: minio/minio:latest
      container_name: faatere-minio
      command: server /data --console-address ":9001"
      environment:
        MINIO_ROOT_USER: minioadmin
        MINIO_ROOT_PASSWORD: minioadmin
      ports:
        - '9000:9000'
        - '9001:9001'
      volumes:
        - minio_data:/data

  volumes:
    postgres_data:
    minio_data:
  ```
- [ ] Créer `.env.example` avec variables pour tous les services

**Référence** : [air-tahiti-app-v2/docker-compose.yml](https://github.com/devlab-io/air-tahiti-app-v2)

---

#### US-MVP-01.4 : Setup Workspace Backend (NestJS)

**En tant que** développeur,
**Je veux** initialiser le workspace backend avec NestJS,
**Afin de** créer l'API REST de l'application.

**Critères d'acceptance :**
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

**Tâches techniques :**
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

**Référence** : [air-tahiti-app-v2/services/backend](https://github.com/devlab-io/air-tahiti-app-v2/tree/main/services/backend)

---

#### US-MVP-01.5 : Setup Workspace Frontend (Next.js)

**En tant que** développeur,
**Je veux** initialiser le workspace frontend avec Next.js,
**Afin de** créer l'interface utilisateur web.

**Critères d'acceptance :**
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

**Tâches techniques :**
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

**Référence** : [air-tahiti-app-v2/frontend](https://github.com/devlab-io/air-tahiti-app-v2/tree/main/frontend)

---

#### US-MVP-01.6 : Setup Workspace Mobile (Expo) - Placeholder V1.1

**En tant que** développeur,
**Je veux** créer le placeholder pour le workspace mobile,
**Afin de** préparer l'intégration future de l'app React Native.

**Critères d'acceptance :**
- [ ] Workspace `mobile/` créé avec `package.json` minimal
- [ ] README indiquant que l'implémentation est prévue pour V1.1
- [ ] Structure de base préparée

**Tâches techniques :**
- [ ] Créer `mobile/package.json` minimal :
  ```json
  {
    "name": "mobile",
    "version": "1.0.0",
    "private": true,
    "description": "Faatere Mobile App - React Native Expo (V1.1)",
    "scripts": {
      "placeholder": "echo 'Mobile app will be implemented in V1.1'"
    }
  }
  ```
- [ ] Créer `mobile/README.md` avec note sur V1.1

**Note** : L'implémentation complète du mobile est dans la section V1.1 du PRD.

---

#### US-MVP-01.7 : Setup Gestion des Configurations et Secrets

**En tant que** développeur,
**Je veux** mettre en place une gestion structurée des variables d'environnement,
**Afin de** sécuriser les secrets et faciliter le déploiement multi-environnements.

**Critères d'acceptance :**
- [ ] `.env.example` à la racine avec toutes les variables globales
- [ ] `.env.example` dans chaque workspace avec variables spécifiques
- [ ] `.gitignore` configuré pour exclure tous les `.env` sauf `.env.example`
- [ ] Documentation des variables dans chaque `.env.example`
- [ ] Validation des variables requises au démarrage (ConfigModule NestJS)

**Structure des fichiers de configuration :**

```
faatere/
├── .env.example              # Variables globales (racine)
├── .env                      # Variables locales (gitignored)
├── frontend/
│   └── .env.example          # Variables frontend spécifiques
├── mobile/
│   └── .env.example          # Variables mobile spécifiques
└── services/backend/
    └── .env.example          # Variables backend spécifiques
```

**Tâches techniques :**

- [ ] Créer `.env.example` racine avec variables communes :
  ```bash
  # ========================================
  # FAATERE - Configuration Globale
  # ========================================

  # Project
  PROJECT_NAME="Faatere"
  NODE_ENV=development

  # Database
  DATABASE_HOST=localhost
  DATABASE_PORT=5432
  DATABASE_NAME=faatere
  DATABASE_USER=faatere
  DATABASE_PASSWORD=your_password_here
  DATABASE_URL=postgresql://faatere:your_password_here@localhost:5432/faatere

  # JWT
  JWT_SECRET=your_jwt_secret_min_32_chars
  JWT_EXPIRATION=24h
  JWT_REFRESH_EXPIRATION=7d

  # Services URLs
  BACKEND_PORT=3001
  BACKEND_URL=http://localhost:3001
  FRONTEND_PORT=3000
  FRONTEND_URL=http://localhost:3000

  # S3 Storage (MinIO for dev)
  S3_ENDPOINT=http://localhost:9000
  S3_ACCESS_KEY=minioadmin
  S3_SECRET_KEY=minioadmin
  S3_BUCKET=faatere-uploads
  S3_REGION=auto

  # Email (Resend)
  RESEND_API_KEY=
  EMAIL_FROM=noreply@faatere.pf

  # Board Users (initial migration)
  # Format: email1:password1,email2:password2
  BOARD_USERS=admin@faatere.pf:changeme123
  ```

- [ ] Créer `services/backend/.env.example` avec variables spécifiques backend :
  ```bash
  # ========================================
  # Backend Service Configuration
  # ========================================

  # Server
  PORT=3001
  NODE_ENV=development
  FRONTEND_URL=http://localhost:3000

  # Database (override if different from root)
  DATABASE_HOST=localhost
  DATABASE_PORT=5432
  DATABASE_NAME=faatere
  DATABASE_USER=faatere
  DATABASE_PASSWORD=faatere_dev_password
  DATABASE_URL=postgresql://faatere:faatere_dev_password@localhost:5432/faatere

  # Test Database
  TEST_DATABASE_HOST=localhost
  TEST_DATABASE_PORT=5433
  TEST_DATABASE_NAME=faatere_test
  TEST_DATABASE_URL=postgresql://faatere:faatere_dev_password@localhost:5433/faatere_test

  # JWT
  JWT_SECRET=your_jwt_secret_min_32_chars
  JWT_EXPIRATION=24h

  # MinIO (local S3)
  USE_MINIO=true
  MINIO_ENDPOINT=http://localhost:9000
  MINIO_ACCESS_KEY=minioadmin
  MINIO_SECRET_KEY=minioadmin
  MINIO_BUCKET=faatere-uploads

  # Email
  RESEND_API_KEY=
  EMAIL_FROM=noreply@faatere.pf

  # Board Users
  BOARD_USERS=admin@faatere.pf:changeme123
  ```

- [ ] Créer `frontend/.env.example` :
  ```bash
  # ========================================
  # Frontend Configuration
  # ========================================

  NEXT_PUBLIC_API_URL=http://localhost:3001
  NEXT_PUBLIC_APP_NAME=Faatere
  ```

- [ ] Configurer validation des variables dans NestJS avec `@nestjs/config` et `Joi`

**Référence** : [air-tahiti-app-v2/.env.example](https://github.com/devlab-io/air-tahiti-app-v2)

---

#### US-MVP-01.8 : Setup Dockerfiles pour les services

**En tant que** développeur,
**Je veux** créer les Dockerfiles pour chaque service,
**Afin de** containeriser l'application pour le développement et la production.

**Critères d'acceptance :**
- [ ] Dockerfile backend avec multi-stage build (builder + production)
- [ ] Dockerfile frontend pour développement
- [ ] `.dockerignore` à la racine pour optimiser les builds
- [ ] Support du hot-reload en mode développement
- [ ] Build optimisé pour la production

**Tâches techniques :**

- [ ] Créer `services/backend/Dockerfile` :
  ```dockerfile
  # ========================================
  # Build stage
  # ========================================
  FROM node:20-alpine AS builder
  WORKDIR /app

  # Install yarn
  RUN apk add --no-cache yarn

  # Copy shared directory
  COPY shared/ ./shared/
  RUN if [ -f ./shared/package.json ]; then cd ./shared && yarn install && yarn build; fi

  # Install dependencies
  COPY services/backend/package.json ./
  COPY services/backend/yarn.lock ./
  RUN yarn install --frozen-lockfile

  # Copy source code
  COPY services/backend/ .

  # Build
  RUN yarn build

  # ========================================
  # Production stage
  # ========================================
  FROM node:20-alpine
  WORKDIR /app

  # Install dependencies for bcrypt
  RUN apk add --no-cache yarn python3 make g++

  # Copy shared
  COPY shared/ ./shared/
  RUN if [ -f ./shared/package.json ]; then cd ./shared && yarn install && yarn build; fi

  # Copy package files
  COPY services/backend/package.json ./
  COPY services/backend/yarn.lock ./
  RUN yarn install --frozen-lockfile

  # Rebuild bcrypt for target platform
  RUN npm rebuild bcrypt --build-from-source

  # Copy built files
  COPY --from=builder /app/dist ./dist
  COPY services/backend/tsconfig*.json ./
  COPY services/backend/src ./src

  EXPOSE 3001

  # Dev or prod based on NODE_ENV
  CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then yarn dev; else yarn migration:run && yarn start:prod; fi"]
  ```

- [ ] Créer `frontend/Dockerfile` :
  ```dockerfile
  FROM node:20-alpine
  WORKDIR /app

  # Install yarn
  RUN apk add --no-cache yarn

  # Copy package files
  COPY frontend/package.json ./
  COPY yarn.lock ./
  RUN yarn install --frozen-lockfile

  # Copy source
  COPY frontend/ .

  EXPOSE 3000
  CMD ["yarn", "dev"]
  ```

- [ ] Créer `.dockerignore` racine :
  ```
  # Node modules (reinstalled inside Docker)
  **/node_modules
  **/dist
  **/.next
  **/.expo

  # Logs
  **/*.log
  **/logs

  # OS
  .DS_Store

  # Git
  .git
  .gitignore

  # Docker
  Dockerfile
  .dockerignore

  # Env files (passed via Docker secrets)
  **/.env
  **/.env.local
  **/.env.development
  **/.env.production

  # Cache/build
  **/coverage
  **/.cache
  **/build

  # IDE
  .vscode
  .idea

  # Tests
  **/__tests__
  **/*.spec.ts
  **/*.test.ts

  # BMAD
  **/_bmad*
  ```

**Référence** : [air-tahiti-app-v2/services/backend/Dockerfile](https://github.com/devlab-io/air-tahiti-app-v2)

---

#### US-MVP-01.9 : Setup Docker Compose complet

**En tant que** développeur,
**Je veux** configurer Docker Compose avec tous les services,
**Afin de** lancer l'environnement de développement complet en une commande.

**Critères d'acceptance :**
- [ ] Service PostgreSQL avec health check
- [ ] Service PostgreSQL test (port différent)
- [ ] Service MinIO (S3) avec console web
- [ ] Service Adminer pour UI database
- [ ] Service Backend avec hot-reload
- [ ] Service Frontend avec hot-reload
- [ ] Network partagé entre services
- [ ] Volumes persistants pour les données
- [ ] Variables d'environnement chargées depuis `.env`

**Tâches techniques :**

- [ ] Créer `docker-compose.yml` complet :
  ```yaml
  version: '3.8'

  services:
    # ========================================
    # Databases
    # ========================================
    postgres:
      image: postgres:16-alpine
      container_name: faatere-postgres
      restart: unless-stopped
      ports:
        - '${DATABASE_PORT:-5432}:5432'
      environment:
        POSTGRES_DB: ${DATABASE_NAME:-faatere}
        POSTGRES_USER: ${DATABASE_USER:-faatere}
        POSTGRES_PASSWORD: ${DATABASE_PASSWORD:-faatere_dev_password}
      volumes:
        - postgres_data:/var/lib/postgresql/data
      healthcheck:
        test: ['CMD-SHELL', 'pg_isready -U ${DATABASE_USER:-faatere} -d ${DATABASE_NAME:-faatere}']
        interval: 10s
        timeout: 5s
        retries: 5
      networks:
        - faatere-network
      env_file:
        - .env

    postgres-test:
      image: postgres:16-alpine
      container_name: faatere-postgres-test
      restart: unless-stopped
      ports:
        - '5433:5432'
      environment:
        POSTGRES_DB: faatere_test
        POSTGRES_USER: ${DATABASE_USER:-faatere}
        POSTGRES_PASSWORD: ${DATABASE_PASSWORD:-faatere_dev_password}
      networks:
        - faatere-network

    # ========================================
    # Storage
    # ========================================
    minio:
      image: minio/minio:latest
      container_name: faatere-minio
      restart: unless-stopped
      command: server /data --console-address ":9001"
      ports:
        - '9000:9000'
        - '9001:9001'
      environment:
        MINIO_ROOT_USER: ${S3_ACCESS_KEY:-minioadmin}
        MINIO_ROOT_PASSWORD: ${S3_SECRET_KEY:-minioadmin}
      volumes:
        - minio_data:/data
      networks:
        - faatere-network

    # ========================================
    # Tools
    # ========================================
    adminer:
      image: adminer:latest
      container_name: faatere-adminer
      restart: unless-stopped
      ports:
        - '8080:8080'
      environment:
        ADMINER_DEFAULT_SERVER: postgres
      depends_on:
        - postgres
      networks:
        - faatere-network

    # ========================================
    # Backend
    # ========================================
    backend:
      build:
        context: .
        dockerfile: ./services/backend/Dockerfile
      container_name: faatere-backend
      restart: unless-stopped
      ports:
        - '${BACKEND_PORT:-3001}:${BACKEND_PORT:-3001}'
      volumes:
        - ./services/backend/src:/app/src
        - ./services/backend/test:/app/test
        - ./shared:/app/shared
        - ./.env:/app/.env
        - /app/node_modules
      environment:
        - NODE_ENV=development
        - DATABASE_HOST=postgres
      depends_on:
        postgres:
          condition: service_healthy
      networks:
        - faatere-network
      env_file:
        - .env

    # ========================================
    # Frontend
    # ========================================
    frontend:
      build:
        context: .
        dockerfile: ./frontend/Dockerfile
      container_name: faatere-frontend
      restart: unless-stopped
      ports:
        - '${FRONTEND_PORT:-3000}:3000'
      volumes:
        - ./frontend/src:/app/src
        - ./frontend/public:/app/public
        - ./shared:/app/shared
        - ./.env:/app/.env
        - /app/node_modules
      environment:
        - NODE_ENV=development
        - NEXT_PUBLIC_API_URL=http://localhost:${BACKEND_PORT:-3001}
      depends_on:
        - backend
      networks:
        - faatere-network
      env_file:
        - .env

  # ========================================
  # Networks & Volumes
  # ========================================
  networks:
    faatere-network:
      driver: bridge

  volumes:
    postgres_data:
    minio_data:
  ```

- [ ] Ajouter scripts dans `package.json` racine :
  ```json
  {
    "scripts": {
      "docker:up": "docker-compose up -d",
      "docker:down": "docker-compose down",
      "docker:logs": "docker-compose logs -f",
      "docker:build": "docker-compose build",
      "docker:ps": "docker-compose ps",
      "db:up": "docker-compose up -d postgres minio adminer",
      "db:down": "docker-compose down postgres minio adminer"
    }
  }
  ```

**Commandes utiles :**
```bash
# Démarrer uniquement les services de base (DB, MinIO, Adminer)
yarn db:up

# Démarrer tous les services
yarn docker:up

# Voir les logs
yarn docker:logs

# Arrêter tous les services
yarn docker:down
```

**Référence** : [air-tahiti-app-v2/docker-compose.yml](https://github.com/devlab-io/air-tahiti-app-v2)

---

#### US-MVP-01.10 : Setup Base de données et Entités TypeORM

**En tant que** développeur,
**Je veux** configurer le schéma de base de données,
**Afin de** stocker les données de l'application.

**Critères d'acceptance :**
- [ ] Entités créées : User, Tomite, Member, Invitation
- [ ] Relations définies correctement
- [ ] Migrations initiales créées
- [ ] Seeds pour données de test (users Bureau)
- [ ] Index sur champs de recherche fréquents

**Schéma des entités :**

```typescript
// User
- id: UUID (PK)
- email: string (unique)
- passwordHash: string
- role: enum ['BOARD', 'TOMITE_PRESIDENT', 'SECRETARY']
- tomiteId: UUID (FK, nullable)
- isActive: boolean
- memberId: UUID (FK, nullable)
- createdAt: timestamp
- updatedAt: timestamp
- invitedBy: UUID (FK)

// Tomite
- id: UUID (PK)
- code: string (unique, 2-4 chars)
- name: string
- description: string (nullable)
- createdAt: timestamp
- updatedAt: timestamp

// Member
- id: UUID (PK)
- firstName: string
- lastName: string
- birthDate: date
- birthPlace: string
- address: string
- email: string (nullable)
- phone: string (nullable)
- photoUrl: string (nullable)
- memberNumber: string (unique)
- membershipDate: date
- tomiteId: UUID (FK)
- originalTomiteId: UUID (FK)
- hasPaid: boolean
- paymentMethod: enum ['CASH', 'CARD', 'TRANSFER'] (nullable)
- createdAt: timestamp
- updatedAt: timestamp
- createdBy: UUID (FK)

// Invitation
- id: UUID (PK)
- email: string
- token: string (unique)
- expiresAt: timestamp
- role: enum ['TOMITE_PRESIDENT', 'SECRETARY']
- tomiteId: UUID (FK)
- createdBy: UUID (FK)
- usedAt: timestamp (nullable)
- createdAt: timestamp
```

---

### 3.3 E-MVP-02 : Authentification

#### US-MVP-02.1 : Migration utilisateurs Bureau

**En tant que** administrateur système,
**Je veux** que les utilisateurs Bureau soient créés automatiquement au déploiement,
**Afin de** pouvoir me connecter immédiatement.

**Critères d'acceptance :**
- [ ] Migration créant les users Bureau depuis variable d'environnement
- [ ] Format env : `BOARD_USERS=email1:password1,email2:password2`
- [ ] Mots de passe hashés avec bcrypt (salt rounds 12)
- [ ] Migration idempotente (ne recrée pas si existe)

---

#### US-MVP-02.2 : Login email/password

**En tant que** utilisateur,
**Je veux** me connecter avec mon email et mot de passe,
**Afin d'** accéder à l'application.

**Critères d'acceptance :**
- [ ] Endpoint POST /auth/login
- [ ] Validation email format + password requis
- [ ] Vérification compte actif (isActive === true)
- [ ] Retourne JWT access token (expiration 24h)
- [ ] Retourne refresh token (expiration 7 jours)
- [ ] Erreur 401 si credentials invalides
- [ ] Erreur 403 si compte désactivé
- [ ] Rate limiting : 5 tentatives / minute

**Frontend :**
- [ ] Page /login avec formulaire
- [ ] Validation côté client
- [ ] Affichage erreurs
- [ ] Redirection vers dashboard après login
- [ ] Stockage token sécurisé (httpOnly cookie ou localStorage)

---

#### US-MVP-02.3 : Protection des routes

**En tant que** système,
**Je veux** protéger les routes API et frontend,
**Afin de** sécuriser l'accès aux données.

**Critères d'acceptance :**
- [ ] Guard JWT sur toutes les routes API (sauf /auth/*)
- [ ] Middleware Next.js pour protection routes frontend
- [ ] Redirection vers /login si non authentifié
- [ ] Refresh automatique du token si expiré

---

#### US-MVP-02.4 : Création invitation

**En tant que** membre du Bureau,
**Je veux** inviter un nouveau membre (Président/Secrétaire),
**Afin qu'** il puisse rejoindre l'application.

**Critères d'acceptance :**
- [ ] Endpoint POST /invitations
- [ ] Champs requis : email, role, tomiteId
- [ ] Génération token UUID unique
- [ ] Expiration : 7 jours
- [ ] Envoi email avec lien d'invitation
- [ ] Vérification : email pas déjà utilisé
- [ ] Vérification : tomité existe
- [ ] Permission : Bureau peut inviter tous rôles, Président peut inviter Secrétaire de son tomité

**Frontend :**
- [ ] Page /users/invite
- [ ] Formulaire : email, rôle (select), tomité (select)
- [ ] Confirmation envoi
- [ ] Liste des invitations en attente

---

#### US-MVP-02.5 : Acceptation invitation

**En tant que** nouvel utilisateur invité,
**Je veux** créer mon compte via le lien d'invitation,
**Afin de** pouvoir me connecter.

**Critères d'acceptance :**
- [ ] Page /auth/setup-password?token=xxx
- [ ] Validation token valide et non expiré
- [ ] Formulaire : mot de passe + confirmation
- [ ] Validation force mot de passe (min 8 chars, 1 majuscule, 1 chiffre)
- [ ] Création du compte User
- [ ] Marquage invitation comme utilisée (usedAt)
- [ ] Redirection vers login avec message succès

---

#### US-MVP-02.6 : Logout

**En tant que** utilisateur connecté,
**Je veux** me déconnecter,
**Afin de** sécuriser ma session.

**Critères d'acceptance :**
- [ ] Endpoint POST /auth/logout
- [ ] Invalidation du refresh token
- [ ] Frontend : suppression token local
- [ ] Redirection vers /login

---

#### US-MVP-02.7 : Gestion utilisateurs (Bureau)

**En tant que** membre du Bureau,
**Je veux** gérer les utilisateurs existants,
**Afin de** contrôler les accès.

**Critères d'acceptance :**
- [ ] Endpoint GET /users (liste paginée)
- [ ] Endpoint PATCH /users/:id (modification)
- [ ] Endpoint PATCH /users/:id/password (reset password)
- [ ] Endpoint PATCH /users/:id/deactivate
- [ ] Endpoint DELETE /users/:id (si désactivé uniquement)
- [ ] Permission : Bureau uniquement

**Frontend :**
- [ ] Page /users avec liste
- [ ] Actions : modifier, reset password, désactiver, supprimer
- [ ] Confirmation pour actions destructives

---

### 3.4 E-MVP-03 : Gestion Tomités

#### US-MVP-03.1 : Créer un tomité

**En tant que** membre du Bureau,
**Je veux** créer un nouveau tomité,
**Afin d'** organiser les adhérents par zone géographique.

**Critères d'acceptance :**
- [ ] Endpoint POST /tomites
- [ ] Champs requis : code (2-4 chars, uppercase), name
- [ ] Champ optionnel : description
- [ ] Validation unicité du code
- [ ] Permission : Bureau uniquement

**Frontend :**
- [ ] Modal/page de création
- [ ] Formulaire avec validation
- [ ] Auto-uppercase du code

---

#### US-MVP-03.2 : Lister les tomités

**En tant que** utilisateur,
**Je veux** voir la liste des tomités,
**Afin de** naviguer vers les adhérents.

**Critères d'acceptance :**
- [ ] Endpoint GET /tomites
- [ ] Retourne : id, code, name, description, memberCount
- [ ] Bureau : voit tous les tomités
- [ ] Président/Secrétaire : voit uniquement son tomité
- [ ] Tri par nom alphabétique

**Frontend :**
- [ ] Page /tomites avec liste/grille
- [ ] Affichage nombre d'adhérents par tomité
- [ ] Clic → navigation vers /tomites/:id/members

---

#### US-MVP-03.3 : Modifier un tomité

**En tant que** membre du Bureau,
**Je veux** modifier un tomité existant,
**Afin de** corriger les informations.

**Critères d'acceptance :**
- [ ] Endpoint PATCH /tomites/:id
- [ ] Champs modifiables : name, description
- [ ] Code NON modifiable
- [ ] Permission : Bureau uniquement

---

#### US-MVP-03.4 : Supprimer un tomité

**En tant que** membre du Bureau,
**Je veux** supprimer un tomité vide,
**Afin de** nettoyer les données obsolètes.

**Critères d'acceptance :**
- [ ] Endpoint DELETE /tomites/:id
- [ ] Vérification : aucun adhérent rattaché
- [ ] Vérification : aucun utilisateur rattaché
- [ ] Erreur 400 si tomité non vide
- [ ] Permission : Bureau uniquement

---

### 3.5 E-MVP-04 : Gestion Adhérents

#### US-MVP-04.1 : Créer un adhérent

**En tant que** gestionnaire de tomité,
**Je veux** ajouter un nouvel adhérent,
**Afin de** l'enregistrer dans le parti.

**Critères d'acceptance :**
- [ ] Endpoint POST /members
- [ ] Champs requis : firstName, lastName, birthDate, birthPlace, address, tomiteId
- [ ] Champs optionnels : email, phone, photoUrl
- [ ] Validation âge ≥ 18 ans (calculé depuis birthDate)
- [ ] Erreur 400 avec message dédié si mineur
- [ ] Génération automatique memberNumber : {CODE_TOMITE}-{YEAR}-{SEQUENCE}
- [ ] Détection doublon sur (firstName, lastName, birthDate, birthPlace)
- [ ] Si doublon : retourne 409 avec infos du doublon existant
- [ ] Initialisation : hasPaid = false, paymentMethod = null
- [ ] Permission : Bureau (tous), Président/Secrétaire (leur tomité)

**Frontend :**
- [ ] Page /members/new ou modal
- [ ] Étape 1 : Saisie date de naissance → validation immédiate
- [ ] Si < 18 ans : redirection page /minors-not-allowed
- [ ] Étape 2 : Formulaire complet
- [ ] Upload photo depuis galerie
- [ ] Gestion conflit doublon (modal de résolution)

---

#### US-MVP-04.2 : Page protection des mineurs

**En tant que** système,
**Je veux** afficher une page dédiée pour les mineurs,
**Afin d'** expliquer clairement notre politique.

**Critères d'acceptance :**
- [ ] Page /minors-not-allowed
- [ ] Message explicatif (cf. cahier des charges)
- [ ] Bouton "J'ai compris" → retour liste adhérents
- [ ] Accessible FR et TY

---

#### US-MVP-04.3 : Résolution de conflit doublon

**En tant que** gestionnaire,
**Je veux** résoudre un conflit de doublon,
**Afin de** gérer les homonymes ou transferts.

**Critères d'acceptance :**
- [ ] Endpoint POST /members/resolve-conflict
- [ ] Actions possibles :
  - `TRANSFER` : demande de transfert (si même personne)
  - `CREATE_ANYWAY` : créer malgré tout (homonyme)
  - `CANCEL` : annuler
- [ ] Si TRANSFER : création d'une demande de transfert (ou transfert direct si Bureau)

**Frontend :**
- [ ] Modal avec infos de l'adhérent existant
- [ ] 3 options radio + bouton valider
- [ ] Explication de chaque option

---

#### US-MVP-04.4 : Lister les adhérents

**En tant que** gestionnaire de tomité,
**Je veux** voir la liste des adhérents de mon tomité,
**Afin de** les gérer.

**Critères d'acceptance :**
- [ ] Endpoint GET /members
- [ ] Paramètres : tomiteId (obligatoire sauf Bureau), page, limit
- [ ] Retourne : liste paginée avec infos essentielles
- [ ] Bureau : peut voir tous les tomités
- [ ] Président/Secrétaire : uniquement leur tomité
- [ ] Tri par défaut : nom ASC

**Frontend :**
- [ ] Page /tomites/:id/members
- [ ] Tableau avec colonnes : photo, nom, prénom, numéro, statut paiement
- [ ] Pagination
- [ ] Clic ligne → détail adhérent

---

#### US-MVP-04.5 : Voir détail adhérent

**En tant que** gestionnaire,
**Je veux** voir toutes les informations d'un adhérent,
**Afin de** consulter son dossier complet.

**Critères d'acceptance :**
- [ ] Endpoint GET /members/:id
- [ ] Retourne toutes les infos de l'adhérent
- [ ] Permission : même règle de cloisonnement

**Frontend :**
- [ ] Page /members/:id
- [ ] Affichage photo, infos personnelles, statut paiement
- [ ] Actions : modifier, supprimer (si autorisé), transférer, générer carte (V1.0)

---

#### US-MVP-04.6 : Modifier un adhérent

**En tant que** gestionnaire,
**Je veux** modifier les informations d'un adhérent,
**Afin de** corriger ou mettre à jour son dossier.

**Critères d'acceptance :**
- [ ] Endpoint PATCH /members/:id
- [ ] Tous les champs modifiables sauf memberNumber
- [ ] Revalidation âge si birthDate modifié
- [ ] Permission : Bureau, Président, Secrétaire (leur tomité)

**Frontend :**
- [ ] Page /members/:id/edit ou modal
- [ ] Formulaire pré-rempli
- [ ] Même validations que création

---

#### US-MVP-04.7 : Supprimer un adhérent

**En tant que** Président de tomité ou Bureau,
**Je veux** supprimer un adhérent,
**Afin de** retirer quelqu'un du parti.

**Critères d'acceptance :**
- [ ] Endpoint DELETE /members/:id
- [ ] Soft delete (flag deleted ou table archive)
- [ ] Permission : Bureau, Président (pas Secrétaire)
- [ ] Confirmation requise (saisie nom de l'adhérent)

**Frontend :**
- [ ] Modal de confirmation
- [ ] Saisie du nom pour confirmer
- [ ] Message de succès

---

#### US-MVP-04.8 : Transférer un adhérent

**En tant que** Président ou Bureau,
**Je veux** transférer un adhérent vers un autre tomité,
**Afin de** gérer les changements de zone.

**Critères d'acceptance :**
- [ ] Endpoint POST /members/:id/transfer
- [ ] Body : targetTomiteId
- [ ] Mise à jour tomiteId (originalTomiteId reste inchangé)
- [ ] Opération atomique
- [ ] Permission : Bureau (tous), Président (depuis son tomité)

**Frontend :**
- [ ] Modal avec select du tomité cible
- [ ] Avertissement : numéro conservé
- [ ] Confirmation

---

#### US-MVP-04.9 : Marquer paiement

**En tant que** gestionnaire,
**Je veux** marquer un adhérent comme ayant payé,
**Afin de** suivre les cotisations.

**Critères d'acceptance :**
- [ ] Endpoint PATCH /members/:id/payment
- [ ] Body : hasPaid (boolean), paymentMethod (enum)
- [ ] Si hasPaid = true, paymentMethod obligatoire
- [ ] Si hasPaid = false, paymentMethod = null

**Frontend :**
- [ ] Sur page détail : bouton "Marquer comme payé"
- [ ] Modal avec select méthode de paiement
- [ ] Affichage statut avec badge coloré

---

#### US-MVP-04.10 : Upload photo adhérent

**En tant que** gestionnaire,
**Je veux** ajouter une photo à un adhérent,
**Afin qu'** elle apparaisse sur sa carte.

**Critères d'acceptance :**
- [ ] Endpoint POST /members/:id/photo (multipart/form-data)
- [ ] Formats acceptés : JPG, PNG
- [ ] Taille max : 5 MB
- [ ] Redimensionnement automatique (max 800x800)
- [ ] Stockage S3 (Railway)
- [ ] Retourne URL de la photo

**Frontend :**
- [ ] Input file avec preview
- [ ] Crop/resize côté client optionnel
- [ ] Indicateur de progression upload

---

### 3.6 E-MVP-05 : Recherche

#### US-MVP-05.1 : Super search bar

**En tant que** utilisateur,
**Je veux** rechercher un adhérent rapidement,
**Afin de** le trouver sans naviguer.

**Critères d'acceptance :**
- [ ] Endpoint GET /members/search
- [ ] Paramètre : q (query string)
- [ ] Recherche sur : firstName, lastName, memberNumber
- [ ] Filtrage par tomiteId (respecte cloisonnement)
- [ ] Retourne max 20 résultats
- [ ] Recherche insensible à la casse et aux accents
- [ ] Debounce côté API (ou client) : 300ms

**Frontend :**
- [ ] Composant SearchBar dans le header
- [ ] Dropdown avec résultats en temps réel
- [ ] Affichage : photo miniature, nom, numéro, tomité
- [ ] Clic → navigation vers fiche adhérent
- [ ] Raccourci clavier : Cmd/Ctrl + K

---

### 3.7 E-MVP-06 : RBAC

#### US-MVP-06.1 : Guards de permission

**En tant que** système,
**Je veux** vérifier les permissions sur chaque endpoint,
**Afin de** sécuriser l'accès aux données.

**Critères d'acceptance :**
- [ ] Guard NestJS vérifiant le rôle
- [ ] Décorateurs personnalisés : @Roles(), @TomiteAccess()
- [ ] Vérification tomiteId pour Président/Secrétaire
- [ ] Erreur 403 si accès non autorisé

**Matrice de référence :**
| Endpoint | Bureau | Président | Secrétaire |
|----------|--------|-----------|------------|
| GET /tomites | Tous | Son tomité | Son tomité |
| POST /tomites | ✅ | ❌ | ❌ |
| GET /members | Tous | Son tomité | Son tomité |
| POST /members | Tous | Son tomité | Son tomité |
| DELETE /members | Tous | Son tomité | ❌ |
| POST /members/:id/transfer | Tous | Depuis son tomité | ❌ |
| GET /users | ✅ | ❌ | ❌ |
| POST /invitations | ✅ | Son tomité (Secrétaire) | ❌ |

---

### 3.8 E-MVP-07 : Internationalisation

#### US-MVP-07.1 : Setup i18n

**En tant que** utilisateur,
**Je veux** utiliser l'application en français ou tahitien,
**Afin de** comprendre l'interface.

**Critères d'acceptance :**
- [ ] next-intl ou react-i18next configuré
- [ ] Fichiers de traduction : fr.json, ty.json
- [ ] Détection langue navigateur
- [ ] Sélecteur de langue dans le header
- [ ] Persistance du choix (localStorage)
- [ ] Toutes les chaînes UI externalisées

**Contenu minimal MVP :**
- [ ] Navigation (menu, boutons)
- [ ] Formulaires (labels, placeholders, erreurs)
- [ ] Messages système (succès, erreurs)
- [ ] Page protection mineurs

---

## 4. V1.0 - Spécifications détaillées

### 4.1 Épics V1.0

| ID | Épic | Description |
|----|------|-------------|
| E-V1-01 | Dashboard | Tableau de bord avec statistiques |
| E-V1-02 | Export | Export CSV et PDF |
| E-V1-03 | Cartes adhérent | Génération PDF et Wallet |
| E-V1-04 | Audit | Logs de traçabilité |
| E-V1-05 | Emails | Envoi d'emails aux adhérents |

---

### 4.2 E-V1-01 : Dashboard

#### US-V1-01.1 : KPIs globaux

**En tant que** membre du Bureau,
**Je veux** voir les KPIs globaux du parti,
**Afin de** mesurer la croissance.

**Critères d'acceptance :**
- [ ] Endpoint GET /dashboard/stats
- [ ] Retourne : totalMembers, totalTomites, newLast30d, newLast7d, newLast3d, newLast24h
- [ ] Permission : Bureau uniquement

**Frontend :**
- [ ] Page /dashboard (home pour Bureau)
- [ ] 4 cartes KPI en haut de page
- [ ] Actualisation au chargement

---

#### US-V1-01.2 : Graphique évolution

**En tant que** membre du Bureau,
**Je veux** visualiser l'évolution des adhésions,
**Afin de** comprendre les tendances.

**Critères d'acceptance :**
- [ ] Endpoint GET /dashboard/evolution
- [ ] Paramètres : period (7d, 30d, 90d, 1y)
- [ ] Retourne : tableau de points (date, count)
- [ ] Permission : Bureau uniquement

**Frontend :**
- [ ] Graphique en ligne (recharts ou chart.js)
- [ ] Sélecteur de période
- [ ] Tooltip au survol

---

#### US-V1-01.3 : Top tomités

**En tant que** membre du Bureau,
**Je veux** voir les tomités avec le plus d'adhérents,
**Afin d'** identifier les zones fortes.

**Critères d'acceptance :**
- [ ] Endpoint GET /dashboard/top-tomites
- [ ] Paramètre : limit (default 10)
- [ ] Retourne : tomité name, code, memberCount, rang

**Frontend :**
- [ ] Liste ordonnée avec barres de progression
- [ ] Clic → navigation vers tomité

---

#### US-V1-01.4 : Derniers adhérents

**En tant que** membre du Bureau,
**Je veux** voir les derniers adhérents inscrits,
**Afin de** suivre l'activité récente.

**Critères d'acceptance :**
- [ ] Endpoint GET /dashboard/recent-members
- [ ] Paramètre : limit (default 10)
- [ ] Retourne : nom, prénom, tomité, date inscription

**Frontend :**
- [ ] Liste avec photo miniature
- [ ] Indication du tomité
- [ ] Date relative ("il y a 2h")

---

### 4.3 E-V1-02 : Export

#### US-V1-02.1 : Export CSV

**En tant que** gestionnaire,
**Je veux** exporter les adhérents en CSV,
**Afin de** les traiter dans un tableur.

**Critères d'acceptance :**
- [ ] Endpoint GET /members/export/csv
- [ ] Paramètres : tomiteId (optionnel pour Bureau), excludeNoEmail, excludeNoPhone
- [ ] Colonnes : nom, prénom, email, téléphone, adresse, numéro, tomité, statut paiement
- [ ] Encoding UTF-8 avec BOM pour Excel
- [ ] Permission : Bureau (global), autres (leur tomité)

---

#### US-V1-02.2 : Export PDF

**En tant que** gestionnaire,
**Je veux** exporter les adhérents en PDF,
**Afin de** les imprimer.

**Critères d'acceptance :**
- [ ] Endpoint GET /members/export/pdf
- [ ] Mêmes paramètres que CSV
- [ ] Format tableau propre avec logo
- [ ] Pagination automatique

---

#### US-V1-02.3 : Modal d'export avec filtres

**En tant que** utilisateur,
**Je veux** configurer mon export,
**Afin d'** obtenir exactement les données voulues.

**Critères d'acceptance :**
- [ ] Modal avec options
- [ ] Sélection périmètre : tomité ou global
- [ ] Sélection format : CSV ou PDF
- [ ] Filtres : exclure sans email, exclure sans téléphone
- [ ] Aperçu du nombre d'adhérents
- [ ] Bouton télécharger

---

### 4.4 E-V1-03 : Cartes adhérent

#### US-V1-03.1 : Génération carte PDF

**En tant que** gestionnaire,
**Je veux** générer la carte d'un adhérent en PDF,
**Afin qu'** il puisse l'imprimer.

**Critères d'acceptance :**
- [ ] Endpoint GET /members/:id/card/pdf
- [ ] Vérification hasPaid === true (sinon 403)
- [ ] Contenu : nom, prénom, photo, numéro, tomité actuel
- [ ] Design carte format standard
- [ ] QR code optionnel (lien vérification)

---

#### US-V1-03.2 : Génération Google Wallet

**En tant que** gestionnaire,
**Je veux** générer un pass Google Wallet,
**Afin que** l'adhérent ait sa carte sur son téléphone Android.

**Critères d'acceptance :**
- [ ] Endpoint GET /members/:id/card/google-wallet
- [ ] Vérification hasPaid === true
- [ ] Retourne URL "Add to Google Wallet"
- [ ] Pass type : Generic
- [ ] Contenu : nom, photo (si supporté), numéro

---

#### US-V1-03.3 : Génération Apple Wallet

**En tant que** gestionnaire,
**Je veux** générer un pass Apple Wallet,
**Afin que** l'adhérent ait sa carte sur son iPhone.

**Critères d'acceptance :**
- [ ] Endpoint GET /members/:id/card/apple-wallet
- [ ] Vérification hasPaid === true
- [ ] Retourne fichier .pkpass
- [ ] Pass type : PKPassTypeGeneric
- [ ] Contenu : nom, photo (investigation requise), numéro

---

#### US-V1-03.4 : Envoi carte par email

**En tant que** gestionnaire,
**Je veux** envoyer la carte par email à l'adhérent,
**Afin qu'** il la reçoive directement.

**Critères d'acceptance :**
- [ ] Endpoint POST /members/:id/card/send
- [ ] Body : format ('pdf', 'google', 'apple')
- [ ] Vérification email présent sur l'adhérent
- [ ] Vérification hasPaid === true
- [ ] Email avec lien de téléchargement ou pièce jointe

---

### 4.5 E-V1-04 : Audit

#### US-V1-04.1 : Logging des mutations

**En tant que** système,
**Je veux** logger toutes les mutations sur les adhérents,
**Afin d'** assurer la traçabilité.

**Critères d'acceptance :**
- [ ] Intercepteur NestJS pour mutations Member
- [ ] Entité AuditLog créée
- [ ] Actions loguées : CREATE, UPDATE, DELETE, TRANSFER
- [ ] Données : userId, entityId, action, changes (avant/après), timestamp, tomiteId

---

#### US-V1-04.2 : Consultation logs d'audit

**En tant que** Président de tomité ou Bureau,
**Je veux** consulter l'historique des modifications,
**Afin de** savoir qui a fait quoi.

**Critères d'acceptance :**
- [ ] Endpoint GET /audit-logs
- [ ] Paramètres : tomiteId, memberId, page, limit
- [ ] Bureau : tous les logs
- [ ] Président : logs de son tomité
- [ ] Secrétaire : pas d'accès

**Frontend :**
- [ ] Page /audit ou onglet sur page adhérent
- [ ] Liste chronologique inversée
- [ ] Détail des changements (diff)
- [ ] Filtres par période, action, utilisateur

---

### 4.6 E-V1-05 : Emails

#### US-V1-05.1 : Envoi email par tomité

**En tant que** gestionnaire,
**Je veux** envoyer un email à tous les adhérents de mon tomité,
**Afin de** communiquer avec eux.

**Critères d'acceptance :**
- [ ] Endpoint POST /emails/send
- [ ] Body : tomiteId, subject, body
- [ ] Envoi uniquement aux adhérents avec email
- [ ] File d'attente pour envoi en masse
- [ ] Rapport : envoyés, échecs

---

#### US-V1-05.2 : Envoi email par filtre

**En tant que** Bureau,
**Je veux** envoyer un email avec des filtres personnalisés,
**Afin de** cibler ma communication.

**Critères d'acceptance :**
- [ ] Endpoint POST /emails/send avec filtres
- [ ] Filtres : tomiteIds[], hasPaid, hasEmail
- [ ] Aperçu du nombre de destinataires avant envoi

**Frontend :**
- [ ] Page /emails/compose
- [ ] Éditeur de texte simple (ou riche)
- [ ] Sélection des filtres
- [ ] Aperçu destinataires
- [ ] Bouton envoyer avec confirmation

---

## 5. V1.1 - Spécifications détaillées

### 5.1 Épics V1.1

| ID | Épic | Description |
|----|------|-------------|
| E-V11-01 | App Mobile | Application React Native/Expo |
| E-V11-02 | Offline Mode | Fonctionnement hors-ligne |
| E-V11-03 | Sync | Synchronisation et résolution conflits |

---

### 5.2 E-V11-01 : App Mobile

#### US-V11-01.1 : Setup projet Expo

**En tant que** développeur,
**Je veux** initialiser l'application mobile,
**Afin de** la développer.

**Critères d'acceptance :**
- [ ] Projet Expo SDK 50+ initialisé
- [ ] TypeScript configuré
- [ ] Navigation (expo-router ou react-navigation)
- [ ] Connexion à l'API backend
- [ ] Build de développement fonctionnel

---

#### US-V11-01.2 : Écrans d'authentification mobile

**En tant que** utilisateur mobile,
**Je veux** me connecter sur l'app,
**Afin d'** accéder aux fonctionnalités.

**Critères d'acceptance :**
- [ ] Écran login
- [ ] Écran setup password (invitation)
- [ ] Stockage sécurisé du token (expo-secure-store)
- [ ] Auto-login si token valide

---

#### US-V11-01.3 : Liste adhérents mobile

**En tant que** gestionnaire mobile,
**Je veux** voir la liste des adhérents,
**Afin de** les consulter sur le terrain.

**Critères d'acceptance :**
- [ ] Écran liste avec FlatList performante
- [ ] Pull-to-refresh
- [ ] Recherche intégrée
- [ ] Navigation vers détail

---

#### US-V11-01.4 : Ajout adhérent mobile

**En tant que** gestionnaire mobile,
**Je veux** ajouter un adhérent depuis mon téléphone,
**Afin de** l'inscrire sur le terrain.

**Critères d'acceptance :**
- [ ] Formulaire multi-étapes
- [ ] Validation âge immédiate
- [ ] Prise photo caméra (expo-camera)
- [ ] Import photo galerie (expo-image-picker)

---

#### US-V11-01.5 : Prise photo caméra

**En tant que** gestionnaire mobile,
**Je veux** prendre une photo directement,
**Afin de** capturer le visage de l'adhérent.

**Critères d'acceptance :**
- [ ] Accès caméra avec permission
- [ ] Preview avant validation
- [ ] Compression avant upload
- [ ] Fallback galerie si caméra indisponible

---

### 5.3 E-V11-02 : Offline Mode

#### US-V11-02.1 : Stockage local

**En tant que** système mobile,
**Je veux** stocker les données localement,
**Afin de** fonctionner hors-ligne.

**Critères d'acceptance :**
- [ ] Base SQLite locale (expo-sqlite ou WatermelonDB)
- [ ] Schéma miroir des entités serveur
- [ ] Cache des adhérents du tomité
- [ ] File d'attente des mutations offline

---

#### US-V11-02.2 : Détection connectivité

**En tant que** app mobile,
**Je veux** détecter l'état de connexion,
**Afin de** basculer entre modes online/offline.

**Critères d'acceptance :**
- [ ] Listener NetInfo
- [ ] Indicateur visuel mode offline
- [ ] Notification à la reconnexion

---

#### US-V11-02.3 : Création adhérent offline

**En tant que** gestionnaire sans connexion,
**Je veux** créer un adhérent offline,
**Afin de** ne pas perdre l'inscription.

**Critères d'acceptance :**
- [ ] Formulaire identique au mode online
- [ ] Sauvegarde locale avec flag "pending sync"
- [ ] Génération numéro adhérent provisoire (local)
- [ ] Indicateur visuel "en attente de sync"

---

### 5.4 E-V11-03 : Synchronisation

#### US-V11-03.1 : Sync automatique

**En tant que** app mobile,
**Je veux** synchroniser automatiquement à la reconnexion,
**Afin de** mettre à jour le serveur.

**Critères d'acceptance :**
- [ ] Trigger auto à la reconnexion
- [ ] Upload des mutations pending
- [ ] Download des nouvelles données serveur
- [ ] Ordre : créations → modifications → suppressions

---

#### US-V11-03.2 : Résolution conflits

**En tant que** utilisateur,
**Je veux** résoudre les conflits de sync,
**Afin de** ne pas perdre de données.

**Critères d'acceptance :**
- [ ] Détection conflit (version serveur différente)
- [ ] Modal de résolution
- [ ] Options : garder ma version, garder serveur, voir détails
- [ ] Log de la résolution

---

#### US-V11-03.3 : Gestion doublons cross-tomité offline

**En tant que** système,
**Je veux** détecter les doublons lors de la sync,
**Afin de** maintenir l'intégrité.

**Critères d'acceptance :**
- [ ] Vérification serveur lors de la sync
- [ ] Si doublon détecté : modal de résolution (comme online)
- [ ] Options : transfert, créer quand même, annuler

---

## 6. Exigences non fonctionnelles

### 6.1 Performance

| Métrique | Cible |
|----------|-------|
| Temps de réponse API (P95) | < 500ms |
| Temps de recherche | < 300ms |
| Temps de génération carte PDF | < 3s |
| Temps de sync mobile (100 adhérents) | < 10s |

### 6.2 Sécurité

- [ ] HTTPS obligatoire
- [ ] JWT avec expiration courte (24h)
- [ ] Mots de passe hashés bcrypt (12 rounds)
- [ ] Rate limiting sur endpoints sensibles
- [ ] Validation des inputs (class-validator)
- [ ] Protection CSRF
- [ ] Headers de sécurité (Helmet)

### 6.3 Scalabilité

- [ ] Pagination sur toutes les listes
- [ ] Index DB sur champs de recherche
- [ ] Lazy loading des images
- [ ] Compression gzip des réponses

### 6.4 Accessibilité

- [ ] Contraste suffisant (WCAG AA)
- [ ] Navigation clavier
- [ ] Labels sur tous les inputs
- [ ] Messages d'erreur explicites

### 6.5 Compatibilité

**Web :**
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

**Mobile :**
- iOS 14+
- Android 10+

---

## 7. Dépendances techniques

### 7.1 Backend (NestJS)

| Package | Usage |
|---------|-------|
| @nestjs/passport | Authentification |
| @nestjs/jwt | Tokens JWT |
| @nestjs/typeorm ou prisma | ORM |
| @nestjs/swagger | Documentation API |
| class-validator | Validation DTOs |
| bcrypt | Hash mots de passe |
| @nestjs/throttler | Rate limiting |
| nodemailer | Envoi emails |
| pdfkit ou puppeteer | Génération PDF |
| sharp | Traitement images |

### 7.2 Frontend (Next.js)

| Package | Usage |
|---------|-------|
| next-intl | i18n |
| @tanstack/react-query | Data fetching |
| react-hook-form | Formulaires |
| zod | Validation schemas |
| tailwindcss | Styling |
| shadcn/ui | Composants UI |
| recharts | Graphiques |
| lucide-react | Icônes |

### 7.3 Mobile (Expo)

| Package | Usage |
|---------|-------|
| expo-router | Navigation |
| expo-secure-store | Stockage sécurisé |
| expo-camera | Prise photo |
| expo-image-picker | Sélection photo |
| expo-sqlite | Base locale |
| @tanstack/react-query | Data fetching |
| react-native-reanimated | Animations |

---

## 8. Risques et mitigations

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Complexité offline/sync | Haute | Haut | Reporter à V1.1, prototyper tôt |
| API Google/Apple Wallet | Moyenne | Moyen | Investigation précoce, fallback PDF |
| Performance recherche 80k adhérents | Moyenne | Haut | Index PostgreSQL, pagination stricte |
| Adoption utilisateurs | Moyenne | Haut | Formation, documentation, UX simple |
| Scope creep | Haute | Moyen | PRD strict, milestones clairs |

---

## 9. Critères de succès

### 9.1 MVP

- [ ] Un membre du Bureau peut se connecter
- [ ] Un membre du Bureau peut créer un tomité
- [ ] Un membre du Bureau peut inviter un Président de tomité
- [ ] Un Président peut ajouter un adhérent à son tomité
- [ ] La recherche retourne des résultats en < 1s
- [ ] Le cloisonnement par tomité fonctionne

### 9.2 V1.0

- [ ] Dashboard affiche les stats correctes
- [ ] Export CSV/PDF fonctionnel
- [ ] Cartes PDF générées correctement
- [ ] Au moins un format Wallet fonctionnel
- [ ] Logs d'audit consultables

### 9.3 V1.1

- [ ] App mobile publiée (stores privés)
- [ ] Ajout adhérent possible hors-ligne
- [ ] Sync automatique à la reconnexion
- [ ] Résolution de conflits fonctionnelle

---

## Annexe : Checklist de lancement

### MVP Launch Checklist

- [ ] Tests unitaires > 80% couverture
- [ ] Tests E2E des parcours critiques
- [ ] Documentation API (Swagger) à jour
- [ ] Variables d'environnement production configurées
- [ ] CI/CD pipeline fonctionnel
- [ ] Monitoring et alertes configurés
- [ ] Backup base de données automatique
- [ ] Users Bureau créés en production
- [ ] Formation utilisateurs pilotes

---

*Document généré par BMad Team - Faatere PRD V1*
