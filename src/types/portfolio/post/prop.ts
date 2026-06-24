/**
 * Portfolio Post Component Props
 *
 * Props interfaces for post-related components
 */

import type { Post } from './responses';
import type { PaginationData } from '@/types/base/base.type';

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * Props for PostTable component
 */
export interface PostTableProps {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  refreshKey: () => void;
}

/**
 * Props for BlogList component
 */
export interface BlogListProps {
  post: Post[];
  recentPosts: Post[];
  categories: any[];
  pagination: PaginationData;
  currentPage: number;
  isLoading?: boolean;
  initialSearch?: string;
}

/**
 * Props for ProjectList component
 */
export interface ProjectListProps {
  project: Post[];
  categories: any[];
  pagination: PaginationData;
  currentPage: number;
  isLoading?: boolean;
}

/**
 * Props for PostTypeSelect component
 */
export interface PostTypeSelectProps {
  selectedType: string;
  handleTypeChange: (value: string, slug?: string) => void;
  defaultType?: string;
}

/**
 * Props for PostLangSelect component
 */
export interface PostLangSelectProps {
  selectedLang: string;
  handleLangChange: (value: string, slug?: string) => void;
  defaultLang?: string;
}
