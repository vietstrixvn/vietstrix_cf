/**
 * Property Module Type Definitions
 *
 * Domain models and interfaces for properties
 */

import type { UserProb } from '@/types/auth/responses';

// ============================================================================
// PROPERTY
// ============================================================================

/**
 * PropertyProb - Minimal property information
 */
export interface PropertyProb {
  id: string;
  name: string;
  slug: string;
}

/**
 * Current subscription information
 */
export interface CurrentSubscription {
  id: string;
  plan_code: string;
  status: string;
  expires_at: string | Date;
  trial_ends_at: string | Date | null;
}

/**
 * @deprecated Use CurrentSubscription instead
 */
export type currentSubscriptionResponse = CurrentSubscription;

/**
 * Property - Complete property information
 */
export interface Property {
  id: string;
  created_at: string | Date;
  updated_at: string | Date;
  name: string;
  slug: string;
  description: string;
  email: string;
  phone_number: string;
  map: string;
  image_url: number;
  status: string;
  addresses: string;
  domain: string;
  subdomain: string;
  disabled_at: string | Date | null;
  grace_period_ends_at: string | Date | null;
  current_subscription: CurrentSubscription;
  current_subscription_id: string;
  is_active: boolean;
  is_deleted: boolean;
  delete_scheduled_at: string | Date;
  permanent_delete_at: string | Date;
  created_by?: UserProb;
}

/**
 * @deprecated Use Property instead
 */
export type PropertyResponse = Property;

/**
 * Property creation response
 */
export interface PropertyCreateResponse {
  id: string;
  created_at: string | Date;
  updated_at: string | Date;
  name: string;
  slug: string;
  description: string | null;
  email: string;
  phone_number: string;
  map: string | null;
  image_url: string | null;
  status: string;
  addresses: string[] | null;
  domain: string | null;
  subdomain: string;
  current_subscription_id: string;
  is_active: boolean;
  current_subscription: CurrentSubscription;
  allowed_origins: string[];
  is_deleted: boolean;
  delete_scheduled_at: string | Date | null;
  permanent_delete_at: string | Date | null;
  property_key: string;
  created_by: UserProb;
}

// ============================================================================
// PROPERTY KEYS
// ============================================================================

/**
 * Property API key
 */
export interface PropertyKey {
  id: string;
  property_id: string;
  key_value: string;
  key_type: string;
  is_active: boolean;
  request_count: number;
  rate_limit_per_minute: number;
  created_at: string | Date;
  updated_at: string | Date;
}

/**
 * @deprecated Use PropertyKey instead
 */
export type KeyProb = PropertyKey;

/**
 * Property keys collection
 */
export interface PropertyKeys {
  keys: PropertyKey[];
  property_id: string;
  property_name: string;
}

// ============================================================================
// PROPERTY CORS
// ============================================================================

/**
 * Property CORS configuration
 */
export interface PropertyCors {
  allowed_origins: string[];
  property_id: string;
}

// ============================================================================
// ANALYTICS
// ============================================================================

/**
 * GA4 configuration
 */
export interface Ga4Config {
  id: string;
  property_id: string;
  ga4_id: string;
  is_active: string;
  created_at: string | Date;
  updated_at: string | Date;
}

/**
 * @deprecated Use Ga4Config instead
 */
export type Ga4Responese = Ga4Config;

/**
 * GTM configuration
 */
export interface GtmConfig {
  id: string;
  property_id: string;
  gtm_id: string;
  is_active: string;
  created_at: string | Date;
  updated_at: string | Date;
}

/**
 * @deprecated Use GtmConfig instead
 */
export type GtmResponese = GtmConfig;

// ============================================================================
// MONITORING
// ============================================================================

/**
 * Prometheus monitoring URLs
 */
export interface PrometheusResponse {
  graph: string;
}

/**
 * Grafana dashboard URLs
 */
export interface GrafanaResponse {
  dashboard: string;
  logs: string;
}

/**
 * Embed configuration
 */
export interface EmbedResponse {
  grafana_iframe: string;
  instructions: string;
}

/**
 * Property monitoring response
 */
export interface PropertyMonitorResponse {
  property_id: string;
  grafana: GrafanaResponse;
  prometheus: PrometheusResponse;
  embed: EmbedResponse;
}

// ============================================================================
// GALLERY
// ============================================================================

/**
 * Property gallery item
 */
export interface PropertyGallery {
  id: string;
  name: string;
  type: string;
  url: string;
  created_at: string | Date;
  updated_at: string | Date;
}

/**
 * @deprecated Use PropertyGallery instead
 */
export type PropertyGalleryResponse = PropertyGallery;
