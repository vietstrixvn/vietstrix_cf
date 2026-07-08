import { CustomImage } from '@/components';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ParticleImage from './end';

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
    <footer>
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
                  style={{ width: 'auto' }}
                />
              </Link>
              <div className="flex flex-col items-start gap-1 font-semibold">
                <span className="text-xl text-black leading-none font-semibold uppercase">
                  VIETSTRIX
                </span>
                <div className="text-xs text-gray-400 font-normal">
                  © {new Date().getFullYear()} Vietstrix. All rights reserved.
                </div>
                <Link href="/privacy-policy" className="mt-1">
                  <span className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">Private Policy</span>
                </Link>
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

              {/* WhatsApp Icon */}
              <a
                href="https://wa.me/84906723985"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
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
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.444 5.703 1.447h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                      fill="#49423D"
                    />
                  </svg>
                </div>
                <span className="sr-only">WhatsApp</span>
              </a>

              {/* Telegram Icon */}
              <a
                href="https://t.me/hoangpm_strix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
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
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.98 4.72-1.388 6.903-.173.923-.513 1.233-.842 1.263-.715.066-1.257-.473-1.95-1.023-1.084-.861-1.697-1.396-2.748-2.088-1.215-.8-2.28-1.242-3.136-1.848-.302-.213-.6-.425-.867-.643-.538-.435-.157-.756.243-1.127.35-.325 3.018-2.768 3.57-3.004.24-.1.458-.236.425.109-.033.345-2.046 2.37-2.617 2.946l-.37.373c-.5.503-1.047.8-1.579.782-.544-.018-1.077-.282-1.488-.415-.5-.164-.9-.25-.864-.53.018-.146.22-.296.602-.45 2.358-1.026 5.864-2.482 7.025-2.966.86-.36 1.62-.51 2.057-.492.355.015.65.177.785.45.1.202.132.428.1.758z"
                      fill="#49423D"
                    />
                  </svg>
                </div>
                <span className="sr-only">Telegram</span>
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
                  <a
                    href="https://www.google.com/maps/search/Vietstrix+Ho+Chi+Minh+City"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-black hover:text-primary-600 hover:underline transition-colors"
                  >
                    Ho Chi Minh, Vietnam
                  </a>
                </div>
                <div className="text-main text-sm font-normal leading-5 ">
                  Email
                  <p className="text-black ">contact@vietstrix.com</p>
                </div>
                <div className="text-main text-sm font-normal leading-5 ">
                  Direct Chat
                  <div className="flex gap-2.5 text-black">
                    <a
                      href="https://wa.me/84377783437"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-600 hover:underline transition-colors font-medium"
                    >
                      WhatsApp
                    </a>
                    <span className="text-gray-300">|</span>
                    <a
                      href="https://t.me/vietstrix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sky-600 hover:underline transition-colors font-medium"
                    >
                      Telegram
                    </a>
                  </div>
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

      <ParticleImage />
    </footer>
  );
}
