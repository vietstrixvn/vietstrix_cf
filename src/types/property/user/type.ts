/**
 * Property User Type Utilities
 *
 * Response wrappers and type aliases
 */

import type { PaginatedResponse } from '@/types/base/base.type';
import type { PropertyUser, CreateUserPropertyResponse } from './responses';

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Paginated property users response
 */
export type FetchUsersPropertyResponse = PaginatedResponse<PropertyUser>;

/**
 * Re-export create user response
 */
export type { CreateUserPropertyResponse };
