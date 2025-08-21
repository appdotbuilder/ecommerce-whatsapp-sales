<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Banner>
 */
class BannerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->sentence(),
            'image' => 'banner-placeholder.jpg',
            'link' => fake()->url(),
            'position' => fake()->randomElement(['hero', 'sidebar', 'footer']),
            'is_active' => true,
            'sort_order' => fake()->numberBetween(1, 10),
            'starts_at' => now()->subDays(fake()->numberBetween(0, 30)),
            'expires_at' => now()->addDays(fake()->numberBetween(30, 90)),
        ];
    }

    /**
     * Indicate that the banner is a hero banner.
     */
    public function hero(): static
    {
        return $this->state(fn (array $attributes) => [
            'position' => 'hero',
        ]);
    }
}