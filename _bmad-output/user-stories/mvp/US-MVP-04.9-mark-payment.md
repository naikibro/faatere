# US-MVP-04.9 : Marquer paiement

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-04.9 |
| **Epic** | E-MVP-04 : Gestion Adhérents |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** gestionnaire,
**Je veux** marquer un adhérent comme ayant payé,
**Afin de** suivre les cotisations.

---

## Critères d'acceptance

- [ ] Endpoint PATCH /members/:id/payment
- [ ] Body : hasPaid (boolean), paymentMethod (enum)
- [ ] Si hasPaid = true, paymentMethod obligatoire
- [ ] Si hasPaid = false, paymentMethod = null

### Frontend

- [ ] Sur page détail : bouton "Marquer comme payé"
- [ ] Modal avec select méthode de paiement
- [ ] Affichage statut avec badge coloré

---

## Méthodes de paiement

```typescript
enum PaymentMethod {
  CASH = 'CASH',      // Espèces
  CARD = 'CARD',      // Carte bancaire
  TRANSFER = 'TRANSFER' // Virement
}
```

---

## Tâches techniques

### Backend

- [ ] Créer endpoint PATCH /members/:id/payment
- [ ] Créer UpdatePaymentDto
- [ ] Valider que paymentMethod est présent si hasPaid = true
- [ ] Reset paymentMethod si hasPaid = false

### Frontend

- [ ] Créer composant PaymentStatusBadge
- [ ] Créer modal MarkAsPaidModal
- [ ] Bouton toggle pour annuler le paiement

---

## Dépendances

- US-MVP-04.5 : Voir détail adhérent

---

## Notes

Le statut de paiement est essentiel pour la génération des cartes d'adhérent (V1.0).
