'use client';

import MediaPreview, { getFileExtBadge } from './media-preview';
import { MoreVertical, Download, Trash2, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface MediaGridItemProps {
  id: string;
  url: string;
  name: string;
  type?: string;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  className?: string;
}

export default function MediaGridItem({
  id,
  url,
  name,
  type,
  onDelete,
  onView,
  className = '',
}: MediaGridItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const badge = getFileExtBadge(name);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowMenu(false);
  };

  const handleView = () => {
    if (onView) {
      onView(id);
    } else {
      window.open(url, '_blank');
    }
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (onDelete && confirm(`Delete "${name}"?`)) {
      onDelete(id);
    }
    setShowMenu(false);
  };

  return (
    <div
      className={`group relative w-32 h-32 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50 shadow-sm hover:shadow-md hover:border-main transition-all ${className}`}
    >
      {/* Media Preview */}
      <div className="w-full h-full flex items-center justify-center">
        <MediaPreview
          url={url}
          name={name}
          type={type}
          width={128}
          height={128}
        />
      </div>

      {/* File Type Badge */}
      <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <span
          className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${badge.color} shadow-sm`}
        >
          {badge.label}
        </span>
      </div>

      {/* Actions Menu */}
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 bg-white rounded-md shadow-md hover:bg-gray-50 transition-colors"
          title="Actions"
        >
          <MoreVertical size={14} className="text-gray-600" />
        </button>

        {showMenu && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />

            {/* Menu */}
            <div className="absolute right-0 top-7 z-20 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1">
              <button
                onClick={handleView}
                className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <ExternalLink size={12} />
                View
              </button>
              <button
                onClick={handleDownload}
                className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Download size={12} />
                Download
              </button>
              {onDelete && (
                <>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={handleDelete}
                    className="w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Filename Tooltip on Hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[9px] text-white truncate" title={name}>
          {name}
        </p>
      </div>
    </div>
  );
}
