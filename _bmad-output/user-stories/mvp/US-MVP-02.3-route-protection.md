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

- [x] Guard JWT sur toutes les routes API (sauf /auth/*)
- [x] Middleware Next.js pour protection routes frontend
- [x] Redirection vers /login si non authentifié
- [x] Refresh automatique du token si expiré

---

## Tâches techniques

### Backend

- [x] Créer JwtAuthGuard global
- [x] Créer décorateur @Public() pour routes publiques
- [x] Configurer le guard globalement dans AppModule
- [x] Implémenter refresh token endpoint

### Frontend

- [x] Créer middleware Next.js pour vérifier l'authentification
- [x] Configurer les routes protégées
- [x] Implémenter refresh token automatique côté client
- [x] Gérer les erreurs 401 globalement

---

## Dépendances

- US-MVP-02.2 : Login email/password

---

## Notes

Le refresh token permet une meilleure expérience utilisateur sans compromettre la sécurité.

---

## Dev Agent Record

### Implementation Plan

**Backend (pre-existing from US-MVP-02.2, verified and tested):**
- JwtAuthGuard registered as APP_GUARD in AppModule - validates JWT on all routes
- @Public() decorator uses SetMetadata to mark routes that bypass JWT validation
- JwtAuthGuard checks IS_PUBLIC_KEY metadata and skips auth for @Public() routes
- Refresh token endpoint POST /auth/refresh verifies token, checks user is active, returns new token pair

**Frontend (enhanced in this story):**
- `lib/auth.ts`: Added AUTH_COOKIE_NAME constant, setToken() now also sets a cookie for middleware access, clearTokens() clears the cookie
- `middleware.ts`: Reads faatere_auth cookie to check authentication server-side, redirects to /login with returnTo parameter if unauthenticated
- `lib/api.ts`: Implemented automatic token refresh on 401 with request queuing pattern to handle concurrent requests during refresh

### Completion Notes

All 8 tasks completed successfully. Backend route protection was already implemented as part of US-MVP-02.2 (JwtAuthGuard, @Public() decorator, global guard config, refresh endpoint). This story added comprehensive tests for the backend auth module (31 new tests across 5 test files) and enhanced the frontend with:

1. Cookie-based middleware authentication check (server-side redirect to /login)
2. Automatic token refresh on 401 with concurrent request queuing
3. Proper token cleanup on refresh failure

All 92 backend tests pass. Frontend TypeScript compiles with zero errors. No regressions introduced.

---

## File List

### New Files
- `services/backend/src/modules/auth/guards/jwt-auth.guard.spec.ts`
- `services/backend/src/modules/auth/auth.service.spec.ts`
- `services/backend/src/modules/auth/auth.controller.spec.ts`
- `services/backend/src/modules/auth/strategies/jwt.strategy.spec.ts`
- `services/backend/src/modules/auth/strategies/local.strategy.spec.ts`
- `documentation/docs/auth/jwt.md`
- `documentation/docs/auth/refresh-token.md`

### Modified Files
- `frontend/src/lib/auth.ts`
- `frontend/src/middleware.ts`
- `frontend/src/lib/api.ts`
- `documentation/docs/feature-authentication.md`
- `documentation/sidebars.ts`

---

## Change Log

| Date | Change |
|------|--------|
| 2026-02-05 | Implemented US-MVP-02.3: Verified backend route protection (JwtAuthGuard, @Public(), global guard, refresh endpoint), added 31 backend auth tests, enhanced frontend middleware with cookie-based auth check, implemented automatic token refresh on 401 with request queuing |
| 2026-02-05 | Enhanced auth documentation: restructured feature-authentication.md as overview hub, created dedicated sub-docs for JWT authentication (auth/jwt.md) and refresh token mechanism (auth/refresh-token.md), updated Docusaurus sidebar with nested navigation |

---

## Status

review
