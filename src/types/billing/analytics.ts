/**
 * TypeScript Interfaces for Billing Analytics & Statistics
 *
 * All IDs are strings (Snowflake IDs) except property_id which is number
 * All amount fields are number (float)
 *
 * @see docs/BILLING_ACCOUNTING_API_DOCUMENTATION.md
 */

import type {
  BillingCycle,
  SubscriptionStatus,
  BillingRecord,
  Invoice,
  Subscription,
} from './responses';

// ============================================================================
// 1. BILLING OVERVIEW
// ============================================================================

export interface BillingOverviewResponse {
  current_month_revenue: number;
  last_month_revenue: number;
  growth_percentage: number;
  active_subscriptions_by_plan: Record<string, number>;
  pending_payments: number;
  trial_subscriptions: number;
}

// ============================================================================
// 2. REVENUE STATISTICS
// ============================================================================

export interface RevenuePeriodData {
  period: string;
  revenue: number;
  invoice_count: number;
}

export interface BillingRevenueResponse {
  total_revenue: number;
  period_data: RevenuePeriodData[];
  paid_invoice_count: number;
  average_per_customer: number;
}

// ============================================================================
// 3. SUBSCRIPTION STATISTICS
// ============================================================================

export interface SubscriptionByPlan {
  plan_id: number;
  plan_name: string;
  plan_code: string;
  count: number;
  percentage: number;
}

export interface BillingSubscriptionsResponse {
  total_count: number;
  by_status: {
    active: number;
    trial: number;
    expired: number;
    cancelled: number;
  };
  by_plan: SubscriptionByPlan[];
  churn_rate: number;
  conversion_rate: number;
}

// ============================================================================
// 4. PAYMENT STATISTICS
// ============================================================================

export interface ActiveSubByPlanResponse {
  pending_count: number;
  overdue_count: number;
  by_method: Record<string, number>;
  average_payment_days: number;
}

// ============================================================================
// 5. EXPIRING SUBSCRIPTIONS
// ============================================================================

export interface ExpiringSubscription {
  subscription_id: number;
  property_id: number;
  property_name: string;
  plan_name: string;
  expires_at: string;
  days_until_expiry: number;
  revenue_at_risk: number;
}

export interface ExpiringSubscriptionsResponse {
  subscriptions: ExpiringSubscription[];
  total_revenue_at_risk: number;
  pagination: {
    current_page: number;
    page_size: number;
    total_pages: number;
    total_records: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// ============================================================================
// 6. PLAN PERFORMANCE
// ============================================================================

export interface PlatStatResponse {
  plan_id: number;
  plan_name: string;
  plan_code: string;
  active_count: number;
  total_revenue: number;
  average_lifetime_days: number;
  upgrade_rate: number;
  downgrade_rate: number;
}

// ============================================================================
// 7. ALERTS
// ============================================================================

export interface BillingAlert {
  severity: 'low' | 'medium' | 'high';
  message: string;
  count: number;
  recommended_action: string;
  created_at: string;
}

export interface AlertStatResponse {
  expiring_subscriptions: BillingAlert[];
  overdue_payments: BillingAlert[];
  failed_payments: BillingAlert[];
  churn_spikes: BillingAlert[];
  revenue_drops: BillingAlert[];
}

// ============================================================================
// 8. INVOICE STATISTICS
// ============================================================================

export interface InvoiceAgingReport {
  period: string;
  count: number;
  total_amount: number;
}

export interface InvoicesStatResponse {
  by_status: {
    paid: number;
    pending: number;
    overdue: number;
    cancelled: number;
  };
  average_amount: number;
  payment_rate: number;
  aging_report: InvoiceAgingReport[];
}

// ============================================================================
// 9. TOP CUSTOMERS
// ============================================================================

export interface TopCusStatResponse {
  property_id: number;
  property_name: string;
  lifetime_value: number;
  health_score: number;
  subscription_status: string;
  current_plan: string;
  total_invoices: number;
  last_payment_date: string;
}

// ============================================================================
// LEGACY TYPES (for backward compatibility)
// ============================================================================

export interface BillingOverviewStats {
  total_revenue: number;
  total_subscriptions: number;
  active_subscriptions: number;
  trial_subscriptions: number;
  expired_subscriptions: number;
  total_invoices: number;
  paid_invoices: number;
  pending_invoices: number;
  overdue_invoices: number;
  average_revenue_per_user: number;
  churn_rate: number;
  growth_rate: number;
}

export interface RevenueByPeriod {
  period: string;
  revenue: number;
  subscriptions: number;
  invoices: number;
}

export interface RevenueByPlan {
  plan_code: string;
  plan_name: string;
  revenue: number;
  subscriptions: number;
}

export interface RevenueStats {
  total_revenue: number;
  recurring_revenue: number;
  one_time_revenue: number;
  revenue_by_period: RevenueByPeriod[];
  revenue_by_plan: RevenueByPlan[];
}

export interface SubscriptionByCycle {
  cycle: BillingCycle;
  count: number;
  percentage: number;
}

export interface SubscriptionStats {
  total: number;
  active: number;
  trial: number;
  expired: number;
  suspended: number;
  cancelled: number;
  by_plan: SubscriptionByPlan[];
  by_billing_cycle: SubscriptionByCycle[];
}

export interface PaymentByMethod {
  method: string;
  count: number;
  amount: number;
}

export interface PaymentStats {
  total_payments: number;
  successful_payments: number;
  failed_payments: number;
  success_rate: number;
  by_method: PaymentByMethod[];
  average_payment_time: number;
}

export interface ExpiringSubscriptionsStats {
  total: number;
  expiring_in_7_days: number;
  expiring_in_14_days: number;
  expiring_in_30_days: number;
  subscriptions: ExpiringSubscription[];
}

export interface PlanPerformance {
  plan_code: string;
  plan_name: string;
  total_subscriptions: number;
  active_subscriptions: number;
  trial_subscriptions: number;
  total_revenue: number;
  average_revenue_per_subscription: number;
  churn_rate: number;
  conversion_rate: number;
}

export interface BillingAlerts {
  overdue_invoices: number;
  failed_payments: number;
  expiring_soon: number;
  suspended_subscriptions: number;
  high_churn_plans: string[];
  alerts: BillingAlert[];
}

export interface InvoiceStats {
  total: number;
  paid: number;
  pending: number;
  overdue: number;
  average_amount: number;
  total_amount: number;
  paid_amount: number;
  pending_amount: number;
  overdue_amount: number;
}

export interface TopCustomer {
  property_id: number;
  property_name: string;
  total_revenue: number;
  total_subscriptions: number;
  total_invoices: number;
  average_invoice_amount: number;
  lifetime_value: number;
  current_plan: string;
}

// ============================================================================
// PROPERTY BILLING
// ============================================================================

export interface PropertyBillingHistory {
  property_id: number;
  property_name: string;
  current_subscription?: {
    id: string;
    plan_code: string;
    status: SubscriptionStatus;
    expires_at: string;
  };
  billing_records: BillingRecord[];
  invoices: Invoice[];
  subscriptions: Subscription[];
  total_paid: number;
  total_pending: number;
}

// ============================================================================
// ITEM PRICES
// ============================================================================

import type { ItemPrice, PriceTier } from './responses';

export type { ItemPrice, PriceTier };

export interface CreateItemPriceRequest {
  name?: string;
  billing_cycle: BillingCycle;
  pricing_model?: 'flat' | 'per_unit' | 'tiered' | 'volume' | 'stairstep';
  unit_amount: number;
  flat_amount?: number;
  currency?: string;
  trial_period_days?: number;
  is_active?: boolean;
  valid_from: string;
  valid_until?: string;
  price_tiers?: PriceTier[];
}
