<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        // Check if user is admin
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        // Get dashboard statistics
        $stats = [
            'total_products' => Product::count(),
            'active_products' => Product::active()->count(),
            'total_users' => User::where('role', 'user')->count(),
            'total_categories' => Category::count(),
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
        ];

        // Recent orders
        $recentOrders = Order::with('user')
            ->latest()
            ->take(5)
            ->get();

        // Low stock products
        $lowStockProducts = Product::where('manage_stock', true)
            ->where('stock_quantity', '<=', 5)
            ->where('stock_quantity', '>', 0)
            ->with('category')
            ->take(5)
            ->get();

        // Top selling products (by order count)
        $topProducts = Product::withCount('orderItems')
            ->orderBy('order_items_count', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'lowStockProducts' => $lowStockProducts,
            'topProducts' => $topProducts,
        ]);
    }
}