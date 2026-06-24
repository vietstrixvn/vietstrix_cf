/**
 * Property Type Utilities
 *
 * Response wrappers and type aliases
 */

import type { PaginatedResponse } from '@/types/base/base.type';
import type { PropertyType } from './responses';

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Paginated property types response
 */
export type FetchTypesResponse = PaginatedResponse<PropertyType>;
