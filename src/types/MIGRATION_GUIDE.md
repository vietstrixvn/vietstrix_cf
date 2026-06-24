# Type System Migration Guide

## 📋 Overview

Dự án đang được chuẩn hóa để sử dụng một hệ thống type nhất quán trên toàn bộ modules. Guide này giúp bạn migrate code hiện tại sang format mới.

## 🎯 Mục tiêu

1. **Loại bỏ code trùng lặp** - Sử dụng generic types từ `base.type.ts`
2. **Naming convention nhất quán** - Domain models có tên rõ ràng (User, Ticket, Invoice)
3. **Type safety tốt hơn** - Sử dụng type imports và strict typing
4. **Dễ maintain** - Một nơi định nghĩa, nhiều nơi sử dụng

## 🔄 Migration Steps

### Step 1: Cập nhật imports

#### ❌ Cũ:

```typescript
import { PaginationData } from '../base/base.type';
import { UserListData } from './responses';

export interface FetchUsersResponse {
  pagination: PaginationData;
  results: UserListData[];
}
```

#### ✅ Mới:

```typescript
import type { PaginatedResponse } from '../base/base.type';
import type { User } from './responses';

export type FetchUsersResponse = PaginatedResponse<User>;
```

### Step 2: Đổi tên domain models

#### ❌ Cũ:

```typescript
// responses.ts
export interface UserListData {
  id: string;
  email: string;
  // ...
}
```

#### ✅ Mới:

```typescript
// responses.ts
/**
 * User - Complete user information
 */
export interface User {
  id: string;
  email: string;
  // ...
}

/**
 * @deprecated Use User instead
 */
export type UserListData = User; // Backward compatibility
```

### Step 3: Sử dụng generic types

Thay vì định nghĩa interface mới, sử dụng generic types:

```typescript
// ✅ Sử dụng generic
export type FetchUsersResponse = PaginatedResponse<User>;
export type FetchUserResponse = SingleResponse<User>;
export type FetchUserListResponse = ListResponse<User>;

// ❌ KHÔNG định nghĩa lại
export interface FetchUsersResponse {
  pagination: PaginationData;
  results: User[];
}
```

## 📦 Available Generic Types

Từ `src/types/base/base.type.ts`:

### 1. PaginatedResponse<T>

Cho API có phân trang:

```typescript
type FetchUsersResponse = PaginatedResponse<User>;

// Equivalent to:
{
  success: boolean;
  code: number;
  message: string;
  data: {
    results: User[];
    pagination: PaginationData;
  }
}
```

### 2. SingleResponse<T>

Cho API trả về 1 object:

```typescript
type FetchUserResponse = SingleResponse<User>;

// Equivalent to:
{
  success: boolean;
  code: number;
  message: string;
  data: User;
}
```

### 3. ListResponse<T>

Cho API trả về array (không có pagination):

```typescript
type FetchRolesResponse = ListResponse<Role>;

// Equivalent to:
{
  success: boolean;
  code: number;
  message: string;
  data: Role[];
}
```

## 🗂️ File Structure Convention

Mỗi module nên có cấu trúc:

```
src/types/[module]/
├── responses.ts    # Domain models (User, Ticket, Invoice)
├── type.ts         # Response wrappers và utilities
├── dto.ts          # Request DTOs và validation schemas
├── prop.ts         # Component props (nếu cần)
├── colum.ts        # Table columns (nếu cần)
└── index.ts        # Public exports
```

### responses.ts

```typescript
/**
 * [Module] Module Type Definitions
 *
 * Domain models and interfaces
 */

export interface User {
  id: string;
  email: string;
  // ... all fields
}

export interface UserProfile {
  // ... related types
}
```

### type.ts

```typescript
/**
 * [Module] Type Utilities
 *
 * Response wrappers and type aliases
 */

import type { PaginatedResponse, SingleResponse } from '../base/base.type';
import type { User } from './responses';

// Standard responses
export type FetchUsersResponse = PaginatedResponse<User>;
export type FetchUserResponse = SingleResponse<User>;

// Custom responses (nếu cần thêm fields)
export interface FetchUserStatsResponse {
  user: User;
  stats: {
    total_posts: number;
    total_comments: number;
  };
}
```

### index.ts

```typescript
// Domain models
export * from './responses';

// Response types
export type { FetchUsersResponse, FetchUserResponse } from './type';

// DTOs
export type { CreateUserDTO, UpdateUserDTO } from './dto';

// Schemas
export { CreateUserSchema, UpdateUserSchema } from './dto';
```

## 📝 Module-by-Module Checklist

### ✅ Completed Modules

- [x] `billing` - Fully migrated with documentation
- [x] `user` - Migrated to new format
- [x] `ticket` - Migrated to new format
- [x] `media` - Migrated to new format

### 🔄 Pending Modules

- [ ] `audit`
- [ ] `auth`
- [ ] `config`
- [ ] `portfolio`
- [ ] `property`

## 🔧 Migration Checklist per Module

Cho mỗi module, làm theo thứ tự:

### 1. responses.ts

- [ ] Đổi tên `*ListData` → tên domain rõ ràng (User, Ticket, etc.)
- [ ] Thêm JSDoc comments
- [ ] Thêm deprecated alias cho backward compatibility
- [ ] Import types từ base nếu cần

### 2. type.ts

- [ ] Import `PaginatedResponse`, `SingleResponse` từ base
- [ ] Thay interface bằng type alias
- [ ] Loại bỏ duplicate pagination structure
- [ ] Giữ lại custom responses nếu có extra fields

### 3. index.ts

- [ ] Export tất cả từ responses.ts
- [ ] Export type-only từ type.ts
- [ ] Export DTOs và schemas nếu có

### 4. Update consumers

- [ ] Tìm tất cả imports của module
- [ ] Cập nhật tên types nếu cần
- [ ] Test để đảm bảo không break

## 🎨 Naming Conventions

### Domain Models (responses.ts)

```typescript
// ✅ Good - Singular, descriptive
export interface User {}
export interface Ticket {}
export interface Invoice {}
export interface Subscription {}

// ❌ Bad - Vague, plural, or with suffix
export interface UserListData {}
export interface TicketResponse {}
export interface InvoiceData {}
```

### Response Types (type.ts)

```typescript
// ✅ Good - Clear intent
export type FetchUsersResponse = PaginatedResponse<User>;
export type FetchUserResponse = SingleResponse<User>;
export type CreateUserResponse = SingleResponse<User>;

// ❌ Bad - Unclear or redundant
export type UsersResponse = ...;
export type GetUser = ...;
```

### DTOs (dto.ts)

```typescript
// ✅ Good - Action + Entity + DTO
export interface CreateUserDTO {}
export interface UpdateUserDTO {}
export interface DeleteUserDTO {}

// ❌ Bad
export interface UserCreate {}
export interface UserInput {}
```

## 🚀 Quick Migration Script

Để migrate một module nhanh:

```typescript
// 1. responses.ts - Đổi tên interface
export interface User {
  /* ... */
}
export type UserListData = User; // deprecated

// 2. type.ts - Sử dụng generic
import type { PaginatedResponse } from '../base/base.type';
import type { User } from './responses';

export type FetchUsersResponse = PaginatedResponse<User>;

// 3. index.ts - Export
export * from './responses';
export type { FetchUsersResponse } from './type';
```

## 🔍 Find & Replace Patterns

### Pattern 1: Pagination Interface

```typescript
// Find:
export interface Fetch.*Response {
  pagination: PaginationData;
  results: .*\[\];
}

// Replace with:
export type Fetch[Entity]Response = PaginatedResponse<[Entity]>;
```

### Pattern 2: Import statements

```typescript
// Find:
import { PaginationData } from '../base/base.type';

// Replace with:
import type { PaginatedResponse } from '../base/base.type';
```

## ⚠️ Common Pitfalls

### 1. Quên thêm `type` keyword

```typescript
// ❌ Runtime import
import { User } from '@/types/user';

// ✅ Type-only import
import type { User } from '@/types/user';
```

### 2. Định nghĩa lại ApiResponse

```typescript
// ❌ Duplicate
export interface MyApiResponse<T> {
  success: boolean;
  data: T;
}

// ✅ Sử dụng có sẵn
import type { ApiResponse } from '../base/base.type';
```

### 3. Không maintain backward compatibility

```typescript
// ❌ Breaking change
// Xóa luôn UserListData

// ✅ Deprecated alias
export interface User {}
export type UserListData = User; // @deprecated
```

## 📚 Examples

Xem các file sau để tham khảo:

- `src/types/billing/` - Complete example với documentation
- `src/types/billing/README.md` - Usage guide
- `src/types/billing/EXAMPLES.md` - Code examples

## 🆘 Need Help?

1. Đọc `src/types/base/base.type.ts` để hiểu available types
2. Xem `src/types/billing/` làm reference
3. Check `src/types/billing/README.md` cho usage patterns
4. Tham khảo `src/types/billing/EXAMPLES.md` cho real-world examples

## ✅ Verification

Sau khi migrate, verify:

```bash
# 1. Type check
npm run type-check

# 2. Build
npm run build

# 3. Test
npm run test
```

## 📊 Progress Tracking

Track migration progress:

```typescript
// src/types/MIGRATION_STATUS.md
- [x] billing (100%)
- [x] user (100%)
- [x] ticket (100%)
- [x] media (100%)
- [ ] audit (0%)
- [ ] auth (0%)
- [ ] config (0%)
- [ ] portfolio (0%)
- [ ] property (0%)
```
