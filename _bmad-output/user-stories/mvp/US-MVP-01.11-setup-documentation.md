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

- [x] Workspace `documentation/` créé avec Docusaurus 3.x
- [x] Structure de documentation initiale
- [x] Configuration du thème Docusaurus
- [x] Scripts pour démarrer le serveur de documentation
- [x] Documentation de l'installation du projet
- [x] Documentation de l'architecture technique
- [x] Intégration au monorepo (workspace)

---

## Structure du dossier documentation

```
documentation/
├── package.json
├── docusaurus.config.ts
├── sidebars.ts
├── tsconfig.json
├── Dockerfile
├── nginx.conf
├── src/
│   ├── css/
│   │   └── custom.css
│   └── pages/
│       ├── index.tsx
│       └── index.module.css
├── docs/
│   ├── intro.md
│   ├── tech-stack.md
│   ├── environment-setup.md
│   ├── architecture.md
│   ├── deployment.md
│   ├── feature-authentication.md
│   ├── feature-members.md
│   └── feature-tomites.md
└── static/
    ├── .nojekyll
    └── img/
        ├── favicon.ico
        └── logos/
            ├── 1.png
            ├── 2.png
            ├── 3.png
            ├── 4.png
            └── 5.png
```

---

## Tâches techniques

### 1. Initialisation Docusaurus

- [x] Créer le dossier `documentation/`
- [x] Initialiser Docusaurus 3.x avec TypeScript
- [x] Configurer comme workspace dans le monorepo

### 2. Configuration

- [x] Configurer `docusaurus.config.ts` :
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
        logo: { alt: 'Faatere Logo', src: 'img/logos/2.png' },
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

- [x] Créer page d'accueil
- [x] Documenter l'installation
- [x] Documenter l'architecture
- [x] Documenter les commandes utiles

### 4. Intégration monorepo

- [x] Ajouter `documentation/` au workspace dans `package.json` racine :
  ```json
  {
    "workspaces": [
      "frontend",
      "mobile",
      "services/backend",
      "shared",
      "documentation"
    ]
  }
  ```
- [x] Ajouter scripts dans `package.json` racine :
  ```json
  {
    "scripts": {
      "docs": "yarn workspace documentation start",
      "docs:build": "yarn workspace documentation build"
    }
  }
  ```

### 5. Docker Integration

- [x] Create Dockerfile for documentation service (multi-stage build)
- [x] Add documentation service to docker-compose.yml
- [x] Configure nginx for production deployment
- [x] Add DOCS_PORT to .env.example

---

## `documentation/package.json`

```json
{
  "name": "documentation",
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
    "@docusaurus/theme-mermaid": "3.7.0",
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

## Références

- [air-tahiti-app-v2/docs](https://github.com/devlab-io/air-tahiti-app-v2/tree/main/docs)
- [Docusaurus 3 Documentation](https://docusaurus.io/docs)

---

## Dépendances

- US-MVP-01.1 : Setup Monorepo

---

## Notes

La documentation est essentielle pour la maintenabilité du projet. Elle doit être mise à jour en parallèle du développement des fonctionnalités.

---

## Dev Agent Record

### Implementation Plan
- Created `documentation/` workspace with Docusaurus 3.7.0
- Configured as TypeScript project with Mermaid diagram support
- Created flat documentation structure (Air Tahiti style) covering:
  - Getting started (intro.md)
  - Tech stack with justifications (tech-stack.md)
  - Environment setup with Docker (environment-setup.md)
  - Architecture with design decisions (architecture.md)
  - Deployment guide for Railway/Vercel (deployment.md)
  - Feature docs with user stories (feature-*.md)
- Added Docker support with multi-stage build for development and production

### Completion Notes
- ✅ All acceptance criteria met
- ✅ Workspace named `documentation/`
- ✅ Docker service added to docker-compose.yml
- ✅ Dockerfile created with development and production stages
- ✅ Nginx configuration for production static file serving
- ✅ Mermaid diagrams enabled and working
- ✅ Documentation written in English with user story focus
- ✅ Build verified successfully

### Debug Log
- Initial implementation used nested folder structure
- User requested Air Tahiti style (flat structure, user stories, justified choices)
- Rewrote all documentation in English with Mermaid diagrams
- Fixed Dockerfile to work standalone (not as yarn workspace) for proper theme resolution

---

## File List

### New Files
- `documentation/package.json` - Workspace package configuration with Mermaid theme
- `documentation/tsconfig.json` - TypeScript configuration
- `documentation/docusaurus.config.ts` - Docusaurus configuration with Mermaid enabled
- `documentation/sidebars.ts` - Documentation sidebar structure (flat)
- `documentation/Dockerfile` - Multi-stage Docker build (standalone install)
- `documentation/nginx.conf` - Nginx configuration for production
- `documentation/src/css/custom.css` - Custom styles
- `documentation/src/pages/index.tsx` - Homepage component
- `documentation/src/pages/index.module.css` - Homepage styles
- `documentation/static/img/favicon.ico` - Favicon
- `documentation/static/img/logos/` - Logo variants (1.png through 5.png)
- `documentation/static/.nojekyll` - GitHub Pages config
- `documentation/docs/intro.md` - Getting started with user stories
- `documentation/docs/tech-stack.md` - Technology choices with justifications
- `documentation/docs/environment-setup.md` - Docker-based setup guide
- `documentation/docs/architecture.md` - System architecture with design decisions
- `documentation/docs/deployment.md` - Railway/Vercel deployment guide
- `documentation/docs/feature-authentication.md` - Auth feature with user stories
- `documentation/docs/feature-members.md` - Members feature with user stories
- `documentation/docs/feature-tomites.md` - Tomites feature with user stories

### Modified Files
- `package.json` - Added documentation workspace and scripts
- `docker-compose.yml` - Added documentation service
- `.env.example` - Added DOCS_PORT and DOCS_URL
- `yarn.lock` - Updated with documentation workspace dependencies

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-02-04 | Initial implementation of Docusaurus documentation workspace | Claude Code |
| 2026-02-04 | Renamed workspace from docs to documentation | Claude Code |
| 2026-02-04 | Added Docker service for documentation | Claude Code |
| 2026-02-04 | Rewrote docs in English with Air Tahiti style (flat structure, user stories) | Claude Code |
| 2026-02-04 | Code review fixes: updated story to match actual implementation | Claude Code |
| 2026-02-04 | Code review: translated homepage to English, fixed logo.svg→logo.png reference | Claude Code |
| 2026-02-04 | Code review: updated story to reflect logos/ folder structure, removed unused logo.png | Claude Code |

---

## Status

**Status:** done
