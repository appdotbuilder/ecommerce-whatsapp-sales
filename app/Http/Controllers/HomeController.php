<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Banner;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        $featuredProducts = Product::with('category')
            ->active()
            ->featured()
            ->inStock()
            ->take(8)
            ->get();

        $categories = Category::active()
            ->whereNull('parent_id')
            ->with('children')
            ->orderBy('sort_order')
            ->take(6)
            ->get();

        $banners = Banner::active()
            ->where('position', 'hero')
            ->orderBy('sort_order')
            ->take(3)
            ->get();

        $newProducts = Product::with('category')
            ->active()
            ->inStock()
            ->latest()
            ->take(8)
            ->get();

        return Inertia::render('welcome', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'banners' => $banners,
            'newProducts' => $newProducts,
        ]);
    }
}