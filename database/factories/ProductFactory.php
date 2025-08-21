<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(3, true);
        $price = fake()->randomFloat(2, 10, 500);
        $hasSale = fake()->boolean(30); // 30% chance of being on sale
        
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->paragraphs(3, true),
            'short_description' => fake()->sentence(),
            'price' => $price,
            'sale_price' => $hasSale ? fake()->randomFloat(2, 5, $price - 1) : null,
            'images' => [],
            'stock_quantity' => fake()->numberBetween(0, 100),
            'manage_stock' => true,
            'in_stock' => fake()->boolean(90), // 90% chance of being in stock
            'is_featured' => fake()->boolean(20), // 20% chance of being featured
            'status' => fake()->randomElement(['draft', 'active', 'inactive']),
            'sku' => 'SKU-' . fake()->unique()->numerify('######'),
            'weight' => fake()->randomFloat(2, 0.1, 10),
            'attributes' => [
                'colors' => fake()->randomElements(['Red', 'Blue', 'Green', 'Black', 'White'], fake()->numberBetween(1, 3)),
                'sizes' => fake()->randomElements(['XS', 'S', 'M', 'L', 'XL'], fake()->numberBetween(1, 3)),
            ],
            'category_id' => \App\Models\Category::factory(),
            'rating' => fake()->randomFloat(1, 1, 5),
            'review_count' => fake()->numberBetween(0, 100),
        ];
    }

    /**
     * Indicate that the product is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
            'in_stock' => true,
        ]);
    }

    /**
     * Indicate that the product is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
            'status' => 'active',
            'in_stock' => true,
        ]);
    }

    /**
     * Indicate that the product is on sale.
     */
    public function onSale(): static
    {
        return $this->state(function (array $attributes) {
            $originalPrice = $attributes['price'];
            return [
                'sale_price' => fake()->randomFloat(2, 5, $originalPrice - 1),
            ];
        });
    }
}