<?php

namespace App\Models;

use App\Enums\OrderStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int $id
 * @property int $user_id
 * @property int|null $flight_id
 * @property OrderStatus $status
 * @property int $branch_id
 * @property float|null $amount_total
 * @property float|null $amount_paid
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon|null $deleted_at
 * @property User $user
 * @property Flight|null $flight
 * @property Branch $branch
 * @property Collection<IncomingPackage> $packages
 */
class Order extends Model
{
    use HasFactory;

    protected $casts = [
        'status' => OrderStatus::class,
    ];

    protected $fillable = [
        'user_id',
        'flight_id',
        'status',
        'branch_id',
        'amount_total',
        'amount_paid',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function flight(): BelongsTo
    {
        return $this->belongsTo(Flight::class);
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function packages(): BelongsToMany
    {
        return $this->belongsToMany(
            related: IncomingPackage::class,
            table: 'order_package',
            relatedPivotKey: 'package_id'
        )->using(OrderPackage::class);
    }
}
