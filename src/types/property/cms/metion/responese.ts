import { UserProb } from '@/types/auth/responses';
import { ImageProp } from '@/types/media/responses';

export enum MentionStatus {
  SHOW = 'show',
  HIDE = 'hide',
}

export interface MentionResponse {
  id: string;
  created_at: Date | string;
  updated_at: Date | string;
  url: string;
  image_id?: string;
  status: MentionStatus;

  image_media?: ImageProp;
  created_by: UserProb;
  user_id: string;
}
