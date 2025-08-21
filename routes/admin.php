<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use Illuminate\Support\Facades\Route;

// Admin routes - protected by auth and admin role check
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    
    // Products
    Route::resource('products', ProductController::class);
    
    // Additional admin routes can be added here:
    // Route::resource('categories', CategoryController::class);
    // Route::resource('orders', OrderController::class);
    // Route::resource('users', UserController::class);
    // Route::resource('promo-codes', PromoCodeController::class);
    // Route::resource('banners', BannerController::class);
});