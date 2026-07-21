'use client';

import { CustomImage } from './image.component';

interface ImagePreviewProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function ImageChoose({
  src,
  alt,
  width,
  height,
  className = '',
}: ImagePreviewProps) {
  return (
    <>
      <div className={`relative cursor-pointer group ${className}`}>
        <CustomImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className=" transition-opacity group-hover:opacity-75"
        />
      </div>
    </>
  );
}
