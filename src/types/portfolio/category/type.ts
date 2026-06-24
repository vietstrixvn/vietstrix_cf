/**
 * Portfolio Category Type Utilities
 *
 * Response wrappers and type aliases
 */

import type { PaginatedResponse } from '@/types/base/base.type';
import type { Category } from './responses';

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Paginated categories response
 */
export type FetchCategoriesResponse = PaginatedResponse<Category>;
