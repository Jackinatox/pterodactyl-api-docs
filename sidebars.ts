import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // The main sidebar for API documentation
  tutorialSidebar: [
    'intro',
    'authentication',
    'rate-limiting', 
    'error-handling',
    'source-references',
    {
      type: 'category',
      label: 'Client API',
      link: {
        type: 'doc',
        id: 'api/client/index',
      },
      items: [
        'api/client/account',
        'api/client/servers',
        'api/client/files',
        'api/client/databases',
        'api/client/backups',
        'api/client/schedules',
        'api/client/network',
        'api/client/users',
      ],
    },
    {
      type: 'category',
      label: 'Application API',
      link: {
        type: 'doc',
        id: 'api/application/index',
      },
      items: [
        'api/application/users',
        'api/application/servers',
        'api/application/nodes',
        'api/application/locations',
        'api/application/nests-eggs',
      ],
    },
    {
      type: 'doc',
      label: 'WebSocket API',
      id: 'api/websocket',
    },
    {
      type: 'doc',
      label: 'Contributing',
      id: 'contributing',
    },
  ],
};

export default sidebars;
