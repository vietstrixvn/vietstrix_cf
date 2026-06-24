import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().max(50).optional(),
  lang: z.string().min(1, 'Lang is required').max(100),
  status: z.string().max(50).optional(),
  description: z.string().min(1, 'Description is required').max(50000),
  category_id: z.string().min(1, 'Category is required').max(100),
  image_ids: z.array(z.string().max(500)).optional(),
  tag_ids: z.array(z.string()).optional(),
});

export type CreatePostDTO = z.output<typeof CreatePostSchema>;

export const UpdatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().max(50).optional(),
  status: z.string().max(50).optional(),
  description: z.string().min(1, 'Description is required').max(50000),
  category_id: z.string().min(1, 'Category is required').max(100),
  image_ids: z.array(z.string().max(500)).optional(),
  tag_ids: z.array(z.string()).optional(),
});

export type UpdatePostDTO = z.infer<typeof UpdatePostSchema>;
