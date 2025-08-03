import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.test file
// Look in both current directory and parent directory
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });
dotenv.config({ path: path.resolve(process.cwd(), '..', '.env.test') });

export interface TestConfig {
  panelUrl: string;
  clientApiKey: string;
  applicationApiKey: string;
  safeMode: boolean;
  skipDestructive: boolean;
  testServerId?: string;
  testUserId?: string;
  testUserEmail?: string;
  testTimeout: number;
  retryAttempts: number;
  verbose: boolean;
}

export const testConfig: TestConfig = {
  // Pterodactyl Panel Configuration
  panelUrl: process.env.PTERODACTYL_URL || '',
  clientApiKey: process.env.CLIENT_API_KEY || '',
  applicationApiKey: process.env.APPLICATION_API_KEY || '',
  
  // Test Execution Modes
  safeMode: process.env.SAFE_MODE === 'true' || process.env.DEMO_MODE === 'true',
  skipDestructive: process.env.SKIP_DESTRUCTIVE === 'true' || process.env.DEMO_MODE === 'true',
  
  // Test Data
  testServerId: process.env.TEST_SERVER_ID,
  testUserId: process.env.TEST_USER_ID,
  testUserEmail: process.env.TEST_USER_EMAIL,
  
  // Test Settings
  testTimeout: parseInt(process.env.TEST_TIMEOUT || '30000'),
  retryAttempts: parseInt(process.env.RETRY_ATTEMPTS || '2'),
  verbose: process.env.VERBOSE === 'true',
};

export function validateConfig(): void {
  const required = [
    { key: 'PTERODACTYL_URL', value: testConfig.panelUrl },
    { key: 'CLIENT_API_KEY', value: testConfig.clientApiKey },
  ];

  const missing = required.filter(({ value }) => !value);
  
  if (missing.length > 0) {
    const missingKeys = missing.map(({ key }) => key).join(', ');
    throw new Error(`Missing required environment variables: ${missingKeys}. Please check your .env.test file.`);
  }

  if (!testConfig.panelUrl.startsWith('http')) {
    throw new Error('PTERODACTYL_URL must start with http:// or https://');
  }

  if (!testConfig.clientApiKey.startsWith('ptlc_')) {
    throw new Error('CLIENT_API_KEY must start with ptlc_');
  }

  if (testConfig.applicationApiKey && !testConfig.applicationApiKey.startsWith('ptla_')) {
    throw new Error('APPLICATION_API_KEY must start with ptla_');
  }
}

export function getTestMode(): string {
  if (testConfig.safeMode) return 'SAFE';
  if (testConfig.skipDestructive) return 'PARTIAL';
  return 'FULL';
}

export function shouldSkipTest(testType: 'destructive' | 'application' | 'websocket'): boolean {
  switch (testType) {
    case 'destructive':
      return testConfig.safeMode || testConfig.skipDestructive;
    case 'application':
      return !testConfig.applicationApiKey;
    case 'websocket':
      return testConfig.safeMode; // WebSocket testing requires more setup
    default:
      return false;
  }
}