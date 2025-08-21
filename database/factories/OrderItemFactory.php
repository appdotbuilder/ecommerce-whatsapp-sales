<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = fake()->randomFloat(2, 5, 100);
        $quantity = fake()->numberBetween(1, 3);
        
        return [
            'order_id' => \App\Models\Order::factory(),
            'product_id' => \App\Models\Product::factory(),
            'product_name' => fake()->words(3, true),
            'product_sku' => 'SKU-' . fake()->numerify('######'),
            'product_price' => $price,
            'quantity' => $quantity,
            'total' => $price * $quantity,
            'product_attributes' => [
                'color' => fake()->colorName(),
                'size' => fake()->randomElement(['S', 'M', 'L', 'XL']),
            ],
        ];
    }
}