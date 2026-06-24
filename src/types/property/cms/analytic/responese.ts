// TypeScript Interface
export interface AnalyticsResponse {
  success: boolean;
  code: number;
  message: string;
  data?: {
    items: AnalyticsData[] | null;
    meta: AnalyticsMeta;
  };
}

export interface AnalyticsData {
  active_users: number; // Số người dùng hoạt động
  new_users: number; // Số người dùng mới
  sessions: number; // Số phiên truy cập
  page_views: number; // Số lượt xem trang
  date: string; // ISO 8601 format: "2024-03-25T00:00:00Z"
}

export interface AnalyticsMeta {
  property_id: string; // Property ID (PROP-001)
  start_date: string; // Start date filter
  end_date: string; // End date filter
  count: number; // Số lượng records trong data array
  filters: AnalyticsFilters;
}

export interface AnalyticsFilters {
  country: string; // Quốc gia filter (có thể empty)
  device_category: string; // Thiết bị filter (có thể empty)
  page_path: string; // Page path filter (có thể empty)
  session_source: string; // Traffic source filter (có thể empty)
}
