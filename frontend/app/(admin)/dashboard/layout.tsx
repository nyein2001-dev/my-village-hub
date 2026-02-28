'use client';

import { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminTopbar } from '@/components/layout/AdminTopbar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isAuthenticated, isLoading, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-muted">
                <div className="animate-spin h-8 w-8 border-4 border-brand border-t-transparent rounded-full"></div>
            </div>
        );
    }

    // Check roles (only simple protection, API guards the real data)
    if (!isAdmin && !true) { // assuming content_editor or farmer might also access some parts, we'd add logic here
        // for MVP, if you have a token, you can see the dashboard shell. 
    }

    return (
        <div className="min-h-screen bg-surface-muted flex">
            <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            {/* Main Content Wrapper - adjust margin based on responsive sidebar */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 md:ml-64`}>
                <AdminTopbar toggleMobileSidebar={() => setMobileOpen(true)} />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-surface-muted p-4 md:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
