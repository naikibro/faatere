# US-MVP-04.2 : Page protection des mineurs

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-04.2 |
| **Epic** | E-MVP-04 : Gestion Adhérents |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** système,
**Je veux** afficher une page dédiée pour les mineurs,
**Afin d'** expliquer clairement notre politique.

---

## Critères d'acceptance

- [ ] Page /minors-not-allowed
- [ ] Message explicatif (cf. cahier des charges)
- [ ] Bouton "J'ai compris" → retour liste adhérents
- [ ] Accessible FR et TY

---

## Contenu de la page

### Français

> **Adhésion réservée aux personnes majeures**
>
> Conformément à la réglementation en vigueur et aux statuts du parti, seules les personnes âgées de 18 ans ou plus peuvent devenir adhérentes.
>
> Si vous avez entré une date de naissance par erreur, veuillez recommencer l'inscription avec les informations correctes.
>
> Pour toute question concernant cette politique, veuillez contacter le secrétariat du parti.

### Tahitien

> **No te feia paari 18 matahiti e nia atu**
>
> E au i te ture e te parau fa'ati'a o te pupu politita, e mea titau te feia e hinaaro e 'ite i te pupu ia 18 matahiti e nia atu.
>
> Mai te mea ua hape to outou mahana fanau'a, a ha'amata fa'ahou i te parau ha'amaura'a.

---

## Tâches techniques

- [ ] Créer page /minors-not-allowed
- [ ] Implémenter les traductions FR/TY
- [ ] Ajouter bouton de retour
- [ ] Style informatif et bienveillant

---

## Dépendances

- US-MVP-07.1 : Setup i18n

---

## Notes

Cette page est importante pour la conformité légale et doit être affichée immédiatement après détection d'un mineur.
