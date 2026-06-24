import { logDebug, logError, logWarn } from '@/utils';

/**
 * Revalidate Next.js cache by path or tag
 * Gọi API route /api/revalidate để làm mới ISR cache và Cloudflare cache
 */
export async function revalidateCache(options: {
  path?: string;
  tag?: string;
  urls?: string[];
  purgeEverything?: boolean;
}) {
  try {
    const secret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET;

    if (!secret) {
      logWarn(' REVALIDATE_SECRET not configured');
      return;
    }

    const response = await fetch('/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...options,
        secret,
      }),
    });

    if (!response.ok) {
      logError(' Failed to revalidate cache:', await response.text());
      return;
    }

    const data = (await response.json()) as {
      cloudflare?: {
        success: boolean;
        message: string;
      };
    };

    // Log kết quả Cloudflare
    if (data.cloudflare?.success === false) {
      logWarn(' Cloudflare purge failed:', data.cloudflare.message);
    } else if (data.cloudflare?.success) {
      logDebug(' Cloudflare cache purged successfully');
    }

    return data;
  } catch (error) {
    logError(' Error revalidating cache:', error);
  }
}
