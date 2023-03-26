<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use OpenApi\Attributes as OA;

/**
 * @property int $id
 * @property int $city_id
 * @property array|string|null $working_hours
 * @property array|string|null $address
 * @property string|null $phone
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property City $city
 */
#[OA\Schema(schema: 'SimpleBranch', properties: [
    new OA\Property(property: 'id', type: 'number'),
    new OA\Property(property: 'city', ref: '#/components/schemas/City'),
])]
class Branch extends Model
{
    use HasFactory;

    protected $casts = [
        'working_hours' => 'json',
        'address' => 'json',
    ];

    protected $fillable = [
        'city_id',
        'working_hours',
        'address',
        'phone',
    ];

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }
}
