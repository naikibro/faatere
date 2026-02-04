# US-MVP-01.3 : Setup Docker Compose (Dev Environment)

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-01.3 |
| **Epic** | E-MVP-01 : Setup Projet |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** développeur,
**Je veux** configurer Docker Compose pour les services de développement,
**Afin de** lancer facilement PostgreSQL et MinIO en local.

---

## Critères d'acceptance

- [ ] `docker-compose.yml` à la racine du projet
- [ ] Service PostgreSQL 16 configuré
- [ ] Service Adminer pour UI de base de données
- [ ] Service MinIO pour stockage S3-compatible (photos)
- [ ] Volumes persistants pour les données
- [ ] Health checks configurés
- [ ] `.env.example` avec toutes les variables nécessaires

---

## Tâches techniques

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

---

## Références

- [air-tahiti-app-v2/docker-compose.yml](https://github.com/devlab-io/air-tahiti-app-v2)

---

## Dépendances

- US-MVP-01.1 : Setup Monorepo

---

## Notes

Cette configuration permet à tout développeur de lancer les services de base en une seule commande : `docker-compose up -d`.
