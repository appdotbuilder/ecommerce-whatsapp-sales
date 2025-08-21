<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the cart.
     */
    public function index()
    {
        $cartItems = Cart::with('product.category')
            ->where('user_id', auth()->id())
            ->get();

        $subtotal = $cartItems->sum(function ($item) {
            return $item->product->effective_price * $item->quantity;
        });

        return Inertia::render('cart/index', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
        ]);
    }

    /**
     * Add item to cart.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'product_attributes' => 'nullable|array',
        ]);

        $product = Product::findOrFail($request->product_id);

        if (!$product->in_stock || ($product->manage_stock && $product->stock_quantity < $request->quantity)) {
            return back()->with('error', 'Product is out of stock or insufficient quantity available.');
        }

        $cartItem = Cart::where('user_id', auth()->id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $request->quantity;
            if ($product->manage_stock && $product->stock_quantity < $newQuantity) {
                return back()->with('error', 'Cannot add more items. Insufficient stock.');
            }
            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            Cart::create([
                'user_id' => auth()->id(),
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'product_attributes' => $request->product_attributes,
            ]);
        }

        return back()->with('success', 'Product added to cart successfully!');
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request, Cart $cart)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        if ($cart->user_id !== auth()->id()) {
            abort(403);
        }

        $product = $cart->product;
        if ($product->manage_stock && $product->stock_quantity < $request->quantity) {
            return back()->with('error', 'Insufficient stock available.');
        }

        $cart->update(['quantity' => $request->quantity]);

        return back()->with('success', 'Cart updated successfully!');
    }

    /**
     * Remove item from cart.
     */
    public function destroy(Cart $cart)
    {
        if ($cart->user_id !== auth()->id()) {
            abort(403);
        }

        $cart->delete();

        return back()->with('success', 'Item removed from cart!');
    }
}