# US-MVP-04.8 : Transférer un adhérent

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-04.8 |
| **Epic** | E-MVP-04 : Gestion Adhérents |
| **Milestone** | MVP |
| **Priorité** | P1 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** Président ou Bureau,
**Je veux** transférer un adhérent vers un autre tomité,
**Afin de** gérer les changements de zone.

---

## Critères d'acceptance

- [ ] Endpoint POST /members/:id/transfer
- [ ] Body : targetTomiteId
- [ ] Mise à jour tomiteId (originalTomiteId reste inchangé)
- [ ] Opération atomique
- [ ] Permission : Bureau (tous), Président (depuis son tomité)

### Frontend

- [ ] Modal avec select du tomité cible
- [ ] Avertissement : numéro conservé
- [ ] Confirmation

---

## Tâches techniques

### Backend

- [ ] Implémenter méthode transfer dans MembersService
- [ ] Vérifier que le tomité cible existe
- [ ] Vérifier les permissions
- [ ] Transaction pour atomicité
- [ ] Logger le transfert pour audit

### Frontend

- [ ] Créer modal TransferMemberModal
- [ ] Liste déroulante des tomités disponibles
- [ ] Afficher l'avertissement sur le numéro
- [ ] Bouton de confirmation

---

## Comportement du numéro d'adhérent

Le numéro d'adhérent (ex: PPT-2026-00001) reste inchangé après un transfert. Cela permet de :
- Conserver la traçabilité de l'origine
- Éviter les doublons de numéros
- Faciliter les recherches historiques

Le champ `originalTomiteId` conserve le tomité d'origine.

---

## Dépendances

- US-MVP-04.5 : Voir détail adhérent
- US-MVP-03.2 : Lister les tomités

---

## Notes

Un transfert est une opération importante qui doit être tracée dans les logs d'audit (V1.0).
