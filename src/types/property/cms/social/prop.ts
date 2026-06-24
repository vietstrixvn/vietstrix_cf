import { SocialResponese } from './responese';

export interface SocialsTableProps {
  socials: SocialResponese[];
  isLoading: boolean;
  isError: boolean;
  refreshKey: () => void;
  onDeletingChange?: (isDeleting: boolean) => void;
}

export interface UpdateSocialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  social: SocialResponese | null;
}
