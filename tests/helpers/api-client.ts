import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { testConfig } from '../config/environment';

/**
 * API response interface
 */
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

/**
 * Base API client class
 */
class BaseApiClient {
  protected client: AxiosInstance;

  constructor(apiKey: string, baseURL: string = testConfig.panelUrl) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'Application/vnd.pterodactyl.v1+json',
        'Content-Type': 'application/json',
      },
      timeout: testConfig.testTimeout,
      validateStatus: () => true, // Don't throw on HTTP error status
    });

    // Add request/response interceptors for debugging
    if (testConfig.verbose) {
      this.client.interceptors.request.use(
        (config) => {
          console.log(`🔵 ${config.method?.toUpperCase()} ${config.url}`);
          if (config.data) {
            console.log('📤 Request body:', JSON.stringify(config.data, null, 2));
          }
          return config;
        },
        (error) => {
          console.error('❌ Request error:', error.message);
          return Promise.reject(error);
        }
      );

      this.client.interceptors.response.use(
        (response) => {
          const statusColor = response.status < 400 ? '🟢' : '🔴';
          console.log(`${statusColor} ${response.status} ${response.statusText}`);
          if (response.data && testConfig.verbose) {
            console.log('📥 Response:', JSON.stringify(response.data, null, 2));
          }
          return response;
        },
        (error) => {
          console.error('❌ Response error:', error.message);
          return Promise.reject(error);
        }
      );
    }
  }

  /**
   * Make GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get(url, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  /**
   * Make POST request
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  /**
   * Make PUT request
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  /**
   * Make PATCH request
   */
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  /**
   * Make DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete(url, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }
}

/**
 * Client API wrapper (User-facing API)
 */
export class ClientApiClient extends BaseApiClient {
  constructor() {
    super(testConfig.clientApiKey);
  }
}

/**
 * Application API wrapper (Admin API)  
 */
export class ApplicationApiClient extends BaseApiClient {
  constructor() {
    if (!testConfig.applicationApiKey) {
      throw new Error('Application API key not configured');
    }
    super(testConfig.applicationApiKey);
  }
}

/**
 * WebSocket API helper
 */
export class WebSocketApiClient extends ClientApiClient {
  /**
   * Get WebSocket authentication token
   */
  async getWebSocketToken(serverId: string): Promise<string> {
    const response = await this.get(`/api/client/servers/${serverId}/websocket`);
    
    if (response.status !== 200) {
      throw new Error(`Failed to get WebSocket token: ${response.status} ${response.statusText}`);
    }

    return response.data.data.token;
  }
}

/**
 * Create client API instance
 */
export const clientApi = new ClientApiClient();

/**
 * Create application API instance (if configured)
 */
export let applicationApi: ApplicationApiClient | null = null;
try {
  if (testConfig.applicationApiKey) {
    applicationApi = new ApplicationApiClient();
  }
} catch (error) {
  // Application API not available
}

/**
 * Create WebSocket API instance
 */
export const websocketApi = new WebSocketApiClient();

/**
 * Test if API connection is working
 */
export async function testApiConnection(client: BaseApiClient, endpoint: string): Promise<boolean> {
  try {
    const response = await client.get(endpoint);
    return response.status < 500; // Accept client errors but not server errors
  } catch (error) {
    console.error(`Failed to connect to API: ${error}`);
    return false;
  }
}

/**
 * Retry wrapper for flaky operations
 */
export async function withRetry<T>(
  operation: () => Promise<T>, 
  maxAttempts: number = testConfig.retryAttempts
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxAttempts) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.warn(`Attempt ${attempt}/${maxAttempts} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
}