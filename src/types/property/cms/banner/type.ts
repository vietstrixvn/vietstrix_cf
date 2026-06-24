import { PaginationData } from '@/types';
import { BannerResponse } from './responese';

export interface FetchBannersResponse {
  pagination: PaginationData;
  results: BannerResponse[];
}
