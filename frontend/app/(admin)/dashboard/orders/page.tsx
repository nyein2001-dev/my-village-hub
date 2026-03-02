/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/axios';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/components/providers/ToastProvider';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/roles';
import { useLocale } from '@/lib/locales';

export default function AdminOrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const { t } = useLocale();

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders/');
            setOrders(res.data.results || res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            await api.patch(`/orders/${id}/`, { status });
            fetchOrders();

            // Generate translated status message based on status string
            const translatedStatus = typeof t.admin.orderRequests.statuses[status as keyof typeof t.admin.orderRequests.statuses] === 'string'
                ? t.admin.orderRequests.statuses[status as keyof typeof t.admin.orderRequests.statuses]
                : status;

            showToast('success', t.admin.orderRequests.statusUpdated.replace('{status}', translatedStatus as string));
        } catch (err) {
            console.error(err);
            showToast('error', t.admin.orderRequests.statusUpdateError);
        }
    };

    if (!user || (!user.roles?.includes(UserRole.ADMIN) && !user.roles?.includes(UserRole.FARMER))) {
        return <div className="p-8 text-center text-[#C62828] font-medium">{t.admin.common.forbidden}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-text-primary">{t.admin.orderRequests.title}</h1>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="responsive-table">
                            <thead>
                                <tr>
                                    <th>{t.admin.orderRequests.columns.buyerName}</th>
                                    <th>{t.admin.orderRequests.columns.contact}</th>
                                    <th>{t.admin.orderRequests.columns.itemRequested}</th>
                                    <th>{t.admin.orderRequests.columns.date}</th>
                                    <th>{t.admin.common.status}</th>
                                    <th className="text-right">{t.admin.common.actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={6} className="text-center text-text-secondary py-8 block md:table-cell">{t.admin.common.loading}</td></tr>
                                ) : orders.length === 0 ? (
                                    <tr><td colSpan={6} className="text-center text-text-secondary py-8 block md:table-cell">{t.admin.orderRequests.empty}</td></tr>
                                ) : (
                                    orders.map(order => (
                                        <tr key={order.id}>
                                            <td data-label={t.admin.orderRequests.columns.buyerName} className="font-medium text-text-primary">{order.buyer_name}</td>
                                            <td data-label={t.admin.orderRequests.columns.contact}>
                                                <a href={`tel:${order.buyer_phone}`} className="text-brand hover:underline font-medium">{order.buyer_phone}</a>
                                            </td>
                                            <td data-label={t.admin.orderRequests.columns.itemRequested}>
                                                <div className="flex flex-col items-end md:items-start text-right md:text-left">
                                                    <div className="font-medium text-brand">{order.crop_detail?.name}</div>
                                                    <div className="text-xs text-text-secondary">{order.quantity_requested} {order.crop_detail?.unit}</div>
                                                </div>
                                            </td>
                                            <td data-label={t.admin.orderRequests.columns.date} className="text-text-secondary">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td data-label={t.admin.common.status}>
                                                <span className={`px-2 py-1 rounded text-xs font-medium 
                                                    ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                            order.status === 'fulfilled' ? 'bg-green-100 text-green-800' :
                                                                'bg-red-100 text-red-800'}`}
                                                >
                                                    {t.admin.orderRequests.statuses[order.status as keyof typeof t.admin.orderRequests.statuses] || order.status}
                                                </span>
                                            </td>
                                            <td data-label={t.admin.common.actions} className="justify-end gap-2 text-right">
                                                {order.status === 'pending' && (
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => updateStatus(order.id, 'confirmed')} className="text-blue-600 hover:bg-blue-50" title={t.admin.orderRequests.actions.confirm}>
                                                            <CheckCircle size={16} />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={() => updateStatus(order.id, 'cancelled')} className="text-error hover:bg-red-50" title={t.admin.orderRequests.actions.cancel}>
                                                            <XCircle size={16} />
                                                        </Button>
                                                    </div>
                                                )}
                                                {order.status === 'confirmed' && (
                                                    <Button variant="outline" size="sm" onClick={() => updateStatus(order.id, 'fulfilled')} className="text-green-600 border-green-200 hover:bg-green-50">
                                                        {t.admin.orderRequests.actions.markFulfilled}
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
        </div>
    );
}
