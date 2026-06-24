import { endpoints, handleAPI } from '@/apis';
import { logError } from '@/utils';
import { unstable_cache } from 'next/cache';

interface GetMentionsOptions {
  page?: number;
  pageSize?: number;
  type?: string | null;
  status?: 'show' | 'hide' | 'draft';
}

// Fetch posts với Next.js cache cho ISR
export const getMentions = async (options: GetMentionsOptions = {}): Promise<any> => {
  const {
    page = 1,
    pageSize = 12,
    type = null,
    status = 'show',
  } = options;

  // Create cache key based on options
  const cacheKey = `mentions-${page}-${pageSize}-${type || 'all'}-${status}`;

  return unstable_cache(
    async () => {
      try {
        const params = new URLSearchParams({
          status,
          page: page.toString(),
          page_size: pageSize.toString(),
        });

        if (type) {
          params.append('type', type);
        }

        const url = `${endpoints.cms.mentions.list}?${params.toString()}`;

        const response = await handleAPI<any>(url, 'GET');

        return {
          mentions: response?.data?.results || [],
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
        logError('[getMentions] Error fetching mentions:', error);
        return {
          mentions: [],
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
      tags: ['mentions'],
    }
  )();
};
