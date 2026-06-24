/**
 * User Module Type Definitions
 *
 * Domain models and interfaces for user management
 */

/**
 * User - Complete user information
 */
export interface User {
  id: string;
  email: string;
  username?: string;
  first_name: string;
  last_name: string;
  phone_number: string | number;
  role: string;
  roles: string[];
  role_ids: string[];
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
  last_login: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * @deprecated Use User instead
 */
export type UserListData = User;
