'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Toast, ToastType } from '@/components/ui/Toast';

export interface ToastData {
    type: ToastType;
    message: string;
}

interface ToastContextType {
    showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [currentToast, setCurrentToast] = useState<ToastData | null>(null);
    const [queue, setQueue] = useState<ToastData[]>([]);
    const pathname = usePathname();

    const showToast = useCallback((type: ToastType, message: string) => {
        setQueue((prevQueue) => [...prevQueue, { type, message }]);
    }, []);

    const handleClose = useCallback(() => {
        setCurrentToast(null);
    }, []);

    // Global event listener for non-React context triggers (e.g., axios)
    useEffect(() => {
        const handleGlobalToast = (event: CustomEvent<ToastData>) => {
            showToast(event.detail.type, event.detail.message);
        };

        window.addEventListener('global-toast', handleGlobalToast as EventListener);
        return () => {
            window.removeEventListener('global-toast', handleGlobalToast as EventListener);
        };
    }, [showToast]);

    // Process the queue
    useEffect(() => {
        if (!currentToast && queue.length > 0) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setCurrentToast(queue[0]);
            setQueue((prev) => prev.slice(1));
        }
    }, [currentToast, queue]);

    // Determine position based on pathname
    const isAdmin = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin');
    const positionClasses = isAdmin ? 'top-4 right-4 md:right-8' : 'top-4 left-1/2 -translate-x-1/2';

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {currentToast && (
                <div className={`fixed z-[200] max-w-[400px] w-full px-4 md:px-0 ${positionClasses}`}>
                    <Toast
                        type={currentToast.type}
                        message={currentToast.message}
                        onClose={handleClose}
                    />
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
