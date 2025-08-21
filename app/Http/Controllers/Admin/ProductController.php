<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of products.
     */
    public function index(Request $request)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $query = Product::with('category');

        // Search
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Status filter
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Category filter
        if ($request->has('category') && $request->category) {
            $query->where('category_id', $request->category);
        }

        $products = $query->latest()->paginate(15)->appends($request->query());

        $categories = Category::active()->orderBy('name')->get();

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'status', 'category']),
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $categories = Category::active()->orderBy('name')->get();

        return Inertia::render('admin/products/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created product.
     */
    public function store(StoreProductRequest $request)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $product = Product::create($request->validated());

        return redirect()->route('admin.products.show', $product)
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $product->load(['category', 'reviews.user']);

        return Inertia::render('admin/products/show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $product->load('category');
        $categories = Category::active()->orderBy('name')->get();

        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified product.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $product->update($request->validated());

        return redirect()->route('admin.products.show', $product)
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product.
     */
    public function destroy(Product $product)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted successfully.');
    }
}