# Property CMS Types

## 📋 Overview

Property CMS module contains types for CMS-related features within properties.

## 🗂️ Submodules

This module has 9 submodules:

1. **analytic/** - Analytics types
2. **banner/** - Banner management types
3. **category/** - Category types
4. **contact/** - Contact form types
5. **metion/** - Mention/notification types
6. **post/** - Post/content types
7. **product/** - Product types
8. **social/** - Social media types
9. **tag/** - Tag types

## 🔄 Migration Status

**Status:** ⏳ Pending migration

These submodules follow the same pattern as portfolio submodules and can be migrated using the same approach:

1. Rename domain models (e.g., `*Response` → clean names)
2. Use `PaginatedResponse<T>` for paginated responses
3. Create `index.ts` for each submodule
4. Maintain backward compatibility

## 📝 Migration Template

For each submodule, follow this pattern:

### responses.ts

```typescript
/**
 * Property CMS [Submodule] Type Definitions
 */

export interface DomainModel {
  // fields
}

/**
 * @deprecated Use DomainModel instead
 */
export type OldName = DomainModel;
```

### type.ts

```typescript
import type { PaginatedResponse } from '@/types/base/base.type';
import type { DomainModel } from './responses';

export type FetchItemsResponse = PaginatedResponse<DomainModel>;
```

### index.ts

```typescript
export * from './responses';
export type { FetchItemsResponse } from './type';
// ... other exports
```

## 🎯 Priority

These submodules can be migrated as needed. The main property types (property, type, user) are more critical and have been migrated first.

## 📚 Reference

See migrated modules for examples:

- `src/types/portfolio/` - Similar structure
- `src/types/property/property/` - Main property types
- `src/types/MIGRATION_GUIDE.md` - Migration instructions
