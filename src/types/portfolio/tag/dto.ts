import { z } from 'zod';

export const CreateTagSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  slug: z.string().max(50).optional(),
  lang: z.string().min(1, 'Lang is required').max(100),
});

export type CreateTagDTO = z.output<typeof CreateTagSchema>;

export const UpdateTagSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  slug: z.string().max(50).optional(),
});

export type UpdateTagDTO = z.infer<typeof UpdateTagSchema>;
