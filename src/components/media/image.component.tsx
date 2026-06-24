import { CustomImageProps } from '@/types';
import Image from 'next/image';
import { forwardRef } from 'react';

export const CustomImage = forwardRef<HTMLImageElement, CustomImageProps>(
  function CustomImage(
    {
      imageKey,
      src,
      alt = 'Image',
      width = 800,
      height = 600,
      sizes,
      loading,
      quality = 60,
      priority = false,
      className,
      fetchPriority,
      placeholder,
      blurDataURL,
      fill,
      ...rest
    }: CustomImageProps,
    ref
  ) {
    const autoSizes = sizes || `(max-width: 768px) 100vw, ${width}px`;

    // Check external image
    const isExternal = typeof src === 'string' && src.startsWith('http');

    // Auto placeholder
    const autoPlaceholder = placeholder || (isExternal ? 'empty' : 'blur');
    const autoBlur =
      blurDataURL ||
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg==';

    // If fill is true, don't pass width and height
    const imageProps = fill
      ? {
          fill: true,
          sizes: autoSizes,
        }
      : {
          width,
          height,
          sizes: autoSizes,
        };

    return (
      <Image
        ref={ref}
        key={imageKey}
        src={src}
        alt={alt}
        {...imageProps}
        quality={quality}
        priority={priority}
        loading={priority ? undefined : (loading ?? 'lazy')}
        placeholder={autoPlaceholder}
        blurDataURL={autoPlaceholder === 'blur' ? autoBlur : undefined}
        className={className}
        fetchPriority={fetchPriority}
        {...rest}
      />
    );
  }
);
