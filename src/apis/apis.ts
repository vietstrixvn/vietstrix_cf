// api/apis.ts

// Next.js rewrite handles /api/v1 prefix
// All endpoints automatically get /api/v1 prefix via buildUrl
const apiPath = '/api/root/v1';

const buildUrl = (path: string) => `${apiPath}${path}`;

/**
 * ========== @Endpoints ==========
 */
const endpoints = {
  // ========================================================================
  // HEALTH CHECK
  // ========================================================================
  health: '/health',

  // ========================================================================
  // CMS
  // ========================================================================

  cms: {
    categories: {
      list: buildUrl('/categories'),
      detail: (id: string) => buildUrl(`/categories/${id}`),
      slug: (slug: string) => buildUrl(`/categories/slug/${slug}`),
    },

    portfolios: {
      list: buildUrl('/portfolios'),
      stats: () => buildUrl(`/portfolios/stats/by-type`),
      detail: (id: string) => buildUrl(`/portfolios/${id}`),
      slug: (slug: string) => buildUrl(`/portfolios/slug/${slug}`),
    },

    contacts: {
      list: buildUrl('/contacts'),
      detail: (id: string) => buildUrl(`/contacts/${id}`),
      stats: buildUrl('/contacts/stats'),
      bulks: buildUrl('/contacts/bulk'),
      bulk: (id: string) => buildUrl(`/contacts/${id}/status`),
    },

    tags: {
      list: buildUrl('/tags'),
      detail: (id: string) => buildUrl(`/tags/${id}`),
    },

       mentions: {
      list: buildUrl("/mentions"),
      detail: (id: string) => buildUrl(`/mentions/${id}`),
    },
  },

  // ========================================================================
  // PROPERTY GALLERY (Public)
  // ========================================================================
  gallery: (propertyId: string) => buildUrl(`/${propertyId}/gallery`),
};

export { endpoints };
