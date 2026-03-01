'use client';

import { useAuth } from '@/hooks/useAuth';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AdminTopbar({ toggleMobileSidebar }: { toggleMobileSidebar: () => void }) {
    const { logout } = useAuth();

    return (
        <header className="h-16 bg-white shadow-sm border-b border-border flex items-center justify-between px-4 lg:px-6 z-30 sticky top-0">
            <div className="flex items-center gap-4">
                <button
                    className="md:hidden text-text-secondary hover:text-text-primary p-1 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                    onClick={toggleMobileSidebar}
                    aria-label="Toggle sidebar"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-semibold text-text-primary hidden sm:block">Admin Console</h1>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-error hover:text-red-700 hover:bg-red-50"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Sign Out</span>
                </Button>
            </div>
        </header>
    );
}
