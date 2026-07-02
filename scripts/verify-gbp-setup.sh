#!/bin/bash
# GBP Setup Verification Script
# Run this after updating GBP data

echo "🔍 Verifying GBP Configuration..."
echo ""

# Check if GBP data file exists
if [ -f "src/data/gbp-data.ts" ]; then
  echo "✅ GBP data file exists"
  
  # Check for TODO markers
  TODO_COUNT=$(grep -c "TODO" src/data/gbp-data.ts)
  if [ $TODO_COUNT -gt 0 ]; then
    echo "⚠️  Found $TODO_COUNT TODO items in gbp-data.ts"
    grep -n "TODO" src/data/gbp-data.ts
  else
    echo "✅ No TODO markers in gbp-data.ts"
  fi
else
  echo "❌ GBP data file not found"
fi

echo ""

# Check JsonLd.tsx
if [ -f "src/components/JsonLd.tsx" ]; then
  echo "✅ JsonLd.tsx exists"
  
  TODO_COUNT=$(grep -c "TODO" src/components/JsonLd.tsx)
  if [ $TODO_COUNT -gt 0 ]; then
    echo "⚠️  Found $TODO_COUNT TODO items in JsonLd.tsx"
    grep -n "TODO" src/components/JsonLd.tsx | head -5
  else
    echo "✅ No TODO markers in JsonLd.tsx"
  fi
else
  echo "❌ JsonLd.tsx not found"
fi

echo ""

# Check robots.txt
if [ -f "public/robots.txt" ]; then
  echo "✅ robots.txt exists"
else
  echo "❌ robots.txt not found"
fi

# Check sitemap
if [ -f "src/app/sitemap.ts" ]; then
  echo "✅ sitemap.ts exists"
else
  echo "❌ sitemap.ts not found"
fi

echo ""
echo "📝 Next Steps:"
echo "1. Update GBP data in src/data/gbp-data.ts"
echo "2. Run: npm run build"
echo "3. Test locally: npm run dev"
echo "4. Check sitemap: http://localhost:3000/sitemap.xml"
echo "5. Deploy to production"
echo "6. Submit sitemap to Google Search Console"
echo ""
echo "🔗 Useful Links:"
echo "- GBP Dashboard: https://business.google.com"
echo "- Search Console: https://search.google.com/search-console"
echo "- Rich Results Test: https://search.google.com/test/rich-results"
