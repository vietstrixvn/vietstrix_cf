/**
 * Property Type Module Type Definitions
 *
 * Domain models and interfaces for property types
 */

import type { UserProb } from '@/types/auth/responses';

// ============================================================================
// PROPERTY TYPE
// ============================================================================

/**
 * PropertyType - Property type/category definition
 */
export interface PropertyType {
  id: string;
  title: string;
  slug: string;
  created_by?: UserProb;
  description: string;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * @deprecated Use PropertyType instead
 */
export type TypeResponse = PropertyType;

/**
 * TypeProp - Minimal property type information
 */
export interface TypeProp {
  id: string;
  title: string;
  slug: string;
}

// ============================================================================
// STATISTICS
// ============================================================================

/**
 * Property statistics
 */
export interface PropertyStat {
  stats: any;
  total: number;
}
