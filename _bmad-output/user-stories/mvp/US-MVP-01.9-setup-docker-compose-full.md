# US-MVP-01.9 : Setup Docker Compose complet

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-01.9 |
| **Epic** | E-MVP-01 : Setup Projet |
| **Milestone** | MVP |
| **Priorité** | P1 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** développeur,
**Je veux** configurer Docker Compose avec tous les services,
**Afin de** lancer l'environnement de développement complet en une commande.

---

## Critères d'acceptance

- [x] Service PostgreSQL avec health check
- [x] Service PostgreSQL test (port différent)
- [x] Service MinIO (S3) avec console web
- [x] Service Adminer pour UI database
- [x] Service Backend avec hot-reload
- [x] Service Frontend avec hot-reload
- [x] Network partagé entre services
- [x] Volumes persistants pour les données
- [x] Variables d'environnement chargées depuis `.env`

---

## Tâches techniques

### `docker-compose.yml` complet

> **Note:** L'implémentation utilise des variables d'environnement inline avec valeurs par défaut au lieu de `env_file`. Cette approche est préférable car elle rend les dépendances explicites et fonctionne même sans fichier `.env`.

```yaml
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
    healthcheck:
      test: ['CMD', 'mc', 'ready', 'local']
      interval: 30s
      timeout: 20s
      retries: 3
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
      target: development
    container_name: faatere-backend
    restart: unless-stopped
    ports:
      - '${BACKEND_PORT:-3001}:${BACKEND_PORT:-3001}'
    volumes:
      - ./services/backend/src:/app/src
      - ./services/backend/test:/app/test
      - ./shared:/app/shared
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - PORT=${BACKEND_PORT:-3001}
      - DATABASE_HOST=postgres
      - DATABASE_PORT=5432
      - DATABASE_NAME=${DATABASE_NAME:-faatere}
      - DATABASE_USER=${DATABASE_USER:-faatere}
      - DATABASE_PASSWORD=${DATABASE_PASSWORD:-faatere_dev_password}
      - DATABASE_URL=postgresql://${DATABASE_USER:-faatere}:${DATABASE_PASSWORD:-faatere_dev_password}@postgres:5432/${DATABASE_NAME:-faatere}
      - JWT_SECRET=${JWT_SECRET:-your_jwt_secret_min_32_chars_here}
      - JWT_EXPIRATION=${JWT_EXPIRATION:-24h}
      - S3_ENDPOINT=http://minio:9000
      - S3_ACCESS_KEY=${S3_ACCESS_KEY:-minioadmin}
      - S3_SECRET_KEY=${S3_SECRET_KEY:-minioadmin}
      - S3_BUCKET=${S3_BUCKET:-faatere-uploads}
      - FRONTEND_URL=http://localhost:${FRONTEND_PORT:-3000}
      - CORS_ORIGIN=http://localhost:${FRONTEND_PORT:-3000}
    depends_on:
      postgres:
        condition: service_healthy
      minio:
        condition: service_healthy
    networks:
      - faatere-network

  # ========================================
  # Frontend
  # ========================================
  frontend:
    build:
      context: .
      dockerfile: ./frontend/Dockerfile
      target: development
    container_name: faatere-frontend
    restart: unless-stopped
    ports:
      - '${FRONTEND_PORT:-3000}:3000'
    volumes:
      - ./frontend/src:/app/frontend/src
      - ./frontend/public:/app/frontend/public
      - ./shared:/app/shared
      - /app/node_modules
      - /app/frontend/node_modules
      - /app/frontend/.next
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://localhost:${BACKEND_PORT:-3001}
      - NEXT_PUBLIC_APP_NAME=Faatere
    depends_on:
      - backend
    networks:
      - faatere-network

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

### Scripts `package.json` racine

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

---

## Commandes utiles

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

---

## Références

- [air-tahiti-app-v2/docker-compose.yml](https://github.com/devlab-io/air-tahiti-app-v2)

---

## Dépendances

- US-MVP-01.3 : Setup Docker Compose (Dev Environment)
- US-MVP-01.8 : Setup Dockerfiles

---

## Notes

Ce docker-compose complet permet de lancer tout l'environnement de développement en une seule commande.
