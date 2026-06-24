# Store Overview

## Introduction

The Store module is the central state management system for the Vietstrix application, built on [Zustand](https://github.com/pmndrs/zustand). It provides a modular, secure, and scalable architecture for managing authentication, user sessions, and application state.

## Architecture

The store follows a modular architecture with clear separation of concerns:

```
src/store/
├── store.ts              # Main Zustand store configuration
├── api.ts                # API layer for backend communication
├── cookies.ts            # Cookie management utilities
├── utils.ts              # Helper functions and utilities
├── index.ts              # Public exports
└── auth/                 # Authentication module
    ├── authActions.ts    # Authentication actions (login, logout, register)
    ├── twoFactorActions.ts   # 2FA operations
    ├── passkeyActions.ts     # WebAuthn/Passkey operations
    ├── tokenManager.ts       # Secure token management
    ├── tokenRefresh.ts       # Token refresh logic
    ├── tokenHelpers.ts       # Token utility functions
    ├── tokenSecurity.ts      # Token security features
    ├── secureStorage.ts      # Encrypted storage layer
    ├── csrfProtection.ts     # CSRF protection
    ├── rateLimiter.ts        # Rate limiting
    ├── refreshMutex.ts       # Prevent concurrent refreshes
    └── constants.ts          # Configuration constants
```

## Core Features

### 1. **State Management**

- Centralized state using Zustand
- Persistent storage with selective serialization
- Computed properties for derived state
- Type-safe state access

### 2. **Security**

- Memory-first token storage (XSS protection)
- Token fingerprinting and validation
- CSRF protection
- Rate limiting
- Secure encrypted storage
- Token rotation and lifecycle management

### 3. **Authentication**

- Username/password authentication
- Two-Factor Authentication (2FA/TOTP)
- WebAuthn/Passkey support
- Automatic token refresh
- Session management

### 4. **API Integration**

- Centralized API layer
- Error handling and response validation
- Automatic retry logic
- Request/response interceptors

## Key Modules

### Auth Store (`store.ts`)

The main authentication store that orchestrates all auth-related state and actions.

**Key State:**

- `accessToken`: Current JWT access token
- `tokenExpiresAt`: Token expiration timestamp
- `isAuthenticated`: Authentication status
- `userInfo`: Current user information
- `requiresTwoFactor`: 2FA requirement flag
- `registeredPasskeys`: List of registered passkeys

**Key Actions:**

- `login()`: Authenticate user
- `logout()`: End user session
- `register()`: Create new account
- `refreshToken()`: Refresh access token
- `setupTwoFactor()`: Initialize 2FA
- `beginPasskeyRegistration()`: Start passkey registration

### API Layer (`api.ts`)

Handles all HTTP communication with the backend.

**API Modules:**

- `AuthAPI`: Authentication endpoints
- `TwoFactorAPI`: 2FA operations
- `PasskeyAPI`: WebAuthn operations

### Token Manager (`auth/tokenManager.ts`)

Secure token storage and lifecycle management.

**Features:**

- Memory-first storage strategy
- Encrypted backup storage
- Token validation and fingerprinting
- Automatic expiry tracking
- Security monitoring

### Cookie Manager (`cookies.ts`)

Client-side cookie management with security features.

**Features:**

- Secure cookie creation
- SameSite and Secure flags
- Automatic expiry handling
- SSR-safe operations

## Usage Examples

### Basic Authentication

```typescript
import { useAuthStore } from '@/store';

// Login
const login = useAuthStore((state) => state.login);
await login('username', 'password');

// Check authentication status
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

// Logout
const logout = useAuthStore((state) => state.logout);
await logout();
```

### Token Management

```typescript
import { useAuthStore } from '@/store';

// Get current token
const accessToken = useAuthStore((state) => state.accessToken);

// Check if token needs refresh
const shouldRefresh = useAuthStore((state) => state.shouldRefreshToken());

// Manually refresh token
const refreshToken = useAuthStore((state) => state.refreshToken);
await refreshToken();
```

### Two-Factor Authentication

```typescript
import { useAuthStore } from '@/store';

// Setup 2FA
const setupTwoFactor = useAuthStore((state) => state.setupTwoFactor);
const setupData = await setupTwoFactor();

// Verify and enable 2FA
const verifyAndEnableTwoFactor = useAuthStore(
  (state) => state.verifyAndEnableTwoFactor
);
await verifyAndEnableTwoFactor('123456');

// Verify 2FA during login
const verifyTwoFactorLogin = useAuthStore(
  (state) => state.verifyTwoFactorLogin
);
await verifyTwoFactorLogin('123456');
```

## Security Considerations

### Token Storage

- **Never** store tokens in localStorage directly (XSS vulnerability)
- Use memory-first storage with encrypted backup
- Tokens are automatically cleared on logout or expiry

### CSRF Protection

- All state-changing requests include CSRF tokens
- Tokens are validated on the server
- Automatic token refresh on expiry

### Rate Limiting

- Login attempts are rate-limited
- Automatic backoff on repeated failures
- Protection against brute force attacks

## Configuration

Key configuration constants in `auth/constants.ts`:

```typescript
export const AUTH_CONFIG = {
  REFRESH_BUFFER: 1800, // Refresh 30 min before expiry
  MAX_REFRESH_RETRIES: 3, // Max retry attempts
  RETRY_DELAY: 2000, // Delay between retries (ms)
  ACCESS_TOKEN_MAX_AGE: 14400, // 4 hours
  REFRESH_TOKEN_MAX_AGE: 6, // 6 days
  STORAGE_KEY: 'auth-storage', // LocalStorage key
  COOKIE_KEY: 'isAuthenticated', // Cookie name
};
```

## Best Practices

1. **Always use the store hooks** - Don't access state directly
2. **Handle loading states** - Show loading indicators during async operations
3. **Handle errors gracefully** - Display user-friendly error messages
4. **Clear sensitive data** - Always clear tokens on logout
5. **Validate tokens** - Check token validity before making requests
6. **Use TypeScript** - Leverage type safety for store state and actions

## Related Documentation

- [Authentication Guide](./authentication.md)
- [Token Management](./token-management.md)
- [Two-Factor Authentication](./two-factor-auth.md)
- [Passkey Authentication](./passkey-auth.md)
- [Security Best Practices](./security.md)
- [API Reference](./api-reference.md)
