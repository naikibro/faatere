# US-MVP-04.5 : Voir détail adhérent

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-04.5 |
| **Epic** | E-MVP-04 : Gestion Adhérents |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** gestionnaire,
**Je veux** voir toutes les informations d'un adhérent,
**Afin de** consulter son dossier complet.

---

## Critères d'acceptance

- [ ] Endpoint GET /members/:id
- [ ] Retourne toutes les infos de l'adhérent
- [ ] Permission : même règle de cloisonnement

### Frontend

- [ ] Page /members/:id
- [ ] Affichage photo, infos personnelles, statut paiement
- [ ] Actions : modifier, supprimer (si autorisé), transférer, générer carte (V1.0)

---

## Tâches techniques

### Backend

- [ ] Implémenter méthode findOne dans MembersService
- [ ] Vérifier le cloisonnement par tomité
- [ ] Créer MemberDetailDto

### Frontend

- [ ] Créer page /members/:id
- [ ] Afficher photo en grand
- [ ] Section informations personnelles
- [ ] Section adhésion (numéro, date, tomité)
- [ ] Section paiement
- [ ] Barre d'actions

---

## Dépendances

- US-MVP-04.4 : Lister les adhérents

---

## Notes

La page de détail est le point central pour toutes les actions sur un adhérent.
