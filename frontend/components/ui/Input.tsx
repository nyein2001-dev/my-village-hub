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
                    <label htmlFor={inputId} className="block text-sm font-medium text-text-main">
                        {label}
                    </label>
                )}
                <input
                    id={inputId}
                    ref={ref}
                    className={`w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-brand-light focus:border-brand-light outline-none transition-shadow ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        } ${className}`}
                    {...props}
                />
                {(error || helperText) && (
                    <p className={`text-sm ${error ? 'text-red-500' : 'text-text-muted'}`}>
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';
