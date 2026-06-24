import { CustomImage } from '@/components';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function FooterSection() {
  const t = useTranslations('Page');

  const services = [
    {
      id: 1,
      title: 'End-to-End Web Development',
    },
    {
      id: 2,
      title: 'Product Design & UI/UX',
    },
    {
      id: 3,
      title: 'Web Systems & Optimization',
    },
    {
      id: 4,
      title: 'MVP Development for Startups',
    },
    {
      id: 5,
      title: 'Website Redesign & Revamp',
    },
  ];

  const introdues = [
    {
      id: 1,
      title: 'About Us',
      href: '/about-us',
    },
    {
      id: 2,
      title: 'Services',
      href: '/services',
    },
    {
      id: 3,
      title: 'Projects',
      href: '/projects',
    },
    {
      id: 4,
      title: 'Blogs',
      href: '/blogs',
    },
    {
      id: 5,
      title: 'Contact Us',
      href: '/contact-us',
    },
  ];

  return (
    <div>
      <div className="w-full pt-10 flex flex-col justify-start bg-white items-start">
        {/* Main Footer Content */}
        <div className="self-stretch h-auto flex flex-col md:flex-row justify-between items-stretch pr-0 pb-8 pt-0">
          <div className="h-auto p-4 md:p-8 flex flex-col justify-start items-start gap-8">
            {/* Brand Section */}
            <div className="rounded-md flex items-center justify-center">
              <Link
                href="/"
                className="flex items-center gap-3 shrink-0 group"
                id="logo-link"
              >
                <CustomImage
                  src="/icons/logo-cricle.svg"
                  alt="Vietstrix Team"
                  className="h-11 w-auto object-contain group-hover:scale-105 transition-transform"
                  width={44}
                  height={44}
                />
              </Link>
              <div className="flex text-black font-semibold">
                <span className="text-xl leading-none font-semibold uppercase">
                  VIETSTRIX
                </span>
              </div>
            </div>
            <h2 className="text-2xl font-bold leading-tight text-main lg:text-3xl">
              {t('Slogan')}
            </h2>

            {/* Social Media Icons */}
            <div className="flex justify-start items-start gap-4">
              {/* Twitter/X Icon */}
              <a
                href="https://x.com/Vietstrix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
                className="w-6 h-6 relative bg-white rounded-md overflow-hidden hover:bg-gray-100 transition-colors"
              >
                <div className="w-6 h-6 left-0 top-0 absolute flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      fill="#49423D"
                    />
                  </svg>
                </div>
                <span className="sr-only">Twitter/X</span>
              </a>

              {/* LinkedIn Icon */}
              <a
                href="https://www.linkedin.com/company/vietstrix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-6 bg-white rounded-md h-6 relative overflow-hidden hover:bg-gray-100 transition-colors"
              >
                <div className="w-6 h-6 left-0 top-0 absolute flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
                      fill="#49423D"
                    />
                  </svg>
                </div>
                <span className="sr-only">LinkedIn</span>
              </a>

              {/* GitHub Icon */}
              <a
                href="https://github.com/vietstrixvn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-6 bg-white rounded-md h-6 relative overflow-hidden hover:bg-gray-100 transition-colors"
              >
                <div className="w-6 h-6 left-0 top-0 absolute flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.374-12-12-12z"
                      fill="#49423D"
                    />
                  </svg>
                </div>
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="self-stretch p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Column */}
            <div className="flex flex-col justify-start items-start gap-3">
              <div className="text-main text-lg font-bold leading-5 ">
                Contact
              </div>
              <div className="flex flex-col justify-end items-start gap-2">
                <div className="text-main text-sm font-normal leading-5 ">
                  Location
                  <p className="text-black ">Ho Chi Minh, Vietnam</p>
                </div>
                <div className="text-main text-sm font-normal leading-5 ">
                  Email
                  <p className="text-black ">contact@vietstrix.com</p>
                </div>
                <div className="text-main text-sm font-normal leading-5 ">
                  Working hours
                  <p className="text-black =">Monday - Friday: 09:00 - 18:30</p>
                </div>
              </div>
            </div>

            {/* Services Column */}
            <div className="flex flex-col justify-start items-start gap-3">
              <div className="text-main text-lg font-bold leading-5 ">
                Services
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                {services.map((service) => (
                  <Link
                    key={service.title}
                    href={`/services`}
                    className="text-main hover:underline text-sm font-normal leading-5  cursor-pointer hover:text-primary-600 transition-colors"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Introduce Column */}
            <div className="flex flex-col justify-start items-start gap-3">
              <div className="text-main text-lg font-bold leading-5 ">
                Introduce
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                {introdues.map((introdue) => (
                  <Link
                    key={introdue.title}
                    href={introdue.href as any}
                    className="text-main hover:underline text-sm font-normal leading-5  cursor-pointer hover:text-primary-600 transition-colors"
                  >
                    {introdue.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-main text-gray-300 py-2">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          {/* Left side */}
          <div className="flex space-x-2">
            <CustomImage
              src="/icons/logo-cricle.svg"
              alt="Vietstrix Team"
              className="h-11 w-auto object-contain group-hover:scale-105 transition-transform"
              width={20}
              height={20}
            />
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-white font-semibold">Vietstrix</h3>
              <p className="text-sm text-gray-400">Fullstack Developer</p>
            </div>
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
              <i className="fas fa-external-link-alt"/>
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
    </div>
  );
}
