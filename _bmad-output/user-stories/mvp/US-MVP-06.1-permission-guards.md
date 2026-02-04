# US-MVP-06.1 : Guards de permission

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-06.1 |
| **Epic** | E-MVP-06 : RBAC |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** système,
**Je veux** vérifier les permissions sur chaque endpoint,
**Afin de** sécuriser l'accès aux données.

---

## Critères d'acceptance

- [ ] Guard NestJS vérifiant le rôle
- [ ] Décorateurs personnalisés : @Roles(), @TomiteAccess()
- [ ] Vérification tomiteId pour Président/Secrétaire
- [ ] Erreur 403 si accès non autorisé

---

## Matrice de permissions

| Endpoint | Bureau | Président | Secrétaire |
|----------|--------|-----------|------------|
| GET /tomites | Tous | Son tomité | Son tomité |
| POST /tomites | ✅ | ❌ | ❌ |
| GET /members | Tous | Son tomité | Son tomité |
| POST /members | Tous | Son tomité | Son tomité |
| DELETE /members | Tous | Son tomité | ❌ |
| POST /members/:id/transfer | Tous | Depuis son tomité | ❌ |
| GET /users | ✅ | ❌ | ❌ |
| POST /invitations | ✅ | Son tomité (Secrétaire) | ❌ |

---

## Tâches techniques

### Décorateurs

```typescript
// @Roles('BOARD', 'TOMITE_PRESIDENT')
@SetMetadata('roles', roles)

// @TomiteAccess() - vérifie que l'utilisateur a accès au tomité
@SetMetadata('checkTomiteAccess', true)
```

### Guards

- [ ] Créer RolesGuard
- [ ] Créer TomiteAccessGuard
- [ ] Combiner les guards selon les besoins

### Implémentation

- [ ] Extraire le user du JWT
- [ ] Vérifier le rôle
- [ ] Si non-Bureau, vérifier le tomiteId
- [ ] Retourner 403 Forbidden si non autorisé

---

## Dépendances

- US-MVP-02.3 : Protection des routes

---

## Notes

Le RBAC est fondamental pour la sécurité de l'application. Chaque endpoint doit être protégé explicitement.
