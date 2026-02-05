# US-MVP-02.1 : Migration utilisateurs Bureau

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-02.1 |
| **Epic** | E-MVP-02 : Authentification |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** administrateur système,
**Je veux** que les utilisateurs Bureau soient créés automatiquement au déploiement,
**Afin de** pouvoir me connecter immédiatement.

---

## Critères d'acceptance

- [x] Seed script créant les users Bureau depuis variable d'environnement
- [x] Format env : `BOARD_USERS=email1:password1,email2:password2`
- [x] Mots de passe hashés avec bcrypt (salt rounds 12)
- [x] Seed idempotent (ne recrée pas si existe)

---

## Tâches techniques

- [x] Créer seed script TypeORM pour les users Bureau (seeds ≠ migrations : migrations = schema, seeds = data)
- [x] Parser la variable d'environnement `BOARD_USERS`
- [x] Vérifier si l'email existe déjà avant création
- [x] Hasher le mot de passe avec bcrypt (12 rounds)
- [x] Logger les créations/skip pour debugging
- [x] Valider le format email avec Zod
- [x] Détecter les emails dupliqués dans la config
- [x] Ajouter les tests unitaires pour `parseBoardUsers()`

---

## Dépendances

- US-MVP-01.10 : Setup Base de données

---

## Notes

Ce seed script est critique car il permet le premier accès à l'application. Il doit être idempotent pour pouvoir être rejoué sans erreur.

> **Architecture Decision:** On utilise un seed script plutôt qu'une migration TypeORM car les migrations doivent uniquement gérer le schéma (création/modification de tables), jamais les données. Les seeds sont destinés à l'insertion de données initiales.

---

## Dev Agent Record

### File List
- `services/backend/src/seeds/board-users.seed.ts` - Seed script principal
- `services/backend/src/seeds/seed.config.ts` - Configuration et parsing BOARD_USERS
- `services/backend/src/seeds/seed.config.spec.ts` - Tests unitaires
- `services/backend/.env.example` - Documentation variable d'environnement

### Change Log
| Date | Author | Changes |
|------|--------|---------|
| 2026-02-05 | AI Code Review | Added email validation (Zod), duplicate detection, password trimming, unit tests |
