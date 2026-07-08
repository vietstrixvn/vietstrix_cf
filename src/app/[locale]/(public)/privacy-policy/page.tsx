import { generatePageMetadata } from '@/constants/appInfos';
import type { Metadata } from 'next';
import React from 'react';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    return generatePageMetadata({
        title: 'Privacy Policy',
        description: 'Privacy Policy for Vietstrix. Learn how we collect, use, protect, and manage your personal information.',
        path: '/privacy-policy',
        locale,
        keywords: [
            'privacy policy',
            'vietstrix privacy',
            'data protection',
            'data privacy policy',
            'information collection',
        ],
    });
}

export default async function PrivacyPolicyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    const privacyPolicyJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy - Vietstrix',
        description: 'Privacy Policy for Vietstrix. Learn how we collect, use, protect, and manage your personal information.',
        url: `https://www.vietstrix.com${locale === 'vi' ? '/vi' : ''}/privacy-policy`,
        inLanguage: locale,
        publisher: {
            '@type': 'Organization',
            name: 'Vietstrix',
            url: 'https://www.vietstrix.com',
            logo: 'https://www.vietstrix.com/icons/logo-cricle.svg',
        },
    };

    const sections = [
        {
            title: 'Information We Collect',
            content:
                'We collect data to ensure seamless interactions and personalized experiences. When you use our services, we may collect personal details such as your name, email, and phone number. Additionally, we track your interactions with our website, including the pages you visit, the device you use, and the time spent on specific sections. Cookies are also used to store preferences and enhance functionality. All data collected is handled responsibly to maintain transparency and build trust.',
        },
        {
            title: 'How We Use Your Data',
            content:
                'The information you share with us is used to improve and personalize your experience. It helps us communicate effectively, optimize our services, and understand user preferences. Whether we’re tailoring recommendations, sending updates, or improving website functionality, your data remains secure and confidential.',
        },
        {
            title: 'Your Rights',
            content:
                'We believe in empowering users to manage their personal data. You have the right to request access, update inaccuracies, or delete your information when necessary. If you no longer wish to receive updates or want to manage your cookie preferences, you can do so easily. Our commitment is to give you full control over your data while ensuring you remain informed about how it’s used.',
        },
        {
            title: 'Data Protection',
            content:
                'We employ state-of-the-art measures to protect the information entrusted to us. From encryption to secure servers, your data is stored and managed with industry-leading security protocols. We also conduct regular system checks to prevent unauthorized access. While no system is completely immune to threats, our continuous efforts minimize risks and provide you with a safe online environment.',
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPolicyJsonLd) }}
            />

            <div className="relative overflow-hidden bg-white py-16 sm:py-24 mt-16">
                {/* Background gradient decorative element */}
                <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-100/30 to-blue-50/20 filter blur-3xl" />
                <div className="pointer-events-none absolute left-0 bottom-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-50/20 to-cyan-50/30 filter blur-3xl" />

                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        <span>Home</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-primary-600">Privacy Policy</span>
                    </div>

                    {/* Header */}
                    <div className="border-b border-gray-100 pb-10">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            Privacy Policy
                        </h1>
                        <p className="mt-4 text-sm font-medium text-gray-500">
                            Last Updated: November 15, 2025
                        </p>
                    </div>

                    {/* Main Content Sections */}
                    <div className="mt-12 space-y-12">
                        {sections.map((section, index) => (
                            <section key={index} className="group">
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-primary-600">
                                    {section.title}
                                </h2>
                                <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                                    {section.content}
                                </p>
                            </section>
                        ))}

                        {/* Contact Section Box */}
                        <section className="mt-16 rounded-2xl border border-gray-100 bg-gray-50/50 p-8 sm:p-10">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                Contact Us
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                                If you have questions, need assistance, or want to know more about our data practices, we encourage you to contact us. Transparency is integral to our approach, and we are here to provide clarity whenever needed. Whether it’s a simple query or a detailed concern, our team is ready to address your inquiries promptly and professionally.
                            </p>
                            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                                <a
                                    href="mailto:contact@vietstrix.com"
                                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-600/20"
                                >
                                    Email Us: contact@vietstrix.com
                                </a>
                                <span className="text-sm font-medium text-gray-400 py-1 sm:py-0">or</span>
                                <a
                                    href={`/${locale}/contact-us`}
                                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-900 transition-all hover:border-gray-900 hover:bg-gray-50"
                                >
                                    Visit Contact Page
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
