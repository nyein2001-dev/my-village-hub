'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { useAuth } from '@/hooks/useAuth';

export default function AdminArchivePage() {
    const { user } = useAuth();
    const [festivals, setFestivals] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('festivals');

    useEffect(() => {
        const fetchArchiveData = async () => {
            try {
                const [festivalsRes, blogsRes] = await Promise.all([
                    api.get('/festivals/'),
                    api.get('/youth-blogs/')
                ]);
                setFestivals(festivalsRes.data.results || festivalsRes.data);
                setBlogs(blogsRes.data.results || blogsRes.data);
            } catch (err) {
                console.error('Failed to load archive data', err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchArchiveData();
        }
    }, [user]);

    if (!user || (user.roles && !user.roles.includes('admin') && !user.roles.includes('content_editor'))) {
        return <div className="p-8 text-center text-red-500">You do not have permission to access the archive CMS.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Digital Archive Management</h1>
                    <p className="text-text-muted mt-1">Manage village festivals, youth blogs, and history records.</p>
                </div>
                <Button>Add New {activeTab === 'festivals' ? 'Festival' : 'Blog'}</Button>
            </div>

            <div className="flex space-x-4 border-b border-gray-200">
                <button
                    className={`pb-2 px-2 text-sm font-medium border-b-2 ${activeTab === 'festivals' ? 'border-brand text-brand' : 'border-transparent text-text-muted hover:text-text-main'}`}
                    onClick={() => setActiveTab('festivals')}
                >
                    Festivals
                </button>
                <button
                    className={`pb-2 px-2 text-sm font-medium border-b-2 ${activeTab === 'blogs' ? 'border-brand text-brand' : 'border-transparent text-text-muted hover:text-text-main'}`}
                    onClick={() => setActiveTab('blogs')}
                >
                    Youth Blogs
                </button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title/Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8">Loading data...</TableCell>
                                </TableRow>
                            )}
                            {!loading && activeTab === 'festivals' && festivals.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-text-muted">No festivals recorded yet.</TableCell>
                                </TableRow>
                            )}
                            {!loading && activeTab === 'blogs' && blogs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-text-muted">No blog posts available.</TableCell>
                                </TableRow>
                            )}

                            {!loading && activeTab === 'festivals' && festivals.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {item.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </TableCell>
                                    <TableCell>{item.start_date}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button size="sm" variant="outline">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {!loading && activeTab === 'blogs' && blogs.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {item.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </TableCell>
                                    <TableCell>{item.published_date || item.created_at}</TableCell>
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
