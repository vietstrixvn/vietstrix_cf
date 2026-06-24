/**
 * Property Type Utilities
 *
 * Response wrappers and type aliases
 */

import type { PaginatedResponse } from '@/types/base/base.type';
import type { Property, PropertyGallery } from './responses';

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Paginated properties response
 */
export type FetchPropertyListResponse = PaginatedResponse<Property>;

/**
 * Paginated property gallery response
 */
export type FetchPropertyGalleryResponse = PaginatedResponse<PropertyGallery>;
