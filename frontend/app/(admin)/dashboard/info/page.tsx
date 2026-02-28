'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/roles';

export default function AdminInfoHubPage() {
    const { user } = useAuth();
    const [prices, setPrices] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('prices');

    useEffect(() => {
        const fetchInfoData = async () => {
            try {
                const [pricesRes, annRes] = await Promise.all([
                    api.get('/market-prices/'),
                    api.get('/announcements/')
                ]);
                setPrices(pricesRes.data.results || pricesRes.data);
                setAnnouncements(annRes.data.results || annRes.data);
            } catch (err) {
                console.error('Failed to load info hub data', err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchInfoData();
        }
    }, [user]);

    if (!user || (!user.roles?.includes(UserRole.ADMIN) && !user.roles?.includes(UserRole.CONTENT_EDITOR))) {
        return <div className="p-8 text-center text-red-500">You do not have permission to access the Info Hub CMS.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Information Hub Management</h1>
                    <p className="text-text-muted mt-1">Manage market prices and village announcements.</p>
                </div>
                <Button>Add New {activeTab === 'prices' ? 'Market Price' : 'Announcement'}</Button>
            </div>

            <div className="flex space-x-4 border-b border-gray-200">
                <button
                    className={`pb-2 px-2 text-sm font-medium border-b-2 ${activeTab === 'prices' ? 'border-brand text-brand' : 'border-transparent text-text-muted hover:text-text-main'}`}
                    onClick={() => setActiveTab('prices')}
                >
                    Market Prices
                </button>
                <button
                    className={`pb-2 px-2 text-sm font-medium border-b-2 ${activeTab === 'announcements' ? 'border-brand text-brand' : 'border-transparent text-text-muted hover:text-text-main'}`}
                    onClick={() => setActiveTab('announcements')}
                >
                    Announcements
                </button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{activeTab === 'prices' ? 'Crop Name' : 'Title'}</TableHead>
                                {activeTab === 'prices' && <TableHead>Price</TableHead>}
                                {activeTab === 'announcements' && <TableHead>Category</TableHead>}
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8">Loading data...</TableCell>
                                </TableRow>
                            )}
                            {!loading && activeTab === 'prices' && prices.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-text-muted">No market prices recorded yet.</TableCell>
                                </TableRow>
                            )}
                            {!loading && activeTab === 'announcements' && announcements.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-text-muted">No announcements available.</TableCell>
                                </TableRow>
                            )}

                            {!loading && activeTab === 'prices' && prices.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.crop_name}</TableCell>
                                    <TableCell>{item.price} per {item.unit}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {item.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button size="sm" variant="outline">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {!loading && activeTab === 'announcements' && announcements.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell className="capitalize">{item.category}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {item.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button size="sm" variant="outline">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
