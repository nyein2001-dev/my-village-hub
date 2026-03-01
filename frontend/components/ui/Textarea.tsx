import React from 'react';
import { FormField } from './FormField';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = '', label, error, helperText, id, required, value = '', maxLength, onChange, ...props }, ref) => {
        const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
        const currentLength = typeof value === 'string' ? value.length : 0;
        const showCounter = maxLength !== undefined;
        const isNearLimit = showCounter && currentLength >= maxLength * 0.9;

        // If there's an error, we show the error.
        // If no error, we show helperText + counter.
        // But since we want to show BOTH character counter AND error, we compose them or place the counter separately.
        // The spec says: "{current}/{max} characters. Turns red at >=90% usage. Does NOT show error until exceeding limit."

        return (
            <FormField
                label={label}
                required={required}
                error={error}
                helperText={helperText}
                htmlFor={inputId}
            >
                <div>
                    <textarea
                        id={inputId}
                        ref={ref}
                        required={required}
                        aria-invalid={!!error}
                        aria-describedby={`${inputId}-desc ${inputId}-counter`}
                        aria-required={required ? "true" : undefined}
                        value={value}
                        maxLength={maxLength}
                        onChange={onChange}
                        className={`w-full border rounded-button px-4 py-3 md:py-2 text-base md:text-sm focus:ring-2 focus:ring-brand-light focus:border-brand-light outline-none transition-shadow 
                        ${error ? 'border-[#D32F2F] focus:ring-[#D32F2F] focus:border-[#D32F2F]' : 'border-border'} 
                        ${className}`}
                        {...props}
                    />
                    {showCounter && (
                        <div
                            id={`${inputId}-counter`}
                            className={`text-xs text-right mt-1 ${isNearLimit ? 'text-[#D32F2F]' : 'text-text-secondary'}`}
                        >
                            {currentLength}/{maxLength} characters
                        </div>
                    )}
                </div>
            </FormField>
        );
    }
);
Textarea.displayName = 'Textarea';
