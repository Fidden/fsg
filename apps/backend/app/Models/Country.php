<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use OpenApi\Attributes as OA;

/**
 * @property int $id
 * @property string $code
 * @property string $name
 * @property City[]|Collection<City> $cities
 */
#[OA\Schema(properties: [
    new OA\Property(property: 'id', type: 'number'),
    new OA\Property(property: 'code', type: 'string', example: 'US'),
    new OA\Property(property: 'name', type: 'string', example: 'United States'),
])]
class Country extends Model
{
    public $timestamps = false;

    protected $hidden = ['id'];

    protected $fillable = [
        'code',
        'name',
    ];

    public function cities(): HasMany
    {
        return $this->hasMany(City::class);
    }
}
