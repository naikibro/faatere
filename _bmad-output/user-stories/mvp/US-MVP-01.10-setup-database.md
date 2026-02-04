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

- [ ] Entités créées : User, Tomite, Member, Invitation
- [ ] Relations définies correctement
- [ ] Migrations initiales créées
- [ ] Seeds pour données de test (users Bureau)
- [ ] Index sur champs de recherche fréquents

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
