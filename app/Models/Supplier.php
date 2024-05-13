<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Supplier extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'name',
        'document',
        'address',
        'phone',
        'email'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeFilter(Builder $query, array $filters): Builder
    {
        return $query->when(
            $filters['search'] ?? false,
            fn($query, $value) => $query
                ->where('name', 'like', '%'.$value.'%')
                ->orWhere('description', 'like', '%'.$value.'%')
                ->orWhere('document', 'like', '%'.$value.'%')
                ->orWhere('address', 'like', '%'.$value.'%')
                ->orWhere('phone', 'like', '%'.$value.'%')
                ->orWhere('email', 'like', '%'.$value.'%')
        );
    }

}
