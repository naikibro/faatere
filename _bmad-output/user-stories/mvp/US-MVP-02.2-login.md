# US-MVP-02.2 : Login email/password

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-02.2 |
| **Epic** | E-MVP-02 : Authentification |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** utilisateur,
**Je veux** me connecter avec mon email et mot de passe,
**Afin d'** accéder à l'application.

---

## Critères d'acceptance

### Backend

- [ ] Endpoint POST /auth/login
- [ ] Validation email format + password requis
- [ ] Vérification compte actif (isActive === true)
- [ ] Retourne JWT access token (expiration 24h)
- [ ] Retourne refresh token (expiration 7 jours)
- [ ] Erreur 401 si credentials invalides
- [ ] Erreur 403 si compte désactivé
- [ ] Rate limiting : 5 tentatives / minute

### Frontend

- [ ] Page /login avec formulaire
- [ ] Validation côté client
- [ ] Affichage erreurs
- [ ] Redirection vers dashboard après login
- [ ] Stockage token sécurisé (httpOnly cookie ou localStorage)

---

## Tâches techniques

### Backend

- [ ] Créer AuthModule avec AuthService et AuthController
- [ ] Implémenter stratégie Passport Local
- [ ] Implémenter stratégie Passport JWT
- [ ] Configurer @nestjs/jwt avec secret et expiration
- [ ] Créer DTO LoginDto avec validations
- [ ] Implémenter rate limiting avec @nestjs/throttler

### Frontend

- [ ] Créer page /login avec formulaire react-hook-form
- [ ] Configurer zod schema pour validation
- [ ] Implémenter hook useAuth pour gestion état authentification
- [ ] Configurer axios interceptors pour token

---

## Dépendances

- US-MVP-02.1 : Migration utilisateurs Bureau
- US-MVP-01.4 : Setup Backend
- US-MVP-01.5 : Setup Frontend

---

## Notes

La sécurité de l'authentification est primordiale. Utiliser httpOnly cookies si possible pour éviter les attaques XSS.
