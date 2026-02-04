# US-MVP-02.4 : Création invitation

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-02.4 |
| **Epic** | E-MVP-02 : Authentification |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** membre du Bureau,
**Je veux** inviter un nouveau membre (Président/Secrétaire),
**Afin qu'** il puisse rejoindre l'application.

---

## Critères d'acceptance

### Backend

- [ ] Endpoint POST /invitations
- [ ] Champs requis : email, role, tomiteId
- [ ] Génération token UUID unique
- [ ] Expiration : 7 jours
- [ ] Envoi email avec lien d'invitation
- [ ] Vérification : email pas déjà utilisé
- [ ] Vérification : tomité existe
- [ ] Permission : Bureau peut inviter tous rôles, Président peut inviter Secrétaire de son tomité

### Frontend

- [ ] Page /users/invite
- [ ] Formulaire : email, rôle (select), tomité (select)
- [ ] Confirmation envoi
- [ ] Liste des invitations en attente

---

## Tâches techniques

### Backend

- [ ] Créer InvitationsModule
- [ ] Créer InvitationsService avec méthodes create, list, revoke
- [ ] Configurer service d'envoi email (Resend)
- [ ] Créer template email d'invitation
- [ ] Implémenter validations de permission

### Frontend

- [ ] Créer page /users/invite
- [ ] Créer composant InvitationForm
- [ ] Créer composant InvitationsList
- [ ] Implémenter appels API

---

## Dépendances

- US-MVP-02.3 : Protection des routes
- US-MVP-03.2 : Lister les tomités

---

## Notes

L'envoi d'email peut être différé en utilisant une file d'attente pour améliorer les performances.
