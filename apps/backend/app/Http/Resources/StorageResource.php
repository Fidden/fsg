<?php

namespace App\Http\Resources;

use App\Models\Storage;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

/**
 * @mixin Storage
 */
#[OA\Schema(properties: [
    new OA\Property(property: 'id', type: 'number'),
    new OA\Property(property: 'country', ref: '#/components/schemas/Country'),
    new OA\Property(property: 'address', nullable: true),
])]
class StorageResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'country' => $this->country,
            'address' => StorageAddressResource::make($this->currentAddress)
        ];
    }
}
