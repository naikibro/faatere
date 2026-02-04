# US-MVP-04.6 : Modifier un adhérent

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-04.6 |
| **Epic** | E-MVP-04 : Gestion Adhérents |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** gestionnaire,
**Je veux** modifier les informations d'un adhérent,
**Afin de** corriger ou mettre à jour son dossier.

---

## Critères d'acceptance

- [ ] Endpoint PATCH /members/:id
- [ ] Tous les champs modifiables sauf memberNumber
- [ ] Revalidation âge si birthDate modifié
- [ ] Permission : Bureau, Président, Secrétaire (leur tomité)

### Frontend

- [ ] Page /members/:id/edit ou modal
- [ ] Formulaire pré-rempli
- [ ] Même validations que création

---

## Tâches techniques

### Backend

- [ ] Implémenter méthode update dans MembersService
- [ ] Créer UpdateMemberDto (sans memberNumber)
- [ ] Revalider l'âge si birthDate change
- [ ] Vérifier le cloisonnement

### Frontend

- [ ] Créer formulaire d'édition
- [ ] Pré-remplir avec les données actuelles
- [ ] Désactiver le champ memberNumber
- [ ] Afficher avertissement si birthDate modifié

---

## Dépendances

- US-MVP-04.5 : Voir détail adhérent

---

## Notes

Le numéro d'adhérent est immutable car il sert de référence unique.
