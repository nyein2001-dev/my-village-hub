'use client';

import { useAuth } from '@/hooks/useAuth';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AdminTopbar({ toggleMobileSidebar }: { toggleMobileSidebar: () => void }) {
    const { logout } = useAuth();

    return (
        <header className="h-16 bg-surface shadow-sm border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 z-30 sticky top-0">
            <div className="flex items-center gap-4">
                <button
                    className="md:hidden text-text-muted hover:text-text-main p-1 rounded-md"
                    onClick={toggleMobileSidebar}
                >
                    <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-semibold text-text-main hidden sm:block">Admin Console</h1>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Sign Out</span>
                </Button>
            </div>
        </header>
    );
}
