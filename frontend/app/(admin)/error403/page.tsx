'use client';

import Link from 'next/link';

export default function Error403Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">403</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-8 max-w-md">
                You do not have permission to view this page. If you believe this is an error, please contact the administrator.
            </p>
            <Link
                href="/dashboard"
                className="bg-brand text-white px-6 py-3 rounded-button font-medium hover:bg-brand-dark transition-colors"
            >
                Return to Dashboard
            </Link>
        </div>
    );
}
