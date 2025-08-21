<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_number' => 'ORD-' . fake()->unique()->numerify('#####'),
            'user_id' => \App\Models\User::factory(),
            'status' => fake()->randomElement(['pending', 'confirmed', 'processing', 'shipped', 'delivered']),
            'subtotal' => fake()->randomFloat(2, 20, 500),
            'discount_amount' => fake()->randomFloat(2, 0, 50),
            'shipping_cost' => fake()->randomFloat(2, 0, 20),
            'total_amount' => function (array $attributes) {
                return $attributes['subtotal'] - $attributes['discount_amount'] + $attributes['shipping_cost'];
            },
            'payment_method' => fake()->randomElement(['bank_transfer', 'cod']),
            'payment_status' => fake()->randomElement(['pending', 'confirmed']),
            'promo_code' => fake()->optional(0.3)->regexify('[A-Z]{4}[0-9]{2}'),
            'shipping_address' => [
                'name' => fake()->name(),
                'address' => fake()->address(),
                'city' => fake()->city(),
                'postal_code' => fake()->postcode(),
                'phone' => fake()->phoneNumber(),
            ],
            'whatsapp_number' => fake()->phoneNumber(),
        ];
    }
}