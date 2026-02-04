# US-MVP-04.7 : Supprimer un adhérent

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-04.7 |
| **Epic** | E-MVP-04 : Gestion Adhérents |
| **Milestone** | MVP |
| **Priorité** | P1 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** Président de tomité ou Bureau,
**Je veux** supprimer un adhérent,
**Afin de** retirer quelqu'un du parti.

---

## Critères d'acceptance

- [ ] Endpoint DELETE /members/:id
- [ ] Soft delete (flag deleted ou table archive)
- [ ] Permission : Bureau, Président (pas Secrétaire)
- [ ] Confirmation requise (saisie nom de l'adhérent)

### Frontend

- [ ] Modal de confirmation
- [ ] Saisie du nom pour confirmer
- [ ] Message de succès

---

## Tâches techniques

### Backend

- [ ] Implémenter soft delete dans MembersService
- [ ] Ajouter champ deletedAt ou isDeleted
- [ ] Exclure les supprimés des requêtes par défaut
- [ ] Vérifier les permissions (pas Secrétaire)

### Frontend

- [ ] Créer modal DeleteMemberModal
- [ ] Champ de confirmation (nom complet)
- [ ] Bouton désactivé tant que le nom ne correspond pas

---

## Dépendances

- US-MVP-04.5 : Voir détail adhérent
- US-MVP-06.1 : Guards de permission

---

## Notes

Le soft delete permet de conserver les données pour l'audit et éventuellement restaurer un adhérent supprimé par erreur.
