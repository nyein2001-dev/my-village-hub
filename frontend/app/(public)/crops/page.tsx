/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/axios';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { MapPin, Scale, Leaf } from 'lucide-react';

interface Crop {
    id: string;
    name: string;
    category: string;
    description: string;
    quantity_available: number;
    unit: string;
    image_detail?: { file_url: string; file_path: string }; // Adjust based on actual DRF output
    farmer_detail: {
        id: string;
        full_name: string;
        village_area: string;
        phone: string;
    };
}

export default function CropsPage() {
    const [crops, setCrops] = useState<Crop[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Order Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
    const [buyerName, setBuyerName] = useState('');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [quantity, setQuantity] = useState('');
    const [notes, setNotes] = useState('');
    const [orderSubmitting, setOrderSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const response = await api.get('/crops/');
                // DRF usually returns paginated results { count, next, previous, results: [] }
                setCrops(response.data.results || response.data);
            } catch (err) {
                setError('Failed to load crops data. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCrops();
    }, []);

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCrop) return;

        setOrderSubmitting(true);
        try {
            await api.post('/orders/', {
                crop: selectedCrop.id,
                farmer: selectedCrop.farmer_detail?.id, // If needed by backend, though backend usually infers from crop. Wait, 'farmer' is a required field. The serializer expects 'farmer' ID. We have farmer_detail in Crop. 
                buyer_name: buyerName,
                buyer_phone: buyerPhone,
                quantity_requested: parseFloat(quantity),
                notes: notes
            });
            setOrderSuccess(true);
        } catch (err) {
            console.error('Order submission failed', err);
            alert('Failed to submit order. Please check inputs and try again.');
        } finally {
            setOrderSubmitting(false);
        }
    };

    const openOrderModal = (crop: Crop) => {
        setSelectedCrop(crop);
        setOrderSuccess(false);
        setBuyerName('');
        setBuyerPhone('');
        setQuantity('');
        setNotes('');
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 pl-4 border-l-4 border-brand">
                <h1 className="text-3xl font-bold text-text-primary">Marketplace Directory</h1>
                <p className="text-text-secondary mt-2">Browse the finest seasonal crops directly from our village farmers.</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin h-8 w-8 border-4 border-brand border-t-transparent rounded-full"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 text-error p-4 rounded-button border border-red-100">{error}</div>
            ) : crops.length === 0 ? (
                <div className="bg-white p-12 rounded-card text-center shadow-sm border border-border">
                    <h3 className="text-lg font-medium text-text-primary mb-2">No crops currently listed</h3>
                    <p className="text-text-secondary">Please check back later as our farmers update their seasonal harvest.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {crops.map((crop) => (
                        <Card key={crop.id} className="flex flex-col h-full hover:shadow-card transition-shadow">
                            {crop.image_detail ? (
                                <div className="h-48 w-full bg-gray-200 relative overflow-hidden shrink-0">
                                    {/* Fallback to gray box if no real image system is configured yet */}
                                    <img src={crop.image_detail.file_path || '/placeholder-crop.jpg'} alt={crop.name} className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="h-48 w-full bg-brand-tint flex items-center justify-center shrink-0">
                                    <Leaf className="h-12 w-12 text-brand opacity-50" />
                                </div>
                            )}

                            <CardContent className="flex-grow pt-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-xl font-bold text-text-primary line-clamp-1">{crop.name}</h2>
                                    <span className="bg-brand-tint text-brand text-xs px-2 py-1 rounded-full font-medium shrink-0">
                                        {crop.category}
                                    </span>
                                </div>

                                <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                                    {crop.description}
                                </p>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center text-text-primary">
                                        <Scale className="h-4 w-4 mr-2 text-gray-400" />
                                        <span className="font-medium">Available:</span>
                                        <span className="ml-1">{crop.quantity_available} {crop.unit}</span>
                                    </div>
                                    <div className="flex items-center text-text-primary">
                                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                        <span>{crop.farmer_detail?.village_area || 'Village Farm'}</span>
                                    </div>
                                    <div className="text-text-secondary text-xs mt-2 pt-2 border-t border-border">
                                        Farmer: {crop.farmer_detail?.full_name}
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="pt-0 border-t-0 bg-transparent">
                                <Button className="w-full" onClick={() => openOrderModal(crop)}>
                                    Request Order
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {/* Order Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => !orderSubmitting && setIsModalOpen(false)}
                title={orderSuccess ? "Order Requested" : `Order Request: ${selectedCrop?.name}`}
            >
                {orderSuccess ? (
                    <div className="text-center py-6">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Success!</h3>
                        <p className="text-text-secondary mb-6">Your order request has been submitted. The farmer will contact you shortly via phone.</p>
                        <Button onClick={() => setIsModalOpen(false)}>Back to Marketplace</Button>
                    </div>
                ) : (
                    <form onSubmit={handleOrderSubmit} className="space-y-4">
                        <p className="text-sm text-text-secondary mb-4">
                            You are requesting to buy <strong>{selectedCrop?.name}</strong> from <strong>{selectedCrop?.farmer_detail?.full_name}</strong>.
                            (Available: {selectedCrop?.quantity_available} {selectedCrop?.unit})
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Your Name *"
                                required
                                value={buyerName}
                                onChange={e => setBuyerName(e.target.value)}
                                placeholder="U Kyaw..."
                            />
                            <Input
                                label="Phone Number *"
                                type="tel"
                                required
                                value={buyerPhone}
                                onChange={e => setBuyerPhone(e.target.value)}
                                placeholder="09..."
                            />
                        </div>

                        <Input
                            label={`Quantity Requested (${selectedCrop?.unit}) *`}
                            type="number"
                            step="0.01"
                            min="0.1"
                            max={selectedCrop?.quantity_available || undefined}
                            required
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            placeholder="e.g. 50"
                        />

                        <div className="flex flex-col space-y-1">
                            <label className="block text-sm font-medium text-text-primary">Additional Notes (Optional)</label>
                            <textarea
                                className="w-full border border-border rounded-button px-4 py-2 focus:ring-2 focus:ring-brand-light focus:border-brand-light outline-none transition-shadow"
                                rows={3}
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                placeholder="Any special requirements?"
                            ></textarea>
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} disabled={orderSubmitting}>
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={orderSubmitting}>
                                Submit Request
                            </Button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}
