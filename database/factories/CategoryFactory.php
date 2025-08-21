<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Electronics',
            'Fashion',
            'Home & Garden',
            'Sports & Outdoors',
            'Books & Media',
            'Health & Beauty',
            'Toys & Games',
            'Automotive',
            'Jewelry',
            'Food & Beverages',
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->sentence(),
            'image' => null,
            'parent_id' => null,
            'is_active' => true,
            'sort_order' => fake()->numberBetween(1, 100),
        ];
    }

    /**
     * Indicate that the category is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the category is a child category.
     */
    public function child(): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => \App\Models\Category::factory(),
        ]);
    }
}