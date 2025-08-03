import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: [
    '**/*.test.ts'
  ],
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/config/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/helpers/setup.ts'],
  testTimeout: 30000, // 30 seconds for API calls
  verbose: true,
  detectOpenHandles: true,
  forceExit: true,
};

export default config;