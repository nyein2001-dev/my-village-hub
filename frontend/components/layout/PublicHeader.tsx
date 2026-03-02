'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Menu, X, Leaf } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocale } from '@/lib/locales';

export function PublicHeader() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated, isAdmin } = useAuth();
    const { t, locale, setLocale } = useLocale();

    const NAV_LINKS = [
        { href: '/', label: t.navigation.public.home },
        { href: '/crops', label: t.navigation.public.marketplace },
        { href: '/archive', label: t.navigation.public.archive },
        { href: '/info', label: t.navigation.public.infoHub },
    ];

    const toggleLanguage = () => setLocale(locale === 'en' ? 'mm' : 'en');

    return (
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-brand-dark font-bold text-xl">
                    <Leaf className="text-brand h-6 w-6" />
                    <span>{t.common.villageName}</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {NAV_LINKS.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-brand ${pathname === link.href ? 'text-brand border-b-2 border-brand pb-1' : 'text-text-secondary'}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {isAuthenticated && isAdmin ? (
                        <Link href="/dashboard">
                            <Button variant="primary" size="sm" aria-label={t.navigation.admin.dashboard}>{t.navigation.admin.dashboard}</Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button variant="outline" size="sm" aria-label={t.auth.login.submitButton}>{t.auth.login.submitButton}</Button>
                        </Link>
                    )}
                    <button
                        onClick={toggleLanguage}
                        className="text-sm font-semibold border border-brand text-brand px-2 py-1 rounded hover:bg-brand/10 transition-colors"
                        aria-label="Toggle Language"
                    >
                        {locale === 'en' ? 'မြန်မာ' : 'En'}
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded min-h-[44px] min-w-[44px] flex items-center justify-center p-1"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-border pb-4 px-4 space-y-4 shadow-card absolute w-full left-0 top-16">
                    {NAV_LINKS.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center text-sm font-medium py-2 min-h-[44px] ${pathname === link.href ? 'text-brand' : 'text-text-secondary'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-2 border-t border-border">
                        {isAuthenticated && isAdmin ? (
                            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="primary" className="w-full">{t.navigation.admin.dashboard}</Button>
                            </Link>
                        ) : (
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full">{t.auth.login.submitButton}</Button>
                            </Link>
                        )}
                        <div className="pt-4 flex justify-center">
                            <button
                                onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }}
                                className="w-full text-center text-sm font-semibold border-2 border-brand text-brand px-4 py-2 rounded hover:bg-brand/10 transition-colors"
                            >
                                Switch to {locale === 'en' ? 'မြန်မာစာ' : 'English'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
