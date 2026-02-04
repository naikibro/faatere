# US-MVP-03.1 : Créer un tomité

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-03.1 |
| **Epic** | E-MVP-03 : Gestion Tomités |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** membre du Bureau,
**Je veux** créer un nouveau tomité,
**Afin d'** organiser les adhérents par zone géographique.

---

## Critères d'acceptance

- [ ] Endpoint POST /tomites
- [ ] Champs requis : code (2-4 chars, uppercase), name
- [ ] Champ optionnel : description
- [ ] Validation unicité du code
- [ ] Permission : Bureau uniquement

### Frontend

- [ ] Modal/page de création
- [ ] Formulaire avec validation
- [ ] Auto-uppercase du code

---

## Tâches techniques

### Backend

- [ ] Créer TomitesModule
- [ ] Créer TomitesService avec méthode create
- [ ] Créer TomitesController avec endpoint POST
- [ ] Créer CreateTomiteDto avec validations
- [ ] Implémenter guard Bureau

### Frontend

- [ ] Créer composant TomiteForm
- [ ] Implémenter validation zod
- [ ] Auto-transform uppercase sur le champ code
- [ ] Afficher erreur si code déjà utilisé

---

## Dépendances

- US-MVP-01.10 : Setup Base de données
- US-MVP-02.3 : Protection des routes

---

## Notes

Le code du tomité est unique et ne peut pas être modifié après création. Il sert d'identifiant court pour les numéros d'adhérents.
