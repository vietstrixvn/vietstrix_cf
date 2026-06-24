import { z } from 'zod';

export const UpdateSiteConfigSchema = z.object({
  gtm_id: z.string().max(50).optional(),
  ga4_id: z.string().max(50).optional(),
  pixel_id: z.string().max(50).optional(),
  gtag_id: z.string().max(50).optional(),
  hotjar_id: z.string().max(50).optional(),
  clarity_id: z.string().max(50).optional(),

  google_site_verification: z.string().max(255).optional(),
  bing_site_verification: z.string().max(255).optional(),

  robots_txt: z.string().optional(),

  site_name: z.string().min(1, 'Site name is required').max(255),
  site_url: z.string().url('Invalid URL'),

  site_logo_url: z.string().url().optional(),
  favicon_url: z.string().url().optional(),
  default_og_image_url: z.string().url().optional(),

  default_meta_description: z.string().max(500).optional(),

  support_email: z.string().email('Invalid email').optional(),

  facebook_url: z.string().url().optional(),
  instagram_url: z.string().url().optional(),
  tiktok_url: z.string().url().optional(),
  youtube_url: z.string().url().optional(),
  linkedin_url: z.string().url().optional(),
  twitter_url: z.string().url().optional(),

  zalo_oa_id: z.string().max(50).optional(),
  zalo_phone: z.string().max(20).optional(),

  maintenance_mode: z.enum(['true', 'false']).optional(),
  maintenance_message: z.string().max(1000).optional(),
});

export type UpdateSiteConfigDTO = z.infer<typeof UpdateSiteConfigSchema>;

export const CreateTypeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50),
  slug: z.string().max(20).optional(),
  description: z.string().max(200).optional(),
  icon: z.string().max(100).optional(),
  color: z.string().max(20).optional(),
});

export type CreateTypeDTO = z.infer<typeof CreateTypeSchema>;
