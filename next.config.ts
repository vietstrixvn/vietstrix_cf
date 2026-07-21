import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	reactStrictMode: true,

	// Optimize CSS and JavaScript
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},

	// Enable experimental features for better performance
	experimental: {
		optimizePackageImports: ['react-icons', 'lucide-react'],
	},

	images: {
		qualities: [60, 75],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'hcm03.vstorage.vngcloud.vn',
			},
			{
				protocol: 'https',
				hostname: 'api.dicebear.com',
			},
		],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},

	async rewrites() {
		// Use environment variable for API URL
		const apiUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

		return [
			{
				source: '/api/root/v1/:path*',
				destination: `${apiUrl}/api/root/v1/:path*`,
			},
		];
	},

	async headers() {
		return [
			{
				source: '/services',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=0, s-maxage=300, stale-while-revalidate=60',
					},
				],
			},
			{
				source: '/:locale(en|vi)/services',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=0, s-maxage=300, stale-while-revalidate=60',
					},
				],
			},
			{
				source: '/vi/dich-vu',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=0, s-maxage=300, stale-while-revalidate=60',
					},
				],
			},
			{
				source: '/:all*(svg|jpg|png|webp|avif)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/_next/static/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/admin/monitor/:path*',
				headers: [
					{
						key: 'Content-Security-Policy',
						value:
							"default-src 'self'; frame-src 'self' http://localhost:3001 https://*.grafana.net; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
					},
				],
			},
		];
	},
};
export default withNextIntl(nextConfig);
