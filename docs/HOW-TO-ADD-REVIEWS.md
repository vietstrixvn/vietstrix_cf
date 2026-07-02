# How to Add Reviews to Schema Markup

## ⚠️ Important: Google Schema Validation Rules

**`reviewCount` MUST be a positive integer (≥ 1)**
- ❌ `"reviewCount": "0"` → Validation error
- ✅ `"reviewCount": "1"` → Valid
- ✅ `"reviewCount": "12"` → Valid

---

## 🔧 When You Get Your First Review:

### Step 1: Update `src/components/JsonLd.tsx`

**Find line ~87 and uncomment:**

```typescript
// Before (commented out):
// aggregateRating: {
//   '@type': 'AggregateRating',
//   ratingValue: '5.0',
//   reviewCount: '1', // Must be positive integer
// },

// After (uncommented and updated):
aggregateRating: {
  '@type': 'AggregateRating',
  ratingValue: '4.8', // ← Update from GBP
  reviewCount: '5',    // ← Update from GBP (must be > 0)
},
```

### Step 2: Update `src/data/gbp-data.ts`

**Find line ~96 and uncomment:**

```typescript
// Before:
// rating: {
//   ratingValue: '5.0',
//   reviewCount: '1',
// },

// After:
rating: {
  ratingValue: '4.8', // From GBP
  reviewCount: '5',   // From GBP
},
```

---

## 📊 Where to Get Review Data:

### From Google Business Profile:

1. Go to: https://business.google.com
2. Select your business
3. Click **Reviews** tab
4. You'll see:
   - ⭐ Average rating (e.g., 4.8)
   - 📝 Total reviews (e.g., 12 reviews)

### Update Format:

```typescript
ratingValue: '4.8',  // String, 1 decimal place
reviewCount: '12',   // String, integer only
```

---

## 🎯 Optional: Add Individual Reviews

For even better SEO, add individual reviews:

```typescript
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  // ... existing fields ...
  
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '5',
  },
  
  // Add this:
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'John Doe', // From GBP review
      },
      datePublished: '2026-06-15', // ISO date
      reviewBody: 'Excellent web development service! Very professional team.', // From GBP
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Jane Smith',
      },
      datePublished: '2026-06-20',
      reviewBody: 'Great experience working with Vietstrix. Highly recommended!',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
    },
    // Add more reviews...
  ],
};
```

---

## ✅ After Updating:

### 1. Build & Test:
```bash
npm run build
npm run dev
```

### 2. Verify Schema:
```
https://search.google.com/test/rich-results
→ Enter: https://www.vietstrix.com
→ Should show: ✓ aggregateRating valid
```

### 3. Deploy:
```bash
npm run deploy
```

### 4. Monitor:
- Google Search Console → Enhancements → Review snippets
- Wait 7-14 days for Google to crawl and display stars in search results

---

## 🌟 Expected Results in Google Search:

After Google indexes your reviews, you'll see:

```
Vietstrix - Web Development Services
★★★★★ 4.8 ⭐ (12 reviews)
https://www.vietstrix.com
Vietstrix is a product-driven team building scalable web apps...
```

---

## 📝 Pro Tips:

1. **Update regularly**: Update schema every time you get new reviews
2. **Keep it accurate**: Match exactly with GBP data
3. **Don't fake reviews**: Google can detect and penalize fake reviews
4. **Response matters**: Reply to all reviews on GBP for better ranking
5. **Fresh reviews**: Recent reviews have more weight in ranking

---

## 🔗 Useful Links:

- GBP Reviews: https://business.google.com
- Review Schema Docs: https://schema.org/Review
- Rich Results Test: https://search.google.com/test/rich-results
- Google Guidelines: https://developers.google.com/search/docs/appearance/structured-data/review-snippet

---

**Last Updated:** 2026-07-02
