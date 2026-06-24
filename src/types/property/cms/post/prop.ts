import { PostResponse } from './responese';

export interface PostTableProps {
  posts: PostResponse[];
  isLoading: boolean;
  isError: boolean;
  refreshKey: () => void;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
}

export interface BlogMenuCardProps {
  categories: Category[];
}
