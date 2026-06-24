export enum SocialType {
  FB = 'fb',
  IG = 'ig',
  TT = 'tiktok',
  ZL = 'zalo',
  URL = 'url',
  MAIL = 'mail',
}

export interface SocialResponese {
  id: string;
  title: string;
  url: string;
  status: string;
  type: SocialType;
  property_id: string;
  created_by: string;
  created_at: string | Date;
  updated_at: string | Date;
}
