/**
 * Portfolio Tag Module Type Definitions
 *
 * Domain models and interfaces for portfolio tags
 */

import type { UserProb } from '@/types';

// ============================================================================
// TAG
// ============================================================================

/**
 * Tag - Portfolio tag with full details
 */
export interface Tag {
  id: string;
  title: string;
  slug: string;
  creator: UserProb;
  lang: string;
  user_id: string;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * @deprecated Use Tag instead
 */
export type TagResponse = Tag;

/**
 * TagProp - Minimal tag information
 */
export interface TagProp {
  id: string;
  title: string;
  slug: string;
  user_id: string;
  created_at: Date | string;
  updated_at: Date | string;
}
