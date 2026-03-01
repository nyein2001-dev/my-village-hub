import React from 'react';
import { UserRole } from '@/types/roles';

type RoleBadgeProps = {
    roles?: string[] | string;
};

export function RoleBadge({ roles }: RoleBadgeProps) {
    if (!roles) return null;

    // Normalize to array
    const rolesArray = Array.isArray(roles) ? roles : [roles];

    // Determine the primary role to display
    // Priority: admin > content_editor > farmer
    let label = 'User';
    let bgColor = 'bg-gray-500';

    if (rolesArray.includes(UserRole.ADMIN)) {
        label = 'Admin';
        bgColor = 'bg-[#1B4332]'; // dark green
    } else if (rolesArray.includes(UserRole.CONTENT_EDITOR)) {
        label = 'Content Editor';
        bgColor = 'bg-[#1565C0]'; // blue
    } else if (rolesArray.includes(UserRole.FARMER)) {
        label = 'Farmer';
        bgColor = 'bg-[#F57C00]'; // orange
    } else if (rolesArray.length > 0) {
        label = rolesArray[0].charAt(0).toUpperCase() + rolesArray[0].slice(1);
    }

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold text-white ${bgColor}`}>
            {label}
        </span>
    );
}
