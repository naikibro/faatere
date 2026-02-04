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

- [ ] Dockerfile backend avec multi-stage build (builder + production)
- [ ] Dockerfile frontend pour développement
- [ ] `.dockerignore` à la racine pour optimiser les builds
- [ ] Support du hot-reload en mode développement
- [ ] Build optimisé pour la production

---

## Tâches techniques

### `services/backend/Dockerfile`

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

### `frontend/Dockerfile`

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
