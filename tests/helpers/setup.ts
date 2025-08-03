import { validateConfig, testConfig, getTestMode } from '../config/environment';
import { clientApi, applicationApi, testApiConnection } from './api-client';
import { globalCleanup, setupGlobalCleanup } from './cleanup';

/**
 * Global test setup - runs before all tests
 */
beforeAll(async () => {
  console.log('🚀 Starting API Test Suite');
  console.log(`📋 Test Mode: ${getTestMode()}`);
  
  // Validate environment configuration
  try {
    validateConfig();
    console.log('✅ Environment configuration valid');
  } catch (error) {
    console.error('❌ Environment configuration invalid:', (error as Error).message);
    process.exit(1);
  }

  // Test API connections
  console.log('🔗 Testing API connections...');
  
  const clientApiWorking = await testApiConnection(clientApi, '/api/client/account');
  if (!clientApiWorking) {
    console.warn('⚠️  Client API connection failed - tests will be skipped');
    if (!testConfig.safeMode) {
      console.error('❌ API connection required for non-safe mode');
      process.exit(1);
    }
  } else {
    console.log('✅ Client API connection successful');
  }

  if (applicationApi) {
    const applicationApiWorking = await testApiConnection(applicationApi, '/api/application/users');
    if (!applicationApiWorking) {
      console.warn('⚠️  Application API connection failed - some tests will be skipped');
    } else {
      console.log('✅ Application API connection successful');
    }
  } else {
    console.log('ℹ️  Application API not configured - admin tests will be skipped');
  }

  // Setup global cleanup handlers
  setupGlobalCleanup();
  
  console.log('🎯 Test environment ready\n');
}, 30000);

/**
 * Global test cleanup - runs after all tests
 */
afterAll(async () => {
  console.log('\n🧹 Running test cleanup...');
  await globalCleanup();
  console.log('✅ Test suite completed');
}, 30000);

/**
 * Setup for individual test files
 */
beforeEach(() => {
  // Optional: Add test-specific setup here
});

afterEach(() => {
  // Optional: Add test-specific cleanup here
});