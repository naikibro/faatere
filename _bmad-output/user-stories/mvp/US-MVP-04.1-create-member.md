# US-MVP-04.1 : Créer un adhérent

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-04.1 |
| **Epic** | E-MVP-04 : Gestion Adhérents |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** gestionnaire de tomité,
**Je veux** ajouter un nouvel adhérent,
**Afin de** l'enregistrer dans le parti.

---

## Critères d'acceptance

### Backend

- [ ] Endpoint POST /members
- [ ] Champs requis : firstName, lastName, birthDate, birthPlace, address, tomiteId
- [ ] Champs optionnels : email, phone, photoUrl
- [ ] Validation âge ≥ 18 ans (calculé depuis birthDate)
- [ ] Erreur 400 avec message dédié si mineur
- [ ] Génération automatique memberNumber : {CODE_TOMITE}-{YEAR}-{SEQUENCE}
- [ ] Détection doublon sur (firstName, lastName, birthDate, birthPlace)
- [ ] Si doublon : retourne 409 avec infos du doublon existant
- [ ] Initialisation : hasPaid = false, paymentMethod = null
- [ ] Permission : Bureau (tous), Président/Secrétaire (leur tomité)

### Frontend

- [ ] Page /members/new ou modal
- [ ] Étape 1 : Saisie date de naissance → validation immédiate
- [ ] Si < 18 ans : redirection page /minors-not-allowed
- [ ] Étape 2 : Formulaire complet
- [ ] Upload photo depuis galerie
- [ ] Gestion conflit doublon (modal de résolution)

---

## Tâches techniques

### Backend

- [ ] Créer MembersModule
- [ ] Créer MembersService avec méthode create
- [ ] Implémenter génération du numéro d'adhérent
- [ ] Implémenter détection des doublons
- [ ] Créer CreateMemberDto avec validations

### Frontend

- [ ] Créer page /members/new avec formulaire multi-étapes
- [ ] Créer composant AgeValidator
- [ ] Créer composant DuplicateResolver

---

## Algorithme de génération du numéro

```
{CODE_TOMITE}-{YEAR}-{SEQUENCE}
Exemple : PPT-2026-00001

- CODE_TOMITE : Code du tomité (ex: PPT pour Papeete)
- YEAR : Année courante sur 4 chiffres
- SEQUENCE : Numéro séquentiel sur 5 chiffres, paddé avec des zéros
```

---

## Dépendances

- US-MVP-03.2 : Lister les tomités
- US-MVP-01.10 : Setup Base de données

---

## Notes

La validation de l'âge doit être stricte et immédiate pour protéger les mineurs.
