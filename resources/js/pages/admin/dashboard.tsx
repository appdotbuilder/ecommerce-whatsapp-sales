import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Stats {
    total_products: number;
    active_products: number;
    total_users: number;
    total_categories: number;
    total_orders: number;
    pending_orders: number;
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    total_amount: number;
    created_at: string;
    user: {
        name: string;
        email: string;
    };
}

interface Product {
    id: number;
    name: string;
    stock_quantity: number;
    category: {
        name: string;
    };
}

interface Props {
    stats: Stats;
    recentOrders: Order[];
    lowStockProducts: Product[];
    topProducts: Product[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recentOrders, lowStockProducts }: Props) {
    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            processing: 'bg-purple-100 text-purple-800',
            shipped: 'bg-indigo-100 text-indigo-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AppShell>
            <Head title="📊 Admin Dashboard - ShopEase" />
            
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            📊 Admin Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Welcome back! Here's what's happening in your store.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                                    <p className="text-3xl font-bold text-indigo-600">{stats.total_products}</p>
                                    <p className="text-sm text-gray-500">{stats.active_products} active</p>
                                </div>
                                <div className="text-4xl">📦</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.total_orders}</p>
                                    <p className="text-sm text-gray-500">{stats.pending_orders} pending</p>
                                </div>
                                <div className="text-4xl">📋</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                                    <p className="text-3xl font-bold text-purple-600">{stats.total_users}</p>
                                    <p className="text-sm text-gray-500">Registered users</p>
                                </div>
                                <div className="text-4xl">👥</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Categories</p>
                                    <p className="text-3xl font-bold text-orange-600">{stats.total_categories}</p>
                                    <p className="text-sm text-gray-500">Product categories</p>
                                </div>
                                <div className="text-4xl">🏷️</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Low Stock Alert</p>
                                    <p className="text-3xl font-bold text-red-600">{lowStockProducts.length}</p>
                                    <p className="text-sm text-gray-500">Products need restock</p>
                                </div>
                                <div className="text-4xl">⚠️</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Quick Actions</p>
                                    <div className="mt-2 space-y-2">
                                        <Link href="/admin/products/create">
                                            <Button size="sm" className="w-full">
                                                ➕ Add Product
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="text-4xl">⚡</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Orders */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">📋 Recent Orders</h2>
                                <Link href="/admin/orders">
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                            {recentOrders.length > 0 ? (
                                <div className="space-y-3">
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                            <div>
                                                <p className="font-medium">{order.order_number}</p>
                                                <p className="text-sm text-gray-600">{order.user.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">${order.total_amount}</p>
                                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">📋</div>
                                    <p className="text-gray-600">No recent orders</p>
                                </div>
                            )}
                        </div>

                        {/* Low Stock Products */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">⚠️ Low Stock Alert</h2>
                                <Link href="/admin/products?stock=low">
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                            {lowStockProducts.length > 0 ? (
                                <div className="space-y-3">
                                    {lowStockProducts.map((product) => (
                                        <div key={product.id} className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                                            <div>
                                                <p className="font-medium">{product.name}</p>
                                                <p className="text-sm text-gray-600">{product.category.name}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-red-600">{product.stock_quantity} left</p>
                                                <Link href={`/admin/products/${product.id}/edit`}>
                                                    <Button size="sm" variant="outline" className="mt-1">
                                                        Restock
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">✅</div>
                                    <p className="text-gray-600">All products are well stocked!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">⚡ Quick Actions</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/admin/products/create">
                                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                                    <div className="text-2xl mb-1">📦</div>
                                    <span>Add Product</span>
                                </Button>
                            </Link>
                            <Link href="/admin/categories/create">
                                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                                    <div className="text-2xl mb-1">🏷️</div>
                                    <span>Add Category</span>
                                </Button>
                            </Link>
                            <Link href="/admin/promo-codes/create">
                                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                                    <div className="text-2xl mb-1">🎫</div>
                                    <span>Create Promo</span>
                                </Button>
                            </Link>
                            <Link href="/admin/banners/create">
                                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                                    <div className="text-2xl mb-1">🎨</div>
                                    <span>Add Banner</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}