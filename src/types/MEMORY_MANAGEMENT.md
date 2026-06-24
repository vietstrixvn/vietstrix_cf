# Memory Management & Leak Prevention Guide

## 🧠 Overview

TypeScript types không gây memory leaks (chúng bị xóa sau compile), nhưng cách sử dụng data có thể gây leaks. Guide này giúp tránh memory leaks khi làm việc với types trong dự án.

## 🚨 Common Memory Leak Patterns

### 1. Event Listeners Không Cleanup

#### ❌ BAD - Memory Leak

```typescript
import type { User } from '@/types/user';

function UserComponent() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleUpdate = (data: User) => {
      setUser(data);
    };

    // Subscribe to updates
    userService.on('update', handleUpdate);

    // ❌ NO CLEANUP - Memory leak!
  }, []);

  return <div>{user?.email}</div>;
}
```

#### ✅ GOOD - Proper Cleanup

```typescript
import type { User } from '@/types/user';

function UserComponent() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleUpdate = (data: User) => {
      setUser(data);
    };

    userService.on('update', handleUpdate);

    // ✅ Cleanup on unmount
    return () => {
      userService.off('update', handleUpdate);
    };
  }, []);

  return <div>{user?.email}</div>;
}
```

### 2. Timers & Intervals Không Clear

#### ❌ BAD - Memory Leak

```typescript
import type { FetchUsersResponse } from '@/types/user';

function UserList() {
  const [data, setData] = useState<FetchUsersResponse | null>(null);

  useEffect(() => {
    // Poll every 5 seconds
    const interval = setInterval(async () => {
      const response = await userService.getUsers();
      setData(response);
    }, 5000);

    // ❌ NO CLEANUP - Timer keeps running!
  }, []);

  return <div>...</div>;
}
```

#### ✅ GOOD - Clear Timer

```typescript
import type { FetchUsersResponse } from '@/types/user';

function UserList() {
  const [data, setData] = useState<FetchUsersResponse | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await userService.getUsers();
      setData(response);
    }, 5000);

    // ✅ Clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  return <div>...</div>;
}
```

### 3. Large Objects Trong State

#### ❌ BAD - Holding Large Data

```typescript
import type { FetchBillingRecordsResponse } from '@/types/billing';

function BillingDashboard() {
  // ❌ Storing entire paginated response
  const [allData, setAllData] = useState<FetchBillingRecordsResponse[]>([]);

  const loadMore = async (page: number) => {
    const response = await billingService.getBillingRecords({ page });
    // ❌ Accumulating all pages in memory
    setAllData(prev => [...prev, response]);
  };

  return <div>...</div>;
}
```

#### ✅ GOOD - Store Only Needed Data

```typescript
import type { BillingRecord } from '@/types/billing';

function BillingDashboard() {
  // ✅ Store only the records, not full responses
  const [records, setRecords] = useState<BillingRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  const loadMore = async (page: number) => {
    const response = await billingService.getBillingRecords({ page });

    // ✅ Extract only needed data
    setRecords(prev => [...prev, ...response.data.results]);
    setPagination(response.data.pagination);
  };

  return <div>...</div>;
}
```

### 4. Closures Capturing Large Objects

#### ❌ BAD - Closure Leak

```typescript
import type { User, FetchUsersResponse } from '@/types/user';

function UserManager() {
  const [allUsers, setAllUsers] = useState<FetchUsersResponse | null>(null);

  const createUserHandler = (userId: string) => {
    // ❌ Closure captures entire allUsers object
    return () => {
      const user = allUsers?.data.results.find(u => u.id === userId);
      console.log(user);
    };
  };

  return (
    <div>
      {allUsers?.data.results.map(user => (
        <button key={user.id} onClick={createUserHandler(user.id)}>
          {user.email}
        </button>
      ))}
    </div>
  );
}
```

#### ✅ GOOD - Minimal Closure

```typescript
import type { User } from '@/types/user';

function UserManager() {
  const [users, setUsers] = useState<User[]>([]);

  // ✅ Pass only needed data
  const handleUserClick = (user: User) => {
    console.log(user);
  };

  return (
    <div>
      {users.map(user => (
        <button key={user.id} onClick={() => handleUserClick(user)}>
          {user.email}
        </button>
      ))}
    </div>
  );
}
```

### 5. React Query / SWR Cache Issues

#### ❌ BAD - Infinite Cache

```typescript
import { useQuery } from '@tanstack/react-query';
import type { FetchUsersResponse } from '@/types/user';

function UserList() {
  // ❌ No cache time limit - data stays forever
  const { data } = useQuery<FetchUsersResponse>({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return <div>...</div>;
}
```

#### ✅ GOOD - Reasonable Cache

```typescript
import { useQuery } from '@tanstack/react-query';
import type { FetchUsersResponse } from '@/types/user';

function UserList() {
  // ✅ Set reasonable cache times
  const { data } = useQuery<FetchUsersResponse>({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
    staleTime: 5 * 60 * 1000,  // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  return <div>...</div>;
}
```

## 🛡️ Best Practices by Type Category

### Authentication Types (🔴 Sensitive)

```typescript
import type { AuthStore, LoginDetail } from '@/types/auth';

// ✅ GOOD - Clear sensitive data on logout
function useAuth() {
  const logout = async () => {
    // Clear tokens
    authStore.clearAccessToken();
    authStore.clearTwoFactorState();
    authStore.clearPasskeyState();

    // Clear from memory
    localStorage.removeItem('auth-storage');
    sessionStorage.clear();

    // Force garbage collection hint
    if (global.gc) global.gc();
  };

  return { logout };
}

// ✅ GOOD - Don't store tokens in component state
function LoginForm() {
  // ❌ BAD
  // const [token, setToken] = useState<string>('');

  // ✅ GOOD - Store in secure storage only
  const handleLogin = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    // Token goes directly to secure storage, not component state
  };
}
```

### Paginated Data

```typescript
import type { PaginatedResponse, User } from '@/types/user';

// ✅ GOOD - Virtualized list for large datasets
import { useVirtualizer } from '@tanstack/react-virtual';

function LargeUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const parentRef = useRef<HTMLDivElement>(null);

  // ✅ Only render visible items
  const virtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div key={virtualRow.index}>
            {users[virtualRow.index].email}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### File Uploads / Large Data

```typescript
import type { MediaData } from '@/types/media';

// ✅ GOOD - Stream large files, don't load into memory
async function uploadLargeFile(file: File) {
  // ❌ BAD - Load entire file
  // const buffer = await file.arrayBuffer();

  // ✅ GOOD - Stream upload
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/upload', {
    method: 'POST',
    body: formData, // Browser handles streaming
  });

  return response.json() as Promise<MediaData>;
}

// ✅ GOOD - Revoke object URLs
function ImagePreview({ file }: { file: File }) {
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreview(url);

    // ✅ Cleanup object URL
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return <img src={preview} alt="Preview" />;
}
```

## 🔍 Memory Leak Detection

### 1. Chrome DevTools

```typescript
// Add to your component for debugging
function UserList() {
  useEffect(() => {
    console.log('UserList mounted');

    return () => {
      console.log('UserList unmounted');
    };
  }, []);

  // ... component code
}

// Check in Chrome DevTools:
// 1. Performance > Memory
// 2. Take heap snapshot
// 3. Navigate away and back
// 4. Take another snapshot
// 5. Compare - should see cleanup
```

### 2. React DevTools Profiler

```typescript
import { Profiler } from 'react';
import type { User } from '@/types/user';

function UserList() {
  const onRenderCallback = (
    id: string,
    phase: 'mount' | 'update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    console.log({ id, phase, actualDuration });
  };

  return (
    <Profiler id="UserList" onRender={onRenderCallback}>
      {/* Your component */}
    </Profiler>
  );
}
```

### 3. Custom Hook for Leak Detection

```typescript
import { useEffect, useRef } from 'react';

export function useMemoryLeakDetector(componentName: string) {
  const mountTime = useRef(Date.now());
  const renderCount = useRef(0);

  renderCount.current++;

  useEffect(() => {
    console.log(`[${componentName}] Mounted at ${mountTime.current}`);

    return () => {
      const lifetime = Date.now() - mountTime.current;
      console.log(
        `[${componentName}] Unmounted after ${lifetime}ms, ${renderCount.current} renders`
      );

      // Warning if too many renders
      if (renderCount.current > 100) {
        console.warn(
          `[${componentName}] High render count: ${renderCount.current}`
        );
      }
    };
  }, [componentName]);
}

// Usage
function UserList() {
  useMemoryLeakDetector('UserList');
  // ... component code
}
```

## 📋 Checklist

Before deploying:

- [ ] All event listeners have cleanup
- [ ] All timers/intervals are cleared
- [ ] Large data is paginated or virtualized
- [ ] Sensitive data is cleared on logout
- [ ] Object URLs are revoked
- [ ] React Query cache times are set
- [ ] No infinite loops in useEffect
- [ ] Closures don't capture large objects
- [ ] WebSocket connections are closed
- [ ] File uploads are streamed
- [ ] Memory profiling done in Chrome DevTools

## 🔧 Automated Detection

### ESLint Rules

```json
// .eslintrc.json
{
  "rules": {
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error"
  }
}
```

### TypeScript Strict Mode

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

## 📚 Resources

- [React Memory Leaks](https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)
- [Chrome DevTools Memory Profiler](https://developer.chrome.com/docs/devtools/memory-problems/)
- [React Query Garbage Collection](https://tanstack.com/query/latest/docs/react/guides/caching)
- [Web Performance Working Group](https://www.w3.org/webperf/)

## 💡 Pro Tips

1. **Use WeakMap/WeakSet** for caching when possible
2. **Implement pagination** for large lists
3. **Use React.memo** wisely (not everywhere)
4. **Monitor bundle size** - large bundles = more memory
5. **Test on low-end devices** - memory constraints show issues faster
6. **Use Chrome's Memory Profiler** regularly during development
7. **Implement proper error boundaries** - prevent memory leaks from errors
8. **Clear caches periodically** in long-running apps
