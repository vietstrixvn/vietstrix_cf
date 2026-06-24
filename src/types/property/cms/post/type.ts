import { PaginationData } from '@/types';
import { PostResponse } from './responese';

export interface FetchPostsResponse {
  pagination: PaginationData;
  results: PostResponse[];
}
