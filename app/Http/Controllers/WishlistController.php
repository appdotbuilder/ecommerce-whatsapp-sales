<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    /**
     * Display the wishlist.
     */
    public function index()
    {
        $wishlistItems = Wishlist::with('product.category')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('wishlist/index', [
            'wishlistItems' => $wishlistItems,
        ]);
    }

    /**
     * Add or remove item from wishlist.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $wishlistItem = Wishlist::where('user_id', auth()->id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($wishlistItem) {
            $wishlistItem->delete();
            return back()->with('success', 'Product removed from wishlist!');
        } else {
            Wishlist::create([
                'user_id' => auth()->id(),
                'product_id' => $request->product_id,
            ]);
            return back()->with('success', 'Product added to wishlist!');
        }
    }

    /**
     * Remove item from wishlist.
     */
    public function destroy(Wishlist $wishlist)
    {
        if ($wishlist->user_id !== auth()->id()) {
            abort(403);
        }

        $wishlist->delete();

        return back()->with('success', 'Item removed from wishlist!');
    }
}