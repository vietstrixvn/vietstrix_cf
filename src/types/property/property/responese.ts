import { UserProb } from '@/types/auth/responses';

export interface PropertyProb {
  id: string;
  name: string;
  slug: string;
}

export interface currentSubscriptionResponse {
  id: string;
  plan_code: string;
  status: string;
  expires_at: string | Date;
  trial_ends_at: string | Date | null;
}

export interface KeyProb {
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

export interface PropertyKeys {
  keys: KeyProb[];
  property_id: string;
  property_name: string;
}

export interface PropertyCors {
  allowed_origins: string[];
  property_id: string;
}

export interface PropertyResponse {
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
  current_subscription: currentSubscriptionResponse;
  current_subscription_id: string;
  is_active: boolean;
  is_deleted: boolean;
  delete_scheduled_at: string | Date;
  permanent_delete_at: string | Date;
  created_by: UserProb;
}

export interface PropertyCreateResponse {
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
  addresses: string[];
  domain: string;
  subdomain: string;
  plan: string;
  is_active: boolean;
  is_deleted: boolean;
  delete_scheduled_at: string | Date;
  permanent_delete_at: string | Date;
  property_key: string;
  created_by: UserProb;
}

export interface Ga4Responese {
  id: string;
  property_id: string;
  ga4_id: string;
  is_active: string;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface GtmResponese {
  id: string;
  property_id: string;
  gtm_id: string;
  is_active: string;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface PrometheusResponse {
  graph: string;
}

export interface GrafanaResponse {
  dashboard: string;
  logs: string;
}

export interface EmbedResponse {
  grafana_iframe: string;
  instructions: string;
}

export interface PropertyMonitorResponse {
  property_id: string;
  grafana: GrafanaResponse;
  prometheus: PrometheusResponse;
  embed: EmbedResponse;
}

export interface PropertyGalleryResponse {
  id: string;
  name: string;
  type: string;
  url: string;
  created_at: string | Date;
  updated_at: string | Date;
}
