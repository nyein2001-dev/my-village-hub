/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/providers/ToastProvider';
import { FormLegend } from '@/components/ui/FormLegend';
import { validateLoginField } from '@/lib/utils/validators';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading } = useAuth();
    const { showToast } = useToast();
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

    const handleBlur = (field: 'email' | 'password') => {
        setTouched(prev => ({ ...prev, [field]: true }));
        if (field === 'email') setErrors(prev => ({ ...prev, email: validateLoginField('email', email) || undefined }));
        if (field === 'password') setErrors(prev => ({ ...prev, password: validateLoginField('password', password) || undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validateLoginField('email', email) || undefined;
        const passwordError = validateLoginField('password', password) || undefined;

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            setTouched({ email: true, password: true });
            return;
        }

        try {
            await login({ email, password });
            showToast('success', 'Logged in successfully.');
            // The auth context will handle navigation after successful login
        } catch (err: any) {
            showToast('error', err.response?.data?.detail || 'Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-brand-dark font-bold text-xl hover:text-brand transition-colors">
                <Leaf className="h-6 w-6" />
                <span>Taung Ywar Ma</span>
            </Link>

            <div className="w-full max-w-md">
                <Card>
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-2xl">Admin Login</CardTitle>
                        <p className="text-sm text-text-secondary mt-2">Sign in to access the community management console</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                            <FormLegend />
                            <Input
                                label="Email address"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (touched.email) setErrors(prev => ({ ...prev, email: validateLoginField('email', e.target.value) || undefined }));
                                }}
                                onBlur={() => handleBlur('email')}
                                placeholder="your@email.com"
                                error={touched.email ? errors.email : undefined}
                            />
                            <Input
                                label="Password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (touched.password) setErrors(prev => ({ ...prev, password: validateLoginField('password', e.target.value) || undefined }));
                                }}
                                onBlur={() => handleBlur('password')}
                                error={touched.password ? errors.password : undefined}
                            />
                            <Button
                                type="submit"
                                className="w-full mt-6"
                                isLoading={isLoading}
                            >
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
