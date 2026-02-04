# US-MVP-03.4 : Supprimer un tomité

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-03.4 |
| **Epic** | E-MVP-03 : Gestion Tomités |
| **Milestone** | MVP |
| **Priorité** | P2 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** membre du Bureau,
**Je veux** supprimer un tomité vide,
**Afin de** nettoyer les données obsolètes.

---

## Critères d'acceptance

- [ ] Endpoint DELETE /tomites/:id
- [ ] Vérification : aucun adhérent rattaché
- [ ] Vérification : aucun utilisateur rattaché
- [ ] Erreur 400 si tomité non vide
- [ ] Permission : Bureau uniquement

---

## Tâches techniques

### Backend

- [ ] Implémenter méthode delete dans TomitesService
- [ ] Vérifier le count des adhérents liés
- [ ] Vérifier le count des utilisateurs liés
- [ ] Retourner erreur explicite si non vide

### Frontend

- [ ] Ajouter bouton supprimer sur la page tomité
- [ ] Modal de confirmation
- [ ] Afficher erreur si tomité non vide

---

## Dépendances

- US-MVP-03.1 : Créer un tomité

---

## Notes

Un tomité ne peut être supprimé que s'il est complètement vide (aucun adhérent, aucun utilisateur).
