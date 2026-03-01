'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
    LayoutDashboard, Users, Leaf, ShoppingCart,
    MapPin, BookOpen, AlertTriangle, Image as ImageIcon,
    ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { RoleBadge } from '@/components/shared/ui/RoleBadge';
import { UserRole } from '@/types/roles';
import { useEffect } from 'react';

const ADMIN_NAV = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: [UserRole.ADMIN, UserRole.CONTENT_EDITOR, UserRole.FARMER] },
    { href: '/dashboard/users', label: 'Users', icon: Users, roles: [UserRole.ADMIN] },
    { href: '/dashboard/crops', label: 'Crops', icon: Leaf, roles: [UserRole.ADMIN, UserRole.CONTENT_EDITOR, UserRole.FARMER] },
    { href: '/dashboard/orders', label: 'Orders', icon: ShoppingCart, roles: [UserRole.ADMIN, UserRole.FARMER] },
    { href: '/dashboard/farmers', label: 'Farmers', icon: Users, roles: [UserRole.ADMIN, UserRole.FARMER] },
    { href: '/dashboard/archive', label: 'Digital Archive', icon: BookOpen, roles: [UserRole.ADMIN, UserRole.CONTENT_EDITOR] },
    { href: '/dashboard/gallery', label: 'Gallery', icon: ImageIcon, roles: [UserRole.ADMIN, UserRole.CONTENT_EDITOR] },
    { href: '/dashboard/info', label: 'News & Prices', icon: MapPin, roles: [UserRole.ADMIN, UserRole.CONTENT_EDITOR] },
    { href: '/dashboard/emergency', label: 'Emergency', icon: AlertTriangle, roles: [UserRole.ADMIN, UserRole.CONTENT_EDITOR] },
];

export function AdminSidebar({
    mobileOpen,
    setMobileOpen,
    collapsed,
    setCollapsed
}: {
    mobileOpen: boolean,
    setMobileOpen: (open: boolean) => void,
    collapsed: boolean,
    setCollapsed: (col: boolean) => void
}) {
    const pathname = usePathname();
    const { user } = useAuth();

    const toggleSidebar = () => setCollapsed(!collapsed);

    // Auto-collapse on tablet resize if needed, though we can just rely on css classes if handled properly. 
    // Spec: Tablet 768-1023px Admin sidebar: icon-only collapsed (56px, expands on tap).
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                setCollapsed(true);
            } else if (window.innerWidth >= 1024) {
                setCollapsed(false);
            }
        };
        // Initial check
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setCollapsed]);

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
                className={`fixed top-0 bottom-0 left-0 z-50 bg-brand-dark text-white shadow-card transition-all duration-300 ease-in-out flex flex-col
          ${mobileOpen ? 'translate-x-0 w-full' : '-translate-x-full md:translate-x-0'}
          ${collapsed ? 'md:w-[56px]' : 'md:w-[240px]'}
        `}
            >
                {/* Brand */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
                    {(!collapsed || mobileOpen) && (
                        <div className="flex items-center gap-2 font-bold text-lg truncate">
                            <Leaf className="h-5 w-5 text-brand-light shrink-0" />
                            <span className="truncate">Taung Ywar Ma</span>
                        </div>
                    )}
                    {collapsed && !mobileOpen && (
                        <div className="flex justify-center w-full cursor-pointer" onClick={toggleSidebar} aria-label="Expand sidebar">
                            <Leaf className="h-6 w-6 text-brand-light" />
                        </div>
                    )}

                    {/* Desktop/Tablet Toggle */}
                    <button
                        className="hidden md:flex text-white/70 hover:text-white p-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light min-h-[44px] min-w-[44px] items-center justify-center"
                        onClick={toggleSidebar}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>

                    {/* Mobile Close Button */}
                    <button
                        className="md:hidden flex text-white/70 hover:text-white p-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light min-h-[44px] min-w-[44px] items-center justify-center"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* User Summary */}
                {(!collapsed || mobileOpen) && (
                    <div className="p-4 border-b border-white/10 shrink-0">
                        <div className="text-sm font-medium truncate mb-1">{user?.username || 'Admin User'}</div>
                        <RoleBadge roles={user?.roles || []} />
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1 scrollbar-hide">
                    {ADMIN_NAV.map((link) => {
                        // Check access
                        const userRoles = user?.roles || ['user']; // Default to avoid crash
                        const hasAccess = userRoles.some(r => link.roles.includes(r as UserRole));
                        if (!hasAccess && user?.roles) return null; // Wait for roles if undefined

                        const Icon = link.icon;
                        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => {
                                    setMobileOpen(false);
                                    // if tablet and expanded, auto-collapse on navigation
                                    if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                                        setCollapsed(true);
                                    }
                                }}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-button transition-colors min-h-[44px]
                  ${isActive ? 'bg-brand text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}
                  ${collapsed && !mobileOpen ? 'justify-center' : ''}
                `}
                                title={collapsed ? link.label : undefined}
                            >
                                <Icon size={20} className="shrink-0" />
                                {(!collapsed || mobileOpen) && <span className="text-sm font-medium truncate">{link.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
