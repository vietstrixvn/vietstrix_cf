/**
 * Billing Type Utilities
 *
 * This file provides type aliases and utilities to combine base types
 * with billing-specific responses, avoiding code duplication.
 */

import type {
  ApiResponse,
  PaginatedData,
  PaginatedResponse,
} from '../base/base.type';
import type {
  Addon,
  AddonPrice,
  BillingRecord,
  Coupon,
  CouponCode,
  CouponValidationResponse,
  Invoice,
  BillingLineItem,
  InvoicePeriod,
  Plan,
  PlanIncludedItem,
  Quote,
  Refund,
  ServiceCategory,
  ServiceItem,
  Subscription,
  SubscriptionAddon,
  SubscriptionLog,
  ProvisionResult,
} from './responses';
import type { ExpiringSubscription, TopCustomer } from './analytics';

// ============================================================================
// GENERIC RESPONSE WRAPPERS
// ============================================================================

/**
 * Generic single item response wrapper
 * Usage: SingleResponse<Invoice>
 */
export type SingleResponse<T> = ApiResponse<T>;

// ============================================================================
// SPECIFIC PAGINATED RESPONSES
// ============================================================================

/**
 * Paginated service categories response
 */
export type FetchServiceCategoriesResponse = PaginatedResponse<ServiceCategory>;

/**
 * Paginated service items response
 */
export type FetchServiceItemsResponse = PaginatedResponse<ServiceItem>;

/**
 * Paginated billing records response
 */
export type FetchBillingRecordsResponse = PaginatedResponse<BillingRecord>;

/**
 * Paginated invoices response
 */
export type FetchInvoiceResponse = PaginatedResponse<Invoice>;

/**
 * Invoice period response (array)
 */
export type FetchInvoicePeriodResponse = ApiResponse<InvoicePeriod[]>;

/**
 * Paginated plans response
 */
export type FetchPlanResponse = PaginatedResponse<Plan>;

/**
 * Paginated subscriptions response
 */
export type FetchSubscriptionsResponse = PaginatedResponse<Subscription>;

/**
 * Subscription logs response (array, no pagination)
 */
export type FetchSubscriptionLogResponse = ApiResponse<SubscriptionLog[]>;

/**
 * Paginated addons response
 */
export type FetchAddonsResponse = PaginatedResponse<Addon>;

/**
 * Paginated coupons response
 */
export type FetchCouponsResponse = PaginatedResponse<Coupon>;

/**
 * Paginated quotes response
 */
export type FetchQuotesResponse = PaginatedResponse<Quote>;

/**
 * Paginated refunds response
 */
export type FetchRefundsResponse = PaginatedResponse<Refund>;

/**
 * Paginated top customers statistics response
 */
export type FetchTopCusStatResponse = PaginatedResponse<TopCustomer>;

// ============================================================================
// SINGLE ITEM RESPONSES
// ============================================================================

/**
 * Single service category response
 */
export type ServiceCategoryResponse = ApiResponse<ServiceCategory>;

/**
 * Single service item response
 */
export type ServiceItemResponse = ApiResponse<ServiceItem>;

/**
 * Single billing record response
 */
export type BilldingRecordResponse = ApiResponse<BillingRecord>;

/**
 * Single invoice response
 */
export type InvoiceResponse = ApiResponse<Invoice>;

/**
 * Single plan response
 */
export type PlanResponse = ApiResponse<Plan>;

/**
 * Single subscription response
 */
export type SubscriptionResponse = ApiResponse<Subscription>;

/**
 * Plan included items response (array)
 */
export type PlanIncludedItemsResponse = ApiResponse<PlanIncludedItem[]>;

/**
 * Single plan included item response
 */
export type PlanIncludedItemResponse = ApiResponse<PlanIncludedItem>;

/**
 * Invoice items response (array)
 */
export type InvoiceItemsResponse = ApiResponse<BillingLineItem[]>;

/**
 * Single invoice item response
 */
export type InvoiceItemResponse = ApiResponse<BillingLineItem>;

/**
 * Invoice item type alias (for backward compatibility)
 */
export type InvoiceItem = BillingLineItem;

/**
 * Single addon response
 */
export type AddonResponse = ApiResponse<Addon>;

/**
 * Addon prices response (array)
 */
export type AddonPricesResponse = ApiResponse<AddonPrice[]>;

/**
 * Single addon price response
 */
export type AddonPriceResponse = ApiResponse<AddonPrice>;

/**
 * Subscription addons response (array)
 */
export type SubscriptionAddonsResponse = ApiResponse<SubscriptionAddon[]>;

/**
 * Single subscription addon response
 */
export type SubscriptionAddonResponse = ApiResponse<SubscriptionAddon>;

/**
 * Provision subscription response (subscription + billing record + invoice)
 */
export type ProvisionResponse = ApiResponse<ProvisionResult>;

/**
 * Addon cost calculation response
 */
export type AddonCostResponse = ApiResponse<{
  cost: number;
  currency?: string;
  breakdown?: Record<string, unknown>;
}>;

/**
 * Single coupon response
 */
export type CouponResponse = ApiResponse<Coupon>;

/**
 * Coupon codes response (array)
 */
export type CouponCodesResponse = ApiResponse<CouponCode[]>;

/**
 * Single coupon code response
 */
export type CouponCodeResponse = ApiResponse<CouponCode>;

/**
 * Coupon validation response
 */
export type CouponValidationApiResponse = ApiResponse<CouponValidationResponse>;

/**
 * Single quote response
 */
export type QuoteResponse = ApiResponse<Quote>;

/**
 * Quote line items response (array)
 */
export type QuoteLineItemsResponse = ApiResponse<BillingLineItem[]>;

/**
 * Single refund response
 */
export type RefundResponse = ApiResponse<Refund>;

// ============================================================================
// CUSTOM RESPONSES (with additional fields)
// ============================================================================

/**
 * Billing expiring response with revenue at risk
 */
export interface FetchBillingExpiringResponse {
  pagination: PaginatedData<ExpiringSubscription>['pagination'];
  subscriptions: ExpiringSubscription[];
  total_revenue_at_risk: number;
}

// ============================================================================
// LEGACY TYPE ALIASES (for backward compatibility)
// ============================================================================

/**
 * @deprecated Use FetchSubscriptionLogResponse instead
 */
export type FetchSubLogResponse = PaginatedResponse<SubscriptionLog>;
