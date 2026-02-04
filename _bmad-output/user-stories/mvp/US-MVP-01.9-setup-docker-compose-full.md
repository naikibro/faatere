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

- [ ] Service PostgreSQL avec health check
- [ ] Service PostgreSQL test (port différent)
- [ ] Service MinIO (S3) avec console web
- [ ] Service Adminer pour UI database
- [ ] Service Backend avec hot-reload
- [ ] Service Frontend avec hot-reload
- [ ] Network partagé entre services
- [ ] Volumes persistants pour les données
- [ ] Variables d'environnement chargées depuis `.env`

---

## Tâches techniques

### `docker-compose.yml` complet

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
