import { UserProb } from '@/types/auth/responses';
import { ImageProp } from '@/types/media/responses';

export enum BannerStatus {
  SHOW = 'show',
  HIDE = 'hide',
}

export interface BannerResponse {
  id: string;
  title: string;
  url: string;
  image_media: ImageProp;
  image_id?: string;
  status: BannerStatus;
  property_id: string;
  created_by: UserProb;
  created_at: Date | string;
  updated_at: Date | string;
}
