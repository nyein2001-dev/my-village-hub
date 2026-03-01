/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/axios';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Plus, Trash2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { ConfirmationDialog } from '@/components/ui/ConfirmationDialog';
import { Toast, ToastType } from '@/components/ui/Toast';


export default function AdminFarmersPage() {
    const [farmers, setFarmers] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [farmerToDelete, setFarmerToDelete] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string, type: ToastType } | null>(null);
    const [formData, setFormData] = useState({ user: '', full_name: '', phone: '', village_area: '', bio: '', is_active: true });

    const fetchData = async () => {
        try {
            const [farmersRes, usersRes] = await Promise.all([
                api.get('/farmers/'),
                api.get('/users/')
            ]);
            setFarmers(farmersRes.data.results || farmersRes.data);
            setUsers(usersRes.data.results || usersRes.data);
            if ((usersRes.data.results || usersRes.data).length > 0) {
                setFormData(f => ({ ...f, user: (usersRes.data.results || usersRes.data)[0].id }));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/farmers/', formData);
            setIsModalOpen(false);
            fetchData();
            setFormData({ user: users[0]?.id || '', full_name: '', phone: '', village_area: '', bio: '', is_active: true });
        } catch (err) {
            alert('Failed to add farmer profile. Ensure all required fields are filled and user is not already a farmer.');
            console.error(err);
        }
    };

    const confirmDelete = (id: string) => {
        setFarmerToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!farmerToDelete) return;
        try {
            // Soft delete / deactivate
            await api.patch(`/farmers/${farmerToDelete}/`, { is_active: false });
            fetchData();
            setToast({ message: 'Farmer profile deactivated.', type: 'success' });
        } catch (err) {
            console.error(err);
            setToast({ message: 'Failed to deactivate farmer.', type: 'error' });
        } finally {
            setDeleteDialogOpen(false);
            setFarmerToDelete(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-text-primary">Farmers Management</h1>
                <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
                    <Plus size={16} /> Add Farmer
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="responsive-table">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Area</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={5} className="text-center text-text-secondary py-8 block md:table-cell">Loading...</td></tr>
                                ) : farmers.length === 0 ? (
                                    <tr><td colSpan={5} className="text-center text-text-secondary py-8 block md:table-cell">No farmer profiles found. Add one to get started.</td></tr>
                                ) : (
                                    farmers.map(farmer => (
                                        <tr key={farmer.id} className={!farmer.is_active ? 'opacity-60' : ''}>
                                            <td data-label="Full Name" className="font-medium text-text-primary">{farmer.full_name}</td>
                                            <td data-label="Area">{farmer.village_area}</td>
                                            <td data-label="Phone">
                                                <a href={`tel:${farmer.phone}`} className="text-brand hover:underline font-medium">{farmer.phone}</a>
                                            </td>
                                            <td data-label="Status">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${farmer.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {farmer.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td data-label="Actions" className="justify-end gap-2 text-right">
                                                {farmer.is_active && (
                                                    <Button variant="ghost" size="sm" onClick={() => confirmDelete(farmer.id)} className="text-error hover:text-red-700 hover:bg-red-50" title="Deactivate">
                                                        <Trash2 size={16} />
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Farmer Profile">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-text-primary">Link to Account *</label>
                        <select
                            className="w-full border border-border rounded-button px-4 py-2 focus:ring-2 focus:ring-brand-light outline-none"
                            required
                            value={formData.user} onChange={e => setFormData({ ...formData, user: e.target.value })}
                        >
                            {users.map(u => (
                                <option key={u.id} value={u.id}>{u.username} ({u.email})</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Full Name *" required value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} />
                        <Input label="Phone Number *" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    </div>

                    <Input label="Village Area / Location *" required value={formData.village_area} onChange={e => setFormData({ ...formData, village_area: e.target.value })} placeholder="e.g. North Zone, Farm Plot 12" />

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-text-primary">Biography (Optional)</label>
                        <textarea
                            className="w-full border border-border rounded-button px-4 py-2 focus:ring-2 focus:ring-brand-light outline-none"
                            rows={3} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Create Profile</Button>
                    </div>
                </form>
            </Modal>

            <ConfirmationDialog
                isOpen={deleteDialogOpen}
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setFarmerToDelete(null);
                }}
                onConfirm={handleDelete}
                title="Deactivate Account"
                description="This action will deactivate the farmer profile. They will no longer be visible in the public directory."
                confirmLabel="Deactivate Account"
            />

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
