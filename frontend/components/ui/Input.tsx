import React from 'react';
import { FormField } from './FormField';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, helperText, id, required, ...props }, ref) => {
        const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

        return (
            <FormField
                label={label}
                required={required}
                error={error}
                helperText={helperText}
                htmlFor={inputId}
            >
                <input
                    id={inputId}
                    ref={ref}
                    required={required}
                    aria-invalid={!!error}
                    aria-describedby={error || helperText ? `${inputId}-desc` : undefined}
                    aria-required={required ? "true" : undefined}
                    className={`w-full border rounded-button px-4 py-3 md:py-2 text-base md:text-sm focus:ring-2 focus:ring-brand-light focus:border-brand-light outline-none transition-shadow min-h-[44px] md:min-h-0 
                    ${error ? 'border-[#D32F2F] focus:ring-[#D32F2F] focus:border-[#D32F2F]' : 'border-border'} 
                    ${className}`}
                    {...props}
                />
            </FormField>
        );
    }
);
Input.displayName = 'Input';
