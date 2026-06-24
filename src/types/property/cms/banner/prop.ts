import { BannerResponse } from './responese';

export interface BannerTableProps {
  banners: BannerResponse[];
  isLoading: boolean;
  isError: boolean;
  refreshKey: () => void;
}

export interface BannerCardProps {
  banner: BannerResponse;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (banner: BannerResponse) => void;
  onDelete: (banner: BannerResponse) => void;
}

export interface ThumbnailCardProps {
  image: any;
  title: string;
}

export interface BannerManagerProps {
  /**
   * Pass your own banner data from API here.
   * Falls back to mock data if not provided.
   */
  initialBanners?: BannerResponse[];
  onAdd?: () => void;
  onEdit?: (banner: BannerResponse) => void;
  onDelete?: (banner: BannerResponse) => void;
  onBulkAction?: (action: 'show' | 'hide' | 'delete', ids: string[]) => void;
}
