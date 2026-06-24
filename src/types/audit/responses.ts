/**
 * Audit Module Type Definitions
 *
 * Domain models and interfaces for audit logging and system logs
 */

// ============================================================================
// AUDIT HEADERS & INFO
// ============================================================================

/**
 * Audit headers for tracking requests
 */
export interface AuditHeaders {
  'x-user-id': string;
  'x-user-role': string;
  'x-ip-address': string;
  'x-user-agent': string;
}

/**
 * Audit information extracted from headers
 */
export interface AuditInfo {
  userId: string;
  ipAddress: string;
  userAgent: string;
}

// ============================================================================
// AUDIT LOG
// ============================================================================

/**
 * HTTP methods for audit logging
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * AuditLog - Audit trail for user actions
 */
export interface AuditLog {
  id: string | number;
  actor_id: string | number;
  actor_username: string;
  actor_role: string;
  action: string;
  entity_type: string;
  entity_id: string | number | null;
  ip_address: string;
  user_agent: string;
  http_method: HttpMethod;
  request_path: string;
  status_code: number;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  metadata: Record<string, unknown> | null;
  property_id: string | number | null;
  created_at: string;
}

/**
 * @deprecated Use AuditLog instead
 */
export type AuditLogResponse = AuditLog;

// ============================================================================
// SYSTEM LOG
// ============================================================================

/**
 * SystemLog - Application system logs
 */
export interface SystemLog {
  '@timestamp': string;
  level: string;
  message: string;
  service: string;
  traceId: string;
  type: string;
  method: string;
  url: string;
  statusCode: number;
  duration: string;
  timestamp: string;
}

/**
 * @deprecated Use SystemLog instead
 */
export type LogResponse = SystemLog;
