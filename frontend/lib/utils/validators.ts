export const validateCropField = (field: string, value: string | number | boolean | null): string => {
    switch (field) {
        case 'name':
            return !value ? 'Crop name is required.' : '';
        case 'category':
            return !value ? 'Category is required.' : '';
        case 'farmer':
            return !value ? 'Farmer is required.' : '';
        case 'quantity_available':
            return !value ? 'Quantity available is required.' : '';
        case 'unit':
            return !value ? 'Unit is required.' : '';
        default:
            return '';
    }
};

export const validateFarmerField = (field: string, value: string | number | boolean | null): string => {
    switch (field) {
        case 'user':
            return !value ? 'User account is required.' : '';
        case 'full_name':
            return !value ? 'Full name is required.' : '';
        case 'phone':
            if (!value) return 'Phone number is required.';
            if (!/^\+?[0-9\s\-]{8,}$/.test(String(value))) return 'Please enter a valid phone number.';
            return '';
        case 'village_area':
            return !value ? 'Village area / location is required.' : '';
        default:
            return '';
    }
};

export const validateOrderField = (field: string, value: string | number | boolean | null, maxQty?: number): string => {
    switch (field) {
        case 'buyerName':
            return !value ? 'Your name is required.' : '';
        case 'buyerPhone':
            if (!value) return 'Phone number is required.';
            if (!/^\+?[0-9\s\-]{8,}$/.test(String(value))) return 'Please enter a valid phone number.';
            return '';
        case 'quantity':
            if (!value) return 'Quantity is required.';
            const qty = parseFloat(value as string);
            if (isNaN(qty) || qty <= 0) return 'Quantity must be greater than 0.';
            if (maxQty !== undefined && qty > maxQty) {
                return `Quantity cannot exceed available stock (${maxQty}).`;
            }
            return '';
        default:
            return '';
    }
};

export const validateLoginField = (field: string, value: string): string => {
    switch (field) {
        case 'email':
            if (!value) return 'Email address is required.';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
            return '';
        case 'password':
            return !value ? 'Password is required.' : '';
        default:
            return '';
    }
};
