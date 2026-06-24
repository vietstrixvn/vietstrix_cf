/**
 * TypeScript Interfaces for Billing System API
 *
 * Generated from Go domain models
 * All IDs are strings (Snowflake IDs) to prevent JavaScript precision loss
 *
 * @see docs/API_RESPONSE_FORMAT.md
 * @see docs/SNOWFLAKE_ID_STRING_MIGRATION.md
 */

import type { ApiResponse, PaginatedData } from '../base/base.type';

// ============================================================================
// BASE TYPES
// ============================================================================

// Re-export ApiResponse for convenience
export type { ApiResponse, PaginatedData };

// ============================================================================
// SERVICE CATEGORY
// ============================================================================

/**
 * Service Category - Top-level billing categories
 * Examples: "Storage", "Bandwidth", "Support Features"
 * Supports hierarchical structure with parent-child relationships
 */
export interface ServiceCategory {
  id: string;
  parent_id: string | null;
  name: string;
  code: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  sub_categories?: ServiceCategory[]; // Child categories
}

/**
 * Request to create a service category
 */
export interface CreateServiceCategoryRequest {
  parent_id?: string | null;
  name: string;
  code: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
}

/**
 * Request to update a service category
 */
export interface UpdateServiceCategoryRequest {
  parent_id?: string | null;
  name?: string;
  code?: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
}

// ============================================================================
// SERVICE ITEM
// ============================================================================

/** Tiered / volume price rows (item price APIs) */
export interface PriceTier {
  min_quantity: number;
  max_quantity: number | null;
  unit_price: number;
}

/**
 * Item Price - Pricing for service items (standalone + embedded in service item list)
 */
export interface ItemPrice {
  id: string;
  item_id?: string;
  service_item_id?: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
  billing_cycle: string;
  pricing_model?: string;
  unit_amount?: number;
  flat_amount?: number;
  currency: string;
  trial_period_days?: number | null;
  is_active?: boolean;
  valid_from?: string | null;
  valid_until?: string | null;
  price_tiers?: PriceTier[];
  /** Legacy API fields */
  price?: number;
  effective_from?: string;
  effective_to?: string | null;
}

/**
 * Service Item - Individual billable services
 */
export interface ServiceItem {
  id: string;
  category_id: string;
  name: string;
  code: string;
  description?: string;
  /** Display unit (legacy or alias for API `unit_label`) */
  unit?: string;
  unit_label?: string;
  item_type?: string;
  billing_type?: string;
  is_metered?: boolean;
  is_taxable?: boolean;
  tax_code?: string | null;
  sort_order?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: ServiceCategory; // Preloaded relationship
  item_prices?: ItemPrice[]; // Preloaded when include_prices=true on list/detail
}

/**
 * Request to create a service item
 */
export interface CreateServiceItemRequest {
  category_id: string; // Snowflake ID as string
  name: string;
  code: string;
  description?: string;
  unit?: string;
  is_metered?: boolean;
  is_active?: boolean;
}

/**
 * Request to update a service item
 */
export interface UpdateServiceItemRequest {
  category_id?: string;
  name?: string;
  code?: string;
  description?: string;
  unit?: string;
  is_metered?: boolean;
  is_active?: boolean;
}

// ============================================================================
// PLAN
// ============================================================================

/**
 * Billing cycle types
 */
export type BillingCycle =
  | 'monthly'
  | 'quarterly'
  | 'semi-annually'
  | 'annual'
  | 'biennial'
  | 'triennial'
  | 'quinquennial'
  | 'one_time';

/**
 * Plan - Subscription plans
 */
export interface Plan {
  id: string;
  name: string;
  code: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  included_items?: PlanIncludedItem[]; // Preloaded relationship
}

/**
 * Request to create a plan
 */
export interface CreatePlanRequest {
  name: string;
  code: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
}

/**
 * Request to update a plan
 */
export interface UpdatePlanRequest {
  name?: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
}

// ============================================================================
// PLAN INCLUDED ITEM
// ============================================================================

/**
 * Plan Included Item - Junction table (Plans ←→ Service Items)
 */
export interface PlanIncludedItem {
  id: string;
  plan_id: string;
  service_item_id: string;
  quantity: number;
  is_unlimited: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
  service_item?: ServiceItem; // Preloaded relationship
}

/**
 * Request to add an item to a plan
 */
export interface AddItemToPlanRequest {
  service_item_id: string; // Snowflake ID as string
  quantity: number;
  is_unlimited?: boolean;
  notes?: string;
}

/**
 * Request to update a plan included item
 */
export interface UpdatePlanIncludedItemRequest {
  quantity?: number;
  is_unlimited?: boolean;
  notes?: string;
}

/**
 * Plan included item input for bulk operations
 */
export interface PlanIncludedItemInput {
  service_item_id: string;
  quantity: number;
  is_unlimited?: boolean;
}

/**
 * Request to bulk replace plan included items
 */
export interface SetPlanIncludedItemsRequest {
  items: PlanIncludedItemInput[];
}

// ============================================================================
// SUBSCRIPTION
// ============================================================================

/**
 * Subscription status types
 */
export type SubscriptionStatus =
  | 'trial'
  | 'active'
  | 'expired'
  | 'suspended'
  | 'cancelled';

export interface CreateAddonProvision {
  addon_id: number;
  price_id: number; // ← type string
  quantity: number;
}
export interface CreateProvisionSubscription {
  property_id: string;
  plan_id: string;
  billing_cycle: BillingCycle;
  auto_renew: boolean;
  currency: string;
  tax_rate_bps: number;
  discount_code?: string;
  notes?: string | null;
  addons: CreateAddonProvision[];
}

/**
 * Subscription - Customer subscriptions
 */
export interface Subscription {
  id: string;
  property_id: number;
  plan_id: string;
  plan_code: string; // Denormalized for quick queries
  status: SubscriptionStatus;
  started_at: string;
  expires_at: string;
  trial_ends_at?: string;
  billing_cycle: BillingCycle;
  billing_amount: number;
  original_price: number;
  discount_amount: number;
  discount_code?: string;
  currency: string;
  auto_renew: boolean;
  next_billing_at?: string;
  created_at: string;
  updated_at: string;

  /** Present when API computes time until expires_at */
  days_until_expiry?: number;
  cancelled_at?: string | null;
  override_by?: string | null;
  notes?: string | null;

  // Nested relationships (optional)
  plan?: PlanRef;
  property?: PropertyRef;
}

/**
 * Request to create a subscription (NEW - with billing cycle)
 */
export interface CreateSubscriptionRequest {
  property_id: number;
  plan_code: string;
  billing_cycle: BillingCycle;
  auto_renew?: boolean;
  discount_code?: string;
  notes?: string;
}

/**
 * Request to create a subscription (OLD - legacy support)
 */
export interface CreateSubscriptionLegacyRequest {
  property_id: string;
  plan_id: string;
  status?: SubscriptionStatus;
  started_at: string;
  expires_at: string;
  trial_ends_at?: string;
  notes?: string;
}

/**
 * Request to update subscription status
 */
export interface UpdateSubscriptionStatusRequest {
  status: SubscriptionStatus;
  reason?: string;
}

/**
 * Request to extend subscription
 */
export interface ExtendSubscriptionRequest {
  days: number;
  reason?: string;
}

/**
 * Request to change subscription plan
 */
export interface ChangeSubscriptionPlanRequest {
  plan_id: string;
  reason?: string;
}

/**
 * Request to update billing info
 */
export interface UpdateBillingInfoRequest {
  billing_cycle?: BillingCycle;
  billing_amount?: number;
  discount_code?: string;
  discount_amount?: number;
  original_price?: number;
  reason?: string;
}

/**
 * Request to toggle auto-renewal
 */
export interface ToggleAutoRenewRequest {
  auto_renew: boolean;
  reason?: string;
}

/**
 * Request to cancel subscription
 */
export interface CancelSubscriptionRequest {
  reason?: string;
}

// ============================================================================
// SUBSCRIPTION LOG
// ============================================================================

/**
 * Subscription Log - Audit trail for subscription changes
 */
export interface SubscriptionLog {
  id: string;
  subscription_id: string;
  property_id: number;
  old_status: SubscriptionStatus;
  new_status: SubscriptionStatus;
  changed_by?: number; // User ID, null = system job
  changed_by_type: 'system' | 'admin' | 'user';
  reason?: string;
  changed_at: string;
  old_expires_at?: string;
  new_expires_at?: string;
  plan_code: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// BILLING RECORD
// ============================================================================

/**
 * Billing record types
 */
export type BillingRecordType =
  | 'invoice'
  | 'payment'
  | 'refund'
  | 'credit_note';

/**
 * Billing record status types
 */
export type BillingRecordStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

/**
 * Billing Record - Billing transactions
 */
export interface BillingRecord {
  id: string;
  property_id: number;
  subscription_id?: string;
  type: BillingRecordType;
  status: BillingRecordStatus;
  amount: number;
  currency: string;
  payment_method?: string; // e.g., "bank_transfer", "cash", "credit_card"
  reference_code?: string; // Bank transaction code
  billing_date: string;
  paid_at?: string;
  payment_rate?: number; // Exchange rate at payment time
  notes?: string;
  created_at: string;
  updated_at: string;
  // Nested relationships (optional, loaded by backend)
  property?: PropertyRef;
  subscription?: SubscriptionRef;
}

/**
 * Request to create a billing record
 */
export interface CreateBillingRecordRequest {
  property_id: number;
  subscription_id?: string;
  type: BillingRecordType;
  amount: number;
  currency?: string;
  billing_date: string;
  notes?: string;
}

/**
 * Request to update billing record status
 */
export interface UpdateBillingRecordStatusRequest {
  status: BillingRecordStatus;
  payment_method?: string;
  reference_code?: string;
  payment_rate?: number;
  notes?: string;
}

// ============================================================================
// INVOICE
// ============================================================================

/**
 * Invoice - Invoice headers
 */
export interface Invoice {
  id: string;
  property_id: number;
  billing_record_id: string;
  invoice_number: string; // e.g., "INV-2026-001"
  sub_total: number; // SUM(invoice_items.total_price)
  tax_rate_bps: number; // Basis points (1000 = 10%)
  tax_amount: number; // Calculated tax
  invoice_amount: number; // sub_total + tax_amount
  currency: string;
  issued_at: string;
  due_at?: string;
  paid_at?: string;
  notes?: string;
  /** Stored PDF URL when uploaded via invoice file flow */
  file_url?: string | null;
  created_at: string;
  updated_at: string;
  billing_cycle: string;
  property?: PropertyRef;
  property_name?: string;
  property_email?: string;
  billing_record?: BillingRecord;
  billing_record_type?: BillingRecordType;
  billing_record_status?: BillingRecordStatus;
  items?: BillingLineItem[];
}

/**
 * Request to create an invoice
 */
export interface CreateInvoiceRequest {
  property_id: number;
  billing_record_id: string;
  invoice_number: string;
  sub_total: number;
  tax_rate_bps?: number;
  tax_amount: number;
  invoice_amount: number;
  currency?: string;
  issued_at: string;
  due_at: string;
  paid_at?: string;
  notes?: string;
}

/**
 * Invoice Period - Summary of invoices within a time period
 */
export interface InvoicePeriod {
  id: number;
  created_at: string;
  updated_at: string;
  invoice_number: string; // e.g., "INV-2026-001"
  property_id: number;
  billing_record_id: string;
  sub_total: number;
  tax_rate_bps: number;
  tax_amount: number;
  invoice_amount: number;
  currency: string;
  issued_at: string;
  due_at: string | null;
  paid_at: string | null;
  notes: string | null;
  billing_record?: BillingRecord;
}

/**
 * Request to update an invoice
 */
export interface UpdateInvoiceRequest {
  tax_rate_bps?: number;
  due_at?: string;
  paid_at?: string;
  notes?: string;
}

// ============================================================================
// INVOICE ITEM
// ============================================================================

/**
 * Invoice item source types
 */
export type InvoiceItemSource = 'plan' | 'custom';

/**
 * Request to add an item to an invoice
 */
export interface AddItemToInvoiceRequest {
  source: InvoiceItemSource;
  plan_id?: string; // Required if source=plan
  service_item_id?: string; // Required if source=custom
  quantity: number;
  unit_price?: number; // Optional - BE will auto-fetch from item_prices if not provided
  discount_percent?: number;
  notes?: string;
}

/**
 * Request to update an invoice item
 */
export interface UpdateInvoiceItemRequest {
  quantity?: number;
  unit_price?: number;
  discount_percent?: number;
  notes?: string;
}

/**
 * Invoice item input for bulk operations
 */
export interface InvoiceItemInput {
  source: InvoiceItemSource;
  plan_id?: string;
  service_item_id?: string;
  quantity: number;
  unit_price?: number;
  discount_percent?: number;
  notes?: string | null;
}

/**
 * Request to bulk replace invoice items
 */
export interface SetInvoiceItemsRequest {
  items: InvoiceItemInput[];
}

// ============================================================================
// HELPER TYPES
// ============================================================================

/**
 * Minimal service category info (for nested objects)
 */
export interface ServiceCategoryRef {
  id: string;
  name: string;
  code?: string;
}

/**
 * Minimal service item info (for nested objects)
 */
export interface ServiceItemRef {
  id: string;
  name: string;
  code: string;
  unit?: string;
}

/**
 * Minimal plan info (for nested objects)
 */
export interface PlanRef {
  id: string;
  name: string;
  code: string;
  description?: string;
}

/**
 * Minimal property info (for nested objects)
 */
export interface PropertyRef {
  id: number;
  name: string;
  slug?: string;
  domain?: string;
}

/**
 * Minimal subscription info (for nested objects)
 */
export interface SubscriptionRef {
  id: string;
  plan_code: string;
  status: SubscriptionStatus;
  billing_cycle?: BillingCycle;
  billing_amount?: number;
  expires_at: string;
}

export interface BillingLineItem {
  id: string;
  ref_type: 'invoice' | 'quote';
  ref_id: string;
  source: 'plan' | 'custom';
  plan_id?: string | null;
  service_item_id?: string | null;
  item_name: string;
  quantity: number;
  unit_price: number;
  discount_percent: number; // 0-100, derived từ discount_bps
  discount_amount: number;
  total_price: number;
  currency: string;
  sort_order: number;
  notes?: string;
}

/**
 * Minimal admin user info (for nested objects)
 */
export interface AdminUserRef {
  id: string;
  username: string;
  email: string;
}

// ============================================================================
// ADDON
// ============================================================================

/**
 * Addon types
 */
export type AddonType =
  | 'fixed'
  | 'quantity'
  | 'included'
  | 'metered'
  | 'tiered_quantity';

/**
 * Addon - Additional services for subscriptions
 */
export interface Addon {
  id: string;
  name: string;
  slug: string;
  description?: string;
  addon_type: AddonType;
  is_active: boolean;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * Request to create an addon
 */
export interface CreateAddonRequest {
  name: string;
  slug: string;
  description?: string;
  addon_type: AddonType;
  is_active?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Request to update an addon
 */
export interface UpdateAddonRequest {
  name?: string;
  slug?: string;
  description?: string;
  addon_type?: AddonType;
  is_active?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Addon pricing model types
 */
export type PricingModel = 'per_unit' | 'flat' | 'tiered';

/**
 * Addon Price - Pricing for addons
 */
export interface AddonPrice {
  id: string;
  created_at: string | Date;
  updated_at: string | Date;
  addon_id: string;
  currency: string;
  billing_cycle: BillingCycle;
  pricing_model: PricingModel;
  unit_amount: number;
  min_quantity?: number;
  max_quantity?: number;
  default_quantity?: number;
  is_active: boolean;
  valid_from: string;
  valid_until?: string;
}

/**
 * Request to create an addon price
 */
export interface CreateAddonPriceRequest {
  currency: string;
  billing_cycle: BillingCycle;
  pricing_model: PricingModel;
  unit_amount: number;
  min_quantity?: number;
  max_quantity?: number;
  default_quantity?: number;
  is_active?: boolean;
  valid_from: string;
  valid_until?: string;
}

/**
 * Subscription Addon - Addons attached to subscriptions
 */
export interface SubscriptionAddon {
  id: string;
  created_at: string | Date;
  updated_at: string | Date;
  subscription_id: string;
  addon_id: string;
  price_id: string;
  quantity: number;
  currency_snapshot: string;
  billing_cycle_snapshot: BillingCycle;
  pricing_model_snapshot: PricingModel;
  unit_price_snapshot: number;
  is_active?: boolean;
  tier_snapshot?: string;
  started_at: string | Date;
  ended_at?: string | Date | null;
  addon?: Pick<Addon, 'id' | 'name' | 'slug' | 'addon_type'>;
}

export interface ProvisionResult {
  subscription: Subscription;
  billing_record: BillingRecord;
  invoice: Invoice;
  line_items: BillingLineItem[];
}

/**
 * Request to add addon to subscription
 */
export interface AddAddonToSubscriptionRequest {
  addon_id: string;
  price_id: string;
  quantity: number;
}

/**
 * Request to update subscription addon
 */
export interface UpdateSubscriptionAddonRequest {
  quantity?: number;
  is_active?: boolean;
}

// ============================================================================
// COUPON
// ============================================================================

/**
 * Discount types
 */
export type DiscountType = 'percentage' | 'fixed_amount' | 'free_trial';

/**
 * Coupon duration types
 */
export type CouponDuration = 'once' | 'repeating' | 'forever';

/**
 * Coupon applies to types
 */
export type CouponAppliesTo = 'all' | 'specific_categories';

/**
 * Coupon - Discount coupons
 */
export interface Coupon {
  id: string;
  name: string;
  discount_type: DiscountType;
  discount_value: number;
  currency?: string;
  duration: CouponDuration;
  duration_months?: number;
  max_redemptions?: number;
  redemption_count: number;
  applies_to: CouponAppliesTo;
  min_amount?: number;
  is_active: boolean;
  valid_from: string;
  valid_until?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Request to create a coupon
 */
export interface CreateCouponRequest {
  name: string;
  discount_type: DiscountType;
  discount_value: number;
  currency?: string;
  duration: CouponDuration;
  duration_months?: number;
  max_redemptions?: number;
  applies_to: CouponAppliesTo;
  min_amount?: number;
  is_active?: boolean;
  valid_from: string;
  valid_until?: string;
}

/**
 * Request to update a coupon
 */
export interface UpdateCouponRequest {
  name?: string;
  discount_type?: DiscountType;
  discount_value?: number;
  currency?: string;
  duration?: CouponDuration;
  duration_months?: number;
  max_redemptions?: number;
  applies_to?: CouponAppliesTo;
  min_amount?: number;
  is_active?: boolean;
  valid_from?: string;
  valid_until?: string;
}

/**
 * Coupon Code - Redeemable codes for coupons
 */
export interface CouponCode {
  id: string;
  coupon_id: string;
  code: string;
  max_redemptions?: number;
  redemption_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Request to create a coupon code
 */
export interface CreateCouponCodeRequest {
  code: string;
  max_redemptions?: number;
  is_active?: boolean;
}

/**
 * Request to update a coupon code
 */
export interface UpdateCouponCodeRequest {
  max_redemptions?: number;
  is_active?: boolean;
}

/**
 * Request to validate a coupon code
 */
export interface ValidateCouponCodeRequest {
  code: string;
  subscription_amount: number;
  currency: string;
}

/**
 * Coupon validation response
 */
export interface CouponValidationResponse {
  is_valid: boolean;
  coupon?: Coupon;
  discount_amount?: number;
  final_amount?: number;
}

// ============================================================================
// QUOTE
// ============================================================================

/**
 * Quote status types
 */
export type QuoteStatus =
  | 'draft'
  | 'sent'
  | 'approved'
  | 'rejected'
  | 'expired';

/**
 * Quote - Price proposals
 */
export interface Quote {
  id: string;
  property_id: number;
  quote_number: string;
  status: QuoteStatus;
  sub_total: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  billing_cycle: BillingCycle;
  valid_until: string;
  subscription_id?: string | null;
  notes?: string;
  created_by: number;
  approved_at?: string | null;
  created_at: string;
  updated_at: string;
  // Relations
  property?: any; // Property type
  subscription?: any; // Subscription type
  line_items?: BillingLineItem[];
}

/**
 * Quote line item input for creation
 */
export interface QuoteLineItemInput {
  source: BillingLineItem;
  plan_id?: string;
  service_item_id?: string;
  item_name: string;
  quantity: number;
  unit_price: number;
  discount_bps?: number;
  discount_amount?: number;
  currency: string;
  notes?: string;
  sort_order?: number;
}

/**
 * Request to create a quote
 */
export interface CreateQuoteRequest {
  property_id: number;
  quote_number?: string; // Optional, auto-generated if not provided
  status?: QuoteStatus; // Optional, defaults to 'draft'
  sub_total: number;
  discount_amount?: number;
  tax_amount?: number;
  total_amount: number;
  currency?: string; // Optional, defaults to 'VND'
  billing_cycle?: BillingCycle; // Optional, defaults to 'monthly'
  valid_until: string;
  notes?: string;
  created_by: number;
}

/**
 * Request to update a quote
 */
export interface UpdateQuoteRequest {
  status?: QuoteStatus;
  discount_amount?: number;
  tax_amount?: number;
  total_amount?: number;
  valid_until?: string;
  notes?: string;
}

/**
 * Request to reject a quote
 */
export interface RejectQuoteRequest {
  reason?: string;
}

/**
 * Request to create line items in batch
 */
export interface BatchCreateQuoteLineItemsRequest {
  items: QuoteLineItemInput[];
}

/**
 * Request to update a quote line item
 */
export interface UpdateQuoteLineItemRequest {
  item_name?: string;
  quantity?: number;
  unit_price?: number;
  discount_bps?: number;
  notes?: string;
  sort_order?: number;
}

// ============================================================================
// REFUND
// ============================================================================

/**
 * Refund status types
 */
export type RefundStatus = 'pending' | 'approved' | 'rejected' | 'completed';

/**
 * Refund - Payment refunds
 */
export interface Refund {
  id: string;
  billing_record_id: string;
  invoice_id?: number;
  amount: number;
  currency: string;
  status: RefundStatus;
  reason?: string;
  refund_method?: string;
  refunded_by?: number;
  refunded_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Request to create a refund
 */
export interface CreateRefundRequest {
  billing_record_id: string;
  invoice_id?: number;
  amount: number;
  currency: string;
  reason?: string;
  refund_method?: string;
  notes?: string;
}

/**
 * Request to update refund status
 */
export interface UpdateRefundStatusRequest {
  status: RefundStatus;
  refund_method?: string;
  reason?: string;
  notes?: string;
}

// ============================================================================
// PROPERTY
// ============================================================================

/**
 * Property - Customer properties with subscription info
 */
export interface Property {
  id: string;
  name: string;
  subdomain: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  current_subscription?: {
    id: string;
    plan_code: string;
    status: SubscriptionStatus;
    billing_cycle: BillingCycle;
    billing_amount: number;
    expires_at: string;
    next_billing_at?: string;
    auto_renew: boolean;
    days_until_expiry: number;
  };
}

/**
 * Request to toggle property active status
 */
export interface TogglePropertyActiveRequest {
  is_active: boolean;
}

/**
 * Property access check response (for Traefik ForwardAuth)
 */
export interface PropertyAccessCheckResponse {
  allowed: boolean;
  reason?: string;
  property_id?: string;
  subscription_status?: SubscriptionStatus;
}
