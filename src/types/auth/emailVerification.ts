/**
 * Email Verification Type Definitions
 */

/**
 * Send OTP response
 */
export interface SendOtpResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    expires_at: string;
  };
}

/**
 * Verify OTP request
 */
export interface VerifyOtpRequest {
  otp_code: string;
}

/**
 * Verify OTP response
 */
export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data?: {
    verified: boolean;
    verified_at: string;
  };
}
