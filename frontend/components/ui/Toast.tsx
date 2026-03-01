import React, { useEffect, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

const icons = {
    success: (
        <svg className="w-6 h-6 shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    ),
    error: (
        <svg className="w-6 h-6 shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    info: (
        <svg className="w-6 h-6 shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
};

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        // Dispatch close after exit animation
        setTimeout(onClose, 200);
    }, [onClose]);

    useEffect(() => {
        // Trigger enter animation
        const enterTimer = setTimeout(() => setIsVisible(true), 10);

        let autoDismissTimer: NodeJS.Timeout;
        if (type !== 'error') {
            const duration = type === 'info' ? 6000 : 4000;
            autoDismissTimer = setTimeout(() => {
                handleClose();
            }, duration);
        }

        return () => {
            clearTimeout(enterTimer);
            if (autoDismissTimer) clearTimeout(autoDismissTimer);
        };
    }, [type, handleClose]);

    const bgColors = {
        success: 'bg-[#2D6A4F]',
        error: 'bg-[#C62828]',
        info: 'bg-[#1565C0]'
    };

    return (
        <div
            role="alert"
            aria-live={type === 'error' ? 'assertive' : 'polite'}
            className={`flex items-start w-full p-4 text-white rounded shadow-lg transition-all duration-200 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                } ${bgColors[type]}`}
        >
            {icons[type]}
            <div className="flex-1 mt-0.5">
                <p className="text-sm font-medium line-clamp-2" title={message}>
                    {message}
                </p>
            </div>
            {(type === 'error' || true) && ( // we can always show the X button for accessibility
                <button
                    onClick={handleClose}
                    className="shrink-0 ml-4 text-white opacity-80 hover:opacity-100 p-1 -m-1 rounded focus:outline-none focus:ring-2 focus:ring-white transition-opacity"
                    aria-label="Dismiss notification"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
};
