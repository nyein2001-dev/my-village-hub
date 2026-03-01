/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { Calendar, User, Clock } from 'lucide-react';

interface Festival {
    id: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    cover_image_detail?: { file_url: string };
}

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    published_date: string;
    author_detail?: { username: string };
    cover_image_detail?: { file_url: string };
}

export default function ArchivePage() {
    const [festivals, setFestivals] = useState<Festival[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArchiveData = async () => {
            try {
                const [festivalsRes, blogsRes] = await Promise.all([
                    api.get('/festivals/'),
                    api.get('/blog-posts/')
                ]);
                setFestivals(festivalsRes.data.results || festivalsRes.data);
                setBlogPosts(blogsRes.data.results || blogsRes.data);
            } catch (err) {
                console.error('Failed to load archive data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchArchiveData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-text-primary mb-4">Village Digital Archive</h1>
                <p className="text-text-secondary text-lg">Preserving our vibrant culture, documenting our history, and giving voice to our youth.</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin h-8 w-8 border-4 border-brand border-t-transparent rounded-full"></div>
                </div>
            ) : (
                <div className="space-y-16">

                    {/* Festivals Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-6 border-b border-border pb-2">
                            <Calendar className="text-brand h-6 w-6" />
                            <h2 className="text-2xl font-bold text-text-primary">Upcoming & Past Festivals</h2>
                        </div>

                        {festivals.length === 0 ? (
                            <p className="text-text-secondary italic">No signature festivals documented yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {festivals.map(festival => (
                                    <Card key={festival.id} className="overflow-hidden hover:shadow-card transition-shadow">
                                        <div className="h-48 bg-gray-200 relative">
                                            <img src={festival.cover_image_detail?.file_url || '/placeholder-festival.jpg'} alt={festival.name} className="w-full h-full object-cover" />
                                        </div>
                                        <CardContent className="pt-5">
                                            <h3 className="text-xl font-bold mb-2 line-clamp-1">{festival.name}</h3>
                                            <div className="flex items-center text-sm text-brand mb-3">
                                                <Clock className="w-4 h-4 mr-1" />
                                                <span>{new Date(festival.start_date).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-text-secondary text-sm line-clamp-3">{festival.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Youth Blog Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-6 border-b border-border pb-2">
                            <User className="text-brand h-6 w-6" />
                            <h2 className="text-2xl font-bold text-text-primary">Youth Perspectives Blog</h2>
                        </div>

                        {blogPosts.length === 0 ? (
                            <p className="text-text-secondary italic">No blog posts published yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {blogPosts.map(post => (
                                    <div key={post.id} className="flex flex-col sm:flex-row gap-4 bg-white rounded-card p-4 shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                                        <div className="sm:w-1/3 h-48 sm:h-auto bg-gray-200 rounded-button overflow-hidden shrink-0">
                                            <img src={post.cover_image_detail?.file_url || '/placeholder-blog.jpg'} alt={post.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="sm:w-2/3 flex flex-col justify-center">
                                            <div className="text-xs text-brand font-medium mb-2 flex items-center gap-2">
                                                <span>{new Date(post.published_date).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span>By {post.author_detail?.username || 'Village Youth'}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-2">{post.title}</h3>
                                            <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed">
                                                {post.excerpt || post.content.substring(0, 150) + '...'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                </div>
            )}
        </div>
    );
}
