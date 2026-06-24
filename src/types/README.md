# Type System Documentation

## 📚 Overview

Hệ thống type của dự án được tổ chức theo module, với base types chung và utilities để tránh code duplication.

## 🗂️ Structure

```
src/types/
├── base/                    # Base types cho toàn dự án
│   ├── base.type.ts        # ApiResponse, PaginatedResponse, etc.
│   └── base.prop.ts        # Base props
│
├── [module]/               # Module-specific types
│   ├── responses.ts        # Domain models
│   ├── type.ts            # Response wrappers
│   ├── dto.ts             # Request DTOs & validation
│   ├── prop.ts            # Component props
│   ├── colum.ts           # Table columns
│   └── index.ts           # Public exports
│
├── MIGRATION_GUIDE.md     # Migration guide
└── README.md              # This file
```

## 🎯 Design Principles

### 1. Single Source of Truth

Base types được định nghĩa một lần trong `base/base.type.ts` và reuse ở mọi nơi.

### 2. Type-Only Imports

Sử dụng `import type` để tránh runtime overhead:

```typescript
import type { User } from '@/types/user'; // ✅
import { User } from '@/types/user'; // ❌
```

### 3. Generic Over Specific

Ưu tiên generic types thay vì duplicate code:

```typescript
type FetchUsersResponse = PaginatedResponse<User>;  // ✅
interface FetchUsersResponse { ... }                // ❌
```

### 4. Clear Naming

- Domain models: `User`, `Ticket`, `Invoice` (singular, descriptive)
- Response types: `FetchUsersResponse`, `CreateUserResponse`
- DTOs: `CreateUserDTO`, `UpdateUserDTO`

## 📦 Base Types

### Core Response Wrappers

#### ApiResponse<T>

Standard API response wrapper:

```typescript
interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}
```

#### PaginatedResponse<T>

For paginated API responses:

```typescript
type PaginatedResponse<T> = ApiResponse<PaginatedData<T>>;

// Usage
type FetchUsersResponse = PaginatedResponse<User>;

// Structure:
{
  success: true,
  code: 200,
  message: "Success",
  data: {
    results: User[],
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

#### SingleResponse<T>

For single item responses:

```typescript
type SingleResponse<T> = ApiResponse<T>;

// Usage
type FetchUserResponse = SingleResponse<User>;

// Structure:
{
  success: true,
  code: 200,
  message: "Success",
  data: User
}
```

#### ListResponse<T>

For array responses without pagination:

```typescript
type ListResponse<T> = ApiResponse<T[]>;

// Usage
type FetchRolesResponse = ListResponse<Role>;
```

## 🔧 Module Structure

### responses.ts

Domain models và core interfaces:

```typescript
/**
 * User Module Type Definitions
 *
 * Domain models and interfaces for user management
 */

/**
 * User - Complete user information
 */
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  // ... other fields
}

/**
 * @deprecated Use User instead
 */
export type UserListData = User;
```

### type.ts

Response wrappers và utilities:

```typescript
/**
 * User Type Utilities
 *
 * Response wrappers and type aliases
 */

import type { PaginatedResponse, SingleResponse } from '../base/base.type';
import type { User } from './responses';

// Standard responses
export type FetchUsersResponse = PaginatedResponse<User>;
export type FetchUserResponse = SingleResponse<User>;

// Custom responses (if needed)
export interface FetchUserStatsResponse {
  user: User;
  stats: {
    total_posts: number;
    total_comments: number;
  };
}
```

### dto.ts

Request DTOs và Zod validation schemas:

```typescript
import { z } from 'zod';

/**
 * Create user request DTO
 */
export interface CreateUserDTO {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

/**
 * Zod schema for CreateUserDTO
 */
export const CreateUserSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  password: z.string().min(8),
});
```

### index.ts

Public exports:

```typescript
// Domain models
export * from './responses';

// Response types
export type { FetchUsersResponse, FetchUserResponse } from './type';

// DTOs
export type { CreateUserDTO, UpdateUserDTO } from './dto';

// Schemas
export { CreateUserSchema, UpdateUserSchema } from './dto';

// Columns (if exists)
export { UserColumns } from './colum';
```

## 📋 Modules Status

### ✅ Fully Migrated

- **billing** - Complete với documentation và examples
- **user** - Migrated to new format
- **ticket** - Migrated to new format
- **media** - Migrated to new format

### 🔄 Pending Migration

- **audit** - Needs migration
- **auth** - Needs migration
- **config** - Needs migration
- **portfolio** - Needs migration
- **property** - Needs migration

## 🚀 Quick Start

### 1. Import Types

```typescript
// ✅ Recommended - Import from module index
import type { User, FetchUsersResponse, CreateUserDTO } from '@/types/user';

// ❌ Avoid - Direct file imports
import type { User } from '@/types/user/responses';
```

### 2. Use in API Service

```typescript
import type {
  FetchUsersResponse,
  CreateUserDTO,
  SingleResponse,
  User,
} from '@/types/user';

export const userService = {
  async getUsers(): Promise<FetchUsersResponse> {
    const response = await api.get('/users');
    return response.data;
  },

  async getUser(id: string): Promise<SingleResponse<User>> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(dto: CreateUserDTO): Promise<SingleResponse<User>> {
    const response = await api.post('/users', dto);
    return response.data;
  },
};
```

### 3. Use in React Component

```typescript
import { useState, useEffect } from 'react';
import type { User, FetchUsersResponse } from '@/types/user';

export function UserList() {
  const [data, setData] = useState<FetchUsersResponse | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      const response = await userService.getUsers();
      setData(response);
    }
    fetchUsers();
  }, []);

  if (!data?.data) return <div>Loading...</div>;

  const { results, pagination } = data.data;

  return (
    <div>
      {results.map((user: User) => (
        <div key={user.id}>{user.email}</div>
      ))}
      <div>Page {pagination.current_page} of {pagination.total_pages}</div>
    </div>
  );
}
```

### 4. Use with React Query

```typescript
import { useQuery } from '@tanstack/react-query';
import type { FetchUsersResponse } from '@/types/user';

export function useUsers() {
  return useQuery<FetchUsersResponse>({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  });
}
```

## 🎨 Best Practices

### ✅ DO

1. **Use type imports**

   ```typescript
   import type { User } from '@/types/user';
   ```

2. **Use generic types**

   ```typescript
   type FetchUsersResponse = PaginatedResponse<User>;
   ```

3. **Add JSDoc comments**

   ```typescript
   /**
    * User - Complete user information
    */
   export interface User {}
   ```

4. **Maintain backward compatibility**

   ```typescript
   export interface User {}
   export type UserListData = User; // @deprecated
   ```

5. **Export from index**
   ```typescript
   export * from './responses';
   export type { FetchUsersResponse } from './type';
   ```

### ❌ DON'T

1. **Don't duplicate ApiResponse**

   ```typescript
   // ❌ Bad
   interface MyApiResponse<T> {
     success: boolean;
     data: T;
   }

   // ✅ Good
   import type { ApiResponse } from '../base/base.type';
   ```

2. **Don't create redundant interfaces**

   ```typescript
   // ❌ Bad
   interface FetchUsersResponse {
     pagination: PaginationData;
     results: User[];
   }

   // ✅ Good
   type FetchUsersResponse = PaginatedResponse<User>;
   ```

3. **Don't use vague names**

   ```typescript
   // ❌ Bad
   interface UserListData {}
   interface UserResponse {}

   // ✅ Good
   interface User {}
   ```

4. **Don't import from nested files**

   ```typescript
   // ❌ Bad
   import { User } from '@/types/user/responses';

   // ✅ Good
   import type { User } from '@/types/user';
   ```

## 📖 Documentation

- **MIGRATION_GUIDE.md** - Step-by-step migration guide
- **billing/README.md** - Detailed usage guide (reference implementation)
- **billing/EXAMPLES.md** - Real-world code examples

## 🔍 Type Utilities

### Prettify<T>

Makes complex types readable in IDE:

```typescript
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// Usage
type PrettyUser = Prettify<User & { extra: string }>;
```

### NonReadonly<T>

Removes readonly modifiers:

```typescript
type NonReadonly<T> = {
  -readonly [P in keyof T]: T[P] extends object ? NonReadonly<T[P]> : T[P];
};
```

## 🆘 Getting Help

1. Check `MIGRATION_GUIDE.md` for migration steps
2. See `billing/` module as reference implementation
3. Read `billing/README.md` for usage patterns
4. Check `billing/EXAMPLES.md` for code examples

## 🔗 Related Files

- `src/types/base/base.type.ts` - Core type definitions
- `src/types/MIGRATION_GUIDE.md` - Migration guide
- `src/types/billing/README.md` - Usage guide
- `src/types/billing/EXAMPLES.md` - Code examples

## 📊 Type Coverage

Run type checking:

```bash
npm run type-check
```

Build project:

```bash
npm run build
```

## 🎯 Goals

- [x] Centralized base types
- [x] Generic response wrappers
- [x] Consistent naming conventions
- [x] Type-safe API calls
- [x] Documentation and examples
- [ ] Complete migration of all modules
- [ ] Automated type generation from OpenAPI
