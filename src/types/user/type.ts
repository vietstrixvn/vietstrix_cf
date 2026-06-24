/**
 * User Type Utilities
 *
 * Response wrappers and type aliases for user module
 */

import type { PaginatedResponse } from '../base/base.type';
import type { User } from './responses';

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Paginated users response
 */
export type FetchUsersResponse = PaginatedResponse<User>;
