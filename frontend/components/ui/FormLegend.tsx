import React from 'react';

export function FormLegend() {
    return (
        <p className="text-xs text-text-secondary mb-4 italic">
            Fields marked <span className="text-error font-medium">*</span> are required
        </p>
    );
}
