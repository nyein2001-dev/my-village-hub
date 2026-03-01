/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/axios';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Plus, Trash2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';


export default function AdminCropsPage() {
    const [crops, setCrops] = useState<any[]>([]);
    const [farmers, setFarmers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', category: 'Vegetables', description: '', quantity_available: '', unit: 'kg', farmer: '', is_published: true });

    const fetchCrops = async () => {
        try {
            const res = await api.get('/crops/');
            setCrops(res.data.results || res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchFarmers = async () => {
        try {
            const res = await api.get('/farmers/');
            setFarmers(res.data.results || res.data);
            if ((res.data.results || res.data).length > 0) {
                setFormData(f => ({ ...f, farmer: (res.data.results || res.data)[0].id }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCrops();
        fetchFarmers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/crops/', {
                ...formData,
                quantity_available: parseFloat(formData.quantity_available)
            });
            setIsModalOpen(false);
            fetchCrops();
            setFormData({ name: '', category: 'Vegetables', description: '', quantity_available: '', unit: 'kg', farmer: farmers[0]?.id || '', is_published: true });
        } catch (err) {
            alert('Failed to add crop. Ensure all required fields are filled.');
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this crop?')) return;
        try {
            await api.delete(`/crops/${id}/`);
            fetchCrops();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-text-primary">Crops Management</h1>
                <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
                    <Plus size={16} /> Add Crop
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="responsive-table">
                            <thead>
                                <tr>
                                    <th>Crop Name</th>
                                    <th>Category</th>
                                    <th>Farmer</th>
                                    <th>Available Qty</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={6} className="text-center text-text-secondary py-8 block md:table-cell">Loading...</td></tr>
                                ) : crops.length === 0 ? (
                                    <tr><td colSpan={6} className="text-center text-text-secondary py-8 block md:table-cell">No crops found. Add one to get started.</td></tr>
                                ) : (
                                    crops.map(crop => (
                                        <tr key={crop.id}>
                                            <td data-label="Crop Name" className="font-medium text-text-primary">{crop.name}</td>
                                            <td data-label="Category">{crop.category}</td>
                                            <td data-label="Farmer">{crop.farmer_detail?.full_name}</td>
                                            <td data-label="Available Qty">{crop.quantity_available} {crop.unit}</td>
                                            <td data-label="Status">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${crop.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {crop.is_published ? 'Published' : 'Hidden'}
                                                </span>
                                            </td>
                                            <td data-label="Actions" className="justify-end gap-2 text-right">
                                                <Button variant="ghost" size="sm" onClick={() => handleDelete(crop.id)} className="text-error hover:text-red-700 hover:bg-red-50">
                                                    <Trash2 size={16} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Crop">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Crop Name *" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-text-primary">Category *</label>
                            <select
                                className="w-full border border-border rounded-button px-4 py-2 focus:ring-2 focus:ring-brand-light outline-none"
                                value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Vegetables">Vegetables</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Grains">Grains</option>
                                <option value="Beans/Pulses">Beans/Pulses</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-text-primary">Farmer *</label>
                        <select
                            className="w-full border border-border rounded-button px-4 py-2 focus:ring-2 focus:ring-brand-light outline-none"
                            required
                            value={formData.farmer} onChange={e => setFormData({ ...formData, farmer: e.target.value })}
                        >
                            <option value="" disabled>Select a Farmer</option>
                            {farmers.map(f => (
                                <option key={f.id} value={f.id}>{f.full_name}</option>
                            ))}
                        </select>
                        {farmers.length === 0 && <p className="text-xs text-error mt-1">You must create a Farmer profile first before adding crops.</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Quantity Available *" type="number" step="0.01" required value={formData.quantity_available} onChange={e => setFormData({ ...formData, quantity_available: e.target.value })} />
                        <Input label="Unit *" required value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} placeholder="kg, basket, pieces" />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-text-primary">Description</label>
                        <textarea
                            className="w-full border border-border rounded-button px-4 py-2 focus:ring-2 focus:ring-brand-light outline-none"
                            rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="published" checked={formData.is_published} onChange={e => setFormData({ ...formData, is_published: e.target.checked })} className="rounded text-brand focus:ring-brand" />
                        <label htmlFor="published" className="text-sm">Publish immediately to marketplace</label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={farmers.length === 0}>Save Crop</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
