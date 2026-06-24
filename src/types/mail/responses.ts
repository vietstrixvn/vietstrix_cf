import type { ApiResponse, PaginatedData } from '../base/base.type';

// ============================================================================
// RECIPIENT
// ============================================================================

export interface MailRecipient {
  id: number;
  email: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// TEMPLATE
// ============================================================================

export interface MailTemplate {
  id: number;
  name: string;
  subject: string;
  content: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// MAIL LOG
// ============================================================================

export type MailStatus = 'sent' | 'failed';

export interface MailLog {
  id: number;
  to: string;
  subject: string;
  content?: string; // full rendered HTML — only in GET /logs/:id
  status: MailStatus;
  sent_at: string | null;
  error_msg: string | null;
  created_at: string;
}

// ============================================================================
// RE-EXPORTS
// ============================================================================

export type { ApiResponse, PaginatedData };
