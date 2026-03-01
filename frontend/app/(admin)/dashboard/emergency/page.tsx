/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/roles';

export default function AdminEmergencyContactsPage() {
    const { user } = useAuth();
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await api.get('/emergency-contacts/');
                setContacts(res.data.results || res.data);
            } catch (err) {
                console.error('Failed to load emergency contacts', err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchContacts();
        }
    }, [user]);

    if (!user || !user.roles?.includes(UserRole.ADMIN)) {
        return <div className="p-8 text-center text-error">You must be an Administrator to access Emergency Contacts.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Emergency Contacts Management</h1>
                    <p className="text-text-secondary mt-1">Manage village emergency service numbers and key persons.</p>
                </div>
                <Button>Add New Contact</Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name / Service</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">Loading data...</TableCell>
                                </TableRow>
                            )}
                            {!loading && contacts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-text-secondary">No emergency contacts recorded yet.</TableCell>
                                </TableRow>
                            )}

                            {!loading && contacts.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="font-mono">{item.phone}</TableCell>
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
