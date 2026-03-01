/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/axios';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { CheckCircle, XCircle } from 'lucide-react';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
        } catch (err) {
            console.error(err);
            alert('Failed to update order status');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-text-primary">Order Requests</h1>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-border text-text-secondary">
                                <tr>
                                    <th className="px-6 py-4 font-medium whitespace-nowrap">Buyer Name</th>
                                    <th className="px-6 py-4 font-medium whitespace-nowrap">Contact</th>
                                    <th className="px-6 py-4 font-medium whitespace-nowrap">Item Requested</th>
                                    <th className="px-6 py-4 font-medium whitespace-nowrap">Date</th>
                                    <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
                                    <th className="px-6 py-4 font-medium text-right whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr><td colSpan={6} className="px-6 py-8 text-center text-text-secondary">Loading...</td></tr>
                                ) : orders.length === 0 ? (
                                    <tr><td colSpan={6} className="px-6 py-8 text-center text-text-secondary">No order requests yet.</td></tr>
                                ) : (
                                    orders.map(order => (
                                        <tr key={order.id} className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4 font-medium text-text-primary">{order.buyer_name}</td>
                                            <td className="px-6 py-4">{order.buyer_phone}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-brand">{order.crop_detail?.name}</div>
                                                <div className="text-xs text-text-secondary">{order.quantity_requested} {order.crop_detail?.unit}</div>
                                            </td>
                                            <td className="px-6 py-4 text-text-secondary">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-medium 
                          ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                            order.status === 'fulfilled' ? 'bg-green-100 text-green-800' :
                                                                'bg-red-100 text-red-800'}`}
                                                >
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {order.status === 'pending' && (
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => updateStatus(order.id, 'confirmed')} className="text-blue-600 hover:bg-blue-50" title="Confirm">
                                                            <CheckCircle size={16} />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={() => updateStatus(order.id, 'cancelled')} className="text-error hover:bg-red-50" title="Cancel">
                                                            <XCircle size={16} />
                                                        </Button>
                                                    </div>
                                                )}
                                                {order.status === 'confirmed' && (
                                                    <Button variant="outline" size="sm" onClick={() => updateStatus(order.id, 'fulfilled')} className="text-green-600 border-green-200 hover:bg-green-50">
                                                        Mark Fulfilled
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
