import { z } from 'zod';

// ==================== SERVICE CATEGORIES ====================

export const CreateServiceCategorySchema = z.object({
  parent_id: z.string().nullable().optional(),
  name: z.string().min(1, 'Category name is required').max(100),
  code: z.string().min(1, 'Category code is required').max(50),
  description: z.string().max(500).optional(),
  sort_order: z.number().int().nonnegative().default(0),
  is_active: z.boolean().default(true),
});

export type CreateServiceCategoryDTO = z.infer<
  typeof CreateServiceCategorySchema
>;

// ---

export const UpdateServiceCategorySchema =
  CreateServiceCategorySchema.partial();

export type UpdateServiceCategoryDTO = z.infer<
  typeof UpdateServiceCategorySchema
>;

// ==================== SERVICE ITEMS ====================

export const CreateServiceItemSchema = z.object({
  category_id: z.string().min(1, 'Category ID is required'),
  name: z.string().min(1, 'Service name is required').max(100),
  code: z.string().min(1, 'Service code is required').max(50),
  description: z.string().max(500).optional(),
  unit: z.string().max(50).optional(),
  is_metered: z.boolean().default(false),
  is_active: z.boolean().default(true),
});

export type CreateServiceItemDTO = z.infer<typeof CreateServiceItemSchema>;

// ---

export const UpdateServiceItemSchema = CreateServiceItemSchema.partial();

export type UpdateServiceItemDTO = z.infer<typeof UpdateServiceItemSchema>;

// ==================== BILLING RECORDS ====================

export const CreateBillingRecordSchema = z.object({
  property_id: z.string().min(1, 'Property ID is required'),
  subscription_id: z.string().min(1).nullable().optional(),
  type: z.enum(['invoice', 'payment', 'refund', 'credit_note'], {
    error: 'Type must be invoice, payment, refund, or credit_note',
  }),
  status: z
    .enum(['pending', 'paid', 'failed', 'cancelled'], {
      error: 'Status must be pending, paid, failed, or cancelled',
    })
    .optional(),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().min(1).max(10).default('VND'),
  payment_method: z.string().max(50).optional(),
  reference_code: z.string().max(100).optional(),
  billing_date: z.string().datetime('Invalid billing date format'),
  notes: z.string().max(1000).optional(),
});

export type CreateBillingRecordDTO = z.infer<typeof CreateBillingRecordSchema>;

// ---

export const UpdateBillingRecordStatusSchema = z.object({
  status: z.enum(['pending', 'paid', 'failed', 'cancelled'], {
    error: 'Status must be pending, paid, failed, or cancelled',
  }),
  payment_method: z.string().max(50).optional(),
  reference_code: z.string().max(100).optional(),
  payment_rate: z.number().positive().optional(),
  notes: z.string().max(1000).optional(),
});

export type UpdateBillingRecordStatusDTO = z.infer<
  typeof UpdateBillingRecordStatusSchema
>;

// ==================== INVOICES ====================

export const CreateInvoiceSchema = z.object({
  property_id: z.string().min(1, 'Property ID is required'),
  billing_record_id: z.string().min(1, 'Billing record ID is required'),
  invoice_number: z.string().min(1, 'Invoice number is required').max(50),
  sub_total: z.number().nonnegative('Sub total must be non-negative'),
  tax_rate_bps: z.number().min(0).max(10000).default(0), // Basis points
  tax_amount: z.number().nonnegative('Tax amount must be non-negative'),
  invoice_amount: z.number().positive('Invoice amount must be positive'),
  currency: z.string().min(1).max(10).default('VND'),
  issued_at: z.string().datetime('Invalid issued_at format'),
  due_at: z.string().datetime('Invalid due_at format'),
  paid_at: z.string().datetime('Invalid paid_at format').nullable().optional(),
  notes: z.string().max(1000).optional(),
});

export type CreateInvoiceDTO = z.infer<typeof CreateInvoiceSchema>;

// ---

export const UpdateInvoiceSchema = z.object({
  tax_rate_bps: z.number().min(0).max(10000).optional(), // Basis points
  due_at: z.string().datetime('Invalid due_at format').optional(),
  paid_at: z.string().datetime('Invalid paid_at format').nullable().optional(),
  notes: z.string().max(1000).optional(),
});

export type UpdateInvoiceDTO = z.infer<typeof UpdateInvoiceSchema>;

// ==================== PLANS ====================

export const CreatePlanSchema = z.object({
  name: z.string().min(1, 'Plan name is required').max(100),
  code: z.string().min(1, 'Plan code is required').max(50),
  description: z.string().max(500).optional(),
  sort_order: z.number().int().nonnegative().default(0),
  is_active: z.boolean().default(true),
});

export type CreatePlanDTO = z.infer<typeof CreatePlanSchema>;

// ---

export const UpdatePlanSchema = CreatePlanSchema.partial();

export type UpdatePlanDTO = z.infer<typeof UpdatePlanSchema>;

// ==================== SUBSCRIPTIONS ====================

export const BillingCycleEnum = z.enum(
  [
    'monthly',
    'quarterly',
    'semi-annually',
    'annual',
    'biennial',
    'triennial',
    'quinquennial',
    'one_time',
  ],
  {
    error: 'Billing cycle must be monthly, quarterly, semi_annually, or annual',
  }
);

export const CreateSubscriptionSchema = z.object({
  property_id: z.string().min(1, 'Property ID is required'),
  plan_code: z.string().min(1, 'Plan code is required'),
  billing_cycle: BillingCycleEnum,
  auto_renew: z.boolean().default(true),
  discount_code: z.string().max(50).optional(),
  notes: z.string().max(1000).optional(),
});

export type CreateSubscriptionDTO = z.infer<typeof CreateSubscriptionSchema>;

// Legacy subscription creation (still supported)
export const CreateSubscriptionLegacySchema = z.object({
  property_id: z.number().int().positive('Property ID is required'),
  plan_id: z.string().min(1, 'Plan ID is required'),
  status: z
    .enum(['trial', 'active', 'expired', 'suspended', 'cancelled'], {
      error: 'Status must be trial, active, expired, suspended, or cancelled',
    })
    .optional(),
  started_at: z.string().datetime('Invalid started_at format'),
  expires_at: z.string().datetime('Invalid expires_at format'),
  trial_ends_at: z.string().datetime('Invalid trial_ends_at format').optional(),
  notes: z.string().max(1000).optional(),
});

export type CreateSubscriptionLegacyDTO = z.infer<
  typeof CreateSubscriptionLegacySchema
>;

// ---

export const ChangePlanSchema = z.object({
  plan_id: z.string().min(1, 'Plan ID is required'),
  reason: z.string().max(500).optional(),
});

export type ChangePlanDTO = z.infer<typeof ChangePlanSchema>;

// ---

export const UpdateSubscriptionStatusSchema = z.object({
  status: z.enum(['trial', 'active', 'expired', 'suspended', 'cancelled'], {
    error: 'Status must be trial, active, expired, suspended, or cancelled',
  }),
  reason: z.string().max(500).optional(),
});

export type UpdateSubscriptionStatusDTO = z.infer<
  typeof UpdateSubscriptionStatusSchema
>;

// ---

export const ExtendSubscriptionSchema = z.object({
  days: z.number().int().positive('Days must be positive'),
  reason: z.string().max(500).optional(),
});

export type ExtendSubscriptionDTO = z.infer<typeof ExtendSubscriptionSchema>;

// ---

export const ToggleAutoRenewSchema = z.object({
  auto_renew: z.boolean(),
  reason: z.string().max(500).optional(),
});

export type ToggleAutoRenewDTO = z.infer<typeof ToggleAutoRenewSchema>;

// ---

export const UpdateBillingSchema = z.object({
  billing_cycle: BillingCycleEnum.optional(),
  billing_amount: z
    .number()
    .nonnegative('Amount must be non-negative')
    .optional(),
  original_price: z
    .number()
    .nonnegative('Price must be non-negative')
    .optional(),
  discount_code: z.string().max(50).optional(),
  discount_amount: z
    .number()
    .nonnegative('Discount must be non-negative')
    .optional(),
  reason: z.string().max(500).optional(),
});

export type UpdateBillingDTO = z.infer<typeof UpdateBillingSchema>;

// ---

export const CancelSubscriptionSchema = z.object({
  reason: z.string().max(500).optional(),
});

export type CancelSubscriptionDTO = z.infer<typeof CancelSubscriptionSchema>;

// ---

export const CreateAddonProvisionSchema = z.object({
  addon_id: z.string().min(1, 'Addon ID is required'),
  price_id: z.string().min(1, 'Price ID is required'),
  quantity: z.number().int().positive('Quantity must be positive'),
});

export type CreateAddonProvisionDTO = z.infer<typeof CreateAddonProvisionSchema>;

export const CreateProvisionSubscriptionSchema = z.object({
  property_id: z.string().min(1, 'Property ID is required'),
  plan_id: z.string().min(1, 'Plan ID is required'),
  billing_cycle: BillingCycleEnum,
  auto_renew: z.boolean().default(true),
  currency: z.string().min(1).max(10).default('VND'),
  tax_rate_bps: z.number().int().min(0).max(10000).default(0),
  discount_code: z.string().max(50).nullable().optional(),
  notes: z.string().max(1000).nullable().optional(),
  addons: z.array(CreateAddonProvisionSchema).default([]),
});

export type CreateProvisionSubscriptionDTO = z.infer<
  typeof CreateProvisionSubscriptionSchema
>;

export const RenewSubscriptionSchema = z.object({
  notes: z.string().max(1000).optional(),
});

export type RenewSubscriptionDTO = z.infer<typeof RenewSubscriptionSchema>;

// ==================== PROPERTY ====================

export const TogglePropertyActiveSchema = z.object({
  is_active: z.boolean(),
});

export type TogglePropertyActiveDTO = z.infer<
  typeof TogglePropertyActiveSchema
>;

// POST /api/v1/admin/plans

// **Request Body:**
// ```json
// {
//   "name": "Premium Plan",
//   "code": "premium-plan",
//   "description": "For growing businesses",
//   "price_monthly": 5000000,
//   "currency": "VND",
//   "is_managed_domain": true,
//   "domain_price": 200000,
//   "duration_days": 30,
//   "sort_order": 2,
//   "is_active": true
// }
// ```

// ==================== ADDONS ====================

export const AddonTypeEnum = z.enum([
  'fixed',
  'quantity',
  'included',
  'metered',
  'tiered_quantity',
]);

export const CreateAddonSchema = z.object({
  name: z.string().min(1, 'Addon name is required').max(100),
  slug: z.string().min(1, 'Addon slug is required').max(100),
  description: z.string().max(500).optional(),
  addon_type: AddonTypeEnum,
  is_active: z.boolean().default(true),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type CreateAddonDTO = z.infer<typeof CreateAddonSchema>;

// ---

export const UpdateAddonSchema = CreateAddonSchema.partial();

export type UpdateAddonDTO = z.infer<typeof UpdateAddonSchema>;

// ---

export const PricingModelEnum = z.enum(['per_unit', 'flat', 'tiered']);

export const CreateAddonPriceSchema = z.object({
  currency: z.string().min(1).max(10).default('VND'),
  billing_cycle: BillingCycleEnum,
  pricing_model: PricingModelEnum,
  unit_amount: z.number().nonnegative('Unit amount must be non-negative'),
  min_quantity: z.number().int().positive().optional(),
  max_quantity: z.number().int().positive().optional(),
  default_quantity: z.number().int().positive().optional(),
  included_quantity: z.number().int().nonnegative().optional(),
  is_active: z.boolean().default(true),
  valid_from: z.string().datetime('Invalid valid_from format'),
  valid_until: z.string().datetime('Invalid valid_until format').optional(),
});

export type CreateAddonPriceDTO = z.infer<typeof CreateAddonPriceSchema>;

// ---

export const AddAddonToSubscriptionSchema = z.object({
  addon_id: z.string().min(1, 'Addon ID is required'),
  price_id: z.string().min(1, 'Price ID is required'),
  quantity: z.number().int().positive('Quantity must be positive'),
});

export type AddAddonToSubscriptionDTO = z.infer<
  typeof AddAddonToSubscriptionSchema
>;

// ---

export const UpdateSubscriptionAddonSchema = z.object({
  quantity: z.number().int().positive().optional(),
  is_active: z.boolean().optional(),
});

export type UpdateSubscriptionAddonDTO = z.infer<
  typeof UpdateSubscriptionAddonSchema
>;

export const UpdateSubscriptionAddonQuantitySchema = z.object({
  quantity: z.number().int().positive('Quantity must be positive'),
});

export type UpdateSubscriptionAddonQuantityDTO = z.infer<
  typeof UpdateSubscriptionAddonQuantitySchema
>;

export const UpdateSubscriptionItemQuantitySchema = z.object({
  quantity: z.number().int().positive('Quantity must be positive'),
});

export type UpdateSubscriptionItemQuantityDTO = z.infer<
  typeof UpdateSubscriptionItemQuantitySchema
>;

export const FinalizeSubscriptionSchema = z.object({
  notes: z.string().max(1000).optional(),
});

export type FinalizeSubscriptionDTO = z.infer<
  typeof FinalizeSubscriptionSchema
>;

// ==================== COUPONS ====================

export const DiscountTypeEnum = z.enum([
  'percentage',
  'fixed_amount',
  'free_trial',
]);

export const CouponDurationEnum = z.enum(['once', 'repeating', 'forever']);

export const CouponAppliesToEnum = z.enum(['all', 'specific_categories']);

export const CreateCouponSchema = z.object({
  name: z.string().min(1, 'Coupon name is required').max(100),
  discount_type: DiscountTypeEnum,
  currency: z.string().min(1).max(10).optional(),
  duration: CouponDurationEnum,
  duration_months: z.number().int().positive().optional(),
  max_redemptions: z.number().int().positive().optional(),
  applies_to: CouponAppliesToEnum,
  is_active: z.boolean().default(true),
  valid_from: z.string().min(1, 'Valid from date is required'),
  valid_until: z.string().optional(),
});

export type CreateCouponDTO = z.infer<typeof CreateCouponSchema>;

// ---

export const UpdateCouponSchema = CreateCouponSchema.partial();

export type UpdateCouponDTO = z.infer<typeof UpdateCouponSchema>;

// ---

export const CreateCouponCodeSchema = z.object({
  code: z.string().min(1, 'Coupon code is required').max(50),
  max_redemptions: z.number().int().positive().optional(),
  is_active: z.boolean().default(true),
});

export type CreateCouponCodeDTO = z.infer<typeof CreateCouponCodeSchema>;

// ---

export const UpdateCouponCodeSchema = z.object({
  max_redemptions: z.number().int().positive().optional(),
  is_active: z.boolean().optional(),
});

export type UpdateCouponCodeDTO = z.infer<typeof UpdateCouponCodeSchema>;

// ---

export const ValidateCouponCodeSchema = z.object({
  code: z.string().min(1, 'Coupon code is required'),
  subscription_amount: z
    .number()
    .positive('Subscription amount must be positive'),
  currency: z.string().min(1).max(10),
});

export type ValidateCouponCodeDTO = z.infer<typeof ValidateCouponCodeSchema>;

// ==================== QUOTES ====================

export const QuoteStatusEnum = z.enum([
  'draft',
  'sent',
  'approved',
  'rejected',
  'expired',
]);

export const QuoteLineItemSourceEnum = z.enum(['plan', 'custom']);

export const QuoteLineItemInputSchema = z.object({
  source: QuoteLineItemSourceEnum,
  plan_id: z.string().optional(),
  service_item_id: z.string().optional(),
  item_name: z.string().min(1, 'Item name is required').max(200),
  quantity: z.number().int().positive('Quantity must be positive'),
  unit_price: z.number().nonnegative('Unit price must be non-negative'),
  discount_bps: z.number().min(0).max(100).optional(),
  discount_amount: z.number().nonnegative().optional(),
  currency: z.string().min(1).max(10).default('VND'),
  notes: z.string().max(1000).optional(),
  sort_order: z.number().int().nonnegative().optional(),
});

export const CreateQuoteSchema = z.object({
  property_id: z.number().int().positive('Property ID is required'),
  quote_number: z.string().min(1).max(50).optional(),
  status: QuoteStatusEnum.optional(),
  billing_cycle: BillingCycleEnum,
  discount_bps: z.number().int().min(0).max(10000).optional(),
  tax_rate_bps: z.number().int().min(0).max(10000).optional(),
  currency: z.string().min(1).max(10).default('VND'),
  valid_until: z.string().datetime('Invalid valid_until format'),
  notes: z.string().max(1000).optional(),
});

export type CreateQuoteDTO = z.infer<typeof CreateQuoteSchema>;

// ---

export const UpdateQuoteSchema = z.object({
  status: QuoteStatusEnum.optional(),
  discount_amount: z.number().nonnegative().optional(),
  tax_amount: z.number().nonnegative().optional(),
  total_amount: z.number().nonnegative().optional(),
  valid_until: z.string().datetime('Invalid valid_until format').optional(),
  notes: z.string().max(1000).optional(),
});

export type UpdateQuoteDTO = z.infer<typeof UpdateQuoteSchema>;

// ---

export const UpdateQuoteStatusSchema = z.object({
  status: QuoteStatusEnum,
});

export type UpdateQuoteStatusDTO = z.infer<typeof UpdateQuoteStatusSchema>;

// ---

export const RejectQuoteSchema = z.object({
  reason: z.string().max(500).optional(),
});

export type RejectQuoteDTO = z.infer<typeof RejectQuoteSchema>;

// ---

export const BatchCreateQuoteLineItemsSchema = z.object({
  items: z
    .array(QuoteLineItemInputSchema)
    .min(1, 'At least one line item is required'),
});

export type BatchCreateQuoteLineItemsDTO = z.infer<
  typeof BatchCreateQuoteLineItemsSchema
>;

// ---

export const CreateQuoteLineItemSchema = QuoteLineItemInputSchema;

export type CreateQuoteLineItemDTO = z.infer<typeof CreateQuoteLineItemSchema>;

// ---

export const UpdateQuoteLineItemSchema = z.object({
  item_name: z.string().min(1).max(200).optional(),
  quantity: z.number().int().positive().optional(),
  unit_price: z.number().nonnegative().optional(),
  discount_bps: z.number().min(0).max(100).optional(),
  notes: z.string().max(1000).optional(),
  sort_order: z.number().int().nonnegative().optional(),
});

export type UpdateQuoteLineItemDTO = z.infer<typeof UpdateQuoteLineItemSchema>;

// ==================== REFUNDS ====================

export const RefundStatusEnum = z.enum([
  'pending',
  'approved',
  'rejected',
  'completed',
]);

export const CreateRefundSchema = z.object({
  billing_record_id: z.string().min(1, 'Billing record ID is required'),
  invoice_id: z.number().int().positive().optional(),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().min(1).max(10).default('VND'),
  reason: z.string().max(500).optional(),
  refund_method: z.string().max(50).optional(),
  notes: z.string().max(1000).optional(),
});

export type CreateRefundDTO = z.infer<typeof CreateRefundSchema>;

// ---

export const UpdateRefundStatusSchema = z.object({
  status: RefundStatusEnum,
  refund_method: z.string().max(50).optional(),
  reason: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
});

export type UpdateRefundStatusDTO = z.infer<typeof UpdateRefundStatusSchema>;
