/**
 * Portfolio Post Module Type Definitions
 *
 * Domain models and interfaces for portfolio posts (blogs, projects)
 */

import type { TagProp } from '@/types/property';
import type { CategoryProp } from '../category/responses';
import type { UserProb, ImageProp } from '@/types';

// ============================================================================
// POST
// ============================================================================

/**
 * Post - Portfolio post (blog or project)
 */
export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  image_id?: string;
  lang: string;
  images?: ImageProp[];
  category: CategoryProp;
  tags: TagProp[];
  user_id: string;
  status: string;
  creator: UserProb;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * @deprecated Use Post instead
 */
export type PostResponse = Post;

// ============================================================================
// STATISTICS
// ============================================================================

/**
 * Portfolio statistics
 */
export interface PortfolioStatResponse {
  by_type: any;
  updated_at: Date | string;
  total_categories: number;
  total: number;
}


// ============================================================================
// ENUMS
// ============================================================================

/**
 * Category visibility status
 */
export enum MentionStatus {
  SHOW = 'show',
  HIDE = 'hide',
}

// ============================================================================
// CATEGORY
// ============================================================================

/**
 * Category - Portfolio category with full details
 */
export interface Mention {
  id: string;
  before: string;
  after: string;
  name: string;
  title: string;
  image_media?: ImageProp;
  image_id?: string;
  creator: UserProb;
  url: string;
  status: string;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * @deprecated Use Category instead
 */
export type MentionResponse = Mention;

/**
 * CategoryData - Minimal category information
 */
export interface MentionData {
  id: string;
  title: string;
  slug: string;
}
