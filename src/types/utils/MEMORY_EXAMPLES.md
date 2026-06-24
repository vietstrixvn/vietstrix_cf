# Memory Management Examples

## 🎯 Real-World Usage Examples

### Example 1: User List with Cleanup

```typescript
import { useEffect, useState } from 'react';
import type { User, FetchUsersResponse } from '@/types/user';
import {
  useMemoryLeakDetector,
  useEventListener,
  limitArraySize
} from '@/types/utils/memory';

function UserList() {
  // ✅ Detect memory leaks in development
  useMemoryLeakDetector('UserList', {
    maxRenders: 50,
    logMount: true,
    logUnmount: true,
  });

  const [users, setUsers] = useState<User[]>([]);

  // ✅ Auto-cleanup event listener
  useEventListener('storage', (event) => {
    if (event.key === 'users-updated') {
      // Reload users
      loadUsers();
    }
  });

  const loadUsers = async () => {
    const response: FetchUsersResponse = await userService.getUsers();

    // ✅ Limit array size to prevent memory bloat
    const limitedUsers = limitArraySize(
      response.data.results,
      100, // Max 100 users in memory
      'fifo' // Keep newest
    );

    setUsers(limitedUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
}
```

### Example 2: Real-time Updates with Cleanup

```typescript
import { useEffect, useState } from 'react';
import type { BillingRecord } from '@/types/billing';
import { CleanupTracker, useInterval } from '@/types/utils/memory';

function BillingDashboard() {
  const [records, setRecords] = useState<BillingRecord[]>([]);
  const cleanupTracker = new CleanupTracker('BillingDashboard');

  // ✅ Auto-cleanup interval
  useInterval(() => {
    // Poll for updates every 30 seconds
    loadRecords();
  }, 30000);

  const loadRecords = async () => {
    const response = await billingService.getBillingRecords();
    setRecords(response.data.results);
  };

  useEffect(() => {
    // WebSocket connection
    const ws = new WebSocket('ws://api.example.com/billing');

    ws.onmessage = (event) => {
      const record: BillingRecord = JSON.parse(event.data);
      setRecords(prev => [record, ...prev].slice(0, 50)); // Keep max 50
    };

    // ✅ Register cleanup
    cleanupTracker.register('websocket', () => {
      ws.close();
    });

    return () => {
      // ✅ Cleanup all
      cleanupTracker.cleanupAll();
    };
  }, []);

  return <div>...</div>;
}
```

### Example 3: Auth with Secure Cleanup

```typescript
import { useEffect } from 'react';
import type { AuthStore } from '@/types/auth';
import {
  secureClear,
  clearAuthStorage,
  useStableCallback,
} from '@/types/utils/memory';

function useAuth() {
  // ✅ Stable callback prevents re-renders
  const logout = useStableCallback(async () => {
    // Get current auth data
    const authData = authStore.getState();

    // ✅ Securely clear sensitive data
    secureClear(authData);

    // ✅ Clear all storage
    clearAuthStorage();

    // Clear store
    authStore.clearAccessToken();
    authStore.clearTwoFactorState();
    authStore.clearPasskeyState();

    // Navigate to login
    router.push('/login');
  });

  // ✅ Auto-logout on window close
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear sensitive data before page unload
      clearAuthStorage();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return { logout };
}
```

### Example 4: Large Data with Virtualization

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';
import type { Invoice } from '@/types/billing';
import { useMemoryMonitor } from '@/types/utils/memory';

function InvoiceList() {
  // ✅ Monitor memory usage in development
  if (process.env.NODE_ENV === 'development') {
    useMemoryMonitor(10000, 'InvoiceList'); // Log every 10s
  }

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const parentRef = useRef<HTMLDivElement>(null);

  // ✅ Virtualize large list
  const virtualizer = useVirtualizer({
    count: invoices.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5, // Render 5 extra items
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map(virtualRow => {
          const invoice = invoices[virtualRow.index];
          return (
            <div
              key={invoice.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {invoice.invoice_number} - {invoice.invoice_amount}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

### Example 5: Image Upload with Cleanup

```typescript
import { useState, useEffect } from 'react';
import type { MediaData } from '@/types/media';

function ImageUpload() {
  const [preview, setPreview] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // ✅ Create object URL for preview
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
  };

  const handleUpload = async () => {
    if (!file) return;

    // ✅ Stream upload (don't load entire file into memory)
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data: MediaData = await response.json();
    console.log('Uploaded:', data);

    // ✅ Clear file after upload
    setFile(null);
  };

  // ✅ Cleanup object URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" />}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
```

### Example 6: React Query with Memory Management

```typescript
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { FetchUsersResponse } from '@/types/user';
import { useEffect } from 'react';

function UserManager() {
  const queryClient = useQueryClient();

  // ✅ Set reasonable cache times
  const { data } = useQuery<FetchUsersResponse>({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
    staleTime: 5 * 60 * 1000,  // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // ✅ Clear cache on unmount for sensitive data
  useEffect(() => {
    return () => {
      // Clear specific query
      queryClient.removeQueries({ queryKey: ['users'] });
    };
  }, [queryClient]);

  // ✅ Periodic cache cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      // Clear stale queries
      queryClient.clear();
    }, 30 * 60 * 1000); // Every 30 minutes

    return () => clearInterval(interval);
  }, [queryClient]);

  return <div>...</div>;
}
```

### Example 7: Zustand Store with Cleanup

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';
import { secureClear } from '@/types/utils/memory';

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  clearUsers: () => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],

      setUsers: (users) => set({ users }),

      clearUsers: () => {
        // ✅ Securely clear before reset
        const state = get();
        secureClear(state.users);
        set({ users: [] });
      },

      reset: () => {
        // ✅ Complete reset
        const state = get();
        secureClear(state);
        set({ users: [] });
      },
    }),
    {
      name: 'user-storage',
      // ✅ Limit storage size
      partialize: (state) => ({
        users: state.users.slice(0, 50), // Store max 50 users
      }),
    }
  )
);

// ✅ Cleanup on app unmount
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    useUserStore.getState().clearUsers();
  });
}
```

### Example 8: Custom Hook with Cleanup Tracker

```typescript
import { useEffect, useState } from 'react';
import type { Subscription } from '@/types/billing';
import { CleanupTracker } from '@/types/utils/memory';

function useSubscriptionMonitor(propertyId: string) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [tracker] = useState(() => new CleanupTracker('SubscriptionMonitor'));

  useEffect(() => {
    // WebSocket
    const ws = new WebSocket(
      `ws://api.example.com/subscriptions/${propertyId}`
    );

    ws.onmessage = (event) => {
      const data: Subscription = JSON.parse(event.data);
      setSubscription(data);
    };

    tracker.register('websocket', () => ws.close());

    // Polling fallback
    const interval = setInterval(async () => {
      const response = await subscriptionService.get(propertyId);
      setSubscription(response.data);
    }, 60000);

    tracker.register('polling', () => clearInterval(interval));

    // Event listener
    const handleVisibilityChange = () => {
      if (document.hidden) {
        ws.close();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    tracker.register('visibility', () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    });

    return () => {
      // ✅ Cleanup all at once
      tracker.cleanupAll();

      // Log pending cleanups (should be 0)
      const pending = tracker.getPendingCount();
      if (pending > 0) {
        console.warn(`${pending} cleanups still pending!`);
      }
    };
  }, [propertyId, tracker]);

  return subscription;
}
```

## 🎓 Key Takeaways

1. **Always cleanup** - Event listeners, timers, WebSockets
2. **Limit data size** - Don't accumulate infinite data
3. **Use virtualization** - For large lists
4. **Secure cleanup** - Overwrite sensitive data
5. **Monitor memory** - Use DevTools and custom hooks
6. **Set cache limits** - Don't cache forever
7. **Use stable callbacks** - Prevent unnecessary re-renders
8. **Test on low-end devices** - Memory issues show up faster
