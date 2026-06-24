import type { ApiResponse, PaginatedResponse } from '../base/base.type';
import type { MailRecipient, MailTemplate, MailLog } from './responses';

// ============================================================================
// PAGINATED LIST RESPONSES
// ============================================================================

export type FetchRecipientsResponse = PaginatedResponse<MailRecipient>;
export type FetchTemplatesResponse = PaginatedResponse<MailTemplate>;
export type FetchMailLogsResponse = PaginatedResponse<MailLog>;

// ============================================================================
// SINGLE ITEM RESPONSES
// ============================================================================

export type RecipientResponse = ApiResponse<MailRecipient>;
export type TemplateResponse = ApiResponse<MailTemplate>;
export type MailLogResponse = ApiResponse<MailLog>;
export type SendMailResponse = ApiResponse<MailLog>;
