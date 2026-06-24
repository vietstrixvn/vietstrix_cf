'use client';

import { ImageChoose } from './image.design';
import { FileText, FileVideo, File, FileSpreadsheet } from 'lucide-react';

interface MediaPreviewProps {
  url: string;
  name: string;
  type?: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Get file type from URL or name
 */
function getFileType(url: string, name: string, type?: string): string {
  if (type) return type;

  const ext = (name || url).split('.').pop()?.toLowerCase() || '';

  // Image types
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
    return 'image';
  }

  // Video types
  if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'].includes(ext)) {
    return 'video';
  }

  // Document types
  if (['pdf'].includes(ext)) {
    return 'pdf';
  }

  if (['doc', 'docx'].includes(ext)) {
    return 'word';
  }

  if (['xls', 'xlsx'].includes(ext)) {
    return 'excel';
  }

  if (['txt', 'md'].includes(ext)) {
    return 'text';
  }

  return 'file';
}

/**
 * MediaPreview component - displays appropriate preview based on file type
 */
export default function MediaPreview({
  url,
  name,
  type,
  width = 120,
  height = 120,
  className = '',
}: MediaPreviewProps) {
  const fileType = getFileType(url, name, type);

  // Image preview
  if (fileType === 'image') {
    return (
      <ImageChoose
        src={url}
        alt={name}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  // Video preview
  if (fileType === 'video') {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 p-4 ${className}`}
      >
        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
          <FileVideo className="w-6 h-6 text-purple-600" />
        </div>
        <p className="text-[10px] text-gray-600 text-center truncate max-w-full px-2">
          {name}
        </p>
      </div>
    );
  }

  // PDF preview
  if (fileType === 'pdf') {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 p-4 ${className}`}
      >
        <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
          <FileText className="w-6 h-6 text-red-600" />
        </div>
        <p className="text-[10px] text-gray-600 text-center truncate max-w-full px-2">
          {name}
        </p>
      </div>
    );
  }

  // Word document preview
  if (fileType === 'word') {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 p-4 ${className}`}
      >
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <p className="text-[10px] text-gray-600 text-center truncate max-w-full px-2">
          {name}
        </p>
      </div>
    );
  }

  // Excel document preview
  if (fileType === 'excel') {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 p-4 ${className}`}
      >
        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
          <FileSpreadsheet className="w-6 h-6 text-green-600" />
        </div>
        <p className="text-[10px] text-gray-600 text-center truncate max-w-full px-2">
          {name}
        </p>
      </div>
    );
  }

  // Text file preview
  if (fileType === 'text') {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 p-4 ${className}`}
      >
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
          <FileText className="w-6 h-6 text-gray-600" />
        </div>
        <p className="text-[10px] text-gray-600 text-center truncate max-w-full px-2">
          {name}
        </p>
      </div>
    );
  }

  // Generic file preview
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-4 ${className}`}
    >
      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
        <File className="w-6 h-6 text-gray-600" />
      </div>
      <p className="text-[10px] text-gray-600 text-center truncate max-w-full px-2">
        {name}
      </p>
    </div>
  );
}

/**
 * Get file extension badge color
 */
export function getFileExtBadge(name: string): {
  color: string;
  label: string;
} {
  const ext = name.split('.').pop()?.toLowerCase() || '';

  const badges: Record<string, { color: string; label: string }> = {
    // Images
    jpg: { color: 'bg-blue-100 text-blue-700', label: 'JPG' },
    jpeg: { color: 'bg-blue-100 text-blue-700', label: 'JPG' },
    png: { color: 'bg-blue-100 text-blue-700', label: 'PNG' },
    gif: { color: 'bg-blue-100 text-blue-700', label: 'GIF' },
    webp: { color: 'bg-blue-100 text-blue-700', label: 'WEBP' },
    svg: { color: 'bg-blue-100 text-blue-700', label: 'SVG' },

    // Videos
    mp4: { color: 'bg-purple-100 text-purple-700', label: 'MP4' },
    avi: { color: 'bg-purple-100 text-purple-700', label: 'AVI' },
    mov: { color: 'bg-purple-100 text-purple-700', label: 'MOV' },
    mkv: { color: 'bg-purple-100 text-purple-700', label: 'MKV' },
    webm: { color: 'bg-purple-100 text-purple-700', label: 'WEBM' },

    // Documents
    pdf: { color: 'bg-red-100 text-red-700', label: 'PDF' },
    doc: { color: 'bg-blue-100 text-blue-700', label: 'DOC' },
    docx: { color: 'bg-blue-100 text-blue-700', label: 'DOCX' },
    xls: { color: 'bg-green-100 text-green-700', label: 'XLS' },
    xlsx: { color: 'bg-green-100 text-green-700', label: 'XLSX' },
    txt: { color: 'bg-gray-100 text-gray-700', label: 'TXT' },
  };

  return (
    badges[ext] || {
      color: 'bg-gray-100 text-gray-700',
      label: ext.toUpperCase(),
    }
  );
}
