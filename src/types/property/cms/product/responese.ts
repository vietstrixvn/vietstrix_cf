import { ImageProp } from '@/types/media/responses';
import { TypeProp } from '../../type/responese';
import { CategoryProp } from '../category/responese';
import { TagProp } from '../tag/responese';
import { UserProb } from '@/types/auth/responses';

export interface ProductResponse {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: TypeProp;
  image_id?: string;
  price: number;
  images?: ImageProp[];
  category: CategoryProp;
  tags: TagProp[];
  user_id: string;
  status: string;
  created_by: UserProb;
  created_at: Date | string;
  updated_at: Date | string;
}
