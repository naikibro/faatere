# US-MVP-01.7 : Setup Gestion des Configurations et Secrets

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-01.7 |
| **Epic** | E-MVP-01 : Setup Projet |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** développeur,
**Je veux** mettre en place une gestion structurée des variables d'environnement,
**Afin de** sécuriser les secrets et faciliter le déploiement multi-environnements.

---

## Critères d'acceptance

- [ ] `.env.example` à la racine avec toutes les variables globales
- [ ] `.env.example` dans chaque workspace avec variables spécifiques
- [ ] `.gitignore` configuré pour exclure tous les `.env` sauf `.env.example`
- [ ] Documentation des variables dans chaque `.env.example`
- [ ] Validation des variables requises au démarrage (ConfigModule NestJS)

---

## Structure des fichiers de configuration

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

---

## Tâches techniques

### `.env.example` racine

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

### `services/backend/.env.example`

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

### `frontend/.env.example`

```bash
# ========================================
# Frontend Configuration
# ========================================

NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Faatere
```

- [ ] Configurer validation des variables dans NestJS avec `@nestjs/config` et `Joi`

---

## Références

- [air-tahiti-app-v2/.env.example](https://github.com/devlab-io/air-tahiti-app-v2)

---

## Dépendances

- US-MVP-01.1 : Setup Monorepo

---

## Notes

La gestion des secrets est critique pour la sécurité. Jamais de credentials en dur dans le code.
