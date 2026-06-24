/**
 * TypeScript Interfaces for Accounting System API
 *
 * All IDs are strings (Snowflake IDs)
 * All amount fields are number (float)
 * Date params use YYYY-MM-DD format
 *
 * @see docs/ACCOUNT_RES.md
 */

import type { ApiResponse } from '../base/base.type';

// ============================================================================
// ENUMS / UNION TYPES
// ============================================================================

export type JournalEntryType =
  | 'invoice_issued'
  | 'payment_received'
  | 'refund'
  | 'credit_note'
  | 'discount_applied'
  | 'deferred_revenue'
  | 'revenue_recognize'
  | 'reversal';

export type JournalEntryStatus = 'draft' | 'posted' | 'reversed' | 'voided';

export type JournalSourceType = 'invoice' | 'billing_record' | 'subscription';

export type AccountType =
  | 'asset'
  | 'liability'
  | 'equity'
  | 'revenue'
  | 'expense';

export type NormalBalance = 'debit' | 'credit';

// ============================================================================
// JOURNAL ENTRIES
// ============================================================================

export interface JournalEntryLine {
  id: string;
  journal_entry_id: string;
  account_code: string;
  account_name: string;
  debit_amount: number;
  credit_amount: number;
  currency: string;
  description: string;
  sort_order: number;
}

export interface JournalEntry {
  id: string;
  entry_number: string;
  type: JournalEntryType;
  status: JournalEntryStatus;
  entry_date: string;
  posted_at: string | null;
  source_type: JournalSourceType;
  source_id: string;
  total_debit: number;
  total_credit: number;
  currency: string;
  original_currency: string | null;
  original_amount: number | null;
  exchange_rate: number | null;
  reverses_entry_id: string | null;
  created_by: string | null;
  notes: string | null;
  lines: JournalEntryLine[];
}

/** GET /admin/accounting/journal-entries/:id */
export type JournalEntryResponse = ApiResponse<JournalEntry>;

/** GET /admin/accounting/journal-entries?source_type=...&source_id=... */
export type JournalEntriesBySourceResponse = ApiResponse<JournalEntry[]>;

/** GET /admin/accounting/journal-entries/period?from=...&to=... */
export type JournalEntriesByPeriodResponse = ApiResponse<JournalEntry[]>;

/** POST /admin/accounting/journal-entries/:id/reverse */
export interface ReverseJournalEntryDTO {
  reason: string;
}

export interface ReverseJournalEntryResponse {
  success: boolean;
  message: string;
  data: JournalEntry;
}

// DTO cho nhập bút toán thủ công
export interface CreateJournalEntryLineDTO {
  account_code: string;
  debit_amount: number;
  credit_amount: number;
  description?: string;
}

/**
 * POST /admin/accounting/journal-entries
 * Kế toán nhập bút toán thủ công — BE chỉ validate tổng Nợ = tổng Có
 */
export interface CreateJournalEntryDTO {
  entry_date: string; // YYYY-MM-DD
  notes?: string; // Diễn giải chung
  source_ref?: string; // Số chứng từ, e.g. "PC-2026-001"
  lines: CreateJournalEntryLineDTO[];
}

export interface CreateJournalEntryResponse {
  success: boolean;
  message: string;
  data: JournalEntry;
}

// ============================================================================
// EXCHANGE RATES
// ============================================================================

export interface ExchangeRate {
  id: string;
  date: string;
  from_currency: string;
  to_currency: string;
  rate: number;
  source: string;
  entered_by?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

/** POST /admin/accounting/exchange-rates */
export interface CreateExchangeRateDTO {
  from_currency: string;
  /** String để tránh mất precision với số thập phân lớn (e.g. "25350.75") */
  rate: string;
  date?: string;
  source?: string;
  notes?: string;
}

export interface CreateExchangeRateResponse {
  success: boolean;
  message: string;
  data: ExchangeRate;
}

/** GET /admin/accounting/exchange-rates/current?currency=...&date=... */
export type CurrentExchangeRateResponse = ApiResponse<ExchangeRate>;

/** GET /admin/accounting/exchange-rates?currency=...&year=...&month=... */
export interface ExchangeRateSummary {
  date: string;
  rate: number;
  source: string;
}

export type ExchangeRateListResponse = ApiResponse<ExchangeRateSummary[]>;

// ============================================================================
// CHART OF ACCOUNTS
// ============================================================================

export interface ChartOfAccount {
  code: string;
  name: string;
  name_en?: string;
  type: AccountType;
  normal_balance: NormalBalance;
  parent_code: string | null;
}

/** GET /admin/accounting/chart-of-accounts */
export type ChartOfAccountsResponse = ApiResponse<ChartOfAccount[]>;

// ============================================================================
// REPORTS
// ============================================================================

/** General Ledger */
export interface GeneralLedgerLine {
  date: string;
  entry_number: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface GeneralLedgerSummary {
  total_debit: number;
  total_credit: number;
  net_change: number;
}

export interface GeneralLedgerData {
  account_code: string;
  account_name: string;
  from_date: string;
  to_date: string;
  lines: GeneralLedgerLine[];
  summary: GeneralLedgerSummary;
}

/** GET /admin/accounting/reports/general-ledger */
export type GeneralLedgerResponse = ApiResponse<GeneralLedgerData>;

/** Trial Balance */
export interface TrialBalanceAccount {
  code: string;
  name: string;
  total_debit: number;
  total_credit: number;
  balance: number;
}

export interface TrialBalanceData {
  from_date: string;
  to_date: string;
  accounts: TrialBalanceAccount[];
  summary: {
    total_debit: number;
    total_credit: number;
  };
}

/** GET /admin/accounting/reports/trial-balance */
export type TrialBalanceResponse = ApiResponse<TrialBalanceData>;

/** Revenue Report */
export interface RevenueByType {
  type: JournalEntryType;
  count: number;
  amount: number;
}

export interface RevenueReportData {
  from_date: string;
  to_date: string;
  gross_revenue: number;
  deductions: number;
  net_revenue: number;
  vat_collected: number;
  by_type: RevenueByType[];
}

/** GET /admin/accounting/reports/revenue */
export type RevenueReportResponse = ApiResponse<RevenueReportData>;

/** Receivable Aging */
export interface ReceivableAgingData {
  as_of_date: string;
  total_due: number;
  by_property: ReceivableAgingProperty[];
}

export interface ReceivableAgingProperty {
  property_id: string;
  property_name: string;
  current: number;
  overdue_30: number;
  overdue_60: number;
  overdue_90: number;
  overdue_90_plus: number;
  amount: number;
}

/** GET /admin/accounting/reports/receivable-aging */
export type ReceivableAgingResponse = ApiResponse<ReceivableAgingData>;

/** Journal Stats */
export interface JournalStatByType {
  type: JournalEntryType;
  count: number;
}

export interface JournalStatByStatus {
  status: JournalEntryStatus;
  count: number;
}

export interface JournalStatsData {
  from_date: string;
  to_date: string;
  by_type: JournalStatByType[];
  by_status: JournalStatByStatus[];
}

/** GET /admin/accounting/reports/journal-stats */
export type JournalStatsResponse = ApiResponse<JournalStatsData>;
