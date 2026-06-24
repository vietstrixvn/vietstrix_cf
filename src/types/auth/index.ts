/**
 * Auth Module Exports
 *
 * ⚠️ SECURITY WARNING
 * This module contains sensitive authentication types.
 *
 * CRITICAL RULES:
 * 1. NEVER log tokens, secrets, or credentials
 * 2. Handle PII according to privacy laws (GDPR, etc.)
 * 3. Use sanitized types for logging
 * 4. Keep sensitive types internal when possible
 *
 * See SECURITY_GUIDE.md for detailed guidelines
 */

// ============================================================================
// DOMAIN MODELS
// ============================================================================

// Types & Enums
export type { Resource, Action, Permissions } from './responses';

// Login (🔴 SENSITIVE)
export type {
  LoginDetail, // 🔴 Contains tokens
  LoginResponse,
  // Deprecated
  LogInResponse,
  LogInOutput,
} from './responses';

// User (⚠️ PII)
export type {
  UserDetail, // ⚠️ Contains PII
  UserDetailData,
  UserProb, // ✅ Safe for public use
  UserAction,
} from './responses';

// Auth State (🔴 SENSITIVE - Internal use only)
export type {
  AuthState, // 🔴 Contains tokens
  AuthActions,
  AuthStore, // 🔴 Contains sensitive state
  CookieOptions,
  AuthResponse,
} from './responses';

// Login History (⚠️ PII)
export type {
  LoginHistory, // ⚠️ Contains IP, device info
  // Deprecated
  LoginHistoryResponse,
} from './responses';

// Session
export type {
  SessionUserInfo,
  Session,
  // Deprecated
  SessionResponse,
} from './responses';

// User Creation
export type { CreateUserResponse } from './responses';

// ============================================================================
// TWO-FACTOR AUTHENTICATION (🔴 HIGHLY SENSITIVE)
// ============================================================================

export type {
  TwoFactorSetupData, // 🔴 Contains TOTP secret
  TwoFactorSetupResponse,
  TwoFactorStatusData,
  TwoFactorStatusResponse,
  TwoFactorLoginData, // 🔴 Contains tokens
  TwoFactorLoginResponse,
  TwoFactorVerifyRequest,
  TwoFactorDisableRequest, // 🔴 Contains password
  TwoFactorLoginRequest, // 🔴 Contains temp token
  TwoFactorState, // 🔴 Contains sensitive data
  TwoFactorActions,
} from './twoFactor';

// ============================================================================
// PASSKEY AUTHENTICATION (🔴 SENSITIVE)
// ============================================================================

export type {
  // Registration
  PasskeyRegistrationBeginRequest,
  PasskeyPublicKeyCredentialCreationOptions,
  PasskeyRegistrationBeginData,
  PasskeyRegistrationBeginResponse,
  PasskeyCredentialResponse, // 🔴 Contains credential data
  PasskeyRegistrationFinishRequest,
  PasskeyRegistrationFinishData,
  PasskeyRegistrationFinishResponse,

  // Login
  PasskeyLoginBeginRequest,
  PasskeyPublicKeyCredentialRequestOptions,
  PasskeyLoginBeginData,
  PasskeyLoginBeginResponse,
  PasskeyLoginCredentialResponse, // 🔴 Contains credential data
  PasskeyLoginFinishRequest,
  PasskeyLoginFinishData, // 🔴 Contains tokens
  PasskeyLoginFinishResponse,

  // Management
  PasskeyItem,
  PasskeyListResponse,
  PasskeyDetailResponse,

  // State
  PasskeyState,
  PasskeyActions,
  WebAuthnSupport,
} from './passkey';

// ============================================================================
// RBAC (Role-Based Access Control)
// ============================================================================

export type {
  RolesResponse,
  PermissionsResponse,
  ResourcesResponse,
  UserPermissionsResponse,
  RolePermissionsResponse,
  DirectPermissionsResponse,
  UserEffectivePermissionsResponse,
} from './rbac';

// ============================================================================
// DTOs & SCHEMAS
// ============================================================================

// Export DTOs if they exist
export type * from './dto';

// ============================================================================
// COMPONENT PROPS
// ============================================================================

// Export props if they exist
export type * from './prop';

// ============================================================================
// TABLE COLUMNS
// ============================================================================

// Export columns if they exist
export * from './colum';

// ============================================================================
// SECURITY UTILITIES (Optional - add if needed)
// ============================================================================

/**
 * Sanitize user detail for logging
 * Removes PII and sensitive fields
 */
export function sanitizeUserDetail(user: UserDetail): {
  id: string;
  username: string;
  account_type: string;
  is_active: boolean;
  roles: string[];
} {
  return {
    id: user.id,
    username: user.username || 'unknown',
    account_type: user.account_type,
    is_active: user.is_active,
    roles: user.roles,
  };
}

/**
 * Sanitize login history for logging
 * Removes IP and device details
 */
export function sanitizeLoginHistory(history: LoginHistory): {
  id: string;
  username: string;
  status: string;
  is_successful: boolean;
  attempted_at: Date | string;
} {
  return {
    id: history.id,
    username: history.username,
    status: history.status,
    is_successful: history.is_successful,
    attempted_at: history.attempted_at,
  };
}

// Re-export UserDetail type for sanitize function
import type { UserDetail, LoginHistory } from './responses';
