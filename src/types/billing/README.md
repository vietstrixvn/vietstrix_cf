# Billing Types Usage Guide

## 📁 File Structure

```
src/types/billing/
├── responses.ts      # Core domain models (BillingRecord, Invoice, Plan, etc.)
├── type.ts          # Response wrappers and utilities
├── analytics.ts     # Analytics and statistics types
├── dto.ts           # Data Transfer Objects for API requests
├── colum.ts         # Table column definitions
└── index.ts         # Public exports
```

## 🆕 Recent Updates (May 2026)

### Billing Cycle Support

Subscriptions now support multiple billing cycles with automatic pricing:

- **Monthly** (30 days) - Base price
- **Quarterly** (90 days) - 10% discount
- **Semi-Annually** (180 days) - 15% discount
- **Yearly** (365 days) - 17% discount

### Property Activation Control

Properties can now be manually activated/deactivated:

- `is_active` flag for manual control
- Separate from subscription expiry
- Middleware validates both conditions

### Enhanced Subscription Model

New fields added to subscriptions:

- `billing_cycle` - Selected billing cycle
- `billing_amount` - Actual amount charged
- `original_price` - Price before discount
- `discount_amount` - Discount applied
- `discount_code` - Discount code used
- `next_billing_at` - Next billing date
- `auto_renew` - Auto-renewal flag
- `cancelled_at` - Cancellation timestamp
- `days_until_expiry` - Computed field

## 🎯 How to Use

### 1. Import từ index (Recommended)

```typescript
import type {
  // Domain models
  BillingRecord,
  Invoice,
  Plan,
  Subscription,
  Property,

  // Response wrappers
  FetchBillingRecordsResponse,
  FetchInvoiceResponse,

  // Generic utilities
  PaginatedResponse,
  SingleResponse,

  // DTOs
  CreateBillingRecordDTO,
  UpdateInvoiceDTO,
  CreateSubscriptionDTO,
  TogglePropertyActiveDTO,

  // Enums
  BillingCycle,
  SubscriptionStatus,
} from '@/types/billing';
```

### 2. Sử dụng Generic Types (Tránh trùng lặp)

#### ✅ Cách tốt - Sử dụng generic:

```typescript
import type { PaginatedResponse, BillingRecord } from '@/types/billing';

// Tự động có pagination + results
const response: PaginatedResponse<BillingRecord> = await fetchBillingRecords();
```

#### ❌ Cách cũ - Định nghĩa lại:

```typescript
// KHÔNG CẦN LÀM NHƯ VẦY NỮA!
interface FetchBillingRecordsResponse {
  pagination: PaginationData;
  results: BillingRecord[];
}
```

### 3. Các Pattern Thường Dùng

#### Pattern 1: Fetch danh sách có phân trang

```typescript
import type { PaginatedResponse, Invoice } from '@/types/billing';

async function getInvoices(): Promise<PaginatedResponse<Invoice>> {
  const response = await api.get('/invoices');
  return response.data;
}

// Sử dụng
const data = await getInvoices();
console.log(data.data.results); // Invoice[]
console.log(data.data.pagination); // PaginationData
```

#### Pattern 2: Fetch single item

```typescript
import type { SingleResponse, Plan } from '@/types/billing';

async function getPlan(id: string): Promise<SingleResponse<Plan>> {
  const response = await api.get(`/plans/${id}`);
  return response.data;
}

// Sử dụng
const data = await getPlan('123');
console.log(data.data); // Plan object
```

#### Pattern 3: Create/Update với DTO

```typescript
import type {
  CreateBillingRecordDTO,
  SingleResponse,
  BillingRecord,
} from '@/types/billing';

async function createBillingRecord(
  dto: CreateBillingRecordDTO
): Promise<SingleResponse<BillingRecord>> {
  const response = await api.post('/billing-records', dto);
  return response.data;
}
```

#### Pattern 4: Create Subscription with Billing Cycle (NEW)

```typescript
import type {
  CreateSubscriptionDTO,
  CreateSubscriptionSchema,
  SubscriptionResponse,
} from '@/types/billing';

const subscriptionData: CreateSubscriptionDTO = {
  property_id: '839351743073488896',
  plan_code: 'basic',
  billing_cycle: 'yearly',
  auto_renew: true,
  discount_code: 'NEWYEAR2026',
};

// Validate with Zod
const validated = CreateSubscriptionSchema.parse(subscriptionData);

// API call
const response: SubscriptionResponse = await api.post(
  '/subscriptions',
  validated
);

// Access new fields
console.log(response.data.billing_cycle); // 'yearly'
console.log(response.data.billing_amount); // 900000
console.log(response.data.discount_amount); // 100000
console.log(response.data.days_until_expiry); // 365
```

#### Pattern 5: Toggle Property Active (NEW)

```typescript
import type {
  TogglePropertyActiveDTO,
  TogglePropertyActiveSchema,
} from '@/types/billing';

const toggleData: TogglePropertyActiveDTO = {
  is_active: false,
};

const validated = TogglePropertyActiveSchema.parse(toggleData);

await api.put(`/properties/${propertyId}/toggle-active`, validated);
```

#### Pattern 6: Working with Property and Subscription (NEW)

```typescript
import type { Property } from '@/types/billing';

const property: Property = await api.get(`/properties/${id}`);

// Check if property is accessible
const isAccessible =
  property.is_active && property.current_subscription?.status === 'active';

// Display subscription info
if (property.current_subscription) {
  console.log(`Plan: ${property.current_subscription.plan_code}`);
  console.log(`Billing: ${property.current_subscription.billing_cycle}`);
  console.log(`Amount: ${property.current_subscription.billing_amount}`);
  console.log(
    `Expires in: ${property.current_subscription.days_until_expiry} days`
  );
  console.log(`Auto-renew: ${property.current_subscription.auto_renew}`);
}
```

#### Pattern 7: Custom response với extra fields

```typescript
import type { FetchBillingExpiringResponse } from '@/types/billing';

// Type này có thêm field total_revenue_at_risk
async function getExpiringSubscriptions(): Promise<FetchBillingExpiringResponse> {
  const response = await api.get('/subscriptions/expiring');
  return response.data;
}
```

## 🔄 Type Relationships

```
ApiResponse<T>                    (từ base.type.ts)
    ↓
PaginatedResponse<T>              (generic wrapper)
    ↓
FetchBillingRecordsResponse       (specific type alias)
    = PaginatedResponse<BillingRecord>
```

## 📊 Response Structure

### Standard Paginated Response

```typescript
{
  success: true,
  code: 200,
  message: "Success",
  data: {
    results: [...],           // Array of items
    pagination: {
      current_page: 1,
      page_size: 20,
      total_pages: 5,
      total_records: 100,
      has_next: true,
      has_prev: false
    }
  }
}
```

### Standard Single Response

```typescript
{
  success: true,
  code: 200,
  message: "Success",
  data: {
    id: "123",
    name: "...",
    // ... other fields
  }
}
```

### Subscription Response (NEW)

```typescript
{
  success: true,
  code: 200,
  message: "Subscription created successfully",
  data: {
    id: "123",
    property_id: "839351743073488896",
    plan_code: "basic",
    status: "active",

    // Billing cycle fields
    billing_cycle: "yearly",
    billing_amount: 900000,
    original_price: 1000000,
    discount_amount: 100000,
    discount_code: "NEWYEAR2026",
    currency: "VND",

    // Dates
    started_at: "2026-05-05T04:04:09Z",
    expires_at: "2027-05-05T04:04:09Z",
    next_billing_at: "2027-05-05T04:04:09Z",

    // Auto-renewal
    auto_renew: true,
    cancelled_at: null,

    // Computed
    days_until_expiry: 365
  }
}
```

## 🎨 Best Practices

### ✅ DO:

```typescript
// 1. Sử dụng type alias có sẵn
type InvoicesResponse = FetchInvoiceResponse;

// 2. Sử dụng generic cho type mới
type CustomResponse = PaginatedResponse<MyCustomType>;

// 3. Re-export từ index
export type { FetchInvoiceResponse } from '@/types/billing';

// 4. Validate DTOs with Zod
const validated = CreateSubscriptionSchema.parse(userInput);

// 5. Use BillingCycle enum
const cycle: BillingCycle = 'yearly';
```

### ❌ DON'T:

```typescript
// 1. KHÔNG định nghĩa lại ApiResponse
interface MyApiResponse<T> { ... }

// 2. KHÔNG tạo interface trùng lặp
interface MyFetchInvoiceResponse {
  pagination: PaginationData;
  results: Invoice[];
}

// 3. KHÔNG import trực tiếp từ file con
import { Invoice } from '@/types/billing/responses'; // ❌
import { Invoice } from '@/types/billing';           // ✅

// 4. KHÔNG hardcode billing cycle strings
const cycle = 'yearly'; // ❌
const cycle: BillingCycle = 'yearly'; // ✅
```

## 🔧 Extending Types

Nếu cần thêm fields:

```typescript
import type { BillingRecord, Subscription } from '@/types/billing';

// Extend domain model
interface BillingRecordWithProperty extends BillingRecord {
  property_name: string;
  property_code: string;
}

// Extend subscription with custom fields
interface SubscriptionWithMetrics extends Subscription {
  revenue_generated: number;
  usage_percentage: number;
}

// Extend response
type ExtendedBillingResponse = PaginatedResponse<BillingRecordWithProperty>;
```

## 📝 Type Aliases Summary

| Type Alias                    | Equivalent To                      | Use Case                      |
| ----------------------------- | ---------------------------------- | ----------------------------- |
| `PaginatedResponse<T>`        | `ApiResponse<PaginatedData<T>>`    | Bất kỳ response có phân trang |
| `SingleResponse<T>`           | `ApiResponse<T>`                   | Response trả về 1 object      |
| `FetchBillingRecordsResponse` | `PaginatedResponse<BillingRecord>` | Fetch billing records         |
| `FetchInvoiceResponse`        | `PaginatedResponse<Invoice>`       | Fetch invoices                |
| `FetchPlanResponse`           | `PaginatedResponse<Plan>`          | Fetch plans                   |
| `FetchSubscriptionsResponse`  | `PaginatedResponse<Subscription>`  | Fetch subscriptions           |
| `SubscriptionResponse`        | `SingleResponse<Subscription>`     | Single subscription           |
| `PropertyResponse`            | `SingleResponse<Property>`         | Single property               |

## 🔑 Enums

### BillingCycle

```typescript
type BillingCycle = 'monthly' | 'quarterly' | 'semi_annually' | 'yearly';

// Usage
const cycle: BillingCycle = 'yearly';
```

### SubscriptionStatus

```typescript
type SubscriptionStatus =
  | 'trial'
  | 'active'
  | 'expired'
  | 'suspended'
  | 'cancelled';

// Usage
const status: SubscriptionStatus = 'active';
```

### ServicePricingType

```typescript
type ServicePricingType = 'fixed' | 'quantity' | 'included';
```

### BillingRecordType

```typescript
type BillingRecordType = 'invoice' | 'credit' | 'adjustment';
```

### BillingRecordStatus

```typescript
type BillingRecordStatus = 'pending' | 'paid' | 'cancelled' | 'refunded';
```

## 🚀 Migration Guide

### From Old Subscription Format

**Before:**

```typescript
const subscription = {
  property_id: '123',
  plan_id: '2',
  status: 'active',
  started_at: '2026-05-05T00:00:00Z',
  expires_at: '2027-05-05T00:00:00Z',
};
```

**After:**

```typescript
const subscription: CreateSubscriptionDTO = {
  property_id: '123',
  plan_code: 'basic',
  billing_cycle: 'yearly',
  auto_renew: true,
  discount_code: 'NEWYEAR2026',
};
```

### Accessing Plan Pricing

**Before:**

```typescript
const price = plan.price_monthly;
```

**After:**

```typescript
const getPriceForCycle = (plan: Plan, cycle: BillingCycle): number => {
  switch (cycle) {
    case 'monthly':
      return plan.price_monthly;
    case 'quarterly':
      return plan.price_quarterly;
    case 'semi_annually':
      return plan.price_semi_annually;
    case 'yearly':
      return plan.price_yearly;
  }
};

const price = getPriceForCycle(plan, 'yearly');
```

## 💡 Tips

1. **Luôn import từ `@/types/billing`** thay vì import từ file con
2. **Sử dụng `PaginatedResponse<T>`** cho mọi API có phân trang
3. **Sử dụng `SingleResponse<T>`** cho API trả về 1 object
4. **Kiểm tra `type.ts`** trước khi tạo type wrapper mới
5. **Đọc JSDoc comments** trong `responses.ts` để hiểu rõ từng field
6. **Validate DTOs with Zod** trước khi gửi API request
7. **Use BillingCycle enum** thay vì hardcode strings
8. **Check both `is_active` and subscription status** khi validate property access

## 🔗 Related Documentation

- [UPDATE_BILLING.md](../../../docs/UPDATE_BILLING.md) - Complete implementation guide
- [PROPERTY_ACTIVATION_CONTROL.md](../../../docs/PROPERTY_ACTIVATION_CONTROL.md) - Property activation
- [SUBSCRIPTION_BILLING_CYCLES.md](../../../docs/SUBSCRIPTION_BILLING_CYCLES.md) - Billing cycles
- [PROPERTY_SUBSCRIPTION_FLOW.md](../../../docs/PROPERTY_SUBSCRIPTION_FLOW.md) - Complete flow

## 🔗 Related Files

- `src/types/base/base.type.ts` - Base types (ApiResponse, PaginatedData)
- `src/types/billing/dto.ts` - Request DTOs và validation schemas
- `src/types/billing/analytics.ts` - Analytics và statistics types

## 📌 Notes

- All IDs are strings (Snowflake IDs) to prevent JavaScript precision loss
- Timestamps are ISO 8601 strings
- Currency defaults to 'VND'
- Legacy subscription creation format is still supported for backward compatibility
- Property `is_active` is separate from subscription status for manual control
- Billing cycles automatically calculate pricing and expiry dates
- Discount codes are tracked for audit and analytics
