import { UserProb } from '../auth/responses';

export interface MediaData {
  id: string;
  name: string;
  path: string;
  type: string;
  status: string;
  module: string;
  user_id: string;
  property_id: string;
  resource: string;
  resource_id: string;
  created_at: string | Date;
  updated_at: string | Date;
  url: string;
}

export interface ImageProp {
  id: string;
  name: string;
  type: string;
  url: string;
}

export interface TicketImageProp {
  id: string;
  name: string;
  type: string;
  url: string;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface GalleryResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
  total_images: number;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface VideoResponse {
  id: string;
  created_by: UserProb;
  url: string;
  created_at: string | Date;
  updated_at: string | Date;
}
