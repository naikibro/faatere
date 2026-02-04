# US-MVP-03.3 : Modifier un tomité

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-03.3 |
| **Epic** | E-MVP-03 : Gestion Tomités |
| **Milestone** | MVP |
| **Priorité** | P1 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** membre du Bureau,
**Je veux** modifier un tomité existant,
**Afin de** corriger les informations.

---

## Critères d'acceptance

- [ ] Endpoint PATCH /tomites/:id
- [ ] Champs modifiables : name, description
- [ ] Code NON modifiable
- [ ] Permission : Bureau uniquement

---

## Tâches techniques

### Backend

- [ ] Implémenter méthode update dans TomitesService
- [ ] Créer UpdateTomiteDto (sans code)
- [ ] Ajouter endpoint PATCH dans le controller
- [ ] Vérifier que le code n'est pas dans le body

### Frontend

- [ ] Créer modal d'édition (réutiliser TomiteForm)
- [ ] Pré-remplir les champs
- [ ] Désactiver le champ code

---

## Dépendances

- US-MVP-03.1 : Créer un tomité

---

## Notes

Le code est immutable car il est utilisé dans les numéros d'adhérents.
