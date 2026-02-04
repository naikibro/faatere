# US-MVP-01.11 : Setup Documentation (Docusaurus)

| Métadonnée | Valeur |
|------------|--------|
| **ID** | US-MVP-01.11 |
| **Epic** | E-MVP-01 : Setup Projet |
| **Milestone** | MVP |
| **Priorité** | P1 |
| **PRD** | [prd-faatere-v1.md](../../prd-faatere-v1.md) |

---

## User Story

**En tant que** développeur ou mainteneur du projet,
**Je veux** avoir une documentation technique centralisée,
**Afin de** faciliter l'onboarding et la maintenance du projet.

---

## Contexte

Comme dans les projets Air Tahiti et ATN, Faatere aura un dossier `docs/` contenant un site Docusaurus pour la documentation technique. Cela permet de :
- Documenter l'architecture du projet
- Fournir des guides d'installation et de développement
- Documenter l'API (en complément de Swagger)
- Maintenir un changelog
- Faciliter l'onboarding des nouveaux développeurs

---

## Critères d'acceptance

- [ ] Workspace `docs/` créé avec Docusaurus 3.x
- [ ] Structure de documentation initiale
- [ ] Configuration du thème Docusaurus
- [ ] Scripts pour démarrer le serveur de documentation
- [ ] Documentation de l'installation du projet
- [ ] Documentation de l'architecture technique
- [ ] Intégration au monorepo (workspace)

---

## Structure du dossier docs

```
docs/
├── package.json
├── docusaurus.config.ts
├── sidebars.ts
├── tsconfig.json
├── src/
│   ├── css/
│   │   └── custom.css
│   └── pages/
│       └── index.tsx
├── docs/
│   ├── intro.md
│   ├── getting-started/
│   │   ├── installation.md
│   │   ├── configuration.md
│   │   └── development.md
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── backend.md
│   │   ├── frontend.md
│   │   └── mobile.md
│   ├── api/
│   │   ├── authentication.md
│   │   ├── members.md
│   │   └── tomites.md
│   └── guides/
│       ├── deployment.md
│       └── contributing.md
└── static/
    └── img/
        └── logo.svg
```

---

## Tâches techniques

### 1. Initialisation Docusaurus

- [ ] Créer le dossier `docs/`
- [ ] Initialiser Docusaurus 3.x avec TypeScript
- [ ] Configurer comme workspace dans le monorepo

### 2. Configuration

- [ ] Configurer `docusaurus.config.ts` :
  ```typescript
  export default {
    title: 'Faatere Documentation',
    tagline: 'Documentation technique du projet Faatere',
    url: 'https://docs.faatere.pf',
    baseUrl: '/',
    organizationName: 'faatere',
    projectName: 'faatere-docs',
    themeConfig: {
      navbar: {
        title: 'Faatere',
        logo: { alt: 'Faatere Logo', src: 'img/logo.svg' },
        items: [
          { type: 'docSidebar', sidebarId: 'docs', label: 'Documentation' },
          { href: 'https://github.com/faatere/faatere', label: 'GitHub' },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Faatere.`,
      },
    },
  };
  ```

### 3. Documentation initiale

- [ ] Créer page d'accueil
- [ ] Documenter l'installation
- [ ] Documenter l'architecture
- [ ] Documenter les commandes utiles

### 4. Intégration monorepo

- [ ] Ajouter `docs/` au workspace dans `package.json` racine :
  ```json
  {
    "workspaces": [
      "frontend",
      "mobile",
      "services/backend",
      "shared",
      "docs"
    ]
  }
  ```
- [ ] Ajouter scripts dans `package.json` racine :
  ```json
  {
    "scripts": {
      "docs": "yarn workspace docs start",
      "docs:build": "yarn workspace docs build"
    }
  }
  ```

---

## `docs/package.json`

```json
{
  "name": "docs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "docusaurus": "docusaurus",
    "start": "docusaurus start",
    "build": "docusaurus build",
    "swizzle": "docusaurus swizzle",
    "deploy": "docusaurus deploy",
    "clear": "docusaurus clear",
    "serve": "docusaurus serve"
  },
  "dependencies": {
    "@docusaurus/core": "3.7.0",
    "@docusaurus/preset-classic": "3.7.0",
    "@mdx-js/react": "^3.0.0",
    "clsx": "^2.1.1",
    "prism-react-renderer": "^2.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@docusaurus/module-type-aliases": "3.7.0",
    "@docusaurus/tsconfig": "3.7.0",
    "@docusaurus/types": "3.7.0",
    "typescript": "~5.7.3"
  }
}
```

---

## Contenu de la documentation initiale

### `docs/docs/intro.md`

```markdown
---
sidebar_position: 1
---

# Introduction

Bienvenue dans la documentation technique de **Faatere**, l'application de gestion des adhérents pour partis politiques polynésiens.

## Qu'est-ce que Faatere ?

Faatere ("Diriger" en tahitien) est une application moderne permettant de gérer efficacement les adhérents et tomités (sections locales) d'un parti politique, avec :

- Une interface web responsive
- Une application mobile avec mode hors-ligne
- Une API REST documentée
- Un système de rôles et permissions (RBAC)

## Architecture

Le projet est structuré en monorepo avec les workspaces suivants :

- `services/backend` - API NestJS
- `frontend` - Interface web Next.js
- `mobile` - Application React Native/Expo
- `shared` - Types et interfaces partagés
- `docs` - Cette documentation

## Commencer

Pour démarrer avec Faatere, consultez le [guide d'installation](./getting-started/installation).
```

---

## Références

- [air-tahiti-app-v2/docs](https://github.com/devlab-io/air-tahiti-app-v2/tree/main/docs)
- [Docusaurus 3 Documentation](https://docusaurus.io/docs)

---

## Dépendances

- US-MVP-01.1 : Setup Monorepo

---

## Notes

La documentation est essentielle pour la maintenabilité du projet. Elle doit être mise à jour en parallèle du développement des fonctionnalités.
