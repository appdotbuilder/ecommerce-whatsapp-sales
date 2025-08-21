<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('sale_price', 10, 2)->nullable();
            $table->json('images')->nullable();
            $table->integer('stock_quantity')->default(0);
            $table->boolean('manage_stock')->default(true);
            $table->boolean('in_stock')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['draft', 'active', 'inactive'])->default('active');
            $table->string('sku')->unique()->nullable();
            $table->decimal('weight', 8, 2)->nullable();
            $table->json('attributes')->nullable(); // color, size, etc.
            $table->unsignedBigInteger('category_id');
            $table->decimal('rating', 2, 1)->default(0);
            $table->integer('review_count')->default(0);
            $table->timestamps();
            
            $table->foreign('category_id')->references('id')->on('categories');
            $table->index(['status', 'is_featured']);
            $table->index(['category_id', 'status']);
            $table->index('rating');
            // $table->fullText(['name', 'description', 'short_description']); // Commented out for SQLite compatibility
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};