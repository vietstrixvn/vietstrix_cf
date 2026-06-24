import { endpoints, handleAPI } from '@/apis';
import { logError } from '@/utils';
import { unstable_cache } from 'next/cache';

interface GetCategoriesOptions {
  type?: string | null;
  status?: 'show' | 'hide' | 'draft';
  pageSize?: number;
  lang?: string;
}

// Fetch categories với Next.js cache cho ISR
export const getCategories = async (
  options: GetCategoriesOptions = {}
): Promise<any[]> => {
  const { type = null, status = 'show', pageSize = 100, lang = 'vi' } = options;

  // Create cache key based on options
  const cacheKey = `categories-${type || 'all'}-${status}-${pageSize}-${lang}`;

  return unstable_cache(
    async () => {
      try {
        const params = new URLSearchParams({
          status,
          page_size: pageSize.toString(),
          lang, // Changed from 'locale' back to 'lang' to match backend expectation
        });

        if (type) {
          params.append('type', type);
        }

        const response = await handleAPI<any>(
          `${endpoints.cms.categories.list}?${params.toString()}`,
          'GET',
          undefined,
          {
            ...(process.env.NEXT_PUBLIC_SECRET_KEY && {
              'X-Property-Key': process.env.NEXT_PUBLIC_SECRET_KEY,
            }),
          }
        );

        return response?.data?.results || [];
      } catch (error) {
        logError('[getCategories] Error fetching categories:', error);
        return [];
      }
    },
    [cacheKey],
    {
      revalidate: 3600,
      tags: ['categories'],
    }
  )();
};
