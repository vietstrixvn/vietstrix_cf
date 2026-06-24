/**
 * Config Module Type Definitions
 *
 * Domain models and interfaces for system configuration
 */

// ============================================================================
// ROOT CONFIG
// ============================================================================

/**
 * RootConfig - Global site configuration
 */
export interface RootConfig {
  id: string;
  gtm_id: string;
  ga4_id: string;
  pixel_id: string;
  gtag_id: string;
  hotjar_id: string;
  clarity_id: string;
  google_site_verification: string;
  bing_site_verification: string;
  robots_txt: string;
  site_name: string;
  site_url: string;
  site_logo_url: string;
  favicon_url: string;
  default_og_image_url: string;
  default_meta_description: string;
  support_email: string;
  facebook_url: string;
  instagram_url: string;
  tiktok_url: string;
  youtube_url: string;
  linkedin_url: string;
  twitter_url: string;
  zalo_oa_id: string;
  zalo_phone: string;
  maintenance_mode: string;
  maintenance_message: string;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * @deprecated Use RootConfig instead
 */
export type RootConfigRespose = RootConfig;

// ============================================================================
// ANALYTICS
// ============================================================================

/**
 * Analytics filters
 */
export interface AnalyticsFilters {
  country: string;
  device_category: string;
  page_path: string;
  session_source: string;
}

/**
 * Analytics metadata
 */
export interface AnalyticsMeta {
  property_id: string;
  start_date: string;
  end_date: string;
  count: number;
  filters: AnalyticsFilters;
}

/**
 * Analytics data point
 */
export interface AnalyticsData {
  active_users: number;
  new_users: number;
  sessions: number;
  page_views: number;
  date: string; // ISO 8601 format
}

/**
 * Analytics response
 */
export interface AnalyticsResponse {
  success: boolean;
  data?: AnalyticsData[];
  meta: AnalyticsMeta;
}

// ============================================================================
// MONITORING
// ============================================================================

/**
 * Prometheus monitoring URLs
 */
export interface PrometheusResponse {
  url: string;
  targets: string;
  alerts: string;
  graph: string;
}

/**
 * Grafana dashboard URLs
 */
export interface GrafanaResponse {
  url: string;
  system_overview: string;
  all_properties: string;
  logs: string;
}

/**
 * Monitoring URLs
 */
export interface MonitorResponse {
  grafana: GrafanaResponse;
  prometheus: PrometheusResponse;
}

// ============================================================================
// HEALTH CHECK
// ============================================================================

/**
 * Health check response
 */
export interface HealthResponse {
  status: string;
  url?: string;
}

/**
 * Service health response
 */
export interface ServiceHealthResponse {
  status: string;
  service: string;
}

/**
 * @deprecated Use ServiceHealthResponse instead
 */
export type SerivceHealthResponse = ServiceHealthResponse;

/**
 * Complete monitoring health check
 */
export interface MonitorHealthResponse {
  application: ServiceHealthResponse;
  database: ServiceHealthResponse;
  cache: ServiceHealthResponse;
  monitoring: {
    grafana: HealthResponse;
    prometheus: HealthResponse;
    loki: HealthResponse;
  };
  infrastructure: {
    nginx: HealthResponse;
    traefik: HealthResponse;
  };
  exporters: {
    node_exporter: HealthResponse;
    postgres_exporter: HealthResponse;
    redis_exporter: HealthResponse;
    nginx_exporter: HealthResponse;
  };
}
