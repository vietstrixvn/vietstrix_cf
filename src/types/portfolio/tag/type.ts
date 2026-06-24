/**
 * Portfolio Tag Type Utilities
 *
 * Response wrappers and type aliases
 */

import type { PaginatedResponse } from '@/types/base/base.type';
import type { Tag } from './responses';

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Paginated tags response
 */
export type FetchTagsResponse = PaginatedResponse<Tag>;
