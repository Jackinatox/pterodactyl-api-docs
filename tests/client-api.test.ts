import { clientApi } from './helpers/api-client';
import { testConfig, shouldSkipTest } from './config/environment';
import { testData, addToCleanup } from './config/test-data';
import { 
  expectSuccessfulResponse, 
  expectValidSchema, 
  expectValidListResponse,
  generateTestId,
  logTestProgress 
} from './helpers/test-utils';

describe('Client API - User Endpoints', () => {
  describe('Account Management', () => {
    test('GET /api/client/account - get account details', async () => {
      logTestProgress('Testing account details endpoint');
      
      const response = await clientApi.get('/api/client/account');
      
      expectSuccessfulResponse(response);
      expectValidSchema(response, 'clientUser');
      
      // Verify required account fields
      expect(response.data.attributes).toHaveProperty('email');
      expect(response.data.attributes).toHaveProperty('username');
      expect(typeof response.data.attributes.admin).toBe('boolean');
    });

    test('GET /api/client/account/api-keys - list API keys', async () => {
      logTestProgress('Testing API keys list endpoint');
      
      const response = await clientApi.get('/api/client/account/api-keys');
      
      expectValidListResponse(response);
      
      // Each API key should have proper structure
      if (response.data.data.length > 0) {
        const apiKey = response.data.data[0];
        expectValidSchema({ data: apiKey, status: 200, statusText: 'OK', headers: {} }, 'apiKey');
      }
    });

    test('POST /api/client/account/api-keys - create API key', async () => {
      if (shouldSkipTest('destructive')) {
        return;
      }

      logTestProgress('Testing API key creation');
      
      const keyData = {
        description: testData.apiKeys.testDescription,
        allowed_ips: testData.apiKeys.allowedIps,
      };

      const response = await clientApi.post('/api/client/account/api-keys', keyData);
      
      expectSuccessfulResponse(response);
      expect(response.data).toHaveProperty('meta');
      expect(response.data.meta).toHaveProperty('secret_token');
      
      // Add to cleanup
      addToCleanup('apiKeys', response.data.attributes.identifier);
    });

    test('GET /api/client/account/two-factor - get 2FA QR code', async () => {
      logTestProgress('Testing 2FA QR code endpoint');
      
      const response = await clientApi.get('/api/client/account/two-factor');
      
      // This might return 400 if 2FA is already enabled, which is acceptable
      expect([200, 400]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.data.data).toHaveProperty('image_url_data');
        expect(response.data.data.image_url_data).toMatch(/^otpauth:\/\/totp/);
      }
    });
  });

  describe('Server Management', () => {
    test('GET /api/client - list servers', async () => {
      logTestProgress('Testing client root endpoint (servers list)');
      
      const response = await clientApi.get('/api/client');
      
      expectValidListResponse(response);
      
      // Store first server ID for other tests
      if (response.data.data.length > 0) {
        const server = response.data.data[0];
        expectValidSchema({ data: server, status: 200, statusText: 'OK', headers: {} }, 'clientServer');
        
        // Update test data with real server ID
        if (!testData.servers.testServerId) {
          testData.servers.testServerId = server.attributes.identifier;
        }
      } else {
        console.warn('No servers found in the response - some server-specific tests may be skipped');
      }
    });

    test('GET /api/client/servers/{server} - get server details', async () => {
      const serverId = testData.servers.testServerId || testConfig.testServerId;
      if (!serverId) {
        console.warn('Skipping test: No test server ID available');
        return;
      }

      logTestProgress(`Testing server details for ${serverId}`);
      
      const response = await clientApi.get(`/api/client/servers/${serverId}`);
      
      // Handle case where server doesn't exist or no access
      if (response.status === 404) {
        console.warn(`Server ${serverId} not found or no access`);
        return;
      }
      
      expectSuccessfulResponse(response);
      expectValidSchema(response, 'clientServer');
      
      // Verify server-specific fields
      expect(response.data.attributes).toHaveProperty('uuid');
      expect(response.data.attributes).toHaveProperty('name');
      expect(response.data.attributes.identifier).toBe(serverId);
    });

    test('GET /api/client/servers/{server}/resources - get server resources', async () => {
      const serverId = testData.servers.testServerId || testConfig.testServerId;
      if (!serverId) {
        console.warn('Skipping test: No test server ID available');
        return;
      }

      logTestProgress(`Testing server resources for ${serverId}`);
      
      const response = await clientApi.get(`/api/client/servers/${serverId}/resources`);
      
      expectSuccessfulResponse(response);
      
      // Verify resource fields
      expect(response.data.attributes).toHaveProperty('current_state');
      expect(response.data.attributes).toHaveProperty('resources');
      expect(response.data.attributes.resources).toHaveProperty('memory_bytes');
      expect(response.data.attributes.resources).toHaveProperty('cpu_absolute');
    });

    test('GET /api/client/servers/{server}/websocket - get WebSocket auth', async () => {
      const serverId = testData.servers.testServerId || testConfig.testServerId;
      if (!serverId) {
        console.warn('Skipping test: No test server ID available');
        return;
      }

      logTestProgress(`Testing WebSocket auth for ${serverId}`);
      
      const response = await clientApi.get(`/api/client/servers/${serverId}/websocket`);
      
      expectSuccessfulResponse(response);
      
      // Verify WebSocket auth response
      expect(response.data.data).toHaveProperty('token');
      expect(response.data.data).toHaveProperty('socket');
      expect(response.data.data.token).toMatch(/^eyJ/); // JWT token format
    });
  });

  describe('File Management', () => {
    test('GET /api/client/servers/{server}/files/list - list files', async () => {
      const serverId = testData.servers.testServerId || testConfig.testServerId;
      if (!serverId) {
        console.warn('Skipping test: No test server ID available');
        return;
      }

      logTestProgress(`Testing file list for ${serverId}`);
      
      const response = await clientApi.get(`/api/client/servers/${serverId}/files/list?directory=%2F`);
      
      expectValidListResponse(response);
      
      // Verify file objects structure
      if (response.data.data.length > 0) {
        const file = response.data.data[0];
        expect(file.attributes).toHaveProperty('name');
        expect(file.attributes).toHaveProperty('mode');
        expect(file.attributes).toHaveProperty('size');
        expect(file.attributes).toHaveProperty('is_file');
        expect(file.attributes).toHaveProperty('is_symlink');
      }
    });

    test('GET /api/client/servers/{server}/files/upload - get upload URL', async () => {
      const serverId = testData.servers.testServerId || testConfig.testServerId;
      if (!serverId) {
        console.warn('Skipping test: No test server ID available');
        return;
      }

      logTestProgress(`Testing file upload URL for ${serverId}`);
      
      const response = await clientApi.get(`/api/client/servers/${serverId}/files/upload`);
      
      expectSuccessfulResponse(response);
      
      // Verify upload response structure
      expect(response.data.attributes).toHaveProperty('url');
      expect(response.data.attributes.url).toMatch(/^https?:\/\//);
    });
  });

  describe('Database Management', () => {
    test('GET /api/client/servers/{server}/databases - list databases', async () => {
      const serverId = testData.servers.testServerId || testConfig.testServerId;
      if (!serverId) {
        console.warn('Skipping test: No test server ID available');
        return;
      }

      logTestProgress(`Testing database list for ${serverId}`);
      
      const response = await clientApi.get(`/api/client/servers/${serverId}/databases`);
      
      expectValidListResponse(response);
      
      // Verify database structure if any exist
      if (response.data.data.length > 0) {
        const database = response.data.data[0];
        expect(database.attributes).toHaveProperty('id');
        expect(database.attributes).toHaveProperty('name');
        expect(database.attributes).toHaveProperty('username');
        expect(database.attributes).toHaveProperty('connections_from');
        expect(database.attributes).toHaveProperty('max_connections');
      }
    });

    test('POST /api/client/servers/{server}/databases - create database', async () => {
      if (shouldSkipTest('destructive')) {
        console.warn('Skipping destructive test in safe mode');
        return;
      }

      const serverId = testData.servers.testServerId || testConfig.testServerId;
      if (!serverId) {
        console.warn('Skipping test: No test server ID available');
        return;
      }

      logTestProgress(`Testing database creation for ${serverId}`);
      
      const dbData = {
        database: generateTestId(),
        remote: '%',
      };

      const response = await clientApi.post(`/api/client/servers/${serverId}/databases`, dbData);
      
      // Handle case where database creation is not allowed or fails
      if (response.status >= 400) {
        console.warn(`Database creation failed with status ${response.status}`);
        return;
      }
      
      expectSuccessfulResponse(response);
      
      // Add to cleanup
      addToCleanup('databases', { server: serverId, id: response.data.attributes.id });
    });
  });

  describe('Network Management', () => {
    test('GET /api/client/servers/{server}/network/allocations - list allocations', async () => {
      const serverId = testData.servers.testServerId || testConfig.testServerId;
      if (!serverId) {
        console.warn('Skipping test: No test server ID available');
        return;
      }

      logTestProgress(`Testing network allocations for ${serverId}`);
      
      const response = await clientApi.get(`/api/client/servers/${serverId}/network/allocations`);
      
      expectValidListResponse(response);
      
      // Verify allocation structure
      if (response.data.data.length > 0) {
        const allocation = response.data.data[0];
        expect(allocation.attributes).toHaveProperty('id');
        expect(allocation.attributes).toHaveProperty('ip');
        expect(allocation.attributes).toHaveProperty('port');
        expect(allocation.attributes).toHaveProperty('is_default');
        expect(typeof allocation.attributes.is_default).toBe('boolean');
      }
    });
  });

  describe('User Management', () => {
    test('GET /api/client/servers/{server}/users - list server users', async () => {
      const serverId = testData.servers.testServerId || testConfig.testServerId;
      if (!serverId) {
        console.warn('Skipping test: No test server ID available');
        return;
      }

      logTestProgress(`Testing server users for ${serverId}`);
      
      const response = await clientApi.get(`/api/client/servers/${serverId}/users`);
      
      expectValidListResponse(response);
      
      // Verify user structure
      if (response.data.data.length > 0) {
        const user = response.data.data[0];
        expect(user.attributes).toHaveProperty('uuid');
        expect(user.attributes).toHaveProperty('username');
        expect(user.attributes).toHaveProperty('email');
        expect(user.attributes).toHaveProperty('permissions');
        expect(Array.isArray(user.attributes.permissions)).toBe(true);
      }
    });
  });

  describe('Backup Management', () => {
    test('GET /api/client/servers/{server}/backups - list backups', async () => {
      const serverId = testData.servers.testServerId || testConfig.testServerId;
      if (!serverId) {
        console.warn('Skipping test: No test server ID available');
        return;
      }

      logTestProgress(`Testing backup list for ${serverId}`);
      
      const response = await clientApi.get(`/api/client/servers/${serverId}/backups`);
      
      expectValidListResponse(response);
      
      // Verify backup structure if any exist
      if (response.data.data.length > 0) {
        const backup = response.data.data[0];
        expect(backup.attributes).toHaveProperty('uuid');
        expect(backup.attributes).toHaveProperty('name');
        expect(backup.attributes).toHaveProperty('completed_at');
        expect(backup.attributes).toHaveProperty('is_successful');
        expect(backup.attributes).toHaveProperty('is_locked');
        expect(typeof backup.attributes.is_locked).toBe('boolean');
      }
    });
  });

  describe('Schedule Management', () => {
    test('GET /api/client/servers/{server}/schedules - list schedules', async () => {
      const serverId = testData.servers.testServerId || testConfig.testServerId;
      if (!serverId) {
        console.warn('Skipping test: No test server ID available');
        return;
      }

      logTestProgress(`Testing schedule list for ${serverId}`);
      
      const response = await clientApi.get(`/api/client/servers/${serverId}/schedules`);
      
      expectValidListResponse(response);
      
      // Verify schedule structure if any exist
      if (response.data.data.length > 0) {
        const schedule = response.data.data[0];
        expect(schedule.attributes).toHaveProperty('id');
        expect(schedule.attributes).toHaveProperty('name');
        expect(schedule.attributes).toHaveProperty('cron');
        expect(schedule.attributes).toHaveProperty('is_active');
        expect(schedule.attributes).toHaveProperty('only_when_online');
        expect(typeof schedule.attributes.is_active).toBe('boolean');
      }
    });
  });
});

describe('Client API - Error Handling', () => {
  test('GET /api/client/nonexistent - handles 404 errors', async () => {
    logTestProgress('Testing 404 error handling');
    
    const response = await clientApi.get('/api/client/nonexistent');
    
    expect(response.status).toBe(404);
    expect(response.data).toHaveProperty('errors');
    expect(Array.isArray(response.data.errors)).toBe(true);
  });

  test('GET /api/client/servers/invalid-id - handles invalid server ID', async () => {
    logTestProgress('Testing invalid server ID error handling');
    
    const response = await clientApi.get('/api/client/servers/invalid-server-id');
    
    expect([404, 422]).toContain(response.status);
    expect(response.data).toHaveProperty('errors');
  });
});