'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { Users, Leaf, ShoppingCart, TrendingUp } from 'lucide-react';
import Link from 'next/link';


export default function DashboardHome() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        crops: 0,
        orders: 0,
        farmers: 0,
        marketPrices: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [cropsRes, ordersRes, farmersRes, pricesRes] = await Promise.all([
                    api.get('/crops/'),
                    api.get('/orders/'),
                    api.get('/farmers/'),
                    api.get('/market-prices/')
                ]);

                setStats({
                    crops: cropsRes.data.count || (Array.isArray(cropsRes.data.results) ? cropsRes.data.results.length : cropsRes.data.length),
                    orders: ordersRes.data.count || (Array.isArray(ordersRes.data.results) ? ordersRes.data.results.length : ordersRes.data.length),
                    farmers: farmersRes.data.count || (Array.isArray(farmersRes.data.results) ? farmersRes.data.results.length : farmersRes.data.length),
                    marketPrices: pricesRes.data.count || (Array.isArray(pricesRes.data.results) ? pricesRes.data.results.length : pricesRes.data.length),
                });
            } catch (err) {
                console.error('Failed to load dashboard stats', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { title: 'Total Crops', value: stats.crops, icon: Leaf, color: 'text-green-500', bg: 'bg-green-100', href: '/dashboard/crops' },
        { title: 'Farmer Profiles', value: stats.farmers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-100', href: '/dashboard/farmers' },
        { title: 'Order Requests', value: stats.orders, icon: ShoppingCart, color: 'text-orange-500', bg: 'bg-orange-100', href: '/dashboard/orders' },
        { title: 'Market Updates', value: stats.marketPrices, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-100', href: '/dashboard/info' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-primary">
                    Welcome back, {user?.username || 'Admin'}
                </h1>
                <p className="text-text-secondary mt-1">Here is the overview of your village platform today.</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-white animate-pulse rounded-card shadow-sm border border-border"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <Link key={i} href={stat.href}>
                                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                                    <CardContent className="p-6 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-text-secondary mb-1">{stat.title}</p>
                                            <h3 className="text-3xl font-bold text-text-primary">{stat.value}</h3>
                                        </div>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                                            <Icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Quick Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <Card>
                    <div className="p-6 border-b border-border flex justify-between items-center">
                        <h2 className="font-bold text-lg">Recent Order Requests</h2>
                        <Link href="/dashboard/orders" className="text-sm text-brand font-medium hover:underline">View All</Link>
                    </div>
                    <CardContent className="p-0">
                        <div className="p-6 text-center text-text-secondary text-sm">
                            Managing orders helps connect farmers to markets efficiently.
                            Access the full orders list to view details and update statuses.
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <div className="p-6 border-b border-border flex justify-between items-center">
                        <h2 className="font-bold text-lg">System Quick Links</h2>
                    </div>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/dashboard/archive" className="p-4 bg-gray-50 rounded-button hover:bg-brand-tint/30 transition-colors text-sm font-medium flex flex-col items-center justify-center gap-2 text-center text-text-primary">
                                <span>🏛️</span> Manage Digital Archive
                            </Link>
                            <Link href="/dashboard/info" className="p-4 bg-gray-50 rounded-button hover:bg-brand-tint/30 transition-colors text-sm font-medium flex flex-col items-center justify-center gap-2 text-center text-text-primary">
                                <span>📢</span> Post Announcement
                            </Link>
                            <Link href="/dashboard/emergency" className="p-4 bg-gray-50 rounded-button hover:bg-brand-tint/30 transition-colors text-sm font-medium flex flex-col items-center justify-center gap-2 text-center text-text-primary">
                                <span>🚨</span> Update Contacts
                            </Link>
                            <Link href="/dashboard/farmers" className="p-4 bg-gray-50 rounded-button hover:bg-brand-tint/30 transition-colors text-sm font-medium flex flex-col items-center justify-center gap-2 text-center text-text-primary">
                                <span>👤</span> Add New Farmer
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
