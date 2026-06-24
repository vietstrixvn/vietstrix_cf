/**
 * Config Statistics Type Definitions
 *
 * Statistics and metrics for system configuration
 */

import type { PaginatedResponse } from '../base/base.type';

// ============================================================================
// PROPERTY STATISTICS
// ============================================================================

/**
 * Property type statistics (dynamic keys)
 */
export interface StatTypeResponse {
  [key: string]: number;
}

/**
 * Property statistics
 */
export interface PropertyStatResponse {
  total: number;
  stats: StatTypeResponse;
}

// ============================================================================
// OVERVIEW STATISTICS
// ============================================================================

/**
 * System overview statistics
 */
export interface OverviewStatResponse {
  total_properties: number;
  active_properties: number;
  suspended_properties: number;
  total_users: number;
  property_users: number;
  admin_users: number;
  open_tickets: number;
  active_sessions: number;
}

// ============================================================================
// HEALTH SCORE
// ============================================================================

/**
 * Property health score
 */
export interface HealthScore {
  property_id: string;
  property_name: string;
  user_count: number;
  content_count: number;
  activity_rate: number;
  ticket_score: number;
  engagement: number;
}

/**
 * @deprecated Use HealthScore instead
 */
export type HealthScoreResponse = HealthScore;

/**
 * Health score metadata
 */
export interface MetaScoreResponse {
  count: number;
  dimensions: string[];
}

/**
 * Health score statistics response
 */
export interface HealthScoreStatResponse {
  items: HealthScore[];
  meta: MetaScoreResponse;
}

// ============================================================================
// PROPERTY STATUS
// ============================================================================

/**
 * Property status statistics
 */
export interface PropertyStatus {
  status: string;
  count: number;
  percentage: number;
}

/**
 * @deprecated Use PropertyStatus instead
 */
export type PropertyStatusResponse = PropertyStatus;

/**
 * Property status statistics response
 */
export interface PropertyStatusStatResponse {
  items: PropertyStatus[];
  meta: {
    total_properties: number;
  };
}

// ============================================================================
// TOP PROPERTIES
// ============================================================================

/**
 * Top property by count
 */
export interface TopProperty {
  property_id: string;
  property_name: string;
  user_count: number;
}

/**
 * @deprecated Use TopProperty instead
 */
export type TopCountPropertyResponse = TopProperty;

/**
 * Paginated top properties response
 */
export type FetchTopPropertiesResponse = PaginatedResponse<TopProperty>;

/**
 * @deprecated Use FetchTopPropertiesResponse instead
 */
export type TopPropertyStatResponse = FetchTopPropertiesResponse;
