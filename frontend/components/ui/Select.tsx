import React from 'react';
import { FormField } from './FormField';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options: { label: string; value: string | number }[];
    placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', label, error, helperText, id, required, options, placeholder, value, ...props }, ref) => {
        const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

        return (
            <FormField
                label={label}
                required={required}
                error={error}
                helperText={helperText}
                htmlFor={inputId}
                className="max-w-[300px]" // Spec 7. Field width rules: Dropdown/select max width 300px
            >
                <select
                    id={inputId}
                    ref={ref}
                    required={required}
                    aria-invalid={!!error}
                    aria-describedby={error || helperText ? `${inputId}-desc` : undefined}
                    aria-required={required ? "true" : undefined}
                    value={value !== undefined ? value : ''}
                    className={`w-full border rounded-button px-4 py-3 md:py-2 text-base md:text-sm focus:ring-2 focus:ring-brand-light focus:border-brand-light outline-none transition-shadow min-h-[44px] md:min-h-0 bg-white
                    ${error ? 'border-[#D32F2F] focus:ring-[#D32F2F] focus:border-[#D32F2F]' : 'border-border'} 
                    ${className}`}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </FormField>
        );
    }
);
Select.displayName = 'Select';
