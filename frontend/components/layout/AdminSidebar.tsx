'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
    LayoutDashboard, ShoppingCart, Users, Leaf,
    MapPin, BookOpen, AlertTriangle, Image as ImageIcon,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const ADMIN_NAV = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/crops', label: 'Crops', icon: Leaf },
    { href: '/dashboard/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/dashboard/farmers', label: 'Farmers', icon: Users },
    { href: '/dashboard/archive', label: 'Digital Archive', icon: BookOpen },
    { href: '/dashboard/gallery', label: 'Gallery', icon: ImageIcon },
    { href: '/dashboard/info', label: 'News & Prices', icon: MapPin },
    { href: '/dashboard/emergency', label: 'Emergency', icon: AlertTriangle },
];

export function AdminSidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean, setMobileOpen: (open: boolean) => void }) {
    const pathname = usePathname();
    const { user } = useAuth();
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <>
            {/* Mobile Backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar sidebar */}
            <aside
                className={`fixed top-0 bottom-0 left-0 z-40 bg-brand-dark text-white shadow-card transition-all duration-300 ease-in-out flex flex-col
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${collapsed ? 'md:w-20' : 'w-64'}
        `}
            >
                {/* Brand */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
                    {!collapsed && (
                        <div className="flex items-center gap-2 font-bold text-lg truncate">
                            <Leaf className="h-5 w-5 text-brand-light shrink-0" />
                            <span className="truncate">Taung Ywar Ma</span>
                        </div>
                    )}
                    {collapsed && (
                        <div className="flex justify-center w-full">
                            <Leaf className="h-6 w-6 text-brand-light" />
                        </div>
                    )}
                    <button
                        className="hidden md:flex text-white/70 hover:text-white p-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light"
                        onClick={toggleSidebar}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                {/* User Summary */}
                {!collapsed && (
                    <div className="p-4 border-b border-white/10 shrink-0">
                        <div className="text-sm font-medium truncate">{user?.username}</div>
                        <div className="text-xs text-brand-tint truncate">{user?.roles.join(', ')}</div>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1 scrollbar-hide">
                    {ADMIN_NAV.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-button transition-colors
                  ${isActive ? 'bg-brand text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}
                  ${collapsed ? 'justify-center' : ''}
                `}
                                title={collapsed ? link.label : undefined}
                            >
                                <Icon size={20} className="shrink-0" />
                                {!collapsed && <span className="text-sm font-medium truncate">{link.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
