'use client';

import { AuthProvider } from '@/hooks/useAuth';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { ReactNode } from 'react';

export function ClientProviders({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </AuthProvider>
    );
}
