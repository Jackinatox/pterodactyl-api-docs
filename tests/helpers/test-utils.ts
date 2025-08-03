import { ApiResponse } from './api-client';
import { expectedSchemas } from '../config/test-data';

/**
 * Test result interface
 */
export interface TestResult {
  endpoint: string;
  method: string;
  status: number;
  success: boolean;
  error?: string;
  responseTime?: number;
  validationErrors?: string[];
}

/**
 * Validate API response structure against expected schema
 */
export function validateResponseSchema(response: ApiResponse, expectedSchema: any): string[] {
  const errors: string[] = [];
  
  function validateObject(obj: any, schema: any, path: string = ''): void {
    if (typeof schema === 'object' && schema !== null && !Array.isArray(schema)) {
      for (const [key, expectedType] of Object.entries(schema)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (!(key in obj)) {
          errors.push(`Missing property: ${currentPath}`);
          continue;
        }

        const value = obj[key];
        
        if (Array.isArray(expectedType)) {
          // Multiple possible types (e.g., ['string', 'null'])
          const validTypes = expectedType as string[];
          const actualType = value === null ? 'null' : typeof value;
          
          if (!validTypes.includes(actualType)) {
            errors.push(`Invalid type for ${currentPath}: expected one of [${validTypes.join(', ')}], got ${actualType}`);
          }
        } else if (expectedType === 'array') {
          if (!Array.isArray(value)) {
            errors.push(`Invalid type for ${currentPath}: expected array, got ${typeof value}`);
          }
        } else if (typeof expectedType === 'string') {
          const actualType = typeof value;
          if (actualType !== expectedType && value !== null) {
            errors.push(`Invalid type for ${currentPath}: expected ${expectedType}, got ${actualType}`);
          }
        } else if (typeof expectedType === 'object') {
          // Nested object validation
          if (typeof value === 'object' && value !== null) {
            validateObject(value, expectedType, currentPath);
          } else {
            errors.push(`Invalid type for ${currentPath}: expected object, got ${typeof value}`);
          }
        }
      }
    }
  }

  validateObject(response.data, expectedSchema);
  return errors;
}

/**
 * Validate standard Pterodactyl API response format
 */
export function validateStandardResponse(response: ApiResponse, expectedType?: string): string[] {
  const errors: string[] = [];

  // Check status code is in valid range
  if (response.status < 200 || response.status >= 300) {
    errors.push(`Unexpected status code: ${response.status}`);
  }

  // Check response has data
  if (!response.data) {
    errors.push('Response missing data property');
    return errors;
  }

  // Check for error responses
  if (response.data.errors) {
    errors.push(`API returned errors: ${JSON.stringify(response.data.errors)}`);
    return errors;
  }

  // Validate object type if specified
  if (expectedType && response.data.object !== expectedType) {
    errors.push(`Expected object type '${expectedType}', got '${response.data.object}'`);
  }

  return errors;
}

/**
 * Validate list response structure
 */
export function validateListResponse(response: ApiResponse): string[] {
  const errors = validateStandardResponse(response, 'list');
  
  if (errors.length === 0) {
    if (!Array.isArray(response.data.data)) {
      errors.push('List response data property must be an array');
    }
  }

  return errors;
}

/**
 * Generate test UUID for temporary resources
 */
export function generateTestId(): string {
  return `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Wait for a condition to be met (polling)
 */
export async function waitFor(
  condition: () => Promise<boolean>,
  timeout: number = 30000,
  interval: number = 1000
): Promise<boolean> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  return false;
}

/**
 * Expect response to be successful
 */
export function expectSuccessfulResponse(response: ApiResponse): void {
  expect(response.status).toBeGreaterThanOrEqual(200);
  expect(response.status).toBeLessThan(300);
  expect(response.data).toBeDefined();
}

/**
 * Expect response to match schema
 */
export function expectValidSchema(response: ApiResponse, schemaName: keyof typeof expectedSchemas): void {
  const schema = expectedSchemas[schemaName];
  const validationErrors = validateResponseSchema(response, schema);
  
  if (validationErrors.length > 0) {
    throw new Error(`Schema validation failed:\n${validationErrors.join('\n')}`);
  }
}

/**
 * Expect list response to be valid
 */
export function expectValidListResponse(response: ApiResponse): void {
  expectSuccessfulResponse(response);
  const validationErrors = validateListResponse(response);
  
  if (validationErrors.length > 0) {
    throw new Error(`List response validation failed:\n${validationErrors.join('\n')}`);
  }
}

/**
 * Safe JSON stringify for logging
 */
export function safeStringify(obj: any, maxLength: number = 1000): string {
  try {
    const str = JSON.stringify(obj, null, 2);
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  } catch (error) {
    return `[Unable to stringify: ${error}]`;
  }
}

/**
 * Create test timeout wrapper
 */
export function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
    ),
  ]);
}

/**
 * Skip test with reason
 */
export function skipTest(reason: string): void {
  console.warn(`⚠️  Skipping test: ${reason}`);
  // In Jest, we can use test.skip() but this provides a more descriptive approach
}

/**
 * Log test progress
 */
export function logTestProgress(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
  const timestamp = new Date().toISOString().substring(11, 23);
  const prefix = level === 'info' ? '💡' : level === 'warn' ? '⚠️' : '❌';
  console.log(`${prefix} [${timestamp}] ${message}`);
}