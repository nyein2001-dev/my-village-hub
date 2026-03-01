import React from 'react';

export const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={`bg-white rounded-card shadow-card border border-border overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-6 border-b border-border ${className}`}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <h3 className={`text-xl font-semibold text-text-primary ${className}`}>
        {children}
    </h3>
);

export const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

export const CardFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-6 bg-gray-50 sm:px-6 flex items-center ${className}`}>
        {children}
    </div>
);
