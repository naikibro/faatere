# US-MVP-01.10 : Setup Base de données et Entités TypeORM

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-01.10 |
| **Epic** | E-MVP-01 : Setup Projet |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** développeur,
**Je veux** configurer le schéma de base de données,
**Afin de** stocker les données de l'application.

---

## Critères d'acceptance

- [x] Entités créées : User, Tomite, Member, Invitation
- [x] Relations définies correctement
- [x] Migrations initiales créées
- [x] Seeds pour données de test (users Bureau)
- [x] Index sur champs de recherche fréquents

---

## Implementation Notes

### Files Created

**Entities:**
- `services/backend/src/entities/user.entity.ts`
- `services/backend/src/entities/tomite.entity.ts`
- `services/backend/src/entities/member.entity.ts`
- `services/backend/src/entities/invitation.entity.ts`
- `services/backend/src/entities/index.ts`

**Migration:**
- `services/backend/src/migrations/1770191785802-InitialSchema.ts`

**Seeds:**
- `services/backend/src/seeds/run-seeds.ts`
- `services/backend/src/seeds/seed.config.ts`
- `services/backend/src/seeds/tomites.seed.ts`
- `services/backend/src/seeds/board-users.seed.ts`
- `services/backend/src/seeds/index.ts`

**Configuration:**
- `services/backend/src/config/typeorm.config.ts`

**Tests:**
- `services/backend/src/entities/user.entity.spec.ts`
- `services/backend/src/entities/tomite.entity.spec.ts`
- `services/backend/src/entities/member.entity.spec.ts`
- `services/backend/src/entities/invitation.entity.spec.ts`

**Shared Enums:**
- `shared/src/enums/invitation-role.enum.ts`
- `shared/src/enums/index.ts` (updated)

**Modified Files:**
- `services/backend/src/app.module.ts` (TypeORM integration)
- `services/backend/package.json` (dependencies and scripts)
- `services/backend/tsconfig.json` (path mappings)
- `services/backend/tsconfig.build.json` (new)
- `services/backend/.env.example` (seed config)
- `.gitignore` (updated)

### Database Indexes Created

All indexes from the specification have been implemented:
- `idx_tomites_code` (unique)
- `idx_users_email` (unique)
- `idx_members_tomite`
- `idx_members_search` (first_name, last_name)
- `idx_members_number` (unique)
- `idx_invitations_token` (unique)

### Seed Data

- Bureau tomite created with code `BUR`
- Board users seeded with password from `SEED_DEFAULT_PASSWORD` env variable
- Board user emails configurable via `SEED_BOARD_EMAILS` env variable
- Default password: `ChangeMe1234*`

### Running Seeds

```bash
# Ensure SEED_DEFAULT_PASSWORD is set in .env
yarn seed
```

### Status

**Completed**: 2026-02-03

---

## Schéma des entités

### User

```typescript
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
```

### Tomite

```typescript
- id: UUID (PK)
- code: string (unique, 2-4 chars)
- name: string
- description: string (nullable)
- createdAt: timestamp
- updatedAt: timestamp
```

### Member

```typescript
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
```

### Invitation

```typescript
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

## Relations

- **User** → **Tomite** : Many-to-One (un user appartient à un tomité)
- **User** → **Member** : One-to-One (un user peut être lié à un adhérent)
- **Member** → **Tomite** : Many-to-One (un adhérent appartient à un tomité)
- **Member** → **Tomite** (original) : Many-to-One (tomité d'origine)
- **Invitation** → **Tomite** : Many-to-One
- **Invitation** → **User** (createdBy) : Many-to-One

---

## Index recommandés

```sql
CREATE INDEX idx_members_tomite ON members(tomite_id);
CREATE INDEX idx_members_search ON members(first_name, last_name);
CREATE INDEX idx_members_number ON members(member_number);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_invitations_token ON invitations(token);
```

---

## Dépendances

- US-MVP-01.4 : Setup Backend
- US-MVP-01.2 : Setup Shared (pour les enums)

---

## Notes

Le schéma de base de données est le fondement de toute l'application. Les migrations doivent être versionnées et reproductibles.

---

## Senior Developer Review (AI)

**Review Date:** 2026-02-04
**Reviewer:** Claude Code (Adversarial Review)

### Issues Found & Fixed

| Severity | Issue | Resolution |
|----------|-------|------------|
| HIGH | Jest tests failing - shared module not transformed | Fixed `transformIgnorePatterns` in `package.json` |
| HIGH | `synchronize: true` in development mode | Changed to `synchronize: false` - always use migrations |
| MEDIUM | Hardcoded board user emails in seed | Made configurable via `SEED_BOARD_EMAILS` env var |
| MEDIUM | Invitation entity allowed BOARD role | Created `InvitationRole` enum with only TOMITE_PRESIDENT/SECRETARY |
| MEDIUM | 8 files changed but not documented | Updated file list in this document |

### Remaining Items (LOW)

- [ ] Move `BUREAU_TOMITE_CODE` constant to shared constants file
- [ ] Consider adding onDelete cascade rules for FK relations

### Verification

- ✅ All 27 tests passing
- ✅ TypeScript compilation successful
- ✅ All acceptance criteria implemented
