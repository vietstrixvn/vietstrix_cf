import { PaginationData } from '@/types';
import { SocialResponese } from './responese';

export interface FetchSocialsResponse {
  pagination: PaginationData;
  results: SocialResponese[];
}
