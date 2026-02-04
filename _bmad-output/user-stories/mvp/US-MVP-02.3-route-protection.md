# US-MVP-02.3 : Protection des routes

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-02.3 |
| **Epic** | E-MVP-02 : Authentification |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** système,
**Je veux** protéger les routes API et frontend,
**Afin de** sécuriser l'accès aux données.

---

## Critères d'acceptance

- [ ] Guard JWT sur toutes les routes API (sauf /auth/*)
- [ ] Middleware Next.js pour protection routes frontend
- [ ] Redirection vers /login si non authentifié
- [ ] Refresh automatique du token si expiré

---

## Tâches techniques

### Backend

- [ ] Créer JwtAuthGuard global
- [ ] Créer décorateur @Public() pour routes publiques
- [ ] Configurer le guard globalement dans AppModule
- [ ] Implémenter refresh token endpoint

### Frontend

- [ ] Créer middleware Next.js pour vérifier l'authentification
- [ ] Configurer les routes protégées
- [ ] Implémenter refresh token automatique côté client
- [ ] Gérer les erreurs 401 globalement

---

## Dépendances

- US-MVP-02.2 : Login email/password

---

## Notes

Le refresh token permet une meilleure expérience utilisateur sans compromettre la sécurité.
