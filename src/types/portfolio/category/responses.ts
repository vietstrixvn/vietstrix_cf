/**
 * Portfolio Category Module Type Definitions
 *
 * Domain models and interfaces for portfolio categories
 */

import type { UserProb } from '@/types/auth/responses';
import type { ImageProp } from '../../media/responses';

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Category visibility status
 */
export enum CategoryStatus {
  SHOW = 'show',
  HIDE = 'hide',
}

// ============================================================================
// CATEGORY
// ============================================================================

/**
 * Category - Portfolio category with full details
 */
export interface Category {
  id: string;
  title: string;
  slug: string;
  image_media?: ImageProp;
  image_id?: string;
  creator: UserProb;
  description: string;
  type: string;
  lang: string;
  status: string;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * @deprecated Use Category instead
 */
export type CategoryResponse = Category;

/**
 * CategoryData - Minimal category information
 */
export interface CategoryData {
  id: string;
  title: string;
  slug: string;
}

/**
 * CategoryProp - Category with basic fields
 */
export interface CategoryProp {
  id: string;
  title: string;
  slug: string;
  created_at: Date | string;
  updated_at: Date | string;
  status: string;
}
