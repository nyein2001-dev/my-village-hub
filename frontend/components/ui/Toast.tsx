import React, { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (type !== 'error') {
            timer = setTimeout(() => {
                onClose();
            }, 4000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [type, onClose]);

    const bgColors = {
        success: 'bg-[#2D6A4F]',
        error: 'bg-[#C62828]',
        info: 'bg-[#1565C0]'
    };

    return (
        <div className={`fixed top-4 right-4 md:right-8 z-[200] flex items-center p-4 max-w-[400px] text-white rounded shadow-lg ${bgColors[type]}`}>
            <span className="flex-1 mr-4 overflow-hidden text-ellipsis line-clamp-2">{message}</span>
            <button
                onClick={onClose}
                className="text-white opacity-80 hover:opacity-100 p-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close notification"
            >
                <span className="block h-5 w-5 text-xl leading-none" aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};
