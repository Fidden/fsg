<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property int|null $user_id
 * @property string|null $name
 * @property string $tracking_number
 * @property int $shop_id
 * @property int $storage_id
 * @property float|null $weight
 * @property array|null $size
 * @property float|null $worth_amount
 * @property string|null $worth_currency
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon|null $deleted_at
 * @property User|null $user
 * @property Shop $shop
 * @property Storage $storage
 * @property Collection<Order> $orders
 */
class IncomingPackage extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'tracking_number',
        'shop_id',
        'storage_id',
        'weight',
        'size',
        'worth_amount',
        'worth_currency',
    ];

    protected $casts = [
        'size' => 'json',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }

    public function storage(): BelongsTo
    {
        return $this->belongsTo(Storage::class);
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(
            related: Order::class,
            table: 'order_package',
            foreignPivotKey: 'package_id'
        )->using(OrderPackage::class);
    }
}
