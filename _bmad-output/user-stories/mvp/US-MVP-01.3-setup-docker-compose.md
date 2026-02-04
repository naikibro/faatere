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

- [x] `docker-compose.yml` à la racine du projet
- [x] Service PostgreSQL 16 configuré
- [x] Service Adminer pour UI de base de données
- [x] Service MinIO pour stockage S3-compatible (photos)
- [x] Volumes persistants pour les données
- [x] Health checks configurés
- [x] `.env.example` avec toutes les variables nécessaires

---

## Tâches techniques

- [x] Créer `docker-compose.yml` avec PostgreSQL 16, Adminer et MinIO
- [x] Créer `.env.example` avec variables pour tous les services

---

## Références

- [air-tahiti-app-v2/docker-compose.yml](https://github.com/devlab-io/air-tahiti-app-v2)

---

## Dépendances

- US-MVP-01.1 : Setup Monorepo

---

## Notes

Cette configuration permet à tout développeur de lancer les services de base en une seule commande : `docker compose up -d`.

---

## Status

**DONE** - Completed 2026-02-03

---

## File List

- `docker-compose.yml` - Docker Compose configuration with PostgreSQL, Adminer, MinIO
- `.env.example` - Environment variables template (updated with Docker variables)

---

## Change Log

- 2026-02-03: Initial implementation of Docker Compose with all services and health checks
