/**
 * Portfolio Contact Type Utilities
 *
 * Response wrappers and type aliases
 */

import type { PaginatedResponse } from '@/types/base/base.type';
import type { Contact } from './responses';

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Paginated contacts response
 */
export type FetchContactsResponse = PaginatedResponse<Contact>;
