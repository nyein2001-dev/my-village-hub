import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface FormFieldProps {
    label?: string;
    required?: boolean;
    error?: string;
    helperText?: string;
    htmlFor?: string;
    children: React.ReactNode;
    className?: string;
}

export function FormField({
    label,
    required,
    error,
    helperText,
    htmlFor,
    children,
    className = '',
}: FormFieldProps) {
    return (
        <div className={`w-full space-y-1 ${className}`}>
            {label && (
                <label htmlFor={htmlFor} className="block text-sm font-medium text-text-primary">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}
            {children}
            {(error || helperText) && (
                <p
                    id={htmlFor ? `${htmlFor}-desc` : undefined}
                    role={error ? 'alert' : undefined}
                    className={`text-xs flex items-center gap-1 mt-1 ${error ? 'text-[#D32F2F]' : 'text-text-secondary'}`}
                >
                    {error && <AlertCircle className="h-3 w-3 flex-shrink-0" />}
                    <span>{error || helperText}</span>
                </p>
            )}
        </div>
    );
}

