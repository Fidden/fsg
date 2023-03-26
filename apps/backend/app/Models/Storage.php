<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $country_id
 * @property array $address
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Country $country
 */
class Storage extends Model
{
    use HasFactory;

    protected $casts = [
        'address' => 'json',
    ];

    protected $fillable = [
        'country_id',
        'address',
    ];

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }
}
