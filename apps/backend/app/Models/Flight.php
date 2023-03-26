<?php

namespace App\Models;

use App\Enums\FlightStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $from_storage_id
 * @property int $to_branch_id
 * @property Carbon $departured_at
 * @property Carbon $arrived_at
 * @property FlightStatus $status
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Storage $storage
 * @property Branch $branch
 */
class Flight extends Model
{
    use HasFactory;

    protected $casts = [
        'status' => FlightStatus::class,
        'departured_at' => 'date',
        'arrived_at' => 'date',
    ];

    protected $fillable = [
        'from_storage_id',
        'to_branch_id',
        'departured_at',
        'arrived_at',
        'status',
    ];

    public function storage(): BelongsTo
    {
        return $this->belongsTo(Storage::class, 'from_storage_id');
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class, 'to_branch_id');
    }
}
