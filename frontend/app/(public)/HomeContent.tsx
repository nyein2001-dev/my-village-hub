'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Leaf, Map, Heart } from 'lucide-react';
import { useLocale } from '@/lib/locales';

export default function HomeContent() {
    const { t } = useLocale();

    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-brand-dark text-white overflow-hidden py-section md:py-section">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        {t.public.home.hero.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-10 text-brand-tint max-w-2xl mx-auto">
                        {t.public.home.hero.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/crops">
                            <Button size="lg" className="w-full sm:w-auto bg-white text-brand hover:bg-gray-50">
                                {t.public.home.hero.ctaMarketplace}
                            </Button>
                        </Link>
                        <Link href="/archive">
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-white border-white hover:bg-white/10 hover:border-white">
                                {t.public.home.hero.ctaHistory}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="py-section bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-text-primary mb-4">{t.public.home.features.title}</h2>
                        <div className="w-24 h-1 bg-brand mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-card shadow-card text-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-16 h-16 bg-brand-tint rounded-card flex items-center justify-center mx-auto mb-6 text-brand">
                                <Leaf size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t.public.home.features.cropsTitle}</h3>
                            <p className="text-text-secondary mb-6">
                                {t.public.home.features.cropsDesc}
                            </p>
                            <Link href="/crops" className="text-brand font-medium hover:underline inline-flex items-center gap-1">
                                {t.public.home.features.cropsLink} <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="bg-white p-8 rounded-card shadow-card text-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-16 h-16 bg-brand-tint rounded-card flex items-center justify-center mx-auto mb-6 text-brand">
                                <Map size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t.public.home.features.infoTitle}</h3>
                            <p className="text-text-secondary mb-6">
                                {t.public.home.features.infoDesc}
                            </p>
                            <Link href="/info" className="text-brand font-medium hover:underline inline-flex items-center gap-1">
                                {t.public.home.features.infoLink} <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="bg-white p-8 rounded-card shadow-card text-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-16 h-16 bg-brand-tint rounded-card flex items-center justify-center mx-auto mb-6 text-brand">
                                <Heart size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t.public.home.features.cultureTitle}</h3>
                            <p className="text-text-secondary mb-6">
                                {t.public.home.features.cultureDesc}
                            </p>
                            <Link href="/archive" className="text-brand font-medium hover:underline inline-flex items-center gap-1">
                                {t.public.home.features.cultureLink} <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-section bg-brand text-white">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-3xl font-bold mb-6">{t.public.home.cta.title}</h2>
                    <p className="text-lg text-brand-tint mb-10">
                        {t.public.home.cta.desc}
                    </p>
                    <Link href="/crops">
                        <Button size="lg" className="bg-white text-brand hover:bg-gray-50 shadow-card shadow-black/10">
                            {t.public.home.cta.button}
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}
