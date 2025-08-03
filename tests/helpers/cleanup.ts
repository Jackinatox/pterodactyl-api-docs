import { clientApi, applicationApi } from './api-client';
import { getCleanupResources } from '../config/test-data';
import { testConfig } from '../config/environment';

/**
 * Cleanup manager for test resources
 */
export class CleanupManager {
  private static instance: CleanupManager;
  private cleanupPromises: Promise<void>[] = [];

  static getInstance(): CleanupManager {
    if (!CleanupManager.instance) {
      CleanupManager.instance = new CleanupManager();
    }
    return CleanupManager.instance;
  }

  /**
   * Add cleanup operation to queue
   */
  addCleanup(cleanupFn: () => Promise<void>): void {
    this.cleanupPromises.push(cleanupFn());
  }

  /**
   * Execute all cleanup operations
   */
  async executeAll(): Promise<void> {
    if (testConfig.safeMode) {
      console.log('🔒 Safe mode enabled - skipping cleanup');
      return;
    }

    console.log('🧹 Starting cleanup...');
    
    try {
      await Promise.allSettled(this.cleanupPromises);
      console.log('✅ Cleanup completed');
    } catch (error) {
      console.error('❌ Cleanup failed:', error);
    }

    this.cleanupPromises = [];
  }
}

/**
 * Cleanup created API keys
 */
export async function cleanupApiKeys(): Promise<void> {
  const resources = getCleanupResources();
  
  for (const identifier of resources.apiKeys) {
    try {
      const response = await clientApi.delete(`/api/client/account/api-keys/${identifier}`);
      if (response.status === 204) {
        console.log(`✅ Deleted API key: ${identifier}`);
      } else {
        console.warn(`⚠️  Failed to delete API key ${identifier}: ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ Error deleting API key ${identifier}:`, error);
    }
  }
  
  resources.apiKeys.length = 0; // Clear the array
}

/**
 * Cleanup created users (Application API)
 */
export async function cleanupUsers(): Promise<void> {
  if (!applicationApi) return;
  
  const resources = getCleanupResources();
  
  for (const userId of resources.users) {
    try {
      const response = await applicationApi.delete(`/api/application/users/${userId}`);
      if (response.status === 204) {
        console.log(`✅ Deleted user: ${userId}`);
      } else {
        console.warn(`⚠️  Failed to delete user ${userId}: ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ Error deleting user ${userId}:`, error);
    }
  }
  
  resources.users.length = 0;
}

/**
 * Cleanup created servers (Application API)
 */
export async function cleanupServers(): Promise<void> {
  if (!applicationApi) return;
  
  const resources = getCleanupResources();
  
  for (const serverId of resources.servers) {
    try {
      const response = await applicationApi.delete(`/api/application/servers/${serverId}`);
      if (response.status === 204) {
        console.log(`✅ Deleted server: ${serverId}`);
      } else {
        console.warn(`⚠️  Failed to delete server ${serverId}: ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ Error deleting server ${serverId}:`, error);
    }
  }
  
  resources.servers.length = 0;
}

/**
 * Cleanup created databases
 */
export async function cleanupDatabases(): Promise<void> {
  const resources = getCleanupResources();
  
  for (const database of resources.databases) {
    try {
      const response = await clientApi.delete(`/api/client/servers/${database.server}/databases/${database.id}`);
      if (response.status === 204) {
        console.log(`✅ Deleted database: ${database.id} on server ${database.server}`);
      } else {
        console.warn(`⚠️  Failed to delete database ${database.id}: ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ Error deleting database ${database.id}:`, error);
    }
  }
  
  resources.databases.length = 0;
}

/**
 * Cleanup created schedules
 */
export async function cleanupSchedules(): Promise<void> {
  const resources = getCleanupResources();
  
  for (const schedule of resources.schedules) {
    try {
      const response = await clientApi.delete(`/api/client/servers/${schedule.server}/schedules/${schedule.id}`);
      if (response.status === 204) {
        console.log(`✅ Deleted schedule: ${schedule.id} on server ${schedule.server}`);
      } else {
        console.warn(`⚠️  Failed to delete schedule ${schedule.id}: ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ Error deleting schedule ${schedule.id}:`, error);
    }
  }
  
  resources.schedules.length = 0;
}

/**
 * Cleanup created backups
 */
export async function cleanupBackups(): Promise<void> {
  const resources = getCleanupResources();
  
  for (const backup of resources.backups) {
    try {
      const response = await clientApi.delete(`/api/client/servers/${backup.server}/backups/${backup.id}`);
      if (response.status === 204) {
        console.log(`✅ Deleted backup: ${backup.id} on server ${backup.server}`);
      } else {
        console.warn(`⚠️  Failed to delete backup ${backup.id}: ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ Error deleting backup ${backup.id}:`, error);
    }
  }
  
  resources.backups.length = 0;
}

/**
 * Cleanup created files
 */
export async function cleanupFiles(): Promise<void> {
  const resources = getCleanupResources();
  
  for (const file of resources.files) {
    try {
      const response = await clientApi.post(`/api/client/servers/${file.server}/files/delete`, {
        root: '/',
        files: [file.path]
      });
      if (response.status === 204) {
        console.log(`✅ Deleted file: ${file.path} on server ${file.server}`);
      } else {
        console.warn(`⚠️  Failed to delete file ${file.path}: ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ Error deleting file ${file.path}:`, error);
    }
  }
  
  resources.files.length = 0;
}

/**
 * Global cleanup function - cleans up all test resources
 */
export async function globalCleanup(): Promise<void> {
  if (testConfig.safeMode) {
    console.log('🔒 Safe mode enabled - no cleanup needed');
    return;
  }

  console.log('🧹 Starting global cleanup...');

  // Cleanup in reverse order of dependency
  await Promise.allSettled([
    cleanupFiles(),
    cleanupBackups(),
    cleanupSchedules(),
    cleanupDatabases(),
    cleanupServers(),
    cleanupUsers(),
    cleanupApiKeys(),
  ]);

  console.log('✅ Global cleanup completed');
}

/**
 * Setup cleanup to run on process exit
 */
export function setupGlobalCleanup(): void {
  const cleanup = () => {
    globalCleanup().then(() => process.exit(0)).catch(() => process.exit(1));
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('uncaughtException', cleanup);
  process.on('unhandledRejection', cleanup);
}