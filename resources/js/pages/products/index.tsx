import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    price: number;
    sale_price?: number;
    images: string[];
    rating: number;
    review_count: number;
    category: {
        id: number;
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
}

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: Category[];
    filters: {
        search?: string;
        category?: string;
        min_price?: string;
        max_price?: string;
        sort?: string;
    };
    [key: string]: unknown;
}

export default function ProductsIndex({ products, categories, filters }: Props) {
    const handleFilter = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        if (!value) delete (newFilters as Record<string, unknown>)[key];
        router.get('/products', newFilters, { preserveState: true });
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        handleFilter('search', search);
    };

    const addToCart = (productId: number) => {
        router.post('/cart', {
            product_id: productId,
            quantity: 1
        }, {
            preserveState: true,
            onSuccess: () => {
                // Success message will be handled by the backend
            }
        });
    };

    return (
        <AppShell>
            <Head title="🛍️ Products - ShopEase" />
            
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            🛍️ Our Products
                        </h1>
                        <p className="text-gray-600">
                            Discover amazing products at great prices
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:w-64 flex-shrink-0">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="font-semibold mb-4">🔍 Filters</h2>
                                
                                {/* Search */}
                                <form onSubmit={handleSearch} className="mb-6">
                                    <label className="block text-sm font-medium mb-2">
                                        Search Products
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="search"
                                            defaultValue={filters.search || ''}
                                            placeholder="Search..."
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <Button type="submit" size="sm">
                                            🔍
                                        </Button>
                                    </div>
                                </form>

                                {/* Categories */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2">
                                        Categories
                                    </label>
                                    <select
                                        value={filters.category || ''}
                                        onChange={(e) => handleFilter('category', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price Range */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2">
                                        💰 Price Range
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={filters.min_price || ''}
                                            onChange={(e) => handleFilter('min_price', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={filters.max_price || ''}
                                            onChange={(e) => handleFilter('max_price', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                {Object.keys(filters).length > 0 && (
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => router.get('/products')}
                                    >
                                        Clear Filters
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Sort and Results Info */}
                            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <span className="text-gray-600">
                                        Showing {products.data.length} of {products.total} products
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium">Sort by:</label>
                                    <select
                                        value={filters.sort || 'latest'}
                                        onChange={(e) => handleFilter('sort', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="latest">Latest</option>
                                        <option value="price_low">Price: Low to High</option>
                                        <option value="price_high">Price: High to Low</option>
                                        <option value="rating">Highest Rated</option>
                                        <option value="popular">Most Popular</option>
                                    </select>
                                </div>
                            </div>

                            {/* Products Grid */}
                            {products.data.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.data.map((product) => (
                                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                                <span className="text-6xl">📸</span>
                                            </div>
                                            <div className="p-4">
                                                <Link href={`/products/${product.id}`}>
                                                    <h3 className="font-semibold text-gray-800 mb-2 hover:text-indigo-600 cursor-pointer">
                                                        {product.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {product.category.name}
                                                </p>
                                                <div className="flex items-center mb-3">
                                                    <span className="text-yellow-400">⭐</span>
                                                    <span className="text-sm ml-1">
                                                        {product.rating} ({product.review_count} reviews)
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between mb-3">
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
                                                </div>
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/products/${product.id}`}
                                                        className="flex-1"
                                                    >
                                                        <Button variant="outline" size="sm" className="w-full">
                                                            View Details
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        size="sm"
                                                        onClick={() => addToCart(product.id)}
                                                    >
                                                        🛒
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                                    <p className="text-gray-600">
                                        Try adjusting your search or filter criteria
                                    </p>
                                </div>
                            )}

                            {/* Pagination */}
                            {products.last_page > 1 && (
                                <div className="mt-8 flex justify-center gap-2">
                                    {Array.from({ length: products.last_page }, (_, i) => i + 1).map((page) => (
                                        <Button
                                            key={page}
                                            variant={page === products.current_page ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => {
                                                const newFilters = { ...filters, page: page.toString() };
                                                router.get('/products', newFilters);
                                            }}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}