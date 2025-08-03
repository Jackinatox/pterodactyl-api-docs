/**
 * Test data and constants used across API tests
 */

export const testData = {
  // Server identifiers (will be discovered or provided via env)
  servers: {
    testServerId: process.env.TEST_SERVER_ID,
    // Common server endpoints patterns for testing
    serverEndpoints: [
      '/api/client',  // List servers
      '/api/client/servers/{server}',
      '/api/client/servers/{server}/resources',
      '/api/client/servers/{server}/websocket',
    ]
  },

  // User management test data
  users: {
    testUserId: process.env.TEST_USER_ID,
    testUserEmail: process.env.TEST_USER_EMAIL || 'test@example.com',
    permissions: [
      'control.console',
      'control.start',
      'control.stop',
      'control.restart',
      'file.read',
    ]
  },

  // API key management
  apiKeys: {
    testDescription: 'API Test Key - Auto Generated',
    allowedIps: ['127.0.0.1'],
  },

  // Schedule test data  
  schedules: {
    testSchedule: {
      name: 'Test Schedule',
      cron: {
        minute: '0',
        hour: '2',
        day_of_month: '*',
        month: '*',
        day_of_week: '*',
      },
      is_active: false, // Keep inactive for safety
    }
  },

  // Database test data
  databases: {
    testDatabase: {
      database: 'test_db_' + Date.now(),
      remote: '%',
    }
  },

  // File operations test data
  files: {
    testDirectories: [
      '/',
      '/plugins',
      '/config',
    ],
    testFile: {
      name: 'test-file.txt',
      content: 'This is a test file created by the API test suite.',
      directory: '/test',
    }
  },

  // Network/allocation test data
  network: {
    // Will be discovered from existing allocations
    testAllocationNotes: 'Updated by API test suite',
  },

  // Backup test data
  backups: {
    testBackup: {
      name: 'api-test-backup-' + Date.now(),
      is_locked: false,
    }
  },

  // WebSocket test data
  websocket: {
    token: '',
    socketUrl: '',
  },

  // Application API test data (admin operations)
  application: {
    testUser: {
      username: 'api-test-user-' + Date.now(),
      email: 'apitest@example.com',
      first_name: 'API',
      last_name: 'Test',
      password: 'TempTestPassword123!',
    },
    testServer: {
      name: 'API Test Server',
      description: 'Server created by API test suite',
      // Other server creation parameters will be added based on available eggs/nodes
    }
  },
};

/**
 * Expected response schemas for validation
 */
export const expectedSchemas = {
  // Client API user (account endpoint)
  clientUser: {
    object: 'string', // Actually returns object: "string" not object: "user"
    attributes: {
      id: 'number',
      admin: 'boolean',
      username: 'string',
      email: 'string',
      first_name: 'string',
      last_name: 'string',
      language: 'string',
    }
  },
  
  // Application API user
  applicationUser: {
    object: 'user',
    attributes: {
      id: 'number',
      root_admin: 'boolean', // Application API uses root_admin instead of admin
      username: 'string',
      email: 'string',
      first_name: 'string',
      last_name: 'string',
      language: 'string',
    }
  },
  
  // Client API server
  clientServer: {
    object: 'string', // Client API actually returns object: "string" not object: "server"
    attributes: {
      server_owner: 'boolean',
      identifier: 'string',
      uuid: 'string',
      name: 'string',
      description: 'string',
      status: 'string',
      is_suspended: 'boolean',
      is_installing: 'boolean',
      is_transferring: 'boolean',
    }
  },
  
  // Application API server
  applicationServer: {
    object: 'server',
    attributes: {
      id: 'number',
      external_id: ['string', 'null'],
      uuid: 'string',
      identifier: 'string',
      name: 'string',
      description: 'string',
      status: 'string',
      suspended: 'boolean',
      limits: 'object',
      feature_limits: 'object',
      user: 'number',
      node: 'number',
      allocation: 'number',
      nest: 'number',
      egg: 'number',
      container: 'object',
      created_at: 'string',
      updated_at: 'string'
    }
  },

  list: {
    object: 'list',
    data: 'array',
  },

  apiKey: {
    object: 'string', // Actually returns object: "string" like other client endpoints
    attributes: {
      identifier: 'string',
      description: 'string',
      allowed_ips: 'array',
      last_used_at: ['string', 'null'],
      created_at: 'string',
    }
  }
};

/**
 * Test cleanup tracking
 */
export const cleanup = {
  createdResources: {
    apiKeys: [] as string[],
    users: [] as number[],
    servers: [] as number[],
    databases: [] as { server: string, id: number }[],
    schedules: [] as { server: string, id: number }[],
    backups: [] as { server: string, id: string }[],
    files: [] as { server: string, path: string }[],
  }
};

/**
 * Add resource to cleanup list
 */
export function addToCleanup(type: keyof typeof cleanup.createdResources, resource: any): void {
  (cleanup.createdResources[type] as any[]).push(resource);
}

/**
 * Get resources to cleanup
 */
export function getCleanupResources(): typeof cleanup.createdResources {
  return cleanup.createdResources;
}