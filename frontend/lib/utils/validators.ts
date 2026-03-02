import { TranslationDictionary } from '@/lib/locales/en';

export const validateCropField = (field: string, value: string | number | boolean | null, t: TranslationDictionary): string => {
    switch (field) {
        case 'name':
            return !value ? t.common.validation.required : '';
        case 'category':
            return !value ? t.common.validation.required : '';
        case 'farmer':
            return !value ? t.common.validation.required : '';
        case 'quantity_available':
            return !value ? t.common.validation.required : '';
        case 'unit':
            return !value ? t.common.validation.required : '';
        default:
            return '';
    }
};

export const validateFarmerField = (field: string, value: string | number | boolean | null, t: TranslationDictionary): string => {
    switch (field) {
        case 'user':
            return !value ? t.common.validation.required : '';
        case 'full_name':
            return !value ? t.common.validation.required : '';
        case 'phone':
            if (!value) return t.common.validation.required;
            if (!/^\+?[0-9\s\-]{8,}$/.test(String(value))) return t.common.validation.phone;
            return '';
        case 'village_area':
            return !value ? t.common.validation.required : '';
        default:
            return '';
    }
};

export const validateOrderField = (field: string, value: string | number | boolean | null, t: TranslationDictionary, maxQty?: number): string => {
    switch (field) {
        case 'buyerName':
            return !value ? t.common.validation.required : '';
        case 'buyerPhone':
            if (!value) return t.common.validation.required;
            if (!/^\+?[0-9\s\-]{8,}$/.test(String(value))) return t.common.validation.phone;
            return '';
        case 'quantity':
            if (!value) return t.common.validation.required;
            const qty = parseFloat(value as string);
            if (isNaN(qty) || qty <= 0) return t.marketplace.orderRequest.errors.qtyReq;
            if (maxQty !== undefined && qty > maxQty) {
                return t.common.validation.maxLength.replace('{max}', String(maxQty)); // using max length text as fallback or a dedicated one
            }
            return '';
        default:
            return '';
    }
};

export const validateLoginField = (field: string, value: string, t: TranslationDictionary): string => {
    switch (field) {
        case 'email':
            if (!value) return t.common.validation.required;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t.common.validation.email;
            return '';
        case 'password':
            return !value ? t.common.validation.required : '';
        default:
            return '';
    }
};
