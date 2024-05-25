<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Historic extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'quantity',
        'type',
        'description',
        'user_id',
        'product_id',
        'supplier_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function scopeFilter(Builder $query, array $filters): Builder
    {
        return $query
            ->when(
                $filters['search'] ?? false,
                function ($query, $value) {
                    $query->where('type', 'like', '%' . $value . '%')
                        ->orWhereHas('product', function ($query) use ($value) {
                            $query->where('name', 'like', '%' . $value . '%');
                        })
                        ->orWhereHas('supplier', function ($query) use ($value) {
                            $query->where('name', 'like', '%' . $value . '%');
                        });
                }
            )->when(
                $filters['date'] ?? false,
                function ($query, $date) {
                    $formattedDate = Carbon::parse($date)->format('Y-m-d');
                    $query->whereDate('created_at', $formattedDate);
                }
            );
    }
}
