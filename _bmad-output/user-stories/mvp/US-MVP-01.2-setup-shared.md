# US-MVP-01.2 : Setup Workspace Shared (Types partagés)

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-01.2 |
| **Epic** | E-MVP-01 : Setup Projet |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** développeur,
**Je veux** créer un workspace `shared` avec les types TypeScript partagés,
**Afin de** réutiliser les interfaces et enums entre frontend, backend et mobile.

---

## Critères d'acceptance

- [ ] Workspace `shared/` créé avec son `package.json`
- [ ] `tsconfig.json` configuré pour compilation
- [ ] Enums définis : `UserRole`, `PaymentMethod`
- [ ] Interfaces définies : `IUser`, `IMember`, `ITomite`, `IInvitation`
- [ ] Export centralisé via `index.ts`
- [ ] Script `build` fonctionnel

---

## Tâches techniques

- [ ] Créer `shared/package.json` :
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
- [ ] Créer structure `shared/src/` :
  ```
  shared/src/
  ├── index.ts
  ├── enums/
  │   ├── role.enum.ts
  │   └── payment-method.enum.ts
  └── interfaces/
      ├── user.interface.ts
      ├── member.interface.ts
      └── tomite.interface.ts
  ```
- [ ] Définir les enums et interfaces selon le schéma de données du cahier des charges

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
