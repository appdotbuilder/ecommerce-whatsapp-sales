import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    description?: string;
    short_description?: string;
    price: number;
    sale_price?: number;
    images: string[];
    rating: number;
    review_count: number;
    stock_quantity: number;
    in_stock: boolean;
    category: {
        id: number;
        name: string;
    };
    reviews: Review[];
}

interface Review {
    id: number;
    rating: number;
    comment?: string;
    created_at: string;
    user: {
        name: string;
    };
}

interface RelatedProduct {
    id: number;
    name: string;
    price: number;
    sale_price?: number;
    images: string[];
    category: {
        name: string;
    };
}

interface Props {
    product: Product;
    relatedProducts: RelatedProduct[];
    [key: string]: unknown;
}

export default function ProductShow({ product, relatedProducts }: Props) {
    const [quantity, setQuantity] = useState(1);


    const effectivePrice = product.sale_price || product.price;

    const addToCart = () => {
        router.post('/cart', {
            product_id: product.id,
            quantity: quantity
        }, {
            preserveState: true,
            onSuccess: () => {
                // Success message handled by backend
            }
        });
    };

    const addToWishlist = () => {
        router.post('/wishlist', {
            product_id: product.id
        }, {
            preserveState: true
        });
    };

    const buyNowWhatsApp = () => {
        const message = `Hi! I'm interested in buying ${product.name} (Quantity: ${quantity}) for $${effectivePrice * quantity}. Can you help me with the order?`;
        const whatsappNumber = '1234567890'; // This would come from settings
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                ⭐
            </span>
        ));
    };

    return (
        <AppShell>
            <Head title={`${product.name} - ShopEase`} />
            
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <nav className="mb-6">
                        <div className="flex items-center space-x-2 text-sm">
                            <Link href="/" className="text-indigo-600 hover:text-indigo-800">
                                Home
                            </Link>
                            <span className="text-gray-500">/</span>
                            <Link href="/products" className="text-indigo-600 hover:text-indigo-800">
                                Products
                            </Link>
                            <span className="text-gray-500">/</span>
                            <Link 
                                href={`/products?category=${product.category.id}`} 
                                className="text-indigo-600 hover:text-indigo-800"
                            >
                                {product.category.name}
                            </Link>
                            <span className="text-gray-500">/</span>
                            <span className="text-gray-700">{product.name}</span>
                        </div>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Product Images */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-8xl">📸</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                                        <span className="text-2xl">📷</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {product.name}
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Category: {product.category.name}
                                </p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center space-x-2">
                                <div className="flex">
                                    {renderStars(product.rating)}
                                </div>
                                <span className="text-gray-600">
                                    {product.rating} ({product.review_count} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center space-x-4">
                                <span className="text-3xl font-bold text-indigo-600">
                                    ${effectivePrice}
                                </span>
                                {product.sale_price && (
                                    <span className="text-xl text-gray-500 line-through">
                                        ${product.price}
                                    </span>
                                )}
                                {product.sale_price && (
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                                        Save ${(product.price - product.sale_price).toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center space-x-2">
                                {product.in_stock ? (
                                    <>
                                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                        <span className="text-green-700 font-medium">
                                            In Stock ({product.stock_quantity} available)
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                        <span className="text-red-700 font-medium">Out of Stock</span>
                                    </>
                                )}
                            </div>

                            {/* Short Description */}
                            {product.short_description && (
                                <div>
                                    <p className="text-gray-700">{product.short_description}</p>
                                </div>
                            )}

                            {/* Quantity and Actions */}
                            {product.in_stock && (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <label className="font-medium">Quantity:</label>
                                        <div className="flex items-center border border-gray-300 rounded">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-3 py-1 hover:bg-gray-100"
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-1 border-x border-gray-300">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                                                className="px-3 py-1 hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button
                                            onClick={addToCart}
                                            className="flex-1"
                                            size="lg"
                                        >
                                            🛒 Add to Cart
                                        </Button>
                                        <Button
                                            onClick={buyNowWhatsApp}
                                            variant="outline"
                                            className="flex-1"
                                            size="lg"
                                        >
                                            💬 Buy via WhatsApp
                                        </Button>
                                        <Button
                                            onClick={addToWishlist}
                                            variant="outline"
                                            size="lg"
                                        >
                                            ❤️
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* WhatsApp Support */}
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h3 className="font-semibold text-green-800 mb-2">
                                    💬 Need Help?
                                </h3>
                                <p className="text-green-700 mb-3">
                                    Have questions about this product? Chat with us on WhatsApp!
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const message = `Hi! I have questions about ${product.name}`;
                                        const whatsappNumber = '1234567890';
                                        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                                        window.open(url, '_blank');
                                    }}
                                    className="text-green-700 border-green-300 hover:bg-green-100"
                                >
                                    💬 Chat Now
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Product Description */}
                    {product.description && (
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-2xl font-semibold mb-4">📋 Product Description</h2>
                            <div className="prose max-w-none">
                                <p className="text-gray-700">{product.description}</p>
                            </div>
                        </div>
                    )}

                    {/* Reviews Section */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">⭐ Customer Reviews</h2>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const message = `I'd like to leave a review for ${product.name}`;
                                    const whatsappNumber = '1234567890';
                                    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                                    window.open(url, '_blank');
                                }}
                            >
                                💬 Leave Review via WhatsApp
                            </Button>
                        </div>

                        {product.reviews.length > 0 ? (
                            <div className="space-y-4">
                                {product.reviews.slice(0, 5).map((review) => (
                                    <div key={review.id} className="border-b border-gray-200 pb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium">{review.user.name}</span>
                                                <div className="flex">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {new Date(review.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {review.comment && (
                                            <p className="text-gray-700">{review.comment}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-2">💭</div>
                                <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                            </div>
                        )}
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">🔍 Related Products</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((relatedProduct) => (
                                    <Link
                                        key={relatedProduct.id}
                                        href={`/products/${relatedProduct.id}`}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                    >
                                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                                            <span className="text-6xl">📸</span>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800 mb-2">
                                                {relatedProduct.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {relatedProduct.category.name}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-lg text-indigo-600">
                                                    ${relatedProduct.sale_price || relatedProduct.price}
                                                </span>
                                                {relatedProduct.sale_price && (
                                                    <span className="text-sm text-gray-500 line-through">
                                                        ${relatedProduct.price}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}