# US-MVP-01.8 : Setup Dockerfiles pour les services

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-01.8 |
| **Epic** | E-MVP-01 : Setup Projet |
| **Milestone** | MVP |
| **Priorité** | P1 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** développeur,
**Je veux** créer les Dockerfiles pour chaque service,
**Afin de** containeriser l'application pour le développement et la production.

---

## Critères d'acceptance

- [x] Dockerfile backend avec multi-stage build (builder + production)
- [x] Dockerfile frontend pour développement
- [x] `.dockerignore` à la racine pour optimiser les builds
- [x] Support du hot-reload en mode développement
- [x] Build optimisé pour la production

---

## Tâches techniques

> **Note:** L'implémentation finale utilise des stages séparés (development, builder, production) pour une meilleure optimisation et flexibilité avec le paramètre `target` de docker-compose.

### `services/backend/Dockerfile`

```dockerfile
# ========================================
# Build stage
# ========================================
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY tsconfig.json ./tsconfig.json
COPY shared/ ./shared/
RUN if [ -f ./shared/package.json ]; then cd ./shared && yarn install --frozen-lockfile && yarn build; fi

COPY services/backend/package.json ./services/backend/
COPY services/backend/yarn.lock* ./services/backend/
RUN cd ./services/backend && yarn install --frozen-lockfile

COPY services/backend/ ./services/backend/
RUN cd ./services/backend && yarn build

# ========================================
# Production stage
# ========================================
FROM node:20-alpine AS production
WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY tsconfig.json ./tsconfig.json
COPY shared/ ./shared/
RUN if [ -f ./shared/package.json ]; then cd ./shared && yarn install --frozen-lockfile --production && yarn build; fi

COPY services/backend/package.json ./
COPY services/backend/yarn.lock* ./
RUN yarn install --frozen-lockfile --production
RUN npm rebuild bcrypt --build-from-source

COPY --from=builder /app/services/backend/dist ./dist

EXPOSE 3001
CMD ["node", "dist/main"]

# ========================================
# Development stage
# ========================================
FROM node:20-alpine AS development
WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY tsconfig.json ./tsconfig.json
COPY shared/ ./shared/
RUN if [ -f ./shared/package.json ]; then cd ./shared && yarn install --frozen-lockfile && yarn build; fi

COPY services/backend/package.json ./
COPY services/backend/yarn.lock* ./
RUN yarn install --frozen-lockfile
RUN npm rebuild bcrypt --build-from-source

COPY services/backend/ .

EXPOSE 3001
CMD ["yarn", "dev"]
```

### `frontend/Dockerfile`

```dockerfile
# ========================================
# Development stage
# ========================================
FROM node:20-alpine AS development
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY frontend/package.json ./frontend/
COPY shared/package.json ./shared/

RUN yarn install --frozen-lockfile

COPY frontend/ ./frontend/

WORKDIR /app/frontend
EXPOSE 3000
CMD ["yarn", "dev"]

# ========================================
# Build stage (for production)
# ========================================
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY frontend/package.json ./frontend/
COPY shared/package.json ./shared/

RUN yarn install --frozen-lockfile

COPY shared/ ./shared/
COPY frontend/ ./frontend/

WORKDIR /app/frontend
RUN yarn build

# ========================================
# Production stage
# ========================================
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./
COPY yarn.lock ./
COPY frontend/package.json ./frontend/
COPY shared/package.json ./shared/

RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/frontend/public ./frontend/public

WORKDIR /app/frontend
EXPOSE 3000
CMD ["yarn", "start"]
```

### `.dockerignore` racine

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

---

## Références

- [air-tahiti-app-v2/services/backend/Dockerfile](https://github.com/devlab-io/air-tahiti-app-v2)

---

## Dépendances

- US-MVP-01.1 : Setup Monorepo
- US-MVP-01.4 : Setup Backend
- US-MVP-01.5 : Setup Frontend

---

## Notes

Les Dockerfiles permettent une reproductibilité parfaite de l'environnement de développement et de production.
