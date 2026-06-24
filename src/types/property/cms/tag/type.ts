import { PaginationData } from '@/types';
import { TagResponse } from './responese';

export interface FetchTagsResponse {
  pagination: PaginationData;
  results: TagResponse[];
}
