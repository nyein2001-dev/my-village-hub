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
        <header className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
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
                            className={`text-sm font-medium transition-colors hover:text-brand ${pathname === link.href ? 'text-brand border-b-2 border-brand pb-1' : 'text-text-muted'}`}
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
                    className="md:hidden text-text-main"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-surface border-b border-gray-100 pb-4 px-4 space-y-4 shadow-lg absolute w-full left-0 top-16">
                    {NAV_LINKS.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block text-sm font-medium py-2 ${pathname === link.href ? 'text-brand' : 'text-text-muted'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-2 border-t border-gray-100">
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
