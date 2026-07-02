# GBP Reviews Automation - Quick Start

## 🎯 What You Get:

✅ **Auto-sync reviews** from Google Business Profile to website
✅ **No manual updates** needed - reviews update on every build
✅ **SEO boost** - Star ratings in Google search results
✅ **Cache-optimized** - Only 1 API call per hour, stays within free tier

---

## 🚀 2 Options:

### **Option 1: Simple (Manual Update - Current)**
- ✅ Đã setup xong
- ⚠️ Phải update reviews bằng tay khi có review mới
- 📖 Guide: `docs/HOW-TO-ADD-REVIEWS.md`

### **Option 2: Automated (Recommended)**
- 🤖 Tự động fetch reviews từ GBP API
- 💰 **FREE** (trong quota limit)
- ⏱️ Setup time: ~30 phút
- 📖 Guide: `docs/GBP-AUTO-SYNC-SETUP.md`

---

## ⚡ Quick Decision Matrix:

| Tiêu chí | Manual (Option 1) | Automated (Option 2) |
|----------|-------------------|----------------------|
| Setup time | ✅ 0 min (done) | ⏱️ 30 min |
| Maintenance | ❌ Update manually | ✅ Zero maintenance |
| Cost | ✅ $0 | ✅ $0 |
| Accuracy | ⚠️ Can be outdated | ✅ Always fresh |
| Tech difficulty | ✅ Easy | ⚠️ Moderate |

---

## 🎓 Recommendation:

### Start with Manual (now), upgrade to Auto later

**Lý do:**
1. Hiện tại chưa có reviews → auto-sync không cần thiết
2. Manual đủ cho giai đoạn đầu
3. Khi có 3-5 reviews → chuyển sang auto để tiết kiệm thời gian

**Timeline:**
- ✅ **Now:** Deploy manual version
- 📅 **Week 2-4:** Get first reviews on GBP
- 🤖 **Month 2:** Switch to auto-sync (30 min setup)

---

## 🔧 Files Created for Auto-Sync:

```
src/
├── app/api/gbp-reviews/route.ts    ← API endpoint to fetch GBP reviews
├── lib/gbp-reviews.ts              ← Helper functions & hooks
└── components/JsonLdAuto.tsx       ← Auto-sync version of JsonLd

docs/
├── GBP-AUTO-SYNC-SETUP.md         ← Full setup guide
└── HOW-TO-ADD-REVIEWS.md          ← Manual update guide

.env.example                        ← Environment variables template
```

**All files ready to use when you decide to enable auto-sync!**

---

## 📊 What to Do Now:

### Immediate (ngay bây giờ):

```bash
# Deploy current manual version
cd /home/protam113/Documents/vietstrix/work/vietstrix
npm run build
npm run deploy
```

### After getting 1st review (tuần 2-4):

1. Update manually theo `docs/HOW-TO-ADD-REVIEWS.md`
2. Build + deploy
3. Verify star ratings in search results

### When you have 5+ reviews (tháng 2):

1. Follow `docs/GBP-AUTO-SYNC-SETUP.md`
2. Enable Google My Business API (5 min)
3. Add env vars to `.env.local` (2 min)
4. Replace `JsonLd` with `JsonLdAuto` (1 min)
5. Deploy → Done! Reviews auto-sync forever ✨

---

## 💡 Pro Tip:

Bạn có thể test auto-sync **ngay bây giờ** với mock data:

```typescript
// Test without real API
const mockData = {
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '5',
  },
  reviews: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Test User' },
      datePublished: '2026-07-01',
      reviewBody: 'Excellent service!',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
    },
  ],
  lastUpdated: new Date().toISOString(),
  totalReviews: 5,
};
```

---

**Need help deciding?** Let me know!

- 🟢 **Deploy manual now** → Say "deploy"
- 🔵 **Setup auto-sync now** → Say "setup auto"
- ⚪ **Just save for later** → All files ready, no action needed
