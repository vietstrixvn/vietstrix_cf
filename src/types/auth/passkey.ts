/**
 * ==========================
 * 🔐 Passkey Authentication Types
 * ==========================
 *
 * Types for WebAuthn/FIDO2 passkey authentication
 */

import { BaseResponse } from '@/types';

/**
 * Passkey Registration - Begin
 */
export interface PasskeyRegistrationBeginRequest {
  name: string; // Device name (e.g., "iPhone 15 Pro")
}

export interface PasskeyPublicKeyCredentialCreationOptions {
  challenge: string;
  rp: {
    name: string;
    id: string;
  };
  user: {
    id: string;
    name: string;
    displayName: string;
  };
  pubKeyCredParams: Array<{
    type: string;
    alg: number;
  }>;
  timeout: number;
  attestation: string;
  authenticatorSelection?: {
    authenticatorAttachment?: 'platform' | 'cross-platform';
    requireResidentKey?: boolean;
    residentKey?: 'discouraged' | 'preferred' | 'required';
    userVerification?: 'required' | 'preferred' | 'discouraged';
  };
  excludeCredentials?: Array<{
    type: string;
    id: string;
  }>;
}

export interface PasskeyRegistrationBeginData {
  options: {
    publicKey: PasskeyPublicKeyCredentialCreationOptions;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PasskeyRegistrationBeginResponse extends BaseResponse<PasskeyRegistrationBeginData> {}

/**
 * Passkey Registration - Finish
 */
export interface PasskeyCredentialResponse {
  id: string;
  rawId: string;
  response: {
    attestationObject: string;
    clientDataJSON: string;
  };
  type: string;
}

export interface PasskeyRegistrationFinishRequest {
  name: string;
  credential: PasskeyCredentialResponse;
}

export interface PasskeyRegistrationFinishData {
  credential_id: string;
  name: string;
  created_at: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PasskeyRegistrationFinishResponse extends BaseResponse<PasskeyRegistrationFinishData> {}

/**
 * Passkey Login - Begin
 */
export interface PasskeyLoginBeginRequest {
  username?: string; // Optional - omit for discoverable login
}

export interface PasskeyPublicKeyCredentialRequestOptions {
  challenge: string;
  timeout: number;
  rpId: string;
  allowCredentials: Array<{
    type: string;
    id: string;
  }>;
  userVerification: 'required' | 'preferred' | 'discouraged';
}

export interface PasskeyLoginBeginData {
  options: {
    publicKey: PasskeyPublicKeyCredentialRequestOptions;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PasskeyLoginBeginResponse extends BaseResponse<PasskeyLoginBeginData> {}

/**
 * Passkey Login - Finish
 */
export interface PasskeyLoginCredentialResponse {
  id: string;
  rawId: string;
  response: {
    authenticatorData: string;
    clientDataJSON: string;
    signature: string;
    userHandle: string;
  };
  type: string;
}

export interface PasskeyLoginFinishRequest {
  credential: PasskeyLoginCredentialResponse;
}

export interface PasskeyLoginFinishData {
  access_token: string;
  token_type: string;
  expires_in: number;
  user_id: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PasskeyLoginFinishResponse extends BaseResponse<PasskeyLoginFinishData> {}

/**
 * Passkey List
 */
export interface PasskeyItem {
  id: string;
  credential_id: string;
  name: string;
  created_at: string;
  last_used_at: string | null;
  aaguid: string;
  transports: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PasskeyListResponse extends BaseResponse<PasskeyItem[]> {}

/**
 * Passkey Detail
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PasskeyDetailResponse extends BaseResponse<PasskeyItem> {}

/**
 * Passkey State in Auth Store
 */
export interface PasskeyState {
  passkeyRegistrationOptions: PasskeyRegistrationBeginData | null;
  passkeyLoginOptions: PasskeyLoginBeginData | null;
  registeredPasskeys: PasskeyItem[];
}

/**
 * Passkey Actions in Auth Store
 */
export interface PasskeyActions {
  // Registration
  beginPasskeyRegistration: (
    name: string
  ) => Promise<PasskeyRegistrationBeginData | null>;
  finishPasskeyRegistration: (
    name: string,
    credential: any
  ) => Promise<boolean>;

  // Login
  beginPasskeyLogin: (
    username?: string
  ) => Promise<PasskeyLoginBeginData | null>;
  finishPasskeyLogin: (credential: any) => Promise<boolean>;

  // Management
  listPasskeys: () => Promise<PasskeyItem[]>;
  deletePasskey: (id: string) => Promise<boolean>;

  // Clear state
  clearPasskeyState: () => void;
}

/**
 * WebAuthn Browser Support
 */
export interface WebAuthnSupport {
  isSupported: boolean;
  isPlatformAuthenticatorAvailable: boolean;
  isConditionalMediationAvailable: boolean;
}
