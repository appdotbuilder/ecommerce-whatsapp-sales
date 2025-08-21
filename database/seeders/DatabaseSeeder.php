<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Banner;
use App\Models\PromoCode;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@shopease.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '+1234567890',
            'whatsapp_number' => '+1234567890',
            'is_active' => true,
        ]);

        // Create regular users
        User::factory(10)->create([
            'role' => 'user',
            'is_active' => true,
        ]);

        // Create categories
        $categories = Category::factory(8)->create(['is_active' => true]);

        // Create some child categories
        Category::factory(12)->create([
            'is_active' => true,
            'parent_id' => $categories->random()->id,
        ]);

        // Get all categories for products
        $allCategories = Category::all();

        // Create products
        Product::factory(50)->create([
            'status' => 'active',
            'in_stock' => true,
            'category_id' => $allCategories->random()->id,
        ]);

        // Create some featured products
        Product::factory(8)->create([
            'is_featured' => true,
            'status' => 'active',
            'in_stock' => true,
            'category_id' => $allCategories->random()->id,
        ]);

        // Create banners
        Banner::factory(3)->hero()->create();
        Banner::factory(2)->create(['position' => 'sidebar']);

        // Create promo codes
        PromoCode::factory(5)->create();

        // Create a sample promo code for testing
        PromoCode::create([
            'code' => 'SAVE10',
            'name' => 'Save 10%',
            'description' => 'Get 10% off your order',
            'type' => 'percentage',
            'value' => 10,
            'minimum_amount' => 50,
            'usage_limit' => 100,
            'used_count' => 0,
            'is_active' => true,
            'starts_at' => now(),
            'expires_at' => now()->addMonth(),
        ]);
    }
}