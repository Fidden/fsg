<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use OpenApi\Attributes as OA;

/**
 * @property int $id
 * @property string $key
 * @property int $country_id
 * @property Country $country
 */
#[OA\Schema(properties: [
    new OA\Property(property: 'id', type: 'number'),
    new OA\Property(property: 'key', type: 'string'),
    new OA\Property(property: 'country', ref: '#/components/schemas/Country'),
])]
class City extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'key',
        'country_id',
    ];

    protected $hidden = ['country_id'];

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }
}
