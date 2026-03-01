/* eslint-disable @typescript-eslint/no-explicit-any */
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
        return <div className="p-8 text-center text-error">You do not have permission to access the Info Hub CMS.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Information Hub Management</h1>
                    <p className="text-text-secondary mt-1">Manage market prices and village announcements.</p>
                </div>
                <Button>Add New {activeTab === 'prices' ? 'Market Price' : 'Announcement'}</Button>
            </div>

            <div className="flex space-x-4 border-b border-border">
                <button
                    className={`pb-2 px-2 text-sm font-medium border-b-2 ${activeTab === 'prices' ? 'border-brand text-brand' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
                    onClick={() => setActiveTab('prices')}
                >
                    Market Prices
                </button>
                <button
                    className={`pb-2 px-2 text-sm font-medium border-b-2 ${activeTab === 'announcements' ? 'border-brand text-brand' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
                    onClick={() => setActiveTab('announcements')}
                >
                    Announcements
                </button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table className="responsive-table border-spacing-0 border-0 md:w-full">
                        <TableHeader className="bg-gray-50 border-b border-border text-text-secondary md:table-header-group hidden">
                            <TableRow className="border-0">
                                <TableHead className="font-medium whitespace-nowrap">{activeTab === 'prices' ? 'Crop Name' : 'Title'}</TableHead>
                                {activeTab === 'prices' && <TableHead className="font-medium whitespace-nowrap">Price</TableHead>}
                                {activeTab === 'announcements' && <TableHead className="font-medium whitespace-nowrap">Category</TableHead>}
                                <TableHead className="font-medium whitespace-nowrap">Status</TableHead>
                                <TableHead className="text-right font-medium whitespace-nowrap">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100">
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 block md:table-cell text-text-secondary">Loading data...</TableCell>
                                </TableRow>
                            )}
                            {!loading && activeTab === 'prices' && prices.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-text-secondary block md:table-cell">No market prices recorded yet.</TableCell>
                                </TableRow>
                            )}
                            {!loading && activeTab === 'announcements' && announcements.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-text-secondary block md:table-cell">No announcements available.</TableCell>
                                </TableRow>
                            )}

                            {!loading && activeTab === 'prices' && prices.map((item: any) => (
                                <TableRow key={item.id} className="hover:bg-gray-50/50">
                                    <TableCell data-label="Crop Name" className="font-medium text-text-primary">{item.crop_name}</TableCell>
                                    <TableCell data-label="Price">{item.price} per {item.unit}</TableCell>
                                    <TableCell data-label="Status">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {item.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </TableCell>
                                    <TableCell data-label="Actions" className="justify-end space-x-2 text-right">
                                        <Button size="sm" variant="outline">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {!loading && activeTab === 'announcements' && announcements.map((item: any) => (
                                <TableRow key={item.id} className="hover:bg-gray-50/50">
                                    <TableCell data-label="Title" className="font-medium text-text-primary">{item.title}</TableCell>
                                    <TableCell data-label="Category" className="capitalize">{item.category}</TableCell>
                                    <TableCell data-label="Status">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {item.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </TableCell>
                                    <TableCell data-label="Actions" className="justify-end space-x-2 text-right">
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
