import { toast } from 'sonner';
import { getErrorMessage, isSuccess, type ErrorCode } from './code.helper';

interface ErrorResponse {
  code: ErrorCode;
  message?: string;
  success: boolean;
}

/**
 * Handle error response from backend (for non-hook usage like Zustand stores)
 * @param error - Error response from API
 * @param customMessages - Optional custom messages for specific error codes
 * @param showToast - Whether to show toast notification (default: false for store usage)
 * @returns Error message string
 */
export const handleErrorResponse = (
  error: ErrorResponse | unknown,
  customMessages?: Partial<Record<ErrorCode, string>>,
  showToast: boolean = false
): string => {
  // Check if error matches ErrorResponse structure
  if (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    'success' in error
  ) {
    const errorResponse = error as ErrorResponse;
    const { code } = errorResponse;

    // Don't show toast for success codes
    if (isSuccess(code)) {
      return getErrorMessage(code);
    }

    // Use custom message if provided, otherwise use default
    const message = customMessages?.[code] || getErrorMessage(code);

    if (showToast) {
      toast.error(message);
    }

    return message;
  }

  // Fallback for unknown error format
  const fallbackMessage = 'Đã xảy ra lỗi không xác định';

  if (showToast) {
    toast.error(fallbackMessage);
  }

  return fallbackMessage;
};

/**
 * Handle success response from backend (for non-hook usage)
 * @param response - Success response from API
 * @param successMessage - Optional custom success message
 */
export const handleSuccessResponse = (
  response: ErrorResponse,
  successMessage?: string
): void => {
  if (isSuccess(response.code)) {
    toast.success(successMessage || getErrorMessage(response.code));
  }
};

/**
 * Extract error code from API response data
 * @param data - Response data from API
 * @returns Error code if found, null otherwise
 */
export const extractErrorCode = (data: any): ErrorCode | null => {
  if (data && typeof data === 'object' && 'code' in data) {
    return data.code as ErrorCode;
  }
  return null;
};

/**
 * Check if response data indicates an error
 * @param data - Response data from API
 * @returns true if response indicates error
 */
export const isErrorResponse = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;

  // Check for error indicators
  if ('success' in data && data.success === false) return true;
  if ('code' in data && !isSuccess(data.code)) return true;

  return false;
};
