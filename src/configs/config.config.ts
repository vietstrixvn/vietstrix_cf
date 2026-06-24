export const LANG_CONFIG = {
  en: {
    label: 'EN',
    style: {
      background: '#E6F1FB',
      color: '#0C447C',
      border: '0.5px solid #85B7EB',
    },
  },
  vi: {
    label: 'VI',
    style: {
      background: '#EEEDFE',
      color: '#3C3489',
      border: '0.5px solid #AFA9EC',
    },
  },
} as const;

export const TYPE_CONFIG = {
  project: {
    label: 'project',
    style: {
      background: '#EAF3DE',
      color: '#27500A',
      border: '0.5px solid #97C459',
    },
  },
  blogs: {
    label: 'blogs',
    style: {
      background: '#FAEEDA',
      color: '#633806',
      border: '0.5px solid #EF9F27',
    },
  },
} as const;

const port = process.env.PORT || 3000;

export const APP_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : `http://localhost:${port}`;

/**
 * STATIC_ASSETS_URL is used to serve static assets for the PDF templates
 */
export const STATIC_ASSETS_URL = 'https://static.easyinvoicepdf.com';

/**
 * Fonts that we use to render invoice pdf templates via `@react-pdf/renderer`
 */
export const INVOICE_PDF_FONTS = {
  DEFAULT_TEMPLATE: {
    OPEN_SANS_REGULAR: `${STATIC_ASSETS_URL}/open-sans-regular.ttf`,
    OPEN_SANS_700: `${STATIC_ASSETS_URL}/open-sans-700.ttf`,
  },
  STRIPE_TEMPLATE: {
    INTER_REGULAR: `${STATIC_ASSETS_URL}/Inter-Regular.ttf`,
    INTER_MEDIUM: `${STATIC_ASSETS_URL}/Inter-Medium.ttf`,
    INTER_SEMIBOLD: `${STATIC_ASSETS_URL}/Inter-SemiBold.ttf`,
  },
} as const satisfies Record<
  'DEFAULT_TEMPLATE' | 'STRIPE_TEMPLATE',
  { [key: string]: string }
>;
