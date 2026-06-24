import { z } from 'zod';

export const AddMediaSchema = z.object({
  images: z
    .array(
      z.object({
        media_id: z.number().refine((val) => !isNaN(val), {
          message: 'media_id must be a number',
        }),
      })
    )
    .min(1, 'At least one image is required'),
});

export type AddMediaDTO = z.output<typeof AddMediaSchema>;

export const CreateGallerySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
});

export type CreateGalleryDTO = z.output<typeof CreateGallerySchema>;
