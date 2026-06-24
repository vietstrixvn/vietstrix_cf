'use client';

import Link from 'next/link';
import { Images, FolderOpen } from 'lucide-react';
import { GalleryResponse } from '@/types';

interface GalleryCardProps {
  item: GalleryResponse;
}

export function GalleryCard({ item }: GalleryCardProps) {
  return (
    <Link href={`/admin/cms/galleries/${item.id}`}>
      <div className="group w-48 border border-gray-200 rounded-md bg-white hover:border-main hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden">
        {/* Thumbnail placeholder */}
        <div className="w-full h-32 bg-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-colors">
          <FolderOpen
            size={36}
            className="text-gray-300 group-hover:text-main transition-colors"
          />
        </div>

        {/* Info */}
        <div className="p-3 border-t border-gray-100">
          <p
            className="text-sm font-semibold text-gray-800 truncate group-hover:text-main transition-colors"
            title={item.name}
          >
            {item.name}
          </p>

          {item.description && (
            <p
              className="text-xs text-gray-400 mt-0.5 truncate"
              title={item.description}
            >
              {item.description}
            </p>
          )}

          <div className="flex items-center gap-1 mt-2">
            <Images size={12} className="text-gray-400" />
            <span className="text-xs text-gray-400">
              {item.total_images} {item.total_images === 1 ? 'file' : 'files'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
