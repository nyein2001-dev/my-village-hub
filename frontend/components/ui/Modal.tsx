import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const Modal = ({ isOpen, onClose, title, children, footer, maxWidth = 'md' }: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-[95vw]'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            <div className={`relative w-full ${maxWidthClasses[maxWidth]} mx-auto my-6 z-50`}>
                <div className="relative flex flex-col w-full bg-white border-0 rounded-card shadow-card outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-border border-solid rounded-t-2xl">
                        <h3 className="text-xl font-semibold text-text-primary">
                            {title}
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-text-secondary float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:text-text-primary"
                            onClick={onClose}
                        >
                            <span className="block h-6 w-6 text-2xl outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>
                    <div className="relative p-6 flex-auto max-h-[70vh] overflow-y-auto">
                        {children}
                    </div>
                    {footer && (
                        <div className="flex items-center justify-end p-5 border-t border-border border-solid rounded-b-2xl">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
