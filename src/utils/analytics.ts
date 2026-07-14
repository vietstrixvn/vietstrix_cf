/**
 * Professional Google Tag Manager & GA4 DataLayer Utility
 * Single Source of Truth for tracking across vietstrix.com
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-W9HJ7NXD';

export interface LeadEventParams {
  lead_type?: 'contact' | 'consultation' | 'quote';
  method?: string;
  value?: number;
  currency?: string;
  [key: string]: unknown;
}

export interface BadgeClickParams {
  badge_name: 'clutch' | 'goodfirms' | string;
  destination_url?: string;
  [key: string]: unknown;
}

export interface CtaClickParams {
  cta_name: string;
  cta_location: string;
  [key: string]: unknown;
}

/**
 * Safely push an event to window.dataLayer
 */
export const pushToDataLayer = (data: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
};

/**
 * Update Google Consent Mode v2 status
 */
export const updateGoogleConsent = (status: 'granted' | 'denied') => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  function gtag(..._args: unknown[]) {
    window.dataLayer?.push(arguments);
  }
  gtag('consent', 'update', {
    analytics_storage: status,
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
  });
};

/**
 * Track lead generation event (GA4 Standard Event: generate_lead)
 */
export const trackGenerateLead = (params: LeadEventParams = {}) => {
  pushToDataLayer({
    event: 'generate_lead',
    event_category: 'Lead',
    event_label: params.lead_type || 'contact',
    ...params,
  });
};

/**
 * Track badge clicks in footer (Clutch, GoodFirms)
 */
export const trackBadgeClick = (params: BadgeClickParams) => {
  pushToDataLayer({
    event: 'badge_click',
    event_category: 'Trust_Badge',
    event_label: params.badge_name,
    ...params,
  });
};

/**
 * Track CTA button clicks
 */
export const trackCtaClick = (params: CtaClickParams) => {
  pushToDataLayer({
    event: 'cta_click',
    event_category: 'CTA',
    event_label: params.cta_name,
    ...params,
  });
};
