# US-MVP-02.7 : Gestion utilisateurs (Bureau)

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-02.7 |
| **Epic** | E-MVP-02 : Authentification |
| **Milestone** | MVP |
| **Priorité** | P1 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** membre du Bureau,
**Je veux** gérer les utilisateurs existants,
**Afin de** contrôler les accès.

---

## Critères d'acceptance

### Backend

- [ ] Endpoint GET /users (liste paginée)
- [ ] Endpoint PATCH /users/:id (modification)
- [ ] Endpoint PATCH /users/:id/password (reset password)
- [ ] Endpoint PATCH /users/:id/deactivate
- [ ] Endpoint DELETE /users/:id (si désactivé uniquement)
- [ ] Permission : Bureau uniquement

### Frontend

- [ ] Page /users avec liste
- [ ] Actions : modifier, reset password, désactiver, supprimer
- [ ] Confirmation pour actions destructives

---

## Tâches techniques

### Backend

- [ ] Créer UsersModule
- [ ] Créer UsersService avec méthodes CRUD
- [ ] Créer UsersController avec endpoints
- [ ] Implémenter guards de permission Bureau
- [ ] Créer DTOs pour chaque opération

### Frontend

- [ ] Créer page /users
- [ ] Créer composant UsersTable
- [ ] Créer modal de modification
- [ ] Créer modal de confirmation suppression
- [ ] Implémenter appels API

---

## Dépendances

- US-MVP-02.3 : Protection des routes
- US-MVP-06.1 : Guards de permission

---

## Notes

La suppression d'un utilisateur ne doit être possible que s'il est désactivé, pour éviter les suppressions accidentelles.
