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
        'feature-authentication',
        'feature-members',
        'feature-tomites',
      ],
    },
  ],
};

export default sidebars;
