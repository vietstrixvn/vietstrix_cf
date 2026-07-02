# Google Business Profile (GBP) Configuration Checklist

## ✅ Đã hoàn thành tự động:

1. **LocalBusiness Schema** với aggregateRating support
2. **robots.txt** với sitemap reference
3. **Dynamic sitemap.ts** cho Next.js (tự động generate URLs)
4. **Contact Page Schema** đã có sẵn

## 🔧 CẦN CẬP NHẬT THỦ CÔNG:

### 1. Cập nhật thông tin trong `/src/components/JsonLd.tsx`:

```typescript
// Dòng 48: Số điện thoại
telephone: '+843****3378', // ➡️ Điền số điện thoại CHÍNH XÁC từ GBP

// Dòng 52: Địa chỉ cụ thể
streetAddress: 'Ho Chi Minh City', // ➡️ VD: '123 Đường ABC, Quận 1'

// Dòng 60-61: Tọa độ
latitude: 10.762622,  // ➡️ Lấy từ GBP hoặc Google Maps
longitude: 106.660172,

// Dòng 72: Giờ mở cửa
opens: '09:00',  // ➡️ Kiểm tra trên GBP
closes: '18:30',

// Dòng 82-85: Reviews (nếu có)
aggregateRating: {
  ratingValue: '5.0',  // ➡️ Rating trung bình từ GBP
  reviewCount: '0',    // ➡️ Số lượng reviews
},
```

### 2. Xác minh GBP trên Google Search Console:

- [ ] Truy cập: https://search.google.com/search-console
- [ ] Thêm property: `https://www.vietstrix.com`
- [ ] Submit sitemap: `https://www.vietstrix.com/sitemap.xml`

### 3. Link GBP với Website:

**Trên Google Business Profile Dashboard:**
- [ ] Vào phần **Info** → **Website**
- [ ] Điền: `https://www.vietstrix.com`
- [ ] Appointment link (nếu có): `https://www.vietstrix.com/contact-us`

### 4. NAP Consistency (Name, Address, Phone):

Đảm bảo thông tin trên **3 nơi GIỐNG HỆT NHAU**:
- [ ] Google Business Profile
- [ ] Website (JsonLd.tsx)
- [ ] Footer website (nếu có)

### 5. Thêm Google Business Profile link vào website:

**Thêm vào `/src/components/JsonLd.tsx` line 19:**

```typescript
sameAs: [
  'https://www.facebook.com/VietStrix',
  'https://g.page/vietstrix',  // ➡️ Thêm GBP short link
  'https://github.com/vietstrixvn',
  'https://www.linkedin.com/company/vietstrix',
  'https://www.instagram.com/vietstrix',
],
```

### 6. Local SEO Posts (Optional but recommended):

**Tạo blog posts về địa phương:**
- [ ] "Web Development Services in Ho Chi Minh City"
- [ ] "Top Web Design Company Vietnam"
- [ ] Case studies với địa điểm cụ thể

### 7. Review Schema (khi có reviews):

Sau khi có reviews trên GBP, thêm individual reviews vào schema:

```typescript
review: [
  {
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Client Name' },
    datePublished: '2026-06-01',
    reviewBody: 'Review text...',
    reviewRating: { '@type': 'Rating', ratingValue: '5' },
  },
],
```

---

## 🚀 Sau khi deploy:

### Verify implementation:
1. **Rich Results Test**: https://search.google.com/test/rich-results
   - Test URL: `https://www.vietstrix.com`
   
2. **Schema Markup Validator**: https://validator.schema.org/
   - Paste page source hoặc URL

3. **GBP Insights**: Monitor traffic từ Google Maps

---

## 📊 KPIs để theo dõi:

- **GBP Views**: Số lần xuất hiện trên Google Maps
- **Actions**: Click vào website, directions, calls
- **Keywords**: Từ khóa người dùng tìm để thấy GBP
- **Reviews**: Tăng số lượng và rating

---

## 🔗 Useful Links:

- GBP Dashboard: https://business.google.com
- Search Console: https://search.google.com/search-console
- Rich Results Test: https://search.google.com/test/rich-results
- Schema.org LocalBusiness: https://schema.org/LocalBusiness
