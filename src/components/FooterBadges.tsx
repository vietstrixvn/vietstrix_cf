// Quick Footer Badges Component
// Add to your existing Footer

export function FooterBadges() {
  return (
    <div className="footer-badges py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        
        {/* Trust Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
          
          {/* Clutch Badge */}
          <a 
            href="https://clutch.co/profile/vietstrix" 
            target="_blank" 
            rel="nofollow noopener"
            className="hover:opacity-80 transition"
            aria-label="View our Clutch profile"
          >
            <img 
              src="https://widget.clutch.co/static/badges/dark/clutch_review_badge.svg" 
              alt="Top Rated on Clutch"
              width="100"
              height="40"
              loading="lazy"
            />
          </a>
          
          {/* GoodFirms Badge */}
          <a 
            href="https://www.goodfirms.co/company/vietstrix" 
            target="_blank" 
            rel="nofollow noopener"
            className="hover:opacity-80 transition"
            aria-label="View our GoodFirms profile"
          >
            <img 
              src="https://assets.goodfirms.co/badges/normal-badge/top-web-developers.svg" 
              alt="Top Web Developer on GoodFirms"
              width="100"
              height="100"
              loading="lazy"
            />
          </a>
          
          {/* SSL Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
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
            <span className="text-sm font-medium text-green-700">
              SSL Secured
            </span>
          </div>
          
          {/* Location Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
            <svg 
              className="w-5 h-5 text-blue-600" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-blue-700">
              Ho Chi Minh City
            </span>
          </div>
          
        </div>
        
        {/* Tech Stack (Optional) */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <span>Powered by</span>
          <a 
            href="https://nextjs.org" 
            target="_blank" 
            rel="nofollow noopener"
            className="hover:text-gray-700 transition font-medium"
          >
            Next.js
          </a>
          <span>•</span>
          <a 
            href="https://vercel.com" 
            target="_blank" 
            rel="nofollow noopener"
            className="hover:text-gray-700 transition font-medium"
          >
            Vercel
          </a>
        </div>
        
      </div>
    </div>
  );
}
