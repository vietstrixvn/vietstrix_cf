import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { logError, logWarn } from '@/utils';

let _axiosInstance: AxiosInstance | null = null;

const getAxiosInstance = (): AxiosInstance => {
  if (_axiosInstance) return _axiosInstance;

  const baseURL =
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
      : '';

  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 30000,
    transformResponse: [
      (data) => {
        if (typeof data === 'string') {
          if (
            data.trim().startsWith('<!DOCTYPE') ||
            data.trim().startsWith('<html')
          ) {
            logError('[ERROR] Received HTML instead of JSON.');
            throw new Error('Backend returned HTML instead of JSON.');
          }

          try {
            const jsonString = data.replace(
              /"(\w*_?id)":\s*(\d{16,})/g,
              '"$1":"$2"'
            );
            return JSON.parse(jsonString);
          } catch (e) {
            logWarn('JSON parse error:', e);
            throw new Error('Failed to parse JSON response');
          }
        }

        return data;
      },
    ],
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 403) {
        logWarn('[API] 403 Forbidden');
      }

      return Promise.reject(error);
    }
  );

  _axiosInstance = instance;
  return instance;
};

export const handleAPI = async <T = any>(
  url: string,
  method: 'POST' | 'PATCH' | 'PUT' | 'GET' | 'DELETE' = 'GET',
  data?: any,
  customHeaders?: Record<string, string>
): Promise<T> => {
  const apiInstance = getAxiosInstance();

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Inject token for server-side fetches to bypass Nginx IP restriction
  if (typeof window === 'undefined') {
    const adminToken =
      process.env.ADMIN_TOKEN ||
      '7924004d1fad739b68941d454d05af805568f7ef11d523a5020bae86664ea74a';
    if (adminToken) {
      defaultHeaders['X-Admin-Token'] = adminToken;
    }
  }

  const config: AxiosRequestConfig = {
    url,
    method,
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
  };

  if (method === 'GET' && data) {
    config.params = data;
  } else if (method !== 'GET' && data) {
    config.data = data;
  }

  try {
    const response: AxiosResponse<T> = await apiInstance(config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      logWarn('[ERROR] API ERROR:', {
        url,
        method,
        status: axiosError.response.status,
        statusText: axiosError.response.statusText,
        data: axiosError.response.data,
        timestamp: new Date().toISOString(),
      });

      throw axiosError.response.data;
    }

    if (axiosError.request) {
      logWarn('[ERROR] API NO RESPONSE:', {
        url,
        method,
        message: axiosError.message,
        timestamp: new Date().toISOString(),
      });
    } else {
      logWarn('[ERROR] API SETUP ERROR:', {
        url,
        method,
        message: axiosError.message,
        timestamp: new Date().toISOString(),
      });
    }

    throw error;
  }
};
