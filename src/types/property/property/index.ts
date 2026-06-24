/**
 * Property Module Exports
 *
 * Public API for property types
 */

// Domain models
export type {
  PropertyProb,
  CurrentSubscription,
  Property,
  PropertyCreateResponse,
  PropertyKey,
  PropertyKeys,
  PropertyCors,
  Ga4Config,
  GtmConfig,
  PrometheusResponse,
  GrafanaResponse,
  EmbedResponse,
  PropertyMonitorResponse,
  PropertyGallery,
  // Deprecated
  currentSubscriptionResponse,
  PropertyResponse,
  KeyProb,
  Ga4Responese,
  GtmResponese,
  PropertyGalleryResponse,
} from './responses';

// Response types
export type {
  FetchPropertyListResponse,
  FetchPropertyGalleryResponse,
} from './type';

// Component props
export type {
  PropertyListProps,
  PropertyGroupCardProps,
  CorsConfigCardProps,
} from './prop';
