<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OpenApi\Attributes as OA;

/**
 * @property int $id
 * @property string $name
 * @property string $url
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
#[OA\Schema(properties: [
    new OA\Property(property: 'id', type: 'number'),
    new OA\Property(property: 'name', type: 'string', example: 'Shop 1'),
    new OA\Property(property: 'url', type: 'string', example: 'https://shop1.com'),
])]
class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'url',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
