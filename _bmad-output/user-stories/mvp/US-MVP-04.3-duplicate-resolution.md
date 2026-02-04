# US-MVP-04.3 : Résolution de conflit doublon

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-04.3 |
| **Epic** | E-MVP-04 : Gestion Adhérents |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** gestionnaire,
**Je veux** résoudre un conflit de doublon,
**Afin de** gérer les homonymes ou transferts.

---

## Critères d'acceptance

- [ ] Endpoint POST /members/resolve-conflict
- [ ] Actions possibles :
  - `TRANSFER` : demande de transfert (si même personne)
  - `CREATE_ANYWAY` : créer malgré tout (homonyme)
  - `CANCEL` : annuler
- [ ] Si TRANSFER : création d'une demande de transfert (ou transfert direct si Bureau)

### Frontend

- [ ] Modal avec infos de l'adhérent existant
- [ ] 3 options radio + bouton valider
- [ ] Explication de chaque option

---

## Interface de résolution

### Option 1 : TRANSFER
> C'est la même personne et je souhaite la transférer dans mon tomité.

### Option 2 : CREATE_ANYWAY
> Ce sont des homonymes (personnes différentes avec les mêmes informations).

### Option 3 : CANCEL
> Annuler l'inscription.

---

## Tâches techniques

### Backend

- [ ] Créer endpoint resolve-conflict
- [ ] Implémenter logique selon l'action choisie
- [ ] Si TRANSFER par Bureau : exécuter directement
- [ ] Si TRANSFER par non-Bureau : créer demande de transfert

### Frontend

- [ ] Créer composant DuplicateConflictModal
- [ ] Afficher les infos du doublon détecté
- [ ] Implémenter les 3 options
- [ ] Gérer le retour de chaque action

---

## Dépendances

- US-MVP-04.1 : Créer un adhérent
- US-MVP-04.8 : Transférer un adhérent

---

## Notes

La détection de doublon se base sur (firstName, lastName, birthDate, birthPlace). Des homonymes avec des lieux de naissance différents ne seront pas détectés comme doublons.
