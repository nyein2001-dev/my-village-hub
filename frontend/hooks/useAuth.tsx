'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User, AuthResponse } from '@/types/user';
import { UserRole } from '@/types/roles';
import { api } from '@/lib/api/axios';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('access_token');

            if (storedUser && token) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (e) {
                    console.error('Invalid user data in local storage', e);
                }
            }

            setIsLoading(false);
        };

        initAuth();

        // Listen for auth-expired events from interceptor
        const handleAuthExpired = () => {
            setUser(null);
            router.push('/login');
        };

        window.addEventListener('auth-expired', handleAuthExpired);
        return () => window.removeEventListener('auth-expired', handleAuthExpired);
    }, [router]);

    const login = async (credentials: { email: string; password: string }) => {
        try {
            const response = await api.post<AuthResponse>('/auth/login/', credentials);
            const { access, refresh, user: userData } = response.data;

            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('user', JSON.stringify(userData));

            setUser(userData);

            // Navigate based on roles
            if (userData.roles.includes(UserRole.ADMIN) || userData.roles.includes(UserRole.CONTENT_EDITOR)) {
                router.push('/dashboard');
            } else {
                router.push('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    const value = {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.roles.includes(UserRole.ADMIN) || false,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
