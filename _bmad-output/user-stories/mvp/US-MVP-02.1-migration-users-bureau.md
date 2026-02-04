# US-MVP-02.1 : Migration utilisateurs Bureau

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-02.1 |
| **Epic** | E-MVP-02 : Authentification |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** administrateur système,
**Je veux** que les utilisateurs Bureau soient créés automatiquement au déploiement,
**Afin de** pouvoir me connecter immédiatement.

---

## Critères d'acceptance

- [ ] Migration créant les users Bureau depuis variable d'environnement
- [ ] Format env : `BOARD_USERS=email1:password1,email2:password2`
- [ ] Mots de passe hashés avec bcrypt (salt rounds 12)
- [ ] Migration idempotente (ne recrée pas si existe)

---

## Tâches techniques

- [ ] Créer migration TypeORM pour les users Bureau
- [ ] Parser la variable d'environnement `BOARD_USERS`
- [ ] Vérifier si l'email existe déjà avant création
- [ ] Hasher le mot de passe avec bcrypt (12 rounds)
- [ ] Logger les créations/skip pour debugging

---

## Dépendances

- US-MVP-01.10 : Setup Base de données

---

## Notes

Cette migration est critique car elle permet le premier accès à l'application. Elle doit être idempotente pour pouvoir être rejouée sans erreur.
