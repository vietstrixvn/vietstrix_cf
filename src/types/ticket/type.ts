/**
 * Ticket Type Utilities
 *
 * Response wrappers and type aliases for ticket module
 */

import type { PaginatedResponse } from '../base/base.type';
import type { Ticket } from './responses';

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Paginated tickets response
 */
export type FetchTicketsResponse = PaginatedResponse<Ticket>;
