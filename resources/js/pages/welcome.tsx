import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    price: number;
    sale_price?: number;
    images: string[];
    rating: number;
    category: {
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
    image?: string;
    children: Category[];
}

interface Banner {
    id: number;
    title: string;
    description?: string;
    image: string;
    link?: string;
}

interface Props {
    featuredProducts: Product[];
    categories: Category[];
    banners: Banner[];
    newProducts: Product[];
    auth: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ featuredProducts, categories, auth }: Props) {
    return (
        <>
            <Head title="🛍️ ShopEase - Your Premier Online Shopping Destination" />
            
            {auth.user ? (
                <AppShell>
                    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                        {/* Hero Section */}
                        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
                            <div className="container mx-auto px-4 text-center">
                                <h1 className="text-5xl font-bold mb-4">
                                    🛍️ Welcome to ShopEase
                                </h1>
                                <p className="text-xl mb-8 opacity-90">
                                    Discover amazing products at unbeatable prices
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Link href="/products">
                                        <Button size="lg" variant="secondary">
                                            🛒 Shop Now
                                        </Button>
                                    </Link>
                                    <Link href="/cart">
                                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-600">
                                            🛍️ View Cart
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Categories Section */}
                        {categories.length > 0 && (
                            <div className="py-16 bg-white">
                                <div className="container mx-auto px-4">
                                    <h2 className="text-3xl font-bold text-center mb-12">
                                        🏷️ Shop by Category
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={`/products?category=${category.id}`}
                                                className="group text-center hover:scale-105 transition-transform"
                                            >
                                                <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-3 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                                                    <span className="text-3xl">📦</span>
                                                </div>
                                                <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600">
                                                    {category.name}
                                                </h3>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Featured Products Section */}
                        {featuredProducts.length > 0 && (
                            <div className="py-16 bg-gray-50">
                                <div className="container mx-auto px-4">
                                    <h2 className="text-3xl font-bold text-center mb-12">
                                        ⭐ Featured Products
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {featuredProducts.map((product) => (
                                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                                    <span className="text-6xl">📸</span>
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-gray-800 mb-2">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {product.category.name}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-lg text-indigo-600">
                                                                ${product.sale_price || product.price}
                                                            </span>
                                                            {product.sale_price && (
                                                                <span className="text-sm text-gray-500 line-through">
                                                                    ${product.price}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-yellow-400">⭐</span>
                                                            <span className="text-sm ml-1">{product.rating}</span>
                                                        </div>
                                                    </div>
                                                    <Link
                                                        href={`/products/${product.id}`}
                                                        className="block w-full mt-3"
                                                    >
                                                        <Button className="w-full" size="sm">
                                                            View Product
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Features Section */}
                        <div className="py-16 bg-white">
                            <div className="container mx-auto px-4">
                                <h2 className="text-3xl font-bold text-center mb-12">
                                    ✨ Why Choose ShopEase?
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="text-center">
                                        <div className="text-5xl mb-4">💬</div>
                                        <h3 className="text-xl font-semibold mb-2">WhatsApp Support</h3>
                                        <p className="text-gray-600">
                                            Get instant support and place orders directly through WhatsApp
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-5xl mb-4">🚚</div>
                                        <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                                        <p className="text-gray-600">
                                            Quick and reliable delivery with real-time order tracking
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-5xl mb-4">💳</div>
                                        <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                                        <p className="text-gray-600">
                                            Multiple payment options including COD and bank transfer
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AppShell>
            ) : (
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-8xl mb-8">🛍️</div>
                            <h1 className="text-6xl font-bold text-gray-800 mb-6">
                                ShopEase
                            </h1>
                            <p className="text-2xl text-gray-600 mb-8">
                                Your Premier Online Shopping Destination
                            </p>
                            
                            {/* Features Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="text-4xl mb-3">🛒</div>
                                    <h3 className="font-semibold mb-2">Smart Shopping</h3>
                                    <p className="text-sm text-gray-600">Intuitive cart and wishlist features</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="text-4xl mb-3">💬</div>
                                    <h3 className="font-semibold mb-2">WhatsApp Integration</h3>
                                    <p className="text-sm text-gray-600">Direct communication with sellers</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="text-4xl mb-3">⭐</div>
                                    <h3 className="font-semibold mb-2">Product Reviews</h3>
                                    <p className="text-sm text-gray-600">Read and write authentic reviews</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="text-4xl mb-3">🎯</div>
                                    <h3 className="font-semibold mb-2">Smart Recommendations</h3>
                                    <p className="text-sm text-gray-600">Personalized product suggestions</p>
                                </div>
                            </div>

                            {/* User Benefits */}
                            <div className="bg-white rounded-xl p-8 mb-12 shadow-lg">
                                <h2 className="text-3xl font-bold mb-6 text-gray-800">For Buyers</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                    <div>
                                        <h4 className="font-semibold mb-2 text-indigo-600">🔍 Smart Search & Filtering</h4>
                                        <p className="text-gray-600 mb-4">Find exactly what you need with advanced filters</p>
                                        
                                        <h4 className="font-semibold mb-2 text-indigo-600">🛍️ Easy Shopping Experience</h4>
                                        <p className="text-gray-600">Add to cart, save to wishlist, or buy instantly</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2 text-indigo-600">💳 Flexible Payments</h4>
                                        <p className="text-gray-600 mb-4">COD, bank transfer, and promo codes</p>
                                        
                                        <h4 className="font-semibold mb-2 text-indigo-600">📱 WhatsApp Support</h4>
                                        <p className="text-gray-600">Get help or place orders via WhatsApp</p>
                                    </div>
                                </div>
                            </div>

                            {/* Admin Benefits */}
                            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8 mb-12">
                                <h2 className="text-3xl font-bold mb-6 text-gray-800">For Sellers & Admins</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                    <div>
                                        <h4 className="font-semibold mb-2 text-purple-600">📦 Product Management</h4>
                                        <p className="text-gray-600 mb-4">Easy inventory and catalog management</p>
                                        
                                        <h4 className="font-semibold mb-2 text-purple-600">📊 Sales Analytics</h4>
                                        <p className="text-gray-600">Comprehensive reports and statistics</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2 text-purple-600">🎯 Promotion Tools</h4>
                                        <p className="text-gray-600 mb-4">Create banners, discounts, and promo codes</p>
                                        
                                        <h4 className="font-semibold mb-2 text-purple-600">👥 Customer Management</h4>
                                        <p className="text-gray-600">Manage users and track customer activity</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8">
                                <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
                                <p className="text-xl mb-6 opacity-90">
                                    Join thousands of satisfied customers
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/register">
                                        <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                                            🚀 Get Started - It's Free!
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button 
                                            size="lg" 
                                            variant="outline" 
                                            className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-indigo-600"
                                        >
                                            🔑 Sign In
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}