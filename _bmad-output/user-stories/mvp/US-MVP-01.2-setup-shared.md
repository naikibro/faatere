# US-MVP-01.2 : Setup Workspace Shared (Types partagés)

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-01.2 |
| **Epic** | E-MVP-01 : Setup Projet |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |
| **Status** | Done |

---

## User Story

**En tant que** développeur,
**Je veux** créer un workspace `shared` avec les types TypeScript partagés,
**Afin de** réutiliser les interfaces et enums entre frontend, backend et mobile.

---

## Critères d'acceptance

- [x] Workspace `shared/` créé avec son `package.json`
- [x] `tsconfig.json` configuré pour compilation
- [x] Enums définis : `UserRole`, `PaymentMethod`
- [x] Interfaces définies : `IUser`, `IMember`, `ITomite`, `IInvitation`
- [x] Export centralisé via `index.ts`
- [x] Script `build` fonctionnel

---

## Tâches techniques

- [x] Créer `shared/package.json` :
  ```json
  {
    "name": "shared",
    "version": "1.0.0",
    "private": true,
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "scripts": {
      "build": "tsc",
      "compile": "tsc --noEmit"
    },
    "devDependencies": {
      "typescript": "^5.7.3"
    }
  }
  ```
- [x] Créer structure `shared/src/` :
  ```
  shared/src/
  ├── index.ts
  ├── enums/
  │   ├── index.ts
  │   ├── role.enum.ts
  │   ├── payment-method.enum.ts
  │   └── audit-action.enum.ts
  └── interfaces/
      ├── index.ts
      ├── user.interface.ts
      ├── member.interface.ts
      ├── tomite.interface.ts
      ├── invitation.interface.ts
      └── audit-log.interface.ts
  ```
- [x] Définir les enums et interfaces selon le schéma de données du cahier des charges

---

## Contenu des fichiers

### `shared/src/enums/role.enum.ts`

```typescript
export enum UserRole {
  BOARD = 'BOARD',
  TOMITE_PRESIDENT = 'TOMITE_PRESIDENT',
  SECRETARY = 'SECRETARY',
}
```

### `shared/src/enums/payment-method.enum.ts`

```typescript
export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  TRANSFER = 'TRANSFER',
}
```

---

## Références

- [air-tahiti-app-v2/shared](https://github.com/devlab-io/air-tahiti-app-v2/tree/main/shared)

---

## Dépendances

- US-MVP-01.1 : Setup Monorepo

---

## Notes

Les types partagés assurent la cohérence des données entre tous les workspaces du monorepo.

---

## Dev Agent Record

### Implementation Date
2026-02-03

### Commit
`c485a63` - feat(monorepo): setup Yarn Workspaces and shared types

### File List
- `shared/package.json` - Workspace config
- `shared/tsconfig.json` - Extends root tsconfig
- `shared/src/index.ts` - Barrel export
- `shared/src/enums/index.ts` - Enums barrel
- `shared/src/enums/role.enum.ts` - UserRole enum
- `shared/src/enums/payment-method.enum.ts` - PaymentMethod enum
- `shared/src/enums/audit-action.enum.ts` - AuditAction enum (added during review)
- `shared/src/interfaces/index.ts` - Interfaces barrel
- `shared/src/interfaces/user.interface.ts` - IUser interface
- `shared/src/interfaces/member.interface.ts` - IMember interface
- `shared/src/interfaces/tomite.interface.ts` - ITomite interface
- `shared/src/interfaces/invitation.interface.ts` - IInvitation interface
- `shared/src/interfaces/audit-log.interface.ts` - IAuditLog interface (added during review)

### Notes
- Added `AuditAction` enum and `IAuditLog` interface during code review (from cahier des charges section 5.6)
- Added `createdAt` field to `IInvitation` for consistency with other interfaces
- `shared/tsconfig.json` extends root `tsconfig.json` to reduce duplication
- Build verified: `yarn workspace shared build` compiles successfully
