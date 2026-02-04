# US-MVP-07.1 : Setup i18n

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-07.1 |
| **Epic** | E-MVP-07 : Internationalisation |
| **Milestone** | MVP |
| **Priorité** | P1 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** utilisateur,
**Je veux** utiliser l'application en français ou tahitien,
**Afin de** comprendre l'interface.

---

## Critères d'acceptance

- [ ] next-intl ou react-i18next configuré
- [ ] Fichiers de traduction : fr.json, ty.json
- [ ] Détection langue navigateur
- [ ] Sélecteur de langue dans le header
- [ ] Persistance du choix (localStorage)
- [ ] Toutes les chaînes UI externalisées

---

## Contenu minimal MVP

- [ ] Navigation (menu, boutons)
- [ ] Formulaires (labels, placeholders, erreurs)
- [ ] Messages système (succès, erreurs)
- [ ] Page protection mineurs

---

## Structure des fichiers de traduction

```
frontend/src/
└── locales/
    ├── fr/
    │   ├── common.json
    │   ├── auth.json
    │   ├── members.json
    │   └── tomites.json
    └── ty/
        ├── common.json
        ├── auth.json
        ├── members.json
        └── tomites.json
```

---

## Exemple de fichier de traduction

### `fr/common.json`

```json
{
  "navigation": {
    "home": "Accueil",
    "tomites": "Tomités",
    "members": "Adhérents",
    "users": "Utilisateurs",
    "logout": "Déconnexion"
  },
  "actions": {
    "save": "Enregistrer",
    "cancel": "Annuler",
    "delete": "Supprimer",
    "edit": "Modifier",
    "create": "Créer"
  },
  "messages": {
    "success": "Opération réussie",
    "error": "Une erreur est survenue"
  }
}
```

### `ty/common.json`

```json
{
  "navigation": {
    "home": "Fare",
    "tomites": "Tomite",
    "members": "Mau taata",
    "users": "Mau tane",
    "logout": "Haere"
  },
  "actions": {
    "save": "Fa'ahoro",
    "cancel": "Fa'aore",
    "delete": "Tape'a",
    "edit": "Fa'ahuru",
    "create": "Hama'u"
  }
}
```

---

## Tâches techniques

- [ ] Installer et configurer next-intl
- [ ] Créer structure des fichiers de traduction
- [ ] Créer composant LanguageSwitcher
- [ ] Configurer détection automatique de langue
- [ ] Implémenter persistance localStorage
- [ ] Externaliser toutes les chaînes existantes

---

## Dépendances

- US-MVP-01.5 : Setup Frontend

---

## Notes

Le tahitien (ty) est important pour l'accessibilité culturelle de l'application en Polynésie française.
