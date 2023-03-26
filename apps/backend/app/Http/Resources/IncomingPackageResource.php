<?php

namespace App\Http\Resources;

use App\Models\IncomingPackage;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

/**
 * @mixin IncomingPackage
 */
#[OA\Schema(properties: [
    new OA\Property(property: 'id', type: 'number'),
    new OA\Property(property: 'name', type: 'string', example: 'Flashlight'),
    new OA\Property(property: 'tracking_number', type: 'string', example: '1234567DG890'),
    new OA\Property(property: 'weight', description: 'Weight in kilo-grams', type: 'number', example: '1.54'),
    new OA\Property(property: 'size', example: '[]'),
    new OA\Property(property: 'worth_amount', type: 'number', example: '15.24'),
    new OA\Property(property: 'worth_currency', type: 'string', example: 'USD'),
    new OA\Property(property: 'shop', ref: '#/components/schemas/Shop'),
    new OA\Property(property: 'storage', ref: '#/components/schemas/StorageResource'),
])]
class IncomingPackageResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'tracking_number' => $this->tracking_number,
            'weight' => $this->weight,
            'size' => $this->size,
            'worth_amount' => $this->worth_amount,
            'worth_currency' => $this->worth_currency,
            'shop' => $this->shop,
            'storage' => StorageResource::make($this->storage),
        ];
    }
}
