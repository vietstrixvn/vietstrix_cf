import { UserProb } from '@/types/auth/responses';

export interface TagResponse {
  id: string;
  title: string;
  slug: string;
  created_by: UserProb;
  user_id: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface TagProp {
  id: string;
  title: string;
  slug: string;
  user_id: string;
  created_at: Date | string;
  updated_at: Date | string;
}
