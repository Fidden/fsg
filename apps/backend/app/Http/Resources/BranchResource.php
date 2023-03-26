<?php

namespace App\Http\Resources;

use App\Models\Branch;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

/**
 * @mixin Branch
 */
#[OA\Schema(properties: [
    new OA\Property(property: 'id', type: 'number'),
    new OA\Property(property: 'city', ref: '#/components/schemas/City'),
    new OA\Property(property: 'working_hours', nullable: true),
    new OA\Property(property: 'phone', type: 'string', nullable: true),
    new OA\Property(property: 'address', nullable: true),
])]
class BranchResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'city' => $this->city,
            'working_hours' => $this->working_hours,
            'phone' => $this->phone,
            'address' => $this->address,
        ];
    }
}
