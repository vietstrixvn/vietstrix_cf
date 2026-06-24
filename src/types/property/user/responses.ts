/**
 * Property User Module Type Definitions
 *
 * Domain models and interfaces for property users
 */

// ============================================================================
// PROPERTY USER
// ============================================================================

/**
 * PropertyUser - User associated with a property
 */
export interface PropertyUser {
  id: string;
  email: string;
  username?: string;
  first_name: string;
  last_name: string;
  phone_number: string | number;
  role: string;
  account_type: string;
  is_active: boolean;
  actived_at: Date | string;
  is_blocked: boolean;
  blocked_at: Date | string;
  verified: boolean;
  verified_at: Date | string;
  created_by: string;
  property_id: string;
  last_login: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * @deprecated Use PropertyUser instead
 */
export type UserListData = PropertyUser;

// ============================================================================
// CREATE USER RESPONSE
// ============================================================================

/**
 * Response when creating a property user
 */
export interface CreateUserPropertyResponse {
  admin: PropertyUser;
  activation_link?: string;
  expires_at?: string;
}
