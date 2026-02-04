# US-MVP-04.4 : Lister les adhérents

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-04.4 |
| **Epic** | E-MVP-04 : Gestion Adhérents |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** gestionnaire de tomité,
**Je veux** voir la liste des adhérents de mon tomité,
**Afin de** les gérer.

---

## Critères d'acceptance

- [ ] Endpoint GET /members
- [ ] Paramètres : tomiteId (obligatoire sauf Bureau), page, limit
- [ ] Retourne : liste paginée avec infos essentielles
- [ ] Bureau : peut voir tous les tomités
- [ ] Président/Secrétaire : uniquement leur tomité
- [ ] Tri par défaut : nom ASC

### Frontend

- [ ] Page /tomites/:id/members
- [ ] Tableau avec colonnes : photo, nom, prénom, numéro, statut paiement
- [ ] Pagination
- [ ] Clic ligne → détail adhérent

---

## Tâches techniques

### Backend

- [ ] Implémenter méthode findAll dans MembersService
- [ ] Ajouter filtrage par tomité
- [ ] Implémenter pagination (page, limit)
- [ ] Créer MemberListDto (version allégée)

### Frontend

- [ ] Créer page /tomites/:id/members
- [ ] Créer composant MembersTable
- [ ] Implémenter pagination
- [ ] Afficher miniature photo
- [ ] Badge statut paiement (vert/rouge)

---

## Dépendances

- US-MVP-04.1 : Créer un adhérent
- US-MVP-03.2 : Lister les tomités

---

## Notes

La pagination est essentielle pour les performances avec potentiellement 80 000 adhérents.
