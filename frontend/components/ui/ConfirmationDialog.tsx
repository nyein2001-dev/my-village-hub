import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmLabel: string;
    isDestructive?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel,
    isDestructive = true
}) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const cancelBtnRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            triggerRef.current = document.activeElement as HTMLElement;
            document.body.style.overflow = 'hidden';
            // Focus on Cancel button safely
            if (cancelBtnRef.current) {
                cancelBtnRef.current.focus();
            }
        } else {
            document.body.style.overflow = 'unset';
            if (triggerRef.current) {
                triggerRef.current.focus();
            }
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                e.preventDefault();
                onClose();
            }
            // Basic focus trap within the dialog
            if (e.key === 'Tab' && isOpen && dialogRef.current) {
                const focusable = dialogRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const first = focusable[0] as HTMLElement;
                const last = focusable[focusable.length - 1] as HTMLElement;

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Dialog */}
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
                className="relative w-full max-w-sm mx-auto my-6 z-[101]"
            >
                <div className="relative flex flex-col w-full bg-white border-0 rounded-card shadow-card outline-none focus:outline-none overflow-hidden">
                    <div className="p-6">
                        <h3 id="confirm-dialog-title" className="text-xl font-semibold text-text-primary mb-2">
                            {title}
                        </h3>
                        <p id="confirm-dialog-description" className="text-sm text-text-secondary mb-6">
                            {description}
                        </p>
                        <div className="flex items-center justify-end space-x-3">
                            <Button
                                ref={cancelBtnRef}
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant={isDestructive ? 'danger' : 'primary'}
                                onClick={() => {
                                    onConfirm();
                                }}
                            >
                                {confirmLabel}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
