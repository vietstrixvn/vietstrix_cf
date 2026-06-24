# Auth Types Security Guide

## 🔒 Security Considerations

### ⚠️ Sensitive Data Types

Các types sau chứa thông tin nhạy cảm và **KHÔNG NÊN** log hoặc expose:

#### 1. **Tokens & Secrets**

```typescript
// ❌ NEVER log these
interface LoginDetail {
  access_token?: string; // 🔴 SENSITIVE
  temp_token?: string; // 🔴 SENSITIVE
}

interface TwoFactorSetupData {
  secret: string; // 🔴 HIGHLY SENSITIVE
  qr_code: string; // 🔴 SENSITIVE
}

interface PasskeyCredentialResponse {
  rawId: string; // 🔴 SENSITIVE
  response: {
    attestationObject: string; // 🔴 SENSITIVE
    clientDataJSON: string; // 🔴 SENSITIVE
  };
}
```

#### 2. **User Credentials**

```typescript
// ❌ NEVER store in plain text or log
interface LoginRequest {
  username: string; // ⚠️ PII
  password: string; // 🔴 HIGHLY SENSITIVE
}

interface TwoFactorDisableRequest {
  password: string; // 🔴 HIGHLY SENSITIVE
  code: string; // 🔴 SENSITIVE
}
```

#### 3. **Personal Information (PII)**

```typescript
// ⚠️ Handle with care, comply with GDPR/privacy laws
interface UserDetail {
  email: string; // ⚠️ PII
  phone_number: string; // ⚠️ PII
  first_name: string; // ⚠️ PII
  last_name: string; // ⚠️ PII
  ip_address?: string; // ⚠️ PII
}
```

## 🛡️ Security Best Practices

### 1. Type Visibility

```typescript
// ✅ GOOD - Internal types không export
interface InternalAuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

// ✅ GOOD - Public types chỉ expose cần thiết
export interface PublicUserInfo {
  id: string;
  username: string;
  // NO sensitive fields
}
```

### 2. Sanitized Types for Logging

```typescript
// ✅ GOOD - Sanitized version for logging
export interface UserDetailSanitized {
  id: string;
  username: string;
  account_type: string;
  is_active: boolean;
  // NO email, phone, tokens
}

// Helper function
export function sanitizeUserDetail(user: UserDetail): UserDetailSanitized {
  return {
    id: user.id,
    username: user.username || 'unknown',
    account_type: user.account_type,
    is_active: user.is_active,
  };
}
```

### 3. Token Handling

```typescript
// ✅ GOOD - Never log tokens
function handleLogin(response: LoginDetail) {
  if (response.access_token) {
    // Store securely
    secureStorage.setToken(response.access_token);

    // ❌ NEVER DO THIS
    // console.log('Token:', response.access_token);

    // ✅ DO THIS
    console.log('Login successful');
  }
}
```

### 4. Error Messages

```typescript
// ❌ BAD - Exposes sensitive info
throw new Error(`Login failed for ${email} with token ${token}`);

// ✅ GOOD - Generic error
throw new Error('Authentication failed');

// ✅ BETTER - Error code without details
throw new AuthError('AUTH_FAILED', { code: 'INVALID_CREDENTIALS' });
```

## 🔐 Type Access Levels

### Public Types (Safe to Export)

```typescript
// ✅ Can be exported and used anywhere
export interface UserProb {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface SessionResponse {
  id: string;
  expires_at: Date | string;
  is_revoked: string;
  // NO tokens or secrets
}
```

### Internal Types (Keep Private)

```typescript
// ⚠️ Should NOT be exported from module
interface TokenPayload {
  access_token: string;
  refresh_token: string;
}

interface PasswordResetToken {
  token: string;
  expires_at: number;
}
```

### Sensitive Types (Extra Care)

```typescript
// 🔴 HIGHLY SENSITIVE - Minimal exposure
interface TwoFactorSecret {
  secret: string; // TOTP secret
  backup_codes: string[]; // Recovery codes
}

// Only expose through secure, authenticated endpoints
// Never log, never cache, never store in localStorage
```

## 📋 Migration Checklist

When migrating auth types:

- [ ] Review each type for sensitive data
- [ ] Mark sensitive fields with comments
- [ ] Create sanitized versions for logging
- [ ] Ensure tokens are never logged
- [ ] Check PII handling compliance
- [ ] Verify no secrets in error messages
- [ ] Test with security team
- [ ] Document security considerations

## 🚨 Red Flags

Watch out for:

1. **Logging sensitive data**

   ```typescript
   // ❌ NEVER
   console.log('User data:', userDetail);
   console.log('Token:', accessToken);
   ```

2. **Storing tokens in localStorage**

   ```typescript
   // ❌ VULNERABLE to XSS
   localStorage.setItem('token', accessToken);

   // ✅ Use httpOnly cookies or secure storage
   ```

3. **Exposing internal auth state**

   ```typescript
   // ❌ BAD
   export const authStore = {
     accessToken: '...',
     refreshToken: '...',
   };

   // ✅ GOOD
   export const authStore = {
     isAuthenticated: boolean,
     // NO tokens exposed
   };
   ```

4. **Detailed error messages**

   ```typescript
   // ❌ Information leakage
   throw new Error(`User ${email} not found in database`);

   // ✅ Generic
   throw new Error('Authentication failed');
   ```

## 🔍 Code Review Checklist

Before merging auth changes:

- [ ] No tokens in console.log
- [ ] No PII in error messages
- [ ] Sensitive types properly marked
- [ ] No secrets in client-side code
- [ ] Proper type visibility (public vs internal)
- [ ] Sanitized types for logging exist
- [ ] Security comments added
- [ ] Team reviewed for security issues

## 📚 References

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [WebAuthn Security Considerations](https://www.w3.org/TR/webauthn-2/#sctn-security-considerations)
