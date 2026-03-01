'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Menu, X, Leaf } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/crops', label: 'Marketplace' },
    { href: '/archive', label: 'Village Life' },
    { href: '/info', label: 'Info Hub' },
];

export function PublicHeader() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated, isAdmin } = useAuth();

    return (
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-brand-dark font-bold text-xl">
                    <Leaf className="text-brand h-6 w-6" />
                    <span>Taung Ywar Ma</span>
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
                            <Button variant="primary" size="sm">Dashboard</Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button variant="outline" size="sm">Admin Login</Button>
                        </Link>
                    )}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-border pb-4 px-4 space-y-4 shadow-card absolute w-full left-0 top-16">
                    {NAV_LINKS.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block text-sm font-medium py-2 ${pathname === link.href ? 'text-brand' : 'text-text-secondary'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-2 border-t border-border">
                        {isAuthenticated && isAdmin ? (
                            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="primary" className="w-full">Dashboard</Button>
                            </Link>
                        ) : (
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full">Admin Login</Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
