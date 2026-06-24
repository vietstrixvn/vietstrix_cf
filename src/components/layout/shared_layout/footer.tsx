import React from 'react';

export const FooterShare = () => {
  return (
    <footer className="bg-main text-gray-300 py-2">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Left side */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-white font-semibold">Vietstrix</h3>
          <p className="text-sm text-gray-400">Fullstack Developer</p>
        </div>

        {/* Center */}
        <div className="text-sm text-gray-400 text-center mb-4 md:mb-0">
          © {new Date().getFullYear()} Vietstrix. All rights reserved.
        </div>

        {/* Right side */}
        <div className="flex space-x-5">
          <a
            href="https://www.linkedin.com/company/vietstrix"
            className="text-white hover:text-primary-50"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="https://github.com/vietstrixvn"
            className="text-white hover:text-primary-50"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.vietstrix.com/about-us"
            className="text-white hover:text-primary-50"
            aria-label="Portfolio"
          >
            <i className="fas fa-external-link-alt"></i>
            <span className="sr-only">Portfolio</span>
          </a>
          <a
            href="mailto:contact@vietstrix.com"
            className="text-white hover:text-primary-50"
            aria-label="Email"
          >
            <i className="fas fa-envelope"></i>
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
