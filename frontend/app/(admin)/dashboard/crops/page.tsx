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
import { useToast } from '@/components/providers/ToastProvider';
import { FormLegend } from '@/components/ui/FormLegend';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { validateCropField } from '@/lib/utils/validators';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/roles';
import { useLocale } from '@/lib/locales';

export default function AdminCropsPage() {
    const { user } = useAuth();
    const [crops, setCrops] = useState<any[]>([]);
    const [farmers, setFarmers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [cropToDelete, setCropToDelete] = useState<string | null>(null);
    const { showToast } = useToast();
    const { t } = useLocale();
    const [formData, setFormData] = useState({ name: '', category: 'Vegetables', description: '', quantity_available: '', unit: 'kg', farmer: '', is_published: true });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const handleBlur = (field: string, value: any) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        setErrors(prev => ({ ...prev, [field]: validateCropField(field, value, t) }));
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (touched[field]) {
            setErrors(prev => ({ ...prev, [field]: validateCropField(field, value, t) }));
        }
    };

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

        let valid = true;
        const newErrors: { [key: string]: string } = {};
        const newTouched: { [key: string]: boolean } = {};

        Object.keys(formData).forEach(field => {
            const err = validateCropField(field, formData[field as keyof typeof formData], t);
            newTouched[field] = true;
            if (err) {
                newErrors[field] = err;
                valid = false;
            }
        });

        setErrors(newErrors);
        setTouched(newTouched);

        if (!valid) return;

        try {
            await api.post('/crops/', {
                ...formData,
                quantity_available: parseFloat(formData.quantity_available)
            });
            setIsModalOpen(false);
            fetchCrops();
            setFormData({ name: '', category: 'Vegetables', description: '', quantity_available: '', unit: 'kg', farmer: farmers[0]?.id || '', is_published: true });
            setErrors({});
            setTouched({});
            showToast('success', t.admin.crops.saveSuccess);
        } catch (err) {
            showToast('error', t.admin.crops.saveError);
            console.error(err);
        }
    };

    const confirmDelete = (id: string) => {
        setCropToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!cropToDelete) return;
        try {
            await api.delete(`/crops/${cropToDelete}/`);
            fetchCrops();
            showToast('success', t.admin.crops.deleteSuccess);
        } catch (err) {
            console.error(err);
            showToast('error', t.admin.crops.deleteError);
        } finally {
            setDeleteDialogOpen(false);
            setCropToDelete(null);
        }
    };

    if (!user || (!user.roles?.includes(UserRole.ADMIN) && !user.roles?.includes(UserRole.CONTENT_EDITOR) && !user.roles?.includes(UserRole.FARMER))) {
        return <div className="p-8 text-center text-[#C62828] font-medium">{t.admin.common.forbidden}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-text-primary">{t.admin.crops.title}</h1>
                <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
                    <Plus size={16} /> {t.admin.crops.addButton}
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="responsive-table">
                            <thead>
                                <tr>
                                    <th>{t.admin.crops.cropName}</th>
                                    <th>{t.admin.crops.category}</th>
                                    <th>{t.admin.crops.farmer}</th>
                                    <th>{t.admin.crops.availableQty}</th>
                                    <th>{t.admin.common.status}</th>
                                    <th className="text-right">{t.admin.common.actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={6} className="text-center text-text-secondary py-8 block md:table-cell">{t.admin.common.loading}</td></tr>
                                ) : crops.length === 0 ? (
                                    <tr><td colSpan={6} className="text-center text-text-secondary py-8 block md:table-cell">{t.admin.crops.empty}</td></tr>
                                ) : (
                                    crops.map(crop => (
                                        <tr key={crop.id}>
                                            <td data-label={t.admin.crops.cropName} className="font-medium text-text-primary">{crop.name}</td>
                                            <td data-label={t.admin.crops.category}>{crop.category}</td>
                                            <td data-label={t.admin.crops.farmer}>{crop.farmer_detail?.full_name}</td>
                                            <td data-label={t.admin.crops.availableQty}>{crop.quantity_available} {crop.unit}</td>
                                            <td data-label={t.admin.common.status}>
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${crop.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {crop.is_published ? t.admin.common.published : t.admin.common.hidden}
                                                </span>
                                            </td>
                                            <td data-label={t.admin.common.actions} className="justify-end gap-2 text-right">
                                                <Button variant="ghost" size="sm" onClick={() => confirmDelete(crop.id)} className="text-error hover:text-red-700 hover:bg-red-50">
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

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t.admin.crops.createTitle}>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <FormLegend />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label={t.admin.crops.cropName}
                            required
                            value={formData.name}
                            onChange={e => handleInputChange('name', e.target.value)}
                            onBlur={() => handleBlur('name', formData.name)}
                            error={touched.name ? errors.name : undefined}
                        />
                        <Select
                            label={t.admin.crops.category}
                            required
                            value={formData.category}
                            onChange={e => handleInputChange('category', e.target.value)}
                            onBlur={() => handleBlur('category', formData.category)}
                            error={touched.category ? errors.category : undefined}
                            options={[
                                { label: t.admin.crops.categories.vegetables, value: 'Vegetables' },
                                { label: t.admin.crops.categories.fruits, value: 'Fruits' },
                                { label: t.admin.crops.categories.grains, value: 'Grains' },
                                { label: t.admin.crops.categories.beans, value: 'Beans/Pulses' },
                                { label: t.admin.crops.categories.other, value: 'Other' },
                            ]}
                        />
                    </div>

                    <div className="space-y-1">
                        <Select
                            label={t.admin.crops.farmer}
                            required
                            value={formData.farmer}
                            onChange={e => handleInputChange('farmer', e.target.value)}
                            onBlur={() => handleBlur('farmer', formData.farmer)}
                            error={touched.farmer ? errors.farmer : undefined}
                            placeholder={t.admin.crops.selectFarmer}
                            options={farmers.map(f => ({ label: f.full_name, value: f.id }))}
                        />
                        {farmers.length === 0 && <p className="text-xs text-[#D32F2F] mt-1">{t.admin.crops.noFarmerWarning}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label={t.admin.crops.quantity}
                            type="number"
                            step="0.01"
                            required
                            value={formData.quantity_available}
                            onChange={e => handleInputChange('quantity_available', e.target.value)}
                            onBlur={() => handleBlur('quantity_available', formData.quantity_available)}
                            error={touched.quantity_available ? errors.quantity_available : undefined}
                            placeholder="e.g., 500"
                        />
                        <Input
                            label={t.admin.crops.unit}
                            required
                            value={formData.unit}
                            onChange={e => handleInputChange('unit', e.target.value)}
                            onBlur={() => handleBlur('unit', formData.unit)}
                            error={touched.unit ? errors.unit : undefined}
                            placeholder="e.g., kg"
                        />
                    </div>

                    <Textarea
                        label={t.admin.crops.description}
                        maxLength={1000}
                        rows={3}
                        value={formData.description}
                        onChange={e => handleInputChange('description', e.target.value)}
                    />

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="published" checked={formData.is_published} onChange={e => setFormData({ ...formData, is_published: e.target.checked })} className="rounded text-brand focus:ring-brand" />
                        <label htmlFor="published" className="text-sm">{t.admin.common.publishImmediately}</label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>{t.admin.common.cancel}</Button>
                        <Button type="submit" disabled={farmers.length === 0}>{t.admin.common.save}</Button>
                    </div>
                </form>
            </Modal>

            <ConfirmationDialog
                isOpen={deleteDialogOpen}
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setCropToDelete(null);
                }}
                onConfirm={handleDelete}
                title={t.admin.common.deleteConfirmTitle}
                description={t.admin.common.deleteConfirmDesc}
                confirmLabel={t.admin.common.delete}
            />
        </div>
    );
}
