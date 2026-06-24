/**
 * Media Type Utilities
 *
 * Response wrappers and type aliases for media module
 */

import type { PaginatedResponse, PaginationData } from '../base/base.type';
import type { GalleryResponse, ImageProp } from './responses';

// ============================================================================
// REQUEST TYPES
// ============================================================================

export interface PresignItem {
  file_name: string;
  type?: 'image' | 'video' | 'document';
  module: string;
}

export interface DeleteMedia {
  ids: string[];
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

export interface PresignResponse {
  created_at: string | Date;
  expires_in: number;
  id: string;
  max_size: string;
  method: string;
  upload_url: string;
  module: string;
}

export interface SubmitMediaResponse {
  created_at: string | Date;
  id: string;
  is_deleted: string;
  module: string;
  name: string;
  path: string;
  property_id: string;
  resource: string;
  resource_id: string;
  status: string;
  type: string;
  updated_at: string | Date;
  url: string;
  user_id: string;
}

/**
 * Paginated galleries response
 */
export type FetchGalleryResponse = PaginatedResponse<GalleryResponse>;

/**
 * Gallery detail with images (custom response structure)
 */
export interface FetchGalleryDetailResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
  total_images: number;
  images: ImageProp[];
  pagination: PaginationData;
}
