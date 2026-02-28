'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login({ email, password });
            // The auth context will handle navigation after successful login
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-muted p-4">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-brand-dark font-bold text-xl hover:text-brand transition-colors">
                <Leaf className="h-6 w-6" />
                <span>Taung Ywar Ma</span>
            </Link>

            <div className="w-full max-w-md">
                <Card>
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-2xl">Admin Login</CardTitle>
                        <p className="text-sm text-text-muted mt-2">Sign in to access the community management console</p>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Email Address"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@taungywarma.com"
                            />
                            <Input
                                label="Password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
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
