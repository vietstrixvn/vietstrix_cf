# GBP Reviews Auto-Sync Setup Guide

## 🤖 Automated Review Sync Architecture

Thay vì update manual, hệ thống sẽ tự động fetch reviews từ Google Business Profile API mỗi khi build.

---

## 📋 Setup Steps

### 1. Enable Google My Business API

```bash
# Go to Google Cloud Console
https://console.cloud.google.com/

# Enable APIs:
1. Google My Business API
2. Google Business Profile API (newer version)
```

### 2. Create Service Account

```bash
# In Google Cloud Console:
1. IAM & Admin → Service Accounts → Create Service Account
2. Name: "vietstrix-gbp-sync"
3. Grant role: "Basic → Viewer"
4. Create Key → JSON → Download
```

### 3. Grant Access to GBP

```bash
# In Google Business Profile:
1. https://business.google.com
2. Settings → Users → Add users
3. Add service account email (e.g., vietstrix-gbp-sync@project.iam.gserviceaccount.com)
4. Role: "Manager" or "Owner"
```

### 4. Get Account & Location IDs

```bash
# Install Google My Business CLI (optional):
npm install -g @google/mybusiness

# Or use API Explorer:
https://developers.google.com/my-business/reference/rest/v4/accounts/list

# You'll get:
# Account ID: accounts/1234567890
# Location ID: locations/9876543210
```

### 5. Setup Environment Variables

Create `.env.local`:

```bash
# Google Business Profile API Credentials
GBP_ACCOUNT_ID=accounts/1234567890
GBP_LOCATION_ID=locations/9876543210
GBP_ACCESS_TOKEN=ya29.a0AfH6SMBxxxxxxxxxxxxx

# Or use Service Account JSON (recommended for production)
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json

# Site URL (for SSR)
NEXT_PUBLIC_SITE_URL=https://www.vietstrix.com
```

### 6. Update Layout to Use Auto JsonLd

**Option A: Replace existing JsonLd**

```typescript
// src/app/[locale]/layout.tsx
import { JsonLd } from '@/components/JsonLdAuto'; // ← New auto version

export default async function LocaleLayout({ children, params }) {
  // ... existing code ...
  
  return (
    <html>
      <head>
        <JsonLd /> {/* ← Auto-fetches reviews */}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Option B: Keep both (A/B test)**

```typescript
// Use auto version in production, static in dev
const JsonLdComponent = process.env.NODE_ENV === 'production'
  ? require('@/components/JsonLdAuto').JsonLd
  : require('@/components/JsonLd').JsonLd;
```

---

## 🔧 How It Works

### Architecture:

```
┌─────────────────┐
│ Google Business │
│    Profile      │ ← Customer leaves review
└────────┬────────┘
         │
         │ API Call (every build)
         │
┌────────▼────────┐
│ /api/gbp-reviews│ ← Fetch reviews
│   Route Handler │    Cache 1 hour
└────────┬────────┘
         │
         │ Return JSON
         │
┌────────▼────────┐
│  JsonLdAuto.tsx │ ← Inject into schema
│   Component     │
└────────┬────────┘
         │
         │ Render <script>
         │
┌────────▼────────┐
│   HTML Output   │ ← Google crawls & indexes
│  with reviews   │
└─────────────────┘
```

### Caching Strategy:

1. **API Level**: 1 hour CDN cache (`Cache-Control: s-maxage=3600`)
2. **Next.js ISR**: Revalidate every build
3. **Rate Limiting**: Max 1 request per hour per deployment

### Fallback Logic:

```typescript
if (GBP API fails) {
  → Use previous cached data
  → Or show schema without reviews (still valid)
}
```

---

## 🧪 Testing

### Local Development:

```bash
# 1. Add test credentials to .env.local
cp .env.example .env.local
vim .env.local

# 2. Test API endpoint
npm run dev
curl http://localhost:3000/api/gbp-reviews

# Expected output:
{
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "5"
  },
  "reviews": [...],
  "lastUpdated": "2026-07-02T01:55:00Z",
  "totalReviews": 5
}

# 3. Check page source
curl http://localhost:3000 | grep -A 20 "application/ld+json"
```

### Production:

```bash
# Build & check
npm run build
npm start

# Verify schema
curl https://www.vietstrix.com | grep aggregateRating
```

---

## 📊 Monitoring & Maintenance

### Daily Cron Job (Optional - for real-time updates):

```typescript
// app/api/cron/sync-reviews/route.ts
export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Trigger revalidation
  const { revalidatePath } = await import('next/cache');
  revalidatePath('/', 'layout');

  return Response.json({ revalidated: true, timestamp: new Date() });
}
```

**Setup on Cloudflare Workers Cron:**

```toml
# wrangler.toml
[triggers]
crons = ["0 */6 * * *"] # Every 6 hours

# Or use GitHub Actions:
# .github/workflows/sync-reviews.yml
name: Sync GBP Reviews
on:
  schedule:
    - cron: '0 */6 * * *' # Every 6 hours
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Revalidation
        run: |
          curl -X GET https://www.vietstrix.com/api/cron/sync-reviews \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

### Monitoring Checklist:

- [ ] Check API quota usage in Google Cloud Console
- [ ] Monitor error logs in Cloudflare Workers
- [ ] Verify Rich Results Test weekly
- [ ] Alert if `reviewCount` drops (potential API issue)

---

## 🚀 Deployment

### Option 1: All-in (Recommended)

```bash
# Replace JsonLd.tsx with JsonLdAuto.tsx
mv src/components/JsonLd.tsx src/components/JsonLd.backup.tsx
mv src/components/JsonLdAuto.tsx src/components/JsonLd.tsx

# Deploy
npm run build
npm run deploy
```

### Option 2: Gradual Rollout

```bash
# Keep both, use feature flag
# .env.production
ENABLE_AUTO_REVIEWS=true

# layout.tsx
const JsonLd = process.env.ENABLE_AUTO_REVIEWS === 'true'
  ? require('@/components/JsonLdAuto').JsonLd
  : require('@/components/JsonLd').JsonLd;
```

---

## 🔒 Security Best Practices

1. **Never commit credentials** to git
2. **Use service account** instead of user OAuth tokens
3. **Rotate tokens** every 90 days
4. **Limit API scope** to read-only
5. **Enable audit logging** in Google Cloud

---

## 💰 Cost Estimate

| Service | Quota | Cost |
|---------|-------|------|
| Google My Business API | 5000 requests/day | **Free** |
| Cloudflare Workers | 100k requests/day | **Free** |
| Next.js ISR | Unlimited | **Free** (on Cloudflare) |

**Total: $0/month** ✅

---

## 📝 Troubleshooting

### Error: "Missing GBP credentials"

```bash
# Check .env.local has all keys
cat .env.local | grep GBP_

# Solution: Add missing env vars
```

### Error: "GBP API error: 403 Forbidden"

```bash
# Service account doesn't have access
# Solution: Add service account as Manager in GBP dashboard
```

### Error: "Invalid token"

```bash
# Access token expired (tokens expire after 1 hour)
# Solution: Use refresh token or service account JSON
```

### Reviews not showing up:

```bash
# 1. Check API response
curl http://localhost:3000/api/gbp-reviews

# 2. Check cache
# Wait 1 hour or clear cache

# 3. Force rebuild
npm run build

# 4. Verify in page source
curl https://www.vietstrix.com | grep reviewCount
```

---

## ✅ Success Criteria

After setup, you should see:

- ✅ Reviews auto-sync every build
- ✅ `aggregateRating` shows correct count
- ✅ Individual reviews in schema (up to 10)
- ✅ Google Rich Results Test passes
- ✅ Star ratings appear in search results (within 7-14 days)

---

**Ready to go! 🎉** Reviews will update automatically whenever someone leaves a new review on GBP.
