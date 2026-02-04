# Cahier des Charges - FAATERE V1

**Application de gestion des adhérents pour partis politiques polynésiens**

---

| Métadonnée | Valeur |
|------------|--------|
| **Nom du projet** | Faatere ("Diriger") |
| **Version** | 1.0 |
| **Date** | 3 février 2026 |
| **Client** | Naiki |
| **Statut** | Draft |

---

## Table des matières

1. [Présentation du projet](#1-présentation-du-projet)
2. [Contexte et problématique](#2-contexte-et-problématique)
3. [Objectifs](#3-objectifs)
4. [Architecture technique](#4-architecture-technique)
5. [Modèle de données](#5-modèle-de-données)
6. [Gestion des utilisateurs et authentification](#6-gestion-des-utilisateurs-et-authentification)
7. [Gestion des rôles et permissions (RBAC)](#7-gestion-des-rôles-et-permissions-rbac)
8. [Fonctionnalités détaillées](#8-fonctionnalités-détaillées)
9. [Parcours utilisateurs](#9-parcours-utilisateurs)
10. [Contraintes et règles métier](#10-contraintes-et-règles-métier)
11. [Internationalisation](#11-internationalisation)
12. [Hébergement et déploiement](#12-hébergement-et-déploiement)
13. [Annexes](#13-annexes)

---

## 1. Présentation du projet

### 1.1 Description générale

**Faatere** est une application de gestion des adhérents destinée aux partis politiques polynésiens. Elle permet de gérer les membres du parti organisés en **Tomités** (comités locaux), de générer des cartes d'adhérent numériques et physiques, et d'assurer une traçabilité complète des opérations.

### 1.2 Périmètre V1

La V1 est une application **single-tenant** dédiée à un seul parti politique. L'architecture multi-tenant n'est pas prévue pour cette version.

### 1.3 Plateformes cibles

| Plateforme | Technologie | Utilisateurs cibles |
|------------|-------------|---------------------|
| **Web (Back-office)** | Next.js | Bureau, Présidents Tomité, Secrétaires |
| **Mobile** | React Native / Expo | Bureau, Présidents Tomité, Secrétaires |
| **API** | NestJS | - |

> **Note** : Les adhérents n'ont pas accès à l'application. Ils reçoivent uniquement leur carte par email.

---

## 2. Contexte et problématique

### 2.1 Situation actuelle

La gestion des adhérents est actuellement réalisée via des fichiers **Excel partagés**, ce qui engendre plusieurs problèmes :

| Problème | Impact |
|----------|--------|
| **Conflits de données** | Corruption de l'intégrité lors d'éditions simultanées |
| **Absence de cloisonnement** | Les secrétaires accèdent à des données hors de leur périmètre |
| **Aucune traçabilité** | Impossible de savoir qui a modifié quoi et quand |
| **Visibilité limitée** | Difficulté à obtenir des statistiques, répartition géographique, statut des paiements |

### 2.2 Organisation des partis polynésiens

```
PARTI (niveau central)
    │
    ├── TOMITÉ 1 (comité local autonome)
    │       └── Adhérents du tomité 1
    │
    ├── TOMITÉ 2
    │       └── Adhérents du tomité 2
    │
    └── TOMITÉ N
            └── Adhérents du tomité N
```

**Caractéristiques :**
- Un parti peut avoir **50 à 100+ tomités**
- Un tomité peut avoir **plusieurs milliers d'adhérents**
- Un parti peut atteindre **80 000 adhérents** au total
- Chaque tomité gère ses adhérents de manière **autonome**

---

## 3. Objectifs

### 3.1 Objectifs principaux

1. **Centraliser** la gestion des adhérents dans une application sécurisée
2. **Cloisonner** l'accès aux données selon les rôles et les tomités
3. **Tracer** toutes les opérations (ajout, modification, suppression d'adhérents)
4. **Visualiser** les statistiques et l'évolution du nombre d'adhérents
5. **Générer** des cartes d'adhérent (PDF, Google Wallet, Apple Wallet)
6. **Fonctionner hors-ligne** sur mobile avec synchronisation différée

### 3.2 Indicateurs de succès

- Temps de recherche d'un adhérent < 3 secondes
- Génération de carte < 5 secondes
- Synchronisation offline < 30 secondes après reconnexion
- 100% des mutations tracées dans les logs d'audit

---

## 4. Architecture technique

### 4.1 Stack technologique

| Composant | Technologie |
|-----------|-------------|
| **Frontend Web** | Next.js |
| **Backend API** | NestJS |
| **Mobile** | React Native avec Expo |
| **Base de données** | PostgreSQL |
| **Stockage fichiers** | S3 (Railway) |
| **Authentification** | JWT + email/password |

### 4.2 Architecture d'hébergement

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARCHITECTURE FAATERE V1                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐      │
│   │   VERCEL    │     │   RAILWAY   │     │   RAILWAY   │      │
│   │             │     │             │     │             │      │
│   │  Next.js    │────▶│   NestJS    │────▶│ PostgreSQL  │      │
│   │  Frontend   │     │   Backend   │     │   + S3      │      │
│   │             │     │             │     │  (photos)   │      │
│   └─────────────┘     └─────────────┘     └─────────────┘      │
│                              │                                  │
│                              ▼                                  │
│                    ┌─────────────────┐                          │
│                    │   App Stores    │                          │
│                    │  (Mode Privé)   │                          │
│                    │                 │                          │
│                    │  React Native   │                          │
│                    │     Expo        │                          │
│                    └─────────────────┘                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Mode offline (Mobile)

L'application mobile fonctionne en mode **offline-first** :

- Les données sont stockées localement sur l'appareil
- Les adhérents peuvent être ajoutés sans connexion internet
- À la reconnexion, synchronisation automatique avec le serveur
- Stratégie de résolution de conflits : **Last Write Wins** avec confirmation utilisateur

---

## 5. Modèle de données

### 5.1 Entité : Tomité

```typescript
interface Tomite {
  id: string;
  code: string;           // Code court (ex: "PPT" pour Papeete)
  name: string;           // Nom complet
  description?: string;

  createdAt: Date;
  updatedAt: Date;
}
```

### 5.2 Entité : Adhérent (Member)

```typescript
interface Member {
  id: string;

  // Identité (clé naturelle pour détection doublons)
  firstName: string;          // Obligatoire
  lastName: string;           // Obligatoire
  birthDate: Date;            // Obligatoire
  birthPlace: string;         // Obligatoire

  // Coordonnées
  address: string;            // Obligatoire
  email?: string;             // Optionnel (désirable)
  phone?: string;             // Optionnel (désirable)

  // Photo
  photoUrl?: string;          // URL S3

  // Adhésion
  memberNumber: string;       // Format: {CODE_TOMITE}-{ANNEE}-{SEQUENCE}
  membershipDate: Date;       // Date d'adhésion
  tomiteId: string;           // Tomité d'appartenance actuel
  originalTomiteId: string;   // Tomité d'origine (pour le numéro)

  // Paiement V1
  hasPaid: boolean;
  paymentMethod: 'CASH' | 'CARD' | 'TRANSFER' | null;

  // Métadonnées
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;          // userId
}
```

### 5.3 Format du numéro d'adhérent

```
{CODE_TOMITE}-{ANNEE}-{SEQUENCE}

Exemples :
- PPT-2024-1
- PPT-2024-12
- PPT-2024-12345
- FAA-2025-1
```

**Règles :**
- Le code tomité est celui du **tomité d'origine** (ne change pas lors d'un transfert)
- L'année est celle de l'**adhésion initiale**
- La séquence est un entier **sans limite** (pas de padding fixe pour éviter le bug Y2K)
- Le numéro est **immuable** : il ne change jamais, même lors d'un transfert

### 5.4 Entité : Utilisateur (User)

```typescript
interface User {
  id: string;
  email: string;
  passwordHash: string;

  role: 'BOARD' | 'TOMITE_PRESIDENT' | 'SECRETARY';
  tomiteId: string | null;    // null pour BOARD (accès global)

  isActive: boolean;

  // Lien optionnel avec un adhérent
  memberId: string | null;

  createdAt: Date;
  updatedAt: Date;
  invitedBy: string;          // userId du créateur
}
```

### 5.5 Entité : Invitation

```typescript
interface Invitation {
  id: string;
  email: string;
  token: string;              // Token unique (UUID)
  expiresAt: Date;

  role: 'TOMITE_PRESIDENT' | 'SECRETARY';
  tomiteId: string;

  createdBy: string;          // userId
  usedAt: Date | null;
}
```

### 5.6 Entité : Log d'audit

```typescript
interface AuditLog {
  id: string;

  entityType: 'MEMBER';
  entityId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'TRANSFER';

  performedBy: string;        // userId
  performedAt: Date;

  changes: Record<string, {
    old: any;
    new: any;
  }>;

  tomiteId: string;
}
```

---

## 6. Gestion des utilisateurs et authentification

### 6.1 Types d'utilisateurs

| Type | Description | Création |
|------|-------------|----------|
| **Membre du Bureau (Board)** | Dirigeants du parti, tous les droits | Migration initiale |
| **Président de Tomité** | Gère son tomité | Invitation par Bureau |
| **Secrétaire** | Assiste le président, droits limités | Invitation par Bureau ou Président |

> **Important** : Les adhérents ne sont PAS des utilisateurs. Ils n'ont pas de compte dans l'application.

### 6.2 Authentification

- **Méthode** : Email + Mot de passe
- **Pas d'auto-inscription** : Tous les comptes sont créés par invitation
- **Membres du Bureau** : Créés en migration avec mot de passe par défaut (variable d'environnement)

### 6.3 Flow d'invitation

```
1. Membre du Bureau créé un nouveau tomité (si nécessaire)
2. Membre du Bureau crée une invitation (email, rôle, tomité)
3. Email envoyé avec lien unique contenant un token
4. Nouvel utilisateur clique sur le lien
5. Page de création de compte : saisie du mot de passe
6. Compte activé, utilisateur peut se connecter
```

### 6.4 Gestion des utilisateurs par le Bureau

| Action | Disponible pour |
|--------|-----------------|
| Inviter un utilisateur | Bureau (tous), Président (son tomité) |
| Modifier le mot de passe d'un utilisateur | Bureau uniquement |
| Désactiver un utilisateur | Bureau uniquement |
| Supprimer un utilisateur (si désactivé) | Bureau uniquement |

---

## 7. Gestion des rôles et permissions (RBAC)

### 7.1 Matrice des permissions

| Permission | Bureau | Président Tomité | Secrétaire | Adhérent |
|------------|--------|------------------|------------|----------|
| Accès dashboard global | ✅ | ❌ | ❌ | ❌ |
| Voir tous les tomités | ✅ | ❌ | ❌ | ❌ |
| Voir son tomité | ✅ | ✅ | ✅ | ❌ |
| Stats globales parti | ✅ | ❌ | ❌ | ❌ |
| Stats tomité | ✅ | ✅ | ✅ | ❌ |
| Ajouter adhérent | ✅ | ✅ | ✅ | ❌ |
| Modifier adhérent | ✅ | ✅ | ✅ | ❌ |
| Supprimer adhérent | ✅ | ✅ | ❌ | ❌ |
| Transférer adhérent | ✅ | ✅ | ❌ | ❌ |
| Générer carte adhérent | ✅ | ✅ | ✅ | ❌ |
| Voir logs d'audit | ✅ | ✅ | ❌ | ❌ |
| Gérer utilisateurs | ✅ (tous) | ✅ (son tomité) | ❌ | ❌ |
| Export global parti | ✅ | ❌ | ❌ | ❌ |
| Export tomité | ✅ | ✅ | ✅ | ❌ |
| Envoi email adhérents | ✅ | ✅ | ✅ | ❌ |

### 7.2 Cloisonnement des données

- Un **Président de Tomité** ne voit que les adhérents de son tomité
- Une **Secrétaire** ne voit que les adhérents de son tomité
- **Exception** : Lors de l'ajout d'un adhérent, vérification cross-tomité pour détecter les doublons

---

## 8. Fonctionnalités détaillées

### 8.1 Gestion des Tomités

#### 8.1.1 Créer un tomité (Bureau uniquement)

**Champs requis :**
- Code (2-4 caractères, unique)
- Nom complet
- Description (optionnel)

#### 8.1.2 Modifier un tomité (Bureau uniquement)

Tous les champs sont modifiables sauf le code.

#### 8.1.3 Supprimer un tomité (Bureau uniquement)

Un tomité ne peut être supprimé que s'il n'a plus d'adhérents ni d'utilisateurs.

---

### 8.2 Gestion des Adhérents

#### 8.2.1 Ajouter un adhérent

**Champs du formulaire :**

| Champ | Obligatoire | Validation |
|-------|-------------|------------|
| Nom | ✅ | Min 2 caractères |
| Prénom | ✅ | Min 2 caractères |
| Date de naissance | ✅ | ≥ 18 ans |
| Lieu de naissance | ✅ | Min 2 caractères |
| Adresse | ✅ | Min 5 caractères |
| Email | ❌ | Format email valide |
| Téléphone | ❌ | Format téléphone valide |
| Photo | ❌ | JPG/PNG, max 5MB |

**Validation de l'âge :**
- Si âge < 18 ans → Redirection vers page dédiée "Protection des mineurs"
- Aucune donnée n'est collectée avant cette validation

**Détection des doublons :**
- Recherche sur (nom, prénom, date de naissance, lieu de naissance) dans tout le parti
- Si doublon trouvé → Modal de résolution de conflit

#### 8.2.2 Résolution de conflits (doublons)

Lorsqu'un adhérent potentiellement en doublon est détecté :

```
┌─────────────────────────────────────────────────────────────┐
│  ⚠️ ADHÉRENT EXISTANT DÉTECTÉ                              │
│                                                             │
│  "Teiva DUPONT" existe déjà dans le Tomité Papeete.        │
│                                                             │
│  Que souhaitez-vous faire ?                                │
│                                                             │
│  ○ C'est la même personne                                  │
│    → Proposer un transfert vers mon tomité                 │
│                                                             │
│  ○ C'est une personne différente (homonyme)               │
│    → Créer un nouvel adhérent                              │
│                                                             │
│  ○ Annuler                                                 │
│    → Ne pas créer cet adhérent                             │
│                                                             │
│              [Valider]                                      │
└─────────────────────────────────────────────────────────────┘
```

#### 8.2.3 Modifier un adhérent

Tous les champs sont modifiables. Chaque modification est tracée dans les logs d'audit.

#### 8.2.4 Supprimer un adhérent

- Réservé au **Bureau** et aux **Présidents de Tomité**
- Demande de confirmation avec saisie du nom de l'adhérent
- Suppression logique (soft delete) avec traçabilité

#### 8.2.5 Transférer un adhérent

- Réservé au **Bureau** et aux **Présidents de Tomité**
- L'adhérent change de tomité d'appartenance
- Le numéro d'adhérent reste inchangé (tomité d'origine conservé)
- Opération atomique

```
┌─────────────────────────────────────────────────────────────┐
│  TRANSFERT D'ADHÉRENT                                       │
│                                                             │
│  Adhérent: Teiva DUPONT (PPT-2024-1234)                    │
│  Tomité actuel: Papeete                                    │
│                                                             │
│  Transférer vers: [▼ Sélectionner tomité]                  │
│                                                             │
│  ⚠️ Le numéro d'adhérent sera conservé.                    │
│  Cette action sera tracée dans les logs d'audit.           │
│                                                             │
│              [Annuler]    [Confirmer le transfert]          │
└─────────────────────────────────────────────────────────────┘
```

#### 8.2.6 Prise de photo

- **Mobile** : Accès à la caméra pour prise directe
- **Web & Mobile** : Import depuis la galerie/fichiers
- Formats acceptés : JPG, PNG
- Taille max : 5 MB
- Redimensionnement automatique côté serveur

---

### 8.3 Recherche

#### 8.3.1 Super barre de recherche

Recherche unifiée permettant de trouver un adhérent par :
- **Nom** (partiel ou complet)
- **Prénom** (partiel ou complet)
- **Numéro d'adhérent** (partiel ou complet)
- **Tomité** (filtrage)

**Fonctionnalités :**
- Recherche en temps réel (debounce 300ms)
- Suggestions auto-complétées
- Filtres combinables

```
┌─────────────────────────────────────────────────────────────────────┐
│  🔍 Rechercher un adhérent...                              [🔎]    │
├─────────────────────────────────────────────────────────────────────┤
│  Filtres:  [Tous les tomités ▼]  [Statut paiement ▼]              │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 8.4 Génération de cartes d'adhérent

#### 8.4.1 Condition préalable

**La carte ne peut être générée que si `hasPaid === true`.**

Si l'adhérent n'a pas payé sa cotisation :
```
┌─────────────────────────────────────────────────────────────┐
│  ⚠️ COTISATION NON PAYÉE                                   │
│                                                             │
│  La carte d'adhérent ne peut être générée que si la        │
│  cotisation annuelle est réglée.                           │
│                                                             │
│  Statut paiement : ❌ Non payé                             │
│                                                             │
│              [Marquer comme payé]    [Retour]               │
└─────────────────────────────────────────────────────────────┘
```

#### 8.4.2 Contenu de la carte

| Élément | Affiché |
|---------|---------|
| Nom et prénom | ✅ |
| Photo | ✅ |
| Numéro d'adhérent | ✅ |
| Tomité actuel | ✅ |

#### 8.4.3 Formats de sortie

| Format | Description |
|--------|-------------|
| **PDF** | Pour impression physique |
| **Google Wallet** | Pass numérique Android |
| **Apple Wallet** | Pass numérique iOS (photo à investiguer selon contraintes Apple) |

#### 8.4.4 Validité

- La carte est valide **1 an** (année civile de la cotisation)
- Renouvellement annuel nécessaire

#### 8.4.5 Envoi par email

Possibilité d'envoyer la carte par email à l'adhérent (si email renseigné).

---

### 8.5 Export des données

#### 8.5.1 Export par tomité

Disponible pour : Bureau, Président Tomité, Secrétaire (leur tomité uniquement)

#### 8.5.2 Export global parti

Disponible pour : **Bureau uniquement**

#### 8.5.3 Formats d'export

- **CSV** : Pour traitement tableur
- **PDF** : Pour impression/archivage

#### 8.5.4 Filtres d'export

```
┌─────────────────────────────────────────────────────────────┐
│  EXPORTER LES ADHÉRENTS                              [✕]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Périmètre:                                                │
│  ○ Tomité: [▼ Sélectionner        ]                       │
│  ○ Parti entier (réservé Bureau)                          │
│                                                             │
│  Format:                                                    │
│  [CSV]  [PDF]                                              │
│                                                             │
│  Filtres:                                                   │
│  ☐ Exclure adhérents sans email                           │
│  ☐ Exclure adhérents sans téléphone                        │
│                                                             │
│  Aperçu: 1,234 adhérents correspondent                     │
│                                                             │
│              [Annuler]    [Exporter]                        │
└─────────────────────────────────────────────────────────────┘
```

---

### 8.6 Envoi d'emails aux adhérents

#### 8.6.1 Envoi par tomité

Envoyer un email à tous les adhérents d'un tomité qui ont une adresse email.

#### 8.6.2 Envoi par filtre

Sélection d'adhérents selon des critères :
- Par tomité
- Par statut de paiement
- Uniquement ceux avec email

---

### 8.7 Dashboard (Bureau uniquement)

#### 8.7.1 KPIs principaux

```
┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐
│   12,450  │  │    52     │  │   +127    │  │   +34     │
│ ADHÉRENTS │  │  TOMITÉS  │  │  7 jours  │  │  24h      │
│   TOTAL   │  │           │  │           │  │           │
└───────────┘  └───────────┘  └───────────┘  └───────────┘
```

#### 8.7.2 Évolution des adhésions

| Période | Métrique |
|---------|----------|
| 30 derniers jours | Nombre de nouveaux adhérents |
| 7 derniers jours | Nombre de nouveaux adhérents |
| 3 derniers jours | Nombre de nouveaux adhérents |
| 24 dernières heures | Nombre de nouveaux adhérents |

Graphique de tendance inclus.

#### 8.7.3 Top Tomités

Liste des tomités classés par nombre d'adhérents (top 5 ou 10).

#### 8.7.4 Derniers adhérents

Liste des 10 derniers adhérents ajoutés (tous tomités confondus).

#### 8.7.5 Navigation

- Accès à la liste de tous les tomités
- Vue détaillée par tomité avec ses adhérents

---

### 8.8 Logs d'audit

#### 8.8.1 Événements tracés

| Action | Données enregistrées |
|--------|---------------------|
| Création adhérent | Toutes les valeurs initiales |
| Modification adhérent | Valeurs avant/après pour chaque champ modifié |
| Suppression adhérent | Snapshot complet avant suppression |
| Transfert adhérent | Tomité source et destination |

#### 8.8.2 Accès aux logs

- **Bureau** : Tous les logs de tous les tomités
- **Président Tomité** : Logs de son tomité uniquement
- **Secrétaire** : Pas d'accès

---

### 8.9 Mode Offline (Mobile)

#### 8.9.1 Fonctionnement

1. Les données du tomité sont synchronisées localement
2. L'utilisateur peut ajouter/modifier des adhérents hors ligne
3. Les modifications sont stockées dans une file d'attente locale
4. À la reconnexion, synchronisation automatique

#### 8.9.2 Résolution de conflits

Stratégie : **Last Write Wins avec confirmation utilisateur**

Si un conflit est détecté lors de la synchronisation :
```
┌─────────────────────────────────────────────────────────────┐
│  ⚠️ CONFLIT DE SYNCHRONISATION                             │
│                                                             │
│  L'adhérent "Teiva DUPONT" a été modifié sur le serveur    │
│  pendant que vous étiez hors ligne.                        │
│                                                             │
│  Votre version:           Version serveur:                 │
│  Email: teiva@new.pf      Email: teiva@old.pf             │
│                                                             │
│  ○ Conserver ma version                                    │
│  ○ Conserver la version serveur                            │
│  ○ Voir les détails pour choisir                          │
│                                                             │
│              [Résoudre]                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. Parcours utilisateurs

### 9.1 Onboarding d'un nouveau membre (Président/Secrétaire)

```
┌─────────────────────────────────────────────────────────────────────┐
│  PARCOURS : INVITATION NOUVEAU MEMBRE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  MEMBRE DU BUREAU                                                   │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  1. Créer le tomité (si nécessaire) │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  2. Créer l'invitation              │                           │
│  │     - Email                         │                           │
│  │     - Rôle                          │                           │
│  │     - Tomité                        │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ▼ Email envoyé                                                │
│                                                                     │
│  NOUVEAU MEMBRE                                                     │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  3. Réception email avec lien       │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  4. Création mot de passe           │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  5. Accès à l'application ✅        │                           │
│  └─────────────────────────────────────┘                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 9.2 Inscription d'un adhérent sur le terrain (mobile)

```
┌─────────────────────────────────────────────────────────────────────┐
│  PARCOURS : INSCRIPTION TERRAIN                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  SECRÉTAIRE/PRÉSIDENT TOMITÉ (sur le terrain, réunion...)          │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  1. Ouvrir l'app mobile             │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  2. Bouton "Nouvel adhérent"        │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  3. Saisie date de naissance        │                           │
│  │     → Validation âge ≥ 18 ans       │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ├── Si < 18 ans ──▶ Page "Protection des mineurs" ──▶ FIN   │
│       │                                                             │
│       ▼ Si ≥ 18 ans                                                │
│  ┌─────────────────────────────────────┐                           │
│  │  4. Formulaire complet              │                           │
│  │     - Nom, prénom                   │                           │
│  │     - Lieu naissance                │                           │
│  │     - Adresse                       │                           │
│  │     - Email, téléphone (optionnel)  │                           │
│  │     - Photo (caméra ou galerie)     │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  5. Vérification doublons           │                           │
│  │     → Si doublon : résolution       │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  6. Adhérent créé ✅                │                           │
│  │     (sync immédiate ou différée)    │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  7. Marquer paiement + générer carte│                           │
│  │     (si cotisation payée sur place) │                           │
│  └─────────────────────────────────────┘                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 9.3 Génération et envoi de carte

```
┌─────────────────────────────────────────────────────────────────────┐
│  PARCOURS : GÉNÉRATION CARTE                                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────┐                           │
│  │  1. Sélectionner un adhérent        │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  2. Vérification paiement           │                           │
│  │     hasPaid === true ?              │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ├── Si false ──▶ Message "Cotisation non payée"              │
│       │                    └──▶ Option "Marquer comme payé"        │
│       │                                                             │
│       ▼ Si true                                                    │
│  ┌─────────────────────────────────────┐                           │
│  │  3. Choisir format de carte         │                           │
│  │     [PDF] [Google] [Apple]          │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  4. Aperçu de la carte              │                           │
│  └─────────────────────────────────────┘                           │
│       │                                                             │
│       ▼                                                             │
│  ┌─────────────────────────────────────┐                           │
│  │  5. Télécharger et/ou envoyer       │                           │
│  │     par email                       │                           │
│  └─────────────────────────────────────┘                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 10. Contraintes et règles métier

### 10.1 Règles d'unicité

| Entité | Contrainte d'unicité |
|--------|---------------------|
| Tomité | Code unique |
| Adhérent | (nom, prénom, dateNaissance, lieuNaissance) unique au niveau PARTI |
| Numéro adhérent | Unique globalement |
| User | Email unique |

### 10.2 Règle des mineurs

**Aucun mineur (< 18 ans) ne peut être inscrit dans l'application.**

- Validation dès la saisie de la date de naissance
- Si âge < 18 ans : redirection vers page dédiée
- Aucune donnée collectée avant validation de l'âge

**Page "Protection des mineurs" :**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              🛡️ PROTECTION DES MINEURS                     │
│                                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                             │
│     L'inscription à Faatere est réservée aux personnes     │
│                    de 18 ans et plus.                       │
│                                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                             │
│     Conformément à notre engagement de protection des       │
│     données personnelles et au respect du cadre légal,      │
│     nous n'acceptons pas l'inscription des mineurs,         │
│     même avec le consentement parental.                     │
│                                                             │
│     Cette décision reflète notre volonté de garantir        │
│     un environnement sécurisé et responsable pour           │
│     l'ensemble de nos adhérents.                            │
│                                                             │
│     Nous t'invitons à revenir nous rejoindre dès tes       │
│     18 ans ! 🎉                                             │
│                                                             │
│                      ┌─────────────────┐                    │
│                      │   J'ai compris   │                   │
│                      └─────────────────┘                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 10.3 Règle d'appartenance unique

Un adhérent ne peut appartenir qu'à **un seul tomité** à la fois.

- Le transfert entre tomités est atomique
- Le numéro d'adhérent (contenant le code du tomité d'origine) ne change jamais

### 10.4 Règle de génération de carte

La carte d'adhérent ne peut être générée que si :
- `hasPaid === true`

### 10.5 Règle de suppression utilisateur

Un utilisateur ne peut être supprimé que s'il est **préalablement désactivé**.

---

## 11. Internationalisation

### 11.1 Langues supportées

| Langue | Code | Statut |
|--------|------|--------|
| Français | `fr` | Principal |
| Tahitien | `ty` | Secondaire |

### 11.2 Implémentation

- Utilisation de bibliothèques i18n standard (next-intl, react-i18next)
- Tous les textes de l'interface sont externalisés
- Sélecteur de langue dans les paramètres utilisateur

---

## 12. Hébergement et déploiement

### 12.1 Infrastructure

| Composant | Plateforme | Notes |
|-----------|------------|-------|
| Frontend Next.js | **Vercel** | CDN mondial, déploiement automatique |
| Backend NestJS | **Railway** | Container Docker |
| PostgreSQL | **Railway** | Base de données managée |
| Stockage S3 | **Railway** | Photos des adhérents |
| App Mobile | **App Store / Play Store** | Distribution privée |

### 12.2 Distribution mobile

L'application mobile sera distribuée en **mode privé** sur les stores :
- **iOS** : TestFlight ou App Store Connect (distribution interne)
- **Android** : Google Play Console (piste de test interne/fermée)

---

## 13. Annexes

### 13.1 Glossaire

| Terme | Définition |
|-------|------------|
| **Tomité** | Comité local d'un parti politique en Polynésie française |
| **Bureau** | Membres dirigeants du parti avec tous les droits |
| **Adhérent** | Membre inscrit au parti (n'a pas de compte dans l'app) |
| **Utilisateur** | Personne avec un compte dans l'application |
| **RBAC** | Role-Based Access Control - Contrôle d'accès basé sur les rôles |

### 13.2 Références techniques

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [Google Wallet API](https://developers.google.com/wallet)
- [Apple Wallet PassKit](https://developer.apple.com/documentation/passkit)

### 13.3 Historique des versions

| Version | Date | Auteur | Modifications |
|---------|------|--------|---------------|
| 1.0 | 03/02/2026 | BMad Team | Version initiale |

---

*Document généré par BMad Master - Faatere V1*
