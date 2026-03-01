import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, helperText, id, ...props }, ref) => {
        const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

        return (
            <div className="w-full space-y-1">
                {label && (
                    <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
                        {label}
                    </label>
                )}
                <input
                    id={inputId}
                    ref={ref}
                    aria-invalid={!!error}
                    aria-describedby={error || helperText ? `${inputId}-desc` : undefined}
                    aria-required={props.required ? "true" : undefined}
                    className={`w-full border rounded-button px-4 py-2 focus:ring-2 focus:ring-brand-light focus:border-brand-light outline-none transition-shadow ${error ? 'border-error focus:ring-error focus:border-error' : 'border-border'
                        } ${className}`}
                    {...props}
                />
                {(error || helperText) && (
                    <p id={`${inputId}-desc`} role={error ? "alert" : undefined} className={`text-sm ${error ? 'text-error' : 'text-text-secondary'}`}>
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';
