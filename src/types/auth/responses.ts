/**
 * Auth Module Type Definitions
 *
 * ⚠️ SECURITY WARNING: This module contains sensitive authentication types
 * See SECURITY_GUIDE.md for handling guidelines
 *
 * Domain models and interfaces for authentication
 */

import type { BaseResponse, UserListData } from '@/types';

// ============================================================================
// RESOURCES & PERMISSIONS
// ============================================================================

/**
 * System resources that can be accessed
 */
export type Resource =
  | 'property'
  | 'admin_user'
  | 'gallery'
  | 'portfolio'
  | 'ticket'
  | 'audit'
  | 'monitor'
  | 'rbac'
  | 'session'
  | 'type'
  | 'property_config'
  | 'property_user'
  | 'billing'
  | 'analytic';

/**
 * Actions that can be performed on resources
 */
export type Action = 'create' | 'read' | 'update' | 'delete' | 'suspend';

/**
 * User permissions mapping
 */
export type Permissions = Partial<Record<Resource, Action[]>>;

// ============================================================================
// LOGIN
// ============================================================================

/**
 * 🔴 SENSITIVE: Login response data
 * Contains access tokens - NEVER log this
 */
export interface LoginDetail {
  // Normal login response
  access_token?: string; // 🔴 SENSITIVE - Never log
  expires_in?: string | number;
  token_type?: string;
  user_id?: string | number;

  // 2FA response
  requires_2fa?: boolean;
  temp_token?: string; // 🔴 SENSITIVE - Never log
}

/**
 * Login response wrapper
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LoginResponse extends BaseResponse<LoginDetail> {}

/**
 * @deprecated Use LoginResponse instead
 */
export type LogInResponse = LoginResponse;

/**
 * @deprecated Legacy output format - use LoginResponse
 */
export interface LogInOutput {
  id: string;
  accessToken: string; // 🔴 SENSITIVE
  refreshToken?: string; // 🔴 SENSITIVE
}

// ============================================================================
// USER
// ============================================================================

/**
 * ⚠️ PII: Complete user information
 * Contains personal data - handle according to privacy laws
 */
export interface UserDetail {
  id: string;
  email: string; // ⚠️ PII
  username?: string;
  first_name: string; // ⚠️ PII
  last_name: string; // ⚠️ PII
  phone_number: string | number; // ⚠️ PII
  account_type: string;
  is_active: boolean;
  actived_at: Date | string;
  is_blocked: boolean;
  blocked_at: Date | string;
  verified: boolean;
  verified_at: Date | string;
  created_by: string;
  failed_login_attempts: string | number;
  locked_at: Date | string;
  lock_reason: string;
  two_factor_enabled: boolean;
  last_login: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
  roles: string[];
  permissions: Permissions;
}

/**
 * User detail response
 */
export type UserDetailData = BaseResponse<UserDetail>;

/**
 * Minimal user information (safe for public use)
 */
export interface UserProb {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
  role_title?: string;
  bio?: string;
  avatar_url?: string;
  social_links?: any[];
}

/**
 * User action tracking
 */
export interface UserAction {
  type: string;
  userId: string;
  actionAt: Date | string;
}

// ============================================================================
// AUTH STATE & STORE
// ============================================================================

/**
 * 🔴 SENSITIVE: Client-side auth state
 * Contains tokens - keep internal, never expose
 */
export interface AuthState {
  accessToken: string | null; // 🔴 SENSITIVE - Never log
  tokenExpiresAt: number | null;
}

/**
 * Cookie configuration options
 */
export interface CookieOptions {
  expires?: number;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

/**
 * Auth store actions interface
 */
export interface AuthActions {
  // Token management
  setAccessToken: (token: string | null) => void;
  setAccessTokenWithExpiry: (token: string | null, expiresIn?: number) => void;
  clearAccessToken: () => void;
  isTokenExpired: () => boolean;
  isTokenNearExpiry: () => boolean;

  // Auth flow methods
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;

  // Legacy methods (to be refactored)
  clearError: () => void;
  initializeAuth: () => Promise<void>;
  scheduleTokenRefresh: () => void;
  clearTokenRefresh: () => void;

  // Internal helper methods
  getTokenExpiryFromJWT: (token: string) => number | null;
  shouldRefreshToken: () => boolean;
  refreshTokenIfNeeded: (retryCount?: number) => Promise<boolean>;
  verifyAndRefreshAuth: (requiredRole?: string) => Promise<boolean>;
  handleAuthFailure: () => void;

  // Profile management methods (to be refactored)
  register: (userData: any) => Promise<boolean>;
  updateProfile: (profileData: any) => Promise<boolean>;
  changePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<boolean>;
}

/**
 * Complete auth store type
 * ⚠️ Contains sensitive state - use carefully
 */
export type AuthStore = AuthState &
  AuthActions & {
    // Derived properties
    isAuthenticated: boolean;

    // Legacy state properties (to be removed)
    loading: boolean;
    error: string | null;
    userInfo: UserDetail | null;
    isRefreshing: boolean;
    requiresTwoFactor: boolean;
    tempToken: string | null; // 🔴 SENSITIVE
    twoFactorSetupData: any | null; // 🔴 SENSITIVE

    // Passkey state
    passkeyRegistrationOptions: any | null;
    passkeyLoginOptions: any | null;
    registeredPasskeys: any[];

    // Internal state
    _hasHydrated: boolean;
    isInitializing: boolean;

    // 2FA Actions
    setupTwoFactor: () => Promise<any | null>;
    verifyAndEnableTwoFactor: (code: string) => Promise<boolean>;
    disableTwoFactor: (password: string, code: string) => Promise<boolean>;
    verifyTwoFactorLogin: (code: string) => Promise<boolean>;
    clearTwoFactorState: () => void;

    // Passkey Actions
    beginPasskeyRegistration: (name: string) => Promise<any | null>;
    finishPasskeyRegistration: (
      name: string,
      credential: any
    ) => Promise<boolean>;
    beginPasskeyLogin: (username?: string) => Promise<any | null>;
    finishPasskeyLogin: (credential: any) => Promise<boolean>;
    listPasskeys: () => Promise<any[]>;
    deletePasskey: (id: string) => Promise<boolean>;
    clearPasskeyState: () => void;

    // Email Verification Actions
    sendEmailOtp: () => Promise<boolean>;
    verifyEmailOtp: (otpCode: string) => Promise<boolean>;
  };

/**
 * Generic auth API response wrapper
 */
export interface AuthResponse<T = any> {
  response: Response;
  data: T;
}

// ============================================================================
// LOGIN HISTORY
// ============================================================================

/**
 * ⚠️ PII: Login history record
 * Contains IP addresses and device info
 */
export interface LoginHistory {
  id: string;
  admin_id: string;
  username: string;
  ip_address: string; // ⚠️ PII
  user_agent: string; // ⚠️ PII
  device_name: string;
  device_type: string;
  location: string; // ⚠️ PII
  session_id: string;
  status: string;
  reason: string;
  is_successful: boolean;
  admin: UserProb;
  attempted_at: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * @deprecated Use LoginHistory instead
 */
export type LoginHistoryResponse = LoginHistory;

// ============================================================================
// SESSION
// ============================================================================

/**
 * Session user information
 */
export interface SessionUserInfo {
  id: string;
  username: string;
  fullName?: string;
}

/**
 * Session information
 */
export interface Session {
  id: string;
  admin_id: string;
  is_revoked: string;
  expires_at: Date | string;
  ip_address?: string; // ⚠️ PII
  user_agent?: string; // ⚠️ PII
  admin: UserProb;
  revoked_at: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * @deprecated Use Session instead
 */
export type SessionResponse = Session;

// ============================================================================
// USER CREATION
// ============================================================================

/**
 * User creation response
 */
export interface CreateUserResponse {
  admin: UserListData;
  activation_link?: string;
  expires_at?: string;
}
