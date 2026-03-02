'use client';
import { en, TranslationDictionary } from './en';
import { mm } from './mm';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Extract the language keys
export type Locale = 'en' | 'mm';

// Define the context shape
interface LocaleContextType {
    locale: Locale;
    setLocale: (l: Locale) => void;
    t: TranslationDictionary;
}

// Ensure mm specifically matches en structurally
// by exporting dictionaries typed to TranslationDictionary
export const dictionaries: Record<Locale, TranslationDictionary> = {
    en,
    mm
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('mm'); // Default to Burmese

    useEffect(() => {
        // Attempt to read from localStorage on client mount
        const saved = localStorage.getItem('village-locale') as Locale;
        if (saved && dictionaries[saved]) {
            setLocaleState(saved);
        }
    }, []);

    const setLocale = (l: Locale) => {
        setLocaleState(l);
        localStorage.setItem('village-locale', l);
    };

    return (
        <LocaleContext.Provider value= {{ locale, setLocale, t: dictionaries[locale] }
}>
    { children }
    </LocaleContext.Provider>
  );
}

export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
}
