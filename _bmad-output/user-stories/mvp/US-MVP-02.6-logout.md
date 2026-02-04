# US-MVP-02.6 : Logout

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-02.6 |
| **Epic** | E-MVP-02 : Authentification |
| **Milestone** | MVP |
| **Priorité** | P1 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** utilisateur connecté,
**Je veux** me déconnecter,
**Afin de** sécuriser ma session.

---

## Critères d'acceptance

- [ ] Endpoint POST /auth/logout
- [ ] Invalidation du refresh token
- [ ] Frontend : suppression token local
- [ ] Redirection vers /login

---

## Tâches techniques

### Backend

- [ ] Implémenter endpoint logout
- [ ] Stocker les refresh tokens invalidés (blacklist ou suppression)
- [ ] Vérifier la blacklist lors du refresh

### Frontend

- [ ] Bouton logout dans le header/menu
- [ ] Appeler l'API logout
- [ ] Supprimer le token du storage
- [ ] Rediriger vers /login

---

## Dépendances

- US-MVP-02.2 : Login email/password

---

## Notes

La déconnexion doit invalider le refresh token côté serveur pour éviter sa réutilisation.
