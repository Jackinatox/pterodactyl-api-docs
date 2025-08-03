import { applicationApi } from './helpers/api-client';
import { shouldSkipTest } from './config/environment';
import { testData, addToCleanup } from './config/test-data';
import { 
  expectSuccessfulResponse, 
  expectValidListResponse,
  generateTestId,
  logTestProgress 
} from './helpers/test-utils';

describe('Application API - Admin Endpoints', () => {
  beforeAll(() => {
    if (!applicationApi) {
      console.warn('Application API not configured - some tests will be skipped');
    }
  });

  describe('User Management', () => {
    test('GET /api/application/users - list users', async () => {
      if (!applicationApi) return;
      
      logTestProgress('Testing application users list');
      
      const response = await applicationApi.get('/api/application/users');
      
      expectValidListResponse(response);
      
      // Verify user structure
      if (response.data.data.length > 0) {
        const user = response.data.data[0];
        expect(user.attributes).toHaveProperty('id');
        expect(user.attributes).toHaveProperty('uuid');
        expect(user.attributes).toHaveProperty('username');
        expect(user.attributes).toHaveProperty('email');
        expect(user.attributes).toHaveProperty('first_name');
        expect(user.attributes).toHaveProperty('last_name');
        expect(user.attributes).toHaveProperty('root_admin');
        expect(typeof user.attributes.root_admin).toBe('boolean');
      }
    });

    test('POST /api/application/users - create user', async () => {
      if (!applicationApi || shouldSkipTest('destructive')) {
        console.warn('Skipping user creation test');
        return;
      }

      logTestProgress('Testing user creation');
      
      const userData = {
        ...testData.application.testUser,
        username: generateTestId(),
        email: `test-${generateTestId()}@example.com`,
      };

      const response = await applicationApi.post('/api/application/users', userData);
      
      expectSuccessfulResponse(response);
      expect(response.data.attributes).toHaveProperty('id');
      expect(response.data.attributes.username).toBe(userData.username);
      expect(response.data.attributes.email).toBe(userData.email);
      
      // Add to cleanup
      addToCleanup('users', response.data.attributes.id);
    });

    test('GET /api/application/users/{user} - get user details', async () => {
      if (!applicationApi) return;
      
      logTestProgress('Testing user details endpoint');
      
      // First get a user from the list
      const listResponse = await applicationApi.get('/api/application/users');
      if (listResponse.data.data.length === 0) {
        console.warn('Skipping test: No users available for testing');
        return;
      }

      const userId = listResponse.data.data[0].attributes.id;
      const response = await applicationApi.get(`/api/application/users/${userId}`);
      
      expectSuccessfulResponse(response);
      expect(response.data.attributes).toHaveProperty('id');
      expect(response.data.attributes.id).toBe(userId);
    });
  });

  describe('Server Management', () => {
    test('GET /api/application/servers - list servers', async () => {
      if (!applicationApi) return;
      
      logTestProgress('Testing application servers list');
      
      const response = await applicationApi.get('/api/application/servers');
      
      expectValidListResponse(response);
      
      // Verify server structure
      if (response.data.data.length > 0) {
        const server = response.data.data[0];
        expect(server.attributes).toHaveProperty('id');
        expect(server.attributes).toHaveProperty('uuid');
        expect(server.attributes).toHaveProperty('identifier');
        expect(server.attributes).toHaveProperty('name');
        expect(server.attributes).toHaveProperty('description');
        expect(server.attributes).toHaveProperty('status');
        expect(server.attributes).toHaveProperty('user');
        expect(typeof server.attributes.user).toBe('number');
      }
    });

    test('GET /api/application/servers/{server} - get server details', async () => {
      if (!applicationApi) return;
      
      logTestProgress('Testing application server details');
      
      // First get a server from the list
      const listResponse = await applicationApi.get('/api/application/servers');
      if (listResponse.data.data.length === 0) {
        console.warn('Skipping test: No servers available for testing');
        return;
      }

      const serverId = listResponse.data.data[0].attributes.id;
      const response = await applicationApi.get(`/api/application/servers/${serverId}`);
      
      expectSuccessfulResponse(response);
      expect(response.data.attributes).toHaveProperty('id');
      expect(response.data.attributes.id).toBe(serverId);
    });

    test('GET /api/application/servers/{server}/databases - list server databases', async () => {
      if (!applicationApi) return;
      
      logTestProgress('Testing application server databases');
      
      // Get first server
      const serversResponse = await applicationApi.get('/api/application/servers');
      if (serversResponse.data.data.length === 0) {
        console.warn('Skipping test: No servers available for testing');
        return;
      }

      const serverId = serversResponse.data.data[0].attributes.id;
      const response = await applicationApi.get(`/api/application/servers/${serverId}/databases`);
      
      expectValidListResponse(response);
      
      // Verify database structure if any exist
      if (response.data.data.length > 0) {
        const database = response.data.data[0];
        expect(database.attributes).toHaveProperty('id');
        expect(database.attributes).toHaveProperty('server');
        expect(database.attributes).toHaveProperty('host');
        expect(database.attributes).toHaveProperty('database');
        expect(database.attributes).toHaveProperty('username');
        expect(database.attributes).toHaveProperty('remote');
        expect(database.attributes).toHaveProperty('max_connections');
      }
    });
  });

  describe('Node Management', () => {
    test('GET /api/application/nodes - list nodes', async () => {
      if (!applicationApi) return;
      
      logTestProgress('Testing nodes list');
      
      const response = await applicationApi.get('/api/application/nodes');
      
      expectValidListResponse(response);
      
      // Verify node structure
      if (response.data.data.length > 0) {
        const node = response.data.data[0];
        expect(node.attributes).toHaveProperty('id');
        expect(node.attributes).toHaveProperty('uuid');
        expect(node.attributes).toHaveProperty('public');
        expect(node.attributes).toHaveProperty('name');
        expect(node.attributes).toHaveProperty('description');
        expect(node.attributes).toHaveProperty('location_id');
        expect(node.attributes).toHaveProperty('fqdn');
        expect(node.attributes).toHaveProperty('scheme');
        expect(node.attributes).toHaveProperty('behind_proxy');
        expect(node.attributes).toHaveProperty('maintenance_mode');
        expect(typeof node.attributes.public).toBe('boolean');
        expect(typeof node.attributes.behind_proxy).toBe('boolean');
        expect(typeof node.attributes.maintenance_mode).toBe('boolean');
      }
    });

    test('GET /api/application/nodes/{node} - get node details', async () => {
      if (!applicationApi) return;
      
      logTestProgress('Testing node details');
      
      // First get a node from the list
      const listResponse = await applicationApi.get('/api/application/nodes');
      if (listResponse.data.data.length === 0) {
        console.warn('Skipping test: No nodes available for testing');
        return;
      }

      const nodeId = listResponse.data.data[0].attributes.id;
      const response = await applicationApi.get(`/api/application/nodes/${nodeId}`);
      
      expectSuccessfulResponse(response);
      expect(response.data.attributes).toHaveProperty('id');
      expect(response.data.attributes.id).toBe(nodeId);
    });

    test('GET /api/application/nodes/{node}/configuration - get node configuration', async () => {
      if (!applicationApi) return;
      
      logTestProgress('Testing node configuration');
      
      // Get first node
      const nodesResponse = await applicationApi.get('/api/application/nodes');
      if (nodesResponse.data.data.length === 0) {
        console.warn('Skipping test: No nodes available for testing');
        return;
      }

      const nodeId = nodesResponse.data.data[0].attributes.id;
      const response = await applicationApi.get(`/api/application/nodes/${nodeId}/configuration`);
      
      expectSuccessfulResponse(response);
      
      // Verify configuration structure
      expect(response.data).toHaveProperty('debug');
      expect(response.data).toHaveProperty('uuid');
      expect(response.data).toHaveProperty('token_id');
      expect(response.data).toHaveProperty('token');
      expect(response.data).toHaveProperty('api');
      expect(response.data).toHaveProperty('system');
      expect(response.data).toHaveProperty('allowed_mounts');
      expect(response.data).toHaveProperty('remote');
      expect(typeof response.data.debug).toBe('boolean');
    });
  });

  describe('Location Management', () => {
    test('GET /api/application/locations - list locations', async () => {
      if (!applicationApi) return;
      
      logTestProgress('Testing locations list');
      
      const response = await applicationApi.get('/api/application/locations');
      
      expectValidListResponse(response);
      
      // Verify location structure
      if (response.data.data.length > 0) {
        const location = response.data.data[0];
        expect(location.attributes).toHaveProperty('id');
        expect(location.attributes).toHaveProperty('short');
        expect(location.attributes).toHaveProperty('long');
        expect(location.attributes).toHaveProperty('updated_at');
        expect(location.attributes).toHaveProperty('created_at');
      }
    });
  });

  describe('Nest and Egg Management', () => {
    test('GET /api/application/nests - list nests', async () => {
      if (!applicationApi) return;
      
      logTestProgress('Testing nests list');
      
      const response = await applicationApi.get('/api/application/nests');
      
      expectValidListResponse(response);
      
      // Verify nest structure
      if (response.data.data.length > 0) {
        const nest = response.data.data[0];
        expect(nest.attributes).toHaveProperty('id');
        expect(nest.attributes).toHaveProperty('uuid');
        expect(nest.attributes).toHaveProperty('author');
        expect(nest.attributes).toHaveProperty('name');
        expect(nest.attributes).toHaveProperty('description');
        expect(nest.attributes).toHaveProperty('created_at');
        expect(nest.attributes).toHaveProperty('updated_at');
      }
    });

    test('GET /api/application/nests/{nest}/eggs - list nest eggs', async () => {
      if (!applicationApi) return;
      
      logTestProgress('Testing nest eggs');
      
      // Get first nest
      const nestsResponse = await applicationApi.get('/api/application/nests');
      if (nestsResponse.data.data.length === 0) {
        console.warn('Skipping test: No nests available for testing');
        return;
      }

      const nestId = nestsResponse.data.data[0].attributes.id;
      const response = await applicationApi.get(`/api/application/nests/${nestId}/eggs`);
      
      expectValidListResponse(response);
      
      // Verify egg structure if any exist
      if (response.data.data.length > 0) {
        const egg = response.data.data[0];
        expect(egg.attributes).toHaveProperty('id');
        expect(egg.attributes).toHaveProperty('uuid');
        expect(egg.attributes).toHaveProperty('name');
        expect(egg.attributes).toHaveProperty('nest');
        expect(egg.attributes).toHaveProperty('author');
        expect(egg.attributes).toHaveProperty('description');
        expect(egg.attributes).toHaveProperty('docker_images');
        expect(typeof egg.attributes.docker_images).toBe('object');
      }
    });
  });
});

describe('Application API - Error Handling', () => {
  beforeAll(() => {
    if (!applicationApi) {
      console.warn('Application API not configured - error handling tests will be skipped');
    }
  });

  test('GET /api/application/nonexistent - handles 404 errors', async () => {
    if (!applicationApi) return;
    
    logTestProgress('Testing application API 404 error handling');
    
    const response = await applicationApi.get('/api/application/nonexistent');
    
    expect(response.status).toBe(404);
    expect(response.data).toHaveProperty('errors');
    expect(Array.isArray(response.data.errors)).toBe(true);
  });

  test('GET /api/application/users/999999 - handles invalid user ID', async () => {
    if (!applicationApi) return;
    
    logTestProgress('Testing invalid user ID error handling');
    
    const response = await applicationApi.get('/api/application/users/999999');
    
    expect(response.status).toBe(404);
    expect(response.data).toHaveProperty('errors');
  });

  test('POST /api/application/users - handles validation errors', async () => {
    if (!applicationApi || shouldSkipTest('destructive')) {
      console.warn('Skipping validation error test');
      return;
    }
    
    logTestProgress('Testing user creation validation errors');
    
    // Send invalid data (missing required fields)
    const response = await applicationApi.post('/api/application/users', {
      username: 'test', // Too short, usually has minimum length requirement
    });
    
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty('errors');
    expect(Array.isArray(response.data.errors)).toBe(true);
  });
});