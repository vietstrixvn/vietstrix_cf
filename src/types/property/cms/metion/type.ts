import { PaginationData } from '@/types';
import { MentionResponse } from './responese';

export interface FetchMentionsResponse {
  pagination: PaginationData;
  results: MentionResponse[];
}
