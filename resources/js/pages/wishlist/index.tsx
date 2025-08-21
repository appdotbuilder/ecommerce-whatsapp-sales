import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface WishlistItem {
    id: number;
    product: {
        id: number;
        name: string;
        price: number;
        sale_price?: number;
        images: string[];
        in_stock: boolean;
        stock_quantity: number;
        category: {
            name: string;
        };
    };
}

interface Props {
    wishlistItems: WishlistItem[];
    [key: string]: unknown;
}

export default function WishlistIndex({ wishlistItems }: Props) {
    const removeFromWishlist = (wishlistId: number) => {
        router.delete(`/wishlist/${wishlistId}`, {
            preserveState: true
        });
    };

    const addToCart = (productId: number) => {
        router.post('/cart', {
            product_id: productId,
            quantity: 1
        }, {
            preserveState: true
        });
    };

    if (wishlistItems.length === 0) {
        return (
            <AppShell>
                <Head title="❤️ My Wishlist - ShopEase" />
                
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-8xl mb-4">❤️</div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Your wishlist is empty
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Save products you love for later
                        </p>
                        <Link href="/products">
                            <Button size="lg">
                                🛍️ Discover Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <Head title="❤️ My Wishlist - ShopEase" />
            
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            ❤️ My Wishlist
                        </h1>
                        <div className="text-gray-600">
                            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((item) => {
                            const effectivePrice = item.product.sale_price || item.product.price;

                            return (
                                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    {/* Product Image */}
                                    <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                                        <span className="text-6xl">📸</span>
                                        
                                        {/* Remove from Wishlist Button */}
                                        <button
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                                            title="Remove from wishlist"
                                        >
                                            ❤️
                                        </button>

                                        {/* Stock Status Badge */}
                                        {!item.product.in_stock && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                                Out of Stock
                                            </div>
                                        )}

                                        {/* Sale Badge */}
                                        {item.product.sale_price && (
                                            <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                                SALE
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4">
                                        <Link href={`/products/${item.product.id}`}>
                                            <h3 className="font-semibold text-gray-800 mb-2 hover:text-indigo-600 cursor-pointer">
                                                {item.product.name}
                                            </h3>
                                        </Link>
                                        
                                        <p className="text-sm text-gray-600 mb-3">
                                            {item.product.category.name}
                                        </p>

                                        {/* Price */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="font-bold text-lg text-indigo-600">
                                                ${effectivePrice}
                                            </span>
                                            {item.product.sale_price && (
                                                <span className="text-sm text-gray-500 line-through">
                                                    ${item.product.price}
                                                </span>
                                            )}
                                        </div>

                                        {/* Stock Info */}
                                        <div className="flex items-center mb-4">
                                            {item.product.in_stock ? (
                                                <>
                                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    <span className="text-sm text-green-700">
                                                        In Stock ({item.product.stock_quantity} available)
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                                    <span className="text-sm text-red-700">
                                                        Out of Stock
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="space-y-2">
                                            {item.product.in_stock ? (
                                                <Button
                                                    onClick={() => addToCart(item.product.id)}
                                                    className="w-full"
                                                    size="sm"
                                                >
                                                    🛒 Add to Cart
                                                </Button>
                                            ) : (
                                                <Button
                                                    disabled
                                                    variant="outline"
                                                    className="w-full"
                                                    size="sm"
                                                >
                                                    Out of Stock
                                                </Button>
                                            )}
                                            
                                            <Link
                                                href={`/products/${item.product.id}`}
                                                className="block w-full"
                                            >
                                                <Button variant="outline" size="sm" className="w-full">
                                                    👀 View Details
                                                </Button>
                                            </Link>

                                            {/* WhatsApp Quick Order */}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full"
                                                onClick={() => {
                                                    const message = `Hi! I'm interested in ${item.product.name} from my wishlist. Is it available?`;
                                                    const whatsappNumber = '1234567890';
                                                    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                                                    window.open(url, '_blank');
                                                }}
                                            >
                                                💬 Ask via WhatsApp
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Continue Shopping */}
                    <div className="mt-12 text-center">
                        <Link href="/products">
                            <Button size="lg" variant="outline">
                                🛍️ Continue Shopping
                            </Button>
                        </Link>
                    </div>

                    {/* Wishlist Tips */}
                    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">💡 Wishlist Tips</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                                <div className="text-2xl mb-2">🔔</div>
                                <h3 className="font-medium mb-1">Get Notifications</h3>
                                <p className="text-gray-600">
                                    We'll notify you via WhatsApp when items go on sale or come back in stock
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-2">💝</div>
                                <h3 className="font-medium mb-1">Share Your List</h3>
                                <p className="text-gray-600">
                                    Share your wishlist with friends and family for gift ideas
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-2">🏃‍♂️</div>
                                <h3 className="font-medium mb-1">Quick Order</h3>
                                <p className="text-gray-600">
                                    Use WhatsApp for quick ordering when you're ready to buy
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}