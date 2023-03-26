<?php

namespace App\Http\Resources;

use App\Models\Flight;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

/**
 * @mixin Flight
 */
#[OA\Schema(properties: [
    new OA\Property(property: 'id', type: 'number'),
    new OA\Property(property: 'storage', ref: '#/components/schemas/StorageResource'),
    new OA\Property(property: 'branch', ref: '#/components/schemas/SimpleBranch'),
    new OA\Property(property: 'departured_at', type: 'string', format: 'date-time'),
    new OA\Property(property: 'arrived_at', type: 'string', format: 'date-time'),
    new OA\Property(property: 'status', type: 'string', enum: ['scheduled', 'active', 'arrived', 'canceled', 'aborted']),
])]
class FlightResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'storage' => StorageResource::make($this->storage),
            'branch' => [
                'id' => $this->branch->id,
                'city' => $this->branch->city,
            ],
            'departured_at' => $this->departured_at,
            'arrived_at' => $this->arrived_at,
            'status' => $this->status,
        ];
    }
}
