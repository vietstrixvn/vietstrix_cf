import { z } from 'zod';

export const CreateCategorySchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  slug: z.string().max(50).optional(),
  status: z.string().max(50).optional(),
  type: z.string().min(1, 'Type is required').max(100),
  lang: z.string().min(1, 'Lang is required').max(100),
  image_id: z.string().max(500).optional(),
});

export type CreateCategoryDTO = z.output<typeof CreateCategorySchema>;

export const UpdateCategorySchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  slug: z.string().max(50).optional(),
  status: z.string().max(50).optional(),
  image_id: z.string().max(500).optional(),
});

export type UpdateCategoryDTO = z.infer<typeof UpdateCategorySchema>;
