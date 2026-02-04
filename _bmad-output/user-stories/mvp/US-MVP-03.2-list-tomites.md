# US-MVP-03.2 : Lister les tomités

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-03.2 |
| **Epic** | E-MVP-03 : Gestion Tomités |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** utilisateur,
**Je veux** voir la liste des tomités,
**Afin de** naviguer vers les adhérents.

---

## Critères d'acceptance

- [ ] Endpoint GET /tomites
- [ ] Retourne : id, code, name, description, memberCount
- [ ] Bureau : voit tous les tomités
- [ ] Président/Secrétaire : voit uniquement son tomité
- [ ] Tri par nom alphabétique

### Frontend

- [ ] Page /tomites avec liste/grille
- [ ] Affichage nombre d'adhérents par tomité
- [ ] Clic → navigation vers /tomites/:id/members

---

## Tâches techniques

### Backend

- [ ] Implémenter méthode findAll dans TomitesService
- [ ] Ajouter comptage des membres (aggregate ou subquery)
- [ ] Filtrer selon le rôle de l'utilisateur
- [ ] Créer TomiteResponseDto

### Frontend

- [ ] Créer page /tomites
- [ ] Créer composant TomiteCard ou TomiteRow
- [ ] Afficher badge avec nombre d'adhérents
- [ ] Implémenter navigation

---

## Dépendances

- US-MVP-03.1 : Créer un tomité
- US-MVP-06.1 : Guards de permission

---

## Notes

Le cloisonnement est essentiel : un Président ne doit voir que son tomité.
