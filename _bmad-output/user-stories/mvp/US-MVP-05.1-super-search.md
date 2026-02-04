# US-MVP-05.1 : Super search bar

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-05.1 |
| **Epic** | E-MVP-05 : Recherche |
| **Milestone** | MVP |
| **Priorité** | P0 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** utilisateur,
**Je veux** rechercher un adhérent rapidement,
**Afin de** le trouver sans naviguer.

---

## Critères d'acceptance

- [ ] Endpoint GET /members/search
- [ ] Paramètre : q (query string)
- [ ] Recherche sur : firstName, lastName, memberNumber
- [ ] Filtrage par tomiteId (respecte cloisonnement)
- [ ] Retourne max 20 résultats
- [ ] Recherche insensible à la casse et aux accents
- [ ] Debounce côté API (ou client) : 300ms

### Frontend

- [ ] Composant SearchBar dans le header
- [ ] Dropdown avec résultats en temps réel
- [ ] Affichage : photo miniature, nom, numéro, tomité
- [ ] Clic → navigation vers fiche adhérent
- [ ] Raccourci clavier : Cmd/Ctrl + K

---

## Tâches techniques

### Backend

- [ ] Créer endpoint search dans MembersController
- [ ] Implémenter recherche full-text ou ILIKE
- [ ] Normaliser les accents (unaccent extension PostgreSQL)
- [ ] Limiter les résultats à 20
- [ ] Respecter le cloisonnement par tomité

### Frontend

- [ ] Créer composant SuperSearchBar
- [ ] Implémenter debounce 300ms
- [ ] Créer composant SearchResults dropdown
- [ ] Implémenter raccourci clavier
- [ ] Gérer le focus et la navigation clavier dans les résultats

---

## Optimisation PostgreSQL

```sql
-- Extension pour recherche sans accents
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Index pour recherche performante
CREATE INDEX idx_members_search ON members
USING gin(to_tsvector('french', unaccent(first_name || ' ' || last_name)));
```

---

## Dépendances

- US-MVP-04.4 : Lister les adhérents

---

## Notes

La recherche doit être très rapide (< 300ms) même avec 80 000 adhérents. Les index PostgreSQL sont essentiels.
