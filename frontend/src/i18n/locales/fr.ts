export const fr = {
  common: {
    loading: 'Chargement...',
    error: 'Une erreur est survenue',
    retry: 'Réessayer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    edit: 'Modifier',
    create: 'Créer',
    search: 'Rechercher',
    comingSoon: 'Bientôt disponible',
  },
  auth: {
    login: {
      title: 'Connexion à Faatere',
      subtitle: 'Entrez vos identifiants pour accéder à votre compte',
      email: 'Email',
      emailPlaceholder: 'vous@exemple.com',
      password: 'Mot de passe',
      passwordPlaceholder: 'Entrez votre mot de passe',
      showPassword: 'Afficher le mot de passe',
      hidePassword: 'Masquer le mot de passe',
      submit: 'Se connecter',
      submitting: 'Connexion en cours...',
      errors: {
        invalidCredentials: 'Email ou mot de passe invalide',
        accountDisabled:
          'Votre compte a été désactivé. Veuillez contacter un administrateur.',
        tooManyAttempts:
          'Trop de tentatives de connexion. Veuillez patienter un moment.',
        generic: 'Une erreur est survenue. Veuillez réessayer.',
      },
    },
    logout: 'Déconnexion',
  },
  validation: {
    emailRequired: "L'email est requis",
    emailInvalid: 'Format email invalide',
    passwordRequired: 'Le mot de passe est requis',
  },
  dashboard: {
    title: 'Tableau de bord',
    welcome: 'Bienvenue, {{email}}',
    cards: {
      totalMembers: 'Total adhérents',
      activeUsers: 'Utilisateurs actifs',
      tomites: 'Tomites',
      pendingInvitations: 'Invitations en attente',
    },
    userInfo: {
      title: 'Informations utilisateur',
      email: 'Email',
      role: 'Rôle',
      userId: 'ID utilisateur',
      status: 'Statut',
      active: 'Actif',
      inactive: 'Inactif',
    },
  },
  navigation: {
    home: 'Accueil',
    dashboard: 'Tableau de bord',
    members: 'Adhérents',
    users: 'Utilisateurs',
    settings: 'Paramètres',
  },
};
