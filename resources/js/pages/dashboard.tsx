import React, { useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export default function Dashboard() {
    const page = usePage();
    const auth = page.props.auth as { user?: User } | undefined;
    const user = auth?.user;

    useEffect(() => {
        // Redirect admin users to admin dashboard
        if (user?.role === 'admin') {
            router.visit('/admin');
            return;
        }
    }, [user]);

    if (user?.role === 'admin') {
        return null; // Don't render anything while redirecting
    }

    return (
        <AppShell>
            <Head title="🏠 Dashboard - ShopEase" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Welcome Section */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            👋 Welcome back, {user?.name}!
                        </h1>
                        <p className="text-gray-600">
                            Ready to explore amazing products and great deals?
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Link href="/products">
                            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="text-center">
                                    <div className="text-4xl mb-3">🛍️</div>
                                    <h3 className="font-semibold mb-2">Browse Products</h3>
                                    <p className="text-sm text-gray-600">Discover amazing items</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/cart">
                            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="text-center">
                                    <div className="text-4xl mb-3">🛒</div>
                                    <h3 className="font-semibold mb-2">My Cart</h3>
                                    <p className="text-sm text-gray-600">View cart items</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/wishlist">
                            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="text-center">
                                    <div className="text-4xl mb-3">❤️</div>
                                    <h3 className="font-semibold mb-2">My Wishlist</h3>
                                    <p className="text-sm text-gray-600">Saved items</p>
                                </div>
                            </div>
                        </Link>

                        <div 
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => {
                                const message = `Hi! I need help with my account or have questions about shopping.`;
                                const whatsappNumber = '1234567890';
                                const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                                window.open(url, '_blank');
                            }}
                        >
                            <div className="text-center">
                                <div className="text-4xl mb-3">💬</div>
                                <h3 className="font-semibold mb-2">Get Help</h3>
                                <p className="text-sm text-gray-600">WhatsApp support</p>
                            </div>
                        </div>
                    </div>

                    {/* Featured Categories */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4">🏷️ Popular Categories</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {[
                                { name: 'Electronics', icon: '📱', id: 1 },
                                { name: 'Fashion', icon: '👕', id: 2 },
                                { name: 'Home & Garden', icon: '🏡', id: 3 },
                                { name: 'Sports', icon: '⚽', id: 4 },
                                { name: 'Books', icon: '📚', id: 5 },
                                { name: 'Beauty', icon: '💄', id: 6 },
                            ].map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/products?category=${category.id}`}
                                    className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="text-3xl mb-2">{category.icon}</div>
                                    <h3 className="text-sm font-medium">{category.name}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Shopping Tips */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">💡 Shopping Tips</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl mb-2">💬</div>
                                <h3 className="font-semibold mb-2">WhatsApp Ordering</h3>
                                <p className="text-sm text-gray-600">
                                    Use our WhatsApp integration for quick ordering and instant support
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl mb-2">❤️</div>
                                <h3 className="font-semibold mb-2">Save Favorites</h3>
                                <p className="text-sm text-gray-600">
                                    Add items to your wishlist to save for later or share with friends
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl mb-2">🎯</div>
                                <h3 className="font-semibold mb-2">Smart Search</h3>
                                <p className="text-sm text-gray-600">
                                    Use filters to find exactly what you're looking for quickly
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Account Actions */}
                    <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-6 text-center">
                        <h2 className="text-2xl font-bold mb-4">🎉 Ready to Shop?</h2>
                        <p className="mb-6 opacity-90">
                            Discover amazing products and exclusive deals waiting for you!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/products">
                                <Button size="lg" variant="secondary">
                                    🛍️ Start Shopping
                                </Button>
                            </Link>
                            <Link href="/settings">
                                <Button 
                                    size="lg" 
                                    variant="outline" 
                                    className="text-white border-white hover:bg-white hover:text-indigo-600"
                                >
                                    ⚙️ Account Settings
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}