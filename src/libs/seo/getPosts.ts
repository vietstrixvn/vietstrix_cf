import { endpoints, handleAPI } from '@/apis';
import { logError } from '@/utils';
import { unstable_cache } from 'next/cache';

interface GetPostsOptions {
  page?: number;
  pageSize?: number;
  type?: string | null;
  categoryId?: string | null;
  status?: 'show' | 'hide' | 'draft';
  lang?: string;
  search?: string | null;
}

// Fetch posts với Next.js cache cho ISR
export const getPosts = async (options: GetPostsOptions = {}): Promise<any> => {
  const {
    page = 1,
    pageSize = 12,
    type = null,
    categoryId = null,
    status = 'show',
    lang = 'vi',
    search = null,
  } = options;

  // Create cache key based on options
  const cacheKey = `posts-${page}-${pageSize}-${type || 'all'}-${categoryId || 'all'}-${status}-${lang}-${search || 'none'}`;

  return unstable_cache(
    async () => {
      try {
        const params = new URLSearchParams({
          status,
          page: page.toString(),
          page_size: pageSize.toString(),
          lang,
        });

        if (type) {
          params.append('type', type);
        }

        if (categoryId) {
          params.append('category_id', categoryId);
        }

        if (search) {
          params.append('search', search);
        }

        const url = `${endpoints.cms.portfolios.list}?${params.toString()}`;

        const response = await handleAPI<any>(url, 'GET');

        return {
          posts: response?.data?.results || [],
          pagination: response?.data?.pagination || {
            current_page: 1,
            page_size: pageSize,
            total_pages: 1,
            total_records: 0,
            has_next: false,
            has_prev: false,
          },
        };
      } catch (error) {
        logError('[getPosts] Error fetching posts:', error);
        return {
          posts: [],
          pagination: {
            current_page: 1,
            page_size: 12,
            total_pages: 1,
            total_records: 0,
            has_next: false,
            has_prev: false,
          },
        };
      }
    },
    [cacheKey],
    {
      revalidate: 3600,
      tags: ['posts'],
    }
  )();
};
