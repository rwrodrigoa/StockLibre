<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'code',
        'name',
        'description',
        'price',
        'image_url',
        'quantity',
        'minimum',
        'location',
        'weight',
        'length',
        'width',
        'height',
        'user_id',
        'category_id',
        'supplier_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function scopeFilter(Builder $query, array $filters): Builder
    {
        return $query->when(
            $filters['search'] ?? false,
            fn($query, $value) => $query
                ->where('name', 'like', '%'.$value.'%')
                ->orWhere('description', 'like', '%'.$value.'%')
                ->orWhere('code', 'like', '%'.$value.'%')
                ->orWhere('location', 'like', '%'.$value.'%')
        );
    }
}
