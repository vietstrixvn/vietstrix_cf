# Billing Types Migration Notes

## Overview

Updated billing types to match the new API documentation structure from `docs/BILLING_ACCOUNTING_API_DOCUMENTATION.md`.

## Key Changes

### 1. **Property ID Type Change**

- Changed from `string` to `number` across all interfaces
- Affects: `BillingRecord`, `Subscription`, `SubscriptionLog`, `Invoice`, `PropertyRef`, etc.

### 2. **Billing Cycle Simplification**

- **Old**: `'monthly' | 'quarterly' | 'semi_annually' | 'yearly'`
- **New**: `'monthly' | 'yearly'`

### 3. **Plan Structure Changes**

- Removed pricing fields from Plan interface:
  - `price_monthly`, `price_quarterly`, `price_semi_annually`, `price_yearly`
  - `currency`, `is_managed_domain`, `domain_price`, `duration_days`
- Plans now only contain metadata (name, code, description, sort_order, is_active)
- Pricing moved to separate `ItemPrice` system

### 4. **Service Item Changes**

- Removed: `default_price`, `currency`, `pricing_type`, `unit_label`, `sort_order`
- Added: `unit`, `is_metered`
- Simplified to focus on item definition rather than pricing

### 5. **Plan Included Items**

- Removed: `sort_order`
- Added: `quantity`, `is_unlimited`, `notes`
- Changed from simple junction table to quantity-based allocation

### 6. **Billing Record Changes**

- Type enum changed:
  - **Old**: `'invoice' | 'credit' | 'adjustment'`
  - **New**: `'invoice' | 'payment' | 'refund' | 'credit_note'`
- Status enum changed:
  - **Old**: `'pending' | 'paid' | 'cancelled' | 'refunded'`
  - **New**: `'pending' | 'paid' | 'failed' | 'cancelled'`
- Removed: `adjusted_by`, `adjusted_by_admin`
- Added: `payment_rate` (exchange rate at payment time)
- `subscription_id` is now optional

### 7. **Subscription Changes**

- Removed: `override_by`, `notes`, `cancelled_at`, `days_until_expiry`
- Status enum added: `'suspended'`
- `plan_code` used instead of just `plan_id` for quick queries

### 8. **Invoice Changes**

- `id` changed from `string` to `number`
- Removed: `file_url`
- Added nested relationships: `property_name`, `property_email`, `billing_record`, `items`
- Tax rate now in basis points (1000 = 10%)

### 9. **Invoice Item Changes**

- `invoice_id` changed from `string` to `number`
- Removed: `category_id`, `plan_id`, `service_item_id`, nested relationships
- Simplified to snapshot-based structure (category_name, service_name)
- Discount percent in basis points (1000 = 10%)

### 10. **Service Category Changes**

- Added: `description` field

### 11. **New Request Interfaces**

- `UpdateBillingInfoRequest` - for updating subscription billing info
- `CancelSubscriptionRequest` - for canceling subscriptions
- `UpdateSubscriptionStatusRequest` - for updating subscription status
- `ExtendSubscriptionRequest` - for extending subscriptions

### 12. **New Statistics Types**

All analytics types reorganized in `analytics.ts`:

- `BillingOverviewStats`
- `RevenueStats`
- `SubscriptionStats`
- `PaymentStats`
- `ExpiringSubscriptionsStats`
- `PlanPerformance`
- `BillingAlerts`
- `InvoiceStats`
- `TopCustomer`
- `PropertyBillingHistory`

### 13. **Item Prices System**

New pricing system added:

- `ItemPrice` - price definitions for service items
- `PriceTier` - tiered pricing support
- `CreateItemPriceRequest` - for creating prices

## Breaking Changes

### API Request Changes

1. **Create Subscription**: Now uses `plan_code` instead of `plan_id`, requires `property_id` as number
2. **Create Billing Record**: `property_id` is now number, removed `status` and `payment_method` from creation
3. **Create Invoice**: Requires `sub_total`, `tax_amount`, `invoice_amount` upfront
4. **Update Invoice**: Removed `invoice_amount`, `currency`, `file_url` fields
5. **Create Plan**: Removed all pricing fields
6. **Create Service Item**: Removed pricing fields, added `unit` and `is_metered`

### Response Changes

1. All `property_id` fields are now `number` instead of `string`
2. Invoice `id` is now `number` instead of `string`
3. Tax rates and discount percentages now in basis points (multiply by 100)
4. Billing cycle options reduced to monthly/yearly only

## Migration Guide

### For API Calls

```typescript
// OLD
const subscription = await createSubscription({
  property_id: '123',
  plan_id: 'plan_abc',
  billing_cycle: 'quarterly',
});

// NEW
const subscription = await createSubscription({
  property_id: 123,
  plan_code: 'basic',
  billing_cycle: 'monthly',
});
```

### For Tax Calculations

```typescript
// OLD - percentage
const taxRate = 10; // 10%
const taxAmount = subTotal * (taxRate / 100);

// NEW - basis points
const taxRate = 1000; // 10% = 1000 basis points
const taxAmount = subTotal * (taxRate / 10000);
```

### For Property IDs

```typescript
// OLD
const propertyId: string = '123';

// NEW
const propertyId: number = 123;
```

## Validation Schema Updates

All Zod schemas updated to match new structure:

- `BillingCycleEnum` - reduced to monthly/yearly
- `CreateSubscriptionSchema` - uses plan_code and number property_id
- `CreatePlanSchema` - removed pricing fields
- `CreateServiceItemSchema` - removed pricing, added unit/is_metered
- `UpdateBillingRecordStatusSchema` - added payment_rate
- Tax rate validation changed to 0-10000 (basis points)

## Notes

1. **Basis Points**: Tax rates and discount percentages now use basis points (1 basis point = 0.01%)
   - 10% = 1000 basis points
   - 8.5% = 850 basis points

2. **Property IDs**: Changed to number for consistency with database schema

3. **Pricing Separation**: Pricing logic moved from Plans/ServiceItems to separate ItemPrice system

4. **Snapshot Pattern**: Invoice items now store snapshots of names rather than references

5. **Simplified Billing Cycles**: Reduced from 4 options to 2 (monthly/yearly) for simplicity

## Testing Recommendations

1. Update all API integration tests with new property_id types
2. Test tax calculation with basis points
3. Verify subscription creation with plan_code
4. Test invoice creation with new required fields
5. Validate billing cycle restrictions (monthly/yearly only)

---

**Last Updated**: 2026-05-13
**API Version**: 1.0.0
