/**
 * Portfolio Post Type Utilities
 *
 * Response wrappers and type aliases
 */

import type { PaginatedResponse } from '@/types/base/base.type';
import type { Post } from './responses';

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Paginated posts response
 */
export type FetchPostsResponse = PaginatedResponse<Post>;
