import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface CartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        sale_price?: number;
        images: string[];
        stock_quantity: number;
        category: {
            name: string;
        };
    };
}

interface Props {
    cartItems: CartItem[];
    subtotal: number;
    [key: string]: unknown;
}

export default function CartIndex({ cartItems, subtotal }: Props) {
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    
    const shippingCost = 5.99;
    const total = subtotal - discount + (cartItems.length > 0 ? shippingCost : 0);

    const updateQuantity = (cartId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        router.put(`/cart/${cartId}`, {
            quantity: newQuantity
        }, {
            preserveState: true
        });
    };

    const removeItem = (cartId: number) => {
        router.delete(`/cart/${cartId}`, {
            preserveState: true
        });
    };

    const applyPromoCode = () => {
        // This would typically make an API call to validate the promo code
        if (promoCode.toUpperCase() === 'SAVE10') {
            setDiscount(subtotal * 0.1);
        } else {
            setDiscount(0);
            alert('Invalid promo code');
        }
    };

    const proceedToWhatsApp = () => {
        const itemsList = cartItems.map(item => 
            `${item.product.name} (Qty: ${item.quantity}) - $${((item.product.sale_price || item.product.price) * item.quantity).toFixed(2)}`
        ).join('\n');

        const message = `Hi! I'd like to place an order:\n\n${itemsList}\n\nSubtotal: $${subtotal.toFixed(2)}\nShipping: $${shippingCost.toFixed(2)}\nDiscount: -$${discount.toFixed(2)}\nTotal: $${total.toFixed(2)}\n\nPlease help me complete this order.`;
        
        const whatsappNumber = '1234567890'; // This would come from settings
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    if (cartItems.length === 0) {
        return (
            <AppShell>
                <Head title="🛒 Shopping Cart - ShopEase" />
                
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-8xl mb-4">🛒</div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Your cart is empty
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Discover amazing products and add them to your cart
                        </p>
                        <Link href="/products">
                            <Button size="lg">
                                🛍️ Start Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <Head title="🛒 Shopping Cart - ShopEase" />
            
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            🛒 Your Shopping Cart
                        </h1>
                        <Link href="/products">
                            <Button variant="outline">
                                ← Continue Shopping
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => {
                                const effectivePrice = item.product.sale_price || item.product.price;
                                const itemTotal = effectivePrice * item.quantity;

                                return (
                                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* Product Image */}
                                            <div className="w-full sm:w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-3xl">📸</span>
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                    <div>
                                                        <Link href={`/products/${item.product.id}`}>
                                                            <h3 className="font-semibold text-lg hover:text-indigo-600">
                                                                {item.product.name}
                                                            </h3>
                                                        </Link>
                                                        <p className="text-gray-600">
                                                            {item.product.category.name}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="font-semibold text-indigo-600">
                                                                ${effectivePrice}
                                                            </span>
                                                            {item.product.sale_price && (
                                                                <span className="text-sm text-gray-500 line-through">
                                                                    ${item.product.price}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-lg">
                                                            ${itemTotal.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Quantity and Actions */}
                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-sm font-medium">Quantity:</span>
                                                        <div className="flex items-center border border-gray-300 rounded">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="px-3 py-1 hover:bg-gray-100"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-4 py-1 border-x border-gray-300">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="px-3 py-1 hover:bg-gray-100"
                                                                disabled={item.quantity >= item.product.stock_quantity}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span className="text-sm text-gray-500">
                                                            ({item.product.stock_quantity} available)
                                                        </span>
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        🗑️ Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                                <h2 className="text-xl font-semibold mb-4">📋 Order Summary</h2>
                                
                                {/* Promo Code */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">
                                        🎫 Promo Code
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Enter code"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <Button onClick={applyPromoCode} size="sm">
                                            Apply
                                        </Button>
                                    </div>
                                    {discount > 0 && (
                                        <p className="text-sm text-green-600 mt-1">
                                            ✅ Promo applied! Save ${discount.toFixed(2)}
                                        </p>
                                    )}
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-2 border-t border-gray-200 pt-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal ({cartItems.length} items):</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping:</span>
                                        <span>${shippingCost.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount:</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-gray-200 pt-2">
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total:</span>
                                            <span className="text-indigo-600">${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkout Actions */}
                                <div className="mt-6 space-y-3">
                                    <Button
                                        onClick={proceedToWhatsApp}
                                        className="w-full"
                                        size="lg"
                                    >
                                        💬 Order via WhatsApp
                                    </Button>
                                    <p className="text-xs text-gray-600 text-center">
                                        Click above to complete your order through WhatsApp chat with our team
                                    </p>
                                </div>

                                {/* Payment Methods */}
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <h3 className="font-medium mb-2">💳 We Accept:</h3>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <div>💰 Cash on Delivery (COD)</div>
                                        <div>🏦 Bank Transfer</div>
                                        <div>💬 WhatsApp Order Confirmation</div>
                                    </div>
                                </div>

                                {/* Security Notice */}
                                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                    <div className="flex items-start space-x-2">
                                        <span className="text-green-500">🔒</span>
                                        <div className="text-sm">
                                            <p className="font-medium text-green-800">Secure Shopping</p>
                                            <p className="text-green-700">
                                                Your order will be confirmed through WhatsApp for security
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}