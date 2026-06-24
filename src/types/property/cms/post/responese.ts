import { ImageProp } from '@/types/media/responses';
import { TypeProp } from '../../type/responese';
import { CategoryProp } from '../category/responese';
import { TagProp } from '../tag/responese';
import { UserTableProps } from '@/types/user/prop';

export interface PostResponse {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: TypeProp;
  image_id?: string;

  images?: ImageProp[];
  category: CategoryProp;
  tags: TagProp[];
  user_id: string;
  status: string;
  created_by: UserTableProps;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface PostStatResponse {
  by_type: any;
  updated_at: Date | string;
  total: number;
}
