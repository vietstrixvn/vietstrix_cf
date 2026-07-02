'use client';

import { useEffect, useState } from 'react';

interface AggregateRating {
  '@type': 'AggregateRating';
  ratingValue: string;
  reviewCount: string;
  bestRating?: string;
  worstRating?: string;
}

interface SchemaReview {
  '@type': 'Review';
  author: {
    '@type': 'Person';
    name: string;
  };
  datePublished: string;
  reviewBody: string;
  reviewRating: {
    '@type': 'Rating';
    ratingValue: string;
    bestRating: string;
    worstRating: string;
  };
}

interface GBPReviewsData {
  aggregateRating: AggregateRating | null;
  reviews?: SchemaReview[];
  lastUpdated: string;
  totalReviews: number;
}

/**
 * Client-side hook to fetch GBP reviews
 * 
 * Usage:
 * const { aggregateRating, reviews, loading, error } = useGBPReviews({ includeReviews: true });
 */
export function useGBPReviews(options?: { includeReviews?: boolean }) {
  const [data, setData] = useState<GBPReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const params = new URLSearchParams();
        if (options?.includeReviews) {
          params.set('includeReviews', 'true');
        }

        const response = await fetch(`/api/gbp-reviews?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = (await response.json()) as GBPReviewsData;
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [options?.includeReviews]);

  return {
    aggregateRating: data?.aggregateRating || null,
    reviews: data?.reviews || [],
    totalReviews: data?.totalReviews || 0,
    lastUpdated: data?.lastUpdated,
    loading,
    error,
  };
}

/**
 * Server-side function to fetch reviews (for SSR/SSG)
 */
export async function fetchGBPReviews(options?: {
  includeReviews?: boolean;
}): Promise<GBPReviewsData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vietstrix.com';
    const params = new URLSearchParams();
    
    if (options?.includeReviews) {
      params.set('includeReviews', 'true');
    }

    const response = await fetch(`${baseUrl}/api/gbp-reviews?${params.toString()}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch GBP reviews:', response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GBP reviews:', error);
    return null;
  }
}
