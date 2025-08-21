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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['user', 'admin'])->default('user')->after('email');
            $table->string('phone')->nullable()->after('email');
            $table->text('address')->nullable()->after('phone');
            $table->string('profile_photo')->nullable()->after('address');
            $table->string('whatsapp_number')->nullable()->after('profile_photo');
            $table->boolean('is_active')->default(true)->after('whatsapp_number');
            
            $table->index('role');
            $table->index(['role', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role']);
            $table->dropIndex(['role', 'is_active']);
            $table->dropColumn(['role', 'phone', 'address', 'profile_photo', 'whatsapp_number', 'is_active']);
        });
    }
};