<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PromoCode>
 */
class PromoCodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['percentage', 'fixed', 'free_shipping']);
        $value = match ($type) {
            'percentage' => fake()->numberBetween(5, 50),
            'fixed' => fake()->randomFloat(2, 5, 50),
            'free_shipping' => 0,
            default => 0,
        };

        return [
            'code' => fake()->unique()->regexify('[A-Z]{4}[0-9]{2}'),
            'name' => fake()->words(2, true) . ' Discount',
            'description' => fake()->sentence(),
            'type' => $type,
            'value' => $value,
            'minimum_amount' => $type === 'free_shipping' ? fake()->randomFloat(2, 50, 100) : null,
            'usage_limit' => fake()->optional(0.7)->numberBetween(10, 1000),
            'used_count' => 0,
            'is_active' => true,
            'starts_at' => now()->subDays(fake()->numberBetween(0, 10)),
            'expires_at' => now()->addDays(fake()->numberBetween(30, 90)),
        ];
    }
}