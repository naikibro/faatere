# User Stories - Faatere

Ce dossier contient toutes les User Stories extraites du PRD Faatere V1.

## Structure

```
user-stories/
├── mvp/           # User Stories MVP
├── v1.0/          # User Stories V1.0
└── v1.1/          # User Stories V1.1
```

## Index des User Stories

### MVP - Core Features

#### E-MVP-01 : Setup Projet

| ID | Titre | Fichier |
|----|-------|---------|
| US-MVP-01.1 | Setup Monorepo avec Yarn Workspaces | [mvp/US-MVP-01.1-setup-monorepo.md](mvp/US-MVP-01.1-setup-monorepo.md) |
| US-MVP-01.2 | Setup Workspace Shared | [mvp/US-MVP-01.2-setup-shared.md](mvp/US-MVP-01.2-setup-shared.md) |
| US-MVP-01.3 | Setup Docker Compose (Dev) | [mvp/US-MVP-01.3-setup-docker-compose.md](mvp/US-MVP-01.3-setup-docker-compose.md) |
| US-MVP-01.4 | Setup Workspace Backend | [mvp/US-MVP-01.4-setup-backend.md](mvp/US-MVP-01.4-setup-backend.md) |
| US-MVP-01.5 | Setup Workspace Frontend | [mvp/US-MVP-01.5-setup-frontend.md](mvp/US-MVP-01.5-setup-frontend.md) |
| US-MVP-01.6 | Setup Workspace Mobile (Placeholder) | [mvp/US-MVP-01.6-setup-mobile-placeholder.md](mvp/US-MVP-01.6-setup-mobile-placeholder.md) |
| US-MVP-01.7 | Setup Gestion des Configurations | [mvp/US-MVP-01.7-setup-env-config.md](mvp/US-MVP-01.7-setup-env-config.md) |
| US-MVP-01.8 | Setup Dockerfiles | [mvp/US-MVP-01.8-setup-dockerfiles.md](mvp/US-MVP-01.8-setup-dockerfiles.md) |
| US-MVP-01.9 | Setup Docker Compose complet | [mvp/US-MVP-01.9-setup-docker-compose-full.md](mvp/US-MVP-01.9-setup-docker-compose-full.md) |
| US-MVP-01.10 | Setup Base de données | [mvp/US-MVP-01.10-setup-database.md](mvp/US-MVP-01.10-setup-database.md) |
| US-MVP-01.11 | Setup Documentation (Docusaurus) | [mvp/US-MVP-01.11-setup-documentation.md](mvp/US-MVP-01.11-setup-documentation.md) |

#### E-MVP-02 : Authentification

| ID | Titre | Fichier |
|----|-------|---------|
| US-MVP-02.1 | Migration utilisateurs Bureau | [mvp/US-MVP-02.1-migration-users-bureau.md](mvp/US-MVP-02.1-migration-users-bureau.md) |
| US-MVP-02.2 | Login email/password | [mvp/US-MVP-02.2-login.md](mvp/US-MVP-02.2-login.md) |
| US-MVP-02.3 | Protection des routes | [mvp/US-MVP-02.3-route-protection.md](mvp/US-MVP-02.3-route-protection.md) |
| US-MVP-02.4 | Création invitation | [mvp/US-MVP-02.4-create-invitation.md](mvp/US-MVP-02.4-create-invitation.md) |
| US-MVP-02.5 | Acceptation invitation | [mvp/US-MVP-02.5-accept-invitation.md](mvp/US-MVP-02.5-accept-invitation.md) |
| US-MVP-02.6 | Logout | [mvp/US-MVP-02.6-logout.md](mvp/US-MVP-02.6-logout.md) |
| US-MVP-02.7 | Gestion utilisateurs (Bureau) | [mvp/US-MVP-02.7-user-management.md](mvp/US-MVP-02.7-user-management.md) |

#### E-MVP-03 : Gestion Tomités

| ID | Titre | Fichier |
|----|-------|---------|
| US-MVP-03.1 | Créer un tomité | [mvp/US-MVP-03.1-create-tomite.md](mvp/US-MVP-03.1-create-tomite.md) |
| US-MVP-03.2 | Lister les tomités | [mvp/US-MVP-03.2-list-tomites.md](mvp/US-MVP-03.2-list-tomites.md) |
| US-MVP-03.3 | Modifier un tomité | [mvp/US-MVP-03.3-update-tomite.md](mvp/US-MVP-03.3-update-tomite.md) |
| US-MVP-03.4 | Supprimer un tomité | [mvp/US-MVP-03.4-delete-tomite.md](mvp/US-MVP-03.4-delete-tomite.md) |

#### E-MVP-04 : Gestion Adhérents

| ID | Titre | Fichier |
|----|-------|---------|
| US-MVP-04.1 | Créer un adhérent | [mvp/US-MVP-04.1-create-member.md](mvp/US-MVP-04.1-create-member.md) |
| US-MVP-04.2 | Page protection des mineurs | [mvp/US-MVP-04.2-minors-page.md](mvp/US-MVP-04.2-minors-page.md) |
| US-MVP-04.3 | Résolution de conflit doublon | [mvp/US-MVP-04.3-duplicate-resolution.md](mvp/US-MVP-04.3-duplicate-resolution.md) |
| US-MVP-04.4 | Lister les adhérents | [mvp/US-MVP-04.4-list-members.md](mvp/US-MVP-04.4-list-members.md) |
| US-MVP-04.5 | Voir détail adhérent | [mvp/US-MVP-04.5-view-member.md](mvp/US-MVP-04.5-view-member.md) |
| US-MVP-04.6 | Modifier un adhérent | [mvp/US-MVP-04.6-update-member.md](mvp/US-MVP-04.6-update-member.md) |
| US-MVP-04.7 | Supprimer un adhérent | [mvp/US-MVP-04.7-delete-member.md](mvp/US-MVP-04.7-delete-member.md) |
| US-MVP-04.8 | Transférer un adhérent | [mvp/US-MVP-04.8-transfer-member.md](mvp/US-MVP-04.8-transfer-member.md) |
| US-MVP-04.9 | Marquer paiement | [mvp/US-MVP-04.9-mark-payment.md](mvp/US-MVP-04.9-mark-payment.md) |
| US-MVP-04.10 | Upload photo adhérent | [mvp/US-MVP-04.10-upload-photo.md](mvp/US-MVP-04.10-upload-photo.md) |

#### E-MVP-05 : Recherche

| ID | Titre | Fichier |
|----|-------|---------|
| US-MVP-05.1 | Super search bar | [mvp/US-MVP-05.1-super-search.md](mvp/US-MVP-05.1-super-search.md) |

#### E-MVP-06 : RBAC

| ID | Titre | Fichier |
|----|-------|---------|
| US-MVP-06.1 | Guards de permission | [mvp/US-MVP-06.1-permission-guards.md](mvp/US-MVP-06.1-permission-guards.md) |

#### E-MVP-07 : Internationalisation

| ID | Titre | Fichier |
|----|-------|---------|
| US-MVP-07.1 | Setup i18n | [mvp/US-MVP-07.1-setup-i18n.md](mvp/US-MVP-07.1-setup-i18n.md) |

---

### V1.0 - Features Complètes

#### E-V1-01 : Dashboard

| ID | Titre | Fichier |
|----|-------|---------|
| US-V1-01.1 | KPIs globaux | [v1.0/US-V1-01.1-dashboard-kpis.md](v1.0/US-V1-01.1-dashboard-kpis.md) |
| US-V1-01.2 | Graphique évolution | [v1.0/US-V1-01.2-dashboard-evolution.md](v1.0/US-V1-01.2-dashboard-evolution.md) |
| US-V1-01.3 | Top tomités | [v1.0/US-V1-01.3-dashboard-top-tomites.md](v1.0/US-V1-01.3-dashboard-top-tomites.md) |
| US-V1-01.4 | Derniers adhérents | [v1.0/US-V1-01.4-dashboard-recent-members.md](v1.0/US-V1-01.4-dashboard-recent-members.md) |

#### E-V1-02 : Export

| ID | Titre | Fichier |
|----|-------|---------|
| US-V1-02.1 | Export CSV | [v1.0/US-V1-02.1-export-csv.md](v1.0/US-V1-02.1-export-csv.md) |
| US-V1-02.2 | Export PDF | [v1.0/US-V1-02.2-export-pdf.md](v1.0/US-V1-02.2-export-pdf.md) |
| US-V1-02.3 | Modal d'export avec filtres | [v1.0/US-V1-02.3-export-modal.md](v1.0/US-V1-02.3-export-modal.md) |

#### E-V1-03 : Cartes adhérent

| ID | Titre | Fichier |
|----|-------|---------|
| US-V1-03.1 | Génération carte PDF | [v1.0/US-V1-03.1-card-pdf.md](v1.0/US-V1-03.1-card-pdf.md) |
| US-V1-03.2 | Génération Google Wallet | [v1.0/US-V1-03.2-card-google-wallet.md](v1.0/US-V1-03.2-card-google-wallet.md) |
| US-V1-03.3 | Génération Apple Wallet | [v1.0/US-V1-03.3-card-apple-wallet.md](v1.0/US-V1-03.3-card-apple-wallet.md) |
| US-V1-03.4 | Envoi carte par email | [v1.0/US-V1-03.4-card-send-email.md](v1.0/US-V1-03.4-card-send-email.md) |

#### E-V1-04 : Audit

| ID | Titre | Fichier |
|----|-------|---------|
| US-V1-04.1 | Logging des mutations | [v1.0/US-V1-04.1-audit-logging.md](v1.0/US-V1-04.1-audit-logging.md) |
| US-V1-04.2 | Consultation logs d'audit | [v1.0/US-V1-04.2-audit-consultation.md](v1.0/US-V1-04.2-audit-consultation.md) |

#### E-V1-05 : Emails

| ID | Titre | Fichier |
|----|-------|---------|
| US-V1-05.1 | Envoi email par tomité | [v1.0/US-V1-05.1-email-tomite.md](v1.0/US-V1-05.1-email-tomite.md) |
| US-V1-05.2 | Envoi email par filtre | [v1.0/US-V1-05.2-email-filtered.md](v1.0/US-V1-05.2-email-filtered.md) |

---

### V1.1 - Mobile & Offline

#### E-V11-01 : App Mobile

| ID | Titre | Fichier |
|----|-------|---------|
| US-V11-01.1 | Setup projet Expo | [v1.1/US-V11-01.1-setup-expo.md](v1.1/US-V11-01.1-setup-expo.md) |
| US-V11-01.2 | Écrans d'authentification mobile | [v1.1/US-V11-01.2-auth-mobile.md](v1.1/US-V11-01.2-auth-mobile.md) |
| US-V11-01.3 | Liste adhérents mobile | [v1.1/US-V11-01.3-members-list-mobile.md](v1.1/US-V11-01.3-members-list-mobile.md) |
| US-V11-01.4 | Ajout adhérent mobile | [v1.1/US-V11-01.4-add-member-mobile.md](v1.1/US-V11-01.4-add-member-mobile.md) |
| US-V11-01.5 | Prise photo caméra | [v1.1/US-V11-01.5-camera-photo.md](v1.1/US-V11-01.5-camera-photo.md) |

#### E-V11-02 : Offline Mode

| ID | Titre | Fichier |
|----|-------|---------|
| US-V11-02.1 | Stockage local | [v1.1/US-V11-02.1-local-storage.md](v1.1/US-V11-02.1-local-storage.md) |
| US-V11-02.2 | Détection connectivité | [v1.1/US-V11-02.2-connectivity-detection.md](v1.1/US-V11-02.2-connectivity-detection.md) |
| US-V11-02.3 | Création adhérent offline | [v1.1/US-V11-02.3-offline-create.md](v1.1/US-V11-02.3-offline-create.md) |

#### E-V11-03 : Synchronisation

| ID | Titre | Fichier |
|----|-------|---------|
| US-V11-03.1 | Sync automatique | [v1.1/US-V11-03.1-auto-sync.md](v1.1/US-V11-03.1-auto-sync.md) |
| US-V11-03.2 | Résolution conflits | [v1.1/US-V11-03.2-conflict-resolution.md](v1.1/US-V11-03.2-conflict-resolution.md) |
| US-V11-03.3 | Gestion doublons cross-tomité offline | [v1.1/US-V11-03.3-duplicate-detection-offline.md](v1.1/US-V11-03.3-duplicate-detection-offline.md) |

---

## Statistiques

| Milestone | Nombre d'US |
|-----------|-------------|
| MVP | 28 |
| V1.0 | 13 |
| V1.1 | 11 |
| **Total** | **52** |

---

*Document généré par BMad Master - Faatere User Stories Index*
