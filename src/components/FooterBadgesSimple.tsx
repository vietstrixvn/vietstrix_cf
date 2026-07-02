// Simple Footer Badges - 3 Essential Tags Only
// GBP + SSL + Next.js

export function FooterBadges() {
  return (
    <div className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        
        {/* 3 Essential Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          
          {/* 1. Google Business Profile Badge */}
          <a 
            href="https://www.google.com/maps/place/?q=place_id:YOUR_PLACE_ID"
            target="_blank" 
            rel="nofollow noopener"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition"
            aria-label="View on Google Business"
          >
            <svg 
              className="w-5 h-5" 
              viewBox="0 0 24 24" 
              fill="none"
              aria-hidden="true"
            >
              <path 
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                fill="#4285F4"
              />
            </svg>
            <div className="text-left">
              <div className="text-xs text-gray-500">Verified on</div>
              <div className="text-sm font-semibold text-gray-900">Google Business</div>
            </div>
          </a>
          
          {/* 2. SSL Secured Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <svg 
              className="w-5 h-5 text-green-600" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                clipRule="evenodd"
              />
            </svg>
            <div className="text-left">
              <div className="text-xs text-green-600">256-bit</div>
              <div className="text-sm font-semibold text-green-700">SSL Secured</div>
            </div>
          </div>
          
          {/* 3. Built with Next.js Badge */}
          <a 
            href="https://nextjs.org" 
            target="_blank" 
            rel="nofollow noopener"
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            aria-label="Built with Next.js"
          >
            <svg 
              className="w-5 h-5" 
              viewBox="0 0 180 180" 
              fill="white"
              aria-hidden="true"
            >
              <path d="M48 48h84v84H48z"/>
              <path d="M133 48L48 133V48h85z" opacity="0.3"/>
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-75">Powered by</div>
              <div className="text-sm font-semibold">Next.js</div>
            </div>
          </a>
          
        </div>
        
      </div>
    </div>
  );
}
