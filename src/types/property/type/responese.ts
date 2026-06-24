import { UserProb } from '@/types/auth/responses';

export interface TypeResponse {
  id: string;
  title: string;
  slug: string;
  created_by?: UserProb;
  description: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface TypeProp {
  id: string;
  title: string;
  slug: string;
}

export interface PropertyStat {
  stats: any;
  total: number;
}
