/**
 * Auto-sync GBP Reviews to Website Schema
 * 
 * This API route fetches reviews from Google Business Profile API
 * and returns updated schema data for JsonLd component.
 * 
 * Setup:
 * 1. Enable Google My Business API
 * 2. Create service account with Business Profile API access
 * 3. Add credentials to .env
 * 4. Call this API from JsonLd component or cron job
 */

import { NextRequest, NextResponse } from 'next/server';

// Google My Business API endpoint
const GMB_API_BASE = 'https://mybusiness.googleapis.com/v4';

interface GBPReview {
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';
  comment?: string;
  createTime: string;
  updateTime: string;
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
}

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

/**
 * Convert GBP star rating to numeric value
 */
function starRatingToNumber(rating: GBPReview['starRating']): number {
  const map = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
  return map[rating] || 5;
}

/**
 * Fetch reviews from Google My Business API
 */
async function fetchGBPReviews(
  accountId: string,
  locationId: string,
  accessToken: string
): Promise<GBPReview[]> {
  const url = `${GMB_API_BASE}/accounts/${accountId}/locations/${locationId}/reviews`;
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`GBP API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as { reviews?: GBPReview[] };
  return data.reviews || [];
}

/**
 * Calculate aggregate rating from reviews
 */
function calculateAggregateRating(reviews: GBPReview[]): AggregateRating | null {
  if (reviews.length === 0) {
    return null;
  }

  const totalRating = reviews.reduce(
    (sum, review) => sum + starRatingToNumber(review.starRating),
    0
  );
  const avgRating = (totalRating / reviews.length).toFixed(1);

  return {
    '@type': 'AggregateRating',
    ratingValue: avgRating,
    reviewCount: reviews.length.toString(),
    bestRating: '5',
    worstRating: '1',
  };
}

/**
 * Convert GBP reviews to Schema.org format
 */
function convertToSchemaReviews(reviews: GBPReview[]): SchemaReview[] {
  return reviews
    .filter((review) => review.comment) // Only reviews with text
    .slice(0, 10) // Limit to 10 most recent
    .map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.reviewer.displayName,
      },
      datePublished: review.createTime,
      reviewBody: review.comment || '',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: starRatingToNumber(review.starRating).toString(),
        bestRating: '5',
        worstRating: '1',
      },
    }));
}

/**
 * GET /api/gbp-reviews
 * 
 * Fetch and return reviews in Schema.org format
 * 
 * Query params:
 * - includeReviews: Include individual reviews (default: false)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeReviews = searchParams.get('includeReviews') === 'true';

    // Get credentials from environment
    const accountId = process.env.GBP_ACCOUNT_ID;
    const locationId = process.env.GBP_LOCATION_ID;
    const accessToken = process.env.GBP_ACCESS_TOKEN;

    if (!accountId || !locationId || !accessToken) {
      return NextResponse.json(
        {
          error: 'Missing GBP credentials',
          hint: 'Set GBP_ACCOUNT_ID, GBP_LOCATION_ID, GBP_ACCESS_TOKEN in .env',
        },
        { status: 500 }
      );
    }

    // Fetch reviews from GBP API
    const reviews = await fetchGBPReviews(accountId, locationId, accessToken);

    // Calculate aggregate rating
    const aggregateRating = calculateAggregateRating(reviews);

    // Build response
    const response: {
      aggregateRating: AggregateRating | null;
      reviews?: SchemaReview[];
      lastUpdated: string;
      totalReviews: number;
    } = {
      aggregateRating,
      lastUpdated: new Date().toISOString(),
      totalReviews: reviews.length,
    };

    if (includeReviews && reviews.length > 0) {
      response.reviews = convertToSchemaReviews(reviews);
    }

    // Cache for 1 hour
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Error fetching GBP reviews:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch reviews',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Example response:
 * 
 * {
 *   "aggregateRating": {
 *     "@type": "AggregateRating",
 *     "ratingValue": "4.8",
 *     "reviewCount": "12",
 *     "bestRating": "5",
 *     "worstRating": "1"
 *   },
 *   "reviews": [
 *     {
 *       "@type": "Review",
 *       "author": { "@type": "Person", "name": "John Doe" },
 *       "datePublished": "2026-06-15T10:30:00Z",
 *       "reviewBody": "Excellent service!",
 *       "reviewRating": {
 *         "@type": "Rating",
 *         "ratingValue": "5",
 *         "bestRating": "5",
 *         "worstRating": "1"
 *       }
 *     }
 *   ],
 *   "lastUpdated": "2026-07-02T01:53:00Z",
 *   "totalReviews": 12
 * }
 */
