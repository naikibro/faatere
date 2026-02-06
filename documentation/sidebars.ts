import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'doc',
      label: 'Getting Started',
      id: 'intro',
    },
    {
      type: 'category',
      label: 'Setup',
      items: ['tech-stack', 'environment-setup'],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: ['architecture', 'deployment'],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        {
          type: 'category',
          label: 'Authentication',
          link: { type: 'doc', id: 'feature-authentication' },
          items: ['auth/auth-jwt', 'auth/auth-refresh-token'],
        },
        'feature-members',
        'feature-tomites',
      ],
    },
  ],
};

export default sidebars;
