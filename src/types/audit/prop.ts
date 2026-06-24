/**
 * Audit Type Utilities
 *
 * Response wrappers and type aliases for audit module
 */

import type { PaginatedResponse } from '../base/base.type';
import type { AuditLog, SystemLog } from './responses';

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Paginated audit logs response
 */
export type FetchAuditLogsResponse = PaginatedResponse<AuditLog>;

/**
 * Paginated system logs response
 */
export type FetchSystemLogsResponse = PaginatedResponse<SystemLog>;

/**
 * @deprecated Use FetchAuditLogsResponse instead
 */
export type FetchAuditLogListResponse = FetchAuditLogsResponse;
