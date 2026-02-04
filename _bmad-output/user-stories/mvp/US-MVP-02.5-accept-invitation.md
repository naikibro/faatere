# US-MVP-02.5 : Acceptation invitation

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-02.5 |
| **Epic** | E-MVP-02 : Authentification |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** nouvel utilisateur invité,
**Je veux** créer mon compte via le lien d'invitation,
**Afin de** pouvoir me connecter.

---

## Critères d'acceptance

- [ ] Page /auth/setup-password?token=xxx
- [ ] Validation token valide et non expiré
- [ ] Formulaire : mot de passe + confirmation
- [ ] Validation force mot de passe (min 8 chars, 1 majuscule, 1 chiffre)
- [ ] Création du compte User
- [ ] Marquage invitation comme utilisée (usedAt)
- [ ] Redirection vers login avec message succès

---

## Tâches techniques

### Backend

- [ ] Endpoint GET /invitations/validate/:token (vérification)
- [ ] Endpoint POST /invitations/accept
- [ ] Valider token et expiration
- [ ] Créer User avec rôle et tomité de l'invitation
- [ ] Marquer l'invitation comme utilisée

### Frontend

- [ ] Créer page /auth/setup-password
- [ ] Vérifier token au chargement
- [ ] Afficher formulaire de création mot de passe
- [ ] Validation en temps réel de la force du mot de passe
- [ ] Message d'erreur si token invalide/expiré

---

## Dépendances

- US-MVP-02.4 : Création invitation

---

## Notes

La page d'acceptation doit être accessible sans authentification (route publique).
