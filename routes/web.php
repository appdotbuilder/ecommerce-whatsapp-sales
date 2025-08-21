<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// Product routes (public)
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

// Protected routes (require authentication)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Cart routes
    Route::controller(CartController::class)->group(function () {
        Route::get('/cart', 'index')->name('cart.index');
        Route::post('/cart', 'store')->name('cart.store');
        Route::put('/cart/{cart}', 'update')->name('cart.update');
        Route::delete('/cart/{cart}', 'destroy')->name('cart.destroy');
    });

    // Wishlist routes
    Route::controller(WishlistController::class)->group(function () {
        Route::get('/wishlist', 'index')->name('wishlist.index');
        Route::post('/wishlist', 'store')->name('wishlist.store');
        Route::delete('/wishlist/{wishlist}', 'destroy')->name('wishlist.destroy');
    });
});

require __DIR__.'/admin.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';