/**
 * Google Business Profile Data Helper
 * 
 * Hướng dẫn lấy thông tin từ GBP để cập nhật vào JsonLd.tsx
 */

export interface GBPData {
  name: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: {
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  rating?: {
    ratingValue: string;
    reviewCount: string;
  };
  gbpUrl?: string; // Short link từ GBP (g.page/...)
}

/**
 * HƯỚNG DẪN LẤY THÔNG TIN TỪ GBP:
 * 
 * 1. Truy cập: https://business.google.com
 * 2. Chọn business profile của bạn
 * 3. Lấy thông tin:
 * 
 * A. SỐ ĐIỆN THOẠI:
 *    - Vào tab "Info" → "Phone"
 *    - Copy format: +84XXXXXXXXX
 * 
 * B. ĐỊA CHỈ CỤ THỂ:
 *    - Vào tab "Info" → "Address"
 *    - Copy chính xác như trên GBP
 *    - VD: "123 Nguyễn Văn Linh, Quận 7"
 * 
 * C. TỌA ĐỘ (GEO):
 *    Cách 1: Từ GBP
 *      - Vào "Info" → Click "View on Google Maps"
 *      - URL sẽ có dạng: @10.7626220,106.6601720
 *    
 *    Cách 2: Từ Google Maps trực tiếp
 *      - Search địa chỉ trên maps.google.com
 *      - Right click → "What's here?"
 *      - Copy latitude, longitude
 * 
 * D. GIỜ MỞ CỬA:
 *    - Vào "Info" → "Hours"
 *    - Format: "HH:MM" (24h)
 * 
 * E. REVIEWS & RATING:
 *    - Vào tab "Reviews"
 *    - Xem rating trung bình (VD: 4.8) và số reviews
 * 
 * F. GBP SHORT LINK:
 *    - Vào "Info" → "Share profile"
 *    - Copy link dạng: https://g.page/your-business
 */

// Template data - CẬP NHẬT THEO GBP CỦA BẠN
export const vietstrixGBP: GBPData = {
  name: 'Vietstrix',
  
  telephone: '+84906723985',
  
  address: {
    streetAddress: 'Nhieu Loc Ward',
    addressLocality: 'Ho Chi Minh City',
    addressRegion: 'Ho Chi Minh City',
    postalCode: '70000',
    addressCountry: 'VN',
  },
  
  // TODO: Cập nhật tọa độ chính xác từ Google Maps
  geo: {
    latitude: 10.762622,
    longitude: 106.660172,
  },
  
  // Open 24 hours (Mon-Sat), Closed Sunday
  openingHours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '00:00',
    closes: '23:59',
  },
  
  // TODO: Uncomment và cập nhật khi có reviews (reviewCount phải > 0)
  // rating: {
  //   ratingValue: '5.0',
  //   reviewCount: '1',
  // },
  
  // TODO: Lấy short link từ GBP
  gbpUrl: 'https://g.page/vietstrix',
};

/**
 * Validate GBP data trước khi cập nhật vào JsonLd
 */
export function validateGBPData(data: GBPData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check telephone
  if (!data.telephone || data.telephone.includes('X')) {
    errors.push('Telephone chưa được cập nhật');
  }

  // Check address
  if (data.address.streetAddress === 'Your Street Address Here') {
    errors.push('Street address chưa được cập nhật');
  }

  // Check geo coordinates
  if (data.geo.latitude === 10.762622 && data.geo.longitude === 106.660172) {
    errors.push('Geo coordinates có thể chưa chính xác (đang dùng default)');
  }

  // Check GBP URL
  if (!data.gbpUrl || data.gbpUrl === 'https://g.page/vietstrix') {
    errors.push('GBP short URL chưa được verify');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Convert GBP data sang format Schema.org
 */
export function convertToSchemaOrg(data: GBPData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: data.name,
    telephone: data.telephone,
    address: {
      '@type': 'PostalAddress',
      ...data.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...data.geo,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      ...data.openingHours,
    },
    ...(data.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ...data.rating,
      },
    }),
  };
}

// Export để sử dụng trong JsonLd.tsx
export default vietstrixGBP;
