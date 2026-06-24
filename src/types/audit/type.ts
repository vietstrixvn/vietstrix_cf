/**
 * Audit Component Props
 *
 * Props interfaces for audit-related components
 */

import type { AuditLog } from './responses';

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * Props for AuditLogTable component
 */
export interface AuditLogTableProps {
  audit_logs: AuditLog[];
  isLoading: boolean;
  isError: boolean;
}
