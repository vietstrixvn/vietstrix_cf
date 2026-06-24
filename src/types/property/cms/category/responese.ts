import { UserProb } from '@/types/auth/responses';
import { ImageProp } from '@/types/media/responses';
import { TypeProp } from '../../type/responese';

export enum CategoryStatus {
  SHOW = 'show',
  HIDE = 'hide',
}

export interface CategoryResponse {
  id: string;
  title: string;
  slug: string;
  image_media?: ImageProp;
  image_id?: string;
  created_by: UserProb;
  description: string;
  type: TypeProp;
  type_id: string;
  status: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface CategoryData {
  id: string;
  title: string;
  slug: string;
}

export interface CategoryProp {
  id: string;
  title: string;
  slug: string;
  created_at: Date | string;
  updated_at: Date | string;
  status: string;
}
