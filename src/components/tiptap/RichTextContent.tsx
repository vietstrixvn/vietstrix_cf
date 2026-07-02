import { enrichHtmlContent } from '@/utils';

interface RichTextContentProps {
  html: string;
  className?: string;
}

export function RichTextContent({ html, className }: RichTextContentProps) {
  const enrichedHtml = enrichHtmlContent(html);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: enrichedHtml }}
    />
  );
}

