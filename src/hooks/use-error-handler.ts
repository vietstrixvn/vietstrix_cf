import { getErrorMessage, isSuccess, logWarn, type ErrorCode } from '@/utils';
import { useCallback } from 'react';
import { toast } from 'sonner';

interface ErrorResponse {
  code: ErrorCode;
  message?: string;
  success: boolean;
  data?: any;
}

interface ApiError {
  response?: {
    data?: ErrorResponse;
    status?: number;
  };
  message?: string;
}

/**
 * Custom hook to handle API error responses
 * Automatically shows error messages based on error codes from backend
 */
export const useErrorHandler = () => {
  /**
   * Handle error response from backend
   * @param error - Error response from API (can be ErrorResponse or wrapped in response.data)
   * @param customMessages - Optional custom messages for specific error codes
   */
  const handleError = useCallback(
    (
      error: ErrorResponse | ApiError | unknown,
      customMessages?: Partial<Record<ErrorCode, string>>
    ) => {
      // Case 1: Direct ErrorResponse structure
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        'success' in error
      ) {
        const errorResponse = error as ErrorResponse;
        const { code, message } = errorResponse;

        // Don't show toast for success codes
        if (isSuccess(code)) {
          return;
        }

        // Priority: custom message > API message > default message
        const displayMessage =
          customMessages?.[code] || message || getErrorMessage(code);

        toast.error(displayMessage);
        return;
      }

      // Case 2: Error wrapped in response.data (Axios error format)
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response
      ) {
        const apiError = error as ApiError;
        const errorData = apiError.response?.data;

        if (errorData && 'code' in errorData) {
          const { code, message } = errorData;

          if (!isSuccess(code)) {
            const displayMessage =
              customMessages?.[code] || message || getErrorMessage(code);
            toast.error(displayMessage);
            return;
          }
        }
      }

      // Case 3: Error with message property
      if (error && typeof error === 'object' && 'message' in error) {
        const errorWithMessage = error as { message: string };
        toast.error(errorWithMessage.message);
        return;
      }

      // Fallback for unknown error format
      toast.error('An unknown error occurred');
    },
    []
  );

  /**
   * Handle success response from backend
   * @param response - Success response from API
   * @param successMessage - Optional custom success message
   */
  const handleSuccess = useCallback(
    (response: ErrorResponse, successMessage?: string) => {
      // Check if response has code field
      if (!response || typeof response !== 'object' || !('code' in response)) {
        logWarn('[WARNING] Response missing code field in handleSuccess');
        toast.error('Invalid response format');
        return;
      }

      if (isSuccess(response.code)) {
        toast.success(successMessage || getErrorMessage(response.code));
      } else {
        // If code is not success, treat as error
        logWarn('[WARNING] Response code is not success:', response.code);
        toast.error(getErrorMessage(response.code));
      }
    },
    []
  );

  return {
    handleError,
    handleSuccess,
  };
};
