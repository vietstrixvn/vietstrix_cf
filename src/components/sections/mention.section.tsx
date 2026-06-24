import { MentionResponse } from '@/types/portfolio/post/responses';
import PartnersClient from './partner.client';

interface MentionsSectionProps {
  mentions?: MentionResponse[];
}

export default function MentionsSection({ mentions = [] }: MentionsSectionProps) {
  return <PartnersClient mentions={mentions} />;
}
