'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { TrendingUp, TrendingDown, Pin, Megaphone, PhoneCall } from 'lucide-react';

interface MarketPrice {
    id: string;
    crop_name: string;
    price: number;
    unit: string;
    price_date: string;
    trend: 'up' | 'down' | 'stable';
}

interface Announcement {
    id: string;
    title: string;
    content: string;
    category: string;
    is_pinned: boolean;
    created_at: string;
}

interface EmergencyContact {
    id: string;
    name: string;
    phone_number: string;
    category: string;
    description: string;
}

export default function InfoHubPage() {
    const [prices, setPrices] = useState<MarketPrice[]>([]);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [contacts, setContacts] = useState<EmergencyContact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInfoData = async () => {
            try {
                const [pricesRes, annRes, contactsRes] = await Promise.all([
                    api.get('/market-prices/'),
                    api.get('/announcements/'),
                    api.get('/emergency-contacts/')
                ]);
                setPrices(pricesRes.data.results || pricesRes.data);
                setAnnouncements(annRes.data.results || annRes.data);
                setContacts(contactsRes.data.results || contactsRes.data);
            } catch (err) {
                console.error('Failed to load info hub data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchInfoData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-text-primary mb-3">Information Hub</h1>
                <p className="text-text-secondary">Stay connected with essential updates, market trends, and emergency resources.</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin h-8 w-8 border-4 border-brand border-t-transparent rounded-full"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content Area (Announcements & Contacts) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Announcements */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2 border-b border-border pb-2">
                                <Megaphone className="text-brand h-6 w-6" /> Village Announcements
                            </h2>
                            {announcements.length === 0 ? (
                                <p className="text-text-secondary italic">No recent announcements.</p>
                            ) : (
                                <div className="space-y-4">
                                    {announcements.map(ann => (
                                        <Card key={ann.id} className={`border-l-4 ${ann.is_pinned ? 'border-l-blue-500 bg-blue-50/30' : 'border-l-brand'}`}>
                                            <CardContent className="p-5">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-lg text-text-primary flex items-center gap-2">
                                                        {ann.is_pinned && <Pin size={16} className="text-blue-500 rotate-45" />}
                                                        {ann.title}
                                                    </h3>
                                                    <span className="text-xs text-text-secondary whitespace-nowrap bg-gray-50 px-2 py-1 rounded">
                                                        {new Date(ann.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded mb-3">
                                                    {ann.category}
                                                </span>
                                                <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                                                    {ann.content}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Emergency Contacts */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2 border-b border-border pb-2 mt-12">
                                <PhoneCall className="text-error h-6 w-6" /> Emergency Contacts
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {contacts.length === 0 ? (
                                    <p className="text-text-secondary italic sm:col-span-2">No emergency contacts listed.</p>
                                ) : (
                                    contacts.map(contact => (
                                        <div key={contact.id} className="bg-red-50 border border-red-100 p-4 rounded-button flex flex-col justify-center">
                                            <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">{contact.category}</div>
                                            <h4 className="font-bold text-gray-900 text-lg">{contact.name}</h4>
                                            <a href={`tel:${contact.phone_number}`} className="text-2xl font-black text-error my-2 hover:underline">
                                                {contact.phone_number}
                                            </a>
                                            {contact.description && <p className="text-sm text-gray-600">{contact.description}</p>}
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Area (Market Prices) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-border rounded-card p-6 shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                                <TrendingUp className="text-brand h-5 w-5" /> Local Market Prices
                            </h2>

                            <p className="text-xs text-text-secondary mb-4">Prices act as a reference for buyers and sellers.</p>

                            {prices.length === 0 ? (
                                <p className="text-text-secondary italic text-sm">No market prices available right now.</p>
                            ) : (
                                <div className="space-y-0 divide-y divide-gray-100 text-sm">
                                    {prices.map(price => (
                                        <div key={price.id} className="py-3 flex justify-between items-center group">
                                            <div>
                                                <div className="font-medium text-text-primary group-hover:text-brand transition-colors">{price.crop_name}</div>
                                                <div className="text-xs text-text-secondary">{new Date(price.price_date).toLocaleDateString()}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-gray-900">
                                                    {price.price.toLocaleString()} Ks <span className="text-xs font-normal text-gray-500">/ {price.unit}</span>
                                                </div>
                                                <div className="flex justify-end mt-1">
                                                    {price.trend === 'up' && <span className="text-green-500 flex items-center text-xs font-medium"><TrendingUp size={12} className="mr-0.5" /> Up</span>}
                                                    {price.trend === 'down' && <span className="text-error flex items-center text-xs font-medium"><TrendingDown size={12} className="mr-0.5" /> Down</span>}
                                                    {price.trend === 'stable' && <span className="text-gray-400 flex items-center text-xs font-medium">- Stable</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
