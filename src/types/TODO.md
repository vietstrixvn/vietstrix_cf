# Type System Migration TODO

## 📊 Progress: 60% Complete (6/10 modules)

```
████████████░░░░ 60%
```

## ✅ Completed (6/10)

- [x] billing (⭐ Reference)
- [x] user
- [x] ticket
- [x] media
- [x] audit
- [x] config
- [x] logs (N/A - utility only)

## 🔄 Remaining (3/10)

### Priority 1: auth (1 hour)

**Why first:** Core functionality, affects many features

**Files:**

- [ ] responses.ts - Review and rename domain models
- [ ] type.ts - Add PaginatedResponse wrappers
- [ ] passkey.ts - Review structure
- [ ] twoFactor.ts - Review structure
- [ ] rbac.ts - Review structure
- [ ] index.ts - Create proper exports

**Checklist:**

```bash
# 1. Read current structure
cat src/types/auth/responses.ts
cat src/types/auth/type.ts

# 2. Identify domain models to rename
# 3. Create type wrappers using PaginatedResponse
# 4. Add deprecated aliases
# 5. Create index.ts
# 6. Test with getDiagnostics
```

---

### Priority 2: portfolio (2 hours)

**Why second:** Multiple submodules, needs systematic approach

**Submodules:**

- [ ] category/
- [ ] contact/
- [ ] post/
- [ ] tag/

**Strategy:**

1. List all files in each submodule
2. Apply same pattern as other modules
3. Create index.ts for each submodule
4. Create main portfolio/index.ts

**Checklist per submodule:**

```bash
# For each submodule (category, contact, post, tag):
# 1. Read responses.ts
# 2. Rename *ListData → Domain name
# 3. Create type.ts with PaginatedResponse
# 4. Create index.ts
# 5. Test
```

---

### Priority 3: property (2 hours)

**Why last:** Most complex, multiple submodules

**Submodules:**

- [ ] cms/
- [ ] property/
- [ ] type/
- [ ] user/

**Strategy:**
Same as portfolio, but more complex domain models

---

## 🎯 Quick Commands

### Check structure

```bash
# List files in a module
ls -la src/types/auth/

# Read a file
cat src/types/auth/responses.ts
```

### After migration

```bash
# Check for errors
npm run type-check

# Or use getDiagnostics tool
```

## 📝 Migration Template

For each module:

### 1. responses.ts

```typescript
/**
 * [Module] Module Type Definitions
 */

export interface DomainModel {
  // fields
}

/**
 * @deprecated Use DomainModel instead
 */
export type OldName = DomainModel;
```

### 2. type.ts

```typescript
/**
 * [Module] Type Utilities
 */

import type { PaginatedResponse } from '../base/base.type';
import type { DomainModel } from './responses';

export type FetchItemsResponse = PaginatedResponse<DomainModel>;
```

### 3. index.ts

```typescript
/**
 * [Module] Module Exports
 */

// Domain models
export * from './responses';

// Response types
export type { FetchItemsResponse } from './type';

// DTOs (if exists)
export type { CreateItemDTO } from './dto';
export { CreateItemSchema } from './dto';
```

## ⏱️ Time Estimates

- **auth**: 1 hour (complex but single module)
- **portfolio**: 2 hours (4 submodules × 30 min)
- **property**: 2 hours (4 submodules × 30 min)

**Total remaining:** ~5 hours

## 🎉 When Complete

- [ ] Update MIGRATION_STATUS.md to 100%
- [ ] Run full type-check
- [ ] Update team documentation
- [ ] Create announcement
- [ ] Celebrate! 🎊

## 📚 Resources

- `README.md` - Overview
- `MIGRATION_GUIDE.md` - Step-by-step guide
- `QUICK_START.md` - Quick reference
- `billing/EXAMPLES.md` - Code examples
- `MIGRATION_STATUS.md` - Detailed progress

## 💡 Tips

1. **Start with auth** - Most important, affects many features
2. **Use billing as reference** - Complete example
3. **Test after each module** - Catch errors early
4. **Maintain backward compatibility** - Add deprecated aliases
5. **Update MIGRATION_STATUS.md** - Track progress

## 🚀 Next Action

```bash
# Start with auth module
cat src/types/auth/responses.ts
cat src/types/auth/type.ts
```

Then follow the migration template above!
