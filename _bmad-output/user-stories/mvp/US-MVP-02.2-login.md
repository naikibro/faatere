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

- [x] Endpoint POST /auth/login
- [x] Validation email format + password requis
- [x] Vérification compte actif (isActive === true)
- [x] Retourne JWT access token (expiration 24h)
- [x] Retourne refresh token (expiration 7 jours)
- [x] Erreur 401 si credentials invalides
- [x] Erreur 403 si compte désactivé
- [x] Rate limiting : 5 tentatives / minute

### Frontend

- [x] Page /login avec formulaire
- [x] Validation côté client
- [x] Affichage erreurs
- [x] Redirection vers dashboard après login
- [x] Stockage token sécurisé (httpOnly cookie ou localStorage)
- [x] Toggle visibilité mot de passe

---

## Tâches techniques

### Backend

- [x] Créer AuthModule avec AuthService et AuthController
- [x] Implémenter stratégie Passport Local
- [x] Implémenter stratégie Passport JWT
- [x] Configurer @nestjs/jwt avec secret et expiration
- [x] Créer DTO LoginDto avec validations
- [x] Implémenter rate limiting avec @nestjs/throttler

### Frontend

- [x] Créer page /login avec formulaire react-hook-form
- [x] Configurer zod schema pour validation
- [x] Implémenter hook useAuth pour gestion état authentification
- [x] Configurer axios interceptors pour token

---

## Dépendances

- US-MVP-02.1 : Migration utilisateurs Bureau
- US-MVP-01.4 : Setup Backend
- US-MVP-01.5 : Setup Frontend

---

## Notes

La sécurité de l'authentification est primordiale. Utiliser httpOnly cookies si possible pour éviter les attaques XSS.
