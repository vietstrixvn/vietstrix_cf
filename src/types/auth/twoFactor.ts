/**
 * ==========================
 * 🔐 Two-Factor Authentication Types
 * ==========================
 *
 * Types for 2FA setup, verification, and management
 */

import { BaseResponse } from '@/types';

/**
 * 2FA Setup Response Data
 */
export interface TwoFactorSetupData {
  secret: string;
  qr_code: string;
  issuer: string;
  account: string;
  algorithm: string;
  digits: number;
  period: number;
}

/**
 * 2FA Setup Response
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TwoFactorSetupResponse extends BaseResponse<TwoFactorSetupData> {}

/**
 * 2FA Enable/Disable Response Data
 */
export interface TwoFactorStatusData {
  enabled: boolean;
  message: string;
}

/**
 * 2FA Enable/Disable Response
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TwoFactorStatusResponse extends BaseResponse<TwoFactorStatusData> {}

/**
 * 2FA Login Verification Response Data
 */
export interface TwoFactorLoginData {
  access_token: string;
  token_type: string;
  expires_in: number;
  user_id: number;
}

/**
 * 2FA Login Verification Response
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TwoFactorLoginResponse extends BaseResponse<TwoFactorLoginData> {}

/**
 * 2FA Verification Request
 */
export interface TwoFactorVerifyRequest {
  code: string;
}

/**
 * 2FA Disable Request
 */
export interface TwoFactorDisableRequest {
  password: string;
  code: string;
}

/**
 * 2FA Login Verification Request
 */
export interface TwoFactorLoginRequest {
  temp_token: string;
  code: string;
}

/**
 * 2FA State in Auth Store
 */
export interface TwoFactorState {
  requiresTwoFactor: boolean;
  tempToken: string | null;
  twoFactorSetupData: TwoFactorSetupData | null;
}

/**
 * 2FA Actions in Auth Store
 */
export interface TwoFactorActions {
  // Setup 2FA
  setupTwoFactor: () => Promise<TwoFactorSetupData | null>;

  // Verify and enable 2FA
  verifyAndEnableTwoFactor: (code: string) => Promise<boolean>;

  // Disable 2FA
  disableTwoFactor: (password: string, code: string) => Promise<boolean>;

  // Verify 2FA during login
  verifyTwoFactorLogin: (code: string) => Promise<boolean>;

  // Clear 2FA state
  clearTwoFactorState: () => void;
}
