'use client';

import { AuthProvider } from '@/hooks/useAuth';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { LocaleProvider } from '@/lib/locales';
import { ReactNode } from 'react';

export function ClientProviders({ children }: { children: ReactNode }) {
    return (
        <LocaleProvider>
            <AuthProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </AuthProvider>
        </LocaleProvider>
    );
}
