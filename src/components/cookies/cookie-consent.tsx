'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const CONSENT_KEY = 'vietstrix_cookie_consent';

type ConsentStatus = 'accepted' | 'declined' | null;

function getConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === 'accepted' || value === 'declined') return value;
  return null;
}

function setConsent(status: 'accepted' | 'declined') {
  localStorage.setItem(CONSENT_KEY, status);
}

/**
 * Activate Google Analytics & GTM after user accepts cookies.
 * Grants consent to `gtag` so GA4 & GTM respect the signal.
 */
function activateAnalytics() {
  // Update gtag consent state
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
    });
  }
}

export default function CookieConsent() {
  const t = useTranslations('Cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === null) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    // If already accepted, make sure analytics are active
    if (consent === 'accepted') {
      activateAnalytics();
    }
  }, []);

  const handleAccept = useCallback(() => {
    setConsent('accepted');
    activateAnalytics();
    setVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    setConsent('declined');
    setVisible(false);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="cookie-consent-banner"
          role="dialog"
          aria-label="Cookie consent"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="cookie-consent"
        >
          <div>
            {/* Decorative glow */}
            <div className="cookie-consent__glow" aria-hidden="true" />

            <div className="cookie-consent__inner">
              {/* Icon + Text row */}
              <div className="cookie-consent__row">
                <div className="cookie-consent__icon" aria-hidden="true">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                    <path d="M8.5 8.5v.01" />
                    <path d="M16 15.5v.01" />
                    <path d="M12 12v.01" />
                    <path d="M11 17v.01" />
                    <path d="M7 14v.01" />
                  </svg>
                </div>

                <div className="cookie-consent__text">
                  <p className="cookie-consent__title">{t('title')}</p>
                  <p className="cookie-consent__desc">{t('description')}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="cookie-consent__actions">
                <button
                  id="cookie-decline-btn"
                  type="button"
                  onClick={handleDecline}
                  className="cookie-consent__btn cookie-consent__btn--decline"
                >
                  {t('decline')}
                </button>
                <button
                  id="cookie-accept-btn"
                  type="button"
                  onClick={handleAccept}
                  className="cookie-consent__btn cookie-consent__btn--accept"
                >
                  {t('accept')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
