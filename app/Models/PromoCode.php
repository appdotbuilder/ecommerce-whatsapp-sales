<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PromoCode
 *
 * @property int $id
 * @property string $code
 * @property string $name
 * @property string|null $description
 * @property string $type
 * @property float $value
 * @property float|null $minimum_amount
 * @property int|null $usage_limit
 * @property int $used_count
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $starts_at
 * @property \Illuminate\Support\Carbon|null $expires_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|PromoCode newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PromoCode newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PromoCode query()
 * @method static \Illuminate\Database\Eloquent\Builder|PromoCode active()
 * @method static \Database\Factories\PromoCodeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class PromoCode extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'code',
        'name',
        'description',
        'type',
        'value',
        'minimum_amount',
        'usage_limit',
        'used_count',
        'is_active',
        'starts_at',
        'expires_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'value' => 'decimal:2',
        'minimum_amount' => 'decimal:2',
        'usage_limit' => 'integer',
        'used_count' => 'integer',
        'is_active' => 'boolean',
        'starts_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active promo codes.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
                    ->where(function($q) {
                        $q->whereNull('starts_at')
                          ->orWhere('starts_at', '<=', now());
                    })
                    ->where(function($q) {
                        $q->whereNull('expires_at')
                          ->orWhere('expires_at', '>=', now());
                    });
    }
}