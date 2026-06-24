import { ReactNode } from 'react';
import { ImageProps } from 'next/image';

export interface LoaderProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  width?: string;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface CustomImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  imageKey?: string;
  src: ImageProps['src'];
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  quality?: number;
  priority?: boolean;
  className?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export interface HeaderProps {
  title: string;
  className?: string;
}

export interface LoadingProps {
  size?: number;
  message?: string;
  className?: string;
  spanClassName?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export interface QuestionButtonProps {
  description?: string;
  className?: string;
}

export interface RefreshButtonProps {
  onClick: () => void;
  className?: string;
}

export interface NoResultsFoundProps {
  title?: string;
  message?: string;
}

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: string;
  description: string;
  onConfirm: () => void;
}

export interface WelcomeBannerProps {
  message?: string;
}

export interface PushButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  label?: string;
  className?: string;
}

export interface RichTextEditorProps {
  className?: string;
  initialContent?: string;
  onContentChange?: (html: string, text: string) => void;
  onChange?: (content: { html: string; text: string; json: any }) => void;
}

export interface TableOfContentsProps {
  htmlContent?: string;
}
