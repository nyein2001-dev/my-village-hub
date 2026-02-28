'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/roles';

export default function AdminGalleryPage() {
    const { user } = useAuth();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await api.get('/photo-gallery/');
                setImages(res.data.results || res.data);
            } catch (err) {
                console.error('Failed to load gallery', err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchGallery();
        }
    }, [user]);

    if (!user || (!user.roles?.includes(UserRole.ADMIN) && !user.roles?.includes(UserRole.CONTENT_EDITOR))) {
        return <div className="p-8 text-center text-red-500">You must be an Administrator or Content Editor to manage the gallery.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Photo Gallery Management</h1>
                    <p className="text-text-muted mt-1">Upload and manage village photos.</p>
                </div>
                <Button>Upload New Photo</Button>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="aspect-square bg-surface animate-pulse rounded-xl"></div>
                    ))}
                </div>
            ) : images.length === 0 ? (
                <Card className="text-center py-12">
                    <p className="text-text-muted">No photos uploaded to the gallery yet.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img: any) => (
                        <div key={img.id} className="relative group aspect-square bg-surface-muted rounded-xl overflow-hidden border border-gray-200">
                            {img.image_detail?.file_path && (
                                <img
                                    src={img.image_detail.file_path}
                                    alt={img.caption || 'Gallery Image'}
                                    className="object-cover w-full h-full"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                <p className="text-white text-sm text-center line-clamp-2 mb-2">{img.caption || 'No Caption'}</p>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">Edit</Button>
                                </div>
                            </div>
                            <div className="absolute top-2 right-2 flex gap-1">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${img.is_published ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                                    {img.is_published ? 'PUB' : 'DRFT'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
